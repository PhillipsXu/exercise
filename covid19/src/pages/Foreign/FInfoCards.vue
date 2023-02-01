<template>
    <div id="container">
        <div id="title">
            <div class="info">
                <h1>疫情信息</h1>
            </div>
            <p>数据更新时间：{{ new Date(info.modifyTime).toString().slice(11, 21) }}</p>
        </div>
        <div id="cards">
            <div>
                <p class="middle" style="color: red;">{{ info.currentConfirmedCount }}</p>
                <p class="bottom">现存确诊</p>
            </div>
            <div>
                <p class="top">较昨日<span style="color: orange;">{{ info.confirmedIncr < 0 ? info.confirmedIncr : '+' +
                        info.confirmedIncr
                }}</span>
                </p>
                <p class="middle" style="color: orange;">{{ info.confirmedCount }}</p>
                <p class="bottom">累计确诊</p>
            </div>
            <div>
                <p class="top">治愈率<span style="color: darkgoldenrod;">{{ info.curedPercent }}</span>
                </p>
                <p class="middle" style="color: darkgoldenrod;">{{ info.curedCount }}</p>
                <p class="bottom">累计治愈</p>
            </div>
            <div>
                <p class="top">较昨日<span style="color: grey;">{{ info.deadIncr < 0 ? info.deadIncr : '+' + info.deadIncr
                }}</span>
                </p>
                <p class="middle" style="color: grey;">{{ info.deadCount }}</p>
                <p class="bottom">累计死亡</p>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'FInfoCards',
    setup() {
        const store = useStore();
        let info = computed(() => {
            return store.state.info[1]
        })

        return {
            info
        }
    }
}
</script>

<style lang="scss" scoped>
$bg-color: #fff;
$main-color: rgb(52, 67, 254);

#container {
    width: 700px;
    background-color: $bg-color;
    margin: 0 auto;
    padding-bottom: 20px;

    #title {
        padding: 20px;

        .info {
            border-left: 5px solid $main-color;
            height: 28px;
            padding-left: 10px;
            margin-bottom: 10px;
            vertical-align: top;
            line-height: 28px;
            font-size: 16px;
            position: relative;

            h1 {
                position: absolute;
                top: -3px;
            }
        }
    }

    #cards {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        div {
            padding-top: 10px;
            width: 40%;
            height: 100px;
            text-align: center;
            border-radius: 5px;

            &:hover {
                box-shadow: inset 0 0 4px rgba($color: #000000, $alpha: .2);
            }

            p {
                padding: 5px 0;
                font-weight: 600;
            }

            .top {
                font-size: 12px;
            }

            .middle {
                font-size: 20px;
            }

            .bottom {
                font-size: 14px;
            }
        }
    }
}
</style>