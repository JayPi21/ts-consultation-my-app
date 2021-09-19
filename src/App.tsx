import React from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./helper/chartTableInput";
import bhavas from "./helper/chartData.js";
import Searchbar from "./components/Searchbar";
import ChartTable from "./components/ChartTable";
import BhavaTable from "./components/BhavaTable.js";
import PlanetTable from "./components/PlanetTable";

function App() {
  return (
    <div className="App">
      <Searchbar />
      <ChartTable data={data} />
      <BhavaTable bhavas={bhavas} />
      <PlanetTable bhavas={bhavas} />
    </div>
  );
}

export default App;
