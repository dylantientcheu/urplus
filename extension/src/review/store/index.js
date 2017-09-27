import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const state = {
  comments: [],
  critiques: [],
  generalComment: '',
  generalComments: [],
  price: 0,
  projectName: '',
  submissionCritiques: [],
  submissionId: 0,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
