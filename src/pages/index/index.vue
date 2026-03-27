<script lang="ts" setup>
import type { IBillRecord, IFundStatsRes, IUserAccountRes } from '@/api/types/home'
import currency from 'currency.js'
import { getBillList } from '@/api/pay/bills'
import { getTotalFundAmount, getUserAccount } from '@/api/pay/funds'
import { t } from '@/locale'
import { useUserStore } from '@/store/user'

defineOptions({
    name: 'Home',
})
definePage({
    type: 'home',
    style: {
        navigationBarTitleText: '%home.title%',
        navigationStyle: 'custom',
        enablePullDownRefresh: true,
    },
})

const RECENT_SKELETON_COUNT = 2

const balanceVisible = ref(true)
const account = ref<IUserAccountRes | null>(null)
const statsDay = ref<7 | 30 | 90>(7)
const fundStats = ref<IFundStatsRes | null>(null)
const recentBills = ref<IBillRecord[]>([])
const loading = ref(false)
const loadingStats = ref(false)
const loadingBills = ref(true)

const loadingMoreNoMoreText = computed(() => uni.$zp.config['loading-more-no-more-text'][uni.getLocale()])

const displayName = computed(() => {
    const userStore = useUserStore()
    const u = userStore.userInfo
    if (!u)
        return ''
    const first = [u.firstName, u.lastName].filter(Boolean).join(' ').trim()
    if (first)
        return first
    if (u.englishName)
        return u.englishName
    if (u.businessNo)
        return u.businessNo
    return u.id || ''
})

/** 可用余额（兼容后端不同字段） */
const availableBalance = computed(() => {
    const a = account.value
    if (!a)
        return 0
    return a.AvailableAmount ?? 0
})

/** 卡片总余额 */
const cardTotalBalance = computed(() => {
    const a = account.value
    if (!a)
        return 0
    return a.CardBalance ?? 0
})

/** 已用额度 = 卡片总余额 - 可用余额（设计图逻辑） */
const usedLimit = computed(() => {
    const card = cardTotalBalance.value
    const avail = availableBalance.value
    return Math.max(0, card - avail)
})

function formatMoney(value: number, hidden = false) {
    return hidden ? t('home.amountHidden') : currency(value).format()
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
        recentBills.value = res.records ?? []
    }
    catch {
        recentBills.value = []
    }
    finally {
        loadingBills.value = false
    }
}

async function onRefresh() {
    return await Promise.all([fetchAccount(), fetchStats(), fetchRecentBills()])
}

function goCards() {
    uni.switchTab({ url: '/pages/cards/index' })
}
function goBills() {
    uni.navigateTo({ url: '/pages/bills/index' })
}
function goFunds() {
    uni.navigateTo({ url: '/pages/funds/list' })
}
function goProfile() {
    uni.switchTab({ url: '/pages/profile/index' })
}
function goBillsList() {
    uni.navigateTo({ url: '/pages/bills/index' })
}

watch(statsDay, fetchStats)

onShow(() => {
    onRefresh()
})

onPullDownRefresh(async () => {
    await onRefresh()
    uni.stopPullDownRefresh()
})
</script>

