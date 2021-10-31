<template>
    <div>
        <mine-form />
        <div>{{timer}}</div>
        <table-component />
        <div>{{result}}</div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import store, { START_GAME, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, CLICK_MINE, INCREMENT_TIMER, SHOW_RESULT } from "./store";
import TableComponent from "./TableComponent.vue";
import MineForm from "./MineForm.vue";

let interval;
export default {
    store,
    components: {
        TableComponent,
        MineForm,
    },
    computed: {
        ...mapState(["timer", "result", "halted"])
    },
    methods: {

    },
    watch: {
        halted(value, oldValue) {
            if(value === false) {
                interval = setInterval(() => {
                    this.$store.commit(INCREMENT_TIMER);
                }, 1000);
            } else {
                clearInterval(interval);
            }
        }
    }
}
</script>

<style>
    table {border-collapse: collapse;}
    td {border: 1px solid darkgray; width: 30px;height: 30px;text-align: center;}
</style>