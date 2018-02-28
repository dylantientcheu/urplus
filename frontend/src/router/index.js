import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '../components/NotFound';
import Remarks from '../components/Remarks';

Vue.use(Router);

const routes = [
  { path: '/', redirect: '/remarks' },
  { path: '/remarks', name: 'Remarks', component: Remarks },
  { path: '*', name: 'Not Found', component: NotFound },
];

export default new Router({
  mode: 'history',
  base: __dirname,
  routes,
});
