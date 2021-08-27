import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  userName: window.sessionStorage.getItem('userName') || '',
  photo: window.sessionStorage.getItem('photo') || ''
};
const mutations = {
  SetUserName (state, payload) {
    state.userName = payload;
  },
  SetPhoto (state, payload) {
    state.photo = payload;
  }
};
const actions = {};
export default new Vuex.Store({
  state,
  mutations,
  actions
});
