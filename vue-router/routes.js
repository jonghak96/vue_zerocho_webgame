import Vue from "vue";
import Vuex from 'vuex';
import VueRouter from "vue-router";

Vue.use(Vuex); // this.$store
Vue.use(VueRouter);

import NumberBaseball from "../3.숫자야구/NumberBaseball";
import ResponseCheck from "../4반응속도체크/ResponseCheck";
import RockScissorsPaper from "../5.가위바위보/RockScissorsPaper";
import LottoGenerator from "../6.로또/LottoGenerator";
import TicTacToe from "../7.틱택토Vuex/TicTacToe";
import MineSweeper from "../8.지뢰찾기/MineSweeper";
import GameMatcher from "./GameMatcher";

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/number-baseball",     component: NumberBaseball },
        { path: "/response-check",      component: ResponseCheck },
        { path: "/rock-scissors-paper", component: RockScissorsPaper },
        { path: "/lotto-generator",     component: LottoGenerator },
        { path: "/tic-tac-toe",         component: TicTacToe },
        { path: "/mine-sweeper",        component: MineSweeper },
        { path: "/game/:name",          component: GameMatcher },
    ],
});