<script lang="ts" setup>
import { t } from '@/locale'
import { useUserStore } from '@/store/user'

defineOptions({
    name: 'Profile',
})
definePage({
    style: {
        navigationStyle: 'custom',

    },
})

const displayName = computed(() => {
    const userStore = useUserStore()
    const u = userStore.userInfo
    if (!u)
        return ''
    const first = [u.firstName, u.lastName].filter(Boolean).join(' ').trim()
    if (first)
        return first
    if (u.englishName)
        return u.englishName
    if (u.businessNo)
        return u.businessNo
    return u.id || ''
})

function handleComingSoon() {
    uni.showToast({ title: t('profile.comingSoon'), icon: 'none' })
}

function handleSettings() {
    uni.navigateTo({ url: '/pages/settings/index' })
}

const menuItems = [
    { key: 'recommend', icon: 'share', labelKey: 'profile.recommend', openType: 'share' as const },
    // { key: 'website', icon: 'home', labelKey: 'profile.viewWebsite', onClick: handleComingSoon },
    { key: 'settings', icon: 'setting-1', labelKey: 'profile.settings', onClick: handleSettings },
]
</script>

<template>
    <view class="profile-page box-border min-h-100vh flex flex-col bg-page pb-tabbar">
        <t-navbar :title="t('profile.title')" placeholder :custom-style="{ '--td-navbar-background': 'transparent' }" />

        <!-- 用户信息区：渐变背景 + 头像 + 昵称 -->
        <view class="flex flex-col items-center justify-center px-6 py-8">
            <t-avatar size="large" t-class-content="external-class-content">
                {{ displayName.charAt(0) }}
            </t-avatar>
            <text class="mt-4 text-lg">{{ displayName || t('profile.nicknamePlaceholder') }}</text>
        </view>

        <view class="mx-4 flex flex-col">
            <view class="flex flex-col gap-2">
                <view
                    v-for="item in menuItems"
                    :key="item.key"
                >
                    <t-button
                        :icon="item.icon"
                        variant="text"
                        t-class="justify-start! gap-2"
                        block
                        :open-type="item.openType"
                        @click="item.onClick"
                    >
                        {{ t(item.labelKey) }}
                    </t-button>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.profile-page {
    background:
        radial-gradient(ellipse 70% 60% at 10% 10%, rgba(0, 82, 217, 0.18), transparent 60%),
        radial-gradient(ellipse 55% 50% at 90% 25%, rgba(54, 110, 244, 0.14), transparent 55%),
        radial-gradient(ellipse 60% 70% at 50% 85%, rgba(0, 136, 88, 0.12), transparent 60%),
        radial-gradient(ellipse 50% 40% at 75% 70%, rgba(94, 129, 244, 0.1), transparent 50%), var(--td-bg-color-page);
}

:deep(.external-class-content) {
    background-color: var(--td-brand-color);
    color: var(--td-font-white-1);
}
</style>
