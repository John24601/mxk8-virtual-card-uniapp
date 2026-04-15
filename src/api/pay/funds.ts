import type { IFundListRes } from '@/api/types/funds'
import type { IFundStatsRes, IUserAccountRes } from '@/api/types/home'
import { http } from '@/http/http'

/** PRD §5.3 资金流水列表 field 参数 */
const FUND_LIST_FIELDS = 'id,initiated,fundsAvailable,description,type,amount,availableBalance,status'

/**
 * 获取用户账户余额（PRD §5.3）
 */
export function getUserAccount() {
    return http.get<IUserAccountRes>('/api-pay/sys_user_account/getUserAccount')
}

/**
 * 收支统计（PRD §5.3）
 * @param day 7 | 30 | 90 天
 */
export function getTotalFundAmount(day: 7 | 30 | 90) {
    return http.get<IFundStatsRes>('/api-pay/sys_funds/totalFundAmount', {
        level: 2,
        type: 1,
        day,
    })
}

/**
 * 资金流水列表（PRD §5.3）
 */
export function getFundList(params?: { current?: number, pageSize?: number }) {
    return http.get<IFundListRes>('/api-pay/sys_funds/list', {
        field: FUND_LIST_FIELDS,
        current: params?.current ?? 1,
        pageSize: params?.pageSize ?? 10,
    })
}
