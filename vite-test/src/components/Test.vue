<template>
    <div class="test">
        ref：{{ a }}
        <br>
        shallowRef：{{ b }}
        <br>
        <button @click="add">点击</button>
        <br>
        customRef：{{ c }}
    </div>
    <div class="test" ref="dom" @click.once="changeList">
        reactive：{{ list }}
        <br>
        reactive：{{ list2.arr }}
        <br>
        <p @click.stop="changeObj2">shallowReactive：{{ obj2 }}</p>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, isRef, shallowRef, triggerRef, customRef, reactive, readonly, shallowReactive } from 'vue';
import { onMounted } from 'vue';
import type { Ref } from 'vue';

let a: Ref<number> = ref(0);
// 浅层次响应
let b = shallowRef({ a: 'a' })
const add = () => {
    a.value++
    console.log(isRef(a));
    // b.value = { a: 'b' }
    // ref和shallowRef不能同时赋值，会影响shallowRef，导致视图更新
    b.value.a = 'b';
    // 强制更新ui
    triggerRef(b);
}

function myRef<T>(value: T, delay: number = 500) {
    let timer: any;
    return customRef((track, trigger) => {
        return {
            get() {
                track();
                return value
            },
            set(newValue) {
                // 防抖
                clearTimeout(timer);
                timer = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay)
            }
        }
    })
}
let c = myRef('Hello, ref!');
console.log(c);

const dom = ref<HTMLDivElement>();
onMounted(() => {
    console.log(dom.value);
})

let list = reactive<string[]>(['张三', '李四', '王五']);
let list2 = reactive<{ arr: Array<string> }>({ arr: ['JACK', 'TOM', 'MIKE'] });
let obj = readonly(reactive({ name: 'a' }));
let obj2 = shallowReactive<any>({
    a: {
        b: {
            c: 1
        }
    }
})
function changeList(): void {
    // list = [...list, '赵六']; 不可直接赋值，需要用 数组方法 或 把数组作为对象的值
    list.push('赵六');
    list2.arr = [...list2.arr, 'MAY'];
    // obj.name = 'b'; 无法为“name”赋值，因为它是只读属性。
    console.log(obj.name);
}

function changeObj2(): void {
    // 跟shallowRef一样会受到reactive的影响，所以不能一起修改
    obj2.a.b.c = 2;
    console.log(obj2);
}

</script>

<style scoped>
.test {
    border: .5px solid #ccc;
}
</style>