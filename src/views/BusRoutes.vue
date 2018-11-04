<template>
  <div class="home">
    <div>
        <h3>Bus Route List</h3>
        <pre>{{JSON.stringify(selectedRouteData)}}</pre>
        <p>
          <input @input="handleFilter" :value="filterText" />
          <!--using @change only triggers when enter is pressed -->
        </p>
        <pre>{{filterText}}</pre>
        <button @click="loadRoutesFromAPI">Load Routes from API</button>
        <ul v-for="route in filteredRoutes" :key="route.route">
          <li><a href="#">{{route.route}}</a></li>
        </ul>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.component("bus-routes", {
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
    }
  }
});
</script>


<style lang="sass">

</style>
