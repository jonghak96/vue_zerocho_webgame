<template>
        <td v-on:click="onClickTd">{{tdData}}</td>
</template>

<script>
import { mapState } from "vuex";
import {CLICK_CELL, SET_WINNER, CHANGE_TURN, RESET_GAME, NO_WINNER} from "./store";
export default {
    props: {
        trIndex: Number,
        tdIndex: Number
    },
    computed: {
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn,
            tdData(state) {
                return state.tableData[this.trIndex][this.tdIndex];
            }
        }),

        // tdData() {
        //     return this.$store.state.tableData[this.trIndex][this.tdIndex];
        // },
        // tableData() {
        //     return this.$store.state.tableData;
        // },
        // turn() {
        //     return this.$store.state.turn;
        // }
    },
    methods: {
        onClickTd() {

            if(this.tdData) return;

            // let rootData = this.$root.$data;

            // console.log(this.$root.$data);
            // console.log(this.$parent.$data);
            // this.tableData[this.trIndex][this.tdIndex] = this.turn;
            // this.$set(this.tableData[this.trIndex], this.tdIndex, this.turn);
            this.$store.commit(CLICK_CELL, { trIndex: this.trIndex, tdIndex: this.tdIndex });

            let win = false;
            if(this.tableData[this.trIndex][0] === this.turn
            && this.tableData[this.trIndex][1] === this.turn
            && this.tableData[this.trIndex][2] === this.turn) {win = true;}
            if(this.tableData[0][this.tdIndex] === this.turn
            && this.tableData[1][this.tdIndex] === this.turn
            && this.tableData[2][this.tdIndex] === this.turn) {win = true;}
            if(this.tableData[0][0] === this.turn
            && this.tableData[1][1] === this.turn
            && this.tableData[2][2] === this.turn) {win = true;}
            if(this.tableData[0][2] === this.turn
            && this.tableData[1][1] === this.turn
            && this.tableData[2][0] === this.turn) {win = true;}

            if (win) { // 이긴 경우: 3줄 달성
                // this.winner = this.turn;
                // this.turn = this.turn === 'O' ? 'X' : 'O';
                // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                this.$store.commit(SET_WINNER, this.turn);
                this.$store.commit(RESET_GAME);
            } else { // 무승부
                let all = true; // all이 true면 무승부라는 뜻
                this.tableData.forEach((row) => { // 무승부 검사
                    row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                    });
                });

                if (all) { // 무승부
                    // this.winner = '';
                    // this.turn = 'O';
                    // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                } else {
                    // this.turn = this.turn === 'O' ? 'X' : 'O';
                    this.$store.commit(CHANGE_TURN);
                }
            }
        }
    },
}
</script>