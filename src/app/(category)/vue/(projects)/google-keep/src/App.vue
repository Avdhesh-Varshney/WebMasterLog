<template>
  <v-app>
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="30"
        />

        <v-toolbar-title>VueKeep</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon @click="refresh" :loading="refreshLoading">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/sorxrob/vue-keep" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="mt-3">
        <Create />

        <div class="text-center mt-2" v-if="loading">
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>

        <Notes v-else />

        <NoteModal />

        <v-snackbar v-model="snackbar.open" :color="snackbar.color">{{ snackbar.text }}</v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Create from './components/Create.vue';
import Notes from './components/Notes.vue';
import NoteModal from './components/NoteModal.vue';
import { namespace } from 'vuex-class';
import { Snackbar, Note } from './store/types';

const notesModule = namespace('notes');
const globalModule = namespace('global');

@Component({
  components: {
    Create,
    Notes,
    NoteModal,
  },
})
export default class App extends Vue {
  loading = true;
  refreshLoading = false;

  async created() {
    this.loading = true;
    await this.getNotes();
    this.loading = false;
  }

  async refresh() {
    this.refreshLoading = true;
    await this.getNotes();
    this.refreshLoading = false;
  }

  @globalModule.State
  snackbar!: Snackbar;

  @notesModule.Action
  getNotes!: () => Promise<Note[]>;
}
</script>
