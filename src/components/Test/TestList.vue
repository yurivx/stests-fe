<template>
  <div class="table-responsive">
    <h1 v-if="tests.length > 0" class="mdc-typography--headline6 centered-header">Тесты</h1>
    <template v-if="tests.length > 0">
      <table class="mdc-data-table__table">
        <tbody class="mdc-data-table__content">
          <tr v-for="test in tests" :key="test.id" class="mdc-data-table__row">
            <td class="mdc-data-table__cell">
              <router-link :to="{ name: 'TestDetail', params: { id: test.id } }" class="mdc-typography--body1">{{ test.name }}</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <p class="mdc-typography--body1 centered-text">Сервис пока недоступен</p>
    </template>
  </div>
</template>

<script>
import axiosInstance from './../../axiosConfig';

export default {
  data() {
    return {
      tests: [],
      error: false
    }
  },
  mounted() {
    axiosInstance.get('/')
      .then(response => {
        this.tests = response.data;
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        this.error = true;
      });
  }
}
</script>

<style>
/* Дополнительные стили для адаптивности */
.mdc-data-table {
  table-layout: fixed;
  width: 100%;
}

.mdc-data-table__cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Стили для ссылки, чтобы она занимала всю ячейку */
.full-cell-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  /* Используйте цвет текста ячейки */
}

/* Стили для отцентрированного заголовка */
.centered-header {
  text-align: center;
}

.centered-text {
  text-align: center;
}
</style>
