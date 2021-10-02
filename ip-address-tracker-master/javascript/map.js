var mymap = L.map('mapid');

mymap.setView([-34.62834582972815, -58.46631033565833], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia29rYXV6bmUiLCJhIjoiY2t1NHY2OXpvMWRyNjJxbXA2aDVvcWJtNyJ9.e73Xdj3NpW72YaAq41-7Tg'
}).addTo(mymap);

export default mymap;