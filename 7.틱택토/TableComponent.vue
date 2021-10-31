<template>
    <table>
        <tr-component v-for="(trData, index) in tableData" :key="index" :tr-data="trData" :tr-index="index"></tr-component>
    </table>
</template>

<script>
import TrComponent from "./TrComponent";
export default {
    components: {
        "tr-component": TrComponent
    },
    props: {
        tableData: Array,
    },
}
</script>