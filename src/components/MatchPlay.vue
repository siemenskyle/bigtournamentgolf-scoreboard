<template>
    <div class=body>
      <div id="scoreboard">
        
        <!-- Player Cards and Up Indicators -->
        <span id="p1Wrapper" class="wrappers">
            <img id="p1Portrait" :src="require(`../assets/${p1Char}`)" class="portrait" />
            <span id="p1Name" class="names">{{ p1Name }}</span>

            <template v-if="up > 0 && up + lastHole === 17">
                <img id="p1UpNum" src="../assets/e.png"  class="up" />
                <img id="p1Up" src="../assets/e.png"  class="up" />
                <img id="p1Dormie" src="../assets/updormie.png" class="dormie" />
            </template>
            <template v-else-if="up > 0 && up + lastHole === 18">
                <img id="p1UpNum" src="../assets/e.png"  class="up" />
                <img id="p1Up" src="../assets/e.png"  class="up" />
                <img id="p1Dormie" src="../assets/dormie.png" class="dormie" />
            </template>
            <template v-else-if="up > 0 && up + lastHole > 18">
                <img id="p1UpNum" src="../assets/e.png"  class="up" />
                <img id="p1Up" src="../assets/e.png"  class="up" />
                <img id="p1Dormie" src="../assets/winner.png" class="dormie" />
            </template>
            <template v-else-if="up > 0">
                <img id="p1UpNum" :src="require(`../assets/${up}.png`)" class="up" />
                <img id="p1Up" src="../assets/UP.png" class="up" />
                <img id="p1Dormie" src="../assets/e.png" class="dormie" />
            </template>
            <template v-else>
                <img id="p1UpNum" src="../assets/e.png" class="up" />
                <img id="p1Up" src="../assets/e.png" class="up" />
                <img id="p1Dormie" src="../assets/e.png" class="dormie" />
            </template>
        </span>

        <span id="p2Wrapper" class="wrappers">
            <img id="p2Portrait" :src="require(`../assets/${p2Char}`)" class="portrait" />
            <span id="p2Name" class="names">{{ p2Name }}</span>

            <template v-if="up < 0 && -1*up + lastHole === 17">
                <img id="p2UpNum" src="../assets/e.png"  class="up" />
                <img id="p2Up" src="../assets/e.png"  class="up" />
                <img id="p2Dormie" src="../assets/updormie.png" class="dormie" />
            </template>
            <template v-else-if="up < 0 && -1*up + lastHole === 18">
                <img id="p2UpNum" src="../assets/e.png"  class="up" />
                <img id="p2Up" src="../assets/e.png"  class="up" />
                <img id="p2Dormie" src="../assets/dormie.png" class="dormie" />
            </template>
            <template v-else-if="up < 0 && -1*up + lastHole > 18">
                <img id="p2UpNum" src="../assets/e.png"  class="up" />
                <img id="p2Up" src="../assets/e.png"  class="up" />
                <img id="p2Dormie" src="../assets/winner.png" class="dormie" />
            </template>
            <template v-else-if="up < 0">
                <img id="p2UpNum" :src="require(`../assets/${-1 * up}.png`)" class="up" />
                <img id="p2Up" src="../assets/UP.png" class="up" />
                <img id="p2Dormie" src="../assets/e.png" class="dormie" />
            </template>
            <template v-else>
                <img id="p2UpNum" src="../assets/e.png" class="up" />
                <img id="p2Up" src="../assets/e.png" class="up" />
                <img id="p2Dormie" src="../assets/e.png" class="dormie" />
            </template>
        </span>

        <!-- All Square and Sudden Death Indicator -->
        <template v-if="up === 0">
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
    <div id="scores" class="hide"></div>
  </div>
</template>

<script>
export default {
  name: 'MatchPlay',
  props: {
    matchID: String
  },
  data: function () {
      return {
          p1Name: 'badatgaems',
          p2Name: 'bode',
          p1Char: 'VETERAN.gif',
          p2Char: 'PUTTMASTER.gif',
          up: -3,
          lastHole: 15,
          scores: [
              {hole: 1, score: 1},
              {hole: 2, score: 3},
              {hole: 3, score: 3},
              {hole: 4, score: 3},
              {hole: 5, score: 3},
              {hole: 6, score: 3},
              {hole: 7, score: 3},
              {hole: 8, score: 3},
              {hole: 9, score: 3},
              {hole: 10, score: 3},
              {hole: 11, score: 3},
              {hole: 12, score: 3},
              {hole: 13, score: 3},
              {hole: 14, score: 3},
              {hole: 15, score: 3},
              {hole: 16, score: 3},
              {hole: 17, score: 3},
              {hole: 18, score: 0},
            ] 
      }
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
    margin-top: -86px;
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
    left: 99px;
    top: -249px;
}
#h1p2 {
    left: 56px;
    top: -202px;
}
#h2p1 {
    left: 64px;
    top: -249px;
}
#h2p2 {
    left: 21px;
    top: -202px;
}
#h3p1 {
    left: 28px;
    top: -249px;
}
#h3p2 {
    left: -15px;
    top: -202px;
}
#h4p1 {
    left: -9px;
    top: -249px;
}
#h4p2 {
    left: -52px;
    top: -202px;
}
#h5p1 {
    left: -45px;
    top: -249px;
}
#h5p2 {
    left: -88px;
    top: -202px;
}
#h6p1 {
    left: -82px;
    top: -249px;
}
#h6p2 {
    left: -125px;
    top: -202px;
}
#h7p1 {
    left: -117px;
    top: -249px;
}
#h7p2 {
    left: 392px;
    top: -245px;
}
#h8p1 {
    left: 397px;
    top: -293px;
}
#h8p2 {
    left: 355px;
    top: -245px;
}
#h9p1 {
    left: 362px;
    top: -293px;
}
#h9p2 {
    left: 320px;
    top: -245px;
}
#h10p1 {
    left: -112px;
    top: -153px;
}
#h10p2 {
    left: -155px;
    top: -106px;
}
#h11p1 {
    left: -149px;
    top: -153px;
}
#h11p2 {
    left: -192px;
    top: -106px;
}
#h12p1 {
    left: -184px;
    top: -153px;
}
#h12p2 {
    left: -227px;
    top: -106px;
}
#h13p1 {
    left: -221px;
    top: -153px;
}
#h13p2 {
    left: -263px;
    top: -106px;
}
#h14p1 {
    left: 230px;
    top: -196px;
}
#h14p2 {
    left: 188px;
    top: -148px;
}
#h15p1 {
    left: 195px;
    top: -196px;
}
#h15p2 {
    left: 153px;
    top: -148px;
}
#h16p1 {
    left: 159px;
    top: -196px;
}
#h16p2 {
    left: 117px;
    top: -148px;
}
#h17p1 {
    left: 123px;
    top: -196px;
}
#h17p2 {
    left: 80px;
    top: -148px;
}
#h18p1 {
    left: 87px;
    top: -196px;
}
#h18p2 {
    left: 45px;
    top: -148px;
}
.hide {
    display: none;
}
</style>
