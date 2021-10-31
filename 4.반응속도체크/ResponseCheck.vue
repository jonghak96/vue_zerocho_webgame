<template>
    <div>
        <!-- <div id="screen" v-bind:class="state">{{message}}</div> -->
        <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
        <template v-if="result.length">
        <div>평균시간 ::: {{ average }}초</div>
        <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
    data() {
        return {
            result: [],
            state: "waiting",
            message: "클릭해서 시작하세요."
        };
    },
    computed: {
      average: function() {
        return this.result.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.result.length / 1000 || 0;
      }
    },
    methods: {
        onReset() {
          this.result = [];
        },
        onClickScreen() {
            if(this.state === "waiting") {
                this.state = "ready";
                this.message = "초록색이 되면 시작하세요."
                timeout = setTimeout(() => {
                  this.state = "now";
                  this.message = "지금이니!"
                  startTime = new Date();
                }, Math.floor(Math.random() * 2000 + 2000));
            } else if(this.state === "ready") {
                this.state = "waiting";
                this.message = "너무 성급. 초록색이 된 후에 클릭하세요."
                clearTimeout(timeout);
            } else if(this.state === "now") {
                this.state = "waiting";
                this.message = "클릭해서 다시 시작하세요"
                endTime = new Date();
                this.result.push(endTime - startTime);
            }
        }
    }
}
</script>

<style scoped>
    #screen {width: 300px;height: 200px;text-align: center;line-height: 200px;user-select: none;}
    #screen.waiting {background: royalblue;}
    #screen.ready {background: pink;color: white;}
    #screen.now {background: green;}
</style>