import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
// import data from "../helper/chartTableInput";

const ChartTable = ({ data }) => {
  return (
    <div className="pt_table table_split float_left">
      <table className="table">
        <thead className="table_header">
          <tr>
            <td className="bava_no">B#</td>
            <td></td>
            <td>SL</td>
            <td>DAL</td>
            <td>BHL</td>
            <td>ANL</td>
            <td>DEG</td>
            <td>PL</td>
            <td>PSL</td>
            <td>NL</td>
            <td>PSU</td>
            <td>SSL</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((c, idx) => (
              <tr key={`data${idx}`}>
                <td className="bava_no">{c.houseId}</td>

                <td className="dull_part1">
                  <Fragment>
                    <i
                      class="material-icons"
                      style={{ cursor: "pointer" }}
                      data-tip
                      data-for={`planetSignNametooltip${idx}`}
                    >
                      visibility_off
                    </i>
                    <ReactTooltip
                      place="top"
                      type="dark"
                      id={`planetSignNametooltip${idx}`}
                    >
                      PSN:{c.planetSignName || "-"}&nbsp;,DN:
                      {c.houseNakshathraName || "-"},&nbsp;HSN:
                      {c.houseSignName || "-"},&nbsp;SUKL:
                      {c.sukLord || "-"},&nbsp;NN:
                      {c.planetNakName || "-"}
                      ,&nbsp;SSS:{c.planetSubSubSubLord || "-"}
                    </ReactTooltip>
                  </Fragment>
                </td>

                {c.houseSignLord === undefined && <td>{""}</td>}
                {c.houseSignLord !== undefined && (
                  <td className="dull_part">
                    {c.houseSignLord.substring(0, 2)}
                  </td>
                )}
                {c.dhasaLord === undefined && (
                  <td className="highlight">{""}</td>
                )}
                {c.dhasaLord !== undefined && (
                  <td className="highlight">{c.dhasaLord.substring(0, 2)}</td>
                )}
                {c.bukthiLord === undefined && <td>{""}</td>}
                {c.bukthiLord !== undefined && (
                  <td className="highlight">{c.bukthiLord.substring(0, 2)}</td>
                )}
                {c.antharaLord === undefined && <td>{""}</td>}
                {c.antharaLord !== undefined && (
                  <td className="highlight">{c.antharaLord.substring(0, 2)}</td>
                )}
                <td>{c.degree.toFixed(2) || ""}</td>
                {c.planet === undefined && (
                  <td className="highlight">{c.planet || ""}</td>
                )}
                {c.planet !== undefined && (
                  <td className="highlight">{c.planet.substring(0, 2)}</td>
                )}
                {c.planetSignLord === undefined && (
                  <td className="dull_part">{c.planetSignLord || ""}</td>
                )}
                {c.planetSignLord !== undefined && (
                  <td className="dull_part">
                    {c.planetSignLord.substring(0, 2)}
                  </td>
                )}
                {c.planetNakLord === undefined && <td>{""}</td>}
                {c.planetNakLord !== undefined && (
                  <td className="highlight">
                    {c.planetNakLord.substring(0, 2)}
                  </td>
                )}
                {c.planetSubLord === undefined && <td>{""}</td>}
                {c.planetSubLord !== undefined && (
                  <td className="highlight">
                    {c.planetSubLord.substring(0, 2)}
                  </td>
                )}
                {c.planetSubSubLord === undefined && <td>{""}</td>}
                {c.planetSubSubLord !== undefined && (
                  <td className="highlight">
                    {c.planetSubSubLord.substring(0, 2)}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
