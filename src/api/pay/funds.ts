import type { IFundStatsRes, IUserAccountRes } from '@/api/types/home'
import { http } from '@/http/http'

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
