<template>
    <div id="scoreboard">
		<div id="scorecardWrapper" >
			<div id="scorecard" class="scorecard" :class="course">
                <span class="front9">       
                <template v-for="i in 9" :key="i">
				<div class="score" :class="scoreclass(i,scores[i-1].score,course)">{{showscore(scores[i-1].score)}}</div>
                </template>
				<div class="score" id="frontNine">{{inout(0,9,scores)}}</div>
                </span>
                <span class="back9">
                        
                <template v-for="i in 9" :key="i">
				<div class="score" :class="scoreclass(i+9,scores[i+8].score,course)">{{showscore(scores[i+8].score)}}</div>
                </template>
				<div class="score" id="backNine" >{{inout(0,18,scores)}}</div>
                </span>
			</div>
			
            <span class="foot">
			<span v-if="displayScore" id="currentScoreWrap" class="wrappers">
				<span class="stats">Score: <span id="currentScore">{{calcscore(scores,course)}}</span></span>
			</span>
			<span v-if="displayPace" id="paceWrap" class="wrappers">
				<span class="stats">Pace: <span id="pace">{{calcpace(scores,course)}}</span></span>
			</span>
            </span>
		</div>
	</div>
</template>

<script>
import fb from "../../firebaseConfig";
import pars from './pars';
var watchedRef;
export default {
  name: 'StrokeScorecard',
  props: {
    strokeID: String
  },
  data: function () {
      return {
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
      };
  },
  methods: {
    scoreclass: function(hole, score, course) {
      var par = pars[course][hole-1];
      if (score === par - 1) {
          return "good";
      } else if (score < par){
          return "great";
      } else if (score === par + 1){
          return "poor";
      } else if (score > par) {
          return "bad";
      }
    },
    showscore: function(score) {
      if (score != 0) {
          return score;
      }
      return "";
    },
    inout: function(start, end, scores) {
        var total = 0;
        for (var i = start; i < end; i++) {
            var s = scores[i].score;
            if (s == 0) {
                return "";
            }
            total += s;
        }
        return total;
    },
    calcscore: function(scores,course) {
        var score = 0;
        scores.forEach(hole => {
            if (hole.score != 0) {
                score += hole.score - pars[course][hole.hole-1];
            }
        });
        if (score == 0) {
            return "EVEN";
        }
        return score;
    },
    calcpace: function(scores,course) {
        var score = 0;
        scores.forEach(hole => {
            if (hole.score != 0) {
                score += hole.score - pars[course][hole.hole-1];
            } else {
                score += -1;
            }
        });
        if (score == 0) {
            return "EVEN";
        }
        return score;
    },
  },
  mounted() {
      // Get Match & Watch DB
      watchedRef = fb.database().ref(`strokes/${this.strokeID}`);
      watchedRef.on("value", snapshot => {
          let data = snapshot.val();
          if (data) {
            this.course = data['course'];
            this.displayScore = data['displayScore'];
            this.displayPace = data['displayPace'];
            this.scores = data['scores'];
          }
      });
  },
  created() {
    this.$watch( 'strokeID', () => {
      watchedRef.off();
      watchedRef = fb.database().ref(`matches/${this.strokeID}`);
      watchedRef.on("value", snapshot => {
          let data = snapshot.val();
          if (data) {
            this.course = data['course'];
            this.displayScore = data['displayScore'];
            this.displayPace = data['displayPace'];
            this.scores = data['scores'];
          }
      });
    });
  }
}
</script>


<style scoped>
@font-face {
    src: url('../../assets/EndlessBossBattleRegular-v7Ey.ttf');
    font-family: "EndlessBossBattle";
}

#scoreboard {
    overflow: hidden;
    background: transparent;
    padding: 0px;
    margin: 0px;
    text-transform: uppercase;
    color: white;
    text-shadow: -3px 2px black;
    -webkit-text-stroke: 2px black;
    letter-spacing: 0.1em;
    font-family: 'EndlessBossBattle';
}

.wrappers {
    margin-top: 10px;
    width: 275px;
    height: 42px;
    line-height: 48px;
    text-align: center;
    font-size: 28px;
    background: url(../../assets/namebar.png);
    filter: drop-shadow(-1px 1px 1px gray);
    -webkit-text-stroke: 1px black;
}

#currentScoreWrap {
    right: 50%;
    margin-right: 3px;
}

#paceWrap {
    left: 50%;
    margin-left: 3px;
}

#scorecardWrapper {
    position: absolute;
    width: 100%;
    text-align: center;
}

#scorecard {
    width: 575px;
    height: 437px;
    margin-left: auto;
    margin-right: auto;
	background-position:center;
	background-size:contain;
	background-repeat:no-repeat;
	position:relative;
}
	#scorecard.AUSTRALIA {
		background-image:url(../../assets/AUSTRALIA.png);
	}
	#scorecard.JAPAN {
		background-image:url(../../assets/JAPAN.png);
	}
	#scorecard.USA {
		background-image:url(../../assets/USA.png);
	}
	#scorecard.GERMANY {
		background-image:url(../../assets/GERMANY.png);
		
	}


.score {
	font-size: 35px;
    width: 42.5px;
    text-align: center;
}
.front9{
    display: flex;
    position: absolute;
    top: 268px;
    left: 95px;
}
.back9{
    display: flex;
    position: absolute;
    top: 378px;
    left: 95px;
}

#frontNine, #backNine{width:70px;}
.great {
	color:#f7bd1e;
}
.good {
	color:#ffff63;
}
.poor {
	color:#9cdeff;
}
.bad {
	color:#5a96e7;
}
.foot {
    display: flex;
    justify-content: center;
}
</style>