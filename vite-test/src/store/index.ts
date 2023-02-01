import { defineStore } from "pinia";
import { Names } from './store-name';

const getStatus = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('OK');
            reject('faile');
        }, 1000);
    })
}

export const useTest01Store = defineStore(Names.Test_01, {
    // 同步、异步操作都支持
    actions: {
        setCurrent: function (num: number = 1) {
            this.current = this.current + num;
        },
        setStatus: async function () {
            const res = await getStatus();
            this.status = res;
        }
    },
    state: () => {
        return {
            current: 1,
            status: 'Loading...'
        }
    },
    getters: {
        doubleCurrent(): number {
            return this.current * 2
        }
    }
})

export const useTest02Store = defineStore(Names.Test_02, {
    state: () => {
        return {
            a: 1
        }
    }
})