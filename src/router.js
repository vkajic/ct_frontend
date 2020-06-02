import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import store from './store';
import Home from './views/Home.vue';
import MainLayout from './layouts/main/MainLayout.vue';
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
import ProfileLayout from './layouts/profile/ProfileLayout.vue';
import AuthLayout from './layouts/auth/AuthLayout.vue';
import Unsubscribe from './views/common/Unsubscribe.vue';
import NotFound from './views/errors/404.vue';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
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
              meta: { requiresAuth: true },
            },
            {
              path: '/change-password',
              name: 'changePassword',
              component: ChangePassword,
              meta: { requiresAuth: true },
            },
            {
              path: '/profile/preview',
              name: 'previewProfile',
              component: MyPublicProfile,
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: '/profile',
              name: 'updateProfile',
              component: UpdateProfile,
              meta: {
                requiresAuth: true,
              },
            },
            {
              path: '/create-task',
              name: 'create',
              component: CreateTask,
              meta: {
                requiresAuth: true,
                menuWidth: 2,
                forbidAccess: 'freelancer',
              },
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
              meta: {
                requiresAuth: true,
                forbidAccess: 'freelancer',
              },
            },
            {
              path: '/my-tasks/:id/edit',
              name: 'edit-task',
              component: EditTask,
              meta: {
                requiresAuth: true,
                menuWidth: 2,
                forbidAccess: 'freelancer',
              },
            },
            {
              path: '/my-tasks/:id',
              name: 'myTask',
              component: MyTask,
              meta: {
                requiresAuth: true,
                menuWidth: 2,
                forbidAccess: 'freelancer',
              },
            },
            {
              path: '/applications',
              name: 'applications',
              component: Applications,
              meta: {
                requiresAuth: true,
                forbidAccess: 'client',
              },
            },
            {
              path: '/applications/:id',
              name: 'application',
              component: Application,
              meta: {
                requiresAuth: true,
                forbidAccess: 'client',
              },
            },
            {
              path: '/in-progress',
              name: 'inProgress',
              component: InProgressApplications,
              meta: {
                requiresAuth: true,
                forbidAccess: 'client',
              },
            },
            {
              path: '/in-progress/:id',
              name: 'inProgressApplication',
              component: Application,
              meta: {
                requiresAuth: true,
                forbidAccess: 'client',
              },
            },
            {
              path: '/completed',
              name: 'completed',
              component: CompletedApplications,
              meta: {
                requiresAuth: true,
                forbidAccess: 'client',
              },
            },
            {
              path: '/completed/:id',
              name: 'completedApplication',
              component: Application,
              meta: {
                requiresAuth: true,
                forbidAccess: 'client',
              },
            },
            {
              path: '/messages',
              name: 'chats',
              component: Chats,
              meta: { requiresAuth: true },
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
            {
              path: '/clients/:id',
              name: 'clientPublicProfile',
              component: Client,
              meta: { requiresAuth: false },
            },
          ],
        },
        {
          path: '/',
          component: ProfileLayout,
          children: [
            {
              path: 'create-freelancer',
              component: CreateFreelancer,
              meta: {
                requiresAuth: true,
                forbidAccess: 'client',
                menuWidth: 0,
              },
              children: [
                {
                  path: 'basic-info',
                  name: 'basicInfo',
                  component: BasicInfo,
                  meta: {
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
                    requiresAuth: true,
                    forbidAccess: 'client',
                    menuWidth: 0,
                  },
                },
                {
                  path: 'work-experience',
                  name: 'workExperience',
                  component: Experience,
                  meta: {
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
          ],
        },
        {
          path: '/',
          component: AuthLayout,
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
              path: '/unsubscribe/:hash',
              name: 'newsletterUnsubscribe',
              component: Unsubscribe,
            },
          ],
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

router.beforeEach((to, from, next) => {
  // init users data
  store.dispatch('user/init')
    .then(() => {
      if (to.matched.some(record => record.meta.forbidAccess)) {
        const role = store.state.user.activeRole;
        // console.log('forbidding access', role, to);
        if (role === to.meta.forbidAccess) {
          next({
            path: '/',
          });
        } else {
          next();
        }
      } else {
        next();
      }
    })
    .catch(() => {
      if (to.meta.requiresAuth) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    });
});

export default router;
