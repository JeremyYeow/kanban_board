<template>
  <div id="app">
    <TaskAdder></TaskAdder>
    <TaskList></TaskList>
  </div>
</template>

<script>
import TaskAdder from './components/TaskAdder.vue';
import TaskList from './components/TaskList.vue';

export default {
  name: 'App',
  components: {
    TaskAdder,
    TaskList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: whitesmoke;
}
</style>
