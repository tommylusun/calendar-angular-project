import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.css']
})
export class NotesViewComponent implements OnInit {

  newNote: string;
  notes: string[];

  constructor() { }

  ngOnInit() {
    this.notes = [];
  }
  toggleNoteInput() {
  }
  addNote() {
    this.notes.push(this.newNote);
  }
}
