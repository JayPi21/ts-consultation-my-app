import React from "react";
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
const BhavaList = getBhavaTable(bhavas);
const PlanetList = getPlanetTable(bhavas);

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
