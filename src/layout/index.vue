<template>
    <div class="head headGlass flex jb ac">

        <img src="@/assets/layout/logo.png" class="logo">

        <div class="flex ac">
            <div class="connect mr20 flex ac size24 font2">
                <img src="@/assets/bsc.png" class="bsc mr10">
                <span v-init:address="address" v-if="address"></span>
                <span v-else>{{ '链接钱包' }}</span>
            </div>
            <!-- <Menu></Menu> -->
            <CusLang></CusLang>
        </div>
        
    </div>

    <div class="gap100"></div>

    <RouterView></RouterView>
</template>

<script setup lang="ts">
import { useDappStore } from '@/store';
import { storeToRefs } from 'pinia';
import CusLang from '@/components/CusLang/index.vue'

const useStore = useDappStore()
const { address } = storeToRefs(useStore)
</script>

<style lang="scss" scoped>
.headGlass{
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
.headBg{
    background-color: #000000;
}
.head {
    width: 100vw;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 30px;
    z-index: 100;

    .logo{
        height: 50px;
        width: auto;
    }

    .bsc{
        width: 30px;
        height: auto;
    }

    .connect{
        height: 52px;
        border-radius: 26px;
        padding: 0 20px;
        line-height: 52px;
        background-color: rgba($main-color, $alpha: 0.1);
        border: 1px solid $main-color;
    }
}
</style>