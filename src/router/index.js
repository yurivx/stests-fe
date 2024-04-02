import { createRouter, createWebHistory } from 'vue-router';
import TestList from './../components/TestList.vue';

const routes = [
    {
        path: '/',
        name: 'TestList',
        component: TestList
    },
    {
        path: '/test/:id',
        name: 'TestDetail',
        component: TestDetail,
        props: true, // Это позволит передавать параметры маршрута как props в компонент
     },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

