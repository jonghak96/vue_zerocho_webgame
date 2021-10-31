<template>
    <div class="ball" v-bind:style="{background: computedBackground}">
        {{number}}
    </div>
    
</template>

<script>
export default {
    name: "LottoBall",
    // props: ["number"],
    props: {
        number: Number
    },
    data() {
        return {};
    },
    computed: {
        computedBackground() {
            let background;
            if(this.number < 10) {
                background = "LightCoral";
            } else if(this.number < 20) {
                background = "orange";
            } else if(this.number < 30) {
                background = "Gold";
            } else if(this.number < 40) {
                background = "ForestGreen";
            } else {
                background = "royalblue";
            }
            return background;
        }
    },
    methods: {

    },
    mounted() {

    },
    beforeDestroy() {
    },
    watch: {

    },
}
</script>

<style scoped>
    .ball {display: inline-block;border: 1px solid black;background: #fff;border-radius: 50%;width: 40px;height: 40px;line-height: 40px;font-size: 20px;color: black;text-align: center;margin-right: 20px;}
</style>