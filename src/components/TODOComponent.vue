<template>
    <div class="todo">
        <h2>{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
        <p>{{ todo.deadline }}</p>
        <input type="checkbox" v-model="todo.done">
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Todo } from '@/components/Todo';

@Options({
    props: {
        todo: {
            type: Todo,
            required: true
        }
    }
})
export default class TODOComponent extends Vue {
}
</script>

<style scoped>
.todo {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
}
</style>
