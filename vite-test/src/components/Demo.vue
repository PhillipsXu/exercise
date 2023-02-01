<template>
    <div class="demo">
        {{ a.map(item => ({ 'number': item })) }}
        <br>
        {{ b }}
        <button @click="b++">点击+1</button>
    </div>
    <div class="demo">
        <p v-if="c === '1'">v-if</p>
        <p v-else-if="c === '2'">v-else-if</p>
        <p v-else>v-else</p>
    </div>
    <div @click="parent" class="demo">
        <button @[event].stop="child">点击</button>
    </div>
    <div class="demo" :class="[_class ? 'a' : 'b']">
        123
    </div>
    <div class="demo" :style="[_class ? 'color: red' : 'color: purple']">
        123
    </div>
    <div class="demo" :class="{ b: _class === false }">
        123
    </div>
    <div class="demo">
        <input type="text" v-model="b">
    </div>
    <div class="demo">
        <ul>
            <li v-for="(item, i) in a" :key="i">
                {{ item }}
            </li>
        </ul>
    </div>
    <!-- 只渲染一次 -->
    <div v-once>
        {{ b }}
    </div>
    <!-- 给一个元素或组件打上一个标识，在下次渲染的时候如和标识一样则跳过更新（包括组件的子节点），即使是虚拟 DOM 节点的 创建也将被跳过。 -->
    <div v-memo="[b === 3]">
        {{ b }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let a: Array<any> = [1, 2, 3, 4, 5];

let b = ref(0);

let c: string = '5';

const event = 'click';
const parent = () => {
    console.log('parent');
}
const child = () => {
    console.log('child');
}

const _class: Boolean = false;
</script>

<style lang="scss">
.demo {
    margin-top: 10px;
    border: .5px dotted darkcyan;
}

.a {
    color: red;
}

.b {
    color: purple;
}
</style>