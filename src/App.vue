<template>
    <div id="app">
        <div style="overflow: hidden">
            <area-select ref="areaSelect" :areaRes="areaRes" @res-change="areaResChange"></area-select>
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
                selectList: []
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