<template>
    <view class="home-page relative box-border min-h-100vh flex flex-col overflow-hidden pb-tabbar">
        <!-- 弥散渐变背景层 -->
        <view class="home-diffuse-bg" />

        <view class="home-content relative z-1 min-h-0 flex flex-1 flex-col overflow-visible">
            <t-navbar placeholder :custom-style="{ '--td-navbar-background': 'transparent' }">
                <template #left>
                    <view class="ml-1" @click="goProfile">
                        <t-avatar size="56rpx" t-class-content="external-class-content">
                            {{ displayName.charAt(0) }}
                        </t-avatar>
                    </view>
                </template>

                <template #title>
                    <view>
                        <t-image
                            src="/static/images/logo.svg"
                            custom-style="width: 87px;height: 24px;"
                        />
                    </view>
                </template>
            </t-navbar>

            <!-- 余额区：毛玻璃蓝色卡片 -->
            <view class="home-glass-card mx-4 mt-4 rounded-2xl from-[var(--td-brand-color-6)] to-[var(--td-brand-color-9)] bg-gradient-to-br px-6 py-6">
                <view class="flex items-center justify-between">
                    <text class="text-sm text-white opacity-80">{{ t('home.availableBalanceUnit') }}</text>
                    <t-icon
                        name="browse"
                        size="40rpx"
                        class="text-white"
                        @click="balanceVisible = !balanceVisible"
                    />
                </view>
                <text class="mt-2 block text-3xl text-white font-bold tracking-tight">
                    {{ formatMoney(availableBalance, !balanceVisible) }}
                </text>
                <view class="mt-8 flex gap-20">
                    <view class="flex flex-col">
                        <text class="text-xs text-white opacity-80">{{ t('home.cardTotalBalance') }}</text>
                        <text class="mt-1 text-base text-white font-bold">{{ formatMoney(cardTotalBalance, !balanceVisible) }}</text>
                    </view>
                    <view class="flex flex-col">
                        <text class="text-xs text-white opacity-80">{{ t('home.usedLimit') }}</text>
                        <text class="mt-1 text-base text-white font-bold">{{ formatMoney(usedLimit, !balanceVisible) }}</text>
                    </view>
                </view>
            </view>

            <!-- 收支统计 -->
            <view class="mx-4 mt-6">
                <view class="mb-3 flex items-center justify-between pl-2">
                    <text class="text-lg font-bold">{{ t('home.incomeExpenseStats') }}</text>
                    <view class="flex gap-2">
                        <view
                            v-for="d in [7, 30, 90]"
                            :key="d"
                            class="w-14 rounded-full py-1 text-center text-sm"
                            :class="statsDay === d ? 'bg-primary text-white' : 'home-glass-panel'"
                            @click="statsDay = (d as 7 | 30 | 90)"
                        >
                            {{ t(d === 7 ? 'home.day7' : d === 30 ? 'home.day30' : 'home.day90') }}
                        </view>
                    </view>
                </view>
                <view class="flex gap-3">
                    <view class="home-glass-panel flex-1 rounded-2xl px-4 py-3 bg-green-100/40!">
                        <text class="text-sm text-green-700">{{ t('home.income') }}</text>
                        <text class="mt-1 block text-lg text-green-600 font-semibold">
                            {{ balanceVisible ? (currency(fundStats?.mxk_pay_money_in ?? '0.00').format()) : t('home.amountHidden') }}
                        </text>
                    </view>
                    <view class="home-glass-panel flex-1 rounded-2xl px-4 py-3 bg-red-100/40!">
                        <text class="text-sm text-red-700">{{ t('home.expense') }}</text>
                        <text class="mt-1 block text-lg text-red-600 font-semibold">
                            {{ balanceVisible ? (currency(fundStats?.mxk_pay_money_out ?? '0.00').format()) : t('home.amountHidden') }}
                        </text>
                    </view>
                </view>
            </view>

            <!-- 快捷入口 -->
            <!-- <view class="mx-4 mt-2">
            <t-grid
                theme="card"
                hover
                :custom-style="{
                    'margin': 0,
                    '--td-grid-bg-color': 'transparent',
                    '--td-grid-item-bg-color': 'transparent',
                    '--td-grid-item-image-middle-width': '100rpx',
                }"
            >
                <t-grid-item
                    :text="t('home.shortcutMyCards')"
                    icon="creditcard"
                    @click="goCards"
                />
                <t-grid-item
                    :text="t('home.shortcutBills')"
                    icon="file-paste"
                    @click="goBills"
                />
                <t-grid-item
                    :text="t('home.shortcutFunds')"
                    icon="chart"
                    @click="goFunds"
                />
                <t-grid-item
                    :text="t('home.shortcutProfile')"
                    icon="user"
                    @click="goProfile"
                />
            </t-grid>
        </view> -->

            <!-- 最近交易 -->
            <view class="mx-4 mt-6 pb-3">
                <view class="mb-3 flex items-center justify-between pl-2">
                    <text class="text-lg font-bold">{{ t('home.recentTransactions') }}</text>
                    <t-button
                        theme="light"
                        shape="round"
                        size="extra-small"
                        t-class="m-0!"
                        @click="goBillsList"
                    >
                        {{ t('home.viewAll') }}
                    </t-button>
                </view>
                <view v-if="!loadingBills && recentBills.length === 0" class="py-8 text-center text-sm text-gray-400">
                    {{ loadingMoreNoMoreText }}
                </view>
                <view class="flex flex-col gap-2">
                    <template v-if="loadingBills && recentBills.length === 0">
                        <fg-card-transaction-item
                            v-for="n in RECENT_SKELETON_COUNT"
                            :key="n"
                            loading
                            class="home-glass-panel"
                        />
                    </template>

                    <template v-else>
                        <fg-card-transaction-item
                            v-for="item in recentBills"
                            :key="item.id"
                            :url="`/pages/bills/detail?id=${item.id}`"
                            :title="item.merchantName"
                            :card-name="item.cardName"
                            :card-number="`${item.cardBin} **** ${item.cardNumber}`"
                            :time="`${item.transactionTime} (UTC)`"
                            :amount="currency(item.transactionAmount).format({ symbol: item.currencyCode === 'USD' ? '$' : `(${item.currencyCode})` })"
                            :status="item.status"
                            :status-name="item.transactionStatusName"
                            class="home-glass-panel"
                        />
                    </template>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
