import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Note, NewNote } from '../types';
import { db } from '@/firebase';
import { CardColorTypes } from '@/store/types';

@Module({
  namespaced: true
})
export default class NotesModule extends VuexModule {
  notes: Note[] = [];

  @Mutation
  setNotes(notes: Note[]) {
    this.notes = notes;
  }

  @Mutation
  addNote(note: Note) {
    this.notes.unshift(note);
  }

  @Mutation
  removeNote(id: string) {
    const idx = this.notes.findIndex(i => i.id === id);
    if (idx !== -1) {
      this.notes.splice(idx, 1);
    }
  }

  @Mutation
  setNote(note: Note) {
    const idx = this.notes.findIndex(i => i.id === note.id);
    if (idx !== -1) {
      this.notes[idx].title = note.title;
      this.notes[idx].content = note.content;
      this.notes[idx].color = note.color || CardColorTypes.Default;
    }
  }

  @Action({ commit: 'setNotes' })
  async getNotes() {
    const notes = await db.getNotes();
    return notes;
  }

  @Action({ commit: 'addNote' })
  async createNote(note: NewNote) {
    const data = await db.createNote(note);
    return data;
  }

  @Action({ commit: 'removeNote' })
  async removeNoteAsync(id: string) {
    await db.deleteNote(id);
    return id;
  }

  @Action({ commit: 'setNote' })
  async updateNote(note: Note) {
    await db.updateNote(note);
    return note;
  }
}
