<script lang="ts" setup>
import type { ICardAllSummary, ICardRecord } from '@/api/types/cards'
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

function formatMoney(value: number | string): string {
    const n = typeof value === 'string' ? Number.parseFloat(value) || 0 : Number(value) || 0
    return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

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

/** 卡片类型展示（后端如 "Virtual Card"，可后续按 cardBin 映射 Visa/Mastercard） */
function cardTypeLabel(card: ICardRecord): string {
    const typeName = (card.cardType || '').trim()
    if (typeName === 'Virtual Card')
        return 'Virtual'
    if (typeName === 'Physical Card')
        return 'Physical'
    return 'Card'
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
    uni.navigateTo({ url: '/pages/cards/create' })
}

function goDetail(card: ICardRecord) {
    const token = card.cardToken || card.id
    uni.navigateTo({ url: `/pages/cards/detail?cardToken=${encodeURIComponent(token)}` }).catch(() => {
        uni.showToast({ title: t('profile.comingSoon'), icon: 'none' })
    })
}

function onTopUp(card: ICardRecord) {
    if (card.status === 1)
        return
    uni.showToast({ title: t('profile.comingSoon'), icon: 'none' })
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
})
</script>

<template>
    <page-meta page-style="overflow: hidden" />

    <z-paging
        ref="pagingRef"
        v-model="userCards"
        paging-class="bg-gray-50"
        @query="onQuery"
    >
        <template #top>
            <view class="flex items-center justify-between bg-gray-50 px-4 pb-2 pt-3">
                <view class="flex flex-col">
                    <text class="text-xs text-gray-500">{{ t('pages.cards.totalCardBalance') }}</text>
                    <text class="mt-0.5 text-lg text-gray-900 font-semibold">
                        {{ formatMoney(cardAll?.availableAmount ?? 0) }}
                    </text>
                </view>
                <t-button
                    theme="primary"
                    size="small"
                    icon="add"
                    t-class="m-0!"
                    @click="goCreate"
                >
                    {{ t('pages.cards.create') }}
                </t-button>
            </view>
        </template>

        <view class="flex flex-col gap-4 px-4 pb-4 pt-2">
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
                class="card-block overflow-hidden rounded-2xl bg-white"
            >
                <view class="from-gray-800 to-gray-900 bg-gradient-to-br p-5 text-white">
                    <!-- 头部：类型 + 状态 -->
                    <view class="flex items-center justify-between">
                        <view class="flex items-center gap-2">
                            <t-icon name="creditcard" size="40rpx" class="text-white opacity-90" />
                            <text class="text-base font-medium opacity-95">{{ cardTypeLabel(card) }}</text>
                            <view
                                v-if="card.isTrialCard"
                                class="rounded bg-amber-500/30 px-2 py-0.5 text-xs text-amber-200 font-medium"
                            >
                                {{ t('pages.cards.trialCard') }}
                            </view>
                        </view>
                        <view
                            class="rounded-full px-3 py-1 text-xs font-medium"
                            :class="card.status === 0 ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'"
                        >
                            {{ card.status === 0 ? t('pages.cards.statusNormal') : t('pages.cards.statusDisabled') }}
                        </view>
                    </view>
                    <!-- 卡号 -->
                    <text class="mt-4 block text-2xl font-semibold tracking-widest opacity-95">
                        {{ displayMaskedCardNumber(card) }}
                    </text>
                    <!-- 额度：后端为 availableAmount / limitAmount -->
                    <view class="grid grid-cols-2 mt-4 gap-3">
                        <view class="min-w-0 flex flex-col">
                            <text class="text-xs opacity-75">{{ t('pages.cards.cardName') }}</text>
                            <text class="mt-1 block truncate text-lg font-medium">
                                {{ cardHolderName(card) }}
                            </text>
                        </view>
                        <view class="flex flex-col items-end">
                            <text class="text-xs opacity-75">{{ t('pages.cards.availableLimit') }}</text>
                            <text class="mt-1 text-lg font-medium">
                                {{ formatMoney(card.availableAmount) }}
                            </text>
                        </view>
                    </view>
                </view>

                <!-- 底部三按钮 -->
                <view class="grid grid-cols-3 gap-3 p-4">
                    <view>
                        <t-button
                            variant="outline"
                            size="small"
                            icon="browse"
                            block
                            @click="goDetail(card)"
                        >
                            {{ t('pages.cards.details') }}
                        </t-button>
                    </view>
                    <view>
                        <t-button
                            variant="outline"
                            size="small"
                            icon="wallet"
                            block
                            :disabled="card.status === 1"
                            @click="onTopUp(card)"
                        >
                            {{ t('pages.cards.topUp') }}
                        </t-button>
                    </view>
                    <view>
                        <t-button
                            variant="outline"
                            :theme="card.status === 0 ? 'danger' : 'default'"
                            :loading="changingId === card.id"
                            size="small"
                            block
                            @click="onToggleStatus(card)"
                        >
                            {{ card.status === 0 ? t('pages.cards.disable') : t('pages.cards.activate') }}
                        </t-button>
                    </view>
                </view>
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
</template>

<style lang="scss" scoped>
.card-block {
    box-shadow:
        0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
