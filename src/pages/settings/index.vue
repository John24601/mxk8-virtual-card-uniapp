<script lang="ts" setup>
import { t } from '@/locale'

definePage({
    style: {
        navigationBarTitleText: '%settings.title%',
    },
})

function goToLocale() {
    uni.navigateTo({ url: '/pages/settings/locale' })
}

onLoad(() => {
    uni.setNavigationBarTitle({
        title: t('settings.title'),
    })
})
</script>

<template>
    <view class="settings-page box-border min-h-100vh flex flex-col bg-white pb-safe">
        <t-cell-group>
            <t-cell
                :title="t('settings.localeAndTranslation')"
                arrow
                hover
                @click="goToLocale"
            />
        </t-cell-group>
    </view>
</template>
