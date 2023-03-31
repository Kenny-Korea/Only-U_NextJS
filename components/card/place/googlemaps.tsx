import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { libraries } from "@/utils/globalVariables";

type Props = {
  selectedPlace: any;
  setSelectedPlace: any;
  preview: any;
  setPreview: any;
};

// 각종 default configuration
const center = { lat: 43.6532225, lng: -79.383186 };
const mapContainerStyle = {
  width: "100%",
  height: "12rem",
};
const options = {
  disableDefaultUI: true,
};

const GoogleMapContainer = (props: Props) => {
  const dispatch = useDispatch();
  const { selectedPlace, setSelectedPlace, preview, setPreview } = props;
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [coordinates, setCoordinates] = useState(center);
  const [place, setPlace] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // TODO. 구글맵 초기 로드 관련 변수 및 함수
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  });
  const google = window.google;
  const mapRef = useRef<google.maps.Map | null>(null); // map 객체 담을 용도

  const onLoadMap = useCallback((map: google.maps.Map) => {
    mapRef.current = map; // Google Map이 load되면 mapRef.current에 map 객체 담아줌
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setCoordinates({ lat, lng });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const onLoadAutoComplete = (autoC: google.maps.places.Autocomplete) =>
    setAutocomplete(autoC);

  // TODO. API - 장소 정보 get 요청
  const getPlaceInfo = (request: { placeId: string; fields: string[] }) => {
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

  // TODO. Autocomplete로 장소를 선택하게 되면 실행되는 함수
  const onPlaceChanged = () => {
    if (!autocomplete) return;
    const lat = autocomplete?.getPlace()?.geometry?.location?.lat();
    const lng = autocomplete?.getPlace()?.geometry?.location?.lng();
    if (lat && lng) {
      setCoordinates({ lat, lng });
    } else return;
    const placeRef = autocomplete.getPlace().place_id as string;
    setPlace(placeRef);
  };

  const onClickPlace = async (e: google.maps.MapMouseEvent) => {
    if ("placeId" in e) {
      const placeRef = e.placeId as string;
      let request = {
        placeId: placeRef,
        fields: ["name", "address_components", "photos", "rating", "place_id"],
      };
      getPlaceInfo(request);
    }
  };

  const onClickSearch = () => {
    if (mapRef.current) {
      mapRef.current.panTo(coordinates);
    }
    let request = {
      placeId: place as string,
      fields: ["name", "address_components", "photos", "rating", "place_id"],
    };
    getPlaceInfo(request);
  };

  const onClickClear = () => {
    if (inputRef.current === null) return;
    inputRef.current.value = "";
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
            <Autocomplete
              onLoad={onLoadAutoComplete}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                className="w-56 h-6 rounded-full text-xs px-3 py-1 outline-none shadow-lg"
                placeholder="Search Location"
                ref={inputRef}
                onFocus={toggleNavbar}
                onBlur={toggleNavbar}
              />
            </Autocomplete>
            <button
              className="w-6 h-6 bg-blue-400 rounded-full shadow-lg centerItem"
              onClick={onClickSearch}
            >
              <SearchRoundedIcon style={{ fontSize: "1rem", color: "white" }} />
            </button>
            <button
              className="w-6 h-6 bg-slate-300 rounded-full shadow-lg centerItem"
              onClick={onClickClear}
            >
              <RefreshRoundedIcon
                style={{ fontSize: "1rem", color: "black" }}
              />
            </button>
          </div>
          <div>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={coordinates}
              onClick={onClickPlace}
              onLoad={onLoadMap}
              options={options}
            >
              <Marker position={coordinates} />
              <div id="map"></div>
            </GoogleMap>
          </div>
          {selectedPlace && (
            <div className="border shadow-md">
              {Array.isArray(preview) && preview.length > 0 && (
                <div className="flex w-full">
                  {preview?.map((image) => {
                    return (
                      <div className="w-20 h-12 relative" key={image}>
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
