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
        }
    },
}
</script>

<style>
    table {border-collapse: collapse;}
    td {border: 1px solid #000;width: 40px;height: 40px;text-align: center;}
</style>