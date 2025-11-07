import { apiGet } from '@/utils/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDappStore = defineStore('dapp', () => {

    const hasMetaMask = ref(0) // 0异步等待钱包对象注入中 1有MetaMask环境 2无MetaMask环境

    const address = ref('') // 钱包地址
    const userCode = ref('') //邀请码

    const refAddress = ref() // 邀请人地址
    const refCode = ref() // 邀请人邀请码

    const updateHasMetaMask = (value:number) => hasMetaMask.value = value

    const loading = ref(false) // 是否开启loading

    // 获取邀请人的邀请地址
    const getInviterInfo = () => {
        apiGet('/api/users/address',{
            referral_code:refCode.value
        }).then((res:any)=>{
            refAddress.value = res.address
        })
    }

    return {
        address,
        loading,
        hasMetaMask,
        refAddress,
        refCode,
        userCode,
        updateHasMetaMask,
        getInviterInfo
    }
})