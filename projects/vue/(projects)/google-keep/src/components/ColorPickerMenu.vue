<template>
  <v-menu open-on-hover :close-on-content-click="false" top offset-y v-model="open">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-palette-outline</v-icon>
      </v-btn>
    </template>
    <v-card max-width="160" tile>
      <v-card-text class="pa-2 d-flex flex-wrap">
        <v-tooltip
          color="grey darken-3"
          bottom
          v-for="(value, name) in colors"
          :key="name"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              :color="`${name !== 'Default' ? value : ''}`"
              @click="colorSelected(name)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{
                  name !== 'Default'
                    ? selectedIcon(value, false)
                    : selectedIcon(value, true)
                }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ name }}</span>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { CardColorTypes } from '../store/types';
import { CardColors } from '../store/types';
import { namespace } from 'vuex-class';

const globalModule = namespace('global');

@Component
export default class ColorPickerMenu extends Vue {
  @Prop({ type: String, required: true })
  selected!: string;
  open = false;

  @globalModule.Mutation
  setColorMenuOpen!: (payload: boolean) => void;

  get colors() {
    return CardColorTypes;
  }

  selectedIcon(color: string, blank: boolean): string {
    const defaultIcon = blank
      ? 'mdi-checkbox-blank-circle-outline'
      : 'mdi-checkbox-blank-circle';
    const checkedIcon = blank ? 'mdi-check-circle-outline' : 'mdi-checkbox-marked-circle';
    return this.selected === color ? checkedIcon : defaultIcon;
  }

  @Emit('color-selected')
  colorSelected(color: CardColors): CardColors {
    return color;
  }

  @Watch('open')
  menuChanged(val: boolean) {
    this.setColorMenuOpen(val);
  }
  
}
</script>
