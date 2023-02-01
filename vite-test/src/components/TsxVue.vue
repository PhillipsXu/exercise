<template>
    <TsxV info="123" @on-click="getFlag"></TsxV>
</template>

<script setup lang='ts'>
import TsxV from './TsxV';

function getFlag(flag: boolean) {
    console.log(flag);
}

</script>

<style scoped>

</style>