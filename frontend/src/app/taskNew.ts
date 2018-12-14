
export class Task {

    _id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    daysPerWeek: number[];
    repeat: string;
    checklist: {};
    doneCount = 0;
    count: 0;
    notes: string;

    constructor(object) {
        this._id = object._id;
        this.name = object.name;
        this.description = object.description;
        this.startDate = object.startDate;
        this.endDate = object.endDate;
        this.repeat = object.repeat;
        this.daysPerWeek = object.daysPerWeek;
        if (!!object.doneCount) {this.doneCount = object.doneCount; }
        this.count = object.count;
        if (!!object.checklist) {this.checklist = object.checklist; } else {this.checklist = {}; }
        this.notes = object.notes;
    }
}
