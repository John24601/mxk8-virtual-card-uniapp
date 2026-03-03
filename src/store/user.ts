import type { IUserInfoRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/login'

// 初始化状态（与 IUserInfoRes 必填字段一致）
const userInfoState: IUserInfoRes = {
    id: '',
    createTime: '',
    updateTime: '',
    userId: '',
    businessToken: '',
    businessType: null,
    cardBusinessName: null,
    legalRegisteredBusinessName: '',
    englishName: null,
    ein: null,
    registrationNumber: null,
    companyPhoneNumber: null,
    businessStructure: null,
    structure: 0,
    industry: null,
    industrySubcategory: null,
    companySize: '',
    toKnow: null,
    businessNo: '',
    webSite: null,
    incorporationType: null,
    stateCorporateNumber: null,
    stateCorporateType: null,
    sameBusinessPersonOfficer: null,
    dateEstablished: null,
    stateOfIncorporation: null,
    isPublic: null,
    dwollaCustomersId: null,
    fundingSourceId: null,
    businessNation: null,
    mxkAccountBusinessId: null,
    socialSecurityType: null,
    socialSecurityNumber: null,
    secondIdType: null,
    secondIdNumber: null,
    officeAddressType: 0,
    identicalBusinessAddressMailingAddress: null,
    code: null,
    mobile: null,
    activeTime: null,
    reasonCode: null,
    userStatus: null,
    businessPersonOfficers: [],
    registerVersion: 0,
    remark: null,
    businessStreetAddress: null,
    businessAddressRegisteredGovernment: null,
    businessAddressNotes: null,
    businessAddressCity: null,
    businessAddressState: null,
    businessAddressZip: null,
    mailingStreetAddress: null,
    mailingAddress: null,
    mailingAddressNotes: null,
    mailingAddressCity: null,
    mailingAddressState: null,
    mailingAddressZip: null,
    firstName: '',
    lastName: '',
    jobTitle: null,
    phoneNumber: '',
    birthDate: null,
    streetAddress: null,
    homeAddress: null,
    notes: null,
    city: null,
    state: null,
    zip: null,
    socialSecurity: null,
    businessOwnedPrecentage: null,
    sharesOfOthers: null,
    avatar: '/static/images/default-avatar.png',
}

export const useUserStore = defineStore(
    'user',
    () => {
    // 定义用户信息
        const userInfo = ref<IUserInfoRes>({ ...userInfoState })
        // 设置用户信息
        const setUserInfo = (val: IUserInfoRes) => {
            console.log('设置用户信息', val)
            // 若头像为空则使用默认头像
            const avatar = val.avatar ?? userInfoState.avatar
            userInfo.value = { ...val, avatar }
        }
        const setUserAvatar = (avatar: string) => {
            userInfo.value = { ...userInfo.value, avatar }
            console.log('设置用户头像', avatar)
            console.log('userInfo', userInfo.value)
        }
        // 删除用户信息
        const clearUserInfo = () => {
            userInfo.value = { ...userInfoState }
            uni.removeStorageSync('user')
        }

        /**
         * 获取用户信息
         */
        const fetchUserInfo = async () => {
            const res = await getUserInfo()
            setUserInfo(res)
            return res
        }

        return {
            userInfo,
            clearUserInfo,
            fetchUserInfo,
            setUserInfo,
            setUserAvatar,
        }
    },
    {
        persist: true,
    },
)
