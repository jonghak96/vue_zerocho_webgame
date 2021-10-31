<template>
    <tr>
        <td-component v-for="(tdData, index) in trData" :key="index" :tr-index="trIndex" :td-index="index"></td-component>
    </tr>
</template>

<script>
import TdComponent from "./TdComponent.vue";
export default {
    components: {
        "td-component": TdComponent
    },
    props: {
        trIndex: Number,
    },
    data() {
        return {
            parent: "I am your father.",
        };
    },
    computed: {
        trData() {
            return this.$store.state.tableData[this.trIndex];
        }
    },
}
</script>