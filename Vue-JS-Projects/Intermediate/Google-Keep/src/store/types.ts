export enum SnackbarColorTypes {
  Success = 'success',
  Error = 'error',
  Info = 'info'
}

export enum CardColorTypes {
  Default = 'none',
  Red = 'red accent-1',
  Orange = 'orange accent-2',
  Yellow = 'yellow accent-1',
  Green = 'light-green accent-1',
  Blue = 'cyan lighten-4',
  Purple = 'purple lighten-4',
  Pink = 'pink lighten-4'
}

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
}

export type NewNote = Omit<Note, 'id'>;

export interface Snackbar {
  open: boolean;
  text: string;
  color: SnackbarColorTypes;
}

export interface EditNoteField {
  name: string;
  value: string;
}

export type CardColors = keyof typeof CardColorTypes;