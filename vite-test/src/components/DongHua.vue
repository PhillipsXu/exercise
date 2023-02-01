<template>
    <div class="container">
        <TransitionGroup name="A" appear move-class="aa">
            <div class="cell" v-for="item in list" :key="item.id">
                {{ item.number }}
            </div>
        </TransitionGroup>
        <button @click="change">随机</button>
    </div>
    <div class="demo">
        <input type="number" step="20" v-model="number.current">
        <p>{{ number.transition.toFixed() }}</p>
    </div>
</template>

<script setup lang='ts'>
import { ref, TransitionGroup, reactive, watch } from 'vue';
import _ from 'lodash';
import gsap from 'gsap';

let list = ref(Array.apply(null, { length: 81 } as number[]).map((_, index) => {
    return {
        id: index,
        number: index % 9 + 1
    }
}))
function change(): void {
    list.value = _.shuffle(list.value);
}

let number = reactive({
    current: 0,
    transition: 0
})
watch(() => number.current, (newVal) => {
    gsap.to(number, {
        duration: 2,
        transition: newVal
    })
})

</script>

<style scoped lang="scss">
.container {
    margin: 20px 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    width: calc(30px * 9 + 18px);

    .cell {
        width: 30px;
        height: 30px;
        border: .5px solid green;
        margin: 1px;
        box-sizing: border-box;
        line-height: 30px;
        transition: all 1s ease-in-out;
        border-radius: 15%;

        &:hover {
            transform: scale(1.3);
            background-color: aquamarine;
        }
    }
}

.demo {
    border: 1px solid darkblue;
}
</style>