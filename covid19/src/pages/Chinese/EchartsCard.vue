<template>
    <div id="swiperbox">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div id="main1"></div>
                </div>
                <div class="swiper-slide">
                    <div id="main2"></div>
                </div>
                <div class="swiper-slide">
                    <div id="main3"></div>
                </div>
            </div>
        </div>
        <div id="btn">
            <div id="to1">新增确诊</div>
            <div id="to2">新增治愈</div>
            <div id="to3">新增死亡</div>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts';

export default {
    name: 'Swiper',
    setup() {
        const store = useStore();
        let info = computed(() => {
            return store.state.infos
        })
        var myChart1;
        var myChart2;
        var myChart3;
        onUnmounted(() => {
            myChart1.dispose();
            myChart2.dispose();
            myChart3.dispose();
        })
        onMounted(() => {
            setTimeout(() => {
                myChart1 = echarts.init(document.getElementById('main1'));
                myChart1.setOption({
                    title: {
                        text: '新增病例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: [info.value[0].date, info.value[1].date, info.value[2].date, info.value[3].date, info.value[4].date, info.value[5].date, info.value[6].date],
                        axisLabel: {
                            interval: 0,
                            rotate: -20   //值>0向右倾斜，值<0则向左倾斜
                        }
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
                            data: [info.value[0].confirmedIncr, info.value[1].confirmedIncr, info.value[2].confirmedIncr, info.value[3].confirmedIncr, info.value[4].confirmedIncr, info.value[5].confirmedIncr, info.value[6].confirmedIncr]
                        },
                        {
                            name: '新增无症状',
                            type: 'line',
                            areaStyle: {
                                color: '#ff0',
                                opacity: 0.3
                            },
                            data: [info.value[0].seriousIncr, info.value[1].seriousIncr, info.value[2].seriousIncr, info.value[3].seriousIncr, info.value[4].seriousIncr, info.value[5].seriousIncr, info.value[6].seriousIncr]
                        }
                    ]
                })
                if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                    myChart2.dispose();
                }
                myChart2 = echarts.init(document.getElementById('main2'));
                myChart2.setOption({
                    title: {
                        text: '新增病例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: [info.value[0].date, info.value[1].date, info.value[2].date, info.value[3].date, info.value[4].date, info.value[5].date, info.value[6].date],
                        axisLabel: {
                            interval: 0,
                            rotate: -20   //值>0向右倾斜，值<0则向左倾斜
                        }
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '新增治愈',
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                color: '#ff0',
                                opacity: 0.3
                            },
                            data: [info.value[0].curedIncr, info.value[1].curedIncr, info.value[2].curedIncr, info.value[3].curedIncr, info.value[4].curedIncr, info.value[5].curedIncr, info.value[6].curedIncr]
                        }
                    ]
                })
                if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                    myChart3.dispose();
                }
                myChart3 = echarts.init(document.getElementById('main3'));
                myChart3.setOption({
                    title: {
                        text: '新增病例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: [info.value[0].date, info.value[1].date, info.value[2].date, info.value[3].date, info.value[4].date, info.value[5].date, info.value[6].date],
                        axisLabel: {
                            interval: 0,
                            rotate: -20   //值>0向右倾斜，值<0则向左倾斜
                        }
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '新增死亡',
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                color: '#f00',
                                opacity: 0.3
                            },
                            data: [info.value[0].deadIncr, info.value[1].deadIncr, info.value[2].deadIncr, info.value[3].deadIncr, info.value[4].deadIncr, info.value[5].deadIncr, info.value[6].deadIncr]
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
    background-color: #fff;
    margin: 0 auto;
    padding: 10px 20px;
    box-sizing: border-box;

    #main1 {
        height: 400px;
        width: 700px;
    }

    #main2 {
        height: 400px;
        width: 700px;
    }

    #main3 {
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