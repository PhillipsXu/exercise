<template>
    <InfoCards />
    <EchartsCard />
    <NewsCard />
</template>
<script>
import InfoCards from './InfoCards.vue';
import EchartsCard from './EchartsCard.vue';
import NewsCard from './NewsCard.vue';

export default {
    name: "ChineseInfo",
    components: { InfoCards, EchartsCard, NewsCard }
}
</script>
<style lang="scss" scoped>

</style>