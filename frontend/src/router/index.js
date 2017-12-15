import Vue from 'vue';
import Router from 'vue-router';
import Assign from '../components/Assign';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Remarks from '../components/Remarks';

Vue.use(Router);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/remarks', name: 'Remarks', component: Remarks },
  { path: '/assign', name: 'Assign', component: Assign },
  { path: '*', name: 'Not Found', component: NotFound },
];

export default new Router({
  mode: 'history',
  base: __dirname,
  routes,
});
