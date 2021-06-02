<template>
  <div class="matchInput">
    <div class="players">
      <div class="char p1char">
        <span>
          Player 1
          <input class="name" v-model.lazy="match.p1Name" placeholder="Name">
        </span>
        <span class="dropdowns">
          <Dropdown v-model="match.p1Char" :options="chars" optionLabel="name" optionValue="value" placeholder="Character" :showClear="true" class="select charsel" scrollHeight="250px" modelValue="asdf">
            <template #option="slotProps">
              <div class="country-item">
                <country-flag :country="slotProps.option.flag" class="flag" />
                <div>{{slotProps.option.name}}</div>
              </div>
            </template>
          </Dropdown>
          <Dropdown v-model="match.p1Country" :options="countries" optionLabel="name" optionValue="code" :filter="true" placeholder="Flag" :showClear="true" class="select countrysel">
            <template #value="slotProps">
              <div class="country-item country-item-value" v-if="slotProps.value">
                <country-flag :country="slotProps.value"  class="flag" />
              </div>
              <span v-else>
                {{slotProps.placeholder}}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <country-flag :country="slotProps.option.code" class="flag" />
                <div>{{slotProps.option.name}}</div>
              </div>
            </template>
          </Dropdown>
        </span>
      </div>

      <button id="swap" class="swap"  @click="swapplayers()"> ← Swap → </button>

      <div class="char p2char">
        <span>
          Player 2
          <input class="name" v-model.lazy="match.p2Name" placeholder="Name">
        </span>
        <span class="dropdowns">
          <Dropdown v-model="match.p2Char" :options="chars" optionLabel="name" optionValue="value" placeholder="Character" :showClear="true" class="select charsel" scrollHeight="250px">
            <template #option="slotProps">
              <div class="country-item">
                <country-flag :country="slotProps.option.flag" class="flag" />
                <div>{{slotProps.option.name}}</div>
              </div>
            </template>
          </Dropdown>
          <Dropdown v-model="match.p2Country" :options="countries" optionLabel="name" optionValue="code" :filter="true" placeholder="Flag" :showClear="true" class="select countrysel">
            <template #value="slotProps">
              <div class="country-item country-item-value" v-if="slotProps.value">
                <country-flag :country="slotProps.value"  class="flag" />
              </div>
              <span v-else>
                {{slotProps.placeholder}}
              </span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <country-flag :country="slotProps.option.code" class="flag" />
                <div>{{slotProps.option.name}}</div>
              </div>
            </template>
          </Dropdown>
        </span>
      </div>
    </div>

    <div class="holes front9">
    <template v-for="i in 9" :key="i">
      <div :class="`score h${i}score`">
      <span class="holelbl"> Hole {{ i }}</span>
      <span>
      <input type="radio" :id="`h${i}p1w`" value="1" v-model.number="match.scores[i-1].score" v-on:click="holeclick(i, 1)" :disabled="holedisabled(i)">
      <label :for="`h${i}p1w`">P1 Win</label>
      </span>
      <span>
      <input type="radio" :id="`h${i}p2w`" value="2" v-model.number="match.scores[i-1].score" v-on:click="holeclick(i, 2)" :disabled="holedisabled(i)">
      <label :for="`h${i}p2w`">P2 Win</label>
      </span>
      <span>  
      <input type="radio" :id="`h${i}draw`" value="3" v-model.number="match.scores[i-1].score" v-on:click="holeclick(i, 3)" :disabled="holedisabled(i)">
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
    </div>

    <button id="resetbutton" @mousedown="mousedown" @mouseup="mouseup" class="reset">Hold to Reset</button>
  </div>
</template>

<script>
import fb from "../../firebaseConfig";
import isoCountries from './countries';
import chars from './chars';
import Dropdown from 'primevue/dropdown/sfc';
import CountryFlag from 'vue-country-flag-next';

