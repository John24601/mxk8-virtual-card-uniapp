<script lang="ts" setup>
defineOptions({
    options: {
        virtualHost: true,
    },
})

const loadingMoreFailText = computed(() => uni.$zp.config['loading-more-fail-text'][uni.getLocale()])
</script>

<template>
    <view class="px-10 pb-tabbar">
        <t-divider :content="loadingMoreFailText" />
    </view>
</template>
