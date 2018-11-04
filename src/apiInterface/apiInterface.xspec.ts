/* This tests the API interface against the real API
   for most purposes, this is disabled */

import Api, { API_URL } from "@/apiInterface";
import { IRoute } from "@/types";


const api = new Api(API_URL);

describe("/src/apiInterface", () => {
  describe("API_URL", () => {
    it("is `https://data.smartdublin.ie/cgi-bin/rtpi`", () => {
      expect(API_URL).toBe(`https://data.smartdublin.ie/cgi-bin/rtpi`);
    });
  });
  describe("getBusRoutes()", () => {
    it("will get the bus routes from Dublin Bus service", done => {
      api
        .getBusRoutes()
        .then(routes => {
          expect(
            routes.every(
              (route: IRoute) =>
                route.operator === "bac" && typeof route.route === "string"
            )
          ).toBe(true);
          done();
        })
        .catch(err => {
          console.error(err);
          expect(err).toBe(false);
          done();
        });
    });
  });
  describe("getBusStops()", () => {
    it(
      "will get the bus stops for route 25",
      done =>
        api
          .getBusStops("25")
          .then(lines => {

            expect(true).toBe(true);
            lines.forEach((line: any) => {
              expect(Object.keys(line).sort()).toEqual(
                [
                  "operator",
                  "origin",
                  "originlocalized",
                  "destination",
                  "destinationlocalized",
                  "lastupdated",
                  "stops"
                ].sort()
              );
              console.log("routes", JSON.stringify(line.stops.map((s:any) => s.stopid)));
              line.stops.forEach((stop: any) => {
                expect(Object.keys(stop).sort()).toEqual(
                  [
                    "stopid",
                    "displaystopid",
                    "shortname",
                    "shortnamelocalized",
                    "fullname",
                    "fullnamelocalized",
                    "latitude",
                    "longitude",
                    "operators"
                  ].sort()
                );
              });
              done();
            });
          })
          .catch(err => {
            console.error(err);
            expect(err).toBe(false);
            done();
          }),
      30000
    );
  });
  describe("getTimeTable()", async () => {
    it("gets the timetable", () => {
      api.getTimetable("25", "200");
    });
  });
});
