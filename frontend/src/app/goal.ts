import { Task } from './taskNew';

export class Goal {

    id: string;
    name: string;
    description: string;
    tasks: Task[];
    notes: string;
    color: string;
    complete: boolean;

    constructor(object) {
        this.id = object.id;
        this.name = object.name;
        this.description = object.description;
        if (!!object.tasks) {this.tasks = object.tasks; }
        if (!!object.notes) {this.notes = object.notes; }
        this.color = object.color;
    }
}
