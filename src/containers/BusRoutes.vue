<template>
    <div class="bus-routes">
      <div class="bus-routes__header">
        Available Routes: 
      </div>
      <div class="bus-routes__filter">
        <label for="bus-routes-filter">
          Filter Results: 
        </label>
        <input id="bus-routes-filter" @input="handleFilter" :value="filterText" class="bus-routes__filter__input"/>
      </div>
      <div class="bus-routes__list" v-for="route in filteredRoutes" :key="route.route">
        <bus-route-selector :route="route"/>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import BusRouteSelector from "@/components/BusRouteSelector.vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.component("bus-routes", {
  created() {
    this.loadRoutesFromAPI();
  },
  computed: {
    ...mapGetters([
      "routes",
      "filteredRoutes",
      "selectedRouteData",
      "filterText"
    ])
  },
  methods: {
    ...mapActions(["loadRoutesFromAPI", "filterRoutesByText"]),
    handleFilter(event: any) {
      const { value } = event.target;
      this.filterRoutesByText(value);
    },
    reloadRoutes() {
      this.loadRoutesFromAPI();
    }
  },
  components: {
    "bus-route-selector": BusRouteSelector
  }
});
</script>


<style lang="sass">
  .bus-routes a
    text-decoration: none

  .bus-routes
    background: linear-gradient(to right, #f0f9ff 0%,#cbebff 47%,#a1dbff 100%) //http://colorzilla.com/gradient-editor/#f0f9ff+0,cbebff+47,a1dbff+100;Blue+3D+%2313 
    &__header
      padding: 15px
      font-size: 25px
    &__filter
      padding: 15px

</style>
