import Vue from "vue";
import Vuex from "vuex";
import BusRoutes from "@/store/modules/busRoutes";
import BusStops from "@/store/modules/busStops";

jest.mock('@/apiInterface');

Vue.use(Vuex);

const TestVue = new Vue({
  store: new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { BusRoutes, BusStops }
  })
});

const { dispatch, getters } = TestVue.$store;
const state = TestVue.$store.state.BusStops;

describe("/src/store/modules/busStops", () => {
  describe("state", () => {
    it("has an initial state", () => {
      expect(state).toEqual({
        searchText: "",
        selectedStop: null,
        stops: []
      });
    });
  });
  describe("asyncActions", () => {
    it("loadStopsFromAPI()", async () => {
      await dispatch("loadStopsFromAPI", "25");
      expect(state.stops.length).toBeGreaterThan(0);
      [
        "stopid",
        "displaystopid",
        "shortname",
        "shortnamelocalized",
        "fullname",
        "fullnamelocalized",
        "latitude",
        "longitude"
      ].forEach((property: string) => {
        state.stops.forEach((stop: any) => {
          expect(stop[property]).toBeDefined();
        });
      });
    });
  });
});
