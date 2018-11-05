<template>
  <div class="about">
    <h1>This is an about page for stop {{stopIdFromUrl}}</h1>
    <p>The stop data {{status}}</p>
    <pre>{{JSON.stringify(selectedStopData, null, 2)}}</pre>
    <div v-for="time in timetable" :key="JSON.stringify(time)">
      <hr/>
      <pre>{{JSON.stringify(time, null, 2)}}</pre>
    </div>
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
    stopIdFromUrl: {
      type: String,
      default: ""
    },
    routeFromUrl: {
      type: String,
      default: ""
    }
  },
  async created() {
    await this.selectStop(this.stopIdFromUrl);
    await this.checkForChanges();
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.params.stopIdFromUrl !== this.selectedStop) {
      await this.selectRoute(this.stopIdFromUrl);
      await this.checkForChanges();
    }
    next();
  },
  computed: {
    ...mapGetters([
      "selectedRoute",
      "selectedStop",
      "selectedStopData",
      "timetable"
    ])
  },
  methods: {
    ...mapActions([
      "loadRoutesFromAPI",
      "loadStopsFromAPI",
      "loadTimetableFromAPI",
      "selectRoute",
      "selectStop"
    ]),
    async checkForChanges() {
      this.status = dataStatus.isLoading;
      await Promise.all([
        !this.selectedRouteData ? this.loadRoutesFromAPI() : null,
        !this.selectedStopData
          ? this.loadStopsFromAPI(this.routeFromUrl)
          : null,
        !this.timetable || this.stopIdFromUrl !== this.selectedStop
          ? this.loadTimetableFromAPI({
              selectedRoute: this.routeFromUrl,
              selectedStop: this.stopIdFromUrl
            })
          : null
      ]);

      this.status =
        this.selectedRouteData && this.allStopsForRoute.length
          ? dataStatus.isLoaded
          : dataStatus.notFound;
    }
  }
});
</script>