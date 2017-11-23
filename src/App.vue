<template>
    <div id="app">
        <area-selecter :areaRes="areaRes" @res-change="areaResChange"></area-selecter>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                areaRes: []
            }
        },
        methods:{
            areaResChange(val){
               console.log(val)
            }
        }
    }
</script>

<style>
#app{
    width: 100%;
}
    .left {
        float: left;
    }
</style>
