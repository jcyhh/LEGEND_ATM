import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import { getGasLimit } from '@/config/dapp'
import { message } from '@/utils/message'
import { t } from '@/locale'
import { getAddress } from '@/config/storage'

export function useDonation (contractAddress: string = import.meta.env.VITE_DONATION) {
    let contract:any = null // 合约

    const { connectWallet, showDappLoading, hideDappLoading } = useEthers()

    // 初始化合约
    const init = async () => {
        const { provider, signer } = await connectWallet()
        contract = new ethers.Contract(contractAddress, abi, provider).connect(signer)
    }

    // [写]批量查询所有节点信息
    const readGetAllNodesInfo = async () => {
        return await contract.getAllNodesInfo();
    }

    // [写]查询用户购买详细信息
    const readGetUserPurchaseDetails = async () => {
        return await contract.getUserPurchaseDetails(getAddress());
    }

    const readWhitelist = async () => await contract.whitelist(getAddress());

    // [写]购买节点
    const writePurchaseNode = async (...arg:any[]) => {
        console.log(arg);
        try {
            showDappLoading()
            const estimatedGas = await contract.purchaseNode.estimateGas(...arg);
            const result = await contract.purchaseNode(...arg, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            hideDappLoading()
            message(t('操作成功'),'success')
        } catch (error) {
            console.log(error);
            hideDappLoading() // 关闭加载
            message(t('操作失败'), 'fail')
            throw new Error('操作失败')
        }
    }

    return {
        init,
        readGetAllNodesInfo,
        readGetUserPurchaseDetails,
        readWhitelist,
        writePurchaseNode
    }
}