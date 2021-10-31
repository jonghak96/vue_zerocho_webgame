<template>
    <div>
        <div>당첨숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" v-bind:key="ball" v-bind:number="ball"></lotto-ball>
        </div>
        <div v-if="bonusBall">보너스
            <lotto-ball v-bind:number="bonusBall"></lotto-ball>
        </div>
        <button v-if="redo" v-on:click="onClickRedo">한번 더</button>
    </div>
</template>

<script>
import LottoBall from './LottoBall';

const timeouts = [];

// var candidates = [];
// for(let i=1; i<=45; i++) {
//     candidates.push(i);
// }
// const getWinNumbers = () => {
//     const array = [];
//     for(let i=0; i<7; i++) {
//         const chosen = candidates.splice(Math.floor(Math.random() * (45-i)), 1)[0];
//         array.push(chosen);
//     }
//     return array;
// }

function getWinNumbers() {
    const candidates = Array(45).fill().map((object, index) => index+1);
    const shuffle = [];
    while(candidates.length > 0) {
        const chosen = candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0];
        shuffle.push(chosen);
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.slice(0, 6).sort(function(a, b) {
        return a-b;
    });
    return [...winNumbers, bonusNumber];
}


export default {    
    components: {
        // "lotto-ball": LottoBall
        LottoBall
    },
    data() {
        return {
            redo: false,
            winBalls: [],
            bonusBall: null,
            winNumbers: getWinNumbers(),
        };
    },
    computed: {

    },
    methods: {
        onClickRedo() {
            this.redo = false;
            this.winBalls = [];
            this.bonusBall = null;
            this.winNumbers = getWinNumbers();
            // this.showBalls();
        },
        showBalls() {
            for(let i=0; i<this.winNumbers.length-1; i++) {
                timeouts[i] = setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i]);
                }, (i+1)*1000);
                timeouts[6] = setTimeout(() => {
                    this.bonusBall = this.winNumbers[6];
                    this.redo = true;
                }, 7000);
            }
        }
    },
    mounted() {
        console.log("mounted()");
        this.showBalls();
    },
    beforeDestroy() {
        timeouts.forEach((value, index, array) => {
            clearTimeout(value);
        });
    },
    watch: {
        // winBalls(value, oldValue) {
        //     if(value.length === 0) {
        //         this.showBalls();
        //     }
        // },
        bonusBall(value, oldValue) {
            console.log(value, oldValue);
            if(value === null) {
                this.showBalls();
            }
        }
    },
}
</script>

<style scoped>

</style>