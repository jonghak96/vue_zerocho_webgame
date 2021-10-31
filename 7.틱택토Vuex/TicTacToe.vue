<template>
    <table>
        <div>{{turn}}님의 턴입니다.</div>
        <!-- <table-component v-bind:table-data="tableData"></table-component> -->
        <table-component>
            <tr v-for="(trData, trIndex) in tableData" :key="trIndex">
                <td v-on:click="onClickTd(trIndex, tdIndex)" v-for="(tdData, tdIndex) in trData" :key="tdIndex">{{tdData}}</td>
            </tr>
        </table-component>
        <!-- <table>
            <tr v-for="(trData, trIndex) in tableData" :key="trIndex">
                <td v-on:click="onClickTd(trIndex, tdIndex)" v-for="(tdData, tdIndex) in trData" :key="tdIndex">{{tdData}}</td>
            </tr>
        </table> -->
        <div v-if="winner">{{winner}}님의 승리!</div>
    </table>
</template>

<script>
// import Vue from "vue";
import { mapGetters, mapState } from "vuex";
// import store from "./store";
// import {CLICK_CELL, SET_WINNER, CHANGE_TURN, RESET_GAME, NO_WINNER} from "./store";
import store, {CLICK_CELL, SET_WINNER, CHANGE_TURN, RESET_GAME, NO_WINNER} from "./store";
import TableComponent from "./TableComponent.vue";
export default {
    store,
    components: {
        "table-component": TableComponent
    },
    // data() {
    //     return {
    //         dataTemp: 1,
    //     };
    // },
    computed: {
        ...mapState(["winner", "turn", "tableData"]),
        /*
        ...mapState({
            winner: state => state.winner,
            turnState: "turn",
            tableData(state) {
                return state.tableData + this.dataTemp;
            }
        }),
        */
        // winner() {
        //     return this.$store.state.winner;
        // },
        // turn() {
        //     return this.$store.state.turn;
        // },

        ...mapGetters(["turnMessage",]), // https://vuex.vuejs.org/kr/guide/getters.html#mapgetters-%E1%84%92%E1%85%A6%E1%86%AF%E1%84%91%E1%85%A5
        turnMessage() {
            return this.$store.getters.turnMessage;
        }
    },
    methods: {
        onClickTd(trIndex, tdIndex) {

            if(this.tdData) return;

            // let rootData = this.$root.$data;

            // console.log(this.$root.$data);
            // console.log(this.$parent.$data);
            // this.tableData[this.trIndex][this.tdIndex] = this.turn;
            // this.$set(this.tableData[this.trIndex], this.tdIndex, this.turn);
            this.$store.commit(CLICK_CELL, { trIndex: trIndex, tdIndex: tdIndex });

            let win = false;
            if(this.tableData[trIndex][0] === this.turn
            && this.tableData[trIndex][1] === this.turn
            && this.tableData[trIndex][2] === this.turn) {win = true;}
            if(this.tableData[0][tdIndex] === this.turn
            && this.tableData[1][tdIndex] === this.turn
            && this.tableData[2][tdIndex] === this.turn) {win = true;}
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

<style>
    table {border-collapse: collapse;}
    td {border: 1px solid #000;width: 40px;height: 40px;text-align: center;}
</style>