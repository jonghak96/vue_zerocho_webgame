<template>
    <div>
        <!-- 클래스, 스타일은 객체 스타일 지원. -->
        <!-- <div id="computer" v-bind:class="{ state: true, hello: false }" v-bind:style="{}"></div> -->
        <div id="computer" :style="computedBackground"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
        <!-- <lifecycle-example v-if="true"> -->
    </div>
</template>

<script>
const RSPCoordinate = {
    바위: "0",
    가위: "-142px",
    보: "-284px"
}
const scores = {
    바위: 1,
    가위: 0,
    보: -1
}
const computerChoice = (imgCoordinate) => {
    return Object.entries(RSPCoordinate).find((element) => {return element[1] === imgCoordinate})[0];
};
let interval = null;

export default {
    data() {
        return {
            imgCoordinate: RSPCoordinate.바위,
            result: "",
            score: 0,
        };
    },
    computed: {
        computedBackground() {
            return { background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoordinate} 0`};
        }
    },
    methods: {
        shuffle() {
            // 변수에 저장하는 이유 : clearInterval 하려고.
            interval = setInterval(() => {
                if(this.imgCoordinate === RSPCoordinate.바위) {this.imgCoordinate = RSPCoordinate.가위;}
                else if(this.imgCoordinate === RSPCoordinate.가위) {this.imgCoordinate = RSPCoordinate.보;}
                else {this.imgCoordinate = RSPCoordinate.바위;}
            }, 100);
        },
        onClickButton(choice) {
            clearInterval(interval);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(this.imgCoordinate)];
            const diff = myScore - cpuScore;
            if(diff === 0) {
                this.result = "비김.";
            } else if([1,-2].includes(diff)) {
                this.result = "이김.";
                this.score += 1;
            } else {
                this.result = "짐.";
                this.score -= 1; 
            }
            setTimeout(() => {
                this.shuffle();
            }, 1000);
        }
    },
    beforeCreate() {
        console.log("beforeCreate()");
    },
    created() {
        console.log("created() - 화면에 나타나기 전");
    },
    beforeMount() {
        console.log("beforeMount()");
    },
    mounted() {
        console.log("mounted() - 화면에 나타난 후");
        this.shuffle();
    },
    beforeUpdate() {
        console.log("beforeUpdate()");
    },
    updated() {
        console.log("updated() - 업데이트 된 후");
    },
    beforeDestroy() {
        console.log("beforeDestroy()");
        clearInterval(interval);
    },
    destroyed() {
        console.log("destroyed() - false가 될 때");
    },
}
</script>

<style scoped>
    #computer {width: 142px;height: 200px;background-position: 0 0;}
</style>