var matchref;
export default {
  name: 'MatchInput',
  components: {
    Dropdown,
    CountryFlag,
  },
  props: {
    matchID: String
  },
  data: function () {
      return {
        countries: isoCountries,
        chars: chars,
        match: {
          p1Name: '',
          p2Name: '',
          p1Char: null,
          p2Char: null,
          p1Country: null,
          p2Country: null,
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
    swapplayers: function() {
      var tmp = this.match.p1Name;
      this.match.p1Name = this.match.p2Name;
      this.match.p2Name = tmp;

      tmp = this.match.p1Char;
      this.match.p1Char = this.match.p2Char;
      this.match.p2Char = tmp;

      tmp = this.match.p1Country;
      this.match.p1Country = this.match.p2Country;
      this.match.p2Country = tmp;
    },
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
      this.match = {
        p1Name: '',
        p2Name: '',
        p1Char: null,
        p2Char: null,
        p1Country: null,
        p2Country: null,
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
    }
  },
  created() {
    // Watch for score changes and update up and lastHole
    this.$watch( () => this.match.scores, () => {
        let up = 0;
        let lastHole = 0;
        this.match.scores.forEach( hole => {
          switch (parseInt(hole.score)) {
            case 1:
              up += 1;
              lastHole = hole.hole;
              break;
            case 2:
              up -= 1;
              lastHole = hole.hole;
              break;
            case 3:
              lastHole = hole.hole;
              break;
          }
        });
        this.match.up = up;
        this.match.lastHole = lastHole;
      }, 
      {deep: true}
    );
    // Update match in the DB as it changes
    this.$watch( 'match', () => {
        let sendMatch = JSON.parse(JSON.stringify(this.match));
        sendMatch.scores.forEach( hole => {hole.score = parseInt(hole.score); } );
        fb.database().ref(`matches/${this.matchID}`).set(sendMatch);
      },
      {deep: true}
    );
    // Update local storage and fetch from DB with matchID as it changes
    this.$watch( 'matchID', () => {
      matchref.off();
      matchref = fb.database().ref(`matches/${this.matchID}`);
      matchref.on('value', (snapshot) => {
        let data = snapshot.val();
        if (data) {
          this.match.p1Name = data['p1Name'];
          this.match.p2Name = data['p2Name'];
          this.match.p1Char = data['p1Char'];
          this.match.p2Char = data['p2Char'];
          this.match.p1Country = data['p1Country'];
          this.match.p2Country = data['p2Country'];
          this.match.up = data['up'];
          this.match.lastHole = data['lastHole'];
          this.match.scores = data['scores'];
        } else {
          this.resetScoreboard();
        }
      }); 
    });

    matchref = fb.database().ref(`matches/${this.matchID}`);
    matchref.on('value', (snapshot) => {
        let data = snapshot.val();
        if (data) {
          this.match.p1Name = data['p1Name'];
          this.match.p2Name = data['p2Name'];
          this.match.p1Char = data['p1Char'];
          this.match.p2Char = data['p2Char'];
          this.match.p1Country = data['p1Country'];
          this.match.p2Country = data['p2Country'];
          this.match.up = data['up'];
          this.match.lastHole = data['lastHole'];
          this.match.scores = data['scores'];
        }
    }); 
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
  width: 100%;
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
  width: 305px;
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
.swap {
  height: 30px;
  margin-top: 45px;
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
.country-item {
  display: flex;
  flex-direction: row;
}
.flag {
  margin-right: 1px;
}
.countrysel {
  width: 110px;
  margin-left: 4px;
}
.dropdowns {
  display: flex;
  flex-direction: row;
}
.select {
  height: 38px;
  margin-bottom: 8px;
  border: 1px solid rgba(0,0,0,.5);
  background: rgba(0,0,0,.25);
  color: #fff;
}
.charsel {
  width: 100%;
}
</style>

<style>

.p-dropdown-clear-icon {
  right: 0.375em !important;
}
.p-dropdown-trigger {
  display: none !important;
}
</style>