import { Commit, ModuleTree } from "vuex";
import Api from "@/apiInterface";
import { IVuexTypes } from "@/types";

interface ITimetableState {
  timetable: any | null;
}

export const busTimetableTypes: IVuexTypes = ["LOAD_TIMETABLE"].reduce(
  (pv, cv) => ({ ...pv, [cv]: cv }),
  {}
);

const initialState: ITimetableState = {
  timetable: null
};

const getterMethods: any = {
  timetable: ({ timetable }: any): any | null => timetable
};

const actions = {
  loadTimetable: ({ commit }: any, timetable: any) =>
    commit(busTimetableTypes.LOAD_TIMETABLE, timetable),
  clearTimetable: ({ commit }: any) =>
    commit(busTimetableTypes.LOAD_TIMETABLE, null)
};

const asyncActions = (api: Api) => ({
  loadTimetableFromApi: (
    { dispatch, rootState }: any,
    {selectedRoute, selectedStop}: { selectedRoute?: string; selectedStop?: string }
  ) =>
    new Promise((resolve, reject) => {
      const route: string =
        selectedRoute || rootState.BusRoutes.selectedRoute;
      const stop: string =
        selectedStop || rootState.BusRoutes.selectedStop;
      if (!route) {
        reject("route is not defined");
        return;
      }
      if (!stop) {
        reject("stop is not defined");
        return;
      }
      api
        .getTimetable(route, stop)
        .then((timetable: any) => {
          resolve(dispatch("loadTimetable", timetable));
        })
        .catch((miscError: any) => {
          console.error(miscError);
          reject(miscError);
        });
    })
});

const mutations = {
  [busTimetableTypes.LOAD_TIMETABLE]: (
    state: ITimetableState,
    timetable: any
  ) => {
    state.timetable = timetable;
  }
};

export default (api: Api) => ({
  state: initialState,
  mutations,
  actions: {
    ...actions,
    ...asyncActions(api)
  },
  getters: getterMethods
});
