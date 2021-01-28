<template>
  <div class="scorecard">
    <MatchScorecard :matchID="matchID"/> 
  </div>
</template>

<script>

import MatchScorecard from './MatchScorecard.vue'

export default {
  name: 'MatchView',
  components: {
    MatchScorecard
  },
  props: ['matchID']
}
</script>

<style>
</style>
