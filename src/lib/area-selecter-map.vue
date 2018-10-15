<template>
    <div class="warp-main">
        <div class="areaWrap">
            <div class="searchWrap">
                <div class="wrap">
                    <ul class="left">
                        <li class="province-item" v-for="(province, keyProvince) in dataList[100000]">
                            <input @click="provinceClick(keyProvince)" v-model="province.sel" type="checkbox">
                            <span>{{province.name}}</span>
                            <a href="javascript:;" class="checkBtn"
                               @click="addCity(keyProvince)">{{ province.showChild ? '-' : '+' }}</a>
                            <div class="city-item" v-if="province.showChild"
                                 v-for="(city,keyCity) in cityCache[keyProvince]">
                                <input @click="cityClick(keyCity, keyProvince)" v-model="city.sel" type="checkbox">
                                <span>{{city.name}}</span>
                                <a href="javascript:;" class="checkBtn"
                                   @click="addCountry(keyCity, keyProvince)">{{ city.showChild ? '-' : '+'}}</a>
                                <div v-if="city.showChild" class="county-item"
                                     v-for="(district, keyDistrict) in countryCache[keyCity]">
                                    <input @click="districtClick(keyDistrict, keyCity, keyProvince)"
                                           v-model="district.sel" type="checkbox">
                                    <span>{{district.name}}</span>
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
                            <li class="province-item" v-for="(province, keyProvince) in dataList[100000]">
                                <span v-if="province.sel">{{province.name}}</span>
                                <a href="javascript:;" class="checkBtn" v-if="province.sel"
                                   @click="provinceDel(province, keyProvince)">×</a>
                                <div class="city-item" v-for="(city,keyCity) in cityCache[keyProvince]">
                                    <span v-if="city.sel && !province.sel">{{city.name}}</span>
                                    <a href="javascript:;" class="checkBtn" v-if="city.sel&&!province.sel"
                                       @click="cityDel(city, keyCity)">×</a>
                                    <div class="county-item"
                                         v-for="(district, keyDistrict) in countryCache[keyCity]">
                                        <span v-if="district.sel&&!city.sel">{{district.name}}</span>
                                        <a href="javascript:;" class="checkBtn"
                                           v-if="district.sel && !city.sel"
                                           @click="dataDistrictClick(district, keyDistrict)">×</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import china from './map-area'

    const ALLPROVINCE = 100000

    export default {
        name: 'area-select',
        props: {
            areaRes: {
                type: Array,
                default: () => []
            },
            dataRource: {
              type: Object,
              default: () => {}
            },
            index: {
             type: Number,
             default: () => {}
            }
        },
        data() {
            return {
                dataList: this.dataRource || JSON.parse(JSON.stringify(china)),
                cityCache: {},
                countryCache: {},
                res: this.areaRes
            }
        },
        watch: {
            //监控选中的数据 像父组件发送
            res(val) {
                let res = null
                res = this.index ? { val, index: this.index}  : res
                this.$emit('res-change', res)
            },
            dataRource(val) {
              this.dataList = val
            }
        },
        methods: {
            // 省级添加
            addCity(keyProvince) {
                this.dataList[ALLPROVINCE][keyProvince].showChild = !this.dataList[ALLPROVINCE][keyProvince].showChild
                this.$set(this.cityCache, keyProvince, this.dataList[keyProvince])
            },
            // 市级添加
            addCountry(keyCity, keyProvince) {
                this.dataList[keyProvince][keyCity].showChild = !this.dataList[keyProvince][keyCity].showChild
                this.$set(this.countryCache, keyCity, this.dataList[keyCity])
            },

            // 省级点击
            provinceClick(key) {
                this.$nextTick(() => {
                    if (this.dataList[ALLPROVINCE][key].sel) {
                        this.selectChildNode(key, true)
                    } else {
                        this.selectChildNode(key, false)
                    }
                })
                this.calRes()
            },

            //市级点击
            cityClick(keyCity, keyProvince) {
                this.$nextTick(() => {
                    if (this.dataList[keyProvince][keyCity].sel) {
                        this.selectChildNode(keyCity, true)
                    } else {
                        this.selectChildNode(keyCity, false)
                    }
                })
                this.selectParentNode(this.dataList[keyProvince], keyProvince)
            },

            //区级点击
            districtClick(keyDistrict, keyCity, keyProvince) {
                this.selectParentNodeDis(this.dataList[keyCity], keyProvince, keyCity)
            },

            // 计算res
            calRes() {
                this.$nextTick(() => {
                    this.res = []
                    for ( let pro in this.dataList[ALLPROVINCE] ) {
                        // 第一层 省
                        if (this.dataList[ALLPROVINCE][pro].sel) {
                            this.res.push(pro)
                        } else {
                            // 第二层 市
                            for ( let city in this.dataList[pro] ) {
                                if (this.dataList[pro][city].sel) {
                                    this.res.push(city)
                                } else {
                                    // 第三层 区
                                    for ( let dis in this.dataList[city] ) {
                                        if (this.dataList[city][dis].sel) {
                                            this.res.push(dis)
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            },
            // 选择上级
            selectParentNodeDis(cityList, keyProvince, keyCity) {
                this.$nextTick(() => {
                    let flag = true
                    for ( let i in cityList ) {
                        if (!cityList[i].sel) {
                            flag = false
                        }
                        this.dataList[keyProvince][keyCity].sel = flag
                    }
                    this.selectParentNode(this.dataList[keyProvince], keyProvince)
                })
            },
            selectParentNode(cityList, keyProvince) {
                let flag = true
                for ( let i in cityList ) {
                    this.$nextTick(() => {
                        if (!cityList[i].sel) {
                            flag = false
                        }
                        this.dataList[ALLPROVINCE][keyProvince].sel = flag
                    })
                }
                this.calRes()
            },
            // 选择下级
            selectChildNode(key, flag) {
                if (flag) {
                    for ( let i in this.dataList[key] ) {
                        this.dataList[key][i].sel = true
                        for ( let ii in this.dataList[i] ) {
                            this.dataList[i][ii].sel = true
                        }
                    }
                } else {
                    for ( let i in this.dataList[key] ) {
                        this.dataList[key][i].sel = false
                        for ( let ii in this.dataList[i] ) {
                            this.dataList[i][ii].sel = false
                        }
                    }
                }
            },

            initArea() {
                this.$nextTick(() => {
                    this.res.forEach(item => {
                        for ( let pro in this.dataList[ALLPROVINCE] ) {
                            // 第一层 省
                            if (item === pro) {
                                this.dataList[ALLPROVINCE][pro].sel = true
                                this.selectChildNode(pro, true)
                            } else {
                                // 第二层 市
                                for ( let city in this.dataList[pro] ) {
                                    if (item === city) {
                                        this.addCity(pro)
                                        this.dataList[pro][city].sel = true
                                        this.selectChildNode(city, true)
                                        this.selectParentNode(this.dataList[pro], pro)
                                    } else {
                                        // 第三层 区
                                        for ( let dis in this.dataList[city] ) {
                                            if (item === dis) {
                                                this.addCity(pro)
                                                this.addCountry(city, pro)
                                                this.dataList[ALLPROVINCE][pro].showChild = true
                                                this.dataList[pro][city].showChild = true
                                                this.dataList[city][dis].sel = true
                                                this.selectParentNodeDis(this.dataList[city], pro, city)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })
                })
            },

            //省级删除
            provinceDel(data, key) {
                data.sel = false
                this.selectChildNode(key, false)
                this.calRes()
            },
            // 市级删除
            cityDel(data, key) {
                data.sel = false
                this.selectChildNode(key, false)
                this.calRes()
            },
            //区域删除
            dataDistrictClick(data, key) {
                data.sel = false
                this.selectChildNode(key, false)
                this.calRes()
            },
            //删除所有
            delAll() {
                for ( let i in this.dataList[ALLPROVINCE] ) {
                    this.dataList[ALLPROVINCE][i].sel = false
                    this.selectChildNode(i, false)
                }
                this.calRes()
                this.dataList = JSON.parse(JSON.stringify(china))
            }
        },
        created() {

        },
        mounted() {
            this.initArea()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .areaWrap {
        .searchWrap {
            position: relative;
            .wrap {
                ul {
                    overflow: auto;
                    height: 600px;
                }
                .left {
                    border: 1px solid #c3c3c5;
                    width: 240px;
                    height: 280px;
                    margin-right: 10px;
                    float: left;
                    li {
                        margin: 5px 10px;
                        display: block;
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
                    .choiceAll {
                        height: 240px;
                        overflow: auto;
                    }
                }
            }
        }
    }

    .right {
        float: right;
    }

    /*重置样式*/
    * {
        margin: 0;
        padding: 0
    }

    li {
        list-style: none
    }

    a, a:hover, a:focus {
        text-decoration: none;
    }


</style>
