<template>
    <div>
        <p>{{ $filter.format('abc') }}</p>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue';
const app = getCurrentInstance();
console.log(app?.proxy!.$filter.format('成功输出'));

</script>

<style scoped>

</style>