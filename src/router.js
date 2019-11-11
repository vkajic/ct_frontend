import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MainLayout from './layouts/main/MainLayout.vue';
import CreateTask from './views/client/CreateTask.vue';
import Search from './views/freelancer/Search.vue';
import EmailConfirmation from './views/auth/EmailConfirmation.vue';
import Task from './views/freelancer/Task.vue';
import Entry from './Entry.vue';
import ApplicationApplied from './views/freelancer/ApplicationApplied.vue';
import EditTask from './views/client/EditTask.vue';
import ForgotPassword from './views/auth/ForgotPassword.vue';
import ResetPassword from './views/auth/ResetPassword.vue';
import Login from './views/auth/Login.vue';
import SignUp from './views/auth/SignUp.vue';
import CreateFreelancer from './views/freelancer/CreateFreelancer.vue';
import BasicInfo from './views/freelancer/createFreelancer/BasicInfo.vue';
import Skills from './views/freelancer/createFreelancer/Skills.vue';
import Experience from './views/freelancer/createFreelancer/Experience.vue';
import Projects from './views/freelancer/createFreelancer/Projects.vue';
import Preview from './views/freelancer/createFreelancer/Preview.vue';
import MyTasks from './views/client/MyTasks.vue';
import TokenService from './services/token.service';
import CreateClient from './views/client/CreateClient.vue';
import ClientBasicInfo from './views/client/createClient/ClientBasicInfo.vue';
import Applications from './views/freelancer/Applications.vue';
import InProgress from './views/freelancer/InProgress.vue';
import ApplicationWorking from './views/freelancer/ApplicationWorking.vue';
import MyTask from './views/client/MyTask.vue';
import Freelancers from './views/client/Freelancers.vue';
import Freelancer from './views/client/Freelancer.vue';
import ChangePassword from './views/auth/ChangePassword.vue';
import UpdateProfile from './views/common/UpdateProfile.vue';

Vue.use(Router);

const router = new Router({
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
          path: '/confirm-email/:hash',
          name: 'confirmEmail',
          component: EmailConfirmation,
        },
        {
          path: '/',
          component: Entry,
          meta: { requiresAuth: true },
          children: [
            {
              path: '/',
              name: 'home',
              component: Home,
            },
            {
              path: '/change-password',
              name: 'changePassword',
              component: ChangePassword,
            },
            {
              path: '/profile',
              name: 'updateProfile',
              component: UpdateProfile,
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
                  path: 'work-experience',
                  name: 'workExperience',
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
              path: 'create-client',
              component: CreateClient,
              children: [
                {
                  path: 'basic-info',
                  name: 'clientBasicInfo',
                  component: ClientBasicInfo,
                },
              ],
            },
            {
              path: '/create-task',
              name: 'create',
              component: CreateTask,
            },
            {
              path: '/tasks',
              name: 'tasks',
              component: Search,
            },
            {
              path: '/tasks/:id',
              name: 'task',
              component: Task,
            },
            {
              path: '/my-tasks',
              name: 'myTasks',
              component: MyTasks,
            },
            {
              path: '/my-tasks/:id/edit',
              name: 'edit-task',
              component: EditTask,
            },
            {
              path: '/my-tasks/:id',
              name: 'myTask',
              component: MyTask,
            },
            {
              path: '/applications',
              name: 'applications',
              component: Applications,
            },
            {
              path: '/applications/:id',
              name: 'application',
              component: ApplicationApplied,
            },
            {
              path: '/in-progress',
              name: 'inProgress',
              component: InProgress,
            },
            {
              path: '/in-progress/:id',
              name: 'inProgressItem',
              component: ApplicationWorking,
            },
            {
              path: '/freelancers',
              name: 'freelancers',
              component: Freelancers,
            },
            {
              path: '/freelancers/:id',
              name: 'freelancerPublicProfile',
              component: Freelancer,
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = TokenService.getToken();
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
