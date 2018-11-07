import { IRoute } from "@/types";
import { resolve } from "path";

// __mocks__/request.js

export const API_URL = `https://data.smartdublin.ie/cgi-bin/rtpi`;

export default class Api {
  constructor(private apiUrl: string = API_URL) {}
  public getBusRoutes = (): Promise<IRoute[]> =>
    new Promise(getBusRoutesResolve => {
      setTimeout(() => {
        getBusRoutesResolve(
          [1, 2, 3, 4, 5, 6].map(num => ({
            operator: "bac",
            route: num.toString()
          }))
        );
      }, 1000);
    });
  public getBusStops = (routeNumber: string): Promise<any> =>
    new Promise(getBusStopsResolve => {
      setTimeout(() => {
        const data: any[] = [null, null, null, null, null];
        for (let i = 0; i < 5; i++) {
          data[i] = {
            operator: `${i}`,
            origin: "x",
            "originlocalized:": "x",
            destination: "x",
            destinationlocalized: "x",
            lastupdated: "x",
            stops: []
          };
          for (let j = 0; j < 5; j++) {
            data[i].stops.push({
              stopid: `${i * 5 + j}`,
              displaystopid: `${i * 5 + j}`,
              shortname: `${i * 5 + j}`,
              shortnamelocalized: `${i * 5 + j}`,
              fullname: `${i * 5 + j}`,
              fullnamelocalized: `${i * 5 + j}`,
              latitude: `${i * 5 + j}`,
              longitude: `${i * 5 + j}`,
              operators: { route: routeNumber, operator: "bac" }
            });
          }
        }
        getBusStopsResolve(data);
      }, 2000);
    });
  public getTimetable = (route: string, stop: string): Promise<any> =>
    new Promise(getTimetableResolve => {
      setTimeout(() => {
        const data = ["11:00", "12:00", "13:00"];
        getTimetableResolve(data);
      }, 3000);
    });
}
