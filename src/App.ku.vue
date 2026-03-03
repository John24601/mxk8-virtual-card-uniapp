<script setup lang="ts">
import { ref } from 'vue'
import { ensureDefaultLocale } from '@/locale'
import { judgeIsExcludePath } from '@/router/interceptor'
import { useTokenStore } from '@/store/token'
import FgTabbar from '@/tabbar/index.vue'
import {
    getTabbarPlaceholderHeightPx,
    TABBAR_PLACEHOLDER_CSS_VAR,
} from '@/tabbar/placeholder'
import { toLoginPage } from '@/utils/toLoginPage'
import { isPageTabbar } from './tabbar/store'
import { currRoute } from './utils'

const isCurrentPageTabbar = ref(true)

/** TabBar 占位总高度 CSS 变量，供带 tabbar 的页面使用 padding-bottom: var(--tabbar-placeholder-height) */
const rootStyle = ref<Record<string, string>>({
    [TABBAR_PLACEHOLDER_CSS_VAR]: `${getTabbarPlaceholderHeightPx()}px`,
})
onMounted(() => {
    // H5 下等 DOM 就绪后再算一次，使 getRemPx() 取到根字号
    rootStyle.value = { [TABBAR_PLACEHOLDER_CSS_VAR]: `${getTabbarPlaceholderHeightPx()}px` }
})
onShow(() => {
    ensureDefaultLocale()
    const { path } = currRoute()
    // 未登录且当前不在白名单（登录/注册等）→ 统一跳转登录页（含冷启动直接打开内页的情况）
    const tokenStore = useTokenStore()
    if (!tokenStore.hasLogin && path && !judgeIsExcludePath(path)) {
        toLoginPage({ mode: 'reLaunch' })
        if (typeof toLoginPage.flush === 'function')
            toLoginPage.flush()
        return
    }
    // “蜡笔小开心”提到本地是 '/pages/index/index'，线上是 '/' 导致线上 tabbar 不见了
    if (path === '/') {
        isCurrentPageTabbar.value = true
    }
    else {
        isCurrentPageTabbar.value = isPageTabbar(path)
    }
})

const helloKuRoot = ref('Hello AppKuVue')

const exposeRef = ref('this is form app.Ku.vue')

defineExpose({
    exposeRef,
})
</script>

<template>
    <view :style="rootStyle">
        <!-- 这个先隐藏了，知道这样用就行 -->
        <view class="hidden text-center">
            {{ helloKuRoot }}，这里可以配置全局的东西
        </view>

        <KuRootView />

        <FgTabbar v-if="isCurrentPageTabbar" />
    </view>
</template>
