<template>
  <div class="matchInput">
    <div class="players">
      <div class="char p1char">
        <span>
          Player 1
          <input class="name" v-model="match.p1Name" placeholder="Name">
        </span>
        <select class="charsel" v-model="match.p1Char">
          <option disabled value="e.png">Character</option>
          <option value="YOUNGHERO.gif">🇺🇸 Young Hero</option>
          <option value="TECHNITIAN.gif">🇬🇧 Technitian</option>
          <option value="VETERAN.gif">🇦🇺 Veteran</option>
          <option value="SHOTMAKER.gif">🇩🇪 Shot Maker</option>
          <option value="POWERGOLFER.gif">🇧🇷 Power Golfer</option>
          <option value="PUTTMASTER.gif">🇯🇵 Putt Master</option>
        </select>
      </div>
      <div class="char p2char">
        <span>
          Player 2
          <input class="name" v-model="match.p2Name" placeholder="Name">
        </span>
        <select class="charsel" v-model="match.p2Char">
          <option disabled value="e.png">Character</option>
          <option value="YOUNGHERO.gif">🇺🇸 Young Hero</option>
          <option value="TECHNITIAN.gif">🇬🇧 Technitian</option>
          <option value="VETERAN.gif">🇦🇺 Veteran</option>
          <option value="SHOTMAKER.gif">🇩🇪 Shot Maker</option>
          <option value="POWERGOLFER.gif">🇧🇷 Power Golfer</option>
          <option value="PUTTMASTER.gif">🇯🇵 Putt Master</option>
        </select>
      </div>
    </div>

    <div class="holes front9">
    <template v-for="i in 9" :key="i">
      <div :class="`score h${i}score`">
      <span class="holelbl"> Hole {{ i }}</span>
      <span>
      <input type="radio" :id="`h${i}p1w`" value="1" v-model="match.scores[i-1].score" v-on:click="holeclick(i, 1)" :disabled="holedisabled(i)">
      <label :for="`h${i}p1w`">P1 Win</label>
      </span>
      <span>
      <input type="radio" :id="`h${i}p2w`" value="2" v-model="match.scores[i-1].score" v-on:click="holeclick(i, 2)" :disabled="holedisabled(i)">
      <label :for="`h${i}p2w`">P2 Win</label>
      </span>
      <span>  
      <input type="radio" :id="`h${i}draw`" value="3" v-model="match.scores[i-1].score" v-on:click="holeclick(i, 3)" :disabled="holedisabled(i)">
      <label :for="`h${i}draw`">Draw</label>
      </span>
      </div>
    </template>
    </div>
    <div class="holes back9">
    <template v-for="i in 9" :key="i">
      <div :class="`score h${i+9}score`">
      <span class="holelbl"> Hole {{ i+9 }}</span>
      <span>
      <input type="radio" :id="`h${i+9}p1w`" value="1" v-model="match.scores[i+8].score" v-on:click="holeclick(i+9, 1)" :disabled="holedisabled(i+9)">
      <label :for="`h${i+9}p1w`">P1 Win</label>
      </span>
      <span>
      <input type="radio" :id="`h${i+9}p2w`" value="2" v-model="match.scores[i+8].score" v-on:click="holeclick(i+9, 2)" :disabled="holedisabled(i+9)">
      <label :for="`h${i+9}p2w`">P2 Win</label>
      </span>
      <span>  
      <input type="radio" :id="`h${i+9}draw`" value="3" v-model="match.scores[i+8].score" v-on:click="holeclick(i+9, 3)" :disabled="holedisabled(i+9)">
      <label :for="`h${i+9}draw`">Draw</label>
      </span>
      </div>
    </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchInput',
  data: function () {
      return {
        matchId: "BigTournamentGolf",
        match: {
          p1Name: 'bigthecat',
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
  },
  methods: {
    holeclick: function(hole, clicked) {
      const score = this.match.scores[hole-1].score;
      if ( score == clicked && (hole === 18 || this.match.scores[hole].score == 0) ) {
        this.match.scores[hole-1].score = 0;
      }
    },
    holedisabled: function(hole) {
      if (hole == 1 || this.match.scores[hole-2].score !== 0) {
        return false;
      } 
      return true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  display: inline-block;
  width: 60px;
  text-align: center;
  margin-top: 3px;
  border: solid 1px #444;
  color: #444;
  user-select: none;
}
input[type="radio"] {
  display:none;   
}
input[type="radio"]:checked + label {
  border: solid 1px green;
  background-color: #00660055;
  color: #aaa;
}
input[type="radio"]:disabled + label {
  filter: blur(1px);
  border: solid 1px #333;
  color: #333;
}
input {
  font-size: 100%;
  vertical-align: baseline;
  border: 0;
  outline: 0;
  color: #fff;
}
option {
  background-color: #333; 
}
.name {
  display: block;
  width: 250px;
  margin: 0 0 10px;
  padding: 8px 12px 10px 12px;
  border: 1px solid rgba(0,0,0,.5);
  background: rgba(0,0,0,.25);
}
.char {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
}
.charsel{
  margin: 0 0 8px;
  padding: 8px 12px 10px 12px;
  border: 1px solid rgba(0,0,0,.5);
  background: rgba(0,0,0,.25);
  color: #fff;
}
.players {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.holes {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.holelbl{
  font-size: 16px;
}
.score {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
.matchInput {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
