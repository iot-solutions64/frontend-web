import { createStore } from 'vuex'

export default createStore({
    state: {
        token: localStorage.getItem('token') || null,
        userId: localStorage.getItem('userId') || null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = !!token
            if (token) {
                localStorage.setItem('token', token)
            } else {
                localStorage.removeItem('token')
            }
        },
        setUserId(state, userId) {
            state.userId = userId
            if (userId) {
                localStorage.setItem('userId', userId)
            } else {
                localStorage.removeItem('userId')
            }
        },
    },
    actions: {
        login({ commit }, { token, userId }) {
            commit('setToken', token)
            commit('setUserId', userId)
        },
        logout({ commit }) {
            commit('setToken', null)
            commit('setUserId', null)
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated
        },
        getToken(state) {
            return state.token
        },
        getUserId(state) {
            return state.userId
        }
    },
})