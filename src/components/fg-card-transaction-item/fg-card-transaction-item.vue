<script lang="ts" setup>
import type { IBillRecord } from '@/api/types/home'

interface Props {
    url?: string
    title?: string
    cardName?: string
    cardNumber?: string
    time?: string
    amount?: string
    status?: IBillRecord['transactionStatusName']
}

defineOptions({
    name: 'FgCardTransactionItem',
    options: {
        virtualHost: true,
    },
})

defineProps<Props>()
</script>

<template>
    <navigator
        :url="url"
        class="flex items-start justify-between gap-4 overflow-hidden rounded-2xl bg-container p-4"
    >
        <view class="min-w-0 flex-1">
            <text class="block truncate font-medium">
                {{ title || '--' }}
            </text>
            <view v-if="cardName && cardNumber" class="mt-1 flex flex-col text-xs text-secondary">
                <text>{{ cardName }}</text>
                <text class="mt-1">{{ cardNumber }}</text>
            </view>
            <text class="mt-2 block text-xs text-placeholder">
                {{ time }}
            </text>
        </view>

        <view class="flex flex-col items-end">
            <text class="shrink-0 font-semibold">
                {{ amount }}
            </text>

            <text
                class="mt-1 text-xs"
                :class="[
                    ['Approved', 'Completed'].includes(status) && 'text-success',
                    status === 'Declined' && 'text-error',
                ]"
            >
                {{ status }}
            </text>
        </view>
    </navigator>
</template>
