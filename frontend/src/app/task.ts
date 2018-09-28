import { Checklist } from './checklist';

export class Task {

    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    type: string;
    checklist: Checklist[];
    checklist2: any;

    constructor(object) {
        this.name = object.name;
        this.description = object.description;
        this.startDate = object.startDate;
        this.endDate = object.endDate;
        this.type = object.type;

        this.checklist2 = {};
        this.constructCheckboxList();
    }

    // With checklist as map object
    constructCheckboxList() {
        const currentDate = new Date(this.startDate);
        if (this.type === 'Daily') {
            while (currentDate.getMonth() !== this.endDate.getMonth() || currentDate.getDate() !== this.endDate.getDate()) {
                this.checklist2[currentDate.toDateString()] = new Checklist(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            this.checklist2[currentDate.toDateString()] = new Checklist(new Date(currentDate));
        } else if (this.type === 'Weekly') {
            // Add checkbox for current week
            currentDate.setDate(currentDate.getDate() - currentDate.getDay());

            // Add rest of Weeks
            while (currentDate.getMonth() !== this.endDate.getMonth() || currentDate.getDate() !== this.endDate.getDate()) {
                if (currentDate.getDay() === 0) {
                    this.checklist2[currentDate.toDateString()] = new Checklist(new Date(currentDate));
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

        } else if (this.type === 'Monthly') {
            currentDate.setDate(1);
            while (currentDate.getMonth() !== this.endDate.getMonth()) {
                this.checklist2[currentDate.toDateString()] = new Checklist(new Date(currentDate));
                currentDate.setMonth(currentDate.getMonth() + 1);
                currentDate.setDate(1);
            }
            this.checklist2[currentDate.toDateString()] = new Checklist(new Date(currentDate));
        }
    }

    ifShouldShow(date: Date) {
        if (this.type === 'Daily') {
            if (this.checklist2[date.toDateString()]) {
                return true;
            } else {
                return false;
            }
        } else if (this.type === 'Weekly') {
            const weekStartDate = new Date(date);
            weekStartDate.setDate(date.getDate() - (date.getDay()));
            if (this.checklist2[weekStartDate.toDateString()] !== undefined) {
                return true;
            } else {
                return false;
            }
        } else if (this.type === 'Monthly') {
            const monthStartDate = new Date(date);
            monthStartDate.setDate(1);
            if (this.checklist2[monthStartDate.toDateString()] !== undefined) {
                return true;
            } else {
                return false;
            }
        }
    }

    getCheckBox(date: Date) {

        if (this.type === 'Daily') {
            return this.checklist2[date.toDateString()].done;
        } else if (this.type === 'Weekly') {
            const weekStartDate = new Date(date);
            weekStartDate.setDate(date.getDate() - (date.getDay()));
            return this.checklist2[weekStartDate.toDateString()].done;
        } else if (this.type === 'Monthly') {
            const monthStartDate = new Date(date);
            monthStartDate.setDate(1);
            return this.checklist2[monthStartDate.toDateString()].done;
        }
    }

    toggleCheckBox(date: Date) {

            if (this.type === 'Daily') {
                this.checklist2[date.toDateString()].toggle();
            } else if (this.type === 'Weekly') {
                const weekStartDate = new Date(date);
                weekStartDate.setDate(date.getDate() - (date.getDay()));
                this.checklist2[weekStartDate.toDateString()].toggle();
            } else if (this.type === 'Monthly') {
                const monthStartDate = new Date(date);
                monthStartDate.setDate(1);
                this.checklist2[monthStartDate.toDateString()].toggle();
            }
    }
}
