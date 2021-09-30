import React, { useState, useEffect } from "react";
import "./App.css";

import { getBhavaTable, getPlanetTable } from "./helper/bhavaPlanetTable";
import Searchbar from "./components/Searchbar";
import ChartTable from "./components/ChartTable";
import BhavaTable from "./components/BhavaTable";
import PlanetTable from "./components/PlanetTable";
import DisplayDhasa from "./components/DisplayDhasa";
import homeAPI from "./helper/homeAPI";
import { prepareChartData } from "./helper/getChart";

const searchPayload = {
  year: 1998,
  month: 12,
  day: 21,
  hour: 9,
  min: 1,
  seconds: 1,
  lat: 9.9252007,
  lon: 78.1197754,
  ayanamsha: "Jay",
  tzone: 5.5,
};
const dhasaPayload = {
  year: 1998,
  month: 12,
  day: 12,
  hour: 0,
  min: 12,
  seconds: 12,
  lat: 9.9252007,
  lon: 78.1197754,
  ayanamsha: "jay",
  tzone: 5.5,
};

function App() {
  const [searchData, setSearchData] = useState({ houses: [], planets: [] });
  const [dhasaData, setDhasaData] = useState([]);
  useEffect(() => {
    homeAPI
      .search(searchPayload)
      .then((res) => res.json())
      .then((re) => {
        setSearchData(re);
      });
    homeAPI
      .majorDasha(dhasaPayload)
      .then((res) => res.json())
      .then((re) => {
        setDhasaData(re);
      });
  }, []);
  console.log(dhasaData);
  const { houses, planets } = searchData || {};
  const chart = houses && planets ? prepareChartData(houses, planets) : [];
  const BhavaList = getBhavaTable(chart);
  const PlanetList = getPlanetTable(chart);

  return (
    <div className="App">
      <Searchbar />
      <ChartTable data={chart} />
      <BhavaTable BhavaList={BhavaList} />
      <PlanetTable PlanetList={PlanetList} />
      <DisplayDhasa dhasaData={dhasaData} />
    </div>
  );
}

export default App;
