import mymap from "./map.js";

const form = document.querySelector(".search-form");
const input = document.querySelector(".search-input");
const submitButton = document.getElementById("submit-button");
const dataField = document.querySelectorAll('.content');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(dataField);
 
  const url = `https://geo.ipify.org/api/v1?apiKey=at_xr8eouzvEEhlFcLSvEw3WD8mHufWm&ipAddress=${input.value}`;

  const response = await fetch(url);
  const ipInfo = await response.json();

  dataField[0].innerHTML = ipInfo.ip;
  dataField[1].innerHTML = ipInfo.location.city;
  dataField[2].innerHTML = ipInfo.location.timezone;
  dataField[3].innerHTML = ipInfo.isp;

  console.log([ipInfo.location.lat, ipInfo.location.lng]);

  L.marker([ipInfo.location.lat, ipInfo.location.lng]).addTo(mymap);
});

