<template>
    <el-result icon="warning" title="页面不存在" style="margin-top: calc(10%);">
        <template #extra>
            <p><span style="color: red;">{{ num }}</span>秒后返回首页</p>
            <br>
            <el-button type="primary" @click="$router.replace('/')">返回首页</el-button>
        </template>
    </el-result>
</template>

<script setup lang='ts'>
import router from '../router';

let num = ref<number>(5);
onMounted(() => {
    const timer: NodeJS.Timer = setInterval(() => {
        num.value--;
        if (num.value <= 0) {
            clearInterval(timer);
            router.replace('/');
        }
    }, 1000)
})

</script>

<style scoped>

</style>