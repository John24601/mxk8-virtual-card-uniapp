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
const calendarMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const stateOptions = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
]

const formRef = ref<any>(null)
const cardBinVisible = ref(false)
const expiryDateVisible = ref(false)
const birthDateVisible = ref(false)
const statePickerVisible = ref(false)
const cardBins = ref<ICardPermissionRecord[]>([])
const loading = ref(false)
const amountError = ref(false)
const isTrialCard = ref(false)
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

const cardBinOptions = computed(() => {
    return cardBins.value
        .filter(({ isApply }: ICardPermissionRecord) => isApply)
        .map(({ prepaidCard, cardTop, showCardBin }: ICardPermissionRecord) => ({
            label: `${prepaidCard ? 'Primary BIN' : 'Add on BIN'} ${showCardBin}`,
            value: cardTop,
        }))
})

const currentSelectedCardBin = computed(() => {
    return cardBins.value.find(({ cardTop }: ICardPermissionRecord) => cardTop === formData.cardBin)
})

const currentSelectedCardFees = computed(() => {
    return currentSelectedCardBin.value?.cardFees
})

const monthOptions = computed(() => {
    const months = isTrialCard.value
        ? [1]
        : currentSelectedCardFees.value
            ? Object.keys(currentSelectedCardFees.value)
            : [1, 3, 6, 12, 18, 24, 36, 48, 60, 72]
    return months.map((month: number | string) => ({
        label: month.toString(),
        value: Number(month),
    }))
})

async function getCardBins() {
    const data = await getCardPermissions()
    cardBins.value = data
}

function onCardBinPickerChange(ctx: any) {
    console.log('onCardBinPickerChange', ctx)
    formData.cardBin = ctx.value[0]
}

function onExpiryDatePickerChange(ctx: any) {
    console.log('onExpiryDatePickerChange', ctx)
    formData.expiryDate = ctx.value[0]
}

function onBirthDatePickerChange(ctx: any) {
    console.log('onBirthDatePickerChange', ctx)
    // formData.birthDate = ctx.value[0]
}

function onStatePickerChange(ctx: any) {
    console.log('onStatePickerChange', ctx)
    formData.state = ctx.value[0]
}

function showCardBinPicker() {
    cardBinVisible.value = true
    uni.hideKeyboard()
}

function showExpiryDatePicker() {
    if (!formData.cardBin) {
        uni.showToast({
            title: t('cards.cardBinRequired'),
            icon: 'none',
        })
        return
    }
    expiryDateVisible.value = true
    uni.hideKeyboard()
}

function showBirthDatePicker() {
    birthDateVisible.value = true
    uni.hideKeyboard()
}

function showStatePicker() {
    statePickerVisible.value = true
    uni.hideKeyboard()
}

async function handleSubmit() {
    console.log('formData', formData)
}

function priceFormat(v: string) {
    const isNumber = /^\d+(?:\.\d+)?$/.test(v)
    if (isNumber) {
        return Number.parseFloat(v).toFixed(2)
    }
    return v
}

function filter(type: string, options: any[]) {
    if (type === 'year') {
        return options.sort((a, b) => b.value - a.value)
    }
    return options
}

let isWeb = false

// #ifdef WEB
isWeb = true
// #endif

onLoad(() => {
    getCardBins()
})
</script>

