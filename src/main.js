import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import App from './App.vue'
import Match from './components/matchPlay/Match'
import MatchView from './components/matchPlay/MatchView'
import Stroke from './components/strokePlay/Stroke'
import StrokeView from './components/strokePlay/StrokeView'

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
    component: Stroke
  },
  {
    path: "/match/:matchID",
    name: "Match",
    props: true,
    component: MatchView
  },
  {
    path: "/stroke/:strokeID",
    name: "Stroke",
    props: true,
    component: StrokeView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app')
