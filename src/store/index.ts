import Vue from "vue";
import Vuex from "vuex";
import BusRoutes from '@/store/modules/busRoutes';
import BusStops from '@/store/modules/busStops';
import BusTimetable from '@/store/modules/busTimetable';
import Api from '@/apiInterface';

const api = new Api();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    BusRoutes: BusRoutes(api),
    BusStops: BusStops(api),
    BusTimetable: BusTimetable(api),
  },
});

