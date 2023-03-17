import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

type Props = {
  placeInfo: any;
  setPlaceInfo: any;
};

const center = { lat: 43.6532225, lng: -79.383186 };
const libraries: "places"[] = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "12rem",
};
const options = {
  // disableDefaultUI: true,
};

const GoogleMapContainer = (props: Props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";
  const google = window.google;
  console.log("hi");
  const { placeInfo, setPlaceInfo } = props;
  const mapRef = useRef();
  const onLoadMap = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onClickPlace = async (e) => {
    // if (!e.placeId) return;
    // const placeRef = e.placeId;
    // let request = {
    //   placeId: placeRef,
    //   fields: [
    //     "name",
    //     "address_components",
    //     "photos",
    //     "rating",
    //     "place_id",
    //     // "icon",
    //     // "opening_hours",
    //     // "reviews",
    //   ],
    // };
    // let service = new google.maps.places.PlacesService(
    //   document.getElementById("map")
    //   // mapRef.current
    // );
    // service.getDetails(request, callback);
    // function callback(data, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     if (placeInfo) {
    //       let copy = { ...placeInfo };
    //       copy = data;
    //       console.log(copy);
    //       // setPlace(copy);
    //       //   let container = [];
    //       //   for (let i = 0; i < 5; i++) {
    //       //     container.push(place.photos[i].getUrl);
    //       //   }
    //       //   setPreview(container);
    //       // } else {
    //       //   setPlace(data);
    //       //   let container = [];
    //       //   for (let i = 0; i < 5; i++) {
    //       //     container.push(place.photos[i].getUrl);
    //       //   }
    //       //   setPreview(container);
    //     }
    //   }
    // }
  };
  return (
    <>
      <div>
        {/* Search Bar */}
        <div className="absolute top-2 left-2 z-10 flex gap-1 m-1">
          <Autocomplete>
            <input
              type="text"
              className="w-60 rounded-full text-xs px-3 py-1 outline-none shadow-lg"
              placeholder="Search Location"
              // onFocus={handleFooter}
              // onBlur={handleFooter}
            />
          </Autocomplete>
          <button className="w-6 h-6 bg-blue-400 rounded-full shadow-lg">
            <SearchRoundedIcon style={{ fontSize: "1rem", color: "white" }} />
          </button>
          <button className="w-6 h-6 bg-slate-300 rounded-full shadow-lg">
            <RefreshRoundedIcon style={{ fontSize: "1rem", color: "black" }} />
          </button>
        </div>
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
        {/* {placeInfo && (
          <div className="card">
            {preview && (
              <div className="flex w-full">
                {preview?.map((image) => {
                  return (
                    <img
                      src={image()}
                      alt="pp"
                      className="w-1/5 h-10 object-cover border-x-2 border-white"
                    />
                  );
                })}
              </div>
            )}
            <p>{placeInfo.name}</p>
            <p className="text-xs">{placeInfo.rating}</p>
            <div className="text-xs leading-tight">
              {placeInfo.address_components.map((address) => {
                return address.long_name + " ";
              })}
            </div>
            <div onClick={toggleReview} className="text-xs text-gray-600 w-12">
              {place && seeReview ? "리뷰 접기" : "리뷰 보기"}
            </div>
            <div className={seeReview ? "h-20 overflow-y-scroll" : "hidden"}>
              {place?.reviews?.map((review) => {
                return (
                  <div className="flex flex-col mb-3">
                    <div className="">
                      <span className="text-md">{review.author_name}</span>
                      <span className="text-md">{review.rating} / 5</span>
                    </div>
                    <span className="text-xs">{review.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default GoogleMapContainer;
