export class Todo {
    title: string;
    description: string;
    deadline: string;
    done: boolean;
    edit: boolean;

    constructor(title: string, description: string, deadline: string, done: boolean = false, edit: boolean = false) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.done = done;
        this.edit = edit;
    }
}
