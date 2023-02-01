<template>
    <div class="demo">
        <button :class="{ active: isActive === index }" v-for="(item, index) in data" style="margin: 0 5px;"
            @click="btnHandler(item, index)">{{ item.name }}</button>
        <KeepAlive>
            <component :is="comId"></component>
        </KeepAlive>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, defineAsyncComponent, shallowRef, markRaw } from 'vue';
const Acom = defineAsyncComponent(() => import('./A.vue'));
const Bcom = defineAsyncComponent(() => import('./B.vue'));
const Ccom = defineAsyncComponent(() => import('./C.vue'));
let comId = shallowRef(Acom);
let isActive = ref(0);
const data = reactive([
    {
        name: 'A组件',
        com: markRaw(Acom)
    },
    {
        name: 'B组件',
        com: markRaw(Bcom)
    },
    {
        name: 'C组件',
        com: markRaw(Ccom)
    }
])
const btnHandler = (item: any, index: number): void => {
    isActive.value = index;
    comId.value = item.com;
}

</script>

<style scoped>
.demo {
    border: .5px solid salmon
}

.active {
    background-color: skyblue;
}
</style>