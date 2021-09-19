import React from "react";

import { getPlanetTable } from "../helper/bhavaPlanetTable";
import bhavas from "../helper/chartData";
const styleSublordBh = function (primaryBh, sublordBh) {
  const sublordBhStyleObject = primaryBh.map((ppBh) => {
    return { name: ppBh, sublordBh: sublordBh.includes(ppBh) };
  });
  return sublordBhStyleObject;
};
const PlanetTable = ({ bhavas }) => {
  const PlanetList = getPlanetTable(bhavas);
  return (
    <div className="pl_card">
      <div className="pt_smallcard_contanier">
        <table className="table">
          <tr className={`pt_smallcard`}>
            <th className="dasa_cell w20">Planet name</th>
            <th className="dasa_cell w20">Primary Bh</th>
            <th className="dasa_cell w10">Located Bh</th>
            <th className="dasa_cell w50">Connected Bh</th>
          </tr>
          {PlanetList.map((i) => {
            const sublordBhStyle = styleSublordBh(i.primBh, i.sublordBh);
            return (
              <tr className={`pt_smallcard`}>
                <td className="pp_cell w20">{i.planetName}</td>
                <td className="pp_cell w40">
                  {sublordBhStyle.map((pBh, index) => (
                    <span className={pBh.sublordBh ? "blue" : ""}>
                      {pBh.name}
                      {index != sublordBhStyle.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td className="pp_cell w10">{i.locBh.join(", ")}</td>
                <td className="pp_cell w30">{i.connectBh.join(", ")}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default PlanetTable;
