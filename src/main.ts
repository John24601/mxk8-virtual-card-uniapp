import { createSSRApp } from 'vue'
import App from './App.vue'
import { requestInterceptor } from './http/interceptor'
import i18n from './locale/index'

import { routeInterceptor } from './router/interceptor'
import store from './store'
import '@/style/index.scss'
import 'virtual:uno.css'

uni.$zp = {
    config: {
        'default-page-size': 10,
        'refresher-default-text': {
            'en': 'Pull down to refresh',
            'zh-Hans': '继续下拉刷新',
        },
        'refresher-pulling-text': {
            'en': 'Release to refresh',
            'zh-Hans': '松开立即刷新',
        },
        'refresher-refreshing-text': {
            'en': 'Refreshing...',
            'zh-Hans': '正在刷新...',
        },
        'refresher-complete-text': {
            'en': 'Refresh successful',
            'zh-Hans': '刷新成功',
        },
        'loading-more-default-text': {
            'en': 'Click to load more',
            'zh-Hans': '点击加载更多',
        },
        'loading-more-loading-text': {
            'en': 'Loading...',
            'zh-Hans': '加载中...',
        },
        'loading-more-no-more-text': {
            'en': 'No more data',
            'zh-Hans': '没有更多了',
        },
        'loading-more-fail-text': {
            'en': 'Load failed, please try again',
            'zh-Hans': '加载失败，点击重新加载',
        },
        'empty-view-text': {
            'en': 'No data yet',
            'zh-Hans': '暂无数据',
        },
        'empty-view-reload-text': {
            'en': 'Reload',
            'zh-Hans': '重新加载',
        },
        'empty-view-error-text': {
            'en': 'Sorry, loading failed',
            'zh-Hans': '很抱歉，加载失败',
        },
        'system-loading-text': {
            'en': 'Loading...',
            'zh-Hans': '加载中...',
        },
    },
}

export function createApp() {
    const app = createSSRApp(App)
    app.use(store)
    app.use(routeInterceptor)
    app.use(requestInterceptor)
    app.use(i18n)

    return {
        app,
    }
}
