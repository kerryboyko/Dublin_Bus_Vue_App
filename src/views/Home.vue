<template>
  <div class="home">
    <h2>Dublin Bus Routes</h2>
    <BusRoutes />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BusRoutes from "./BusRoutes.vue";

export default Vue.component('home-page', {
  components: {
    BusRoutes
  }
})

</script>
