<template>
    <div class="container">
        <p @click="change">{{ a }}</p>
        <p><span v-for="item in b" style="margin: 0 10px;">{{ item }}</span></p>
    </div>
</template>

<script setup lang='ts'>
import { reactive, toRef, toRaw } from 'vue';

interface myInt {
    a: Number,
    b: Number
}
const obj: myInt = reactive({ a: 1, b: 2, c: 3 });
console.log(obj, toRaw(obj)); // 把响应式对象变为普通对象

const a = toRef(obj, 'a');
function change(): void {
    a.value = 3;
}

// toRefs原理
const toRefs = <T extends object>(obj: T) => {
    const res: any = {};
    for (const key in obj) {
        res[key] = toRef(obj, key);
    }
    return res
}
const b = toRefs(obj);
console.log(b);

</script>

<style scoped lang="scss">
.container {
    border: .5px solid darkgreen;
    margin-top: 20px;
}
</style>