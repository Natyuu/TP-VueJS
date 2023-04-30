<template>
    <div class="todos">
        <h1>Todos</h1>
        <TODOComponent title="" deadline="" done />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TODOComponent from './TODOComponent.vue';
import axios from 'axios';
import ThemeSwitch from "@/views/ThemeSwitch.vue";


@Options({
    components: {
        ThemeSwitch,
        TODOComponent,
    },
})

export default class Todos extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>