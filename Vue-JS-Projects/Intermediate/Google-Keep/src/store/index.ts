import Vue from 'vue';
import Vuex from 'vuex';

import global from '@/store/modules/global';
import notes from '@/store/modules/notes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    notes
  }
});
