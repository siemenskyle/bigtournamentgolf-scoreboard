<template>
  <div class="scorecard">
    <StrokeScorecard :strokeID="strokeID"/> 
  </div>
</template>

<script>

import StrokeScorecard from './StrokeScorecard'

export default {
  name: 'StrokeView',
  components: {
    StrokeScorecard
  },
  props: ['strokeID']
}
</script>

<style>
</style>
