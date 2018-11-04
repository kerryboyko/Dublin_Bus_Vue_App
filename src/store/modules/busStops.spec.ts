import Vue from "vue";
import Vuex from "vuex";
import Api from '@/apiInterface';
import BusRoutes from "@/store/modules/busRoutes";
import BusStops from "@/store/modules/busStops";

jest.mock("@/apiInterface");

const api = new Api();

Vue.use(Vuex);

const TestVue = new Vue({
  store: new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { BusRoutes: BusRoutes(api), BusStops: BusStops(api) }
  })
});

const { dispatch, getters } = TestVue.$store;
const state = TestVue.$store.state.BusStops;
const idealStops = [
  {
    stopid: "0",
    displaystopid: "0",
    shortname: "balgaddy",
    shortnamelocalized: "0",
    fullname: "0",
    fullnamelocalized: "0",
    latitude: "0",
    longitude: "0",
    operators: { route: "25", operator: "bac" }
  },
  {
    stopid: "1",
    displaystopid: "1",
    shortname: "balsolly",
    shortnamelocalized: "1",
    fullname: "1",
    fullnamelocalized: "1",
    latitude: "1",
    longitude: "1",
    operators: { route: "25", operator: "bac" }
  },
  {
    stopid: "2",
    displaystopid: "2",
    shortname: "donebal",
    shortnamelocalized: "2",
    fullname: "2",
    fullnamelocalized: "2",
    latitude: "2",
    longitude: "2",
    operators: { route: "25", operator: "bac" }
  },
  {
    stopid: "3",
    displaystopid: "3",
    shortname: "3",
    shortnamelocalized: "3",
    fullname: "3",
    fullnamelocalized: "3",
    latitude: "3",
    longitude: "3",
    operators: { route: "25", operator: "bac" }
  },
  {
    stopid: "4",
    displaystopid: "4",
    shortname: "4",
    shortnamelocalized: "4",
    fullname: "4",
    fullnamelocalized: "4",
    latitude: "4",
    longitude: "4",
    operators: { route: "25", operator: "bac" }
  }
];

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
      expect(state.stops).toHaveLength(25);
    });
  });
  describe("actions", () => {
    it("loadStops()", async () => {
      await dispatch("loadStops", idealStops);
      expect(state.stops).toEqual(idealStops);
    });
    it("setStopSearchText()", async () => {
      await dispatch("setStopSearchText", "bal");
      expect(state.searchText).toBe("bal");
    });
    it("selectStop()", async () => {
      await dispatch("selectStop", "2");
      expect(state.selectedStop).toBe("2");
    });
  });
  describe("getters", () => {
    it("get()stopsMap", () => {
      expect(Object.keys(getters.stopsMap).sort()).toEqual(
        ["0", "1", "2", "3", "4"].sort()
      );
      idealStops.forEach(stop => {
        expect(getters.stopsMap[stop.stopid]).toEqual(stop);
      });
    });
    it("get()filteredStops", () => {
      expect(getters.filteredStops).toEqual(idealStops.slice(0, 3));
    });
    it("get()selectedStopData", () => {
      expect(getters.selectedStopData).toEqual({
        stopid: "2",
        displaystopid: "2",
        shortname: "donebal",
        shortnamelocalized: "2",
        fullname: "2",
        fullnamelocalized: "2",
        latitude: "2",
        longitude: "2",
        operators: { route: "25", operator: "bac" }
      });
    });
  });
  describe("clearing action", () => {
    it('clearStops', async () => {
      await dispatch('clearStops', () => {
        expect(state).toEqual({
          searchText: "",
          selectedStop: null,
          stops: []
        });
      })
    })
  })
});
