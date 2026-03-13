<script lang="ts" setup>
defineOptions({
    options: {
        virtualHost: true,
    },
})

const emit = defineEmits<{
    (e: 'loadMore'): void
}>()

const loadingMoreDefaultText = computed(() => uni.$zp.config['loading-more-default-text'][uni.getLocale()])

function onLoadMore() {
    emit('loadMore')
}
</script>

<template>
    <view class="px-4 pb-tabbar" @click="onLoadMore">
        <t-divider :content="loadingMoreDefaultText" />
    </view>
</template>
