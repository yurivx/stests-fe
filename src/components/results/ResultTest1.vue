<template>
    <div class="points-container text-center">
      <h3 class="mdc-typography--headline5">Сумма: {{ totalPoints }}</h3>
      <h3 class="mdc-typography--headline5">Среднее поинтов: {{ averagePoints.toFixed(2) }}</h3>
      <p class="mdc-typography--body1">{{ phrase }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalPoints: {
        type: Number,
        required: true
      },
      averagePoints: {
        type: Number,
        required: true
      },
      phrase: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .points-container {
    margin-top: 20px;
  }
  </style>
  