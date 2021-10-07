import React, { useState } from "react";
import LocationSearchInput from "./LocationSearchInput";
interface chartGenerateFuncProps {
  setPayload(arg: payloadType): void;
}

interface payloadType {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  seconds: number;
  lat: number;
  lon: number;
  ayanamsha: string;
  tzone: number;
}

const ChartGenerate: React.FC<chartGenerateFuncProps> = (props: any) => {
  let payloadTemp: payloadType = {
    year: -1000,
    month: -1000,
    day: -1000,
    hour: -1000,
    min: -1000,
    seconds: -1000,
    lat: -1000,
    lon: -1000,
    ayanamsha: "",
    tzone: -1000,
  }; // Not working without initial values tried adding interface.
  const [tzoneState, setTzoneState] = useState<number>(-1000); //same here
  const [locData, setLocData] = useState({
    address: "",
    latLng: { lat: 0, lng: 0 },
  });
  const [searchData, setSearchData] = useState({
    name: "",
    date: "",
    time: "",
    tzone: "",
    place: "",
  });

  function stringToNumber(date: string, time: string) {
    const splitDate = date.split("-");

    const splitTime = time.split(":");

    payloadTemp.year = parseInt(splitDate[0]);
    payloadTemp.month = parseInt(splitDate[1]);
    payloadTemp.day = parseInt(splitDate[2]);
    payloadTemp.hour = parseInt(splitTime[0]);
    payloadTemp.min = parseInt(splitTime[1]);
    payloadTemp.seconds = parseInt(splitTime[2]);
  }

  return (
    <div>
      <input
        onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
        className="pt_input search_txt_box w10"
        type="text"
        name="Name"
        placeholder="Name"
      ></input>
      <input
        onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
        className="pt_input w15"
        type="date"
      />
      <input
        onChange={(e) => setSearchData({ ...searchData, time: e.target.value })}
        type="time"
        name="Time"
        placeholder="Time"
        step="2"
        className="pt_input w15"
      />
      <input type="hidden" name="lat" className="pt_input w10" />
      <input type="hidden" name="lon" className="pt_input w10" />
      <input
        onChange={(e) =>
          setSearchData({ ...searchData, tzone: e.target.value })
        }
        type="text"
        value={tzoneState}
        name="tzone"
        placeholder="Time Zone"
        className="pt_input w10"
      />

      <LocationSearchInput
        setLocData={setLocData}
        setTzoneState={setTzoneState}
      />
      <span>
        <button
          className="pt_button w100p"
          onClick={() => {
            if (
              searchData.name.length > 0 &&
              searchData.date.length > 0 &&
              searchData.time.length > 0 &&
              locData.address.length > 0 &&
              searchData.tzone.length > 0
            )
              stringToNumber(searchData.date, searchData.time);
            payloadTemp.ayanamsha = searchData.name;
            payloadTemp.lat = locData.latLng.lat;
            payloadTemp.lon = locData.latLng.lng;

            payloadTemp.tzone = parseFloat(searchData.tzone);
            payloadTemp.tzone = tzoneState;
            props.setPayload(payloadTemp);
          }}
        >
          Generate
        </button>
        <button className="pt_button w100p">Save</button>
        <button className="pt_button w100p">Look Up</button>
      </span>
    </div>
  );
};

export default ChartGenerate;
