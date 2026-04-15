<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { setSecondPassword } from '@/api/login'
import { t } from '@/locale'

definePage({
    style: {
        navigationBarTitleText: '%settings.secondaryPasswordPageTitle%',
    },
})

const formRef = ref<any>(null)
const loading = ref(false)

const formData = reactive({
    secondPassword: '',
    confirmSecondPassword: '',
})

const rules = reactive({
    secondPassword: [
        { required: true, message: t('settings.placeholderSecondaryPassword') },
    ],
    confirmSecondPassword: [
        { required: true, message: t('settings.placeholderConfirmSecondaryPassword') },
        {
            validator: (val: string) => val === formData.secondPassword,
            message: t('settings.secondaryPasswordMismatch'),
        },
    ],
})

onLoad(() => {
    uni.setNavigationBarTitle({ title: t('settings.secondaryPasswordPageTitle') })
})

async function handleSubmit() {
    const valid = await formRef.value?.validate?.()
    if (valid !== true)
        return
    loading.value = true
    try {
        await setSecondPassword({
            secondPassword: formData.secondPassword,
        })
        uni.showToast({ icon: 'success', title: t('settings.secondaryPasswordSuccess') })
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
    <view class="secondary-password-page box-border min-h-100vh flex flex-col bg-white pb-safe">
        <view class="px-4 py-2">
            <t-form
                ref="formRef"
                :data="formData"
                :rules="(rules as any)"
                label-align="top"
                label-width="100%"
                :custom-style="{
                    '--td-font-size-m': '24rpx',
                    '--td-button-medium-font-size': '28rpx',
                }"
            >
                <t-form-item
                    :label="t('settings.secondaryPasswordLabel')"
                    name="secondPassword"
                >
                    <t-input
                        v-model:value="formData.secondPassword"
                        type="password"
                        :placeholder="t('settings.placeholderSecondaryPassword')"
                        borderless
                        clearable
                    />
                </t-form-item>

                <t-form-item
                    :label="t('settings.confirmSecondaryPassword')"
                    name="confirmSecondPassword"
                >
                    <t-input
                        v-model:value="formData.confirmSecondPassword"
                        type="password"
                        :placeholder="t('settings.placeholderConfirmSecondaryPassword')"
                        borderless
                        clearable
                    />
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
