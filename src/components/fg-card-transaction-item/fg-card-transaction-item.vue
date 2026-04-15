<script lang="ts" setup>
import type { IBillRecord } from '@/api/types/home'

interface Props {
    url?: string
    title?: string
    cardName?: string
    cardNumber?: string
    time?: string
    amount?: string
    status?: IBillRecord['status']
    statusName?: string
    loading?: boolean
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
        class="box-border min-h-[200rpx] overflow-hidden rounded-2xl bg-container p-4"
    >
        <t-skeleton
            theme="image"
            animation="gradient"
            :loading="!!loading"
            :row-col="[
                [{ width: '60%', height: '40rpx', type: 'rect' }, { width: '30%', height: '40rpx', type: 'rect' }],
                [{ width: '50%', height: '40rpx', type: 'rect' }, { width: '25%', height: '40rpx', type: 'rect' }],
                { width: '50%', height: '30rpx', type: 'rect' },
            ]"
        >
            <!-- <view v-if="!loading" class="flex items-start gap-2">
                <view class="w-0 flex-1">
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

                <view class="w-1/4 flex flex-col items-end">
                    <text class="shrink-0 font-semibold">
                        {{ amount }}
                    </text>

                    <text
                        class="mt-1 text-right text-xs"
                        :class="[
                            ['PENDING', 'COMPLETED'].includes(status) && 'text-success',
                            status === 'DECLINED' && 'text-error',
                        ]"
                    >
                        {{ statusName }}
                    </text>
                </view>
            </view> -->

            <view v-if="!loading" class="flex flex-col">
                <view class="flex items-center">
                    <text class="w-0 flex-1 truncate pr-4">{{ title || '--' }}</text>
                    <text
                        class="w-1/4 text-right text-lg font-semibold"
                        :class="[
                            ['PENDING', 'COMPLETED'].includes(status) && 'text-success',
                            status === 'DECLINED' && 'text-error',
                        ]"
                    >
                        {{ amount }}
                    </text>
                </view>

                <view v-if="cardName && cardNumber" class="mt-2 flex items-center justify-between gap-4 text-sm text-secondary">
                    <text>{{ cardName }}</text>
                    <text>{{ cardNumber }}</text>
                </view>

                <view class="mt-2 text-sm text-placeholder">
                    {{ time }}
                </view>
            </view>
        </t-skeleton>
    </navigator>
</template>
