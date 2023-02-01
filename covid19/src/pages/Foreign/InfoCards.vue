<template>
    <div id="container">
        <div id="title">
            <div class="info">
                <h1>疫情信息</h1>
            </div>
            <p>数据更新时间：2022-11-7</p>
        </div>
        <div id="cards">
            <div>
                <p class="top">较昨日<span>+1515</span></p>
                <p class="middle" style="color: red;">46813135</p>
                <p class="bottom">现存确诊</p>
            </div>
            <div>
                <p class="top">较昨日<span>+1515</span></p>
                <p class="middle" style="color: orange;">46813135</p>
                <p class="bottom">累计确诊</p>
            </div>
            <div>
                <p class="top">较昨日<span>+1515</span></p>
                <p class="middle" style="color: brown;">46813135</p>
                <p class="bottom">累计境外输入</p>
            </div>
            <div>
                <p class="top">较昨日<span>+1515</span></p>
                <p class="middle" style="color: darkgoldenrod;">46813135</p>
                <p class="bottom">累计治愈</p>
            </div>
            <div>
                <p class="top">较昨日<span>+1515</span></p>
                <p class="middle" style="color: grey;">46813135</p>
                <p class="bottom">累计死亡</p>
            </div>
            <div>
                <p class="top">较昨日<span>+1515</span></p>
                <p class="middle" style="color: green;">46813135</p>
                <p class="bottom">现存无症状</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'InfoCards'
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
            width: 30%;
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
        }
    }
}
</style>