"use client";

import { useEffect, useState } from "react";
import { createNewRestaurant, getGooglePlaceAutoCompletes, isValidImageUrl } from "./infra";
import { v4 as uuidv4 } from "uuid";
import { GooglePlaceAutComplete } from "./types";
import { redirect, useRouter } from "next/navigation";

const SuggestionPage = () => {
  const router = useRouter();
  const [sessionToken] = useState(uuidv4());
  const [autoCompleteResults, setAutoCompleteResults] = useState<GooglePlaceAutComplete[]>([]);
  const [pickedRestaurant, setPickedRestaurant] = useState<GooglePlaceAutComplete>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageNotPickedError, setImageNotPickedError] = useState(false);
  const [isInvalidImageUrl, setIsInvalidImageUrl] = useState(false);

  const getSearchResults = async (search: string) => {
    const results = await getGooglePlaceAutoCompletes(search, sessionToken);
    setAutoCompleteResults(results);
  };

  const onPickRestaurant = (pickedPlace: GooglePlaceAutComplete) => {
    //create restaurant if not exists
    console.log("clicked place:", pickedPlace);
    setPickedRestaurant(pickedPlace);
    setAutoCompleteResults([]);
  };

  const clearPickedRestaurant = () => {
    setPickedRestaurant(undefined);
  };

  const submitPickedRestaurant = async (rest: GooglePlaceAutComplete, imageUrl: string) => {
    if (await isValidImageUrl(imageUrl)) {
      await createNewRestaurant(rest, sessionToken, imageUrl);
      router.replace("/home");
    } else {
      setIsInvalidImageUrl(true);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center text-text-color-p flex-col">
      <h1 className="text-3xl font-semibold mb-8">Search new restaurant</h1>
      {pickedRestaurant != undefined ? (
        <>
          <div className="flex items-baseline">
            <div className="border border-card px-2 py-4 rounded-lg text-wrap flex-col">
              <div className="flex mb-2">
                {pickedRestaurant.result}
                <button
                  className="ml-6 h-fit w-fit px-4 py-2 mr-4 block rounded-full bg-text-color-p text-text-color-s shadow-2xl "
                  onClick={clearPickedRestaurant}
                >
                  X
                </button>
              </div>
              <label className="fel">
                <input
                  type="url"
                  className={`mt-1 block w-full rounded-md border bg-background focus:ring-0 focus:text-text-color-p focus:border-card ${
                    imageNotPickedError || isInvalidImageUrl ? "border-red-500 placeholder-red-500" : ""
                  }`}
                  placeholder={
                    imageNotPickedError ? "image url should not be empty" : "paste image url for selected restaurant"
                  }
                  name="address"
                  onChange={async (event) => {
                    if (event.target.value.length != 0) {
                      setImageUrl(event.target.value);
                      setImageNotPickedError(false);
                      setIsInvalidImageUrl(false);
                    } else {
                      setIsInvalidImageUrl(false);
                    }
                  }}
                />
              </label>
              {isInvalidImageUrl ? <p className="text-xs text-red-500">paste valid image url</p> : <></>}
            </div>
            <button
              className="ml-4 px-4 py-2 h-fit rounded-lg bg-text-color-p text-text-color-s hover:shadow-2xl mt-6"
              onClick={() =>
                isInvalidImageUrl ? setImageNotPickedError(true) : submitPickedRestaurant(pickedRestaurant, imageUrl!)
              }
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <label className="block w-1/3">
          <input
            type="url"
            className="mt-1 block w-full rounded-md border bg-background focus:ring-0 focus:text-text-color-p focus:border-card"
            placeholder={pickedRestaurant ?? "type minimum 5 letters"}
            name="address"
            onChange={async (event) => {
              if (event.target.value.length >= 5) {
                await getSearchResults(event.target.value);
              } else {
                setAutoCompleteResults([]);
              }
            }}
          />
        </label>
      )}
      {autoCompleteResults.length == 0 ? (
        <></>
      ) : (
        <div className="border border-card w-1/2 rounded-lg mt-2">
          {autoCompleteResults.map((r, i) => (
            <button
              key={i}
              className="p-2 mb-4 rounded-lg hover:bg-text-color-p hover:text-text-color-s w-full text-left"
              onClick={() => onPickRestaurant(r)}
            >
              {r.result}
              <div className=""></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default SuggestionPage;

const AutoCompleteResults = (params: { results: GooglePlaceAutComplete[] }) => {
  return;
};
