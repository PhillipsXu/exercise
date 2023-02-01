<template>
    <div id="container">
        <div>
            <router-link to="/chinese" :class="{ 'active': isActive === 0 }">国内疫情</router-link>
        </div>
        <div>
            <router-link to="/foreign" :class="{ 'active': isActive === 1 }">国外疫情</router-link>
        </div>
    </div>
</template>
<script>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

export default {
    name: 'AreaSelect',
    setup() {
        let isActive = ref(0);
        const route = useRoute();
        function active() {
            if (route.path == '/chinese') {
                isActive.value = 0;
            } else if (route.path == '/foreign') {
                isActive.value = 1;
            }
        }
        watch(() => route.path, () => {
            active();
        })

        return {
            isActive
        }
    }
}
</script>
<style lang="scss" scoped>
$bg-color: #fff;
$main-color: rgb(52, 67, 254);

#container {
    background-color: $bg-color;
    width: 700px;
    height: 45px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: sticky;
    top: 0;
    z-index: 99;

    div {
        width: 50%;
        text-align: center;

        a {
            display: inline-block;
            height: 45px;
            box-sizing: border-box;
            color: $main-color;
            line-height: 45px;
            text-decoration: none;
            width: 25%;
            text-align: center;
        }

        .active {
            border-bottom: 3px solid $main-color;
        }
    }
}
</style>