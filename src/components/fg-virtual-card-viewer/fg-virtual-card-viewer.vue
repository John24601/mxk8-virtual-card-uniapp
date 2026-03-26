<script lang="ts" setup>
defineOptions({
    name: 'FgVirtualCardViewer',
    options: {
        virtualHost: true,
    },
})

const props = defineProps<{
    cardNumber?: string
    expirationDate?: string
    firstName?: string
    lastName?: string
}>()

const cardNumberDisplay = computed(() => {
    const firstSix = props.cardNumber?.slice(0, 6)
    const lastFour = props.cardNumber?.slice(-4)
    return `${firstSix} ****** ${lastFour}`
})
</script>

<template>
    <view class="relative select-none overflow-hidden text-[#7f7776]">
        <image
            src="/static/images/virtual_card_bg.png"
            mode="widthFix"
            class="block w-full"
        />

        <view class="absolute left-5 top-[140rpx] text-2xl font-semibold">
            {{ cardNumberDisplay }}
        </view>

        <view class="absolute left-5 top-[230rpx] flex">
            <view class="flex flex-col">
                <text>Expiration</text>
                <text class="mt-[4rpx]">{{ expirationDate }}</text>
            </view>
        </view>

        <view class="absolute left-5 top-[350rpx] text-lg">
            {{ `${firstName} ${lastName}` }}
        </view>
    </view>
</template>
