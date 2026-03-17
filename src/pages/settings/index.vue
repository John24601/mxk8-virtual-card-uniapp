<script lang="ts" setup>
import { t } from '@/locale'
import { useTokenStore } from '@/store/token'
import { toLoginPage } from '@/utils/toLoginPage'

definePage({
    style: {
        navigationBarTitleText: '%settings.title%',
    },
})

const logoutLoading = ref(false)

function goToLocale() {
    uni.navigateTo({ url: '/pages/settings/locale' })
}

function goToPassword() {
    uni.navigateTo({ url: '/pages/settings/password' })
}

function goToSecondaryPassword() {
    uni.navigateTo({ url: '/pages/settings/secondary-password' })
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
        const tokenStore = useTokenStore()
        await tokenStore.logout()
        toLoginPage({ mode: 'reLaunch' })
    }
    finally {
        logoutLoading.value = false
    }
}

onLoad(() => {
    uni.setNavigationBarTitle({
        title: t('settings.title'),
    })
})
</script>

<template>
    <view class="box-border min-h-100vh flex flex-col bg-page pb-safe">
        <view class="pt-3">
            <t-cell-group theme="card" :bordered="false" :custom-style="{ '--td-cell-border-width': 0, 'borderRadius': '32rpx' }">
                <t-cell
                    :title="t('settings.changePassword')"
                    arrow
                    hover
                    :bordered="false"
                    :right-icon-style="{ fontSize: '24rpx' }"
                    @click="goToPassword"
                />
                <t-cell
                    :title="t('settings.secondaryPassword')"
                    arrow
                    hover
                    :bordered="false"
                    :right-icon-style="{ fontSize: '24rpx' }"
                    @click="goToSecondaryPassword"
                />
                <t-cell
                    :title="t('settings.localeAndTranslation')"
                    arrow
                    hover
                    :bordered="false"
                    :right-icon-style="{ fontSize: '24rpx' }"
                    @click="goToLocale"
                />
            </t-cell-group>
        </view>

        <view class="mx-4 mt-3">
            <t-button
                icon="logout"
                block
                :custom-style="{ '--td-button-default-bg-color': '#fff', '--td-button-border-width': 0 }"
                @click="handleLogout"
            >
                {{ t('profile.logout') }}
            </t-button>
        </view>
    </view>
</template>
