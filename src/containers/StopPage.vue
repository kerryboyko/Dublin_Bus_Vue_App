<template>
  <div class="stop-page">
    <div class="stop-page__header">
      Timetable for stop #{{selectedStop}}
    </div>
    <loading-spinner class="loader" v-if="status === 'LOADING'"/>
    <div v-if="status === 'NOT_FOUND'">No data found for route #{{selectedRoute}}</div>
    <div v-else class="stop-page__list" v-for="time in timetable" :key="time.arrivaldatetime">
      <div>Bus for route {{selectedRoute}} {{time.direction}}</div>
      <div>Heading from {{time.origin}} to {{time.destination}}</div>
      <div>Arrives: {{time.duetime}} minutes from now at {{time.arrivaldatetime}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Route } from "vue-router";
import { mapGetters, mapActions } from "vuex";

const dataStatus = {
  notLoaded: "NOT_LOADED",
  isLoading: "LOADING",
  isLoaded: "LOADED",
  notFound: "NOT_FOUND"
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
      "timetable"
    ])
  },
  methods: {
    ...mapActions([
      "loadTimetableFromAPI",
    ]),
    async checkForChanges() {
      this.status = dataStatus.isLoading;
      await Promise.all([
        !this.timetable || this.stopIdFromUrl !== this.selectedStop
          ? this.loadTimetableFromAPI({
              selectedRoute: this.routeFromUrl,
              selectedStop: this.stopIdFromUrl
            })
          : null
      ]);

      this.status =
        this.timetable && this.timetable.length
          ? dataStatus.isLoaded
          : dataStatus.notFound;
    }
  }
});
</script>


<style lang="sass">
  .stop-page
    background: linear-gradient(to right, #f0f9ff 0%,#cbebff 47%,#a1dbff 100%) //http://colorzilla.com/gradient-editor/#f0f9ff+0,cbebff+47,a1dbff+100;Blue+3D+%2313 
    &__header
      padding: 15px
      font-size: 25px
    &__filter
      padding: 15px
    &__list
      padding: 15px
</style>