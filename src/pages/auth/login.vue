<script lang="ts" setup>
import type { ILoginForm } from '@/api/login'
import type { ICaptcha } from '@/api/types/login'
import { onMounted, ref } from 'vue'
import { getCode } from '@/api/login'
import { t } from '@/locale'
import { useTokenStore } from '@/store/token'
// import { isPageTabbar } from '@/tabbar/store'
// import { currRoute } from '@/utils'
// import { HOME_PAGE } from '@/utils/index'

definePage({
    style: {
        navigationStyle: 'custom',
    },
})

const tokenStore = useTokenStore()

const form = ref(null)

// const captchaCode = ref('')
const formData = reactive<ILoginForm>({
    username: '',
    password: '',
    grant_type: 'password_code',
    client_id: 'webApp',
    client_secret: 'webApp',
    scope: 'app',
})
const rules = reactive({
    username: [
        { required: true, message: t('pages.login.placeholderAccount') },
    ],
    password: [
        { required: true, message: t('pages.login.placeholderPassword') },
    ],
})
const captcha = ref<ICaptcha | null>(null)
const loading = ref(false)
const passwordVisible = ref(false)

async function fetchCaptcha() {
    try {
        const res = await getCode()
        captcha.value = res
    }
    catch {
    // 验证码获取失败可静默或 toast，按需处理
    }
}

onMounted(() => {
    // fetchCaptcha()
})

function handleRefreshCaptcha() {
    fetchCaptcha()
}

async function handleSubmit(e: any) {
    form.value.validate().then(async (valid) => {
        console.log('🚀 ~ handleSubmit ~ valid:', valid)
        if (valid !== true) {
            return
        }
        loading.value = true
        try {
            const res = await tokenStore.login(formData)
            uni.switchTab({
                url: '/pages/index/index',
            })
        }
        catch (error) {
            console.error('🚀 ~ handleSubmit ~ error:', error)
        }
        finally {
            loading.value = false
        }
    })
}

function switchPasswordVisibility() {
    passwordVisible.value = !passwordVisible.value
}

function onPasswordVisibleClick() {
    switchPasswordVisibility()
}
</script>

<template>
    <page-meta page-style="overflow: hidden" />
    <view class="box-border min-h-100vh pt-safe pb-safe">
        <view class="flex flex-col items-center pb-8 pt-12">
            <!-- <view class="h-20 w-20 center rounded-2xl from-[#0052D9] to-[#0034B5] bg-gradient-to-br shadow-lg">
                <text class="text-2xl text-white font-bold">MXK8</text>
            </view> -->
            <text class="text-md mt-4 text-gray-900 font-bold">{{ t('pages.login.title') }}</text>
            <text class="mt-2 text-sm text-gray-500">{{ t('pages.login.subtitle') }}</text>
        </view>

        <view class="px-6">
            <t-form
                ref="form"
                :data="formData"
                :rules="rules"
                show-error-message
            >
                <t-form-item name="username">
                    <t-input
                        v-model:value="formData.username"
                        data-field="username"
                        :placeholder="t('pages.login.account')"
                        borderless
                        clearable
                    />
                </t-form-item>

                <t-form-item name="password">
                    <t-input
                        v-model:value="formData.password"
                        :type="passwordVisible ? 'text' : 'password'"
                        data-field="password"
                        :placeholder="t('pages.login.password')"
                        borderless
                    >
                        <template #suffix-icon>
                            <t-icon
                                :name="passwordVisible ? 'browse' : 'browse-off'"
                                size="40rpx"
                                class="text-gray-400"
                                @click="onPasswordVisibleClick"
                            />
                        </template>
                    </t-input>
                </t-form-item>

                <view class="mt-6">
                    <t-button
                        theme="primary"
                        form-type="submit"
                        block
                        :loading="loading"
                        @click="handleSubmit"
                    >
                        {{ t('pages.login.submit') }}
                    </t-button>
                </view>
            </t-form>
        </view>
    </view>
</template>
