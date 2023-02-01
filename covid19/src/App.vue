<template>
  <TopBar />
  <AreaSelect />
  <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';
import AreaSelect from './components/AreaSelect.vue';
import TopBar from './components/TopBar.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    AreaSelect
  },
  setup() {
    const store = useStore();
    store.dispatch('getInfo');
    store.dispatch('getInfos');
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

body {
  background-color: rgb(52, 67, 254);
}
</style>
