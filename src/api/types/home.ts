/**
 * 首页相关数据类型（PRD §5.3、§5.5、§6.5）
 */

/** 用户账户余额（getUserAccount） */
export interface IUserAccountRes {
    /** 总余额 */
    Amount?: number
    /** 可用金额 */
    AvailableAmount?: number
    /** 卡片总余额 */
    CardBalance?: number
}

/** 收支统计（totalFundAmount） */
export interface IFundStatsRes {
    /** 收入金额 */
    mxk_pay_money_in?: string
    /** 支出金额 */
    mxk_pay_money_out?: string
}

/** 交易类型（PRD §6.2），后端可能为数字码或字符串 */
export type TransactionType = 'Credit' | 'Debit' | number

/** 交易状态（PRD §6.3） */
export type TransactionStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED' | 'Completed'

/**
 * 交易记录单项（sys_business_bill/list）- 与后端实际返回字段对齐
 */
export interface IBillRecord {
    id: string | number
    businessToken: string
    reversalStatus: number
    transactionToken: string
    cardNumber: string
    cardName: string
    cardToken: string
    cardBin: string
    createTime: string
    /** 如 "PENDING" | "COMPLETED" */
    status: 'DECLINED' | 'PENDING' | 'COMPLETED'
    merchantName: string | null
    merchantAddress: string | null
    /** 交易金额，后端返回 string 如 "20.0" */
    transactionAmount: string
    transactionTime: string
    /** 展示用类型名，如 "Pre-Authorization" | "authorization" */
    type: string
    reason: string
    remarks: string | null
    businessNo: string
    legalRegisteredBusinessName: string
    source: number
    transactionType: number
    transactionStatus: boolean
    transactionTypeName: string
    transactionStatusName: string
    isShowTypeColour: boolean
    isShowStatusColour: boolean
    realTime: string | null
    departmentName: string | null
    updateTime: string
    isShow: boolean
    isShowTransactionFee: boolean
    transactionFee: number
    userEntityType: number | null
    /** 展示用金额，如 "20.0" */
    showAmount: string
    amountTip: string | null
    currencyCode: string
    childAccountName: string | null
}

/** 交易列表分页响应（含 MyBatis-Plus 分页字段） */
export interface IBillListRes {
    records: IBillRecord[]
    total: number
    size: number
    current: number
    orders: unknown[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: string | null
    maxLimit: number | null
    searchCount: boolean
    pages: number
}
