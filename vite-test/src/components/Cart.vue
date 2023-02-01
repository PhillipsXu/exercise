<template>
    <table>
        <caption>购物车</caption>
        <thead>
            <tr>
                <th>品名</th>
                <th>数量</th>
                <th>价格</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, i) in data.cart" :key="i">
                <td>{{ item.name }}</td>
                <td><button @click="decrement(item.name)">-</button> {{ item.number }} <button
                        @click="increment(item.name)">+</button></td>
                <td>{{ item.price * item.number }}</td>
                <td><button @click="del(i)">删除</button></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>总价：{{ total }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="stopWatch">停止监听</button>
</template>

<script setup lang='ts'>
import { computed, reactive, watchEffect } from 'vue';

let data = reactive({
    cart: [
        { name: '帽子', number: 1, price: 100 },
        { name: '衣服', number: 1, price: 200 },
        { name: '裤子', number: 1, price: 200 },
        { name: '鞋子', number: 1, price: 300 }
    ]
})
// 使用name筛选删除
// function del(name: string): void {
//     data.cart = data.cart.filter(item => {
//         return item.name !== name
//     })
// }
// 使用索引截取删除
function del(index: number): void {
    data.cart.splice(index, 1);
}
function increment(name: string): void {
    const res = data.cart.find(item => item.name === name);
    res!.number++;
}
function decrement(name: string): void {
    const res = data.cart.find(item => item.name === name);
    if (res!.number > 0) {
        res!.number--;
    }
}
// function total(): number {
//     let res: number = 0;
//     for (let i = 0; i < data.cart.length; i++) {
//         res += data.cart[i].price * data.cart[i].number;
//     }
//     return res
// }
// function total(): number {
//     let res = data.cart.reduce((prev, next) => {
//         return prev + next.number * next.price
//     }, 0)
//     return res
// }
let total = computed<number>(() => {
    return data.cart.reduce((prev, next) => {
        return prev + next.number * next.price
    }, 0)
})
const stop = watchEffect((oninvalidate) => {
    console.log(total.value);
    oninvalidate(() => {
        console.log(total);
    })
}, {
    // 副作用刷新时机flush pre组件更新前执行 sync强制效果同步触发 post组件更新后执行
    flush: 'post',
    onTrigger(e) {
        // debugger; //可进行调试
    }
})
function stopWatch(): void {
    stop();
}

</script>

<style scoped>
thead,
tfoot {
    background-color: #3f87a6;
    color: #fff;
}

tbody {
    background-color: #e4f0f5;
}

caption {
    padding: 10px;
    caption-side: top;
}

table {
    border-collapse: collapse;
    border: 2px solid rgb(200, 200, 200);
    letter-spacing: 1px;
    font-family: sans-serif;
    font-size: 0.8rem;
    width: 100%;
}

td,
th {
    border: 1px solid rgb(190, 190, 190);
    padding: 10px 0;
    width: 25%;
}

td {
    text-align: center;
}
</style>