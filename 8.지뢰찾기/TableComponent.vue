<template>
    <table>
        <tr v-for="(trData, trIndex) in tableData" v-bind:key="trIndex">
            <td v-for="(tdData, tdIndex) in trData"
            v-bind:key="tdIndex"
            v-bind:style="tdDataStyle(trIndex, tdIndex)"
            v-on:click="onClickTd(trIndex, tdIndex)"
            v-on:contextmenu.prevent="onRightClickTd(trIndex, tdIndex)">
                {{cellDataText(trIndex, tdIndex)}}
            </td>
        </tr>
    </table>
</template>

<script>
import { mapGetters, mapState } from "vuex";    
import { CODE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, CLICK_MINE } from "./store";

export default {
    computed: {
        ...mapState(["tableData", "halted"]),

        tdDataStyle(state) {
            return (tr, td) => {
                switch(this.$store.state.tableData[tr][td]) {
                    case CODE.NORMAL:        return {background: "gray"};
                    case CODE.QUESTION:      return {background: "yellow"};
                    case CODE.FLAG:          return {background: "red"};
                    case CODE.QUESTION_MINE: return {background: "yellow"};
                    case CODE.FLAG_MINE:     return {background: "red"};
                    case CODE.CLICKED_MINE:  return {background: "black", color: "white"};
                    case CODE.MINE:          return {background: "gray"};
                    case CODE.OPENED:        return {background: "white"};
                    default:                 return {background: "white"};
                }
            }
        },
        cellDataText(state) {
            return (tr, td) => {
                switch(this.$store.state.tableData[tr][td]) {
                    case CODE.NORMAL:        return ;
                    case CODE.QUESTION:      return '?';
                    case CODE.FLAG:          return '!';
                    case CODE.QUESTION_MINE: return '?';
                    case CODE.FLAG_MINE:     return '!';
                    case CODE.CLICKED_MINE:  return '펑';
                    case CODE.MINE:          return '';
                    case CODE.OPENED:        return '';
                    default:                 return this.$store.state.tableData[tr][td] || '';
                }
            }
        },
    },
    methods: {
        onClickTd(tr, td) {
            if(this.halted) return;
            switch(this.tableData[tr][td]) {
                case CODE.NORMAL:
                    this.$store.commit(OPEN_CELL, {tr, td});
                    return;
                case CODE.MINE:
                    this.$store.commit(CLICK_MINE, {tr, td});
                    return;
                default: return;
            }
        },
        onRightClickTd(tr, td) {
            if(this.halted) return;
            switch(this.tableData[tr][td]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    this.$store.commit(FLAG_CELL, {tr, td});
                    return;
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                    this.$store.commit(QUESTION_CELL, {tr, td});
                    return;
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    this.$store.commit(NORMALIZE_CELL, {tr, td});
                    return;
                default: return;
            }
            

        },
    },
}
</script>