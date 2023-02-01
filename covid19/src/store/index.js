import { createStore } from "vuex";
import { getData, getDatas } from "@/api";

const store = createStore({
    namespaced: false,
    actions: {
        async getInfo(context) {
            let res = await getData();
            if (res) {
                context.commit('GETINFO', res.data);
            }
        },
        async getInfos(context) {
            let res = await getDatas();
            if (res) {
                context.commit('GETINFOS', res.data);
            }
        }
    },
    mutations: {
        GETINFO(state, data) {
            state.info = data;
        },
        GETINFOS(state, data) {
            state.infos = data;
        },
    },
    state: {
        info: [{}, {}],
        infos: [{}, {}, {}, {}, {}, {}]
    },
    getters: {

    }
})

export default store;