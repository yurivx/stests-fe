<template>
  <div id="app">
     <router-view></router-view>
  </div>
 </template>

<script>
import TestList from './components/Test/TestList.vue';
import TestDetail from './components/Test/TestDetail.vue';

export default {
  components: {
      TestList,
      TestDetail
  }
}
</script>
