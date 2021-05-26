import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
// import Login from './views/Login.vue';
// import Register from './views/Register.vue';

import store from './store';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/register',
            component: () => import('@/views/Register.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/AdminPage.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/Profile.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/'];
    const authRequired = !publicPages.includes(to.path);
    // console.log("ROTER: beforeEach - auth Required? " + to.path + " " + authRequired)
    
    // checks if there is a logged user 
    // const loggedIn = localStorage.getItem('user');
    const loggedIn = store.getters.getLoggedIn;
    // console.log("ROTER: beforeEach - store.getters.getLoggedIn " + store.getters.getLoggedIn)
  
    // trying to access a restricted page AND not logged in -> redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });