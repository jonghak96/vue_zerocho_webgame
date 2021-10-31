<template>
    <tr>
        <td-component v-for="(tdData, index) in trData" :key="index" :td-data="tdData" :tr-index="trIndex" :td-index="index"></td-component>
    </tr>
</template>

<script>
import TdComponent from "./TdComponent.vue";
export default {
    components: {
        "td-component": TdComponent
    },
    props: {
        trData: Array,
        trIndex: Number,
    },
    data() {
        return {
            parent: "I am your father.",
        };
    },
}
</script>