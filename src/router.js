import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MainLayout from './layouts/main/MainLayout.vue';
import CreateTask from './views/CreateTask.vue';
import Search from './views/Search.vue';
import Auth from './views/Auth.vue';
import EmailConfirmation from './views/EmailConfirmation.vue';
import Task from './views/Task.vue';
import Entry from './Entry.vue';
import Application from './views/Application.vue';
import EditTask from './views/EditTask.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Entry,
      children: [
        {
          path: '/',
          component: MainLayout,
          children: [
            {
              path: '/',
              name: 'home',
              component: Home,
            },
            {
              path: '/auth/confirm-email/:hash',
              name: 'confirmEmail',
              component: EmailConfirmation,
            },
            {
              path: '/auth',
              name: 'auth',
              component: Auth,
            },
            {
              path: '/create-task',
              name: 'create',
              component: CreateTask,
            },
            {
              path: '/edit-task/:id',
              name: 'edit-task',
              component: EditTask,
            },
            {
              path: '/search',
              name: 'search',
              component: Search,
            },
            {
              path: '/task/:id',
              name: 'task',
              component: Task,
            },
            {
              path: '/applications/:id',
              name: 'application',
              component: Application,
            },
            {
              path: '/profile',
              name: 'profile',
              component: Profile,
            },
          ],
        },
      ],
    },
  ],
});
