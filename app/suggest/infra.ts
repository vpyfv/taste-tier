"use server";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { GooglePlaceAutComplete } from "./types";
import axios from "axios";
import { FirebaseDB } from "../server/firebase";

export const getGooglePlaceAutoCompletes = async (
  search: string,
  sessionToken: string
): Promise<GooglePlaceAutComplete[]> => {
  console.log("calling google api");
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types=restaurant|food|cafe|bakery|store&component=country:us&location=38.93655587194989,-92.33252079925016&radius=16000&key=${process.env.GOOGLEAPIKEY}&sessiontoken=${sessionToken}`;
  const result = await axios.get(url);

  // const result = JSON.parse(
  //   '{"predictions":[{"description":"Pizza Tree, Cherry Street, Columbia, MO, USA","matched_substrings":[null],"place_id":"ChIJG_yUz9y33IcRywKzZL6_iZY","reference":"ChIJG_yUz9y33IcRywKzZL6_iZY","structured_formatting":[null],"terms":[null],"types":[null]},{"description":"Pizza Hut, East Nifong Boulevard, Columbia, MO, USA","matched_substrings":[null],"place_id":"ChIJh4HFVxC33IcRDPwxLqQK43A","reference":"ChIJh4HFVxC33IcRDPwxLqQK43A","structured_formatting":[null],"terms":[null],"types":[null]},{"description":"Pizza Hut, West Worley Street, Columbia, MO, USA","matched_substrings":[null],"place_id":"ChIJGXuB_xy23IcRSop9-iH_E5Y","reference":"ChIJGXuB_xy23IcRSop9-iH_E5Y","structured_formatting":[null],"terms":[null],"types":[null]},{"description":"Pizza Hut, Clark Lane, Columbia, MO, USA","matched_substrings":[null],"place_id":"ChIJC9sH2we43IcR89o9PxvO4Js","reference":"ChIJC9sH2we43IcR89o9PxvO4Js","structured_formatting":[null],"terms":[null],"types":[null]},{"description":"Pizza Haus, East Broadway, Ashland, MO, USA","matched_substrings":[null],"place_id":"ChIJBwYaNB6l3IcRCL1ze9VSjNo","reference":"ChIJBwYaNB6l3IcRCL1ze9VSjNo","structured_formatting":[null],"terms":[null],"types":[null]}],"status":"OK"}'
  // );

  const status = result.data.status;
  if (status != "OK") {
    return [];
  }
  const predictions = result.data.predictions as [any];
  const autoCompleteResults = predictions.map(
    (p): GooglePlaceAutComplete => ({
      placeId: p.place_id,
      result: p.description,
    })
  );
  return autoCompleteResults;
};

export const createNewRestaurant = async (rest: GooglePlaceAutComplete, sessionToken: string, imageUrl: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${rest.placeId}&fields=name,formatted_address,url,opening_hours&key=${process.env.GOOGLEAPIKEY}&sessiontoken=${sessionToken}`;

  const existingRestaurant = await getDoc(doc(FirebaseDB, "restaurant", rest.placeId));
  if (!existingRestaurant.exists()) {
    const response = await axios.get(url);

    // const result = JSON.parse(
    //   '{"html_attributions":[],"result":{"formatted_address":"909 Cherry St, Columbia, MO 65201, USA","name":"Pizza Tree","opening_hours":{"open_now":true,"periods":[{"close":{"day":0,"time":"2100"},"open":{"day":0,"time":"1100"}},{"close":{"day":2,"time":"2100"},"open":{"day":2,"time":"1100"}},{"close":{"day":3,"time":"2100"},"open":{"day":3,"time":"1100"}},{"close":{"day":4,"time":"2100"},"open":{"day":4,"time":"1100"}},{"close":{"day":5,"time":"2200"},"open":{"day":5,"time":"1100"}},{"close":{"day":6,"time":"2200"},"open":{"day":6,"time":"1100"}}],"weekday_text":["Monday: Closed","Tuesday: 11:00 AM – 9:00 PM","Wednesday: 11:00 AM – 9:00 PM","Thursday: 11:00 AM – 9:00 PM","Friday: 11:00 AM – 10:00 PM","Saturday: 11:00 AM – 10:00 PM","Sunday: 11:00 AM – 9:00 PM"]},"photos":[{"height":3696,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/106961553110303269238\\">Colin Klein</a>"],"photo_reference":"ATplDJaEjdqm6iCKQVvDNdq_2xHFKNxO68v3dO3pwkh6gcpcqtnHdOnBGoY3EWnSf6oBSoOG0sgCSsGYOEMMeoh8hRB1LQE0XjNa5xSbmHD_Di0UoO1eYHTZx0WZK56wZ4_BhX8i4DQSZB-eTQP7-t60v1UGxFD3bOY1Gyr6uMNBdAS7mhPF","width":5543},{"height":3934,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/116995307516108460988\\">Pizza Tree</a>"],"photo_reference":"ATplDJa22wgwu3T_cQeo_2IG6k27mxEOzUhewnEzju0n-FFVnNIwdYt9-HdGnkZSdKBnBUAltTQpA5SYubJnKsm0-LdrWU5gfvGA1xdYLZ-FtaTdzzGbI_Q7i-xe3uMie5T8pSO_1ekYb2oMJ8l3SW7NqYTaSDWo_BPErQHvuZCU25PMImRP","width":5741},{"height":3036,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/118051580029949590990\\">Garrett Booher</a>"],"photo_reference":"ATplDJZ47vh4OHqyM1ihHiE4WD1o6LT-y9aF51l-gRSOa4y1r3HvX1x0t4C9GNBl01G4hRSd5d82kV7Hi2LgvDXjgl9DYLj7rTQSR5bFyQj2KX8RYokt41q419D620b3OYchxziqbnDNdILQBGG3IB5QLLelWkflM5dAs9y2onSGIkQIo_fs","width":4048},{"height":4032,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/115882842522826496327\\">R D Algole</a>"],"photo_reference":"ATplDJauc-zVSlaL9ocrdAlNHulFRirByP5Dl1Cm4gmjyC7Ok4-pG-YXX9vlDH2McBfmTApNZa6HUIzCeIdIwHLMr-YIaJCNlUm_19gZ4lN33ylJQainQjGHpExYH7seRlKihUC79wNrSijt7lT-MlKstOLRP2S7xbMWrUirZgBhauRVrO0x","width":3024},{"height":439,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/116995307516108460988\\">Pizza Tree</a>"],"photo_reference":"ATplDJavhX-l5B1xxwxMDi8foR6wEc385NhtsbSMUrLkwf3XPXccIPMjKKUFyF8HbvsHgRX6ZrSrP37IlhF8NmAaBrdRr2lTZIN9qQs-WMSFKoXkTjn4qT71z5JfsCWK-RcsLb2VKBFI4II3tZo64H5j6OQA-mehpdPgPpZ5fADhFLBTIA69","width":609},{"height":3816,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/112938897449934611466\\">Shannon Thornhill</a>"],"photo_reference":"ATplDJYeQ6RecLA4nkiRVeu0eZkwKQWrbbeOVGIDCJ3J50axr3Eqt4jNgEBVGR8zBEGDgVMwC8rxP4RJ7UZdiqgjFOqXC0gu53sWi5w7_WeitHDhvo0pQHNPoLg4amOF786WcQGTNoqRnH2xVu6ppPn6Ec1fq6D8x6D7PBbUhPj9AcSLHfaF","width":2898},{"height":3000,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/109397914211674675078\\">Teja Teppala</a>"],"photo_reference":"ATplDJZ68UkO65MgOLYT-jNZ4UcBhY-I36KrMuenvTYNePhQh0SUdKXbCZaecKSkf51xdN5xvJcgN8ehDyvFJYl3yPPQ9iTF0FrmCJeazEs6hxXLuk_9mvyKydS0n3h4NCHewMykcTIG8fVJh9lZ0_QDPiOqOO42gsfhXnRGhk9dAS9kUn0m","width":4000},{"height":4032,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/104612441236812694863\\">Corey Hudson</a>"],"photo_reference":"ATplDJaaYnFzMZ5FBDkbexuuV4vhbSKLNEXbVxJY0wNS4plAFm1PBhSiUhxr5LtGFUxDbZJsQaMFdTydiwHTlXDDhB9gLaL6HgcifPcpa_Rw0RLyy2O2PrIcdIZXsUUXTEf2d1yspv-ncrzF3FHSiDsG9cdRYRIp1eL5-h8QXH-vBeGc-GOT","width":3024},{"height":536,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/116995307516108460988\\">Pizza Tree</a>"],"photo_reference":"ATplDJZYh0O-N6iUCupeuTlSAjjIDIBNKcUIs6MJSKOj4aXjY9mecgnAiPdsSncqH-OJ5gQYTdZ1_xAfvxU6xGdC1OLlmbyb7WAbamy5jr6_1x5e9SExr88TQevkHKj8GLHeReCZnj0qSiLmhYQEg08H9rgI_EmQF-cJ1d_M_UxnOa2PNpUR","width":750},{"height":2138,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/113190211583952315681\\">Joy :-o</a>"],"photo_reference":"ATplDJZ-FapZApEmyqgYbOjV1tokZm1XngMO6rMH5LKRCYYIjJZ7ZmX8tIwUyFsfR4fhsHDQrDISxgWnp82_TgGU1c7JDhIaxeCPRpRErcebUY_629d3Jll0Mn2hSOcVH4E3yVzgQ9rykscks6U4HOmwiFXwPjuZLigGhI6y_nGyJ3l5sYfF","width":2138}],"url":"https://maps.google.com/?cid=10847412001952694987"},"status":"OK"}'
    // );
    if (response.data.status == "OK") {
      const data = response.data.result;
      const newRestaurantDoc = {
        name: data.name,
        avg_score: 0,
        rating_count: 0,
        user_ratings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        address: data.formatted_address,
        timings: data.opening_hours.weekday_text,
        location: data.url,
        image: imageUrl,
      };
      await setDoc(doc(FirebaseDB, "restaurant", rest.placeId), newRestaurantDoc);
    }
  }
};

export const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.get(url);
    const contentType = response.headers["content-type"];
    console.log("content type", contentType);
    return contentType?.toString().startsWith("image/") ?? false;
  } catch (error) {
    return false;
  }
};
