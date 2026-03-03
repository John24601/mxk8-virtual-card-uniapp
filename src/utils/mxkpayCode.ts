import CryptoJS from 'crypto-js'

/** 默认的 KEY 与 IV（与后端约定） */
const KEY = CryptoJS.enc.Utf8.parse('KEYIVHUIHAOPAY21')
const IV = CryptoJS.enc.Utf8.parse('KEYIVHUIHAOPAY21')

/**
 * 获取当前时间戳（毫秒）
 */
export function getTimes(): number {
    return new Date().getTime()
}

/**
 * AES 加密：CBC 模式，ZeroPadding，返回 base64
 * @param word 待加密字符串
 * @param keyStr 可选，自定义 key
 * @param ivStr 可选，自定义 iv
 */
export function encrypt(
    word: string,
    keyStr?: string,
    ivStr?: string,
): string {
    let key = KEY
    let iv = IV
    if (keyStr && ivStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr)
        iv = CryptoJS.enc.Utf8.parse(ivStr)
    }
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * 生成请求头 x-mxkpay-code 的值：access_token + '_' + 时间戳 的 AES 加密结果
 * @param accessToken 当前有效的 access_token
 */
export function getMxkpayCode(accessToken: string): string {
    const timer = getTimes()
    const result = `${accessToken}_${timer}`
    return encrypt(result)
}
