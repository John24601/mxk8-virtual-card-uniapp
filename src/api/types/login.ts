// 认证模式类型
export type AuthMode = 'single' | 'double'

// 单Token响应类型
export interface ISingleTokenRes {
    access_token: string
    refresh_token: string
    expires_in: number // 访问令牌有效期(秒)
    scope: 'app'
    token_type: 'bearer'
}

// 双Token响应类型
export interface IDoubleTokenRes {
    access_token: string
    refresh_token: string
    expires_in: number // 访问令牌有效期(秒)
    refresh_expires_in: number // 刷新令牌有效期(秒)
    scope: 'app'
    token_type: 'bearer'
}

/**
 * 登录返回的信息，其实就是 token 信息
 */
export type IAuthLoginRes = ISingleTokenRes | IDoubleTokenRes

/**
 * 用户信息
 */
export type UserRole = string

/** 企业联系人/负责人（businessPersonOfficers 项） */
export interface IBusinessPersonOfficer {
    id: string
    createTime: string
    updateTime: string
    businessId: string
    firstName: string | null
    lastName: string | null
    jobTitle: string | null
    phoneNumber: string | null
    birthDate: string | null
    socialSecurity: string | null
    sharesOfOthers: string | null
    socialSecurityType: string | null
    socialSecurityNumber: string | null
    secondIdType: string | null
    secondIdNumber: string | null
    chineseFirstName: string
    chineseLastName: string
    certificateType: number
    certificateNumber: string
    isBeneficialOwner: boolean
    nation: string
    personType: number
    percentageOfShares: string
    isDel: boolean
    idvPersonType: string | null
    businessOwnedPrecentage: string
    streetAddress: string | null
    homeAddress: string | null
    notes: string | null
    city: string | null
    state: string | null
    zip: string | null
    type: string | null
}

/**
 * 用户/企业信息（与后端用户信息接口返回一致）
 */
export interface IUserInfoRes {
    id: string
    createTime: string
    updateTime: string
    userId: string
    businessToken: string
    businessType: string | null
    cardBusinessName: string | null
    legalRegisteredBusinessName: string
    englishName: string | null
    ein: string | null
    registrationNumber: string | null
    companyPhoneNumber: string | null
    businessStructure: string | null
    structure: number
    industry: string | null
    industrySubcategory: string | null
    companySize: string
    toKnow: string | null
    businessNo: string
    webSite: string | null
    incorporationType: string | null
    stateCorporateNumber: string | null
    stateCorporateType: string | null
    sameBusinessPersonOfficer: string | null
    dateEstablished: string | null
    stateOfIncorporation: string | null
    isPublic: boolean | null
    dwollaCustomersId: string | null
    fundingSourceId: string | null
    businessNation: string | null
    mxkAccountBusinessId: string | null
    socialSecurityType: string | null
    socialSecurityNumber: string | null
    secondIdType: string | null
    secondIdNumber: string | null
    officeAddressType: number
    identicalBusinessAddressMailingAddress: string | null
    code: string | null
    mobile: string | null
    activeTime: string | null
    reasonCode: string | null
    userStatus: string | null
    businessPersonOfficers: IBusinessPersonOfficer[]
    registerVersion: number
    remark: string | null
    businessStreetAddress: string | null
    businessAddressRegisteredGovernment: string | null
    businessAddressNotes: string | null
    businessAddressCity: string | null
    businessAddressState: string | null
    businessAddressZip: string | null
    mailingStreetAddress: string | null
    mailingAddress: string | null
    mailingAddressNotes: string | null
    mailingAddressCity: string | null
    mailingAddressState: string | null
    mailingAddressZip: string | null
    firstName: string
    lastName: string
    jobTitle: string | null
    phoneNumber: string
    birthDate: string | null
    streetAddress: string | null
    homeAddress: string | null
    notes: string | null
    city: string | null
    state: string | null
    zip: string | null
    socialSecurity: string | null
    businessOwnedPrecentage: string | null
    sharesOfOthers: string | null
    /** 头像（可选，部分接口或前端展示用） */
    avatar?: string
}

/**
 * 用户信息接口的原始响应（data 内再包一层 data + success）
 * 仅用于 getSysBusinessByCurrentUser 等返回 { data: IUserInfoRes, success: boolean } 的接口
 */
export interface IUserInfoApiRes {
    data: IUserInfoRes
    success: boolean
}

// 认证存储数据结构
export interface AuthStorage {
    mode: AuthMode
    tokens: ISingleTokenRes | IDoubleTokenRes
    userInfo?: IUserInfoRes
    loginTime: number // 登录时间戳
}

/**
 * 获取验证码
 */
export interface ICaptcha {
    captchaEnabled: boolean
    uuid: string
    image: string
}
/**
 * 上传成功的信息
 */
export interface IUploadSuccessInfo {
    fileId: number
    originalName: string
    fileName: string
    storagePath: string
    fileHash: string
    fileType: string
    fileBusinessType: string
    fileSize: number
}
/**
 * 更新用户信息
 */
export interface IUpdateInfo {
    id: number
    name: string
    sex: string
}
/**
 * 更新用户信息
 */
export interface IUpdatePassword {
    id: number
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

/**
 * 判断是否为单Token响应
 * @param tokenRes 登录响应数据
 * @returns 是否为单Token响应
 */
export function isSingleTokenRes(tokenRes: IAuthLoginRes): tokenRes is ISingleTokenRes {
    return 'access_token' in tokenRes && !('refresh_expires_in' in tokenRes)
}

/**
 * 判断是否为双Token响应
 * @param tokenRes 登录响应数据
 * @returns 是否为双Token响应
 */
export function isDoubleTokenRes(tokenRes: IAuthLoginRes): tokenRes is IDoubleTokenRes {
    return 'access_token' in tokenRes && 'refresh_token' in tokenRes && 'refresh_expires_in' in tokenRes
}
