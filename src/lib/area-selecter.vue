<template>
    <div class="warp-main">
        <div class="areaWrap">
            <div class="row">
                <div class="searchWrap">
                    <div class="wrap">
                        <ul class="left">
                            <li class="province-item" v-for="(data,index) in dataList">
                                <input type="checkbox" v-model="data.sel" @click="provinceClick(data)">
                                <span>{{data.name}}</span>
                                <a href="javascript:;" class="checkBtn"
                                   @click="addCity(index);reserveAttr(data,false);">{{data.showChildrens ? "-" : "+"}}</a>
                                <div class="city-item" v-for="(dataCity,index1) in cityCache[data.id]"
                                     v-if="data.showChildrens">
                                    <input type="checkbox" v-model="dataCity.sel" @click="cityClick(dataCity,data)">
                                    <span>{{dataCity.name}}</span>
                                    <a href="javascript:;" class="checkBtn"
                                       @click="addCountry(index,index1);reserveAttr(dataCity)">{{dataCity.showChildrens ? "-" : "+"}}</a>
                                    <div class="county-item" v-for="dataDistrict in countryCache[dataCity.id]"
                                         v-if="dataCity.showChildrens">
                                        <input type="checkbox" v-model="dataDistrict.sel"
                                               @click="countyClick(dataDistrict,dataCity,data)">
                                        <span>{{dataDistrict.name}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="left">
                            <div class="titleRight">
                                <span>已选择</span>
                                <a style=" float: right;" href="javascript:;" @click="delAll()"
                                   class="delChoice">完全删除</a>
                            </div>
                            <ul class="choiceAll">
                                <li class="province-item" v-for="(data,index) in dataList">
                                    <span v-if="data.sel">{{data.name}}</span>
                                    <a href="javascript:;" class="checkBtn" v-if="data.sel"
                                       @click="provinceDel(data)">×</a>
                                    <div class="city-item" v-for="dataCity in cityCache[data.id]">
                                        <span v-if="dataCity.sel&&!data.sel">{{dataCity.name}}</span>
                                        <a href="javascript:;" class="checkBtn" v-if="dataCity.sel&&!data.sel"
                                           @click="cityDel(dataCity)">×</a>
                                        <div class="county-item" v-for="dataDistrict in countryCache[dataCity.id]">
                                            <span v-if="dataDistrict.sel&&!dataCity.sel">{{dataDistrict.name}}</span>
                                            <a href="javascript:;" class="checkBtn"
                                               v-if="dataDistrict.sel&&!dataCity.sel"
                                               @click="dataDistrictClick(dataDistrict)">×</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import china from './area_new'

    export default {
        name: 'area',
        props: ['areaRes'],
        data() {
            return {
                dataList: china,
                res: this.areaRes,
                cityCache: {},
                countryCache: {}
            }
        },
        watch: {
            //监控选中的数据 像父组件发送
            res(val) {
                this.$emit('res-change', val);
                console.log(this.res);
            },
            areaRes(val) {
                if (val.length != 0) {
                    this.res = this.areaRes
                    this.initArea()
                }
            }
        },
        methods: {
            addCity(provIndex) {
                if (this.cityCache[this.dataList[provIndex].id]) return
                this.cityCache[this.dataList[provIndex].id] = this.dataList[provIndex].cities
                this.cityCache[this.dataList[provIndex].id].showChildrens = true
            },
            addCountry(provIndex, cityIndex) {
                if (this.countryCache[this.dataList[provIndex].cities[cityIndex].id]) return
                this.countryCache[this.dataList[provIndex].cities[cityIndex].id] = this.dataList[provIndex].cities[cityIndex].counties
                this.countryCache[this.dataList[provIndex].cities[cityIndex].id].showChildrens = true
            },
            //选择框点击，下级影响上级变化
            refresh() {
                let ags = arguments;
                let alen = ags.length;
                for (let i = 0; i < alen; i++) {
                    let flag = true;
                    let [j, jLen] = [0, ags[i].ele1.length]
                    for (j = 0; j < jLen; j++) {
                        if (!ags[i].ele1[j].sel) {
                            flag = false;
                            ags[i].ele2 && (ags[i].ele2.sel = false);
                        }
                    }
                    ags[i].ele3 && (ags[i].ele3.sel = flag);
                }
            },
            //选择框点击，上级影响下级变化
            selToParentSel(ele, flag) {
                let [i, iLen] = [0, ele.length]
                for (i = 0; i < iLen; i++) {
                    ele[i].sel = flag;
                    if (ele[i].hasOwnProperty('cities')) {
                        let [j, jLen] = [0, ele[i].cities.length]
                        for (j = 0; j < jLen; j++) {
                            ele[i].cities[j].sel = flag;
                            if (ele[i].cities[j].hasOwnProperty('counties')) {
                                let [k, kLen] = [0, ele[i].cities[j].counties.length]
                                for (k = 0; k < kLen; k++) {
                                    ele[i].cities[j].counties[k].sel = flag;
                                }
                            }
                        }
                    } else if (ele[i].hasOwnProperty('counties')) {
                        let [j, jLen] = [0, ele[i].counties.length]
                        for (j = 0; j < jLen; j++) {
                            ele[i].counties[j].sel = flag;
                        }
                    }
                }
            },
            //过滤选中区域
            subMitres(res) {
                let submtDats = []
                for (let i = 0, imax = res.length; i < imax; i++) {
                    let isfullcity = true
                    if (res[i].sel) {
                        submtDats.push(res[i].id)
                    } else {
                        for (let j = 0, jmax = res[i].cities.length; j < jmax; j++) {
                            if (res[i].cities[j].sel) {
                                submtDats.push(res[i].cities[j].id)
                            } else {
                                for (let k = 0, kmax = res[i].cities[j].counties.length; k < kmax; k++) {
                                    if (res[i].cities[j].counties[k].sel) {
                                        submtDats.push(res[i].cities[j].counties[k].id)
                                    }
                                }
                            }
                        }
                    }
                }
                return submtDats;
            },
            initArea() {
                //查看上次保存后的选中的值，并记忆状态
                for (let i = 0; i < this.dataList.length; i++) {
                    for (let j = 0; j < this.res.length; j++) {
                        if (this.dataList[i].id == this.res[j]) {
                            this.dataList[i].sel = true;
                            this.selToParentSel(this.dataList[i].cities, true);
                        } else {
                            for (let k = 0; k < this.dataList[i].cities.length; k++) {
                                for (let l = 0; l < this.res.length; l++) {
                                    if (this.dataList[i].cities[k].id == this.res[l]) {
                                        this.addCity(i)
                                        this.dataList[i].cities[k].sel = true;
                                        this.dataList[i].showChildrens = true;
                                        this.selToParentSel(this.dataList[i].cities[k].counties, true);
                                    } else {
                                        for (let n = 0; n < this.dataList[i].cities[k].counties.length; n++) {
                                            for (let m = 0; m < this.res.length; m++) {
                                                if (this.dataList[i].cities[k].counties[n].id == this.res[m]) {
                                                    this.addCity(i)
                                                    this.addCountry(i, k);
                                                    this.dataList[i].cities[k].counties[n].sel = true;
                                                    this.dataList[i].cities[k].showChildrens = true;
                                                    this.dataList[i].showChildrens = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            //反转属性
            reserveAttr(ele, flag) {
                if (flag) {
                    ele.sel = !ele.sel
                } else {
                    ele.showChildrens = !ele.showChildrens
                }
            },
            //左侧选择框点击
            //省级点击
            provinceClick(ele) {
                let flag = ele.sel;
                this.selToParentSel(ele.cities, flag);
                this.res = this.subMitres(this.dataList)
            },
            //市级点击
            cityClick(ele, ele1) {
                let flag = ele.sel;
                this.selToParentSel(ele.counties, flag);
                this.refresh({
                    'ele1': ele1.cities,
                    'ele3': ele1
                })
                this.res = this.subMitres(this.dataList)
            },
            //县级点击
            countyClick(ele, ele1, ele2) {
                this.refresh(
                    {
                        'ele1': ele1.counties,
                        'ele2': ele2,
                        'ele3': ele1
                    },
                    {
                        'ele1': ele2.cities,
                        'ele3': ele2
                    }
                )
                this.res = this.subMitres(this.dataList)
            },
            // 右侧删除
            //省级删除
            provinceDel(ele) {
                ele.sel = !ele.sel;
                this.selToParentSel(ele.cities, false);
                this.res = this.subMitres(this.dataList)
            },
            // 市级删除
            cityDel(ele) {
                ele.sel = !ele.sel;
                this.selToParentSel(ele.counties, false);
                this.res = this.subMitres(this.dataList)
            },
            //区域删除
            dataDistrictClick(ele) {
                ele.sel = !ele.sel;
                this.res = this.subMitres(this.dataList)
            },
            //删除所有
            delAll() {
                this.selToParentSel(this.dataList, false);
                this.res = [];
            }
        },
        created() {
            // 初始化数据 让vue能够监测
            for (let a of this.dataList) {
                if (a) {
                    this.$set(a, "showChildrens", false);
                    this.$set(a, "sel", false);
                }
                for (let b of a.cities) {
                    if (b) {
                        this.$set(b, "showChildrens", false);
                        this.$set(b, "sel", false);
                    }
                    for (let c of b.counties) {
                        if (c) {
                            this.$set(c, "sel", false);
                        }
                    }
                }
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .warp-main {
        width: 100%;
        min-height: 610px;
        background: #fff;
        padding-top: 20px;
        .areaWrap {
            margin-left: 200px;
            input.search {
                width: 300px;
                height: 35px;
                border: 1px solid #dbdbdb;
            }
            .searchWrap {
                position: relative;
                .searchWrapSon {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0);
                }
                .wrap {
                    ul {
                        padding: 5px 10px;
                        overflow: auto;
                        height: 100%;
                        &:last-child {
                            height: 240px;
                            span {
                                margin-left: 0;
                            }
                        }
                    }
                    .left {
                        border: 1px solid #c3c3c5;
                        width: 240px;
                        height: 280px;
                        margin-right: 10px;
                        li {
                            line-height: 30px;
                            a {
                                float: right;
                                width: 12px;
                                height: 12px;
                                text-align: center;
                                font-size: 12px;
                                color: #a8a8aa;
                                margin-top: 10px;
                                line-height: 8px;
                                border: 1px solid #a8a8aa;
                            }
                            .city-item {
                                margin-left: 25px;
                                .county-item {
                                    margin-left: 25px;
                                }
                            }
                        }
                        &:last-child {
                            a {
                                border: 0;
                            }
                        }
                        .titleRight {
                            line-height: 40px;
                            height: 40px;
                            background-color: #e5e6e8;
                            padding: 0 10px;
                            > {
                                .delChoice {
                                    color: rgb(150, 170, 200);
                                }
                                span {
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
    }


</style>
