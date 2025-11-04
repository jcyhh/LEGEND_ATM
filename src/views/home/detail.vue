<template>
    <img src="@/assets/imgs/bg.jpg" class="bg">
    <div class="gap30"></div>
    <div class="flex jc rel">
        <img src="@/assets/imgs/Top.png" class="picTop animate__animated animate__flipInY delay3">
    </div>

    <div class="pl80 pr80 rel">
        <div class="progress">
            <div class="progressBox" :style="{width: `${progress}%`}"></div>
        </div>
        <div class="tc mt10 size28 font2">{{ totalLeft }} / {{ totalRight }} {{ $t('nodes sold') }}</div>
    </div>

    <div class="pl30 pr30 mt30 rel" v-if="nodeDetail.length>0">
        <div class="flex jb ac">
            <div class="flex ac">
                <img src="@/assets/imgs/node.png" class="nodeImg">
                <div class="size28 main ml20 font2">{{ nodeDetail[1] }}</div>
            </div>
            <div class="size28 ml20 font2">$<span v-init="bigIntToSmall(nodeDetail[2])"></span></div>
        </div>

        <div class="card mt30">
            <div class="size28 main font2">{{ nodeDetail[1] }}</div>
            <div class="grey size20 mt20">
                <span v-if="Number(nodeDetail[0])==1">{{ $t('Entry-level Al participation node for stable airdrop rewards.') }}</span>
                <span v-if="Number(nodeDetail[0])==2">{{ $t('Enhanced liquidity node with accelerated DeFi returns.') }}</span>
                <span v-if="Number(nodeDetail[0])==3">{{ $t('Governance and ecosystem node with voting privileges.') }}</span>
                <span v-if="Number(nodeDetail[0])==4">{{ $t('Exclusive founder node with the highest rewards and authority.') }}</span>
            </div>
        </div>

        <div class="progress1 mt30 flex ac je">
            <div class="progressBox1" :style="{width: `${nodeProgress}%`}"></div>
            <div class="size24 pr30 rel">{{ nodeDetail[4] > nodeDetail[3] ? nodeDetail[3] : nodeDetail[4] }} / {{ nodeDetail[3] }}</div>
        </div>

        <div class="submitbtn mt30 size28 font2" @click="submit" v-if="id==0">{{ $t('Buy Now') }}</div>

        <div class="tc font2 size36 main mt30 mb30">{{ $t('NODE REWARDS') }}</div> 

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('考核达标可得空投') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeDetail[0])==1">500</span>
                    <span v-if="Number(nodeDetail[0])==2">1500</span>
                    <span v-if="Number(nodeDetail[0])==3">3000</span>
                    <span v-if="Number(nodeDetail[0])==4">8000</span>
                     {{ $t('枚') }}
                </div>
            </div>
        </div>

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('考核达标分红权重') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeDetail[0])==1">1x</span>
                    <span v-if="Number(nodeDetail[0])==2">1.2x</span>
                    <span v-if="Number(nodeDetail[0])==3">1.6x</span>
                    <span v-if="Number(nodeDetail[0])==4">2x</span>
                </div>
            </div>
        </div>

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('3个月试用激励层') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeDetail[0])==1">V2</span>
                    <span v-if="Number(nodeDetail[0])==2">V3</span>
                    <span v-if="Number(nodeDetail[0])==3">V4</span>
                    <span v-if="Number(nodeDetail[0])==4">V5</span>
                </div>
            </div>
        </div>

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('节点推荐激励') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeDetail[0])==1">10%</span>
                    <span v-if="Number(nodeDetail[0])==2">10%</span>
                    <span v-if="Number(nodeDetail[0])==3">20%</span>
                    <span v-if="Number(nodeDetail[0])==4">20%</span>
                </div>
            </div>
        </div>


    </div>

    <van-popup v-model:show="show" style="background-color: transparent !important;">
        <div class="pop">
            <div class="flex jb ac">
                <van-icon name="cross" color="#0a0a0a" :size="30" />
                <div class="size30 font2">{{ $t('Determine the inviter') }}</div>
                <van-icon name="cross" :size="30" @click="show=false" />
            </div>

            <div class="inp flex  mt60">
                <input type="text" v-model="inviteAddress" :placeholder="$t(`Please enter the inviter's address`)" class="flex1 size26">
            </div>

            <div class="popbtn mt60 font2 size28" @click="buy">{{ $t('Sure') }}</div>
        </div>
    </van-popup>

</template>

<script setup lang="ts">
import { bigIntToSmall } from '@/config/dapp';
import { useEthers } from '@/dapp';
import { useDonation } from '@/dapp/contract/donation/useDonation';
import { useErc20 } from '@/dapp/contract/erc20/useErc20';
import { useReferral } from '@/dapp/contract/referral/useReferral';
import { t } from '@/locale';
import { routerReplace } from '@/router';
import { useAppStore, useDappStore } from '@/store';
import { computedDiv } from '@/utils';
import { message } from '@/utils/message';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const useStore = useAppStore()
const { nodeDetail, totalLeft, totalRight, progress } = storeToRefs(useStore)

