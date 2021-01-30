<template>
  <div class="back">
  </div>
  <MatchInput :matchID="matchID"/>
  <span class="cardwrap">
    <div class="scorecard">
      <MatchScorecard :matchID="matchID"/> 
    </div>
  </span>
</template>

<script>
import MatchInput from './MatchInput.vue'
import MatchScorecard from './MatchScorecard.vue'

export default {
  name: 'Match',
  components: {
    MatchInput,
    MatchScorecard
  },
  data: function () {
      return {
        matchID: ''
      }
  },
  created() {
    const getID = localStorage.getItem('matchID');
    if (getID) {
      this.matchID = getID;
    } else {
      this.matchID = 'BigTournamentGolf';
    }
  }
}
</script>

<style>
.back {
  position: absolute;
  height: 100%;
  width: 100%;
  left:0;
  right: 0;
  top: 0;
  background-color: #222222;
  z-index: -10;
}
.cardwrap{
  transform: scale(1);
  width: 575px;
  height: 420px;
  position: absolute;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-left: auto;
  border: 5px solid black;
  border-radius: 3px;
}
.scorecard {
  width: 575px;
  height: 420px;
  background-color: #0b3811;
  z-index: -10;
  position: relative;
}
</style>
