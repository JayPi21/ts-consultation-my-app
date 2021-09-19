import React from "react";

const Searchbar = () => {
  return (
    <div>
      <input
        className="pt_input search_txt_box w10"
        type="text"
        name="Name"
        placeholder="Name"
      ></input>
      <input className="pt_input w15" type="date" />
      <input
        type="time"
        name="Time"
        placeholder="Time"
        step="2"
        className="pt_input w15"
      />
      <input type="hidden" name="lat" className="pt_input w10" />
      <input type="hidden" name="lon" className="pt_input w10" />
      <input
        type="text"
        name="tzone"
        placeholder="Time Zone"
        className="pt_input w10"
      />
      <input
        type="text"
        name="Place"
        placeholder="Place"
        className="pt_input w10"
      />
      <span>
        <button className="pt_button w100p">Generate</button>
        <button className="pt_button w100p">Save</button>
        <button className="pt_button w100p">Look Up</button>
      </span>
    </div>
  );
};

export default Searchbar;
