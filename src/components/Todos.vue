<template>
    <div>
        <h1>Todos</h1>
    </div>
    <!-- Ajout du formulaire -->
    <h2>Ajouter une tâche</h2>
    <form @submit.prevent="addTodo">
        <label for="title">Titre :</label>
        <input type="text" id="title" v-model="newTodo.title" required>

        <label for="description">Description :</label>
        <input type="text" id="description" v-model="newTodo.description">

        <label for="deadline">Date limite :</label>
        <input type="date" id="deadline" v-model="newTodo.deadline" required>

        <button type="submit">Ajouter</button>
    </form>
    <h2>Liste des tâches</h2>
    <ul>
        <li v-for="(todo, index) in todos" :key="index">
            {{ todo.title }} - {{ todo.description }} - {{ todo.deadline }}
            <button @click="validateTask(index)" :style="{ backgroundColor: todo.done ? '#7FFF7F' : '#FF6961' }">{{ todo.done ? 'FAIT' : 'valider' }}</button>
        </li>
    </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Todo } from './Todo';
import TODOComponent from './TODOComponent.vue';

@Options({
    components: {
        TODOComponent,
    },
})

export default class Todos extends Vue {
    public todos: Todo[] = [
        new Todo('Faire le TP', 'En Cours', '2023-04-24'),
    ];

    public newTodo: Todo = new Todo('', '', '');

    public addTodo() {
        if (this.newTodo.title && this.newTodo.deadline) {
            if (!this.newTodo.description) { // Si la description est vide, on la remplace par une chaîne vide
                this.newTodo.description = 'à faire';
            }
            this.todos.push(new Todo(this.newTodo.title, this.newTodo.description, this.newTodo.deadline));
            this.newTodo = new Todo('', '', '');
        }

    }

    public validateTask(index: number) {
        this.todos[index].done = !this.todos[index].done;
        if(this.todos[index].description == "à faire" ) {
            this.todos[index].description = this.todos[index].done ? 'Fait' : 'à faire';
        } else if (this.todos[index].description == "Fait" ){
            this.todos[index].description = this.todos[index].done ? 'Fait' : 'à faire';
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>