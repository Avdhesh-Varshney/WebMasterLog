import { useState, useEffect } from 'react';
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from './images/icon-location.svg';
import { ReactComponent as Arrow } from './images/icon-arrow.svg';

function AppHeader(props) {
  /*
  Stateless component, rendering the title and search bar */
  return (
    <div className="app-header">
      <header className="app-title">
        <h1>IP Address Tracker</h1>
      </header>
      <div className="search-bar">
        <input 
          className="search-input"
          type="text" 
          placeholder="Search for any IP address or domain"
          onChange={props.searchInputChange}
        />
        <button 
          className="search-button"
          onClick={props.searchButtonClick}>
            <Arrow />
        </button>
      </div>
    </div>
  )
}

function IpInfoCategory(props) {
  /*
  Stateless component takes props from parent component (IpInfo) and displays
  it as category: data */
  return (
    <div className="ip-info-category">
      <div className="category-head">
        <h5>{props.category}</h5>
      </div>
      <div className="category-body">
        {props.content}
      </div>
    </div>
  )
}

function IpInfo(props) {
  /*
  Stateless component takes data from App then iterates over the 4 categories and
  passes to child component IpInfoCategory the category name and its relevant data
  if failure to fetch passes "-" instead of data*/
  let ipAddress, location, timezone, isp;
  if (props.ipifyData !== undefined && props.ipifyData !== "Error") {
    ipAddress = props.ipifyData.ip;
    location = (
      props.ipifyData.location.region +
      ', ' +
      props.ipifyData.location.city +
      ' ' +
      props.ipifyData.location.postalCode
      );
    timezone = "UTC " + props.ipifyData.location.timezone;
    isp = props.ipifyData.isp;
  } else {
    ipAddress = location = timezone = isp = '-';
  }
  const verticalSeparator = (
    <div className="ip-info-separator"></div>
  );
  
  return (
    <div className="ip-info">
      <IpInfoCategory 
        category="IP ADDRESS" 
        content={ipAddress} />
      {verticalSeparator}
      <IpInfoCategory 
        category="LOCATION" 
        content={location} />
      {verticalSeparator}
      <IpInfoCategory 
        category="TIMEZONE" 
        content={timezone} />
      {verticalSeparator}
      <IpInfoCategory
        category="ISP" 
        content={isp} />
    </div>
  )
}

function Carte(props) {
  /*
  Component responsible of rendering the map
  takes props (lat, lng) from App, if not available yet resort to default 
  location: (33.58, -7.60) 
  if lat or lng changes useEffect is triggered and redraws the map and its marker
  to fit the new location*/
  const style = {
    height: "530px",
  }
  let [lat, lng] = [33.589886, -7.603869];
  if (props.ipifyData !== undefined && props.ipifyData !== 'Error') {
    lat = Number(props.ipifyData.location.lat);
    lng = Number(props.ipifyData.location.lng)
  }
  const leafletMarker = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIcon,

    iconSize:     [47, 55], // size of the icon
    shadowSize:   [47, 55], // size of the shadow
    iconAnchor:   [23.5, 55], // point of the icon which will correspond to marker's location
    shadowAnchor: [23.5, 55],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
  useEffect(() => {
    let leafletMap = L.map("mapid").setView([lat, lng], 13);
    const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`, 
      {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken
      }
    ).addTo(leafletMap);
    
    L.marker([lat, lng], {icon: leafletMarker}).addTo(leafletMap);
    return () => {
      leafletMap.remove();
    }
  }, [lat, lng]);

  return (
    <div id="mapid" style={style}>map placeholder</div>
  )
}

function checkInputType(string) {
  /*
  Helper function that takes a string as input and returns
  "ip address" or "domain name" if it matches the corresponding regex
  false if no regex matches or string length > 254*/
  if (string.length > 254) {
    return false
  }

  let numField = "(0|[1-2][0-9]([0-5]|(?<!2[5-9])[6-9])|[1-9][0-9]?)";
  let ipRegex = new RegExp(
      `^(${numField}\\.){3}${numField}$`);
  if (ipRegex.test(string)) {
    return "ip address"
  }

  let domainRegex = 
    /^(https?:\/\/)?(www\.)?([a-z0-9]{1}[a-z0-9-]{0,62}\.){1,2}[a-z]{2,63}$/i;
  if (domainRegex.test(string)) {
    return "domain name"
  }

  return false
}

function App(props) {
  /*
  Main component
  passes props (response) to Carte component and IpInfo component
  passes props (event functions) to AppHeader component
  communicates with ipify API to get data about an ip or domain name
  the first data fetch doesn't use any options, so the data returned concern the user IP
  */
  let initialRequest = `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPIFY_KEY}`;

  let [requestOptions, setRequestOptions] = useState("");
  let [response, setResponse] = useState(undefined);
  let [search, setSearch] = useState("");

  const searchInputChange = (event) => {
    setSearch(event.target.value);
  };

  const searchButtonClick = (event) => {
    let newRequestOptions, validity;
    if (checkInputType(search) === "ip address") {
      newRequestOptions = `&ipAddress=${search}`;
    } else if (checkInputType(search) === "domain name") {
      newRequestOptions = `&domain=${search}`;
    } else {
      newRequestOptions = requestOptions;
      alert("Please enter a valid IP address or domain name");
    }
    setRequestOptions(newRequestOptions);
  };
  
  useEffect(() => {
    fetch(initialRequest + requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Failed to fetch data from server");
    })
    .then((data) => {
      setResponse(data);
    })
    .catch((error) => {
      setResponse("Error");
    })
  }, [requestOptions]);

  return (
    <div className="app-container">
      <div className="prompter">
        <AppHeader 
          searchInputChange={searchInputChange} 
          searchButtonClick={searchButtonClick}
        />
        <IpInfo ipifyData={response} />
      </div>
      <Carte ipifyData={response}/>
    </div>
  );
}

export default App;