<template>
  <div>
    <h3 class="mdc-typography--headline3 text-center">{{ test_name }}</h3>
    <p class="mdc-typography--headline6">{{ test_description }}</p>
    <form @submit.prevent="submitForm" class="form-container">
      <div v-if="questions.length > 0" class="question-container">
        <div v-if="currentQuestionData">
          <h2 class="mdc-typography--headline5 question-text text-center">{{ currentQuestionData.text }}</h2>
          <table class="options-table">
            <tbody>
              <tr v-for="(option, idx) in currentQuestionData.options" :key="idx">
                <td>
                  <input type="radio" :id="`question-${currentQuestionData.question_id}-${option.answer_id}`"
                    :name="`question-${currentQuestionData.question_id}`" :value="option.answer_id"
                    @change="updateAnswer($event, currentQuestionData.question_id, option.point)"
                    v-model="answers[currentQuestionData.question_id]" />
                </td>
                <td>
                  <label :for="`question-${currentQuestionData.question_id}-${option.answer_id}`"
                    class="option-label mdc-typography--body1">{{ option.value }}</label>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="remainingQuestions" class="mdc-typography--body2 text-center">Осталось {{ remainingQuestions }} из {{
      questions.length }}</p>
          <p v-if="!remainingQuestions" class="mdc-typography--body2 text-center">Последний вопрос</p>
        </div>
      </div>
      <div class="navigation-buttons text-center">
        <button type="button" @click="previousQuestion" :disabled="currentQuestion <= 0"
          class="navigation-button mdc-typography--button">&#8592;</button>
        <button type="button" @click="nextQuestion" :disabled="currentQuestion === questions.length - 1"
          class="navigation-button mdc-typography--button">&#8594;</button>
      </div>
      <div class="submit-container text-center" v-if="currentQuestion === questions.length - 1">
        <button type="submit" class="submit-button mdc-typography--button">Отправить</button>
      </div>
    </form>
    <div v-if="totalPoints !== null && averagePoints !== null" class="points-container text-center">
      <h3 class="mdc-typography--headline5">Сумма: {{ totalPoints }}</h3>
      <h3 class="mdc-typography--headline5">Среднее: {{ averagePoints.toFixed(2) }}</h3>
      <p class="mdc-typography--body1">{{ phrase }}</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from './../../axiosConfig';

export default {
  props: ['id'], // Получаем id из параметров маршрута
  data() {
    return {
      questions: [],
      answers: {},
      test_name: '',
      test_description: '',
      points: {},
      totalPoints: null,
      averagePoints: null,
      phrase: '',
      currentQuestion: 0
    };
  },
  computed: {
    currentQuestionData() {
      if (this.questions.length > 0) {
        return this.questions[this.currentQuestion];
      }
      return null;
    },
    remainingQuestions() {
      return this.questions.length - this.currentQuestion - 1;
    }
  },
  methods: {
    fetchData() {
      axiosInstance.get(`/test/${this.id}`)
        .then(response => {
          this.test_name = response.data[0].name;
          this.test_description = response.data[0].description;
          this.questions = response.data[0].questions;
          this.questions.forEach(question => {
            if (!this.answers[question.question_id]) {
              this.answers[question.question_id] = null;
            }
            question.options.forEach(option => {
              this.points[option.answer_id] = option.point;
            });
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateAnswer(event, questionId, point) {
      this.answers = {
        ...this.answers,
        [questionId]: event.target.value
      };
      this.points = {
        ...this.points,
        [event.target.value]: point
      };
    },
    calculateTotalAndAveragePoints() {
      let total = 0;
      let count = 0;
      for (let questionId in this.answers) {
        const answerId = this.answers[questionId];
        if (this.points[answerId] !== undefined) {
          total += this.points[answerId];
          count++;
        }
      }
      const average = total / count;
      let phrase = '';
      if (average >= 8) {
        phrase = 'Отличный результат!';
      } else if (average >= 5) {
        phrase = 'Хороший результат!';
      } else {
        phrase = 'Есть куда расти.';
      }
      return { total, average, phrase };
    },
    submitForm() {
      const dataToSend = {
        test_id: parseInt(this.id, 10),
        answers: Object.keys(this.answers).map(questionId => ({
          question_id: parseInt(questionId, 10),
          answer_id: parseInt(this.answers[questionId], 10)
        }))
      };
      axiosInstance.post('/submit', dataToSend)
        .then(response => {
          console.log('Данные успешно отправлены:', response.data);
          const { total, average, phrase } = this.calculateTotalAndAveragePoints();
          this.totalPoints = total;
          this.averagePoints = average;
          this.phrase = phrase;
        })
        .catch(error => {
          console.error('Ошибка при отправке данных:', error);
        });
    },
    previousQuestion() {
      this.currentQuestion--;
    },
    nextQuestion() {
      this.currentQuestion++;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
.form-container {
  margin-left: 20px;
  /* Отступ слева */
}

.question-container {
  margin-bottom: 20px;
}

.question-text {
  font-size: 20px;
  margin-bottom: 10px;
}

.options-table {
  border-collapse: collapse;
}

.options-table td {
  padding: 5px;
}

.option-label {
  font-size: 16px;
  text-align: left;
  /* Выравниваем по левому краю */
}

.submit-button,
.navigation-button {
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px;
}

.submit-button {
  background-color: #6dc498;
  /* Зеленый цвет */
  color: #fff;
}

.navigation-button {
  background-color: #6dc498;
  color: #fff;
}

.submit-button:hover,
.navigation-button:hover {
  background-color: #96ace8;
}

.navigation-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-container {
  margin-top: 20px;
}

.points-container {
  margin-top: 20px;
}
</style>
