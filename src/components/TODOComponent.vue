<template>
    <div class="todo">
        <!-- Ajout du formulaire -->
        <h2>Ajouter une tâche</h2>
        <form @submit.prevent="addTodo">
            <label for="title">Titre :</label>
            <input type="text" id="title" v-model="newTodo.title" required>

            <label for="description">Description : </label>
            <input type="text" id="description" v-model="newTodo.description">

            <label for="deadline">Date limite : </label>
            <input type="date" id="deadline" v-model="newTodo.deadline" required>

            <button type="submit">Ajouter</button>
        </form>
        <div>
            <h2>Liste des tâches</h2>
            <div class="todos-container">
                <button @click="deleteAllTasks" class="delete-btn">Supprimer toutes les tâches</button>
                <button @click="deleteFinishedTasks" class="delete-btn">Supprimer les tâches terminées</button>
            </div>
        </div>
        <div class="todos-container2">
            <footer v-if="todos.length > 0" class="space-between-btn">
                <span class="text-tasks-remaining">{{ remainingTasks }} tâches restantes à faire</span>
            </footer>
            <button :class="['filter-button', {'active': currentFilter === 'all'}]"
                    @click="currentFilter = 'all'"
                    class="space-selection-btn">Toutes</button>
            <button :class="['filter-button', {'active': currentFilter === 'todo'}]"
                    @click="currentFilter = 'todo'"
                    class="space-selection-btn">A faire</button>
            <button :class="['filter-button', {'active': currentFilter === 'done'}]"
                    @click="currentFilter = 'done'"
                    class="space-selection-btn">Faites</button>
        </div>
        <ul>
            <li v-for="(todo, index) in filteredTask" :key="index">
                <span @dblclick="editTitle(index)"
                      contentEditable="true"
                      class="space-edit"
                      @keyup.enter="saveTitle(index, $event)">{{ todo.title }}</span>
                <span>- {{ todo.description }} - {{ todo.deadline }}</span>
                <button @click="validateTask(index)"
                        :style="{ backgroundColor: todo.done ? '#7FFF7F' : '#FF6961' }">{{ todo.done ? 'FAIT' : 'valider' }}</button>
                <button @click="deleteTask(index)" class="delete-btn">Supprimer</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Todo } from './Todo';


@Options({
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        deadline: {
            type: Date,
            required: true,
        },
        done: {
            type: Boolean,
            required: true,
        },
    },
})
export default class TODOComponent extends Vue {
    public todos: Todo[] = [
        new Todo('Faire le TP', 'En Cours', '2023-04-24'),
    ];

    public newTodo: Todo = new Todo('', '', '');

    // filtre de base
    public currentFilter: string = "all";

    public editIndex: number | null = null;
    public editTitleValue: string = '';

    // ajoute dans la liste une nouvelle tache et met la description à 'à faire' s'il n'y a pas de description entrée.
    public addTodo() {
        if (this.newTodo.title && this.newTodo.deadline) {
            if (!this.newTodo.description) { // Si la description est vide, on la remplace par une chaîne vide
                this.newTodo.description = 'à faire';
            }
            this.todos.push(new Todo(this.newTodo.title, this.newTodo.description, this.newTodo.deadline));
            this.newTodo = new Todo('', '', '');
        }

    }

    // Valide la tache cliqué et renome en Fait la description si c'est celle de base 'à faire'.
    public validateTask(index: number) {
        this.todos[index].done = !this.todos[index].done;
        if(this.todos[index].description == "à faire" ) {
            this.todos[index].description = this.todos[index].done ? 'Fait' : 'à faire';
        } else if (this.todos[index].description == "Fait" ){
            this.todos[index].description = this.todos[index].done ? 'Fait' : 'à faire';
        }
    }

    // Propriété calculée pour afficher le nombre de tâches restantes
    get remainingTasks(): number {
        return this.todos.filter(todo => !todo.done).length;
    }

    // Propriété pour filtrer les tâches
    get filteredTask(): Todo[] {
        if (this.currentFilter === 'all') {
            return this.todos;
        } else if (this.currentFilter === 'todo') {
            return this.todos.filter((todo) => !todo.done);
        } else if (this.currentFilter === 'done') {
            return this.todos.filter((todo) => todo.done);
        }
        return this.todos;
    }

    public deleteAllTasks() {
        this.todos = [];
    }

    public deleteTask(index : number){
        //if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        this.todos.splice(index, 1);
        //}
    }

    public deleteFinishedTasks() {
        this.todos = this.todos.filter(todo => !todo.done);
    }

    //modifie le nom d'une tache lors d'un double clique
    public editTitle(index: number) {
        this.editIndex = index;
        this.editTitleValue = this.todos[index].title;
    }

    public saveTitle(index: number, event: Event) {
        const editedTitle = (event.target as HTMLElement).textContent?.trim();
        if (editedTitle && editedTitle !== this.todos[index].title) {
            this.todos[index].title = editedTitle;
        }
        // Retirer le focus de l'élément modifié
        (event.target as HTMLElement).blur();
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style-type: none;
}

.todos-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.todos-container2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.delete-btn {
    margin-left: 10px;
}

.space-between-btn {
    margin-right: 20px;
}

.text-tasks-remaining {
    color: #6AB8E6;
}

.filter-button {
    background-color: #ccc ;
}

.filter-button.active {
    background-color: #333333 ;
    color : white;
}

.space-selection-btn {
    margin-right: 10px;
}

.space-selection-btn:last-child {
    margin-right: 0;
}

.space-edit {
    margin-right: 5px;
}

.todo {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 10px;
}
</style>
