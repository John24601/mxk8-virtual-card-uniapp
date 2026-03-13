<script lang="ts" setup>
import type { ICardCreateReq, ICardPermissionRecord } from '@/api/types/cards'
import { isH5 } from '@uni-helper/uni-env'
import currency from 'currency.js'
import { cardCreate, checkProbationPerson, getCardPermissions, getFunctionTips } from '@/api/pay/cards'
import { t } from '@/locale'
import { useUserStore } from '@/store/user'

defineOptions({
    name: 'CardCreate',
})
definePage({
    style: {
        navigationBarTitleText: '%cards.createPageTitle%',
    },
})
// const calendarMonth = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
// ]
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

const pagingRef = ref<ZPagingRef>(null)
const formRef = ref<any>(null)
const cardBinVisible = ref(false)
const expiryDateVisible = ref(false)
const birthDateVisible = ref(false)
const statePickerVisible = ref(false)
const infoDialogVisible = ref(false)
const tipsDialogVisible = ref(false)
const cardBins = ref<ICardPermissionRecord[]>([])
const loading = ref(false)
const amountError = ref(false)
const agreementValue = ref<string[]>([])
const tipsContent = ref('')
const formData = reactive<ICardCreateReq>({
    cardBin: '',
    cardType: 'Virtual Card',
    firstName: '',
    lastName: '',
    billingAddress: '',
    amount: 0,
    expiryDate: '',
    city: '',
    state: '',
    zipCode: '',
    isTrialCard: false,
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
    expiryDate: [
        { required: true, message: t('cards.expiryDateRequired') },
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
    const months = formData.isTrialCard
        ? [1]
        : currentSelectedCardFees.value
            ? Object.keys(currentSelectedCardFees.value)
            : [1, 3, 6, 12, 18, 24, 36, 48, 60, 72]

    return months.map((month: number | string) => ({
        label: month.toString(),
        value: Number(month),
    }))
})

const currentCardFee = computed(() => {
    return currency(currentSelectedCardFees.value?.[formData.expiryDate] ?? 0).format()
})

const currentOverseasTransactionFee = computed(() => {
    return currentSelectedCardBin.value?.foreignTransactionFeeEquation ?? '2%+$0.3'
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

function closeInfoDialog() {
    infoDialogVisible.value = false
}

async function handleSubmit() {
    console.log('formData', formData)
    formRef.value.validate().then(async (result) => {
        console.log('🚀 ~ handleSubmit ~ agreementValue.value:', agreementValue.value)
        if (result !== true) {
            return
        }
        if (agreementValue.value.length !== 2) {
            uni.showToast({
                title: t('cards.agreementRequired'),
                icon: 'none',
            })
            return
        }
        loading.value = true
        try {
            await cardCreate(formData)
            uni.showToast({
                title: t('cards.createSuccess'),
                icon: 'success',
            })
            setTimeout(() => {
                uni.switchTab({
                    url: '/pages/cards/index',
                })
            }, 1500)
        }
        catch (error) {
            console.error('🚀 ~ handleSubmit ~ error:', error)
            uni.showToast({
                title: t('common.operateFailed'),
                icon: 'none',
            })
        }
        finally {
            loading.value = false
        }
    })
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

function onInfoCircleClick() {
    infoDialogVisible.value = true
}

function getUserPreProcessingTips() {
    getFunctionTips().catch((err) => {
        tipsContent.value = err.message
        tipsDialogVisible.value = true
    })
}

function setDefaultFormData() {
    const userStore = useUserStore()
    const userInfo = userStore.userInfo
    const {
        businessAddressRegisteredGovernment: billingAddress,
        businessAddressCity: city,
        businessAddressState: state,
        businessAddressZip: zip,
    } = userInfo
    formData.billingAddress = billingAddress ?? ''
    formData.city = city ?? ''
    formData.state = state ?? ''
    formData.zipCode = zip ?? ''
}

async function checkProbationPersonInfo() {
    const userStore = useUserStore()
    const userInfo = userStore.userInfo
    const data = await checkProbationPerson(userInfo.id)
    console.log('🚀 ~ checkProbationPerson ~ data:', data)
}

onLoad((options) => {
    checkProbationPersonInfo()
    if (options?.isTrialCard) {
        formData.isTrialCard = true
    }
    setDefaultFormData()
    getCardBins()
    getUserPreProcessingTips()
})
</script>

<template>
    <page-meta page-style="overflow: hidden" />

    <z-paging
        ref="pagingRef"
        paging-class="bg-gray-50"
        :refresher-enabled="false"
        :loading-more-enabled="false"
        safe-area-inset-bottom
    >
        <template #top>
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
            </view>
        </template>

        <view class="px-2 pb-2">
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
                            :readonly="!isH5"
                            @click="showCardBinPicker"
                        />
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
                        <t-form-item :label="t('cards.amount')" :help="tipsContent" name="amount">
                            <t-input
                                v-model:value="formData.amount"
                                type="number"
                                :min="50"
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
                                :readonly="!isH5"
                                @click="showExpiryDatePicker"
                            />
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
                            :readonly="!isH5"
                            @click="showBirthDatePicker"
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
                                :readonly="!isH5"
                                @click="showStatePicker"
                            />
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

                <view class="mt-2 bg-white pr-4">
                    <t-checkbox-group v-model:value="agreementValue">
                        <t-checkbox
                            icon="rectangle"
                            :max-label-row="5"
                            value="1"
                        >
                            <template #label>
                                <text>
                                    {{ t('cards.agreementCreateCardFee', { amount: currentCardFee }) }}
                                </text>
                            </template>
                        </t-checkbox>
                        <t-checkbox
                            icon="rectangle"
                            value="2"
                        >
                            <template #label>
                                <view class="inline">
                                    <text class="mr-2">{{ t('cards.readAndAgree') }}</text>
                                    <t-link
                                        class="inline-block"
                                        t-class-content="font-bold!"
                                        theme="primary"
                                        :content="t('cards.feeSchedule')"
                                        :navigator-props="{ url: '/pages/fee/index' }"
                                        hover
                                        underline
                                    />
                                </view>
                            </template>
                        </t-checkbox>
                    </t-checkbox-group>
                </view>

                <view class="mt-2 bg-white px-4 py-4">
                    <view>
                        <text class="font-bold">{{ t('common.tips') }}{{ t('common.colon') }}</text>
                    </view>
                    <t-divider />
                    <view class="leading-relaxed">
                        <view class="flex">
                            <text class="w-5">1.</text>
                            <text>
                                <text class="font-bold">{{ t('cards.cardCreationFeeTitle') }}{{ t('common.colon') }}</text>
                                {{ t('cards.cardCreationFee', { amount: currentCardFee }) }}
                            </text>
                        </view>
                        <view class="mt-2 flex">
                            <text class="w-5">2.</text>
                            <text class="flex-1">
                                <text class="font-bold">{{ t('cards.cardDeletionRuleTitle') }}{{ t('common.colon') }}</text>
                                {{ t('cards.cardDeletionRule') }}
                            </text>
                        </view>
                        <view class="mt-2 flex">
                            <text class="w-5">3.</text>
                            <view class="inline flex-1">
                                <text>
                                    <text class="font-bold">{{ t('cards.foreignTransactionFeeTitle') }}{{ t('common.colon') }}</text>
                                    {{ t('cards.foreignTransactionFee', { amount: currentOverseasTransactionFee }) }}
                                </text>
                                <t-icon
                                    name="info-circle"
                                    size="36rpx"
                                    class="mb-0.5 ml-2 inline-block align-middle"
                                    @click="onInfoCircleClick"
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </t-form>
        </view>

        <template #bottom>
            <view class="p-2">
                <t-button
                    theme="primary"
                    size="large"
                    icon="creditcard"
                    block
                    :loading="loading"
                    @click="handleSubmit"
                >
                    {{ t('cards.createPageTitle') }}
                </t-button>
            </view>
        </template>
    </z-paging>

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

    <t-dialog
        :visible="infoDialogVisible"
        :title="t('cards.foreignTransactionFeeTitle')"
        @confirm="closeInfoDialog"
    >
        <template #content>
            <!-- 适配skyline，增加type="list" -->
            <scroll-view
                type="list"
                scroll-y
                class="long-content"
            >
                <view class="flex flex-col whitespace-pre-line">
                    <text class="mb-2">{{ t('cards.foreignTransactionFeeExplanationTitle') }}</text>
                    <text>{{ t('cards.foreignTransactionFeeExplanationContent1') }}</text>
                    <text class="mt-1">{{ t('cards.foreignTransactionFeeExplanationContent2') }}</text>
                    <text class="mt-1">{{ t('cards.foreignTransactionFeeExplanationContent3') }}</text>
                    <text class="mt-2">{{ t('cards.foreignTransactionFeeExplanationSummary') }}</text>
                </view>
            </scroll-view>
        </template>
        <template #confirm-btn>
            <t-button theme="primary" size="large" block @click="closeInfoDialog">
                {{ t('common.gotIt') }}
            </t-button>
        </template>
    </t-dialog>

    <t-dialog
        :visible="tipsDialogVisible"
        :title="t('common.tips')"
        :content="tipsContent"
    >
        <template #confirm-btn>
            <t-button theme="primary" size="large" block @click="tipsDialogVisible = false">
                {{ t('common.gotIt') }}
            </t-button>
        </template>
    </t-dialog>
</template>

<style lang="scss" scoped>
.card {
    position: relative;
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
    padding-bottom: 8rpx !important;
}

:deep(.t-form-item--bordered) {
    border: none !important;
}

:deep(.t-form-item__controls-content) {
    box-sizing: border-box;
    margin-top: 10rpx;
    background-color: var(--td-brand-color-1);
    border-radius: 4rpx;
    padding: 20rpx 20rpx 20rpx 24rpx;
}

:deep(.t-input__wrap) {
    background-color: var(--td-brand-color-1);
}

:deep(.t-form-item__label--required) {
    margin-left: 4rpx;
}
</style>

<style>
.long-content {
    height: 576rpx;
    margin-top: 16rpx;
    font-size: 32rpx;
    color: #888;
}

.long-content ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}
</style>
