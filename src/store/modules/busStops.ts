import { Commit } from "vuex";
import Api from "@/apiInterface";
import { IVuexTypes, IBusStopsState, IBusStop, IBusLine } from "@/types";

export const busStopsTypes: IVuexTypes = [
  "LOAD_BUS_STOPS",
  "SELECT_STOP",
  "SET_STOPS_SEARCH_TEXT"
].reduce((pv, cv) => ({ ...pv, [cv]: cv }), {});

interface IStopsMap {
  [key: string]: IBusStop;
}

const initialState = {
  stops: [],
  selectedStop: null,
  searchText: ""
};

const getterMethods: any = {
  stopsMap: ({ stops }: IBusStopsState): IStopsMap =>
    stops.reduce(
      (pv: IStopsMap, stop: IBusStop) => ({ ...pv, [stop.stopid]: stop }),
      {}
    ),
  filteredStops: ({ stops, searchText }: IBusStopsState): IBusStop[] =>
    stops.filter(
      (stop): boolean =>
        [
          stop.stopid,
          stop.displaystopid,
          stop.shortname,
          stop.shortnamelocalized,
          stop.fullname,
          stop.fullnamelocalized
        ].some(property => property.includes(searchText))
    ),
  selectedStopData: (
    { selectedStop }: IBusStopsState,
    { stopsMap }: any
  ): IBusStop | null => (selectedStop !== null ? stopsMap[selectedStop] : null)
};

const actions = {
  loadStops: ({ commit }: { commit: Commit }, stops: IBusStop[]) => {
    commit(busStopsTypes.LOAD_BUS_STOPS, stops);
  },
  selectStop: ({ commit }: { commit: Commit }, stop: string): void => {
    commit(busStopsTypes.SELECT_STOP, stop);
  },
  setStopSearchText: ({ commit }: { commit: Commit }, text: string): void => {
    commit(busStopsTypes.SET_STOPS_SEARCH_TEXT, text);
  }
};

// asynchronous actions should dispatch a synchronous action and return
// a dispatch() call which will result in a promise.
// This is particularly important in testing so that we can
// manipulate the state or bypass calling the api alltogether.
// Any data formatting or manipulation we need to do is also here,
// as we want only *raw* data from the api interface, and only *formatted*
// data in the store.  It *could* go into the synchronous actions,
// but why put extra logic in there?
const asyncActions = (api: Api = new Api()) => ({
  loadStopsFromAPI: (
    { dispatch, rootState }: any,
    selectedRoute?: string
  ): Promise<any> =>
    new Promise((resolve, reject) => {
      if (!selectedRoute) {
        selectedRoute = rootState.BusRoutes.selectedRoute;
        if (!selectedRoute) {
          reject("No route has been selected");
          return null;
        }
      }

      api
        .getBusStops(selectedRoute)
        .then((lines: IBusLine[]) => {
          return lines.reduce(
            (pv: IBusStop[], cv: IBusLine): IBusStop[] => pv.concat(cv.stops),
            []
          );
        })
        .then(
          (allStops: IBusStop[]): IBusStop[] =>
            Object.values(
              allStops.reduce((pv: any, cv: IBusStop) => {
                pv[cv.stopid] = cv;
                return pv;
              }, {})
            )
        )
        .then((uniqueStops: IBusStop[]) => {
          resolve(dispatch("loadStops", uniqueStops));
        })
        .catch((err: any) => {
          console.error(err);
          reject(err);
        });
    })
});

const mutations = {
  [busStopsTypes.LOAD_BUS_STOPS]: (
    state: IBusStopsState,
    stops: IBusStop[]
  ) => {
    state.stops = stops;
  },
  [busStopsTypes.SELECT_STOP]: (state: IBusStopsState, stop: string) => {
    state.selectedStop = stop;
  },
  [busStopsTypes.SET_STOPS_SEARCH_TEXT]: (
    state: IBusStopsState,
    text: string
  ) => {
    state.searchText = text;
  }
};

export default (api: Api) => ({
  state: initialState,
  mutations,
  actions: { ...actions, ...asyncActions(api) },
  getters: getterMethods
});
