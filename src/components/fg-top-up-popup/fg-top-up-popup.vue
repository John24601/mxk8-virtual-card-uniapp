<script lang="ts" setup>
import { t } from '@/locale'

defineOptions({
    name: 'FgTopUpPopup',
    options: {
        virtualHost: true,
    },
})

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void
}>()

interface Props {
    visible: boolean
}

function onVisibleChange(context: { visible: boolean }) {
    console.log('🚀 ~ onVisibleChange ~ context:', context)
    emit('update:visible', context.visible)
}

function onConfirmTopUp() {
    console.log('🚀 ~ onConfirmTopUp')
}

const focused = ref(false)

watch(() => props.visible, (value) => {
    if (value) {
        setTimeout(() => {
            focused.value = true
        }, 340)
    }
    else {
        focused.value = false
    }
})
</script>

<template>
    <t-popup
        :visible="visible"
        placement="bottom"
        @visible-change="onVisibleChange"
    >
        <view class="box-border min-h-[600rpx] flex flex-col justify-between p-4">
            <view>
                <t-input
                    label="充值金额"
                    suffix="USD"
                    align="right"
                    type="number"
                    :focus="focused"
                    :adjust-position="false"
                />
            </view>

            <view>
                <t-button
                    theme="primary"
                    block
                    size="large"
                    icon="wallet"
                    @click="onConfirmTopUp"
                >
                    {{ t('pages.cards.topUp') }}
                </t-button>
            </view>
        </view>
    </t-popup>
</template>
