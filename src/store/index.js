import Vue from 'vue';
import Vuex from 'vuex';

import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: "",
        users: [],
        loggedIn: false,
        loggedUser: null
    },
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload
        },
        loginSuccess(state, payload) {
            state.loggedIn = true;
            state.loggedUser = payload;
        },
        loginFailure(state) {
            state.loggedIn = false;
            state.loggedUser = null;
        },
        logout(state) {
            state.loggedIn = false;
            state.loggedUser = null;
        },
        SET_USERS(state, payload) {
            console.log("STORE MUTATION SET_USERS: " + payload.length)
            state.users = payload
        },
    },
    actions: {
        async getAPIRoot({ commit }) {
            const result = await UserService.getPublicContent()
            commit("SET_MESSAGE", result.message);
        },
        async register({ commit }, user) {
            try{
                const response = await AuthService.register(user);
                // console.log("STORE REGISTER SUCCES: response is...")
                // console.log(response)
                commit('SET_MESSAGE', response.message);
            }
            catch(error)
            {
                console.log('STORE REGISTER FAILS')
                console.log(error)
                throw error;
            }
        },
        async login({ commit }, user) {
            try{
                const loggedUser = await AuthService.login(user);
                commit('loginSuccess', loggedUser);
            }
            catch(error)
            {
                commit('loginFailure');
                throw error;
            }
        },
        logout({ commit }) {
            AuthService.logout();
            // commit mutation logout
            commit('logout');
        },
        async getAllUsers({ commit }) {
            try {
                const users = await UserService.fetchAllUsers();
                // console.log('STORE listUsers: ' + users.length)
                commit('SET_USERS', users);
                //return Promise.resolve(users);
            }
            catch(error)
            {
                // console.log('STORE listUsers: ' + error);
                commit('SET_USERS', []);
                commit("SET_MESSAGE", error);
                throw error; // Needed to continue propagating the error
                //return Promise.reject(error);
            }
        }
        // ,
        // async getOneUser({ commit }, id) {
        //     try {
        //         let user = JSON.parse(localStorage.getItem('user'));
        //         id = user.id;
        //         console.log(user)
        //         console.log(id)
        //         const fetchedUser = await UserService.fetchOneUserByID(id);
        //         console.log('STORE getOneUser: ')
        //         console.log(fetchedUser)
        //         // commit('SET_USERS', users);
        //         //return Promise.resolve(users);
        //     }
        //     catch(error)
        //     {
        //         // console.log('STORE listUsers: ' + error);
        //         commit('SET_USERS', []);
        //         commit("SET_MESSAGE", error);
        //         throw error; // Needed to continue propagating the error
        //         //return Promise.reject(error);
        //     }
        // }
    },
    getters: {
        getMessage: (state) => state.message,
        getLoggedIn: (state) => state.loggedIn,
        getLoggedUser: (state) => state.loggedUser,
        getUsers: (state) => state.users
    }
});