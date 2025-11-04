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

    <!-- <div class="gap130"></div> -->
    <div class="botBar flex jb ac">
        <img src="@/assets/logo.png" class="img50">
        <div class="main size24 font2">© Copyright {{ appName }} All rights reserved.</div>
    </div>
</template>

<script setup lang="ts">
import { useDappStore } from '@/store';
import { storeToRefs } from 'pinia';
import CusLang from '@/components/CusLang/index.vue'
import { appName } from '@/config';

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
.botBar{
    width: 100vw;
    height: 100px;
    border-top: 1px solid $main-color;
    padding: 0 30px;
    background-color: #332a25;
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // z-index: 10;
}
</style>