<template>
    <i :class="`oc-icon-${name}`"></i>你好
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name:"OcIcon",
    props:{
        name:{
            type:String,
            default:""
        }
    }
})
</script>
<style>
</style>