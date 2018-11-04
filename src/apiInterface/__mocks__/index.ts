import { IRoute } from "@/types";

// __mocks__/request.js

export const API_URL = `https://data.smartdublin.ie/cgi-bin/rtpi`;

export default class Api {
  constructor(private apiUrl: string = API_URL) {
    console.log("mock is running");
  }
  public getBusRoutes = (): Promise<IRoute[]> =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(
          [1, 2, 3, 4, 5, 6].map(num => ({
            operator: "bac",
            route: num.toString()
          }))
        );
      }, 1000);
    });
  public getBusStops = (routeNumber: string): Promise<any> =>
    new Promise((resolve) => {
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
        resolve(data);
      }, 2000);
    });
}
