/**
 * keepAlive: true —— 跳转别的页面后，本页面不销毁
 */
import menu from './menu'
import subPage from './subPage'
import Start from '@/views/index.vue'

export default [
    {
        path:'/', // 启动
        component: Start
    },
    ...menu,
    ...subPage
]