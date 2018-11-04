import { Commit } from "vuex";
import Api from "@/apiInterface";
import { IRoute, IVuexTypes, IBusRoutesState} from "@/types";


const api = new Api();

const busRoutesTypes: IVuexTypes = [
  "LOAD_BUS_ROUTES",
  "SELECT_ROUTE",
  "FILTER_ROUTES_BY_TEXT"
].reduce((pv, cv) => ({ ...pv, [cv]: cv }), {});

const initialState: IBusRoutesState = {
  routes: [],
  filterText: "",
  selectedRoute: null
};

const getterMethods: any = {
  routesMap: ({ routes }: IBusRoutesState): { [key: string]: IRoute } =>
    routes.reduce((pv, route) => ({ ...pv, [route.route]: route }), {}),
  filteredRoutes: ({ routes, filterText }: IBusRoutesState): IRoute[] =>
    routes.filter((route): boolean => route.route.includes(filterText)),
  selectedRouteData: (
    { selectedRoute }: IBusRoutesState,
    { routesMap }: any
  ): IRoute | null => (selectedRoute !== null ? routesMap[selectedRoute] : null)
};

const actions = {
  loadRoutes: ({ commit }: { commit: Commit }, routes: IRoute[]) => {
    commit(busRoutesTypes.LOAD_BUS_ROUTES, routes);
  },
  selectRoute: ({ commit }: { commit: Commit }, route: string): void => {
    commit(busRoutesTypes.SELECT_ROUTE, route);
  },
  filterRoutesByText: ({ commit }: { commit: Commit }, text: string): void => {
    commit(busRoutesTypes.FILTER_ROUTES_BY_TEXT, text);
  }
};

// asynchronous actions should dispatch a synchronous action and return
// a dispatch() call which will result in a promise.
// This is particularly important in testing so that we can
// manipulate the state or bypass calling the api alltogether.
const asyncActions = {
  loadRoutesFromAPI: ({ dispatch }: any): Promise<any> =>
    api
      .getBusRoutes()
      .then((routes: IRoute[]) => dispatch("loadRoutes", routes))
      .catch((err: Error) => {
        console.error(err);
      })
};

const mutations = {
  [busRoutesTypes.LOAD_BUS_ROUTES]: (
    state: IBusRoutesState,
    routes: IRoute[]
  ) => {
    state.routes = routes;
  },
  [busRoutesTypes.SELECT_ROUTE]: (state: IBusRoutesState, route: string) => {
    state.selectedRoute = route;
  },
  [busRoutesTypes.FILTER_ROUTES_BY_TEXT]: (state: IBusRoutesState, text: string) => {
    state.filterText = text;
  }
};

export default {
  state: initialState,
  mutations,
  actions: { ...actions, ...asyncActions },
  getters: getterMethods
};
