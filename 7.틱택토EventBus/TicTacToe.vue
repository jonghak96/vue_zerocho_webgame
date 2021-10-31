<template>
    <table>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component v-bind:table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}님의 승리!</div>
    </table>
</template>

<script>
// import Vue from "vue";
import TableComponent from "./TableComponent.vue";
import EventBus from "./EventBus.js";

export default {
    components: {
        "table-component": TableComponent
    },
    data() {
        return {
            tableData: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            turn: 'O',
            winner: '',
        };
    },
    methods: {
        onChangeData() {
            // this.tableData[1][0] = 'X' // 작동하지 않음.
            // Vue.set(this.tableData[1], 0, 'X');
            this.$set(this.tableData[1], 0, 'X'); // Vue.set()과 동일.
        },
        onClickTd(trIndex, tdIndex) {
            // console.log(this.$root.$data);
            // console.log(this.$parent.$data);
            let win = false;
            // let rootData = this.$root.$data;
            // rootData.tableData[this.trIndex][this.tdIndex] = rootData.turn;
            this.$set(this.tableData[trIndex], tdIndex, this.turn);

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
                this.winner = this.turn;
                this.turn = this.turn === 'O' ? 'X' : 'O';
                this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
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
                    this.winner = '';
                    this.turn = 'O';
                    this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                } else {
                    this.turn = this.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    },
    created() {
        EventBus.$on("clickTd", this.onClickTd);
    }
}
</script>

<style>
    table {border-collapse: collapse;}
    td {border: 1px solid #000;width: 40px;height: 40px;text-align: center;}
</style>