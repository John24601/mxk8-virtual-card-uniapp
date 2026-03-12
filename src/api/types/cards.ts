/**
 * 卡片管理相关数据类型（PRD §5.4、§6.1、§6.5）
 * 与后端 sys_business_card/list 返回结构对齐
 */

/** 卡片状态：0 正常，1 禁用（PRD §6.1） */
export type CardStatus = 0 | 1

/**
 * 卡片列表单项（list.records[]）- 与后端实际返回字段对齐
 */
export interface ICardRecord {
    id: string
    createTime: string | null
    updateTime: string | null
    userId: string | null
    businessId: string | null
    cardToken: string
    cardProductToken: string | null
    userToken: string | null
    /** 总额度 */
    limitAmount: number
    /** 剩余/可充值额度 */
    surplusLimitAmount: number
    /** 可用额度 */
    availableAmount: number
    firstName: string | null
    lastName: string | null
    email: string | null
    birthDate: string | null
    phone: string | null
    city: string | null
    state: string | null
    zip: string | null
    department: string | null
    childAccountId: string | null
    billingAddress: string | null
    addressNotes: string | null
    source: number | null
    cardHolderId: string | null
    cvv: string | null
    /** 卡号（可能含下划线掩码，如 547203______9945） */
    cardNumber: string
    /** 卡号后四位 */
    cardNumberLastFour: string
    expries: string | null
    cardJson: string | null
    cardOption: string | null
    /** 卡片类型，如 Virtual Card */
    cardType: 'Virtual Card' | 'Physical Card'
    /** 0 正常，1 禁用 */
    status: CardStatus
    starDate: string | null
    endDate: string | null
    limitMonth: number | null
    bulkCardOrderId: string | null
    expedite: string | null
    marqateActive: number | null
    country: string | null
    remarks: string | null
    cardBin: string | null
    lockAmount: number | null
    departmentName: string | null
    childAccountName: string | null
    businessNo: string | null
    legalRegisteredBusinessName: string | null
    satateDescription: string | null
    cardTypeDescription: string | null
    cardName: string | null
    cardSource: string | null
    initialAmount: number | null
    canAddFunds: boolean
    canDeductFunds: boolean
    canDisabled: boolean
    userEntityType: number
    usableAmount: number | null
    secondPassword: string | null
    isTrialCard: boolean
    isStripeUpdate?: boolean
}

/** 列表分页信息（list 对象） */
export interface ICardListPage {
    records: ICardRecord[]
    total: number
    size: number
    current: number
    orders: Array<{ column: string, asc: boolean }>
    optimizeCountSql: boolean
    hitCount: boolean
    countId: string | null
    maxLimit: number | null
    searchCount: boolean
    pages: number
}

/** 卡片汇总（cardAll） */
export interface ICardAllSummary {
    id: string | null
    createTime: string | null
    updateTime: string | null
    availableAmount: number | null
    surplusLimitAmount: number | null
    limitAmount: number | null
    cardNumber?: string
    cardType: string | null
    status: number | null
    [key: string]: unknown
}

/** 卡片列表 API 原始响应（list 在 list 字段内） */
export interface ICardListApiRes {
    cardAll: ICardAllSummary
    stripeUpdateCount?: number
    list: ICardListPage
}

/** 供页面使用的列表数据（从 API 中取出 list） */
export interface ICardListRes {
    records: ICardRecord[]
    total: number
    cardAll?: ICardAllSummary
}

/** 卡片详情（getByCardToken）- 与后端实际返回对齐，字段与列表项一致，有效期字段为 expries */
export interface ICardDetailRes {
    id: string
    createTime: string | null
    updateTime: string | null
    userId: string | null
    businessId: string | null
    cardToken: string
    cardProductToken: string | null
    userToken: string | null
    limitAmount: number
    surplusLimitAmount: number
    availableAmount: number
    firstName: string | null
    lastName: string | null
    email: string | null
    birthDate: string | null
    phone: string | null
    city: string | null
    state: string | null
    zip: string | null
    department: string | null
    childAccountId: string | null
    billingAddress: string | null
    addressNotes: string | null
    source: number | null
    cardHolderId: string | null
    cvv: string | null
    cardNumber: string
    /** 卡号后四位 */
    cardNumberLastFour: string | null
    /** 有效期，后端字段名为 expries，如 "0326" */
    expries: string | null
    cardJson: string | null
    cardOption: string | null
    cardType: string
    status: CardStatus
    starDate: string | null
    endDate: string | null
    limitMonth: number | null
    cardBin: string | null
    lockAmount: number | null
    [key: string]: unknown
}

/** 该卡交易记录单项（cardTransactionActivity）- 与后端实际返回对齐 */
export interface ICardTransactionRecord {
    id: string
    businessToken: string | null
    reversalStatus: number | null
    transactionToken: string
    cardNumber: string | null
    cardName: string | null
    cardToken: string
    cardBin: string | null
    createTime: string | null
    /** 如 "Completed" */
    status: string
    merchantName: string
    merchantAddress: string | null
    transactionAmount: string
    transactionTime: string
    /** 类型描述，如 "Create Card 9945" */
    type: string
    reason: string
    remarks: string | null
    businessNo: string | null
    legalRegisteredBusinessName: string | null
    source: number | null
    transactionType: number
    transactionStatus: boolean
    transactionTypeName: string
    transactionStatusName: string
    isShowTypeColour: boolean
    isShowStatusColour: boolean
    realTime: string | null
    departmentName: string | null
    updateTime: string | null
    isShow: boolean | null
    isShowTransactionFee: boolean | null
    transactionFee: number
    userEntityType: number
    showAmount: string | null
    amountTip: string | null
    currencyCode: string
    netAmount: string | null
    cardAvailableBalance: string | null
    authorizationTime: string
    department: string | null
    childAccountName: string | null
}

/** 该卡交易记录列表响应（含分页字段） */
export interface ICardTransactionListRes {
    records: ICardTransactionRecord[]
    total: number
    size?: number
    current?: number
    orders?: unknown[]
    optimizeCountSql?: boolean
    hitCount?: boolean
    countId?: string | null
    maxLimit?: number | null
    searchCount?: boolean
    pages?: number
}

/** 创建卡片请求体 */
export interface ICardCreateReq {
    cardBin: string
    cardType: 'Virtual Card'
    firstName: string
    lastName: string
    billingAddress: string
    addressNotes?: string
    amount: number
    expiryDate: string
    email?: string
    phone?: string
    city: string
    state: string
    zipCode: string
    birthDate?: string
}

/** 卡段权限列表单项 */
export interface ICardPermissionRecord {
    cardFee: number
    cardFees: Record<string, string>
    cardTop: string
    cardType: string
    foreignTransactionFeeEquation: string
    isApply: boolean
    prepaidCard: boolean
    showCardBin: string
    source: string
}
