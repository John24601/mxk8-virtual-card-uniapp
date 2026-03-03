<script lang="ts" setup>
import type { IBillRecord, IFundStatsRes, IUserAccountRes } from '@/api/types/home'
import { getBillList } from '@/api/pay/bills'
import { getTotalFundAmount, getUserAccount } from '@/api/pay/funds'
import { t } from '@/locale'

defineOptions({
    name: 'Home',
})
definePage({
    type: 'home',
    style: {
        navigationBarTitleText: '%home.title%',
    },
})

const balanceVisible = ref(true)
const account = ref<IUserAccountRes | null>(null)
const statsDay = ref<7 | 30 | 90>(7)
const fundStats = ref<IFundStatsRes | null>(null)
const recentBills = ref<IBillRecord[]>([])
const loading = ref(false)
const loadingStats = ref(false)
const loadingBills = ref(false)

/** 可用余额（兼容后端不同字段） */
const availableBalance = computed(() => {
    const a = account.value
    if (!a)
        return 0
    return (a.AvailableAmount ?? a.availableAmount ?? a.availableBalance) ?? 0
})

/** 卡片总余额 */
const cardTotalBalance = computed(() => {
    const a = account.value
    if (!a)
        return 0
    return (a.CardBalance ?? a.cardBalance) ?? 0
})

/** 已用额度 = 卡片总余额 - 可用余额（设计图逻辑） */
const usedLimit = computed(() => {
    const card = cardTotalBalance.value
    const avail = availableBalance.value
    return Math.max(0, card - avail)
})

