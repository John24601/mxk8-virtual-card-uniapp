<script lang="ts" setup>
defineOptions({
    name: 'FgMasterCardViewer',
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
            src="/static/images/master_card_bg.png"
            mode="widthFix"
            class="block w-full"
        />

        <view class="absolute left-5 top-18 flex font-semibold">
            <text>{{ `${firstName} ${lastName}` }}</text>
            <text style="margin-left: 40px">Business Debit</text>
        </view>

        <view class="absolute left-5 top-[230rpx] text-2xl font-semibold">
            {{ cardNumberDisplay }}
        </view>

        <view class="absolute left-5 top-43 flex">
            <view>
                <text>EXP.DATE</text>
                <text class="ml-2.5">{{ expirationDate }}</text>
            </view>
        </view>
    </view>
</template>
