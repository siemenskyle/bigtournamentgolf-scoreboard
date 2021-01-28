<template>
    <div class=body>
      <div id="scoreboard">
        
        <!-- Player Cards and Up Indicators -->
        <span id="p1Wrapper" class="wrappers">
            <img id="p1Portrait" :src="require(`../assets/${p1Char}`)" class="portrait" />
            <span id="p1Name" class="names" v-bind:style="{ fontSize: nameSize(p1Name) }">{{ p1Name }}</span>

            <template v-for="u in ups(1)" :key="u.up">
                <img id="p1UpNum" :src="u['upNum']"  class="up" />
                <img id="p1Up" :src="u['up']"  class="up" />
                <img id="p1Dormie" :src="u['dormie']" class="dormie" />
            </template>
        </span>

        <span id="p2Wrapper" class="wrappers">
            <img id="p2Portrait" :src="require(`../assets/${p2Char}`)" class="portrait" />
            <span id="p2Name" class="names" v-bind:style="{ fontSize: nameSize(p2Name) }">{{ p2Name }}</span>

            <template v-for="u in ups(2)" :key="u.up">
                <img id="p2UpNum" :src="u['upNum']"  class="up" />
                <img id="p2Up" :src="u['up']"  class="up" />
                <img id="p2Dormie" :src="u['dormie']" class="dormie" />
            </template>
        </span>

        <!-- All Square and Sudden Death Indicator -->
        <template v-if="up === 0 && lastHole === 18">
            <img id="square" src="../assets/sudden-death.png">
        </template>
        <template v-else-if="up === 0">
            <img id="square" src="../assets/square.png">
        </template>
        <template v-else>
            <img id="square" src="../assets/e.png">
        </template>

        <!-- Scorecard -->
        <div id="scorecardWrapper" >
            <div id="scorecard" class="scorecard" >
                <img id="scorecardBack" src="../assets/matchplay.png" />
                <template v-for="score in scores" :key="score.hole">
                    <template v-if="score.score === 0" >
                      <img class="score" v-bind:id="`h${score.hole}p1`"  src="../assets/e.png" />
                      <img class="score" v-bind:id="`h${score.hole}p2`"  src="../assets/e.png" />
                    </template>
                    <template v-else-if="score.score === 1" >
                      <img class="score" v-bind:id="`h${score.hole}p1`"  src="../assets/W.png" />
                      <img class="score" v-bind:id="`h${score.hole}p2`"  src="../assets/L.png" />
                    </template>
                    <template v-else-if="score.score === 2" >
                      <img class="score" v-bind:id="`h${score.hole}p1`"  src="../assets/L.png" />
                      <img class="score" v-bind:id="`h${score.hole}p2`"  src="../assets/W.png" />
                    </template>
                    <template v-else-if="score.score === 3" >
                      <img class="score" v-bind:id="`h${score.hole}p1`"  src="../assets/T.png" />
                      <img class="score" v-bind:id="`h${score.hole}p2`"  src="../assets/T.png" />
                    </template>
                </template>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import fb from "../firebaseConfig"
