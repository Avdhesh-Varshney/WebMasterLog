<template>
  <v-card class="mt-8">
    <v-tabs @change="changeCurrentTimer" v-model="currentTimer" grow>
      <v-tab
        v-for="timer in timers"
        :key="timer.name"
      >
        {{ timer.name }}
      </v-tab>
    </v-tabs>

    <v-card
      class="pa-5 d-flex flex-column justify-center align-center"
      flat
    >
      <h1 class="time">
        {{ displayMinutes }}:{{ displaySeconds }}
      </h1>

      <div class="button-group">
        <v-btn @click="start" color="primary">
          <v-icon left small>mdi-play-circle-outline</v-icon>
          Start
        </v-btn>
        <v-btn @click="stop" color="error">
          <v-icon left small>mdi-stop-circle-outline</v-icon>
          Stop
        </v-btn>
        <v-btn @click="reset(timers[currentTimer].minutes)" :disabled="isRunning">
          <v-icon left small>mdi-restart</v-icon>
          Reset
        </v-btn>
      </div>
    </v-card>

    <SettingsDialog
      :dialog="dialog"
      :closeDialog="closeDialog"
      :timers="timers"
      :save="save"
    />
  </v-card>
</template>

<script>
import SettingsDialog from './SettingsDialog.vue'

export default {
  components: {
    SettingsDialog
  },
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    closeDialog: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isRunning: false,
      timerInstance: null,
      totalSeconds: 25 * 60,
      currentTimer: 0,
      timers: [
        {
          name: 'Pomodoro',
          minutes: 25
        },
        {
          name: 'Short Break',
          minutes: 5
        },
        {
          name: 'Long Break',
          minutes: 10
        }
      ]
    }
  },
  computed: {
    displayMinutes() {
      const minutes = Math.floor(this.totalSeconds / 60)
      return this.formatTime(minutes)
    },
    displaySeconds() {
      const seconds = this.totalSeconds % 60
      return this.formatTime(seconds)
    }
  },
  methods: {
    formatTime(time) {
      if (time < 10) {
        return '0' + time
      }
      return time.toString()
    },
    start() {
      this.stop()
      this.isRunning = true
      this.timerInstance = setInterval(() => {
        if (this.totalSeconds <= 0) {
          this.stop()
          return
        }
        this.totalSeconds -= 1
      }, 1000)
    },
    stop() {
      this.isRunning = false
      clearInterval(this.timerInstance)
    },
    reset(minutes) {
      this.stop()
      this.totalSeconds = minutes * 60
    },
    changeCurrentTimer(num) {
      this.currentTimer = num
      this.reset(this.timers[num].minutes)
    },
    save(updatedTimers) {
      this.timers = this.timers.map((timer, i) => {
        return { ...timer, minutes: parseInt(updatedTimers[i]) }
      })
	  this.totalSeconds = this.timers[this.currentTimer].minutes * 60;
      this.closeDialog()
    }
  }
}
</script>

<style lang="sass" scoped>
.v-card
  width: 600px
.v-btn
  margin: 0 2px
.time
  font-size: 80px
  font-weight: 400
  text-align: center
</style>
