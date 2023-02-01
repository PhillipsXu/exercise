<template>
    <RenderVue text="render函数创造的组件">
        <template default>123</template>
    </RenderVue>
</template>

<script setup lang='ts'>
import { h } from 'vue';

interface Props {
    text: string | undefined
}
const RenderVue = (props: Props, ctx: any) => {
    return h('div', {
        class: ['demo']
    },
        ctx.slots.default()
    )
}

</script>

<style scoped>
.demo {
    border: 1px solid cadetblue;
}
</style>