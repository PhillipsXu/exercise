<template>
    <div class="demo">
        <h4>{{ a }}</h4>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

let a = ref<unknown>(0);

</script>

<style scoped>
.demo {
    border: .5px solid palevioletred;
}
</style>