<template>
    <div class="provide" @click="change">

    </div>
    <InjectVue />
</template>

<script setup lang='ts'>
import { ref, provide } from 'vue';
import InjectVue from './InjectVue.vue';

let color = ref<string>('red');
provide('color', color);
function change(): void {
    color.value = 'yellow';
}
</script>

<style scoped>
.provide {
    border: 1px solid #ccc;
    height: 30px;
    background-color: v-bind(color);
}
</style>