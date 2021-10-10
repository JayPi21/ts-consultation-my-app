import React, { useState } from "react";

const DisplayDhasa = ({ data, title, keyName, handleClick }: any) => {
  const [selecInd, setSelecInd] = useState(null);

  return data.length > 0 ? (
    <div className="pt_card">
      <h1>{title}</h1>
      <div className="pt_smallcard_contanier">
        <table>
          {data.map((i: any) => {
            return (
              <tr
                className={`pt_smallcard ${
                  selecInd === i ? "selected_card" : ""
                }`}
                onClick={() => {
                  handleClick(i.planet, keyName);
                  setSelecInd(i.planet);
                }}
              >
                <td className="dasa_cell w20">{i.planet.substring(0, 2)}</td>
                <td className="dasa_cell w40">{i.start.substring(0, 10)}</td>
                <td className="dasa_cell w40">{i.end.substring(0, 10)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  ) : null;
};

export default DisplayDhasa;
