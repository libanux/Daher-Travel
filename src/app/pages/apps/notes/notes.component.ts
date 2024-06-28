
import { Component, OnInit } from '@angular/core';
import { Note } from '../../../classes/note';
import { NoteService } from 'src/app/services/note.service';
import { BreadCrumbSignalService } from 'src/app/signals/BreadCrumbs.signal.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class AppNotesComponent implements OnInit {


  sidePanelOpened = true;
  notes: any[] = []
  newNote: Note
  selectedNote: Note = Object.create(null);
  active: boolean = false;
  searchText = '';


  adminid: string = ''
  constructor(public noteService: NoteService, private breadCrumbService :BreadCrumbSignalService) {
    this.newNote = new Note();
    const admin_id = localStorage.getItem("admin_id");
    this.adminid = admin_id !== null ? admin_id : "";
    this.selectedNote.text = "New Note"
    this.selectedNote.adminid = this.adminid
  }
  ngOnInit(): void {
    this.breadCrumbService.currentRoute.set('Notes')
    this.FETCH_NOTES();
  }

  //FETCH NOTES FROM API
  FETCH_NOTES(): void {
    this.noteService.GET_NOTES().subscribe({
      next: (response: any) => {
        this.notes = response;
        if (this.notes.length > 0) {
          // Sort the notes by createdAt date in descending order
          this.notes.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          this.selectedNote = this.notes[0];
        }
      },
      error: (error: any) => {
        console.error("Error:", error);
      },
      complete: () => {
      }
    });
  }
  SEARCH_NOTES() {
    this.noteService.SEARCH_NOTE(this.searchText).subscribe({
      next: (response: any) => {
        this.notes = response;
        if (this.notes.length > 0) {
          // Sort the notes by createdAt date in descending order
          this.notes.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          this.selectedNote = this.notes[0];
        }
      },
      error: (error: any) => {
        console.error("Error:", error);
      },
      complete: () => {
      }
    });
  }

  onSelect(note: Note): void {
    this.selectedNote = note;
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }


  DELETE_NOTE(note: Note) {
    this.noteService.DELETE_NOTE(note).subscribe({
      next: (response: any) => {
        this.FETCH_NOTES()
      },
      error: (error: any) => {
        console.error("Error:", error)
      },
      complete: () => {
      }
    });
  }

  //ADD NEW NOTE
  ADD_NOTE() {
    this.newNote.title = 'New Note'
    this.newNote.adminid = this.adminid
    this.newNote.text = 'New Note'
    this.newNote.status = 'pending'
    this.noteService.ADD_NOTE(this.newNote).subscribe({
      next: (response: any) => {
        this.FETCH_NOTES()
      },
      error: (error: any) => {
        console.error("Error:", error)
      },
      complete: () => {
      }
    });
  }

  //ADD NEW NOTE
  UPDATE_NOTE() {
    this.noteService.UPDATE_NOTE(this.selectedNote).subscribe({
      next: (response: any) => {
        this.FETCH_NOTES()
      },
      error: (error: any) => {
        console.error("Error:", error)
      },
      complete: () => {
      }
    });
  }

}
