import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import store from './store';
import Home from './views/Home.vue';
import CreateTask from './views/client/CreateTask.vue';
import Search from './views/freelancer/Search.vue';
import EmailConfirmation from './views/auth/EmailConfirmation.vue';
import Task from './views/freelancer/Task.vue';
import Entry from './Entry.vue';
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
import CreateClient from './views/client/CreateClient.vue';
import ClientBasicInfo from './views/client/createClient/ClientBasicInfo.vue';
import MyTask from './views/client/MyTask.vue';
import Freelancers from './views/client/Freelancers.vue';
import Freelancer from './views/client/Freelancer.vue';
import ChangePassword from './views/auth/ChangePassword.vue';
import UpdateProfile from './views/common/UpdateProfile.vue';
import Chats from './views/common/Chats.vue';
import Applications from './views/freelancer/Applications.vue';
import InProgressApplications from './views/freelancer/InProgressApplications.vue';
import CompletedApplications from './views/freelancer/CompletedApplications.vue';
import Application from './views/freelancer/Application.vue';
import MyPublicProfile from './views/common/MyPublicProfile.vue';
import Client from './views/freelancer/Client.vue';
import Unsubscribe from './views/common/Unsubscribe.vue';
import NotFound from './views/errors/404.vue';
import Affiliate from './views/common/Affiliate.vue';

const domains = {
  'cryptotask.local': 'en',
  'app.cryptotask.org': 'en',
  'app.dev.cryptotask.org': 'en',
  'freelancer.local': 'hr',
  'freelancer.hr': 'hr',
  'app.freelancer.hr': 'hr',
  'app.dev.freelancer.hr': 'hr',
};

