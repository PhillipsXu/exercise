import NotFound from '../pages/404.vue';
import Index from '../pages/Index.vue';
import Login from '../pages/Login.vue';

export default [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    { path: '/', component: Index },
    { path: '/login', component: Login }
]