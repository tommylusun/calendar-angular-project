export class Checklist {

    done: boolean;
    date: Date;

    constructor(date) {
        this.date = date;
        this.done = false;
    }

    toggle() {
        this.done = !this.done;
        return this.done;
    }
}
