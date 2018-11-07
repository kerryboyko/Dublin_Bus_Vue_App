<template>
  <router-link :to="`/route/${route.route}`">
    <div class="bus-route"> 
      <div class="bus-route__label">#{{route.route}}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("bus-route", {
  props: ['route']
});
</script>


<style lang="sass">
  .bus-route
    padding: 3px 15px
    font-size: 20px
    &:hover
      background: linear-gradient(to right, #43b4ff 0%,#2baeff 47%,#0fa3ff 100%) //http://colorzilla.com/gradient-editor/#43b4ff+0,2baeff+47,0fa3ff+100

    
</style>
