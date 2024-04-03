<template>
  <div class="table-responsive">
     <table class="mdc-data-table__table">
       <thead>
         <tr class="mdc-data-table__header-row">
           <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Отчеты</th>
         </tr>
       </thead>
       <tbody class="mdc-data-table__content">
         <tr v-for="test in tests" :key="test.id" class="mdc-data-table__row">
           <td class="mdc-data-table__cell">
             <router-link :to="{ name: 'ReportDetail', params: { id: test.id } }">{{ test.name }}</router-link>
           </td>
         </tr>
       </tbody>
     </table>
  </div>
 </template>
 
 <script>
 import axiosInstance from './../../axiosConfig'; 
 
 export default {
  data() {
       return {
           tests: []
       }
  },
  mounted() {
     axiosInstance.get('/').then(response => {
           this.tests = response.data;
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
  color: inherit; /* Используйте цвет текста ячейки */
 }
 
 /* Стили для отцентрированного заголовка */
 .centered-header {
  text-align: center;
 }
 </style>
 