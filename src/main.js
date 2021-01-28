import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import App from './App.vue'
import Match from './components/Match.vue'
import MatchView from './components/MatchView.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Match,
  },
  {
    path: "/match/:matchID",
    name: "Match",
    props: true,
    component: MatchView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app')
