<template>
    <h3>B组件</h3>
    <button @click="emitB">派发</button>
    <button @click="mittEmit">mitt派发</button>
</template>

<script setup lang='ts'>
import bus from '../bus';
import { getCurrentInstance } from 'vue';

let flag: boolean = false;
function emitB() {
    flag = !flag;
    bus.emit('on-click', flag);
}

const instance = getCurrentInstance();
const str: string = '123';
function mittEmit() {
    instance?.proxy?.$Bus.emit('on-mitt', str);
}

</script>

<style scoped>

</style>