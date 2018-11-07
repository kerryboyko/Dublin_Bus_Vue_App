<template>
  <div class="home pure-g">
    <div class="pure-u-1-4">
      <BusRoutes />
    </div>
      <router-view class="pure-u-3-4"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BusRoutes from "./BusRoutes.vue";

export default Vue.component("home-page", {
  components: {
    BusRoutes
  }
});
</script>
