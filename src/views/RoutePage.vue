<template>
  <div class="about">
    <h1>This is an about page for route {{routeFromUrl}}</h1>
    <p>The route data {{status}}</p>
    <pre>{{JSON.stringify(selectedRouteData, null, 2)}}</pre>
    <div v-for="stop in allStopsForRoute" :key="stop.stopid">
      <hr/>
      <pre>{{JSON.stringify(stop, null, 2)}}</pre>
      <p>
        <router-link :to="`/route/${routeFromUrl}/stop/${stop.stopid}`">{{stop.stopid}}</router-link>
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Route } from "vue-router";
import { mapGetters, mapActions } from "vuex";

const dataStatus = {
  notLoaded: "has not been loaded",
  isLoading: "is loading",
  isLoaded: "is loaded",
  notFound: "cannot be found"
};

export default Vue.component("route-page", {
  data() {
    return {
      status: dataStatus.notLoaded
    };
  },
  props: {
    routeFromUrl: {
      type: String,
      default: ""
    }
  },
  async created() {
    await this.selectRoute(this.routeFromUrl);
    await this.checkForChanges();
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.params.routeFromUrl !== this.selectedRoute) {
      await this.selectRoute(this.routeFromUrl);
      await this.checkForChanges();
    }
    next();
  },
  computed: {
    ...mapGetters([
      "selectedRouteData",
      "selectedRouteData",
      "selectedRoute",
      "allStopsForRoute"
    ])
  },
  methods: {
    ...mapActions(["loadRoutesFromAPI", "loadStopsFromAPI", "selectRoute"]),
    async checkForChanges() {
      this.status = dataStatus.isLoading;
      await Promise.all([
        !this.selectedRouteData ? this.loadRoutesFromAPI() : null,
        !this.allStopsForRoute.length ? this.loadStopsFromAPI() : null
      ]);

      this.status =
        this.selectedRouteData && this.allStopsForRoute.length
          ? dataStatus.isLoaded
          : dataStatus.notFound;
    }
  }
});
</script>