<script lang="ts" setup>
defineOptions({
    options: {
        virtualHost: true,
    },
})

const loadingMoreNoMoreText = computed(() => uni.$zp.config['loading-more-no-more-text'][uni.getLocale()])
</script>

<template>
    <view class="px-10 pb-tabbar">
        <t-divider :content="loadingMoreNoMoreText" />
    </view>
</template>
