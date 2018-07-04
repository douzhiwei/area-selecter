<template>
    <div id="app">
        <div style="overflow: hidden">
            <area-select ref="areaSelect" :areaRes="areaRes" :dataRource="otherDataSet" @res-change="areaResChange"></area-select>
        </div>
        <div>
            <p style="color: cornflowerblue">已选择的城市id</p>
            <p>{{selectList}}</p>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                areaRes: [ "120000", "130000", "140105", "140106", "140107", "140108"],
                selectList: [],
                otherDataSet: {"1":{"8":{"name":"高校","sel":false,"showChild":false},"9":{"name":"文化场馆","sel":false,"showChild":false},"10":{"name":"其他","sel":false,"showChild":false}},"2":{"11":{"name":"景区公园","sel":false,"showChild":false},"12":{"name":"酒店","sel":false,"showChild":false},"13":{"name":"出租车","sel":false,"showChild":false},"14":{"name":"其他","sel":false,"showChild":false},"27":{"name":"地铁","sel":false,"showChild":false},"30":{"name":"机场","sel":false,"showChild":false},"31":{"name":"公交大巴","sel":false,"showChild":false}},"3":{"15":{"name":"商场","sel":false,"showChild":false},"16":{"name":"超市","sel":false,"showChild":false},"17":{"name":"餐厅","sel":false,"showChild":false},"18":{"name":"其他","sel":false,"showChild":false}},"4":{"19":{"name":"电影院","sel":false,"showChild":false},"20":{"name":"其他","sel":false,"showChild":false},"10009":{"name":"足疗按摩","sel":false,"showChild":false}},"5":{"21":{"name":"写字楼","sel":false,"showChild":false},"22":{"name":"银行","sel":false,"showChild":false},"23":{"name":"其他","sel":false,"showChild":false}},"6":{"24":{"name":"居民楼","sel":false,"showChild":false},"25":{"name":"其他","sel":false,"showChild":false}},"7":{"26":{"name":"其他","sel":false,"showChild":false}},"28":{"29":{"name":"医院","sel":false,"showChild":false},"10001":{"name":"微整形","sel":false,"showChild":false},"10008":{"name":"药店","sel":false,"showChild":false}},"100000":{"1":{"name":"教育文化","sel":false,"showChild":false},"2":{"name":"旅游出行","sel":false,"showChild":false},"3":{"name":"餐饮购物","sel":false,"showChild":false},"4":{"name":"休闲娱乐","sel":false,"showChild":false},"5":{"name":"商务办公","sel":false,"showChild":false},"6":{"name":"住宅社区","sel":false,"showChild":false},"7":{"name":"其他","sel":false,"showChild":false},"28":{"name":"医疗机构","sel":false,"showChild":false}}}
            }
        },
        methods: {
            areaResChange(val) {
                this.selectList = val
            }
        },
        mounted() {
            this.$refs.areaSelect.initArea()
        }
    }
</script>

<style>
    #app {
        width: 100%;
    }
</style>
