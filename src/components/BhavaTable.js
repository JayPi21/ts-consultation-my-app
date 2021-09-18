import React from "react";
import bhavas from "../helper/chartData.js";
import { getPlanetTable, getBhavaTable } from "../helper/bhavaPlanetTable.js";
const setOpacityUnderline = (plList, SSllist, planetList) => {
  const styleObj = planetList.map((o) => ({
    name: o,
    transparency: !plList.includes(o),
    underline: SSllist.includes(o),
  }));
  return styleObj;
};

const opaqueStyle = { opacity: "0.2" };
const normalStyle = { opacity: "1" };
const opaqueUnderStyle = {
  opacity: "1",
  textDecoration: "underline",
  textDecorationColor: "blue",
};
const planetList = ["Su", "Mo", "Ma", "Ra", "Ju", "Sa", "Me", "Ke", "Ve"];

const stylePrimaryPlanet = function (pp, subLord) {
  const primaryPlanetStyle = pp.map((p) => {
    return { name: p, subLord: p == subLord };
  });
  return primaryPlanetStyle;
};

const BhavaTable = () => {
  let bhavaTable = {};
  const BhavaList = getBhavaTable(bhavas);

  return (
    <div className="pl_card">
      <div className="pt_smallcard_contanier">
        <table className="table">
          <tr className={`pt_smallcard`}>
            <th className="dasa_cell w5">Bh#</th>
            <th className="dasa_cell w5">No.</th>
            <th className="dasa_cell w20">Primary PL</th>
            <th className="dasa_cell w5">Def</th>
            <th className="dasa_cell w20">Located PL</th>
            <th className="dasa_cell w45">Connected PL</th>
          </tr>

          {BhavaList.map((i) => {
            const planetStyleObjects = setOpacityUnderline(
              i.pl,
              i.SSLlist,
              planetList
            );
            const primaryPlanetStyle = stylePrimaryPlanet(i.pp, i.subLord);

            return (
              <tr className={`pt_smallcard`}>
                <td className={`pp_cell w5 ${i.count > 6 ? "highlight" : ""}`}>
                  {i.houseId}
                </td>
                <td className="pp_cell w5">{i.count}</td>
                <td className="pp_cell w20">
                  {primaryPlanetStyle.map((pp, index) => (
                    <span className={pp.subLord ? "blue" : ""}>
                      {pp.name}
                      {index != primaryPlanetStyle.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </td>
                <td className="pp_cell w5">{i.def}</td>
                <td className="pp_cell w20">{i.loc.join(", ")}</td>
                <td className="pp_cell w45">
                  {planetStyleObjects.map((pl) => (
                    <span
                      style={
                        pl.transparency
                          ? pl.underline
                            ? opaqueUnderStyle
                            : opaqueStyle
                          : normalStyle
                      }
                    >
                      {pl.name}
                      {pl.name != "Ve" ? ", " : ""}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default BhavaTable;
