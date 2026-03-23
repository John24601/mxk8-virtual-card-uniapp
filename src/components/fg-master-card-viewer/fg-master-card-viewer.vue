<script lang="ts" setup>
defineOptions({
    name: 'FgMasterCardViewer',
    options: {
        virtualHost: true,
    },
})

defineProps<{
    cardNumber?: string
    cardName?: string
    firstName?: string
    lastName?: string
}>()
</script>

<template>
    <view class="relative select-none overflow-hidden text-[#7f7776]">
        <image
            src="/static/images/master_card_bg.png"
            mode="widthFix"
            class="block w-full"
        />

        <view class="absolute left-5 top-20 flex font-semibold">
            <text>{{ `${firstName} ${lastName}` }}</text>
            <text style="margin-left: 40px">Business Debit</text>
        </view>
    </view>
</template>
