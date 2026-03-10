<script lang="ts" setup>
import { computed, ref } from 'vue'
import { t } from '@/locale'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import { toLoginPage } from '@/utils/toLoginPage'

defineOptions({
    name: 'Profile',
})
definePage({
    style: {
        navigationStyle: 'custom',
    },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()

const avatarUrl = computed(() => {
    const url = userStore.userInfo?.avatar
    return url || '/static/images/default-avatar.png'
})

const displayName = computed(() => {
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

const logoutLoading = ref(false)

function handleComingSoon() {
    uni.showToast({ title: t('profile.comingSoon'), icon: 'none' })
}

async function handleLogout() {
    const confirmed = await new Promise<boolean>((resolve) => {
        uni.showModal({
            title: t('profile.logoutConfirmTitle'),
            content: t('profile.logoutConfirmContent'),
            cancelText: t('common.cancel'),
            confirmText: t('common.confirm'),
            success: res => resolve(res.confirm),
            fail: () => resolve(false),
        })
    })
    if (!confirmed)
        return
    logoutLoading.value = true
    try {
        await tokenStore.logout()
        toLoginPage({ mode: 'reLaunch' })
    }
    finally {
        logoutLoading.value = false
    }
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
    <view class="profile-container box-border min-h-100vh flex flex-col bg-white pb-tabbar">
        <t-navbar :title="t('profile.title')" placeholder :custom-style="{ '--td-navbar-background': 'transparent' }" />

        <!-- 用户信息区：渐变背景 + 头像 + 昵称 -->
        <view class="user-card flex flex-col items-center justify-center px-6 py-8">
            <!-- <t-image
                :src="avatarUrl"
                width="72"
                height="72"
                shape="circle"
            /> -->
            <t-avatar size="large" t-class-content="external-class-content">
                {{ displayName.charAt(0) }}
            </t-avatar>
            <text class="mt-4 text-lg text-gray-900">{{ displayName || t('profile.nicknamePlaceholder') }}</text>
        </view>

        <view class="flex flex-col px-2">
            <view class="flex flex-col gap-2">
                <t-button
                    v-for="item in menuItems"
                    :key="item.key"
                    theme="primary"
                    variant="text"
                    :icon="item.icon"
                    t-class="justify-start! gap-2"
                    block
                    :open-type="item.openType"
                    @click="item.onClick"
                >
                    {{ t(item.labelKey) }}
                </t-button>
            </view>

            <view class="px-4">
                <t-divider />
            </view>

            <t-button
                theme="danger"
                variant="text"
                icon="logout"
                t-class="justify-start! gap-2"
                block
                @click="handleLogout"
            >
                {{ t('profile.logout') }}
            </t-button>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.bg-gradient-user {
    background: linear-gradient(135deg, #e0f2ff 0%, #fef3e0 100%);
}

:deep(.external-class-content) {
    background-color: var(--td-brand-color);
    color: var(--td-font-white-1);
}
</style>
