import request from "superagent";
import { IRoute } from "@/types";

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
    new Promise((resolve, reject) => {
      request
        .get(`${this.apiUrl}/routelistinformation?operator=bac`)
        .then((data: any) => {
          const { body }: { body: IRouteResponse } = data;
          if (body.errorcode !== "0") {
            reject(body.errormessage);
            return;
          }
          resolve(body.results);
        })
        .catch((miscError: any) => {
          console.error(miscError);
          reject(miscError);
        });
    });
  public getBusStops = (routeNumber: string): Promise<any> =>
    new Promise((resolve, reject) => {
      request
        .get(
          `${this.apiUrl}routeinformation?routeid=${routeNumber}&operator=bac`
        )
        .then(({ body }: any) => {
          if(body.errorcode !== "0"){
            console.log(JSON.stringify({body}))
            reject(body.errormessage);
            return;
          }
          if(body.results.length === 0){
            console.log("No Results");
          }
          resolve(body.results);
        })
        .catch((miscError: any) => {
          console.error(miscError);
          reject(miscError);
        });
    });
}
