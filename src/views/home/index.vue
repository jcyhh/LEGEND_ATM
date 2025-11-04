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

    <div class="pl30 pr30 mt30 rel">

        <div class="card flex jb wrap">

            <div class="" v-for="(item,index) in nodesList" :key="index">
                <div class="node flex ac">
                    <img src="@/assets/imgs/node.png" class="nodeImg">
                    <div class="ml20 size26">
                        <div class="main font2">{{ item[1] }}</div>
                        <div class="font2 mt5">$<span v-init="bigIntToSmall(item[2])"></span></div>
                    </div>
                </div>
                <div class="flex jb ac pt10 pb20 font2">
                    <div class="buy size20 flex jc ac">{{ item[4] > item[3] ? item[3] : item[4] }} / {{ item[3] }}</div>
                    <div class="buy size20 flex jc ac" @click="godetail(item)">{{ $t('Buy Now') }}</div>
                </div>
            </div>

        </div>

        <div class="tc font2 size36 main mt30 mb30">{{ $t('NODE REWARDS') }}</div> 

        <div class="flex jb ast wrap mb30">
            <div class="flex ac item mb20" v-for="(item,index) in rewards" :key="index">
                <img src="@/assets/imgs/atm.png" class="picAtm">
                <div class="ml20">
                    <div class="size30 font2 main">{{ item.name }}</div>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { bigIntToSmall, bigIntToNumber } from '@/config/dapp';
import { useDonation } from '@/dapp/contract/donation/useDonation';
import { t } from '@/locale';
import { routerPush } from '@/router';
import { useAppStore, useDappStore } from '@/store';
import { computedDiv } from '@/utils';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const useStore = useAppStore()

const rewards = [
    { name:t('Airdrop Allocation') },
    { name:t('Slippage Sharing') },
    { name:`${t('Profit & Tax Sharing')}` },
    { name:t('Tier-Based Incentives') }
]

const nodesList = ref<any>([])

const dappStore = useDappStore()
const { address } = storeToRefs(dappStore)

const { init:initDonation, readGetAllNodesInfo } = useDonation()

watch(address, async val => {
    if(val){
        await initDonation()
        loadData()
    }
},{immediate:true})

const loadData = async () => {
    const nodes = await readGetAllNodesInfo()
    const groupedArrays: any[][] = []
    if (nodes && nodes.length > 0 && nodes[0].length === 4) {
        // 假设每个子数组都有4个值
        for (let i = 0; i < 4; i++) {
            groupedArrays.push(nodes.map((arr: any[]) => arr[i]))
        }
    }
    nodesList.value = groupedArrays
    console.log(nodesList.value);
}

const totalLeft = computed(()=>{
    let num = 0
    if(nodesList.value.length > 0){
        num = nodesList.value.reduce((sum: number, item: any[]) => {
            const value4 = item[4] !== undefined ? bigIntToNumber(item[4]) : 0
            const value3 = item[3] !== undefined ? bigIntToNumber(item[3]) : 0
            // 如果4大于3就取3的，否则取4
            const value = value4 > value3 ? value3 : value4
            return sum + value
        }, 0)
    }
    return num
})

const totalRight = computed(()=>{
    let num = 0
    if(nodesList.value.length > 0){
        num = nodesList.value.reduce((sum: number, item: any[]) => {
            const value = item[3] !== undefined ? bigIntToNumber(item[3]) : 0
            return sum + value
        }, 0)
    }
    return num
})

const progress = computed(()=>{
    let num = 0
    if(totalLeft.value > 0 && totalRight.value > 0){
        num = Math.floor(computedDiv(totalLeft.value, totalRight.value) * 10000) / 100
    }
    return num
})

// 使用 watch 监听 computed 变化并更新 store，避免在 computed 中直接修改导致循环引用
watch(totalLeft, (val) => {
    useStore.totalLeft = val
}, { immediate: true })

watch(totalRight, (val) => {
    useStore.totalRight = val
}, { immediate: true })

watch(progress, (val) => {
    useStore.progress = val
}, { immediate: true })

const godetail = (data:any) => {
    useStore.nodeDetail = data
    routerPush('/detail/index')
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
        border-radius: 10px;
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