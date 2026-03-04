<script lang="ts" setup>
import { systemInfo } from '@/utils/systemInfo'
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
import { setTabbarItem } from './i18n'
import { tabbarList, tabbarStore } from './store'

// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
    virtualHost: true,
})
// #endif

function onChange(e: any) {
    const index = +e.value
    const list = tabbarList.value
    if (!list[index]) {
        return
    }
    const url = list[index].pagePath
    tabbarStore.setCurIdx(index)
    if (tabbarCacheEnable) {
        uni.switchTab({ url })
    }
    else {
        uni.navigateTo({ url })
    }
}

// 底部安全距离为 0 时用 1rem，否则用 env(safe-area-inset-bottom)
const tabBarBottom = computed(() => {
    const bottom = systemInfo?.safeAreaInsets?.bottom ?? 0
    return bottom === 0 ? '1rem' : 'env(safe-area-inset-bottom)'
})

// #ifndef MP-WEIXIN || MP-ALIPAY
// 因为有了 custom:true， 微信里面不需要多余的hide操作
onLoad(() => {
    // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
    needHideNativeTabbar && uni.hideTabBar()
})
// #endif

// 注意，上面处理的是自定义tabbar，下面处理的是原生tabbar，参考：https://unibest.tech/base/10-i18n
onShow(() => {
    setTabbarItem()
})
</script>

<template>
    <view v-if="customTabbarEnable">
        <t-tab-bar
            t-class="t-tab-bar"
            :value="`${tabbarStore.curIdx}`"
            shape="round"
            theme="tag"
            :split="false"
            :custom-style="{ bottom: tabBarBottom }"
            @change="onChange"
        >
            <t-tab-bar-item
                v-for="(item, index) in tabbarList"
                :key="`${index}`"
                :value="`${index}`"
                :icon="item.icon"
                :aria-label="item.text"
            />
        </t-tab-bar>
    </view>
</template>
