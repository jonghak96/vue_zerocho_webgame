<template>
        <td v-on:click="onClickTd">{{tdData}}</td>
</template>

<script>
import EventBus from "./EventBus.js";

export default {
    components: {
    },
    props: {
        tdData: String,
        trIndex: Number,
        tdIndex: Number
    },
    methods: {
        onClickTd() {

            if(this.tdData) return;

            EventBus.$emit("clickTd", this.trIndex, this.tdIndex);
        }
    },
    mounted() {

    },
    beforeDestroy() {

    },
}
</script>