export default {
  name: 'MatchScorecard',
  props: {
    matchID: String
  },
  data: function () {
      return {
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
      };
  },
  methods: {
      nameSize: function (name) {
          if (name.length > 14) {
              return '19px';
          } else if (name.length > 11) {
              return '23px';
          } else {
              return '29px';
          }
      },
      ups: function(player) {
          const up = this.up;
          const lastHole = this.lastHole;
          const empty = require("../assets/e.png");
          const upImg = require("../assets/UP.png");
          const updormie = require("../assets/updormie.png");
          const dormie = require("../assets/dormie.png");
          const winner = require("../assets/winner.png");
          let imgs = {
              'up': empty,
              'upNum': empty,
              'dormie': empty
          };
          if (player === 1) {
              if (up > 0) {
                  if (up + lastHole === 17) {
                      imgs['dormie'] = updormie;
                  } else if (up + lastHole === 18) {
                      imgs['dormie'] = dormie;
                  } else if (up + lastHole > 18) { 
                      imgs['dormie'] = winner;
                  } else {
                      imgs['up'] = upImg;
                      imgs['upNum'] = require(`../assets/${up}.png`);
                  }
              } 
          } else {
              if (up < 0) {
                  const p2up = -1 * up;
                  if (p2up + lastHole === 17) {
                      imgs['dormie'] = updormie;
                  } else if (p2up + lastHole === 18) {
                      imgs['dormie'] = dormie;
                  } else if (p2up + lastHole > 18) { 
                      imgs['dormie'] = winner;
                  } else {
                      imgs['up'] = upImg;
                      imgs['upNum'] = require(`../assets/${p2up}.png`);
                  }
              } 
          }
          return [imgs];
      }
  },
  mounted() {
      // Preload images
      const imgs = [require("../assets/e.png"), require("../assets/UP.png"), require("../assets/updormie.png"), require("../assets/dormie.png"), require("../assets/winner.png"),
                    require("../assets/1.png"),require("../assets/2.png"),require("../assets/3.png"),require("../assets/4.png"),require("../assets/5.png"),require("../assets/6.png"),
                    require("../assets/7.png"),require("../assets/8.png"),require("../assets/9.png"),require("../assets/T.png"),require("../assets/W.png"),require("../assets/L.png"),
                    require("../assets/PUTTMASTER.gif"),require("../assets/SHOTMAKER.gif"),require("../assets/TECHNITIAN.gif"),require("../assets/POWERGOLFER.gif"),require("../assets/VETERAN.gif"),
                    require("../assets/YOUNGHERO.gif")];
      imgs.forEach( src => {
          let img = new Image();
          img.onload = () => {
            console.log('img preloaded');
          }
          img.src = src;
      });
      // Get Match & Watch DB
      const itemRef = fb.database().ref(`matches/${this.matchID}`);
      itemRef.on("value", snapshot => {
          let data = snapshot.val();
          this.p1Name = data['p1Name'];
          this.p2Name = data['p2Name'];
          this.p1Char = data['p1Char'];
          this.p2Char = data['p2Char'];
          this.up = data['up'];
          this.lastHole = data['lastHole'];
          this.scores = data['scores'];
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
    src: url('../assets/EndlessBossBattleRegular-v7Ey.ttf');
    font-family: "EndlessBossBattle";
}

.body {
    overflow: hidden;
    background: transparent;
    padding: 0px;
    margin: 0px;
    text-transform: uppercase;
    color: white;
    text-shadow: -3px 2px black;
    -webkit-text-stroke: 1px black;
    letter-spacing: 0.1em;
    font-family: 'EndlessBossBattle';
}

.wrappers {
    position: absolute;
    margin-top: 10px;
    width: 275px;
    height: 42px;
    line-height: 45px;
    text-align: center;
    font-size: 28px;
    background: url(../assets/namebar.png);
    filter: drop-shadow(-1px 1px 1px gray);
}    

#p1Wrapper {
    left: 0;
    margin-left: 3px;
}

#p2Wrapper {
    right: 0;
    margin-right: 3px;
}

.names {
    position: absolute;
    left: 0;
    width: 225px;
    overflow: hidden;
    margin-left: 50px;
    margin-top: 1px;
    z-index: -2
}

.portrait {
    float: left;
    margin-top: -10px;
    margin-left: 2px;
    filter: drop-shadow(2px 4px 6px black);
    z-index: 5;
}

#square {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 61px;
    z-index: -1;
}
    
.up {
    margin-top: 50px;
    margin-left: 15px;
}

.dormie {
    position: relative;
    margin-top: -84px;
    margin-bottom: 28px;
    margin-left: 14px;
    width: 262px;
    z-index: -1;
    filter: drop-shadow(2px 2px 4px darkgray);
}

#scorecardWrapper {
    position: absolute;
    width: 100%;
    text-align: center;
    margin-top: 120px;
}

.scorecard {
    width: 575px;
    height: 295px;
    margin-left: auto;
    margin-right: auto;
}

.score {
    position: relative;
}
#h1p1 {
    left: 111px;
    top: -253px;
}
#h1p2 {
    left: 73px;
    top: -205px;
}
#h2p1 {
    left: 84px;
    top: -253px;
}
#h2p2 {
    left: 47px;
    top: -205px;
}
#h3p1 {
    left: 56px;
    top: -253px;
}
#h3p2 {
    left: 19px;
    top: -205px;
}
#h4p1 {
    left: 29px;
    top: -253px;
}
#h4p2 {
    left: -9px;
    top: -205px;
}
#h5p1 {
    left: 1px;
    top: -253px;
}
#h5p2 {
    left: -37px;
    top: -205px;
}
#h6p1 {
    left: -26px;
    top: -253px;
}
#h6p2 {
    left: -64px;
    top: -205px;
}
#h7p1 {
    left: -53px;
    top: -253px;
}
#h7p2 {
    left: -91px;
    top: -205px;
}
#h8p1 {
    left: -80px;
    top: -253px;
}
#h8p2 {
    left: 453px;
    top: -247px;
}
#h9p1 {
    left: 463px;
    top: -295px;
}
#h9p2 {
    left: 425px;
    top: -247px;
}
#h10p1 {
    left: -2px;
    top: -156px;
}
#h10p2 {
    left: -40px;
    top: -108px;
}
#h11p1 {
    left: -30px;
    top: -156px;
}
#h11p2 {
    left: -68px;
    top: -108px;
}
#h12p1 {
    left: -57px;
    top: -156px;
}
#h12p2 {
    left: -95px;
    top: -108px;
}
#h13p1 {
    left: -85px;
    top: -156px;
}
#h13p2 {
    left: -122px;
    top: -108px;
}
#h14p1 {
    left: -112px;
    top: -156px;
}
#h14p2 {
    left: -148px;
    top: -108px;
}
#h15p1 {
    left: -139px;
    top: -156px;
}
#h15p2 {
    left: -177px;
    top: -108px;
}
#h16p1 {
    left: 232px;
    top: -198px;
}
#h16p2 {
    left: 195px;
    top: -150px;
}
#h17p1 {
    left: 206px;
    top: -198px;
}
#h17p2 {
    left: 168px;
    top: -150px;
}
#h18p1 {
    left: 178px;
    top: -198px;
}
#h18p2 {
    left: 140px;
    top: -150px;
}
</style>
