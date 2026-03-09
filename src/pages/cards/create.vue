<script lang="ts" setup>
import type { ICardCreateReq, ICardPermissionRecord } from '@/api/types/cards'
import { getCardPermissions } from '@/api/pay/cards'
import { t } from '@/locale'

defineOptions({
    name: 'CardCreate',
})
definePage({
    style: {
        navigationBarTitleText: '%cards.createPageTitle%',
    },
})
const formRef = ref<any>(null)
const cardBinVisible = ref(false)
const cardBins = ref<{ label: string, value: string }[]>([])
const loading = ref(false)
const formData = reactive<ICardCreateReq>({
    cardBin: '',
    cardType: 'Virtual Card',
    firstName: '',
    lastName: '',
    billingAddress: '',
    amount: 0,
    city: '',
    state: '',
    zipCode: '',
})
const rules = reactive({
    cardBin: [
        { required: true, message: t('cards.cardBinRequired') },
    ],
    firstName: [
        { required: true, message: t('cards.firstNameRequired') },
    ],
    lastName: [
        { required: true, message: t('cards.lastNameRequired') },
    ],
    billingAddress: [
        { required: true, message: t('cards.billingAddressRequired') },
    ],
    amount: [
        { required: true, message: t('cards.amountRequired') },
    ],
    city: [
        { required: true, message: t('cards.cityRequired') },
    ],
    state: [
        { required: true, message: t('cards.stateRequired') },
    ],
    zipCode: [
        { required: true, message: t('cards.zipCodeRequired') },
    ],
})

async function getCardBins() {
    const data = await getCardPermissions()
    cardBins.value = data.filter(({ isApply }: ICardPermissionRecord) => isApply).map(({ prepaidCard, cardTop, showCardBin }: ICardPermissionRecord) => ({
        label: `${prepaidCard ? 'Primary BIN' : 'Add on BIN'} ${showCardBin}`,
        value: cardTop,
    }))
}

function onPickerChange() {
}

function onColumnChange() {
}

function onPickerCancel() {
}

function showCardBinPicker() {
    cardBinVisible.value = true
    uni.hideKeyboard()
}

async function handleSubmit() {
    console.log('formData', formData)
}

onLoad(() => {
    getCardBins()
})
</script>

<template>
    <view class="">
        <view class="px-4 py-2">
            <t-form
                ref="formRef"
                :model="formData"
                :rules="rules"
                label-align="top"
                label-width="100%"
                :custom-style="{
                    '--td-font-size-m': '24rpx',
                }"
            >
                <t-form-item arrow :label="t('cards.cardBin')" name="cardBin">
                    <t-input
                        ref="cardBinInputRef"
                        :value="formData.cardBin"
                        borderless
                        :placeholder="t('cards.selectCardBin')"
                        style="flex: 1;"
                        readonly
                        @click="showCardBinPicker"
                    />

                    <t-picker
                        :visible="cardBinVisible"
                        data-key="cardBin"
                        :title="t('cards.selectCardBin')"
                        :cancel-btn="t('common.cancel')"
                        :confirm-btn="t('common.confirm')"
                        :using-custom-navbar="true"
                        :custom-style="{ '--td-picker-border-radius': '4rpx' }"
                        @update:visible="cardBinVisible = $event"
                        @change="onPickerChange"
                        @pick="onColumnChange"
                        @cancel="onPickerCancel"
                    >
                        <t-picker-item :options="cardBins" />
                    </t-picker>
                </t-form-item>

                <t-form-item :label="t('cards.firstName')" name="firstName">
                    <t-input
                        v-model:value="formData.firstName"
                        borderless
                        :placeholder="t('cards.firstNameRequired')"
                        style="flex: 1;"
                    />
                </t-form-item>

                <t-form-item :label="t('cards.lastName')" name="lastName">
                    <t-input
                        v-model:value="formData.lastName"
                        borderless
                        :placeholder="t('cards.lastNameRequired')"
                        style="flex: 1;"
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
