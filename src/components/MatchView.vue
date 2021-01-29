<template>
  <div class="scorecard">
    <MatchScorecard :matchID="match"/> 
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
