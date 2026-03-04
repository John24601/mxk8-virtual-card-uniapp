/**
 * TabBar 占位总高度（用于 CSS 变量 --tabbar-placeholder-height）
 * 组成：底部安全距离（有则用安全区，无则 1rem）+ TabBar 自身高度 57px + 上方安全距离 1rem
 * 多端兼容：H5 用 getComputedStyle 取 1rem 对应 px，小程序/App 用默认 16px
 */
import { systemInfo } from '@/utils/systemInfo'

/** TabBar 自身高度（悬浮胶囊条），与设计一致 */
export const TABBAR_HEIGHT_PX = uni.upx2px(80 + 32)

/** 无 document 环境（小程序/App）下 1rem 的默认 px，与常见根字号一致 */
const DEFAULT_REM_PX = uni.upx2px(32)

/**
 * 获取当前环境 1rem 对应的 px 值（用于与 safe-area 相加时统一单位）
 * H5 取根元素 fontSize，其它端用默认 16
 */
export function getRemPx(): number {
    if (typeof document === 'undefined' || !document.documentElement)
        return DEFAULT_REM_PX
    try {
        const fontSize = getComputedStyle(document.documentElement).fontSize
        if (fontSize)
            return Number.parseFloat(fontSize) || DEFAULT_REM_PX
    }
    catch {
        // 部分环境可能无 getComputedStyle
    }
    return DEFAULT_REM_PX
}

/**
 * 计算 TabBar 占位总高度（px）
 * = 底部距离（有安全区用安全区，无则 1rem）+ TABBAR_HEIGHT_PX + 上方 1rem
 */
export function getTabbarPlaceholderHeightPx(): number {
    const remPx = getRemPx()
    const bottomSafe = systemInfo?.safeAreaInsets?.bottom ?? 0
    const bottomGap = bottomSafe > 0 ? bottomSafe : remPx
    return bottomGap + TABBAR_HEIGHT_PX + remPx
}

/** 供页面使用的 CSS 变量名，padding-bottom 等可直接用 var(--tabbar-placeholder-height) */
export const TABBAR_PLACEHOLDER_CSS_VAR = '--tabbar-placeholder-height'
