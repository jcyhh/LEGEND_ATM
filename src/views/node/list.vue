<template>
    <van-list class="list" v-bind="props">
        <div class="card mb20" v-for="(item,index) in list" :key="index">
            <div class="flex jb ac">
                <div v-init:address="item.address"></div>
                <div class="size30 font2 main" v-init="item.kpi"></div>
            </div>
            <div class="flex jb ac mt20 gray size24">
                <div>{{ $t('地址') }}</div>
                <div>{{ $t('金额') }}</div>
            </div>
        </div>
        <CusEmpty></CusEmpty>
    </van-list>
</template>

<script setup lang="ts">
import CusEmpty from '@/components/CusEmpty/index.vue'
import { getAddress } from '@/config/storage';
import { useLoadList } from '@/hooks/useLoadList';
import { computed } from 'vue';

const address = getAddress()
const params = computed(() => ({
    address
}))

const { list, props, loadList } = useLoadList('/api/users/referrals', 'referrals', params)
loadList()
</script>

<style lang="scss" scoped>
.card{
    border-radius: 20px;
    border: 1px solid rgba($main-color, $alpha: 0.3);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 30px 20px;
}
</style>