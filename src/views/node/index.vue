<template>
    <img src="@/assets/imgs/bg.jpg" class="bg">
    <div class="gap50"></div>

    <div class="pl30 pr30 mt30 rel">
        <div class="flex jc ac">
            <img src="@/assets/imgs/node.png" class="nodeImg">
            <div class="size28 main ml20 font2">{{ nodeInfo ? nodeInfo[1] : '--' }}</div>
            <div class="size28 ml20 font2">$<span v-init="bigIntToSmall(nodeInfo ? nodeInfo[2] : 0)"></span></div>
        </div>

        <div class="card mt30 font2">
            <div class="tc size30">{{ $t('Purchase Successfu!!') }}</div>
            <div class="tc size28 main mt20">{{ $t('Time') }}: {{ nodeInfo ? initTime(`${Number(nodeInfo[4])}`) : '--' }}</div>
            <div class="tc size20 grey mt20">{{ $t('Congratulations! You are now a proud holder of a Legend ATM Node!') }}</div>
        </div>

        <div class="tc font2 size36 main mt30 mb30">{{ $t('Invitation Link') }}</div>

        <div class="card mb30">
            <div class="flex ac">
                <img src="@/assets/imgs/invite.png" class="img26 mr10">
                <div class="size24 main font2">{{ $t('Invite your friends to come along') }}</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="invite flex1 size24 line1 font2">{{ inviteLink }}</div>
                <div class="copy ml30 flex jc ac" v-copy="inviteLink">
                    <img src="@/assets/imgs/copy.png" class="img38">
                </div>
            </div>
        </div>

        <div class="tc font2 size36 main mt30 mb30">{{ $t('Your Node Benefits') }}</div>

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('考核达标可得空投') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeInfo[0])==1">500</span>
                    <span v-if="Number(nodeInfo[0])==2">1500</span>
                    <span v-if="Number(nodeInfo[0])==3">3000</span>
                    <span v-if="Number(nodeInfo[0])==4">8000</span>
                     {{ $t('枚') }}
                </div>
            </div>
        </div>

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('考核达标分红权重') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeInfo[0])==1">1x</span>
                    <span v-if="Number(nodeInfo[0])==2">1.2x</span>
                    <span v-if="Number(nodeInfo[0])==3">1.6x</span>
                    <span v-if="Number(nodeInfo[0])==4">2x</span>
                </div>
            </div>
        </div>

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('3个月试用激励层') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeInfo[0])==1">V2</span>
                    <span v-if="Number(nodeInfo[0])==2">V3</span>
                    <span v-if="Number(nodeInfo[0])==3">V4</span>
                    <span v-if="Number(nodeInfo[0])==4">V5</span>
                </div>
            </div>
        </div>

        <div class="card flex ac mb20">
            <img src="@/assets/imgs/atm.png" class="picAtm">
            <div class="ml20">
                <div class="size30 font2 main">{{ $t('节点推荐激励') }}</div>
                <div class="size24 mt10">
                    <span v-if="Number(nodeInfo[0])==1">10%</span>
                    <span v-if="Number(nodeInfo[0])==2">10%</span>
                    <span v-if="Number(nodeInfo[0])==3">20%</span>
                    <span v-if="Number(nodeInfo[0])==4">20%</span>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { bigIntToSmall } from '@/config/dapp';
import { useDonation } from '@/dapp/contract/donation/useDonation';
import { useDappStore } from '@/store';
import { initTime } from '@/utils';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const dappStore = useDappStore()
const { address } = storeToRefs(dappStore)

const { init:initDonation, readGetUserPurchaseDetails } = useDonation()

const inviteLink = computed(()=> address.value ? `${window.origin}?ref=${address.value}` : '--')

watch(address, async val => {
    if(val){
        await initDonation()
        loadData()
    }
},{immediate:true})

const nodeInfo = ref()
const loadData = async () => {
    nodeInfo.value = await readGetUserPurchaseDetails()
    console.log(nodeInfo.value);
    
}
</script>

<style lang="scss" scoped>
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
        border-radius: 10p x;
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