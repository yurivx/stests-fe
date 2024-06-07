<template>
    <div>
      <h3>Default Result</h3>
      <p>Total Points: {{ totalPoints }}</p>
      <p>Average Points: {{ averagePoints }}</p>
      <p>{{ phrase }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalPoints: Number,
      averagePoints: Number,
      phrase: String
    }
  };
  </script>
  