if(nodeDetail.value.length==0){
    routerReplace('/home/index')
}

const nodeProgress = computed(()=>{
    if(nodeDetail.value.length>0){
        return Math.floor(computedDiv(nodeDetail.value[4] > nodeDetail.value[3] ? nodeDetail.value[3] : nodeDetail.value[4], nodeDetail.value[3]) * 10000) / 100
    }else return 0
})

const dappStore = useDappStore()
const { address, refAddress } = storeToRefs(dappStore)

const { checkGas } = useEthers()
const { init:initErc20, approve } = useErc20(import.meta.env.VITE_DONATION)
const { init:initDonation, writePurchaseNode, readGetUserPurchaseDetails } = useDonation()
const { init:initReferral, readIsBindReferral, readGetRootAddress } = useReferral()

watch(address, async val => {
    if(val){
        initErc20()
        await initReferral()
        await initDonation()
        loadData()
    }
},{immediate:true})

const inviteAddress = ref()
const show = ref(false)
const hasBind = ref(false)
const id = ref(0)
const loadData = async () => {
    const buyInfo = await readGetUserPurchaseDetails()
    id.value = Number(buyInfo[0])
    const isBind = await readIsBindReferral()
    hasBind.value = isBind
    if(!isBind){
        if(refAddress.value){
            const addr = refAddress.value
            inviteAddress.value = addr
        }else{
            const addr = await readGetRootAddress()
            inviteAddress.value = addr
            refAddress.value = addr
        }
    }
}
const submit = async () => {
    if(hasBind.value){
        submitBuy()
    }else{
        show.value = true
    }
}
const buy = () => {
    if(!inviteAddress.value)return message(t(`Please enter the inviter's address`))
    submitBuy()
}
const submitBuy = async () => {
    if (!(await checkGas())) return;

    console.log(bigIntToSmall(nodeDetail.value[2]));
    await approve(bigIntToSmall(nodeDetail.value[2]));
    
    await writePurchaseNode(nodeDetail.value[0], inviteAddress.value || '0x0000000000000000000000000000000000000000')

    show.value = false

    routerReplace('/node/index')
}
</script>

<style lang="scss" scoped>
.pop{
    width: 690px;
    padding: 40px;
    border-radius: 20px;
    background-color: #0a0a0a;
    border: 1px solid $main-color;
    .inp{
        height: 80px;
        border-radius: 10px;
        background-color: #332a25;
        padding: 0 30px;
    }
    .popbtn{
        height: 88px;
        border-radius: 20px;
        background-color: $main-color;
        color: #000000;
        text-align: center;
        line-height: 88px;
    }
}
.bg{
    width: 100vw;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
}
.picTop{
    width: 300px;
}
.head{
    width: 100vw;
    height: 500px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}
.progress{
    height: 20px;
    border-radius: 10px;
    border: 1px solid $main-color;
    box-shadow: 0 0 20px rgba($main-color, $alpha: 0.5);
    background-color: #0a0a0a;
    overflow: hidden;
    padding: 1px;
    .progressBox{
        height: 100%;
        background: linear-gradient(
            90deg,
            #f6c245 0%,
            #ffea9c 25%,
            #f6c245 50%,
            #d1a231 100%
        );
        border-radius: 10px;
    }
}
.submitbtn{
    height: 80px;
    border-radius: 40px;
    color: #000000;
    text-align: center;
    line-height: 80px;
    background-color: $main-color;
}
.progress1{
    height: 40px;
    border-radius: 20px;
    border: 1px solid $main-color;
    box-shadow: 0 0 20px rgba($main-color, $alpha: 0.5);
    background-color: rgba($main-color, $alpha: 0.1);
    overflow: hidden;
    padding: 1px;
    position: relative;
    .progressBox1{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: linear-gradient(
            90deg,
            #f6c245 0%,
            #ffea9c 25%,
            #f6c245 50%,
            #d1a231 100%
        );
        border-radius: 20px;
    }
}
.card{
    border-radius: 20px;
    border: 1px solid rgba($main-color, $alpha: 0.3);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 30px 20px;
    .node{
        width: 300px;
        height: 198px;
        background-image: url("@/assets/imgs/area.png");
        background-size: 100% 100%;
        .nodeImg{
            width: 80px;
            height: auto;
        }
    }
    .buy{
        height: 40px;
        border-radius: 20px;
        padding: 0 30px;
        background-color: rgba($main-color, $alpha: 0.1);
        border: 1px solid $main-color;
    }
    .invite{
        height: 66px;
        line-height: 66px;
        background-color: rgba($main-color, $alpha: 0.1);
        border-radius: 10px;
        padding: 0 30px;
    }
    .copy{
        border: 1px solid rgba($main-color, $alpha: 0.5);
        height: 66px;
        width: 66px;
        border-radius: 10px;
    }
}
.picAtm{
    width: 88px;
    height: auto;
}
.item{
    width: 335px;
    border: 1px solid rgba($main-color, $alpha: 0.3);
    border-radius: 20px;
    padding: 30px;
    background-color: rgba($main-color, $alpha: 0.1);
}
</style>