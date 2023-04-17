<template>
    <div class="todo">
        <!-- Ajout du formulaire -->
        <div class="container">
            <div class="column todo-form">
                <!-- Ajouter une tâche -->
                <h2>Ajouter une tâche</h2>
                <form @submit.prevent="addTodo">
                    <div class="new-task">
                        <label for="title">Titre : </label>
                        <input type="text" id="title" v-model="newTodo.title" required>
                    </div>
                    <div class="new-task">
                        <label for="description">Description : </label>
                        <input type="text" id="description" v-model="newTodo.description">
                    </div>
                    <div class="new-task">
                        <label for="deadline">Date limite : </label>
                        <input type="date" id="deadline" v-model="newTodo.deadline" required>
                    </div>

                    <button type="submit">Ajouter</button>
                </form>
            </div>
            <div class="column todo-list">
                <!-- Liste des tâches -->
                <div>
                    <div class="todos-container">
                        <button @click="deleteAllTasks" class="delete-btn1">Supprimer toutes les tâches</button>
                        <h2>Liste des tâches</h2>
                        <button @click="deleteFinishedTasks" class="delete-btn2">Supprimer les tâches terminées</button>
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
                        <span>- {{ todo.description }} - {{ todo.deadline }} </span>
                        <button @click="validateTask(index)"
                                :style="{ backgroundColor: todo.done ? '#4CAF50' : '#ccc' }" class="button-valid">{{ todo.done ? 'FAIT' : 'valider la tâche' }}</button>
                        <button @click="deleteTask(index)" class="delete-btn2">Supprimer</button>
                    </li>
                </ul>
            </div>
        </div>
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
/* Mise en place des colonnes */
.container {
    display: flex;
}

.column {
    flex: 1;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Affichage du texte a la ligne */
.new-task {
    display: flex;
}

.new-task label {
    flex-basis: 30%;
    text-align: left;
}

.new-task input {
    flex-basis: 70%;
    text-align: center;
}

.new-task * {
    margin: 10px;
}

/* Style de l'affichage des boutons de suppression */
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

/* Style pour ajouter un espace */
.space-between-btn {
    margin-right: 20px;
}

.space-edit {
    margin-right: 5px;
}

/* Style pour changer la couleur du texte du nombre de taches restantes */
.text-tasks-remaining {
    color: #6AB8E6;
}

/* Style pour ajouter un espace entre deux boutons */
.space-selection-btn {
    margin-right: 10px;
}

.space-selection-btn:last-child {
    margin-right: 0;
}

/* Style de l'ensemble */
.todo {
    border: 3px solid #ccc;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 8px;
}

/* Définit la taille de la colonne de gauche */
.todo-form {
    flex-basis: 30%;
}

/* Définit la taille de la colonne de droite */
.todo-list {
    flex-basis: 70%;
}

/* Style pour la liste de tâches */
ul {
    list-style-type: none;
}

/* Style pour les boutons */
button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #3e8e41;
}

.button-valid {
    padding: 5px;
    margin-left: 10px;
    color: black;
}

.delete-btn1 {
    background-color: #f44336;
    margin-right: auto;
}

.delete-btn1:hover {
    background-color: #d32f2f;
}

.delete-btn2 {
    background-color: #f44336;
    margin-left: auto;
}

.delete-btn2:hover {
    background-color: #d32f2f;
}

.delete-container {
    justify-content: space-between;
}
/* Style pour la barre de sélection de filtres */
.filter-button {
    background-color: #ccc;
    border: none;
    color: #333;
    padding: 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.filter-button.active {
    background-color: #8c8c8c;
    color: white;
}

.filter-button:hover {
    background-color: #ddd;
}
</style>
