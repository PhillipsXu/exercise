<template>
    <div id="container">
        <div id="card" v-for="item in info" :key="item.id">
            <div id="title">
                <h2><a :href="item.sourceUrl" target="_blank">{{ item.title }}</a>
                </h2>
                <p>{{ item.pubDateStr }}</p>
            </div>
            <div id="content">
                {{ item.summary }}
            </div>
            <div id="bottom">
                <p>消息来源：{{ item.infoSource }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'NewsCard',
    setup() {
        const store = useStore();
        let info = computed(() => {
            return store.state.info[0].news;
        })

        return {
            info
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

#container {
    width: 700px;
    margin: 0 auto;
    background-color: #fff;
    padding: 10px 20px;

    #card {
        background-color: rgba($color: #c5c5c5, $alpha: .3);
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 5px;

        #title {
            width: 100%;

            h2 {
                a {
                    color: #000;
                    text-decoration: none;
                }
            }

            p {
                display: inline-block;
                color: #fff;
                margin-top: 5px;
                padding: 0 5px;
                background-color: orange;
            }
        }

        #content {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 10px auto;
        }

        #bottom {
            width: 100%;
        }
    }
}
</style>