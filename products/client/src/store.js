import {
    createStore
} from 'vuex'

//화면 세션 유지
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {}
        }
    },
    mutations: {
        user(state, data) {
            state.user = data;
        }
    },
    plugins: [
        persistedstate({
            paths: ['user']
        })
    ]
});

export default store;