/* 弥散型渐变色背景：多组径向渐变叠加形成柔和色块 */
.home-diffuse-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
        radial-gradient(ellipse 70% 60% at 10% 10%, rgba(0, 82, 217, 0.18), transparent 60%),
        radial-gradient(ellipse 55% 50% at 90% 25%, rgba(54, 110, 244, 0.14), transparent 55%),
        radial-gradient(ellipse 60% 70% at 50% 85%, rgba(0, 136, 88, 0.12), transparent 60%),
        radial-gradient(ellipse 50% 40% at 75% 70%, rgba(94, 129, 244, 0.1), transparent 50%), var(--td-bg-color-page);
}

/* 毛玻璃卡片：背板模糊 + 半透明 */
.home-glass-card {
    // backdrop-filter: blur(12px);
    // -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8rpx 48rpx rgba(0, 0, 0, 0.25);
}

.home-glass-panel {
    backdrop-filter: blur(24rpx);
    -webkit-backdrop-filter: blur(24rpx);
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 4rpx 32rpx rgba(0, 0, 0, 0.06);
}

@media (prefers-color-scheme: dark) {
    .home-diffuse-bg {
        background:
            radial-gradient(ellipse 70% 60% at 10% 10%, rgba(38, 103, 212, 0.2), transparent 60%),
            radial-gradient(ellipse 55% 50% at 90% 25%, rgba(69, 130, 230, 0.15), transparent 55%),
            radial-gradient(ellipse 60% 70% at 50% 85%, rgba(67, 191, 150, 0.12), transparent 60%),
            radial-gradient(ellipse 50% 40% at 75% 70%, rgba(105, 158, 245, 0.1), transparent 50%),
            var(--td-bg-color-page);
    }

    .home-glass-panel {
        background: rgba(42, 42, 42, 0.6);
        box-shadow: 0 4rpx 32rpx rgba(0, 0, 0, 0.2);
    }
}

:deep(.external-class-content) {
    background-color: var(--td-brand-color);
    color: var(--td-font-white-1);
}

:deep(.t-grid-item__image--icon) {
    background-color: #fff !important;
    border-radius: 50% !important;
}
</style>
