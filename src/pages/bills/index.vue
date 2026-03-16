<script lang="ts" setup>
import type { IBillRecord } from '@/api/types/home'
import currency from 'currency.js'
import { getBillList } from '@/api/pay/bills'
// import { t } from '@/locale'

defineOptions({
    name: 'BillsList',
})
definePage({
    style: {
        navigationBarTitleText: '%pages.bills.title%',
    },
})

/** 筛选：全部 / 收入(Credit) / 支出(Debit) */
const filterType = ref<'all' | 'Credit' | 'Debit'>('all')
const list = ref<IBillRecord[]>([])
const pagingRef = ref<ZPagingRef<IBillRecord>>()
const loading = ref(true)

/** 交易类型选项 */
const filterOptions = [
    { value: 'all' as const, labelKey: 'pages.bills.filterAll' },
    { value: 'Credit' as const, labelKey: 'pages.bills.filterIncome' },
    { value: 'Debit' as const, labelKey: 'pages.bills.filterExpense' },
]

/** z-paging 分页请求：pageNo 从 1 开始，与后端 current 一致 */
async function onQuery(pageNo: number, pageSize: number) {
    loading.value = true
    try {
        const params: { current: number, pageSize: number, transactionType?: string } = {
            current: pageNo,
            pageSize,
        }
        if (filterType.value !== 'all')
            params.transactionType = filterType.value
        const res = await getBillList(params)
        const records = res.records ?? []
        const total = res.total ?? 0
        pagingRef.value?.completeByTotal(records, total)
    }
    catch {
        pagingRef.value?.complete(false)
    }
    finally {
        loading.value = false
    }
}

function onFilterChange(value: 'all' | 'Credit' | 'Debit') {
    filterType.value = value
    pagingRef.value?.reload()
}

function goDetail(record: IBillRecord) {
    if (!record.id)
        return
    uni.navigateTo({ url: `/pages/bills/detail?id=${encodeURIComponent(record.id)}` })
}

onShow(() => {
    pagingRef.value?.updateFixedLayout?.()
})
</script>

<template>
    <page-meta page-style="overflow: hidden" />

    <z-paging
        ref="pagingRef"
        v-model="list"
        paging-class="bg-page"
        safe-area-inset-bottom
        @query="onQuery"
    >
        <!-- <template #top>
            <view class="flex items-center gap-2 bg-gray-50 px-4 pb-3 pt-2">
                <view
                    v-for="opt in filterOptions"
                    :key="opt.value"
                    class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    :class="filterType === opt.value
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-600'"
                    @click="onFilterChange(opt.value)"
                >
                    {{ t(opt.labelKey) }}
                </view>
            </view>
        </template> -->

        <view class="p-2">
            <view class="flex flex-col rounded-sm bg-white p-4">
                <view
                    v-for="(item, index) in list"
                    :key="item.id"
                    @click="goDetail(item)"
                >
                    <view class="flex items-start justify-between gap-4">
                        <view class="min-w-0 flex-1">
                            <text class="block truncate text-primary font-medium">
                                {{ item.merchantName || '--' }}
                            </text>
                            <view class="mt-1 flex flex-col text-xs text-[var(--td-text-color-secondary)]">
                                <text>{{ item.cardName }}</text>
                                <text class="mt-1">{{ `${item.cardBin} **** ${item.cardNumber}` }}</text>
                            </view>
                            <text class="mt-1 block text-xs text-[var(--td-text-color-placeholder)]">
                                {{ item.transactionTime }} (UTC)
                            </text>
                        </view>

                        <view class="flex flex-col items-end">
                            <text class="shrink-0 font-semibold">
                                {{ currency(item.transactionAmount).format({ symbol: item.currencyCode === 'USD' ? '$' : `(${item.currencyCode})` }) }}
                            </text>

                            <text
                                class="mt-1 text-xs"
                                :class="[
                                    item.transactionStatusName === 'Approved' && 'text-success',
                                    item.transactionStatusName === 'Declined' && 'text-error',
                                ]"
                            >
                                {{ item.transactionStatusName }}
                            </text>
                        </view>
                    </view>

                    <t-divider v-if="index !== list.length - 1" :custom-style="{ '--td-divider-horizontal-margin': '30rpx' }" />
                </view>
            </view>
        </view>
    </z-paging>
</template>
