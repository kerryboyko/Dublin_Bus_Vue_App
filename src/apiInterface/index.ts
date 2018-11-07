import request from "superagent";
import { IRoute } from "@/types";
import { resolve } from "dns";

interface IRouteResponse {
  errorcode: string | number;
  errormessage: string;
  numberofresults: number;
  results: IRoute[];
}

export const API_URL = `https://data.smartdublin.ie/cgi-bin/rtpi`;

export default class Api {
  constructor(private apiUrl: string = API_URL) {}
  public getBusRoutes = (): Promise<IRoute[]> =>
    new Promise((resolveBusRoutes, rejectBusRoutes) => {
      request
        .get(`${this.apiUrl}/routelistinformation?operator=bac`)
        .then((data: any) => {
          const { body }: { body: IRouteResponse } = data;
          if (body.errorcode !== "0") {
            rejectBusRoutes(body.errormessage);
            return;
          }
          resolveBusRoutes(body.results);
        })
        .catch((miscError: any) => {
          console.error(miscError);
          rejectBusRoutes(miscError);
        });
    });
  public getBusStops = (routeNumber: string): Promise<any> =>
    new Promise((resolveBusStops, rejectBusStops) => {
      request
        .get(
          `${this.apiUrl}/routeinformation?routeid=${routeNumber}&operator=bac`
        )
        .then(({ body }: any) => {
          if (body.errorcode !== "0") {
            console.log(JSON.stringify({ body }));
            rejectBusStops(body.errormessage);
            return;
          }
          if (body.results.length === 0) {
            console.log("No Results");
          }
          resolveBusStops(body.results);
        })
        .catch((miscError: any) => {
          console.error(miscError);
          rejectBusStops(miscError);
        });
    });
  public getTimetable = (route: string, stop: string) =>
    new Promise((resolveTimetable, rejectTimetable) => {
      request
        .get(
          `${
            this.apiUrl
          }/realtimebusinformation?stopid=${stop}&routeid=${route}&operator=bac`
        )
        .then((results: any) => {
          console.log(results);
          const { body } = results;
          if (body.errorcode !== "0") {
            console.log(JSON.stringify({ body }));
            rejectTimetable(body.errormessage);
            return;
          }
          if (body.results.length === 0) {
            console.log("No Results");
          }
          resolveTimetable(body.results);
        })
        .catch((miscError: any) => {
          console.error(miscError);
          rejectTimetable(miscError);
        });
    });
}
