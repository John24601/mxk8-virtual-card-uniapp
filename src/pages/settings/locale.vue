<script lang="ts" setup>
import { computed, ref } from 'vue'
import { setAppLocale, t } from '@/locale'

definePage({
    style: {
        navigationBarTitleText: '%settings.localePageTitle%',
    },
})

const currentLocale = ref<string>('zh-Hans')

onLoad(() => {
    uni.setNavigationBarTitle({
        title: t('settings.localePageTitle'),
    })
    if (typeof uni !== 'undefined' && uni.getLocale) {
        currentLocale.value = uni.getLocale()
    }
})

const options = computed(() => [
    { value: 'zh-Hans', label: t('settings.languageZhHans') },
    { value: 'en', label: t('settings.languageEn') },
])

function onLocaleChange(payload: unknown) {
    const value = (payload as { value?: string })?.value ?? (typeof payload === 'string' ? payload : null)
    console.log('🚀 ~ onLocaleChange ~ value:', value)
    if (!value)
        return
    currentLocale.value = value
    setAppLocale(value)
    uni.setNavigationBarTitle({
        title: t('settings.localePageTitle'),
    })
}
</script>

<template>
    <view class="locale-page box-border min-h-100vh flex flex-col bg-white pb-safe">
        <t-radio-group
            v-model:value="currentLocale"
            :options="options"
            icon="line"
            placement="right"
            @change="onLocaleChange"
        />
    </view>
</template>
