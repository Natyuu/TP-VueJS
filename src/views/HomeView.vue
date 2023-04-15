<template>
    <div class="home">
        <p v-if="visible">Maintenant vous me voyez {{message}}</p>
        <button v-on:click="foo()">
            ok
        </button>
        <Todos/>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Todos from '@/components/Todos.vue';

@Options({
    components: {
        Todos,
    },
    props: {
        msg: String
    }
})
export default class Home extends Vue {

    message= 'test';
    visible = true;
    foo(){
        this.visible = !this.visible;
    }
}
</script>