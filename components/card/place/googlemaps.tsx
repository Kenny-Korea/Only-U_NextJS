import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

type Props = {
  selectedPlace: any;
  setSelectedPlace: any;
};

const center = { lat: 43.6532225, lng: -79.383186 };
const libraries: "places"[] = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "12rem",
};
const options = {
  disableDefaultUI: true,
};

const GoogleMapContainer = (props: Props) => {
  const { selectedPlace, setSelectedPlace } = props;
  const [preview, setPreview] = useState<any>([]);
  const dispatch = useDispatch();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const google = window.google;
  const mapRef = useRef(null);
  const onLoadMap = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const onClickPlace = async (e: any) => {
    if (!e.placeId) return;
    const placeRef = e.placeId;
    let request = {
      placeId: placeRef,
      fields: [
        "name",
        "address_components",
        "photos",
        "rating",
        "place_id",
        // "icon",
        // "opening_hours",
        // "reviews",
      ],
    };
    let service = new google.maps.places.PlacesService(
      document.getElementById("map") as HTMLDivElement
    );
    function callback(
      data: google.maps.places.PlaceResult | null,
      status: google.maps.places.PlacesServiceStatus
    ) {
      if (status === google.maps.places.PlacesServiceStatus.OK && data) {
        setSelectedPlace(() => {
          return data;
        });
        // 사진 있으면 preview에 추가, 없으면 return
        if (!data.photos) return;
        let container = [];
        for (let i = 0; i < 5; i++) {
          container.push(data.photos[i].getUrl());
        }
        setPreview(container);
      }
    }
    service.getDetails(request, callback);
  };

  const toggleNavbar = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };

  if (!isLoaded) return <p>"Loading..."</p>;
  if (loadError) return <p>"Something's gone wrong. Please try again"</p>;
  return (
    <>
      {isLoaded && (
        <div className="relative">
          {/* Search Bar */}
          <div className="absolute w-full top-2 left-2 z-10 flex gap-1">
            <Autocomplete>
              <input
                type="text"
                className="w-56 rounded-full text-xs px-3 py-1 outline-none shadow-lg"
                placeholder="Search Location"
                onFocus={toggleNavbar}
                onBlur={toggleNavbar}
              />
            </Autocomplete>
            <button className="w-6 h-6 bg-blue-400 rounded-full shadow-lg">
              <SearchRoundedIcon style={{ fontSize: "1rem", color: "white" }} />
            </button>
            <button className="w-6 h-6 bg-slate-300 rounded-full shadow-lg">
              <RefreshRoundedIcon
                style={{ fontSize: "1rem", color: "black" }}
              />
            </button>
          </div>
          <div ref={mapRef}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
              onClick={onClickPlace}
              onLoad={onLoadMap}
              options={options}
            >
              <div id="map"></div>
            </GoogleMap>
          </div>
          {selectedPlace && (
            <div className="border shadow-md">
              {Array.isArray(preview) && preview.length > 0 && (
                <div className="flex w-full">
                  {preview?.map((image) => {
                    return (
                      <div className="w-20 h-12 relative">
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="20"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <p>{selectedPlace.name}</p>
              <p className="text-xs">{selectedPlace.rating}</p>
              <div className="text-xs leading-tight">
                {selectedPlace.address_components.map((address: any) => {
                  return address.long_name + " ";
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GoogleMapContainer;
