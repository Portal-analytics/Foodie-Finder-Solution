import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const PlaceMap = ({ places }) => (
  <Map center={[38.0352826, -78.5024838]} zoom={14} style={{ height: "800px" }}>
    <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
    {places.map(place => (
      <Marker position={place.geometry.location} key={place.id}>
        <Popup>
          <span>
            {place.name}
            <br />
            {place.description}
          </span>
        </Popup>
      </Marker>
    ))}
  </Map>
);

export default PlaceMap;
