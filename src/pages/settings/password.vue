<script lang="ts" setup>
import { onBeforeUnmount, reactive, ref } from 'vue'
import { changPassword, getUserInfo } from '@/api/login'
import { t } from '@/locale'

definePage({
    style: {
        navigationBarTitleText: '%settings.passwordPageTitle%',
    },
})

const formRef = ref<any>(null)
const userId = ref<string>('')
const loading = ref(false)
const codeCountdown = ref(0)
let codeTimer: ReturnType<typeof setInterval> | null = null

const formData = reactive({
    currentPassword: '',
    password: '',
    confirmPassword: '',
    verifyCode: '',
})

const rules = reactive({
    currentPassword: [
        { required: true, message: t('settings.placeholderCurrentPassword') },
    ],
    password: [
        { required: true, message: t('settings.placeholderNewPassword') },
    ],
    confirmPassword: [
        { required: true, message: t('settings.placeholderConfirmPassword') },
        {
            validator: (val: string) => val === formData.password,
            message: t('settings.confirmPasswordMismatch'),
        },
    ],
})

onLoad(() => {
    uni.setNavigationBarTitle({ title: t('settings.passwordPageTitle') })
    loadUser()
})

onBeforeUnmount(() => {
    if (codeTimer) {
        clearInterval(codeTimer)
    }
})

async function loadUser() {
    try {
        const user = await getUserInfo()
        userId.value = user?.id ?? ''
    }
    catch {
        uni.showToast({ icon: 'none', title: t('common.operateFailed') })
    }
}

function handleGetCode() {
    if (codeCountdown.value > 0)
        return
    // 验证码接口占位：若后端有发送验证码接口可在此调用
    codeCountdown.value = 60
    codeTimer = setInterval(() => {
        codeCountdown.value--
        if (codeCountdown.value <= 0 && codeTimer) {
            clearInterval(codeTimer)
            codeTimer = null
        }
    }, 1000)
}

async function handleSubmit() {
    const valid = await formRef.value?.validate?.()
    if (valid !== true)
        return
    if (!userId.value) {
        uni.showToast({ icon: 'none', title: t('common.operateFailed') })
        return
    }
    loading.value = true
    try {
        await changPassword({
            id: userId.value,
            currentPassword: formData.currentPassword,
            password: formData.password,
        })
        uni.showToast({ icon: 'success', title: t('settings.changePasswordSuccess') })
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    }
    catch (err: any) {
        const msg = err?.data?.message ?? err?.errMsg ?? t('common.operateFailed')
        uni.showToast({ icon: 'none', title: msg })
    }
    finally {
        loading.value = false
    }
}
</script>

<template>
    <view class="password-page box-border min-h-100vh flex flex-col bg-white pb-safe">
        <view class="px-4 py-2">
            <t-form
                ref="formRef"
                :data="formData"
                :rules="(rules as any)"
                label-align="top"
                show-error-message
                label-width="100%"
                :custom-style="{
                    '--td-font-size-m': '24rpx',
                }"
            >
                <t-form-item
                    :label="t('settings.currentPassword')" name="currentPassword"
                >
                    <t-input
                        v-model:value="formData.currentPassword"
                        :placeholder="t('settings.placeholderCurrentPassword')"
                        borderless
                        clearable
                    />
                </t-form-item>

                <t-form-item :label="t('settings.newPassword')" name="password">
                    <t-input
                        v-model:value="formData.password"
                        type="password"
                        :placeholder="t('settings.placeholderNewPassword')"
                        borderless
                        clearable
                    />
                </t-form-item>

                <t-form-item :label="t('settings.confirmPassword')" name="confirmPassword">
                    <t-input
                        v-model:value="formData.confirmPassword"
                        type="password"
                        :placeholder="t('settings.placeholderConfirmPassword')"
                        borderless
                        clearable
                    />
                </t-form-item>

                <t-form-item :label="t('settings.verifyCode')" name="verifyCode">
                    <t-input
                        v-model:value="formData.verifyCode"
                        class="flex-1"
                        :placeholder="t('settings.placeholderVerifyCode')"
                        borderless
                        clearable
                    >
                        <template
                            #suffix
                        >
                            <view
                                class="flex items-center"
                            >
                                <view class="mr-4 h-6 w-[1px] bg-gray-2" />
                                <image
                                    class="block h-9 w-18 -my-1.5"
                                    src="https://wwcdn.weixin.qq.com/node/wework/images/202010241547.ac6876be9c.png"
                                    mode="heightFix"
                                    aria-role="img"
                                    aria-label="验证码"
                                />
                            </view>
                        </template>
                    </t-input>
                </t-form-item>

                <view class="mt-8">
                    <t-button
                        theme="primary"
                        block
                        :loading="loading"
                        @click="handleSubmit"
                    >
                        {{ t('settings.submit') }}
                    </t-button>
                </view>
            </t-form>
        </view>
    </view>
</template>
