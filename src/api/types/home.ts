/**
 * 首页相关数据类型（PRD §5.3、§5.5、§6.5）
 */

/** 用户账户余额（getUserAccount） */
export interface IUserAccountRes {
    /** 可用金额 */
    AvailableAmount?: number
    availableAmount?: number
    /** 卡片总余额 */
    CardBalance?: number
    cardBalance?: number
    /** 总余额 */
    totalBalance?: number
    /** 可用余额（与 AvailableAmount 二选一） */
    availableBalance?: number
    /** 冻结余额 */
    frozenBalance?: number
}

/** 收支统计（totalFundAmount） */
export interface IFundStatsRes {
    /** 收入金额 */
    mxk_pay_money_in?: number
    /** 支出金额 */
    mxk_pay_money_out?: number
}

/** 交易类型（PRD §6.2），后端可能为数字码或字符串 */
export type TransactionType = 'Credit' | 'Debit' | number

/** 交易状态（PRD §6.3） */
export type TransactionStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED' | 'Completed'

/**
 * 交易记录单项（sys_business_bill/list）- 与后端实际返回字段对齐
 */
export interface IBillRecord {
    id: string
    /** 交易金额，后端可能返回 string 如 "20.0" */
    transactionAmount: number | string
    /** 交易类型码（数字，如 1000）或类型名 */
    transactionType?: number | string
    transactionTypeName?: string
    /** 交易状态：后端可能为 boolean（true=通过）或字符串 */
    transactionStatus?: boolean | string
    transactionStatusName?: string
    /** 接口返回的 status 字段，如 "PENDING" */
    status?: string
    merchantName?: string
    createTime?: string
    transactionTime?: string
    /** 展示用类型名，如 "Pre-Authorization" */
    type?: string
    /** 展示用金额，如 "20.0" */
    showAmount?: string
}

/** 交易列表分页响应 */
export interface IBillListRes {
    records: IBillRecord[]
    total: number
}
