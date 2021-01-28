<template>
  <div class="matchInput">
    <select v-model="match.p1Char">
      <option disabled value="e.png">Please select one</option>
      <option value="PUTTMASTER.gif">PUTTMASTER</option>
      <option value="VETERAN.gif">VETERAN</option>
      <option value="SHOTMAKER.gif">SHOTMAKER</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MatchInput',
  data: function () {
      return {
        matchId: "BigTournamentGolf",
        match: {
          p1Name: '',
          p2Name: '',
          p1Char: 'e.png',
          p2Char: 'e.png',
          up: 0,
          lastHole: 0,
          scores: [
              {hole: 1, score: 0},
              {hole: 2, score: 0},
              {hole: 3, score: 0},
              {hole: 4, score: 0},
              {hole: 5, score: 0},
              {hole: 6, score: 0},
              {hole: 7, score: 0},
              {hole: 8, score: 0},
              {hole: 9, score: 0},
              {hole: 10, score: 0},
              {hole: 11, score: 0},
              {hole: 12, score: 0},
              {hole: 13, score: 0},
              {hole: 14, score: 0},
              {hole: 15, score: 0},
              {hole: 16, score: 0},
              {hole: 17, score: 0},
              {hole: 18, score: 0},
            ]
        }
      };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
