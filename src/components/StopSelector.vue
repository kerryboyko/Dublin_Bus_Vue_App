<template>
  <router-link :to="`/route/${route.route}/stop/${stop.stopid}`">
    <div class="bus-stop"> 
      <div class="bus-stop__label">{{stop.stopid}} - {{stop.shortname}}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("bus-stop", {
  props: ["route", "stop"]
});
</script>


<style lang="sass">
  .bus-stop
    padding: 3px 15px
    font-size: 20px
    &:hover
      background: linear-gradient(to right, #43b4ff 0%,#2baeff 47%,#0fa3ff 100%) //http://colorzilla.com/gradient-editor/#43b4ff+0,2baeff+47,0fa3ff+100

    
</style>
