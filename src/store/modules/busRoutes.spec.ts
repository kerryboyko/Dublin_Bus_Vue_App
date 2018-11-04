import Vue from "vue";
import Vuex from "vuex";
import BusRoutes from "@/store/modules/busRoutes";
import Api from "@/apiInterface";

jest.mock("@/apiInterface");

Vue.use(Vuex);

const TestVue = new Vue({
  store: new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { BusRoutes: BusRoutes(new Api("http://localhost")) }
  })
});

const idealState = {
  routes: [
    {
      operator: "bac",
      route: "201"
    },
    {
      operator: "bac",
      route: "202"
    },
    {
      operator: "bac",
      route: "203"
    },
    {
      operator: "bac",
      route: "205"
    },
    {
      operator: "bac",
      route: "236"
    },
    {
      operator: "bac",
      route: "207"
    },
    {
      operator: "bac",
      route: "217"
    },
    {
      operator: "bac",
      route: "120"
    }
  ],
  filterText: "20",
  selectedRoute: "236"
};

const testRoutes = idealState.routes;
const { dispatch, getters } = TestVue.$store;
const state = TestVue.$store.state.BusRoutes;

describe("/src/store/modules/busRoutes", () => {
  describe("state", () => {
    it("has a store with initial state", () => {
      expect(state).toEqual({
        filterText: "",
        routes: [],
        selectedRoute: null
      });
    });
  });
  describe("asyncActions", () => {
    it("loadRoutesFromAPI()", async () => {
      await dispatch("loadRoutesFromAPI");
      expect(state.routes.length).toBeGreaterThan(0);
      expect(state.routes.every((route: any) => route.operator === "bac")).toBe(
        true
      );
      expect(
        state.routes.every((route: any) => typeof route.route === "string")
      ).toBe(true);
    });
  });
  describe("actions", () => {
    it("loadRoutes()", async () => {
      await dispatch("loadRoutes", []);
      expect(state.routes).toEqual([]);
      await dispatch("loadRoutes", testRoutes);
      expect(state.routes).toEqual(testRoutes);
    });
    it("selectRoute()", async () => {
      await dispatch("selectRoute", "236");
      expect(state.selectedRoute).toBe("236");
    });
    it("filterRoutesByText", async () => {
      await dispatch("filterRoutesByText", "20");
      expect(state.filterText).toBe("20");
    });
  });
  describe("getters", () => {
    it("has a confirmed iniqtial state at this point in the test", () => {
      expect(state).toEqual(idealState);
    });
    it("routesMap", () => {
      expect(getters.routesMap).toEqual({
        "120": {
          operator: "bac",
          route: "120"
        },
        "201": {
          operator: "bac",
          route: "201"
        },
        "202": {
          operator: "bac",
          route: "202"
        },
        "203": {
          operator: "bac",
          route: "203"
        },
        "205": {
          operator: "bac",
          route: "205"
        },
        "207": {
          operator: "bac",
          route: "207"
        },
        "217": {
          operator: "bac",
          route: "217"
        },
        "236": {
          operator: "bac",
          route: "236"
        }
      });
    });
    it("filteredRoutes", () => {
      expect(getters.filteredRoutes).toEqual([
        { operator: "bac", route: "201" },
        { operator: "bac", route: "202" },
        { operator: "bac", route: "203" },
        { operator: "bac", route: "205" },
        { operator: "bac", route: "207" },
        { operator: "bac", route: "120" }
      ]);
    });
    it("selectedRouteData", () => {
      expect(getters.selectedRouteData).toEqual({
        operator: "bac",
        route: "236"
      });
    });
  });
  describe("clearingAction", () => {
    it("resets the state", async () => {
      await dispatch("clearRoutes");
      expect(state).toEqual({
        filterText: "",
        routes: [],
        selectedRoute: null
      });
    });
  });
});
