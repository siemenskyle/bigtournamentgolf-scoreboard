<template>
  <div class="matchInput">
    <div class="players">
      <div class="char p1char">
        <span>Course</span>
        <select class="charsel" v-model="stroke.course">
          <option value="GERMANY">Germany</option>
          <option value="JAPAN">Japan</option>
          <option value="USA">USA</option>
          <option value="AUSTRALIA">Australia</option>
        </select>
      </div>
      <div>
        <input type="checkbox" id="displayScore" v-model="stroke.displayScore">
        <label for="displayScore">Display Score</label>
        <input type="checkbox" id="displayPace" v-model="stroke.displayPace">
        <label for="displayPace">Display Pace</label>
      </div>
    </div>

    <div class="holes front9">
    <template v-for="i in 9" :key="i">
      <div :class="`score h${i}score`">
        <span class="holelbl"> Hole {{ i }}</span>
        <input type="number" :id="`h${i}`" v-model.number="stroke.scores[i-1].score" min="0" max="9" :disabled="holedisabled(i)">
        <button class="quick" :disabled="holedisabled(i)" @click="quickscore(i, -2)">Eagle</button>
        <button class="quick" :disabled="holedisabled(i)" @click="quickscore(i, -1)">Birdie</button>
        <button class="quick" :disabled="holedisabled(i)" @click="quickscore(i, 0)">Par</button>
        <button class="quick" :disabled="holedisabled(i)" @click="quickscore(i, 1)">Bogey</button>
      </div>
    </template>
    </div>

    <div class="holes back9">
    <template v-for="i in 9" :key="i">
      <div :class="`score h${i+9}score`">
        <span class="holelbl"> Hole {{ i+9 }}</span>
        <input type="number" :id="`h${i+9}`" v-model.number="stroke.scores[i+8].score" min="0" max="9" :disabled="holedisabled(i+9)">
        <button class="quick" :disabled="holedisabled(i+9)" @click="quickscore(i+9, -2)">Eagle</button>
        <button class="quick" :disabled="holedisabled(i+9)" @click="quickscore(i+9, -1)">Birdie</button>
        <button class="quick" :disabled="holedisabled(i+9)" @click="quickscore(i+9, 0)">Par</button>
        <button class="quick" :disabled="holedisabled(i+9)" @click="quickscore(i+9, 1)">Bogey</button>
      </div>
    </template>
    </div>

    <!--div>
    <div class="holes front9">
    <template v-for="i in 9" :key="i">
      <div :class="`score h${i}score`">
      <span class="holelbl"> Hole {{ i }}</span>
      <span>
      <input type="radio" :id="`h${i}p1w`" value="1" v-model.number="stroke.scores[i-1].score" v-on:click="holeclick(i, 1)" :disabled="holedisabled(i)">
      <label :for="`h${i}p1w`">P1 Win</label>
      </span>
      <span>
      <input type="radio" :id="`h${i}p2w`" value="2" v-model.number="stroke.scores[i-1].score" v-on:click="holeclick(i, 2)" :disabled="holedisabled(i)">
      <label :for="`h${i}p2w`">P2 Win</label>
      </span>
      <span>  
      <input type="radio" :id="`h${i}draw`" value="3" v-model.number="stroke.scores[i-1].score" v-on:click="holeclick(i, 3)" :disabled="holedisabled(i)">
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
      <input type="radio" :id="`h${i+9}p1w`" value="1" v-model.number="match.scores[i+8].score" v-on:click="holeclick(i+9, 1)" :disabled="holedisabled(i+9)">
      <label :for="`h${i+9}p1w`">P1 Win</label>
      </span>
      <span>
      <input type="radio" :id="`h${i+9}p2w`" value="2" v-model.number="match.scores[i+8].score" v-on:click="holeclick(i+9, 2)" :disabled="holedisabled(i+9)">
      <label :for="`h${i+9}p2w`">P2 Win</label>
      </span>
      <span>  
      <input type="radio" :id="`h${i+9}draw`" value="3" v-model.number="match.scores[i+8].score" v-on:click="holeclick(i+9, 3)" :disabled="holedisabled(i+9)">
      <label :for="`h${i+9}draw`">Draw</label>
      </span>
      </div>
    </template>
    </div-->
    <button id="resetbutton" @mousedown="mousedown" @mouseup="mouseup" class="reset">Hold to Reset</button>
  </div>
