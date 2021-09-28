import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./helper/chartTableInput";
import bhavas from "./helper/chartData.js";
import { getBhavaTable, getPlanetTable } from "./helper/bhavaPlanetTable";
import Searchbar from "./components/Searchbar";
import ChartTable from "./components/ChartTable";
import BhavaTable from "./components/BhavaTable";
import PlanetTable from "./components/PlanetTable";
import dhasaData from "./helper/dhasaData";
import DisplayDhasa from "./components/DisplayDhasa";
import homeAPI from "./helper/homeAPI";
import { prepareChartData } from "./helper/getChartApi";

const BhavaList = getBhavaTable(bhavas);
const PlanetList = getPlanetTable(bhavas);
const payload = {
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
const data1 = homeAPI.search(payload);
console.log(data1);
function App() {
  return (
    <div className="App">
      <Searchbar />
      <ChartTable data={data} />
      <BhavaTable BhavaList={BhavaList} />
      <PlanetTable PlanetList={PlanetList} />
      <DisplayDhasa dhasaData={dhasaData} />
    </div>
  );
}

export default App;
