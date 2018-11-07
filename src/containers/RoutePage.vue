<template>
  <div class="route-page pure-g">
    <div class="route-page pure-u-1-3">
      <div class="route-page__header">
        Stops for route #{{selectedRoute}}
      </div>
      <div class="route-page__filter">
        <label for="route-page-filter">
          Filter Stops: 
        </label>
        <input id="route-page-filter" @input="handleSearch" :value="stopSearchText" class="route-page__filter__input"/>
      </div>
          <div v-if="status === 'NOT_FOUND'">No data found for route #{{selectedRoute}}</div>
          <div v-else class="route-page__list" v-for="stop in filteredStops" :key="stop.stopid">
            <stop-selector :route="selectedRouteData" :stop="stop"/>
          </div>

    </div>
    <div class="pure-u-2-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Route } from "vue-router";
import { mapGetters, mapActions } from "vuex";
import Spinner from '@/components/Spinner.vue';
import StopSelector from '@/components/StopSelector.vue';

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
    routeFromUrl: {
      type: String,
      default: ""
    }
  },
  async created() {
    await this.clearStops();
    await this.selectRoute(this.routeFromUrl);
    await this.checkForChanges();
  },
  async beforeRouteUpdate(to, from, next) {
    console.log({to, from, next})
    if (to.params.routeFromUrl !== this.selectedRoute) {
      await this.clearStops();
      await this.selectRoute(this.routeFromUrl);
      await this.checkForChanges();
    }
    next();
  },
  computed: {
    ...mapGetters([
      'stopSearchText',
      'filteredStops',
      "selectedRouteData",
      "selectedRouteData",
      "selectedRoute",
      "allStopsForRoute"
    ])
  },
  methods: {
    ...mapActions(['setStopSearchText', "loadStopsFromAPI", "selectRoute", 'clearStops']),
    async checkForChanges() {
      this.status = dataStatus.isLoading;
      await Promise.all([
        !this.allStopsForRoute.length ? this.loadStopsFromAPI(this.selectedRoute) : null
      ]);

      this.status =
        this.selectedRouteData && this.allStopsForRoute.length
          ? dataStatus.isLoaded
          : dataStatus.notFound;
    },
    handleSearch(event: any) {
      const { value } = event.target;
      this.setStopSearchText(value);
    },
  }, 
  components: {
    'loading-spinner': Spinner,
    'stop-selector': StopSelector,
  }
});
</script>

<style lang="sass">
  .loader
    text-align: center
  .route-page a
    text-decoration: none

  .route-page
    background: linear-gradient(to right, #f0f9ff 0%,#cbebff 47%,#a1dbff 100%) //http://colorzilla.com/gradient-editor/#f0f9ff+0,cbebff+47,a1dbff+100;Blue+3D+%2313 
    &__header
      padding: 15px
      font-size: 25px
    &__filter
      padding: 15px

  .float-left
    float: left
</style>