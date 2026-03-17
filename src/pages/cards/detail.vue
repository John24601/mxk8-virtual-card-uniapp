<script lang="ts" setup>
import type { ICardDetailRes, ICardTransactionRecord } from '@/api/types/cards'
import currency from 'currency.js'
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
    uni.navigateTo({ url: `/pages/bills/list?cardToken=${encodeURIComponent(cardToken.value)}` }).catch(() => {
        uni.showToast({ title: t('profile.comingSoon'), icon: 'none' })
    })
}

/** 交易金额展示：支出负、收入正 */
function formatTxAmount(tx: ICardTransactionRecord): string {
    const n = typeof tx.transactionAmount === 'string'
        ? Number.parseFloat(tx.transactionAmount) || 0
        : Number(tx.transactionAmount) || 0
    const absStr = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return n >= 0 ? `+${absStr}` : `-${absStr}`
}

/** 是否成功：后端 status/transactionStatusName 为 Completed 等视为成功 */
function isTxSuccess(tx: ICardTransactionRecord): boolean {
    const s = (tx.status || tx.transactionStatusName || '').toLowerCase()
    if (/completed|success|approved|成功/.test(s))
        return true
    if (typeof tx.transactionStatus === 'boolean')
        return tx.transactionStatus
    return false
}

/** 交易类型/描述：优先 type 或 transactionTypeName，再 merchantName */
function txTypeLabel(tx: ICardTransactionRecord): string {
    const t = (tx.type || tx.transactionTypeName || '').trim()
    if (t)
        return t
    return tx.merchantName || '—'
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
                <!-- 卡片信息块：与列表页同结构同样式 -->
                <view v-if="cardDetail" class="card-block mx-4 mt-3 overflow-hidden rounded-2xl">
                    <view class="from-gray-800 to-gray-900 bg-gradient-to-br p-5 text-white">
                        <view class="flex items-center justify-between">
                            <view class="flex items-center gap-2">
                                <t-icon name="creditcard" size="40rpx" class="text-white opacity-90" />
                                <text class="text-base font-medium opacity-95">{{ cardTypeLabel(cardDetail) }}</text>
                                <view
                                    v-if="cardDetail.isTrialCard"
                                    class="rounded bg-amber-500/30 px-2 py-0.5 text-xs text-amber-200 font-medium"
                                >
                                    {{ t('pages.cards.trialCard') }}
                                </view>
                            </view>
                            <view
                                class="rounded-full px-3 py-1 text-xs font-medium"
                                :class="cardDetail.status === 0 ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'"
                            >
                                {{ cardDetail.status === 0 ? t('pages.cards.statusNormal') : t('pages.cards.statusDisabled') }}
                            </view>
                        </view>
                        <text class="mt-4 block text-2xl font-semibold tracking-widest opacity-95">
                            {{ displayMaskedCardNumber(cardDetail) }}
                        </text>
                        <view class="grid grid-cols-3 mt-4 gap-3">
                            <view class="min-w-0 flex flex-col">
                                <text class="text-xs opacity-75">{{ t('pages.cards.cardName') }}</text>
                                <text class="mt-1 block truncate text-lg font-medium">
                                    {{ cardHolderName(cardDetail) }}
                                </text>
                            </view>
                            <view class="flex flex-col items-center">
                                <text class="text-xs opacity-75">{{ t('pages.cards.availableLimit') }}</text>
                                <text class="mt-1 text-lg font-medium">{{ formatMoney(cardDetail.availableAmount) }}</text>
                            </view>
                            <view class="flex flex-col items-end">
                                <text class="text-xs opacity-75">{{ t('pages.cards.expiryDate') }}</text>
                                <text class="mt-1 text-lg font-medium">{{ formatExpireDate(cardDetail.expries) }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </t-skeleton>

            <!-- 该卡交易记录 -->
            <view class="mx-4 mt-3 rounded-2xl bg-white py-4">
                <view class="flex items-center justify-between px-4 pb-2">
                    <text class="font-semibold">{{ t('pages.cards.cardTransactions') }}</text>
                    <text
                        class="text-sm text-primary"
                        @click="goViewAllTx"
                    >
                        {{ t('common.seeAll') }}
                    </text>
                </view>

                <t-divider />

                <view class="flex flex-col">
                    <view
                        v-for="(tx, index) in txList"
                        :key="tx.id"
                        class="px-4"
                    >
                        <view
                            class="flex items-center justify-between gap-3 py-2"
                        >
                            <view class="min-w-0 flex-1">
                                <text class="block truncate font-medium">{{ tx.merchantName || '--' }}</text>
                                <text class="mt-1 block text-xs text-placeholder">{{ tx.transactionTime }} (UTC)</text>
                            </view>
                            <view class="flex flex-col items-end">
                                <text class="text-warning font-medium">
                                    {{ currency(tx.transactionAmount).format({ symbol: tx.currencyCode === 'USD' ? '$' : `(${tx.currencyCode})` }) }}
                                </text>
                                <text
                                    class="mt-1 text-xs"
                                    :class="[
                                        tx.transactionStatusName === 'Approved' && 'text-success',
                                        tx.transactionStatusName === 'Declined' && 'text-error',
                                    ]"
                                >
                                    {{ tx.transactionStatusName }}
                                </text>
                            </view>
                        </view>

                        <t-divider v-if="index !== txList.length - 1" />
                    </view>
                </view>
            </view>
        </view>

        <template #bottom>
            <view class="grid grid-cols-3 mx-4 gap-3" :class="systemInfo.safeAreaInsets.bottom === 0 && 'pb-4'">
                <view class="col-span-2">
                    <t-button
                        theme="primary"
                        block
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
