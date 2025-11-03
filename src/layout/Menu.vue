<template>
    <img src="@/assets/layout/menu.png" class="img38" @click="show=true">

    <van-popup v-model:show="show" style="background-color: transparent !important;" position="right" overlay-class="cusMask" teleport="#app">
        <div class="pop">
            <div class="flex jb ac mb20">
                <div class="flex ac">
                    <img src="@/assets/logo.png" class="img52 mr16">
                    <div class="size32 bold fontP">{{ appName }}</div>
                </div>
                <van-icon name="cross" :size="30" @click="show=false" />
            </div>
            <div class="line mt46 mb25"></div>
            <div class="pt25 pb25 flex jb ac" v-for="item in menus" @click="jump(item.path)">
                <div class="flex ac">
                    <div class="size28">{{ item.name }}</div>
                </div>
                <van-icon name="arrow" color="#999999" />
            </div>
            <div class="pt25 pb25 flex jb ac" @click="showLangs=!showLangs">
                <div class="flex ac">
                    <div class="size28">语言</div>
                </div>
                <van-icon :name="showLangs?'arrow-down':'arrow-up'" color="#999999" />
            </div>
            <div v-if="showLangs">
                <div class="pt25 pb25 pl30 size28" :class="lang==item.lang?'main':''" v-for="(item,index) in langs" :key="index" @click="onChange(index)">{{ item.name }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { appName } from '@/config';
import { t } from '@/locale';
import { routerReplace } from '@/router';
import { computed, ref, watch } from 'vue';
import { langs } from '@/locale'
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia';

const emits = defineEmits(['change'])

const showLangs = ref(false)

const useStore = useAppStore()
const { lang } = storeToRefs(useStore)

const onChange = (index: number) => {
    useStore.setLocale(langs[index].lang)
}

const show = ref(false)

const menus = computed(()=>([
    {name:t('首页'), path:'/home/index'},
    {name:t('我的节点'), path:'/node/index'}
]))

const jump = (path:string) => {
    if(path){
        routerReplace(path)
        show.value = false
    }
}

watch(show, val => {
    if(val)emits('change', val)
    else setTimeout(() => emits('change', val), 300);
})
</script>

<style lang="scss" scoped>
.pop{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    position: relative;
    padding: 58px 30px 0 30px;
    .line{
        height: 1px;
        background-color: #FFFFFF33;
    }
}
</style>