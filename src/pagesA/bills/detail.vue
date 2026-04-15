<script lang="ts" setup>
import type { IBillRecord } from '@/api/types/home'
import currency from 'currency.js'
import { getBillDetail } from '@/api/pay/bills'

defineOptions({
    name: 'BillsDetail',
})
definePage({
    style: {
        navigationBarTitleText: '%pages.billsDetail.title%',
    },
})

const billId = ref('')
const billDetail = ref<IBillRecord[]>([])

onLoad((options) => {
    billId.value = options.id
})

onShow(() => {
    getBillDetail(billId.value).then((res) => {
        console.log('🚀 ~ res:', res)
        billDetail.value = res ?? []
    })
})
</script>

<template>
    <view class="min-h-screen bg-page pb-safe">
        <view class="flex flex-col gap-3 py-4">
            <view
                v-for="(item, index) in billDetail"
                :key="index"
                :style="{
                    '--td-cell-group-title-color': ['PENDING', 'COMPLETED'].includes(item.status) ? 'var(--td-success-color)' : 'var(--td-error-color)',
                    '--td-cell-title-color': 'var(--td-text-color-secondary)',
                }"
            >
                <t-cell-group theme="card" :title="item.transactionStatusName">
                    <t-cell title="交易描述" hover>
                        <template #right-icon>
                            <text>{{ item.merchantName || '--' }}</text>
                        </template>
                    </t-cell>
                    <t-cell title="交易类型" hover>
                        <template #right-icon>
                            <text>{{ item.transactionTypeName || '--' }}</text>
                        </template>
                    </t-cell>
                    <t-cell title="交易时间 (UTC)" hover>
                        <template #right-icon>
                            <text>{{ item.transactionTime }}</text>
                        </template>
                    </t-cell>
                    <t-cell title="持卡人" hover>
                        <template #right-icon>
                            <text>{{ item.cardName }}</text>
                        </template>
                    </t-cell>
                    <t-cell title="支付卡片" hover>
                        <template #right-icon>
                            <text>{{ `${item.cardBin} **** ${item.cardNumber}` }}</text>
                        </template>
                    </t-cell>
                    <t-cell title="币种" hover>
                        <template #right-icon>
                            <text>{{ item.currencyCode }}</text>
                        </template>
                    </t-cell>
                    <t-cell title="手续费" hover>
                        <template #right-icon>
                            <text>{{ currency(item.transactionFee).format({ symbol: item.currencyCode === 'USD' ? '$' : `(${item.currencyCode})` }) }}</text>
                        </template>
                    </t-cell>
                    <t-cell title="实际金额" hover>
                        <template #right-icon>
                            <text>{{ currency(item.transactionAmount).format({ symbol: item.currencyCode === 'USD' ? '$' : `(${item.currencyCode})` }) }}</text>
                        </template>
                    </t-cell>
                    <!-- <t-cell title="状态" hover>
                        <template #right-icon>
                            <text
                                :class="[
                                    ['PENDING', 'COMPLETED'].includes(item.status) && 'text-success',
                                    item.status === 'DECLINED' && 'text-error',
                                ]"
                            >
                                {{ item.transactionStatusName }}
                            </text>
                        </template>
                    </t-cell> -->
                </t-cell-group>
            </view>
        </view>
    </view>
</template>
