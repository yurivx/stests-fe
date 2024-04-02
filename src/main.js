import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Убедитесь, что путь к файлу router.js правильный

createApp(App).use(router).mount('#app');
