import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import store from './store';
import Home from './views/Home.vue';
import Login from './views/auth/Login.vue';
import SignUp from './views/auth/SignUp.vue';
import ForgotPassword from './views/auth/ForgotPassword.vue';
import ResetPassword from './views/auth/ResetPassword.vue';
import NotFound from './views/errors/404.vue';

const CreateTask = () => import('./views/client/CreateTask.vue');
const Search = () => import('./views/freelancer/Search.vue');
const EmailConfirmation = () => import('./views/auth/EmailConfirmation.vue');
const Task = () => import('./views/freelancer/Task.vue');
const Entry = () => import('./Entry.vue');
const EditTask = () => import('./views/client/EditTask.vue');
const CreateFreelancer = () => import('./views/freelancer/CreateFreelancer.vue');
const BasicInfo = () => import('./views/freelancer/createFreelancer/BasicInfo.vue');
const Skills = () => import('./views/freelancer/createFreelancer/Skills.vue');
const Experience = () => import('./views/freelancer/createFreelancer/Experience.vue');
const Projects = () => import('./views/freelancer/createFreelancer/Projects.vue');
const Preview = () => import('./views/freelancer/createFreelancer/Preview.vue');
const MyTasks = () => import('./views/client/MyTasks.vue');
const CreateClient = () => import('./views/client/CreateClient.vue');
const ClientBasicInfo = () => import('./views/client/createClient/ClientBasicInfo.vue');
const MyTask = () => import('./views/client/MyTask.vue');
const Freelancers = () => import('./views/client/Freelancers.vue');
const Freelancer = () => import('./views/client/Freelancer.vue');
const ChangePassword = () => import('./views/auth/ChangePassword.vue');
const UpdateProfile = () => import('./views/common/UpdateProfile.vue');
const Chats = () => import('./views/common/Chats.vue');
const Applications = () => import('./views/freelancer/Applications.vue');
const InProgressApplications = () => import('./views/freelancer/InProgressApplications.vue');
const CompletedApplications = () => import('./views/freelancer/CompletedApplications.vue');
const Application = () => import('./views/freelancer/Application.vue');
const MyPublicProfile = () => import('./views/common/MyPublicProfile.vue');
const Client = () => import('./views/freelancer/Client.vue');
const Unsubscribe = () => import('./views/common/Unsubscribe.vue');
const Affiliate = () => import('./views/common/Affiliate.vue');
const About = () => import('./views/common/About.vue');

const domains = {
  'cryptotask.local': 'en',
  'app.cryptotask.org': 'en',
  'app.dev.cryptotask.org': 'en',
  'freelancer.local': 'hr',
  'freelance.hr': 'hr',
  'app.freelance.hr': 'hr',
  'app.dev.freelance.hr': 'hr',
};

const languages = ['en', 'hr', 'es', 'vn'];

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
    },
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
          path: 'info',
          name: 'about',
          component: About,
          meta: {
            requiresAuth: false,
            layout: 'auth',
          },
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
          path: 'tasks/:slug/:id',
          name: 'taskSluged',
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
          path: 'canceled/:id',
          name: 'canceledApplication',
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
          path: 'freelancers/:slug/:id',
          name: 'freelancerPublicProfileSluged',
          component: Freelancer,
        },
        {
          path: 'clients/:id',
          name: 'clientPublicProfile',
          component: Client,
          meta: { requiresAuth: false },
        },
        {
          path: 'clients/:slug/:id',
          name: 'clientPublicProfileSluged',
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
                layout: 'profile',
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
        {
          path: '*',
          name: 'notFound',
          component: NotFound,
          meta: {
            layout: 'errors',
          },
        },
        {
          path: 'not-found',
          name: 'notFoundPage',
          component: NotFound,
          meta: {
            layout: 'errors',
          },
        },
      ],
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

  /* console.log('lang', lang);
  console.log('exists', langExists);
  console.log('domainLang', domainLang);
  console.log('defaultLang', defaultLang);
  console.log('redirectTo', redirectTo); */

  // init users data
  try {
    await store.dispatch('util/setActiveLanguage', defaultLang);
    await store.dispatch('user/init');
    const role = store.state.user.activeRole;

    if (to.meta.forbidAccess && role === to.meta.forbidAccess) {
      // console.log('router 1');
      next({
        path: langRoute,
      });
    } else if (to.fullPath !== redirectTo) {
      // console.log('router 2', to, redirectTo);
      next({ path: redirectTo });
    } else {
      // console.log('router 3');
      next();
    }
  } catch (err) {
    if (to.meta.requiresAuth && to.meta.layout !== 'auth') {
      // console.log('router 4', to);
      next({
        path: `${langRoute}/login`,
        query: { redirect: to.path, ...to.query },
      });
    } else if (to.fullPath !== redirectTo) {
      // console.log('router 5', to);
      next({ path: redirectTo });
    } else {
      // console.log('router 6', to);
      next();
    }
  }
});

export default router;
