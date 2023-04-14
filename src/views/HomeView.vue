<template>
    <div class="home">
        <p v-if="visible">Maintenant vous me voyez {{message}}</p>
        <button v-on:click="foo()">
            ok
        </button>
        <div v-background>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
        <div v-background:yellow>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
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