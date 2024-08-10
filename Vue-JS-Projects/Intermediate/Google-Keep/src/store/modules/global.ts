import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Note, Snackbar, EditNoteField } from '@/store/types';
import { SnackbarColorTypes, CardColorTypes } from '@/store/types';

@Module({
  namespaced: true
})
export default class GlobalModal extends VuexModule {
  selectedNote: Note = {
    id: '',
    title: '',
    content: '',
    color: CardColorTypes.Default
  };
  showNoteDialog = false;
  snackbar: Snackbar = {
    open: false,
    text: '',
    color: SnackbarColorTypes.Success
  };
  colorMenuOpen = false;

  @Mutation
  setSelectedNote(note: Note) {
    this.selectedNote = note;
  }

  @Mutation
  setNoteField(payload: EditNoteField) {
    this.selectedNote = {
      ...this.selectedNote,
      [payload.name]: payload.value
    };
  }

  @Mutation
  setShowNoteDialog(payload: boolean) {
    this.showNoteDialog = payload;
  }

  @Mutation
  showSnackbar(payload: Snackbar) {
    this.snackbar = payload;
  }

  @Mutation
  setColorMenuOpen(payload: boolean) {
    this.colorMenuOpen = payload;
  }
}
