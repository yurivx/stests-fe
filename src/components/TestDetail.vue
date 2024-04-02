<template>
    <div>
       <h2>{{ test.name }}</h2>
       <p>{{ test.description }}</p>
    </div>
   </template>
   
   <script>
   export default {
    props: ['id'],
    data() {
       return {
         test: {}
       }
    },
    mounted() {
       this.$axios.get(`http://localhost:8080/test/${this.id}`).then(response => {
         this.test = response.data;
       });
    }
   }
   </script>
   