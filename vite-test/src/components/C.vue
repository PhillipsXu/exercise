<template>
    <h3>C组件</h3>
    <h4>flag: {{ Flag }}</h4>
    <h4>{{ Str }}</h4>
    <button @click="cancelMitt">取消监听</button>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import bus from '../bus';
import { getCurrentInstance } from 'vue';

// 自定义事件总线
let Flag = ref<boolean>(false);
bus.on('on-click', (flag: boolean) => {
    Flag.value = flag;
})

// mitt事件总线
const instance = getCurrentInstance();
let Str = ref<string>('');
const cb = (str: unknown) => {
    Str.value = <string>str;
}
instance?.proxy?.$Bus.on('on-mitt', cb);
function cancelMitt(): void {
    instance?.proxy?.$Bus.off('on-mitt', cb);
    console.log('取消成功');
}

</script>

<style scoped>

</style>