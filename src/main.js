import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import App from './App.vue'
import Match from './components/matchPlay/Match'
import MatchView from './components/matchPlay/MatchView'
import StrokeScorecard from './components/strokePlay/StrokeScorecard'

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
