import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
interface FuncProps {
  setLocData(arg: any): any;
  setTzoneState(arg: any): any;
}

const onReceiveLocationOtherDetails = (data: any) => {
  let tzoneTemp = data.offset ? data.offset / 60 : undefined;
  return tzoneTemp;
};

class LocationSearchInput extends React.Component<FuncProps> {
  constructor(props: any) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address: any) => {
    this.setState({ address });
  };

  handleSelect = (address: any, placeId: any) => {
    this.setState({ address: address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        let data = { address: address, latLng: latLng };
        this.props.setLocData(data);
      })
      .catch((error) => console.error("Error", error));

    const div = document.createElement("div");
    if (window.google && window.google.maps && window.google.maps.places) {
      let service = new window.google.maps.places.PlacesService(div);
      service.getDetails({ placeId: placeId }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if (
            results &&
            results.utc_offset_minutes &&
            onReceiveLocationOtherDetails
          ) {
            this.props.setTzoneState(results.utc_offset_minutes / 60);
          }
        } else {
          console.log("place details not found!");
        }
      });
    }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={(this.state as any)?.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Place",
                className: "location-search-input pt_input w10",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default LocationSearchInput;
