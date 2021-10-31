<template>
    <div>
        <input type="number" placeholder="세로 칸 수" v-bind:value="h" v-on:change="onChangeHeight" />
        <input type="number" placeholder="가로 칸 수" v-bind:value="w" v-on:change="onChangeWidth" />
        <input type="number" placeholder="지뢰 개수" v-bind:value="mine" v-on:change="onChangeMine" />
        <button v-on:click="onClickButton">시작</button>
    </div>
</template>

<script>
import { START_GAME } from './store';
export default {
    data() {
        return {
            h: 10,
            w: 10,
            mine: 20,
        };
    },
    methods: {
        onChangeHeight(event) {
            console.log(event);
            console.log(event.target);
            console.log(event.target.value);
            this.h = event.target.value;
        },
        onChangeWidth(event) {
            this.w = event.target.value;
        },
        onChangeMine(event) {
            this.mine = event.target.value;
        },
        onClickButton() {
            this.$store.commit(START_GAME, { h: this.h, w: this.w, mine: this.mine });
        }
    }
}
</script>