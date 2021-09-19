import React, { useState } from "react";

const Searchbar = () => {
  const [searchData, setSearchData] = useState({
    name: "",
    date: "",
    time: "",
    tzone: "",
    place: "",
  });
  return (
    <div>
      <input
        onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
        className="pt_input search_txt_box w10"
        type="text"
        name="Name"
        placeholder="Name"
      ></input>
      <input
        onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
        className="pt_input w15"
        type="date"
      />
      <input
        onChange={(e) => setSearchData({ ...searchData, time: e.target.value })}
        type="time"
        name="Time"
        placeholder="Time"
        step="2"
        className="pt_input w15"
      />
      <input type="hidden" name="lat" className="pt_input w10" />
      <input type="hidden" name="lon" className="pt_input w10" />
      <input
        onChange={(e) =>
          setSearchData({ ...searchData, tzone: e.target.value })
        }
        type="text"
        name="tzone"
        placeholder="Time Zone"
        className="pt_input w10"
      />
      <input
        onChange={(e) =>
          setSearchData({ ...searchData, place: e.target.value })
        }
        type="text"
        name="Place"
        placeholder="Place"
        className="pt_input w10"
      />
      <span>
        <button
          className="pt_button w100p"
          onClick={() => {
            if (
              searchData.name.length > 0 &&
              searchData.date.length > 0 &&
              searchData.time.length > 0 &&
              searchData.tzone.length > 0 &&
              searchData.place.length > 0
            )
              console.log(searchData);
          }}
        >
          Generate
        </button>
        <button className="pt_button w100p">Save</button>
        <button className="pt_button w100p">Look Up</button>
      </span>
    </div>
  );
};

export default Searchbar;
