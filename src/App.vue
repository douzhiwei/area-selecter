<template>
    <div id="app">
        <area-select ref="areaSelect" :areaRes="areaRes" @res-change="areaResChange"></area-select>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                areaRes: [ "120000", "130000", "140105", "140106", "140107", "140108"]
            }
        },
        methods: {
            areaResChange(val) {

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
