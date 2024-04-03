import { createRouter, createWebHistory } from 'vue-router';
import TestList from './../components/Test/TestList.vue';
import TestDetail from './../components/Test/TestDetail.vue';
import ReportList from './../components/Report/ReportList.vue';
import ReportDetail from './../components/Report/ReportDetail.vue';

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
     {
        path: '/report',
        name: 'ReportList',
        component: ReportList
    },
    {
        path: '/report/:id',
        name: 'ReportDetail',
        component: ReportDetail,
        props: true, // Это позволит передавать параметры маршрута как props в компонент
     },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

