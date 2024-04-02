import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import TestList from './components/TestList.vue';
import TestDetail from './components/TestDetail.vue';

const routes = [
 { path: '/', component: TestList },
 { path: '/test/:id', component: TestDetail, props: true }
];

const router = createRouter({
 history: createWebHistory(),
 routes
});

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
