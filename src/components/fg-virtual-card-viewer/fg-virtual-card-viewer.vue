<script lang="ts" setup>
defineOptions({
    name: 'FgVirtualCardViewer',
    options: {
        virtualHost: true,
    },
})
</script>

<template>
    <view class="relative">
        <image
            src="/static/images/virtual_card_bg.png"
            mode="widthFix"
            class="block w-full"
        />
    </view>
</template>
