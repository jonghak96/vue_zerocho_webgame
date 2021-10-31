import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const INCREMENT_TIMER = "INCREMENT_TIMER";
export const SHOW_RESULT = "SHOW_RESULT";

export const CODE = {
  NORMAL:         -1, // 일반적으로 닫힌 칸.
  QUESTION:       -2, // 물음표 표시.
  FLAG:           -3, // 깃발 표시.
  QUESTION_MINE:  -4, // 물음표 표시(지뢰 있음).
  FLAG_MINE:      -5, // 깃발 표시(지뢰 있음).
  CLICKED_MINE:   -6, // 밟은 지뢰.
  MINE:           -7, // 지뢰.
  OPENED:          0, // 열린 칸(0이상이면 전부 오픈).
}

const setMine = (height, width, mine) => {

  const candidate = Array(height * width).fill().map((array, index) => {
    return index;
  });

  const shuffle = [];
  while(candidate.length > height*width-mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for(let i=0; i<height; i++) {
    const hData = [];
    data.push(hData);
    for(let j=0; j<width; j++) {
      hData.push(CODE.NORMAL);
    }
  }

  for(let k=0; k<shuffle.length; k++) {
    const vertical = Math.floor(shuffle[k] / width);
    const horizon = shuffle[k] % width;
    data[vertical][horizon] = CODE.MINE;
  }

  return data;
}

export default new Vuex.Store({ // import store from './store';

  state: {
    tableData: [],
    data: {
      w: 10,
      h: 10,
      mine: 20,
    },
    timer: 0,
    result: "",
    halted: true,
    countOpened: 0,
  },

  getters: {

  },

  mutations: {
    [START_GAME](state, { h, w, mine }) {
      state.data = {
        h,
        w,
        mine,
      }
      state.tableData = setMine(h, w, mine);
      state.timer = 0;
      state.halted = false;
      state.countOpened = 0;
      state.result = "";
    },
    [OPEN_CELL](state, {tr, td}) {

      const checkedCell = [];
      var countMine = [];

      function checkAround(tr, td) { // 주변 8칸 중 지뢰가 몇 개인지 확인하는 함수.

        if(state.tableData[tr][td] === CODE.NORMAL) state.countOpened += 1;

        const checkUndefined = tr<0 || tr>=state.tableData.length || td<0 || td>=state.tableData[0].length;
        if(checkUndefined) return; // 줄이나 칸이 범위를 나갈 때 Undefined가 뜨는지 체크.

        if([CODE.OPENED, CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(state.tableData[tr][td])) return; // 해당 칸이 지뢰인 경우에 열지 않기.

        if(checkedCell.includes(tr + '/' + td)) { // 이미 열었던 칸 중복해서 열지 않기.
          return;
        } else {
          checkedCell.push(tr + '/' + td);
        }

        let around = [];
        if(state.tableData[tr-1]) {
          around = around.concat([
            state.tableData[tr-1][td-1],
            state.tableData[tr-1][td],
            state.tableData[tr-1][td+1]
          ]);
        }
        around = around.concat([
          state.tableData[tr][td-1],
          state.tableData[tr][td+1]
        ]);
        if(state.tableData[tr+1]) {
          around = around.concat([
            state.tableData[tr+1][td-1],
            state.tableData[tr+1][td],
            state.tableData[tr+1][td+1]
          ]);
        }

        countMine = around.filter((element) => {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(element);
        });
        Vue.set(state.tableData[tr], td, countMine.length);

        if(countMine.length === 0) { // 주변 칸에 지뢰가 없으면 해당 칸을 열기.

          const near = [];
          if(tr-1 >= 0) {
            near.push([tr-1, td-1]);
            near.push([tr-1, td]);
            near.push([tr-1, td+1]);
          }
            near.push([tr, td-1]);
            near.push([tr, td+1]);
          if(tr+1 < state.tableData.length) {
            near.push([tr+1, td-1]);
            near.push([tr+1, td]);
            near.push([tr+1, td+1]);
          }

          near.forEach((v) => {
            if(state.tableData[v[0]][v[1]] !== CODE.OPENED) {
              checkAround(v[0], v[1]);
            }
          });
        }
      }
      checkAround(tr, td);

      if(state.countOpened === state.data.h * state.data.w - state.data.mine) {
        state.halted = true;
        state.result = `모든 지뢰를 찾아서 승리하였습니다! ${state.timer}초만에 클리어. 더 높은 난이도에 도전해 보세요.`;
      }
    },
    [FLAG_CELL](state, {tr, td}) {
      if(state.tableData[tr][td] === CODE.NORMAL)         Vue.set(state.tableData[tr], td, CODE.FLAG);
      if(state.tableData[tr][td] === CODE.MINE)           Vue.set(state.tableData[tr], td, CODE.FLAG_MINE);
    },
    [QUESTION_CELL](state, {tr, td}) {
      if(state.tableData[tr][td] === CODE.FLAG)           Vue.set(state.tableData[tr], td, CODE.QUESTION);
      if(state.tableData[tr][td] === CODE.FLAG_MINE)      Vue.set(state.tableData[tr], td, CODE.QUESTION_MINE);
    },
    [NORMALIZE_CELL](state, {tr, td}) {
      if(state.tableData[tr][td] === CODE.QUESTION)       Vue.set(state.tableData[tr], td, CODE.NORMAL);
      if(state.tableData[tr][td] === CODE.QUESTION_MINE)  Vue.set(state.tableData[tr], td, CODE.MINE);
    },
    [CLICK_MINE](state, {tr, td}) {
      state.halted = true;
      Vue.set(state.tableData[tr], td, CODE.CLICKED_MINE);
      state.result = `지뢰를 밟아 실패하였습니다! 다시 한 번 도전해 보세요.`;
    },
    [INCREMENT_TIMER](state) {
      state.timer++;
    },
  },

  actions: {

  },

});