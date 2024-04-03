<template>
  <div id="app">
     <router-view></router-view>
  </div>
 </template>

<script>
import TestList from './components/TestList.vue';
import TestDetail from './components/TestDetail.vue';

export default {
  components: {
      TestList,
      TestDetail
  }
}
</script>
