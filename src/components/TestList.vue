<template>
  <ul>
     <li v-for="test in tests" :key="test.id">
       <router-link :to="'/test/' + test.id">{{ test.name }}</router-link>
     </li>
  </ul>
 </template>
 
 <script>
 import axios from 'axios';
 
 export default {
  data() {
     return {
       tests: []
     }
  },
  mounted() {
     axios.get('http://localhost:8080/').then(response => {
       this.tests = response.data;
     });
  }
 }
 </script>
 