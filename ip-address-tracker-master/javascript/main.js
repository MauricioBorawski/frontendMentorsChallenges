import mymap from "./map.js";

const form = document.querySelector(".search-form");
const input = document.getElementById("search-input");
const errorMessage = document.getElementById("error-alert");
const submitButton = document.getElementById("submit-button");
const dataField = document.querySelectorAll(".content");

const mapContainer = document.getElementsByClassName("leaflet-marker-pane");

let domMarkers = [];
let markerList = [];
let clickInMarker = false;
let marker;

const removeMarker = (e) => {
  const markId = parseInt(e.target._leaflet_id);

  if (
    domMarkers.some(
      (marker, j) => marker._leaflet_id - 1 === markerList[j]._leaflet_id
    )
  ) {
    mymap.removeLayer(
      markerList.find((marker) => markId - 1 === marker._leaflet_id)
    );
    clickInMarker = true;
  }
};

input.addEventListener("keyup", () => {
  const regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(.(?!$)|$)){4}$/gi;

  if (!regex.test(input.value)) {
    errorMessage.innerHTML = "Ip invalida";
  } else {
    errorMessage.innerHTML = "";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = `https://geo.ipify.org/api/v1?apiKey=at_xr8eouzvEEhlFcLSvEw3WD8mHufWm&ipAddress=${input.value}`;

  const response = await fetch(url);
  const ipInfo = await response.json();

  dataField[0].innerHTML = ipInfo.ip;
  dataField[1].innerHTML = ipInfo.location.city;
  dataField[2].innerHTML = ipInfo.location.timezone;
  dataField[3].innerHTML = ipInfo.isp;

  L.marker([ipInfo.location.lat, ipInfo.location.lng]).addTo(mymap);
});

mymap.on("click", (e) => {
  if (!clickInMarker) {
    marker = new L.marker(e.latlng).addTo(mymap);
    markerList.push(marker);

    domMarkers.push(
      mapContainer[0].children[mapContainer[0].children.length - 1]
    );
  }

  for (let i = 0; i < domMarkers.length; i++) {
    domMarkers[i].addEventListener("click", removeMarker);
  }
  clickInMarker = false;
});