<template>
    <view class="min-h-screen bg-gray-100 pb-safe">
        <view class="p-2">
            <t-radio-group :value="0">
                <view class="card card--active">
                    <t-icon
                        name="check"
                        t-class="card__icon"
                        class="card__icon"
                    />

                    <t-radio
                        :value="0"
                        label="Virtual Card"
                        :icon="('none' as any)"
                        borderless
                    />
                </view>
            </t-radio-group>

            <t-form
                ref="formRef"
                :model="formData"
                :rules="rules"
                label-align="top"
                label-width="100%"
                :custom-style="{
                    '--td-font-size-m': '24rpx',
                    '--td-button-large-font-size': '32rpx',
                    '--td-form-item-horizontal-padding': '0',
                }"
                required-mark
                required-mark-position="right"
            >
                <view class="bg-white px-4 py-4">
                    <view class="text-sm text-gray-500">
                        {{ t('cards.basicInfo') }}
                    </view>
                    <t-form-item arrow :label="t('cards.cardBin')" name="cardBin">
                        <t-input
                            :value="formData.cardBin"
                            borderless
                            :placeholder="t('cards.selectCardBin')"
                            style="flex: 1;"
                            :readonly="!isWeb"
                            @click="showCardBinPicker"
                        />

                        <t-picker
                            v-model:visible="cardBinVisible"
                            :value="[formData.cardBin]"
                            data-key="cardBin"
                            :title="t('cards.selectCardBin')"
                            :cancel-btn="t('common.cancel')"
                            :confirm-btn="t('common.confirm')"
                            @change="onCardBinPickerChange"
                        >
                            <t-picker-item :options="cardBinOptions" />
                        </t-picker>
                    </t-form-item>

                    <view class="grid grid-cols-2 gap-4">
                        <t-form-item :label="t('cards.firstName')" name="firstName">
                            <t-input
                                v-model:value="formData.firstName"
                                borderless
                                style="flex: 1;"
                            />
                        </t-form-item>

                        <t-form-item :label="t('cards.lastName')" name="lastName">
                            <t-input
                                v-model:value="formData.lastName"
                                borderless
                                style="flex: 1;"
                            />
                        </t-form-item>
                    </view>

                    <view class="grid grid-cols-2 gap-4">
                        <t-form-item :label="t('cards.amount')" name="amount">
                            <t-input
                                v-model:value="formData.amount"
                                type="number"
                                :tips="amountError ? t('cards.amountTips') : ''"
                                suffix="USD"
                                :format="priceFormat"
                                borderless
                                style="flex: 1;"
                            />
                        </t-form-item>

                        <t-form-item arrow :label="t('cards.expiryDate')" name="expiryDate">
                            <t-input
                                :value="formData.expiryDate"
                                borderless
                                :placeholder="t('cards.selectExpiryDate')"
                                style="flex: 1;"
                                :readonly="!isWeb"
                                @click="showExpiryDatePicker"
                            />

                            <t-picker
                                v-model:visible="expiryDateVisible"
                                :value="[formData.expiryDate]"
                                data-key="expiryDate"
                                :title="t('cards.selectExpiryDate')"
                                :cancel-btn="t('common.cancel')"
                                :confirm-btn="t('common.confirm')"
                                @change="onExpiryDatePickerChange"
                            >
                                <t-picker-item :options="monthOptions" />
                            </t-picker>
                        </t-form-item>
                    </view>

                    <view class="grid grid-cols-2 gap-4">
                        <t-form-item :label="t('cards.email')" name="email">
                            <t-input
                                v-model:value="formData.email"
                                borderless
                                style="flex: 1;"
                            />
                        </t-form-item>

                        <t-form-item :label="t('cards.phone')" name="phone">
                            <t-input
                                v-model:value="formData.phone"
                                borderless
                                style="flex: 1;"
                            />
                        </t-form-item>
                    </view>

                    <t-form-item :label="t('cards.birthDate')" name="birthDate">
                        <t-input
                            :value="formData.birthDate"
                            borderless
                            :placeholder="t('cards.selectBirthDate')"
                            suffix-icon="calendar"
                            style="flex: 1;"
                            :readonly="!isWeb"
                            @click="showBirthDatePicker"
                        />

                        <t-date-time-picker
                            v-model:visible="birthDateVisible"
                            v-model:value="formData.birthDate"
                            data-key="birthDate"
                            auto-close
                            :title="t('cards.selectBirthDate')"
                            :confirm-btn="t('common.confirm')"
                            :cancel-btn="t('common.cancel')"
                            mode="date"
                            format="YYYY-MM-DD"
                            custom-locale="en"
                            :filter="filter"
                            @change="onBirthDatePickerChange"
                        />
                    </t-form-item>
                </view>

                <view class="mt-2 bg-white px-4 py-4">
                    <view class="text-sm text-gray-500">
                        {{ t('cards.addressInfo') }}
                    </view>
                    <t-form-item :label="t('cards.billingAddress')" name="billingAddress">
                        <t-input
                            v-model:value="formData.billingAddress"
                            borderless
                            style="flex: 1;"
                        />
                    </t-form-item>

                    <t-form-item :label="t('cards.addressNotes')" name="addressNotes">
                        <t-input
                            v-model:value="formData.addressNotes"
                            borderless
                            style="flex: 1;"
                        />
                    </t-form-item>

                    <view class="grid grid-cols-2 gap-4">
                        <t-form-item :label="t('cards.city')" name="city">
                            <t-input
                                v-model:value="formData.city"
                                borderless
                                style="flex: 1;"
                            />
                        </t-form-item>

                        <t-form-item arrow :label="t('cards.state')" name="state">
                            <t-input
                                v-model:value="formData.state"
                                :placeholder="t('cards.selectState')"
                                borderless
                                style="flex: 1;"
                                :readonly="!isWeb"
                                @click="showStatePicker"
                            />

                            <t-picker
                                v-model:visible="statePickerVisible"
                                :value="[formData.state]"
                                data-key="state"
                                :title="t('cards.selectState')"
                                :cancel-btn="t('common.cancel')"
                                :confirm-btn="t('common.confirm')"
                                @change="onStatePickerChange"
                            >
                                <t-picker-item
                                    :options="stateOptions.map((state) => ({
                                        label: state,
                                        value: state,
                                    }))"
                                />
                            </t-picker>
                        </t-form-item>
                    </view>

                    <t-form-item :label="t('cards.zipCode')" name="zipCode">
                        <t-input
                            v-model:value="formData.zipCode"
                            borderless
                            style="flex: 1;"
                        />
                    </t-form-item>
                </view>

                <view class="mt-2 bg-white">
                    <t-checkbox-group
                        :default-value="['1', '2']"
                    >
                        <t-checkbox
                            icon="rectangle"
                            default-checked
                            relation-key="-1"
                        >
                            <template #label>
                                <text>
                                    我同意创建卡的费用是$0.00。成功创建卡后，费用将从我的账户余额中扣除。
                                </text>
                            </template>
                        </t-checkbox>
                        <t-checkbox
                            icon="rectangle"
                            default-checked
                            relation-key="-1"
                        >
                            <template #label>
                                <text>
                                    我已阅读并同意 费用表
                                </text>
                            </template>
                        </t-checkbox>
                    </t-checkbox-group>
                </view>

                <view class="mt-2">
                    <t-button
                        theme="primary"
                        size="large"
                        block
                        :loading="loading"
                        @click="handleSubmit"
                    >
                        {{ t('cards.createPageTitle') }}
                    </t-button>
                </view>
            </t-form>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.card {
    position: relative;
    margin-bottom: 16rpx;
    border-radius: 4rpx;
    overflow: hidden;
    box-sizing: border-box;
    border: 3rpx solid var(--td-bg-color-container, #fff);
}

.card--active {
    border-color: var(--td-brand-color, #0052d9);
}

.card--active::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    border-width: 28px 28px 28px 0;
    border-style: solid;
    border-color: var(--td-brand-color, #0052d9) transparent transparent transparent;
}

.card__icon {
    color: var(--td-bg-color-container, #fff);
    position: absolute;
    left: 1.5px;
    top: 1.5px;
    z-index: 1;
    font-size: 16px;
}

:deep(.t-form-item) {
    padding-bottom: 20rpx !important;
}

:deep(.t-form-item__controls) {
    margin-top: 10rpx;
}

:deep(.t-form-item__label--required) {
    margin-left: 4rpx;
}
</style>
