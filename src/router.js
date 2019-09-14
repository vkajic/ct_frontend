import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MainLayout from './layouts/main/MainLayout.vue';
import CreateTask from './views/CreateTask.vue';
import Search from './views/Search.vue';
import EmailConfirmation from './views/EmailConfirmation.vue';
import Task from './views/Task.vue';
import Entry from './Entry.vue';
import Application from './views/Application.vue';
import EditTask from './views/EditTask.vue';
import Profile from './views/Profile.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import ResetPassword from './views/ResetPassword.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import CreateFreelancer from './views/CreateFreelancer.vue';
import BasicInfo from './views/createFreelancer/BasicInfo.vue';
import Skills from './views/createFreelancer/Skills.vue';
import Experience from './views/createFreelancer/Experience.vue';
import Projects from './views/createFreelancer/Projects.vue';
import Preview from './views/createFreelancer/Preview.vue';
import MyJobs from './views/MyJobs.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/sign-up',
          name: 'signUp',
          component: SignUp,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword,
        },
        {
          path: '/reset-password/:hash',
          name: 'resetPassword',
          component: ResetPassword,
        },
        {
          path: '/',
          component: Entry,
          children: [
            {
              path: '/',
              name: 'home',
              component: Home,
            },
            {
              path: 'create-freelancer',
              component: CreateFreelancer,
              children: [
                {
                  path: 'basic-info',
                  name: 'basicInfo',
                  component: BasicInfo,
                },
                {
                  path: 'skills',
                  name: 'skills',
                  component: Skills,
                },
                {
                  path: 'experience',
                  name: 'experience',
                  component: Experience,
                },
                {
                  path: 'projects',
                  name: 'projects',
                  component: Projects,
                },
                {
                  path: 'preview',
                  name: 'preview',
                  component: Preview,
                },
              ],
            },
            {
              path: '/auth/confirm-email/:hash',
              name: 'confirmEmail',
              component: EmailConfirmation,
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
              path: '/my-jobs',
              name: 'myJobs',
              component: MyJobs,
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
