<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="scorecard">
      <MatchPlay matchID="BigTournamentGolf"/> 
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MatchPlay from './components/MatchPlay.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    MatchPlay
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.scorecard {
  width: 575px;
  height: 600px;
  position: absolute;
  margin-right: auto;
  margin-left: auto;
  right: 0;
  left: 0;
}
</style>
