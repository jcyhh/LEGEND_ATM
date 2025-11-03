<template>
    <VanPopup v-model:show="show" style="background: transparent;" :destroy-on-close="true" position="bottom" overlay-class="cusMask" teleport="#app">
        <div class="pt2 pr2 pb2 pl2">
            <div class="picker glass">
                <div class="flex jb ac mb30">
                    <div class="size32 bold">{{ title }}</div>
                    <van-icon size="25" name="cross" color="#999999" @click="close" />
                </div>
                <div class="pickerLine mb30"></div>
                <CusEmpty v-if="list.length==0"></CusEmpty>
                <div v-else>
                    <swiper slidesPerView="auto" :centeredSlides="true" direction="vertical" space-between="10" @swiper="onSwiper" @slide-change="slideChange">
                        <swiper-slide v-for="(item, index) in list" :key="index" @click="slideClick(index)">
                            <div class="fontP">{{ item[name] }}</div>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="mt60">
                    <div class="mainBtn size30" v-scale v-delay="{fun:submit}">{{ submitTxt }}</div>
                </div>
                <div class="safeBottom"></div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import CusEmpty from '@/components/CusEmpty/index.vue';
import { t } from '@/locale';
import { Swiper, SwiperSlide } from 'swiper/vue';
// @ts-ignore
// https://swiperjs.com/demos
import 'swiper/css';

const emit = defineEmits(['change'])
defineProps({
    list: { // 列表
        type: Array as PropType<any[]>,
        default: ():any[] => []
    },
    title: { // 标题
        type: String,
        default: t('请选择')
    },
    name: { // 显示字段
        type: String,
        default: 'name'
    },
    submitTxt: { // 确认按钮文字
        type: String,
        default: t('确定')
    }
})

const show = ref(false)
const open = async (index:number) => {
    show.value = true
    current.value = index
}
const close = () => show.value = false

const current = ref(0)
const mySwiper = ref()
const onSwiper = (swiper: any) => {
    mySwiper.value = swiper
    mySwiper.value.slideTo(current.value)
}
const slideChange = (data: any) => current.value = data.activeIndex

const slideClick = (index:number) => mySwiper.value.slideTo(index)

const submit = ()=> {
    close()
    emit('change', current.value)
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.picker{
    background: #0a0a0a;
    position: relative;
    border-radius: 40px 40px 0 0;
    padding: 40px;
    &::before{
        content: '';
        position: absolute;
        z-index: -1;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: 40px 40px 0 0;
        background: linear-gradient($main-color, RGBA(246, 194, 69, 0));
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: xor;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        padding: 1px;
    }
    .pickerLine{
        width: 100%;
        height: 1px;
        background-color: #FFFFFF1A;
    }
    .swiper {
        width: 670px;
        height: 500px;
    }

    .swiper-slide {
        width: 670px;
        height: 80px;
        border-radius: 20px;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        opacity: 0.5;
    }

    .swiper-slide-active {
        font-size: 36px;
        opacity: 1;
        background: linear-gradient(to right, RGBA(246, 194, 69, 0), RGBA(246, 194, 69, 0.1), RGBA(246, 194, 69, 0));
        position: relative;
        &::before{
            content: '';
            position: absolute;
            z-index: -1;
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
            background: linear-gradient(to right, RGBA(246, 194, 69, 0), RGBA(246, 194, 69, 1), RGBA(246, 194, 69, 0));
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            padding: 1px;
        }
    }
}
</style>