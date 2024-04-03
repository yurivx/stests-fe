<template>
  <div v-if="testResult" class="mdc-data-table">
    <h2 class="mdc-typography--headline6">{{ testResult.test_name }}</h2>
    <table class="mdc-data-table__table">
      <thead>
        <tr class="mdc-data-table__header-row">
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Вопрос</th>
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Ответ</th>
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Количество</th>
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">
        <template v-for="(question, index) in testResult.questions" :key="question.question_id">
          <tr class="mdc-data-table__row highlight">
            <td class="mdc-data-table__cell">{{ question.question_text }}</td>
          </tr>
          <tr v-for="answer in question.answers" :key="answer.answer_id" class="mdc-data-table__row">
            <td class="mdc-data-table__cell"></td> <!-- Пустое место для текста вопроса -->
            <td class="mdc-data-table__cell">{{ answer.answer_text }}</td>
            <td class="mdc-data-table__cell">{{ answer.count }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import axiosInstance from './../../axiosConfig';

export default {
  props: ['id'],
  data() {
    return {
      testResult: null,
    };
  },
  methods: {
    fetchData() {
      axiosInstance.get(`/report/${this.id}`)
        .then(response => {
          this.testResult = response.data;
          console.log(this.testResult);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
}

.highlight {
  background-color: #e0f7fa; /* Light blue */
}
</style>
