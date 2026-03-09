import type {
    ICardCreateReq,
    ICardDetailRes,
    ICardListApiRes,
    ICardPermissionRecord,
    ICardTransactionListRes,
} from '@/api/types/cards'
import { http } from '@/http/http'

const LIST_URL = '/api-pay/sys_business_card/list'
const CHANGE_STATUS_URL = '/api-card/sys_business_card/changeCardStauts'
const CARD_DETAIL_BASE = '/api-pay/business-card-anon/getByCardToken'
const CARD_TX_ACTIVITY_URL = '/api-pay/sys_business_bill/cardTransactionActivity'
const CARD_CREATE_URL = '/api-pay/sys_business_card/create'
const CARD_PERMISSIONS_URL = '/api-pay/sys_business_card/cardPermissions'

/**
 * 卡片列表（PRD §5.4）
 * 后端返回 { cardAll, list: { records, total, ... } }
 */
export function getCardList(params: { current: number, pageSize: number }) {
    return http.get<ICardListApiRes>(LIST_URL, {
        current: params.current,
        pageSize: params.pageSize,
        column: 'createTime',
        order: 'desc',
    })
}

/**
 * 创建卡片（PRD §5.4）
 */
export function cardCreate(data: ICardCreateReq) {
    return http.post<unknown>(CARD_CREATE_URL, data)
}

/**
 * 卡段权限列表（PRD §5.4）
 * 后端返回 { records, total }
 */
export function getCardPermissions() {
    return http.get<ICardPermissionRecord[]>(CARD_PERMISSIONS_URL)
}

/**
 * 切换卡片状态（PRD §5.4）：0 激活，1 禁用
 */
export function changeCardStatus(id: string, status: 0 | 1) {
    return http.put<unknown>(CHANGE_STATUS_URL, { id, status })
}

/**
 * 卡片详情（匿名）（PRD §5.4）
 */
export function getCardByToken(cardToken: string) {
    return http.get<ICardDetailRes>(`${CARD_DETAIL_BASE}/${encodeURIComponent(cardToken)}`)
}

/**
 * 该卡交易记录（PRD §5.4）
 */
export function getCardTransactionActivity(params: {
    cardToken: string
    current: number
    pageSize: number
}) {
    return http.get<ICardTransactionListRes>(CARD_TX_ACTIVITY_URL, {
        cardToken: params.cardToken,
        current: params.current,
        pageSize: params.pageSize,
    })
}