</template>

<script>
import fb from "../../firebaseConfig"
import pars from './pars'

var strokeref;
export default {
  name: 'StrokeInput',
  props: {
    strokeID: String
  },
  data: function () {
      return {
        stroke: {
          course: "USA",
          displayScore: true,
          displayPace: true,
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
    quickscore: function(hole, pardiff) {
      var holeindex = hole-1;
      this.stroke.scores[holeindex].score = pars[this.stroke.course][holeindex] + pardiff;
    },
    holedisabled: function(hole) {
      if (hole == 1 || this.stroke.scores[hole-2].score !== 0) {
        return false;
      } 
      return true;
    },
    mousedown: function() {
      this.resetPressed = true;
      document.getElementById('resetbutton').classList.add("active");
      let reset = this.resetScoreboard
      setTimeout(function() {
        if (document.getElementById('resetbutton').classList.contains("active")) {
          reset();
        }
      }, 800);
    },
    mouseup: function() {
      document.getElementById('resetbutton').classList.remove("active");
    },
    resetScoreboard: function() {
      this.stroke.scores = [
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
  },
  created() {
    // Update card in the DB as it changes
    this.$watch( 'stroke', () => {
        let sendMatch = JSON.parse(JSON.stringify(this.stroke));
        sendMatch.scores.forEach( hole => {hole.score = parseInt(hole.score); } );
        fb.database().ref(`strokes/${this.strokeID}`).set(sendMatch);
      },
      {deep: true}
    );
    // Update local storage and fetch from DB with strokeID as it changes
    this.$watch( 'strokeID', () => {
      strokeref.off();
      strokeref = fb.database().ref(`strokes/${this.strokeID}`);
      strokeref.on('value', (snapshot) => {
        let data = snapshot.val();
        if (data) {
          this.stroke.course = data['course'];
          this.stroke.displayScore = data['displayScore'];
          this.stroke.displayPace = data['displayPace'];
          this.stroke.scores = data['scores'];
        } else {
          this.resetScoreboard();
        }
      }); 
    });

    strokeref = fb.database().ref(`strokes/${this.strokeID}`);
    strokeref.on('value', (snapshot) => {
        let data = snapshot.val();
        if (data) {
          this.stroke.course = data['course'];
          this.stroke.displayScore = data['displayScore'];
          this.stroke.displayPace = data['displayPace'];
          this.stroke.scores = data['scores'];
        }
    }); 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  display: inline-block;
  width: 134px;
  text-align: center;
  user-select: none;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 21px;
  margin-right: 6px;
  border: solid 1px #444;
  color: #444;
}
input[type="checkbox"] {
  display:none;   
}
input[type="checkbox"]:checked + label {
  border: solid 1px green;
  background-color: #00660055;
  color: #aaa;
}
input[type="number"] {
  border: solid 1px black;
  background-color: #00000055;
  color: #aaa;
}
input[type="number"]:disabled {
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
button {
  background-color: #333; 
  color: #fff;
  border: solid 1px #444;
}
.reset {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  width: 200px;
  height: 30px;
}
.quick {
  margin-top: 2px;
}
button:disabled {
  filter: blur(1px);
  border: solid 1px #333;
  background-color: #222;
  color: #aaa;
}
button:hover:disabled {
  border: solid 1px #333;
}
button:hover {
  border: solid 1px #888;
}
button:active {
  background-color: rgb(3, 88, 15);
}
button:focus {
  outline: none;
}
</style>
