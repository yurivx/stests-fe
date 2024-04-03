<template>
  <div>
    <div v-if="length(testResul) > 0" id="test-result" class="mdc-data-table">
      <h3 class="mdc-typography--headline3 text-center">{{ testResult.test_name }}</h3>
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
    <div v-if="length(testResul) == 0" class="text-center">
      <p class="mdc-typography--body1">Пока нет данных</p>
    </div>
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
  background-color: #e0f7fa;
  /* Light blue */
}
</style>
