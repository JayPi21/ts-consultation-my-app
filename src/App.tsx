import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ChartTable from "./components/ChartTable";
import BhavaTable from "./components/BhavaTable.js";
import PlanetTable from "./components/PlanetTable";

function App() {
  return (
    <div className="App">
      <Searchbar />
      <ChartTable />
      <BhavaTable />
      <PlanetTable />
    </div>
  );
}

export default App;
