import { createI18n } from 'vue-i18n'

import en from './en.json'
import zhHans from './zh-Hans.json' // 简体中文

const messages = {
    en,
    'zh-Hans': zhHans, // key 不能乱写，查看uniapp官网
}

console.log(uni.getLocale())

const i18n = createI18n({
    locale: typeof uni !== 'undefined' ? uni.getLocale() : (import.meta.env.VITE_FALLBACK_LOCALE as string) || 'en',
    messages,
    allowComposition: true,
})

/**
 * 强制使用配置的默认语言（与 manifest / env 中 VITE_FALLBACK_LOCALE 一致）。
 * 建议在 App 根组件的 onLaunch 或 onShow 中调用，以覆盖微信小程序等平台按系统语言设置的行为。
 */
export function ensureDefaultLocale() {
    const defaultLocale = (import.meta.env.VITE_FALLBACK_LOCALE as string) || 'en'
    if (typeof uni !== 'undefined' && uni.setLocale) {
        uni.setLocale(defaultLocale)
    }
    if (i18n.global.locale !== defaultLocale) {
        i18n.global.locale = defaultLocale
    }
}

/**
 * 设置应用当前语言（用于设置页切换语言），同步 uni 与 vue-i18n。
 */
export function setAppLocale(locale: string) {
    console.log('🚀 ~ setAppLocale ~ locale:', locale)
    if (typeof uni !== 'undefined' && uni.setLocale) {
        uni.setLocale(locale)
    }
    if (i18n.global.locale !== locale) {
        i18n.global.locale = locale
    }
}

/**
 * 可以拿到原始的语言模板，非 vue 文件使用这个方法，
 * @param { string } key 多语言的key，eg: "app.name"
 * @returns {string} 返回原始的多语言模板，eg: "{heavy}KG"
 */
export function getTemplateByKey(key: string) {
    if (!key) {
        console.error(`[i18n] Function getTemplateByKey(), key param is required`)
        return ''
    }
    const locale = uni.getLocale()
    // console.log('locale:', locale)

    const message = messages[locale] // 拿到某个多语言的所有模板（是一个对象)
    if (Object.keys(message).includes(key)) {
        return message[key]
    }

    try {
        const keyList = key.split('.')
        return keyList.reduce((pre, cur) => {
            return pre[cur]
        }, message)
    }
    catch (error) {
        console.error(`[i18n] Function getTemplateByKey(), key param ${key} is not existed.`)
        return ''
    }
}

/**
 * formatI18n('我是{name},身高{detail.height},体重{detail.weight}',{name:'张三',detail:{height:178,weight:'75kg'}})
 * 暂不支持数组
 * @param template 多语言模板字符串，eg: `我是{name}`
 * @param {object | undefined} data 需要传递的数据对象，里面的key与多语言字符串对应，eg: `{name:'菲鸽'}`
 * @returns
 */
function formatI18n(template: string, data?: any) {
    return template.replace(/\{([^}]+)\}/g, (match, key: string) => {
    // console.log( match, key) // => { detail.height }  detail.height
        const arr = key.trim().split('.')
        let result = data
        while (arr.length) {
            const first = arr.shift()
            result = result[first]
        }
        return result
    })
}

/**
 * t('introduction',{name:'张三',detail:{height:178,weight:'75kg'}})
 * => formatI18n('我是{name},身高{detail.height},体重{detail.weight}',{name:'张三',detail:{height:178,weight:'75kg'}})
 * 没有key的，可以不传 data；暂不支持数组
 * @param template 多语言模板字符串，eg: `我是{name}`
 * @param {object | undefined} data 需要传递的数据对象，里面的key与多语言字符串对应，eg: `{name:'菲鸽'}`
 * @returns
 */
export function t(key, data?) {
    return formatI18n(getTemplateByKey(key), data)
}
export default i18n
