<template>
    <h3>A组件</h3>
    <h4 class="dd">{{ a }}</h4>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

let a = ref<number>(0);
const timer: NodeJS.Timer = setInterval(() => {
    a.value++;
    if (a.value >= 50) {
        clearInterval(timer);
        console.log(a);
    }
}, 100)

let color = ref<string>('red');

</script>

<style scoped>
.dd {
    color: v-bind(color);
}
</style>