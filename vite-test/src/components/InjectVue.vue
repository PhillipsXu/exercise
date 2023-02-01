<template>
    <div class="inject">

    </div>
</template>

<script setup lang='ts'>
import { ref, inject } from 'vue';

let color = ref(inject('color'));
</script>

<style scoped>
.inject {
    border: 1px solid #ccc;
    height: 30px;
    background-color: v-bind(color);
}
</style>