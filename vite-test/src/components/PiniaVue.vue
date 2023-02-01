<template>
    <div class="demo">
        <p>未解构Pinia：{{ Test_01.current }}</p>
        <p>解&emsp;构Pinia：{{ current }}</p>
        <p>getters: {{ Test_01.doubleCurrent }}</p>
        <p>异步数据：{{ Test_01.status }}</p>
        <button @click="change">修改</button>
        <button @click="reset">重置</button>
    </div>
    <div class="demo">
        <p>Test_02：{{ Test_02.a }}</p>
    </div>
</template>

<script setup lang='ts'>
import { useTest01Store, useTest02Store } from '../store/index';
import { storeToRefs } from 'pinia';

const Test_01 = useTest01Store();
const Test_02 = useTest02Store();
// 把解构的值转换为响应式数据
const { current } = storeToRefs(Test_01);
// 修改store值的方法
// 1. Test.current++ 直接修改
// 2. $patch方法
/* 写法1 Test.$patch({
        current: Test.current + 1
    }) */
/* 写法2 Test.$patch((state) => {
        state.current = state.current + 1;
    }) */
// 3. $state方法 不推荐
/* Test.$state = {
        current: Test.current + 1
    } */
// 4. 在actions中写方法，直接调用
/* actions: {
        setCurrent: function () {
            this.current++
        }
    } */
function change(): void {
    Test_01.setCurrent();
}
function reset(): void {
    Test_01.$reset();
    Test_01.setStatus();
}

Test_01.$subscribe((args, state) => {
    // agrs 变化的内容
    console.log(args, state);
}, {
    detached: false,
    deep: true,
    immediate: false,
    flush: 'post'
})

Test_01.$onAction((args) => {
    console.log(args);
    args.after(() => {
        console.log('after');
    })
})

onMounted(() => {
    Test_01.setStatus();
    Test_02.$patch({
        a: 1
    })
    const timer: NodeJS.Timer = setInterval(() => {
        Test_02.$patch({
            a: Test_02.a + 1
        })
        if (Test_02.a >= 50) {
            clearInterval(timer);
        }
    }, 100)
})

</script>

<style scoped>
.demo {
    border: 1px solid orangered;
}
</style>