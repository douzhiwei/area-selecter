<template>
    <div id="app">
        <area-selecter ref="areaSelecter" :areaRes="areaRes" @res-change="areaResChange"></area-selecter>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                areaRes: ['110000']
            }
        },
        methods: {
            areaResChange(val) {

            }
        },
        mounted() {
            this.$refs.areaSelecter.initArea()

        }
    }
</script>

<style>
    #app {
        width: 100%;
    }
</style>
