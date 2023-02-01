<template>
    <div id="swiperbox">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div id="main1"></div>
                </div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
            </div>
        </div>
        <div id="btn">
            <div id="to1">新增确诊</div>
            <div id="to2">新增死亡</div>
            <div id="to3">新增治愈</div>
        </div>
    </div>
</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts';

export default {
    name: 'Swiper',
    setup() {
        const store = useStore();
        let info = computed(() => {
            return store.state.infos
        })

        onMounted(() => {
            setTimeout(() => {
                var myChart = echarts.init(document.getElementById('main1'));
                myChart.setOption({
                    title: {
                        text: '新增病例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: [info.value[0].date, info.value[1].date, info.value[2].date, info.value[3].date, info.value[4].date, info.value[5].date]
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '新增本土',
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                color: '#f00',
                                opacity: 0.3
                            },
                            data: [info.value[0].confirmedIncr, info.value[1].confirmedIncr, info.value[2].confirmedIncr, info.value[3].confirmedIncr, info.value[4].confirmedIncr, info.value[5].confirmedIncr]
                        },
                        {
                            name: '新增无症状',
                            type: 'line',
                            areaStyle: {
                                color: '#ff0',
                                opacity: 0.3
                            },
                            data: [info.value[0].seriousIncr, info.value[1].seriousIncr, info.value[2].seriousIncr, info.value[3].seriousIncr, info.value[4].seriousIncr, info.value[5].seriousIncr]
                        }
                    ]
                })
            }, 100);
        })
    },
    mounted() {
        var mySwiper = new Swiper('.swiper', {
            direction: 'horizontal'
        })
        document.getElementById('to1').onclick = function () {
            mySwiper.slideTo(0, 1000, false);
        }
        document.getElementById('to2').onclick = function () {
            mySwiper.slideTo(1, 1000, false);
        }
        document.getElementById('to3').onclick = function () {
            mySwiper.slideTo(2, 1000, false);
        }
    }
}
</script>

<style lang="scss" scoped>
#swiperbox {
    width: 700px;
    height: 400px;
    background-color: #fff;
    margin: 0 auto;

    #main1 {
        height: 400px;
        width: 700px;
    }

    #btn {
        display: flex;
        justify-content: space-around;
        align-content: center;

        div {
            cursor: pointer;
            width: 30%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color: rgba(52, 67, 254, .8);
            border-radius: 5px;
            color: #fff;
        }
    }
}
</style>