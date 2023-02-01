import { createRouter, createWebHistory } from "vue-router";
import ChineseInfo from '@/pages/Chinese/ChineseInfo.vue';
import ForeignInfo from '@/pages/Foreign/ForeignInfo.vue';

const routerHistory = createWebHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/chinese'
        },
        {
            path: '/chinese',
            name: 'Chinese',
            component: ChineseInfo
        },
        {
            path: '/foreign',
            name: 'Foreign',
            component: ForeignInfo
        }
    ]
})

export default router;