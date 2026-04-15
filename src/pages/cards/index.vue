<script lang="ts" setup>
import type { ICardAllSummary, ICardRecord } from '@/api/types/cards'
import currency from 'currency.js'
import dayjs from 'dayjs'
import { changeCardStatus, getCardList } from '@/api/pay/cards'
import { t } from '@/locale'

defineOptions({
    name: 'Cards',
})
definePage({
    style: {
        navigationBarTitleText: '%pages.cards.title%',
    },
})

const userCards = ref<ICardRecord[]>([])
const cardAll = ref<ICardAllSummary | null>(null)
const pagingRef = ref<ZPagingRef<ICardRecord>>()
const changingId = ref<string | null>(null)
const topUpPopupVisible = ref(false)

/** 掩码卡号展示：优先用 cardNumberLastFour（**** + 后四位），否则从 cardNumber 解析 */
function displayMaskedCardNumber(card: ICardRecord): string {
    const last4 = card.cardNumberLastFour?.trim()
    if (last4)
        return `****${last4}`
    const s = (card.cardNumber || '').trim()
    if (!s)
        return '****'
    if (/^\*+/.test(s))
        return s
    if (s.length <= 4)
        return `****${s}`
    return `****${s.slice(-4)}`
}

/** 持卡人姓名：firstName + lastName */
function cardHolderName(card: ICardRecord): string {
    const first = (card.firstName || '').trim()
    const last = (card.lastName || '').trim()
    return [first, last].filter(Boolean).join(' ') || '—'
}

const loading = ref(true)
/** z-paging 分页请求：pageNo 从 1 开始，与后端 current 一致 */
async function onQuery(pageNo: number, pageSize: number) {
    loading.value = true
    try {
        const { cardAll, list } = await getCardList({ current: pageNo, pageSize })
        cardAll.value = cardAll ?? null
        const records = list.records ?? []
        const total = list.total ?? 0
        pagingRef.value?.completeByTotal(records, total)
    }
    finally {
        loading.value = false
    }
}

function goCreate() {
    uni.navigateTo({ url: '/pagesA/cards/create' })
}

function goDetail(card: ICardRecord) {
    console.log('🚀 ~ goDetail ~ card:', card)
    const token = card.cardToken || card.id
    uni.navigateTo({ url: `/pagesA/cards/detail?cardToken=${encodeURIComponent(token)}` }).catch(() => {
        uni.showToast({ title: t('profile.comingSoon'), icon: 'none' })
    })
}

function onTopUp(card: ICardRecord) {
    console.log('🚀 ~ onTopUp ~ card:', card)
    topUpPopupVisible.value = true
}

async function onToggleStatus(card: ICardRecord) {
    if (changingId.value)
        return
    const nextStatus = card.status === 0 ? 1 : 0
    changingId.value = card.id
    try {
        await changeCardStatus(card.id, nextStatus as 0 | 1)
        pagingRef.value?.refresh()
    }
    catch {
        uni.showToast({ title: '操作失败', icon: 'none' })
    }
    finally {
        changingId.value = null
    }
}

onShow(() => {
    pagingRef.value?.updateFixedLayout?.()
    pagingRef.value?.refresh()
})
</script>

<template>
    <page-meta page-style="overflow: hidden" />

    <z-paging
        ref="pagingRef"
        v-model="userCards"
        paging-class="bg-page"
        @query="onQuery"
    >
        <template #top>
            <view class="flex items-center justify-between bg-page px-4 pb-2 pt-3">
                <view class="flex flex-col">
                    <text class="text-xs text-secondary">{{ t('pages.cards.totalCardBalance') }}</text>
                    <text class="mt-0.5 text-lg font-semibold">
                        {{ currency(cardAll?.availableAmount ?? 0).format() }}
                    </text>
                </view>

                <view class="flex items-center gap-2">
                    <t-button
                        theme="primary"
                        icon="add"
                        shape="circle"
                        @click="goCreate"
                    />

                    <t-button
                        variant="outline"
                        icon="search"
                        shape="circle"
                    />
                </view>
            </view>
        </template>

        <view class="flex flex-col gap-3 px-4 pb-4 pt-2">
            <template v-if="loading && userCards.length === 0">
                <t-skeleton
                    v-for="num in 2"
                    :key="num"
                    theme="image"
                    t-class="box-border"
                    animation="gradient"
                    :row-col="[{ width: '100%', height: '470rpx', type: 'rect' }]"
                    :custom-style="{ '--td-skeleton-rect-border-radius': '32rpx' }"
                />
            </template>

            <view
                v-for="card in userCards"
                :key="card.id"
                @click="goDetail(card)"
            >
                <t-swipe-cell
                    :custom-style="{
                        overflow: 'hidden',
                        borderRadius: '40rpx',
                        boxShadow: '0 8rpx 16rpx rgba(0, 0, 0, 0.1)',
                    }"
                >
                    <fg-master-card-viewer
                        v-if="card.cardBin.startsWith('5')"
                        :card-number="card.cardNumber"
                        :expiration-date="card.endDate ? dayjs(card.endDate).format('MM/YY') : ''"
                        :first-name="card.firstName"
                        :last-name="card.lastName"
                    />
                    <fg-virtual-card-viewer
                        v-else
                        :card-number="card.cardNumber"
                        :expiration-date="card.endDate ? dayjs(card.endDate).format('MM/YY') : ''"
                        :first-name="card.firstName"
                        :last-name="card.lastName"
                    />

                    <template #right>
                        <view class="box-border h-full w-25 flex flex-col gap-2 p-2 text-white" :style="{ '--td-button-medium-height': '100%' }">
                            <view class="flex-1">
                                <t-button
                                    block
                                    icon="wallet"
                                    theme="primary"
                                    t-class="flex-col! gap-2"
                                    :disabled="card.status === 1"
                                    @click="onTopUp(card)"
                                >
                                    {{ t('pages.cards.topUp') }}
                                </t-button>
                            </view>
                            <view class="flex-1">
                                <t-button
                                    block
                                    :theme="card.status === 0 ? 'danger' : 'primary'"
                                    :loading="changingId === card.id"
                                    :icon="changingId === card.id ? null : 'slash'"
                                    t-class="flex-col! gap-2"
                                    @click="onToggleStatus(card)"
                                >
                                    {{ card.status === 0 ? t('pages.cards.disable') : t('pages.cards.activate') }}
                                </t-button>
                            </view>
                        </view>
                    </template>
                </t-swipe-cell>
            </view>
        </view>

        <template #loadingMoreDefault>
            <fg-z-paging-loading-more-default @load-more="pagingRef.doLoadMore('click')" />
        </template>

        <template #loadingMoreLoading>
            <fg-z-paging-loading-more-loading />
        </template>

        <template #loadingMoreNoMore>
            <fg-z-paging-loading-more-no-more />
        </template>

        <template #loadingMoreFail>
            <fg-z-paging-loading-more-fail />
        </template>
    </z-paging>

    <!-- <view class="min-h-100vh">
        <button
            @click="onTopUp"
        >
            Top Up
        </button>

        <fg-top-up-popup
            v-model:visible="topUpPopupVisible"
        />
    </view> -->
</template>

<style lang="scss" scoped>
.card-block {
    box-shadow:
        0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
}

:deep(.t-button__content:not(:empty)) {
    margin-left: 0 !important;
}
</style>
