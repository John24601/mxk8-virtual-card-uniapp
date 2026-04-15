/**
 * 资金流水（PRD §5.3 sys_funds/list）
 */
export interface IFundRecord {
    id: string | number
    /** Credit / Debit 等 */
    type?: string
    amount?: string | number
    availableBalance?: string | number
    status?: string
    description?: string | null
    createTime?: string
    initiated?: string
    fundsAvailable?: string | number
}

/** 资金流水分页（与账单列表分页结构对齐） */
export interface IFundListRes {
    records: IFundRecord[]
    total: number
    size?: number
    current?: number
    pages?: number
}
