import axios from 'axios';

// Функция для получения базового URL из переменных окружения
function getApiBaseUrl() {
 // Используйте переменные окружения для определения базового URL
 // Например, для разработки и продакшена
 return process.env.NODE_ENV === 'development'
    ? 'http://localhost:443/'
    : 'http://yurivx-stests-5938.twc1.net:443/';
}

// Создание экземпляра axios с базовым URL
const axiosInstance = axios.create({
 baseURL: getApiBaseUrl(),
});

export default axiosInstance;
