<template>
    <div>
        <div>
            <router-link to="/game/index">게임 매치어</router-link>
            <router-link to="/game/number-baseball">숫자야구</router-link>
            <router-link to="/game/response-check">반응속도체크</router-link>
            <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
            <router-link to="/game/lotto-generator">로또</router-link>
            <router-link to="/game/tic-tac-toe">틱택토</router-link>
            <router-link to="/game/mine-sweeper">지뢰찾기</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import router from "./routes.js";
export default {
    router,
    mounted() {
        console.log("this.$router :::: ", this.$router);
        console.log("this.$route :::: ", this.$route);
    },
};
</script>

<style>
    table {border-collapse: collapse;}
    td {border: 1px solid darkgray; width: 30px;height: 30px;text-align: center;}
</style>