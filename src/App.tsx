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

function App() {
  const [payload, setPayload] = useState<payloadType>();
  const [searchData, setSearchData] = useState({ houses: [], planets: [] });
  const [dhasaData, setDhasaData] = useState([]);

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
  };
  useEffect(() => {
    if (payload != undefined) setData();
  }, [payload]);
  const { houses, planets } = searchData || {};

  const chart = houses && planets ? prepareChartData(houses, planets) : [];
  const BhavaList = getBhavaTable(chart);
  const PlanetList = getPlanetTable(chart);

  return (
    <div className="App">
      <ChartGenerate setPayload={setPayload} />

      <ChartTable data={chart} />
      <BhavaTable BhavaList={BhavaList} />
      <PlanetTable PlanetList={PlanetList} />
      <DisplayDhasa dhasaData={dhasaData} />
    </div>
  );
}

export default App;
