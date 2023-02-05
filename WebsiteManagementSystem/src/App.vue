<template>
    <RouterView></RouterView>
</template>

<script setup lang='ts'>


</script>

<style lang="postcss">
.btn {
    @apply bg-sky-400 text-indigo-50 px-4 py-2 rounded-xl transition-all duration-300 animate-bounce hover: (bg-sky-800 animate-none) focus:(ring-4 ring-gray-500/50);
}
</style>