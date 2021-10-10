import React, { useState, useEffect } from "react";
import "./App.css";

import { getBhavaTable, getPlanetTable } from "./helper/bhavaPlanetTable";
import ChartGenerate from "./components/ChartGenerate";
import ChartTable from "./components/ChartTable";
import BhavaTable from "./components/BhavaTable";
import PlanetTable from "./components/PlanetTable";
import DisplayDhasa from "./components/DisplayDhasa";
import LocationSearchInput from "./components/LocationSearchInput";
import homeAPI from "./helper/homeAPI";
import { prepareChartData } from "./helper/getChart";

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
  tzone: undefined | number;
}
interface queryType {
  dhasaData?: string;
  bukthiData?: string;
  anthraData?: string;
  sukshmaData?: string;
}

function App() {
  const [payload, setPayload] = useState<payloadType>();
  const [searchData, setSearchData] = useState({ houses: [], planets: [] });
  const [queryObject, setQueryObject] = useState({
    dhasaData: "",
    bukthiData: "",
    anthraData: "",
    sukshmaData: "",
  });
  const [dhasaData, setDhasaData] = useState([]);
  const [bukthiData, setBukthiData] = useState([]);
  const [anthraData, setAnthraData] = useState([]);
  const [sukshmaData, setSukshmaData] = useState([]);
  const [adhisukshmaData, setAdhisukshmaData] = useState([]);

  const setData = () => {
    homeAPI
      .search(payload)
      .then((res) => res.json())
      .then((re) => {
        setSearchData(re);
      });
    homeAPI
      .majorDasha(payload)
      .then((res) => res.json())
      .then((re) => {
        setDhasaData(re);
      });

    // homeAPI
    //   .subDasha4(payload, "Sun/Sun/Sun/Sun")
    //   .then((res) => res.json())
    //   .then((re) => {
    //     setAdhisukshmaData(re);
    //   });
  };
  useEffect(() => {
    if (payload != undefined) setData();
  }, [payload]);
  useEffect(() => {}, [queryObject]);
  const { houses, planets } = searchData || {};

  const chart = houses && planets ? prepareChartData(houses, planets) : [];
  const BhavaList = getBhavaTable(chart);
  const PlanetList = getPlanetTable(chart);
  function getBukthiData(query: string) {
    homeAPI
      .subDasha(payload, query)
      .then((res) => res.json())
      .then((re) => {
        setBukthiData(re);
      });
  }
  function getAnthraData(query: string) {
    homeAPI
      .subDasha2(payload, query)
      .then((res) => res.json())
      .then((re) => {
        setAnthraData(re);
      });
  }
  function getSukshmaData(query: string) {
    homeAPI
      .subDasha3(payload, query)
      .then((res) => res.json())
      .then((re) => {
        setSukshmaData(re);
      });
  }

  function handleClick(planet: string, keyName: string) {
    {
      setQueryObject({ ...queryObject, [keyName]: planet });
    }
    let queryString = "";

    switch (keyName) {
      case "dhasaData":
        queryString = `${planet}`;
        setSukshmaData([]);
        setAnthraData([]);
        getBukthiData(queryString);
        break;
      case "bukthiData":
        queryString = `${queryObject.dhasaData}/${planet}`;
        setSukshmaData([]);
        getAnthraData(queryString);
        break;
      case "anthraData":
        queryString = `${queryObject.dhasaData}/${queryObject.bukthiData}/${planet}`;
        getSukshmaData(queryString);
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <ChartGenerate setPayload={setPayload} />

      <ChartTable data={chart} />
      <BhavaTable BhavaList={BhavaList} />
      <PlanetTable PlanetList={PlanetList} />
      <DisplayDhasa
        data={dhasaData}
        title={"Dhasa Table"}
        keyName="dhasaData"
        handleClick={handleClick}
      />
      <DisplayDhasa
        data={bukthiData}
        title={"Bukthi Table"}
        keyName="bukthiData"
        handleClick={handleClick}
      />
      <DisplayDhasa
        data={anthraData}
        title={"Anthra Table"}
        keyName="anthraData"
        handleClick={handleClick}
      />
      <DisplayDhasa
        data={sukshmaData}
        title={"Sukshma Table"}
        keyName="sukshmaData"
        handleClick={handleClick}
      />
      {/* <DisplayDhasa data={adhisukshmaData} title={"Adhisukshma Table"} /> */}
    </div>
  );
}

export default App;
