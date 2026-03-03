import type { IBillListRes } from '@/api/types/home'
import { http } from '@/http/http'

/**
 * 交易记录列表（PRD §5.5），首页最近交易用 current:1, pageSize:5
 */
export function getBillList(params: { current: number, pageSize: number, transactionType?: string }) {
    return http.get<IBillListRes>('/api-pay/sys_business_bill/list', params)
}
