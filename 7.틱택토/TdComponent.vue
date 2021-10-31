<template>
        <td v-on:click="onClickTd">{{tdData}}</td>
</template>

<script>
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

            // console.log(this.$root.$data);
            // console.log(this.$parent.$data);
            let win = false;
            let rootData = this.$root.$data;
            // rootData.tableData[this.trIndex][this.tdIndex] = rootData.turn;
            this.$set(rootData.tableData[this.trIndex], this.tdIndex, rootData.turn);

            if(rootData.tableData[this.trIndex][0] === rootData.turn
            && rootData.tableData[this.trIndex][1] === rootData.turn
            && rootData.tableData[this.trIndex][2] === rootData.turn) {win = true;}
            if(rootData.tableData[0][this.tdIndex] === rootData.turn
            && rootData.tableData[1][this.tdIndex] === rootData.turn
            && rootData.tableData[2][this.tdIndex] === rootData.turn) {win = true;}
            if(rootData.tableData[0][0] === rootData.turn
            && rootData.tableData[1][1] === rootData.turn
            && rootData.tableData[2][2] === rootData.turn) {win = true;}
            if(rootData.tableData[0][2] === rootData.turn
            && rootData.tableData[1][1] === rootData.turn
            && rootData.tableData[2][0] === rootData.turn) {win = true;}

            if (win) { // 이긴 경우: 3줄 달성
                rootData.winner = rootData.turn;
                rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
            } else { // 무승부
                let all = true; // all이 true면 무승부라는 뜻
                rootData.tableData.forEach((row) => { // 무승부 검사
                    row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                    });
                });

                if (all) { // 무승부
                    rootData.winner = '';
                    rootData.turn = 'O';
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                } else {
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    },
    mounted() {

    },
    beforeDestroy() {

    },
}
</script>