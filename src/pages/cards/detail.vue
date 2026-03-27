<script lang="ts" setup>
import type { ICardDetailRes, ICardTransactionRecord } from '@/api/types/cards'
import currency from 'currency.js'
import dayjs from 'dayjs'
import { changeCardStatus, getCardByToken, getCardTransactionActivity } from '@/api/pay/cards'
import { t } from '@/locale'
import { systemInfo } from '@/utils/systemInfo'

defineOptions({
    name: 'CardDetail',
})
definePage({
    style: {
        navigationBarTitleText: '%pages.cards.detailTitle%',
    },
})

const cardToken = ref('')
const cardDetail = ref<ICardDetailRes | null>(null)
const txList = ref<ICardTransactionRecord[]>([])
const changingStatus = ref(false)
const moreOptionsVisible = ref(false)
function formatMoney(value: number | string): string {
    const n = typeof value === 'string' ? Number.parseFloat(value) || 0 : Number(value) || 0
    return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/** 掩码卡号：优先 cardNumberLastFour，否则从 cardNumber 解析 */
function displayMaskedCardNumber(card: ICardDetailRes): string {
    const last4 = card.cardNumberLastFour?.trim()
    if (last4)
        return `****${last4}`
    const s = (card.cardNumber || '').trim()
    if (!s)
        return '****'
    if (/^\*+/.test(s) || /_+/.test(s))
        return s
    if (s.length <= 4)
        return `****${s}`
    return `****${s.slice(-4)}`
}

/** 卡片类型展示 */
function cardTypeLabel(card: ICardDetailRes): string {
    const typeName = (card.cardType || '').trim()
    if (typeName === 'Virtual Card')
        return 'Virtual'
    if (typeName === 'Physical Card')
        return 'Physical'
    return typeName || 'Card'
}

/** 有效期格式化为 MM/YY，支持 0326、2026-03 等 */
function formatExpireDate(expireDate: string | null): string {
    if (!expireDate || !expireDate.trim())
        return '—'
    const s = expireDate.trim()
    if (/^\d{4}$/.test(s))
        return `${s.slice(0, 2)}/${s.slice(2)}`
    if (/^\d{4}-\d{2}/.test(s))
        return `${s.slice(5, 7)}/${s.slice(2, 4)}`
    return s
}

function fetchDetail() {
    getCardByToken(cardToken.value).then((info) => {
        cardDetail.value = info
    })
}

function onViewFullNumber() {
    uni.showToast({ title: t('pages.cards.viewFullNumberHint'), icon: 'none' })
}

function onMoreOptions() {
    moreOptionsVisible.value = true
}

function onTopUp() {
    uni.showToast({ title: t('pages.cards.topUpComing'), icon: 'none' })
}

function goViewAllTx() {
    uni.navigateTo({ url: `/pages/bills/index?cardToken=${encodeURIComponent(cardToken.value)}` })
}

/** 持卡人姓名：firstName + lastName */
function cardHolderName(card: ICardDetailRes): string {
    const first = (card.firstName || '').trim()
    const last = (card.lastName || '').trim()
    return [first, last].filter(Boolean).join(' ') || '—'
}

function handleSelected(e: { index: number }) {
    if (e.index === 0)
        onViewFullNumber()
    else if (e.index === 1)
        onToggleStatus()
}

/** 切换卡片激活/禁用状态：0 激活，1 禁用 */
async function onToggleStatus() {
    const card = cardDetail.value
    if (!card || changingStatus.value)
        return
    const nextStatus = (card.status === 0 ? 1 : 0) as 0 | 1
    changingStatus.value = true
    try {
        await changeCardStatus(card.id, nextStatus)
        await fetchDetail()
        uni.showToast({
            title: nextStatus === 0 ? t('pages.cards.activateSuccess') : t('pages.cards.disableSuccess'),
            icon: 'success',
        })
    }
    catch {
        uni.showToast({ title: t('common.operateFailed'), icon: 'none' })
    }
    finally {
        changingStatus.value = false
    }
}

function onCancel() {
    moreOptionsVisible.value = false
}

const moreOptions = computed(() => [
    {
        label: t('pages.cards.viewFullNumber'),
        icon: 'browse',
        color: '#222324',
    },
    {
        label: cardDetail.value?.status === 0 ? t('pages.cards.disable') : t('pages.cards.activate'),
        icon: cardDetail.value?.status === 0 ? 'slash' : 'check-circle',
        color: cardDetail.value?.status === 0 ? '#E34D59' : '#0052D9',
    },
])

const pagingRef = ref(null)

function onQuery() {
    fetchDetail()

    getCardTransactionActivity({
        cardToken: cardToken.value,
        current: 1,
        pageSize: 10,
    }).then(({ records, total }) => {
        pagingRef.value?.completeByTotal(records, total)
    })
}

onLoad((options) => {
    const token = options?.cardToken ?? ''
    if (!token) {
        uni.showToast({ title: '缺少卡片参数', icon: 'none' })
        setTimeout(() => uni.navigateBack(), 1500)
        return
    }
    cardToken.value = token
})
</script>

<template>
    <page-meta page-style="overflow: hidden" />

    <z-paging
        ref="pagingRef"
        v-model="txList"
        paging-class="bg-page"
        safe-area-inset-bottom
        :loading-more-enabled="false"
        @query="onQuery"
    >
        <view class="overflow-hidden">
            <t-skeleton
                theme="image"
                animation="gradient"
                :loading="!cardDetail"
                t-class="mx-4 mt-4"
                :row-col="[{ width: '100%', height: '380rpx', type: 'rect' }]"
                :custom-style="{ '--td-skeleton-rect-border-radius': '32rpx' }"
            >
                <view v-if="cardDetail" class="card-block mx-4 mt-4 overflow-hidden" style="border-radius: 40rpx;">
                    <fg-master-card-viewer
                        v-if="cardDetail.cardBin.startsWith('5')"
                        :card-number="cardDetail.cardNumber"
                        :expiration-date="cardDetail.endDate ? dayjs(cardDetail.endDate).format('MM/YY') : ''"
                        :first-name="cardDetail.firstName"
                        :last-name="cardDetail.lastName"
                    />
                    <fg-virtual-card-viewer
                        v-else
                        :card-number="cardDetail.cardNumber"
                        :expiration-date="cardDetail.endDate ? dayjs(cardDetail.endDate).format('MM/YY') : ''"
                        :first-name="cardDetail.firstName"
                        :last-name="cardDetail.lastName"
                    />
                </view>
            </t-skeleton>

            <!-- 该卡交易记录 -->
            <view class="mx-4 mb-6 mt-6">
                <view class="mb-3 flex items-center justify-between pl-2">
                    <text class="font-bold">{{ t('pages.cards.cardTransactions') }}</text>
                    <t-button
                        theme="light"
                        shape="round"
                        size="extra-small"
                        t-class="m-0!"
                        @click="goViewAllTx"
                    >
                        {{ t('home.viewAll') }}
                    </t-button>
                </view>

                <view class="flex flex-col gap-2">
                    <fg-card-transaction-item
                        v-for="item in txList"
                        :key="item.id"
                        :title="item.merchantName"
                        :card-name="item.cardName"
                        :card-number="`${item.cardBin} **** ${item.cardNumber}`"
                        :time="`${item.transactionTime} (UTC)`"
                        :amount="currency(item.transactionAmount).format({ symbol: item.currencyCode === 'USD' ? '$' : `(${item.currencyCode})` })"
                        :status="item.status"
                        :status-name="item.transactionStatusName"
                    />
                </view>
            </view>
        </view>

        <template #bottom>
            <view class="grid grid-cols-3 mx-4 gap-3 pt-3" :class="systemInfo.safeAreaInsets.bottom === 0 && 'pb-4'">
                <view class="col-span-2">
                    <t-button
                        theme="primary"
                        block
                        size="large"
                        icon="wallet"
                        @click="onTopUp"
                    >
                        {{ t('pages.cards.topUp') }}
                    </t-button>
                </view>
                <view>
                    <t-button
                        variant="outline"
                        block
                        size="large"
                        icon="more"
                        @click="onMoreOptions"
                    >
                        More
                    </t-button>
                </view>
            </view>
        </template>
    </z-paging>

    <t-action-sheet
        ref="t-action-sheet"
        v-model:visible="moreOptionsVisible"
        :items="moreOptions"
        align="left"
        :description="t('pages.cards.moreActions')"
        :cancel-text="t('common.cancel')"
        @selected="handleSelected"
        @cancel="onCancel"
    />
</template>

<style lang="scss" scoped>
.card-block {
    box-shadow:
        0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
