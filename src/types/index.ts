export interface IVuexTypes {
  [key: string]: string;
}

export interface IRoute {
  operator: string;
  route: string;
}



export interface IBusStop {
  stopid: string;
  displaystopid: string;
  shortname: string;
  shortnamelocalized: string;
  fullname: string;
  fullnamelocalized: string;
  latitude: string;
  longitude: string;
  operators?: any[];
}

export interface IBusLine {
  operator: string;
  origin: string;
  originlocalized: string;
  destination: string;
  destinationlocalized: string;
  lastupdated: string;
  stops: IBusStop[];
}

export interface IBusRoutesState {
  routes: IRoute[];
  filterText: string;
  selectedRoute: string | null;
}

export interface IBusStopsState {
  stops: IBusStop[];
  searchText: string;
  selectedStop: string | null;
}