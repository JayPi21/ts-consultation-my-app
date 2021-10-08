import React from "react";

const DisplayDhasa = ({ dhasaData: data }: any) => {
  return data.length > 0 ? (
    <div className="pt_card">
      <h1>Dhasa Table</h1>
      <div className="pt_smallcard_contanier">
        <table>
          {data.map((i: any) => {
            return (
              <tr>
                <td className="dasa_cell w20">{i.planet.substring(0, 2)}</td>
                <td className="dasa_cell w40">{i.start.substring(0, 10)}</td>
                <td className="dasa_cell w40">{i.end.substring(0, 10)}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default DisplayDhasa;
