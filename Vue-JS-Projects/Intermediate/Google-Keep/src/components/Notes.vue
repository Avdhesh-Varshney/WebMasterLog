<template>
  <v-row>
    <v-col
      v-for="(note, idx) in notes"
      :key="idx"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
      class="d-flex flex-column"
    >
      <NoteItem :note="note" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NoteItem from './Note.vue';
import { Note } from '@/store/types';
import { namespace } from 'vuex-class';

const notesModule = namespace('notes');

@Component({
  components: {
    NoteItem,
  },
})
export default class Notes extends Vue {
  @notesModule.State
  notes!: Note[];
}
</script>
