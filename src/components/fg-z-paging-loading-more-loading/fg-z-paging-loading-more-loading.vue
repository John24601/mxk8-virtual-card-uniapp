<script lang="ts" setup>
defineOptions({
    options: {
        virtualHost: true,
    },
})

const loadingMoreLoadingText = computed(() => uni.$zp.config['loading-more-loading-text'][uni.getLocale()])
</script>

<template>
    <view class="px-10 pb-tabbar">
        <t-divider :content="loadingMoreLoadingText" />
    </view>
</template>
