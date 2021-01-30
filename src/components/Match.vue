<template>
  <div class="back">
  </div>
  <div class="container">
  <MatchInput :matchID="matchID"/>
  <span class="cardwrap">
    <div class="scorecard">
      <MatchScorecard :matchID="matchID"/> 
    </div>
  </span>
  <span class="matchid">
    <span>
    Match ID:
    <input v-model="inputMatchID">
    </span>
    <span class="err">{{ errormsg() }}</span>
    <span class="buttons">
      <button class="btn" @click="generateID()">Generate ID</button>
      <button class="btn" @click="resetID()" :disabled="resetdisabled()">Reset</button>
      <button class="btn" @click="changeID()" :disabled="changedisabled()">Change ID</button>
    </span>
  </span>
  <span class="overlayinfo">
  <span>
    URL For Overlay:
    <input class="overlayurl" :value="overlayURL()" disabled="true">
  </span>
  <p> Reccomended size: 575 width, 420 height </p>
  </span>
  </div>
</template>

<script>
import MatchInput from './MatchInput.vue'
import MatchScorecard from './MatchScorecard.vue'

const randomWords = require('random-words');
const alphanumeric = /^[0-9a-zA-Z]+$/;
export default {
  name: 'Match',
  components: {
    MatchInput,
    MatchScorecard
  },
  data: function () {
      return {
        inputMatchID: '',
        matchID: ''
      }
  },
  methods: {
    randomID: function() {
      const fmter = function(word) {
        if (word.length < 5) {
          return randomWords({exactly: 1, formatter: fmter});
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      };
      return randomWords({exactly: 3, join: '', formatter: fmter});
    },
    errormsg: function() {
      if (!this.inputMatchID.match(alphanumeric)){
        return 'Alpha-numeric Characters Only';
      }
      if (this.inputMatchID.length < 15){
        return 'Not Long Enough';
      }
      return '';
    },
    validID: function () {
      return (this.inputMatchID != this.matchID) && (this.errormsg == '')
    },
    overlayURL: function() {
      return window.location.origin + '/match/' + this.matchID;
    },
    resetdisabled: function() {
      return this.inputMatchID == this.matchID;
    },
    changedisabled: function() {
      return (this.inputMatchID === this.matchID) || (this.errormsg() !== '');
    },
    generateID: function() {
      this.inputMatchID = this.randomID();
    },
    resetID: function() {
      this.inputMatchID = this.matchID;
    },
    changeID: function() {
      this.matchID = this.inputMatchID;
    }
  },
  created() {
    const getID = localStorage.getItem('matchID');
    if (getID) {
      this.matchID = getID;
    } else {
      this.matchID = this.randomID();
    }
    this.inputMatchID = this.matchID;
  }
}
</script>

<style scoped>
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
  user-select: none;
  transform: scale(1);
  width: 575px;
  height: 420px;
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
.matchid{
  margin-top: 16px;
  position: relative;
  margin-right: auto;
  margin-left: auto;
  flex-direction: column;
  display: flex;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
input {
  font-size: 90%;
  vertical-align: baseline;
  border: 0;
  outline: 0;
  color: #ddd;
  width: 250px;
  margin: 0 0 10px;
  padding: 4px 6px 5px 6px;
  border: 1px solid rgba(0,0,0,.5);
  background: rgba(0,0,0,.25);
}
.err {
  font-size: 70%;
  color: #a00;
  margin-left: 80px;
  margin-top: -8px;
  height: 18px;;
}
.btn {
  margin-left: 5px;
  margin-right: 5px;
  background-color: #333; 
  color: #fff;
  width: 160px;
  height: 30px;
  border: solid 1px #444;
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
button:disabled {
  opacity: 30%;
}
button:hover:disabled {
  border: solid 1px #444;
}
.overlayinfo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 38px;
}
.overlayurl {
  width: 400px;
}
p {
  font-size: 85%;
  margin-top: 5px;
  margin-left: 135px;
}
</style>
