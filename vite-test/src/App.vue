<script setup lang="ts">
import { defineAsyncComponent, Suspense } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Demo from './components/Demo.vue';
import Test from './components/Test.vue';
import To from './components/To.vue';
import Cart from './components/Cart.vue';
import Dongtai from './components/Dongtai.vue';
import DongHua from './components/DongHua.vue';
import ProvideVue from './components/ProvideVue.vue';
import TsxVue from './components/TsxVue.vue';
import Global from './components/Global.vue';
import RenderVue from './components/RenderVue.vue';
import PiniaVue from './components/PiniaVue.vue';
const Sync = defineAsyncComponent(() => import('./components/Sync.vue'));
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <Demo />
  <Test />
  <To />
  <Cart />
  <Suspense>
    <template v-slot:default>
      <Sync></Sync>
    </template>
    <template v-slot:fallback>
      <h4>Loading....</h4>
    </template>
  </Suspense>
  <Dongtai />
  <DongHua />
  <ProvideVue />
  <TsxVue />
  <Global />
  <RenderVue />
  <PiniaVue />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
