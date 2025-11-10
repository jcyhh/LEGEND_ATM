<!--
 * @Description: 
 * @Version: 1.0
 * @Author: JCY
 * @Date: 2025-11-03 09:14:13
-->
<template>
    <div class="start flex jc ac">
        <img src="@/assets/layout/logo.png" class="startImg animate__animated animate__bounceInRight" />
    </div>
    <div class="size28 mt30 grey tips animate__animated animate__fadeInUp" v-if="hasMetaMask==2">{{ $t('请安装') }} MateMask !</div>
</template>

<script setup lang="ts">
import { homePath } from '@/config/dapp';
import { useEthers } from '@/dapp';
import { useDonation } from '@/dapp/contract/donation/useDonation';
import { routerReplace } from '@/router';
import { useDappStore } from '@/store';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const { query } = useRoute()

const { connectWallet } = useEthers()

const dappStore = useDappStore()
const { address, hasMetaMask, refAddress, refCode } = storeToRefs(dappStore)

const { init:initDonation, readGetUserPurchaseDetails } = useDonation()

if(query.ref){
    console.log('邀请码',query.ref);
    
    refCode.value = query.ref as string
    dappStore.getInviterInfo()
}else{
    console.log('没邀请码');
    refAddress.value = ''
    refCode.value = ''
}

// 当钱包对象异步注入到浏览器后，钱包登录 或者 去首页
watch(address, async (val)=>{
    if(!val)return
    await connectWallet()
    await initDonation()
    const hasNode:any = await readGetUserPurchaseDetails()
    const id = Number(hasNode[0])
    setTimeout(() => {
        if(id==0)routerReplace(homePath)
        else routerReplace('/node/index')
    }, 1500);
    
},{immediate:true})
</script>

<style lang="scss" scoped>
.lang{
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 1000000;
}
.start {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding-bottom: 200px;

    .startImg {
        width: 50vw;
        height: auto;
    }
}
.tips{
    width: 100vw;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    text-align: center;
}
.bind{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
    .box{
        padding: 30px 24px;
        border-radius: 20px;
        border: 1px solid #999999;
    }
}
</style>