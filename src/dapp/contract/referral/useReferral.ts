import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import { getAddress } from '@/config/storage'

export function useReferral (contractAddress: string = import.meta.env.VITE_REFERRAL) {
    let contract:any = null // 合约

    const { connectWallet } = useEthers()

    // 初始化合约
    const init = async () => {
        const { provider, signer } = await connectWallet()
        contract = new ethers.Contract(contractAddress, abi, provider).connect(signer)
    }

    // [写]获取根用户地址
    const readGetRootAddress = async () => {
        return await contract.getRootAddress();
    }

    // [写]是否绑定推荐人
    const readIsBindReferral = async () => {
        return await contract.isBindReferral(getAddress());
    }

    return {
        init,
        readGetRootAddress,
        readIsBindReferral
    }
}