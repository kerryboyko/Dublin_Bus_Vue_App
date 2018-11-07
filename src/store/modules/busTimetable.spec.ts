import Vue from "vue";
import Vuex from "vuex";
import Api from "@/apiInterface";
import BusRoutes from "@/store/modules/busRoutes";
import BusStops from "@/store/modules/busStops";
import BusTimetable from "@/store/modules/busTimetable";

jest.mock("@/apiInterface");

const api = new Api();
const idealTimetable = ["11:00", "12:00", "13:00"];
Vue.use(Vuex);

const TestVue = new Vue({
  store: new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      BusRoutes: BusRoutes(api),
      BusStops: BusStops(api),
      BusTimetable: BusTimetable(api)
    }
  })
});

const { dispatch, getters } = TestVue.$store;

const state = TestVue.$store.state.BusTimetable;

describe("/src/store/modules/busTimetable", () => {
  describe("state", () => {
    it("has an initial state", () => {
      expect(state).toEqual({ timetable: null });
    });
  });
  describe("asyncActions()", () => {
    it("loadsTimetableFromAPI", async () => {
      await dispatch("loadTimetableFromAPI", {
        selectedRoute: "25",
        selectedStop: "26"
      });
      expect(state.timetable).toEqual(idealTimetable);
      expect(getters.timetable).toEqual(idealTimetable);
    });
  });
  describe('clearTimetable', () => {
    it('clears the timetables', async () => {
      await dispatch('clearTimetable');
      expect(state).toEqual({timetable: null});
    })
  })
});
