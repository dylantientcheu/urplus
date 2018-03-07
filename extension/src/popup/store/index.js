import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
  activeReview: null,
  currency: 'USD',
  dailyUSDIncome: 0,
  monthlyUSDIncome: 0,
  rates: {
    USD: 1,
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
