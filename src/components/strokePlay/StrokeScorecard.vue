<template>
    <div id="scoreboard">
		<div id="scorecardWrapper" >
			<div id="scorecard" class="scorecard" :class="course">
				<div id="solo" >
                    <span class="front9">
					<div class="score" id="h1" >1</div>
					<div class="score" id="h2" >2</div>
					<div class="score" id="h3" >3</div>
					<div class="score" id="h4" >4</div>
					<div class="score" id="h5" >5</div>
					<div class="score" id="h6" >6</div>
					<div class="score" id="h7" >7</div>
					<div class="score" id="h8" >8</div>
					<div class="score" id="h9" >9</div>
					<div class="score" id="frontNine" >42</div>
                    </span>
                    <span class="back9">
					<div class="score" id="h10" >9</div>
					<div class="score" id="h11" >8</div>
					<div class="score" id="h12" >7</div>
					<div class="score" id="h13" >6</div>
					<div class="score" id="h14" >5</div>
					<div class="score" id="h15" >4</div>
					<div class="score" id="h16" >3</div>
					<div class="score" id="h17" >2</div>
					<div class="score" id="h18" >1</div>
					<div class="score" id="backNine" >66</div>
                    </span>
				</div>
			</div>
			
			<span id="currentScoreWrap" class="wrappers">
				<span class="stats">Score: <span id="currentScore">EVEN</span></span>
			</span>
			<span id="paceWrap" class="wrappers">
				<span class="stats">Pace: <span id="pace">-18</span></span>
			</span>
		</div>
	</div>
	<div id="scores" class="hide"></div>
</template>

<script>
export default {
  name: 'StrokeScorecard',
  props: {
    strokeID: String
  },
  data: function () {
      return {
          course: "GERMANY",
          name: "Bode",
          lastHole: 0,
          score: 0,
          pace: -18,
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
    position: absolute;
    margin-top: 10px;
    width: 275px;
    height: 42px;
    line-height: 45px;
    text-align: center;
    font-size: 28px;
    background: url(../../assets/namebar.png);
    filter: drop-shadow(-1px 1px 1px gray);
    -webkit-text-stroke: 1px black;
}

.stats {
    position: inherit;
    left: 0px;
    width: 100%;
    top: 2px;
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
    top: 268px;
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

.hide {
    display: none;
}
</style>