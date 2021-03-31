import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import App from './App.vue'
import Match from './components/matchPlay/Match.vue'
import MatchView from './components/matchPlay/MatchView.vue'
import StrokeScorecard from './components/strokePlay/StrokeScorecard.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Match
  },
  {
    path: "/match",
    name: "MatchPlay",
    component: Match
  },
  {
    path: "/stroke",
    name: "StrokePlay",
    component: StrokeScorecard
  },
  {
    path: "/match/:matchID",
    name: "Match",
    props: true,
    component: MatchView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app')
