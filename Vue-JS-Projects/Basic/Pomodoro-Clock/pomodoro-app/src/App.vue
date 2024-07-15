<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col sm="6" offset-sm="3">
            <Pomodoro :dialog="dialog" :closeDialog="closeDialog" />
          </v-col>
          <v-btn
            @click="dialog = true"
            color="secondary"
            dark
            small
            top
            right
            fab
          >
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Pomodoro from './components/Pomodoro';

export default {
  name: 'App',

  components: {
    Pomodoro,
  },

  data() {
    return {
      dialog: false
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false
    }
  }
};
</script>