function formatMoney(value: number, hidden = false) {
    if (hidden)
        return t('home.amountHidden')
    return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/** 解析交易金额（后端可能为 string 如 "20.0"） */
function parseBillAmount(record: IBillRecord): number {
    const v = record.showAmount ?? record.transactionAmount
    if (typeof v === 'string')
        return Number.parseFloat(v) || 0
    return Number(v) || 0
}

function formatBillAmount(record: IBillRecord) {
    const isCredit = isBillIncome(record)
    const absVal = Math.abs(parseBillAmount(record))
    const str = absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return isCredit ? `++${str}` : `-${str}`
}

/** 是否为收入（根据类型名判断：Refund/Credit/充值/退款 等为收入） */
function isBillIncome(record: IBillRecord): boolean {
    const typeName = (record.transactionTypeName ?? record.type ?? '').toLowerCase()
    return /refund|credit|充值|退款|reversal/i.test(typeName)
}

/** 交易状态对应的 i18n key（后端 status 为 "PENDING"，transactionStatus 为 boolean，transactionStatusName 为 "Approved"） */
function statusKey(record: IBillRecord): string {
    const status = (record.status ?? '').toUpperCase()
    const statusName = (record.transactionStatusName ?? '').toLowerCase()
    const approved = record.transactionStatus === true
    if (approved || status === 'SUCCESS' || status === 'COMPLETED' || statusName === 'approved')
        return 'home.statusSuccess'
    if (status === 'FAILED' || record.transactionStatus === false)
        return 'home.statusFailed'
    return 'home.statusPending'
}

function billTitle(record: IBillRecord) {
    const typeName = record.type ?? record.transactionTypeName ?? ''
    const merchant = record.merchantName ?? ''
    return merchant ? `${typeName}・${merchant}` : typeName || '—'
}

/** 展示用时间（优先 transactionTime） */
function billTime(record: IBillRecord) {
    return record.transactionTime ?? record.createTime ?? '—'
}

async function fetchAccount() {
    loading.value = true
    try {
        account.value = await getUserAccount()
    }
    catch {
        account.value = null
    }
    finally {
        loading.value = false
    }
}

async function fetchStats() {
    loadingStats.value = true
    try {
        fundStats.value = await getTotalFundAmount(statsDay.value)
    }
    catch {
        fundStats.value = null
    }
    finally {
        loadingStats.value = false
    }
}

async function fetchRecentBills() {
    loadingBills.value = true
    try {
        const res = await getBillList({ current: 1, pageSize: 5 })
        recentBills.value = res?.records ?? []
    }
    catch {
        recentBills.value = []
    }
    finally {
        loadingBills.value = false
    }
}

async function onRefresh() {
    await Promise.all([fetchAccount(), fetchStats(), fetchRecentBills()])
}

watch(statsDay, fetchStats)

onLoad(() => {
    onRefresh()
})

function goCards() {
    uni.navigateTo({ url: '/pages/cards/list' })
}
function goBills() {
    uni.navigateTo({ url: '/pages/bills/list' })
}
function goFunds() {
    uni.navigateTo({ url: '/pages/funds/list' })
}
function goProfile() {
    uni.switchTab({ url: '/pages/profile/index' })
}
function goBillsList() {
    uni.navigateTo({ url: '/pages/bills/list' })
}
</script>

<template>
    <view class="home-page box-border min-h-100vh flex flex-col bg-gray-100 pb-tabbar">
        <!-- <t-navbar :title="t('home.title')" placeholder /> -->

        <scroll-view
            scroll-y
            class="flex-1"
            refresher-enabled
            :refresher-triggered="loading"
            @refresherrefresh="onRefresh"
        >
            <!-- 余额区：蓝色卡片 -->
            <view class="balance-card mx-4 mt-4 rounded-2xl px-5 py-5" style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);">
                <view class="flex items-center justify-between">
                    <text class="text-sm text-white opacity-90">{{ t('home.availableBalanceUnit') }}</text>
                    <t-icon
                        name="browse"
                        size="20px"
                        class="text-white"
                        @click="balanceVisible = !balanceVisible"
                    />
                </view>
                <text class="mt-2 block text-3xl text-white font-bold tracking-tight">
                    {{ formatMoney(availableBalance, !balanceVisible) }}
                </text>
                <view class="mt-5 flex gap-6">
                    <view class="flex flex-col">
                        <text class="text-xs text-white opacity-80">{{ t('home.cardTotalBalance') }}</text>
                        <text class="mt-1 text-base text-white font-medium">{{ formatMoney(cardTotalBalance, !balanceVisible) }}</text>
                    </view>
                    <view class="flex flex-col">
                        <text class="text-xs text-white opacity-80">{{ t('home.usedLimit') }}</text>
                        <text class="mt-1 text-base text-white font-medium">{{ formatMoney(usedLimit, !balanceVisible) }}</text>
                    </view>
                </view>
            </view>

            <!-- 收支统计 -->
            <view class="mx-4 mt-4 rounded-2xl bg-white px-4 py-4">
                <text class="text-base text-gray-900 font-medium">{{ t('home.incomeExpenseStats') }}</text>
                <view class="mt-3 flex gap-2">
                    <view
                        v-for="d in [7, 30, 90]"
                        :key="d"
                        class="rounded-lg px-3 py-1.5 text-sm"
                        :class="statsDay === d ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'"
                        @click="statsDay = d as 7 | 30 | 90"
                    >
                        {{ t(d === 7 ? 'home.day7' : d === 30 ? 'home.day30' : 'home.day90') }}
                    </view>
                </view>
                <view class="mt-3 flex gap-3">
                    <view class="flex-1 rounded-xl bg-green-50 px-4 py-3">
                        <text class="text-sm text-green-700">{{ t('home.income') }}</text>
                        <text class="mt-1 block text-lg text-green-600 font-semibold">
                            {{ balanceVisible ? formatMoney((fundStats?.mxk_pay_money_in) ?? 0) : t('home.amountHidden') }}
                        </text>
                    </view>
                    <view class="flex-1 rounded-xl bg-red-50 px-4 py-3">
                        <text class="text-sm text-red-700">{{ t('home.expense') }}</text>
                        <text class="mt-1 block text-lg text-red-600 font-semibold">
                            {{ balanceVisible ? formatMoney((fundStats?.mxk_pay_money_out) ?? 0) : t('home.amountHidden') }}
                        </text>
                    </view>
                </view>
            </view>

            <!-- 快捷入口 -->
            <view class="mx-4 mt-4 rounded-2xl bg-white px-4 py-4">
                <view class="grid grid-cols-4 gap-4">
                    <view class="flex flex-col items-center gap-2" @click="goCards">
                        <view class="h-12 w-12 flex items-center justify-center border-2 border-primary rounded-full">
                            <t-icon name="creditcard" size="24px" class="text-primary" />
                        </view>
                        <text class="text-center text-xs text-gray-700">{{ t('home.shortcutMyCards') }}</text>
                    </view>
                    <view class="flex flex-col items-center gap-2" @click="goBills">
                        <view class="h-12 w-12 flex items-center justify-center border-2 border-primary rounded-full">
                            <t-icon name="file-paste" size="24px" class="text-primary" />
                        </view>
                        <text class="text-center text-xs text-gray-700">{{ t('home.shortcutBills') }}</text>
                    </view>
                    <view class="flex flex-col items-center gap-2" @click="goFunds">
                        <view class="h-12 w-12 flex items-center justify-center border-2 border-primary rounded-full">
                            <t-icon name="chart" size="24px" class="text-primary" />
                        </view>
                        <text class="text-center text-xs text-gray-700">{{ t('home.shortcutFunds') }}</text>
                    </view>
                    <view class="flex flex-col items-center gap-2" @click="goProfile">
                        <view class="h-12 w-12 flex items-center justify-center border-2 border-primary rounded-full">
                            <t-icon name="user" size="24px" class="text-primary" />
                        </view>
                        <text class="text-center text-xs text-gray-700">{{ t('home.shortcutProfile') }}</text>
                    </view>
                </view>
            </view>

            <!-- 最近交易 -->
            <view class="mx-4 mt-4 rounded-2xl bg-white px-4 py-4">
                <view class="flex items-center justify-between">
                    <text class="text-base text-gray-900 font-medium">{{ t('home.recentTransactions') }}</text>
                    <text class="text-sm text-primary" @click="goBillsList">{{ t('home.viewAll') }}</text>
                </view>
                <view v-if="loadingBills" class="py-8 text-center text-sm text-gray-400">
                    加载中…
                </view>
                <view v-else-if="recentBills.length === 0" class="py-8 text-center text-sm text-gray-400">
                    暂无交易
                </view>
                <view v-else class="mt-3 flex flex-col divide-y divide-gray-100">
                    <view
                        v-for="item in recentBills"
                        :key="item.id"
                        class="flex items-center justify-between py-3"
                    >
                        <view class="flex flex-col gap-0.5">
                            <text class="text-sm text-gray-900">{{ billTitle(item) }}</text>
                            <text class="text-xs text-gray-400">{{ billTime(item) }}</text>
                        </view>
                        <view class="flex flex-col items-end gap-0.5">
                            <text
                                class="text-sm font-medium"
                                :class="isBillIncome(item) ? 'text-green-600' : 'text-red-600'"
                            >
                                {{ formatBillAmount(item) }}
                            </text>
                            <text class="text-xs text-green-600">{{ t(statusKey(item)) }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<style lang="scss" scoped>
.home-page {
    --primary: #018d71;
}
</style>
