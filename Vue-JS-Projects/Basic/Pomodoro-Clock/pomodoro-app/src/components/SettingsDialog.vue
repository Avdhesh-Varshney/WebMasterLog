<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Settings</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-for="(timer, i) in updatedTimers"
          :key="i"
          label="Pomodoro"
          v-model="updatedTimers[i]"
          type="number"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="save(updatedTimers)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      require: true
    },
    closeDialog: {
      type: Function,
      required: true
    },
    timers: {
      type: Array,
      required: true
    },
    save: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      updatedTimers: []
    }
  },
  mounted() {
    this.updatedTimers = this.timers.map((timer) => {
      return timer.minutes
    })
  }
}
</script>
