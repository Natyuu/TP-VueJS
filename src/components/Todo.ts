export class Todo {
    title: string;
    description: string;
    deadline: string;
    done: boolean;

    constructor(title: string, description: string, deadline: string, done: boolean = false) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.done = done;
    }
}
