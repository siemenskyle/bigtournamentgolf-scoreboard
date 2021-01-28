<template>
  <MatchInput/>
  <div class="scorecard">
    <MatchScorecard matchID="BigTournamentGolf"/> 
  </div>
</template>

<script>
import MatchInput from './MatchInput.vue'
import MatchScorecard from './MatchScorecard.vue'

export default {
  name: 'Match',
  components: {
    MatchInput,
    MatchScorecard
  }
}
</script>

<style scoped>
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
