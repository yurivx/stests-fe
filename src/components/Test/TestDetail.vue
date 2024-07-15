<template>
  <div>
    <h3 class="mdc-typography--headline2 text-center">{{ test_name }}</h3>
    <div v-if="!formSubmitted">
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
            <p v-if="remainingQuestions" class="mdc-typography--body2 text-center">Вопрос {{ remainingQuestions }} из {{
      questions.length }}</p>
            <p v-if="!remainingQuestions" class="mdc-typography--body2 text-center">Последний вопрос</p>
          </div>
        </div>
        <div class="navigation-buttons text-center">
          <button type="button" @click="previousQuestion" :disabled="currentQuestion <= 0"
            class="navigation-button mdc-typography--button">Назад</button>
  
          <button v-if="currentQuestion === questions.length - 1" type="submit" class="submit-button mdc-typography--button">Отправить</button>
 
        </div>

      </form>
    </div>
    <div v-else class="points-container text-center">
      <template v-if="id == 1">
        <div>
          <h2 class="mdc-typography--headline4">Улучшение</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ improvement.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ improvement.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Близость</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ closeness.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ closeness.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Преодоление</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ overcoming.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ overcoming.average.toFixed(2) }}</h3>
        </div>
      </template>
      <template v-else-if="id == 2">
        <div>
          <h2 class="mdc-typography--headline4">Отношение к представителям нетрадиционных направлений</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ unconventional.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ unconventional.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Агрессия</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ aggression.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ aggression.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Избегание фемининности</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ femininityAvoidance.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ femininityAvoidance.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Доминирование</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ dominance.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ dominance.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Экстремальная самодостаточность</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ selfSufficiency.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ selfSufficiency.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Рестриктивная эмоциональность</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ restrictiveEmotions.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ restrictiveEmotions.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Нереляционное отношение к сексуальности</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ nonRelationalSex.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ nonRelationalSex.average.toFixed(2) }}</h3>
        </div>
      </template>
      <template v-else-if="id == 3">
        <div>
          <h2 class="mdc-typography--headline4">Снижение стресса</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ stressReduction.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ stressReduction.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Удовольствие</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ pleasure.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ pleasure.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Физическая привлекательность</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ physicalAttractiveness.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ physicalAttractiveness.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Поиск опыта</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ experienceSeeking.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ experienceSeeking.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Ресурсы</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ resources.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ resources.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Социальный статус</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ socialStatus.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ socialStatus.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Месть</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ revenge.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ revenge.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Утилитаризм</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ utilitarianism.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ utilitarianism.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Любовь и обязательства</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ loveCommitment.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ loveCommitment.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Экспрессия</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ expression.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ expression.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Повышение самооценки</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ selfEsteem.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ selfEsteem.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">Долг/Давление</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ dutyPressure.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ dutyPressure.average.toFixed(2) }}</h3>
        </div>
        <div>
          <h2 class="mdc-typography--headline4">"Охрана" партнера</h2>
          <h3 class="mdc-typography--headline6">Сумма: {{ partnerGuarding.total }}</h3>
          <h3 class="mdc-typography--headline6">Среднее: {{ partnerGuarding.average.toFixed(2) }}</h3>
        </div>
      </template>
      <button @click="goBack" class="navigation-button mdc-typography--button">Назад</button>
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
      currentQuestion: 0,
      // Initialization of all sections
      improvement: { total: 0, average: 0 },
      closeness: { total: 0, average: 0 },
      overcoming: { total: 0, average: 0 },
      unconventional: { total: 0, average: 0 },
      aggression: { total: 0, average: 0 },
      femininityAvoidance: { total: 0, average: 0 },
      dominance: { total: 0, average: 0 },
      selfSufficiency: { total: 0, average: 0 },
      restrictiveEmotions: { total: 0, average: 0 },
      nonRelationalSex: { total: 0, average: 0 },
      stressReduction: { total: 0, average: 0 },
      pleasure: { total: 0, average: 0 },
      physicalAttractiveness: { total: 0, average: 0 },
      experienceSeeking: { total: 0, average: 0 },
      resources: { total: 0, average: 0 },
      socialStatus: { total: 0, average: 0 },
      revenge: { total: 0, average: 0 },
      utilitarianism: { total: 0, average: 0 },
      loveCommitment: { total: 0, average: 0 },
      expression: { total: 0, average: 0 },
      selfEsteem: { total: 0, average: 0 },
      dutyPressure: { total: 0, average: 0 },
      partnerGuarding: { total: 0, average: 0 },
      formSubmitted: false
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
      return this.currentQuestion + 1;
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

      setTimeout(() => {
        this.nextQuestion();
      }, 500);
    },
    calculateSectionPoints(sectionQuestions) {
      let total = 0;
      let count = 0;
      for (let questionId in this.answers) {
        if (sectionQuestions.includes(parseInt(questionId, 10))) {
          const answerId = this.answers[questionId];
          if (this.points[answerId] !== undefined) {
            total += this.points[answerId];
            count++;
          }
        }
      }
      return {
        total,
        average: total / count
      };
    },
    calculateTotalAndAveragePoints() {
      if (this.id == 1) {
        this.improvement = this.calculateSectionPoints([2, 6, 8, 10, 14]);
        this.closeness = this.calculateSectionPoints([1, 5, 9, 11, 13]);
        this.overcoming = this.calculateSectionPoints([3, 4, 7, 12, 15]);
      } else if (this.id == 2) {
        this.unconventional = this.calculateSectionPoints([16, 20, 23, 32, 33, 38, 40, 47, 52, 67]);
        this.aggression = this.calculateSectionPoints([25, 49, 50, 54, 57, 60, 63]);
        this.femininityAvoidance = this.calculateSectionPoints([21, 22, 24, 26, 30, 34, 41, 45]);
        this.dominance = this.calculateSectionPoints([17, 18, 36, 37, 59, 64, 66]);
        this.selfSufficiency = this.calculateSectionPoints([19, 27, 28, 29, 42, 44, 51]);
        this.restrictiveEmotions = this.calculateSectionPoints([46, 48, 53, 56, 61, 62, 65, 68]);
        this.nonRelationalSex = this.calculateSectionPoints([31, 35, 39, 43, 55, 58]);
      } else if (this.id == 3) {
        this.stressReduction = this.calculateSectionPoints([69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]);
        this.pleasure = this.calculateSectionPoints([81, 82, 83, 84, 85, 86, 87, 88]);
        this.physicalAttractiveness = this.calculateSectionPoints([89, 90, 91, 92, 93, 94, 95, 96, 97]);
        this.experienceSeeking = this.calculateSectionPoints([98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110]);
        this.resources = this.calculateSectionPoints([111, 112, 113, 114, 115, 116]);
        this.socialStatus = this.calculateSectionPoints([117, 118, 119, 120, 121, 122, 123, 124, 125]);
        this.revenge = this.calculateSectionPoints([126, 127, 128, 129, 130, 131]);
        this.utilitarianism = this.calculateSectionPoints([132, 133, 134, 135, 136, 137, 138, 139]);
        this.loveCommitment = this.calculateSectionPoints([140, 141, 142, 143, 144, 145, 146, 147, 148]);
        this.expression = this.calculateSectionPoints([149, 150, 151, 152, 153, 154, 155]);
        this.selfEsteem = this.calculateSectionPoints([156, 157, 158, 159, 160, 161, 162, 163]);
        this.dutyPressure = this.calculateSectionPoints([164, 165, 166, 167, 168, 169, 170, 171]);
        this.partnerGuarding = this.calculateSectionPoints([172, 173, 174, 175, 176, 177, 178, 179]);
      }
    },
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      }
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },
    submitForm() {
      this.calculateTotalAndAveragePoints();
      this.formSubmitted = true;
    },
    goBack() {
      // this.formSubmitted = false;
      window.location.href = '/'; // Redirect to the main page
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<!-- <style scoped>
.text-center {
  text-align: center;
}
.form-container {
  width: 100%;
}
.question-container {
  margin-bottom: 16px;
}
.options-table {
  width: 100%;
  margin-top: 16px;
}
.option-label {
  padding-left: 8px;
}
.navigation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.navigation-button {
  margin: 0 8px;
}
.submit-container {
  margin-top: 16px;
}
.submit-button {
  margin-top: 16px;
}
.points-container {
  width: 100%;
}
</style> -->

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
