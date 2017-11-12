import Vue from 'vue';
import Router from 'vue-router';
import AllProjects from '../components/submissions/AllProjects';
import Assign from '../components/Assign';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Remarks from '../components/Remarks';
import SelectProjects from '../components/submissions/SelectProjects';
import Submissions from '../components/submissions/Submissions';
import SubmissionsIntro from '../components/submissions/Intro';

Vue.use(Router);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/remarks', name: 'Remarks', component: Remarks },
  { path: '/assign', name: 'Assign', component: Assign },
  { path: '/submissions',
    name: 'Submissions',
    component: Submissions,
    children: [
      { path: '', redirect: 'introduction' },
      { path: 'introduction', name: 'SubmissionsIntro', component: SubmissionsIntro },
      { path: 'all-projects', name: 'AllProjects', component: AllProjects },
      { path: 'select-projects', name: 'SelectProjects', component: SelectProjects },
    ],
  },
  { path: '*', name: 'Not Found', component: NotFound },
];

export default new Router({
  mode: 'history',
  base: __dirname,
  routes,
});
