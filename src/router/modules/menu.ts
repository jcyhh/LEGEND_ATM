import Layout from '@/layout/index.vue'

export default [
    {
        path:'/home',
        component: Layout,
        redirect: '/home/index',
        children:[{
            path:'index',
            component: () => import('@/views/home/index.vue')
        }]
    },
    {
        path:'/detail',
        component: Layout,
        redirect: '/detail/index',
        children:[{
            path:'index',
            component: () => import('@/views/home/detail.vue')
        }]
    },
    {
        path:'/node',
        component: Layout,
        redirect: '/node/index',
        children:[{
            path:'index',
            component: () => import('@/views/node/index.vue')
        }]
    }
]