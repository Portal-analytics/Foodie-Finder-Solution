import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Map from "./Map";

const apiKey = "AIzaSyCBv5R3iBvkAgF0tBzV7jm1AU7siHw2wbY";
const places = [];
const images = {};

class App extends React.Component {
  state = {
    places: [],
    nextPage: ""
  };
  _saveQuery = response => {
    const newState = {
      places: response.data.results,
      previousPage: response.data.last_page_token,
      nextPage: response.data.next_page_token,
      arbitrary: 1
    };
    this.setState(newState);
  };
  componentWillMount() {
    const baseUrl =
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      urlWithQuery = baseUrl + "?query=restaurants+in+Charlottesville",
      urlWithKey = urlWithQuery + "&key=" + apiKey;
    axios.get(urlWithKey).then(this._saveQuery);
  }
  render() {
    const places = this.state.places;
    return (
      <div className="App">
        <div
          className="App-header"
          style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Foodie Finder</h2>
        </div>
        <div className="App-body">
          <div className="place-list__container">
            <div className="place-list__header">
              Restaurants in Charlottesville
            </div>
            <ul className="place-list">
              {this.state.places.map(place => {
                return (
                  <li key={place.id} className="place-list__item">
                    <div>
                      <div className="place-list__item-name">
                        {place.name}
                      </div>
                      <div className="place-list__item-address">
                        {place.formatted_address}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <Map places={places} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