const languages = ['en', 'hr', 'es', 'vn'];

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:lang/',
      component: Entry,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { requiresAuth: true },
        },
        {
          path: 'change-password',
          name: 'changePassword',
          component: ChangePassword,
          meta: { requiresAuth: true },
        },
        {
          path: 'profile/preview',
          name: 'previewProfile',
          component: MyPublicProfile,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'profile',
          name: 'updateProfile',
          component: UpdateProfile,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'affiliate',
          name: 'Affiliate',
          component: Affiliate,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'create-task',
          name: 'create',
          component: CreateTask,
          meta: {
            requiresAuth: true,
            menuWidth: 2,
            forbidAccess: 'freelancer',
          },
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: Search,
        },
        {
          path: 'tasks/:id',
          name: 'task',
          component: Task,
        },
        {
          path: 'my-tasks',
          name: 'myTasks',
          component: MyTasks,
          meta: {
            requiresAuth: true,
            forbidAccess: 'freelancer',
          },
        },
        {
          path: 'my-tasks/:id/edit',
          name: 'edit-task',
          component: EditTask,
          meta: {
            requiresAuth: true,
            menuWidth: 2,
            forbidAccess: 'freelancer',
          },
        },
        {
          path: 'my-tasks/:id',
          name: 'myTask',
          component: MyTask,
          meta: {
            requiresAuth: true,
            menuWidth: 2,
            forbidAccess: 'freelancer',
          },
        },
        {
          path: 'applications',
          name: 'applications',
          component: Applications,
          meta: {
            requiresAuth: true,
            forbidAccess: 'client',
          },
        },
        {
          path: 'applications/:id',
          name: 'application',
          component: Application,
          meta: {
            requiresAuth: true,
            forbidAccess: 'client',
          },
        },
        {
          path: 'in-progress',
          name: 'inProgress',
          component: InProgressApplications,
          meta: {
            requiresAuth: true,
            forbidAccess: 'client',
          },
        },
        {
          path: 'in-progress/:id',
          name: 'inProgressApplication',
          component: Application,
          meta: {
            requiresAuth: true,
            forbidAccess: 'client',
          },
        },
        {
          path: 'completed',
          name: 'completed',
          component: CompletedApplications,
          meta: {
            requiresAuth: true,
            forbidAccess: 'client',
          },
        },
        {
          path: 'completed/:id',
          name: 'completedApplication',
          component: Application,
          meta: {
            requiresAuth: true,
            forbidAccess: 'client',
          },
        },
        {
          path: 'messages',
          name: 'chats',
          component: Chats,
          meta: { requiresAuth: true },
        },
        {
          path: 'freelancers',
          name: 'freelancers',
          component: Freelancers,
        },
        {
          path: 'freelancers/:id',
          name: 'freelancerPublicProfile',
          component: Freelancer,
        },
        {
          path: 'clients/:id',
          name: 'clientPublicProfile',
          component: Client,
          meta: { requiresAuth: false },
        },
        {
          path: 'create-freelancer',
          component: CreateFreelancer,
          meta: {
            requiresAuth: true,
            forbidAccess: 'client',
            menuWidth: 0,
            layout: 'profile',
          },
          children: [
            {
              path: 'basic-info',
              name: 'basic-info',
              component: BasicInfo,
              meta: {
                layout: 'profile',
                requiresAuth: true,
                forbidAccess: 'client',
                menuWidth: 0,
              },
            },
            {
              path: 'skills',
              name: 'skills',
              component: Skills,
              meta: {
                layout: 'profile',
                requiresAuth: true,
                forbidAccess: 'client',
                menuWidth: 0,
              },
            },
            {
              path: 'work-experience',
              name: 'work-experience',
              component: Experience,
              meta: {
                layout: 'profile',
                requiresAuth: true,
                forbidAccess: 'client',
                menuWidth: 0,
              },
            },
            {
              path: 'projects',
              name: 'projects',
              component: Projects,
              meta: {
                layout: 'profile',
                requiresAuth: true,
                forbidAccess: 'client',
                menuWidth: 0,
              },
            },
            {
              path: 'preview',
              name: 'preview',
              component: Preview,
              meta: {
                layout: 'profile',
                requiresAuth: true,
                forbidAccess: 'client',
                menuWidth: 0,
              },
            },
          ],
        },
        {
          path: 'create-client',
          component: CreateClient,
          meta: {
            requiresAuth: true,
            forbidAccess: 'freelancer',
            layout: 'profile',
          },
          children: [
            {
              path: 'basic-info',
              name: 'clientBasicInfo',
              component: ClientBasicInfo,
              meta: {
                requiresAuth: true,
                forbidAccess: 'freelancer',
                menuWidth: 0,
              },
            },
          ],
        },
        {
          path: 'login',
          name: 'login',
          component: Login,
          meta: {
            layout: 'auth',
          },
        },
        {
          path: 'sign-up',
          name: 'signUp',
          component: SignUp,
          meta: {
            layout: 'auth',
          },
        },
        {
          path: 'forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword,
          meta: {
            layout: 'auth',
          },
        },
        {
          path: 'reset-password/:hash',
          name: 'resetPassword',
          component: ResetPassword,
          meta: {
            layout: 'auth',
          },
        },
        {
          path: 'confirm-email/:hash',
          name: 'confirmEmail',
          component: EmailConfirmation,
          meta: {
            layout: 'auth',
          },
        },
        {
          path: 'unsubscribe/:hash',
          name: 'newsletterUnsubscribe',
          component: Unsubscribe,
          meta: {
            layout: 'auth',
          },
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const { hostname } = window.location;
  const { lang } = to.params;
  const langExists = languages.indexOf(lang) > -1;
  const domainLang = domains[hostname] || 'en';
  const defaultLang = langExists ? lang : domainLang;
  const langRoute = `/${defaultLang}`;
  const redirectTo = langExists ? to.fullPath : `${langRoute}${to.fullPath}`;

  // init users data
  try {
    await store.dispatch('util/setActiveLanguage', defaultLang);
    await store.dispatch('user/init');
    const role = store.state.user.activeRole;

    if (to.meta.forbidAccess && role === to.meta.forbidAccess) {
      console.log('router 1');
      next({
        path: langRoute,
      });
    } else if (to.fullPath !== redirectTo) {
      console.log('router 2');
      next({ path: redirectTo });
    } else {
      console.log('router 3');
      next();
    }
  } catch (err) {
    if (to.meta.requiresAuth && to.meta.layout !== 'auth') {
      console.log('router 4', to);
      next({
        path: `${langRoute}/login`,
        query: { redirect: to.path, ...to.query },
      });
    } else if (to.fullPath !== redirectTo) {
      console.log('router 5');
      next({ path: redirectTo });
    } else {
      console.log('router 6');
      next();
    }
  }
});

export default router;
