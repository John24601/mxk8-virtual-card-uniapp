import { getAllPages } from '@/utils'

export const LOGIN_STRATEGY_MAP = {
    DEFAULT_NO_NEED_LOGIN: 0, // 黑名单策略，默认可以进入APP
    DEFAULT_NEED_LOGIN: 1, // 白名单策略，默认不可以进入APP，需要强制登录
}
// 登录策略：默认需要登录才能进入内页，未登录仅可访问白名单（登录/注册等）
export const LOGIN_STRATEGY = LOGIN_STRATEGY_MAP.DEFAULT_NEED_LOGIN
export const isNeedLoginMode = LOGIN_STRATEGY === LOGIN_STRATEGY_MAP.DEFAULT_NEED_LOGIN

export const LOGIN_PAGE = '/pages/auth/login'
export const REGISTER_PAGE = '/pages/auth/register'

export const LOGIN_PAGE_LIST = [LOGIN_PAGE, REGISTER_PAGE]

// 在 definePage 里面配置了 excludeLoginPath 的页面，功能与 EXCLUDE_LOGIN_PATH_LIST 相同
export const excludeLoginPathList = getAllPages('excludeLoginPath').map(page => page.path)

// 白名单：仅这些路径无需登录可访问；其余页面未登录会跳转到登录页
export const EXCLUDE_LOGIN_PATH_LIST = [
    ...LOGIN_PAGE_LIST, // 登录、注册页
    ...excludeLoginPathList, // definePage 里配置了 excludeLoginPath 的页面
]

// 在小程序里面是否使用H5的登录页，默认为 false
// 如果为 true 则复用 h5 的登录逻辑
// TODO: 3/3 确定自己的登录页是否需要在小程序里面使用
export const LOGIN_PAGE_ENABLE_IN_MP = true
