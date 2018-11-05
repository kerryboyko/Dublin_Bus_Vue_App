import Vue from "vue";
import Vuex from "vuex";
import BusRoutes from "@/store/modules/busRoutes";
import BusStops from "@/store/modules/busStops";
import BusTimetable from "@/store/modules/busTimetable";
import Api from "@/apiInterface";

import createLogger from "vuex/dist/logger";

const api = new Api();
Vue.use(Vuex);

console.log(process.env.NODE_ENV);

export default new Vuex.Store({
  plugins: process.env.NODE_ENV === "development" 
    ? [createLogger({})] 
    : [],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    BusRoutes: BusRoutes(api),
    BusStops: BusStops(api),
    BusTimetable: BusTimetable(api)
  }
});
