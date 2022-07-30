function initMap() {
  const myLatlng = { lat: -8.184486, lng: 113.668076 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);
  
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    var lat = JSON.parse(infoWindow.content).lat;
    var lng = JSON.parse(infoWindow.content).lng;
    console.log(lat);console.log(lng);
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=6dbc93eca2804a0da5f90816221706&q=${lat},${lng}&days=1&aqi=yes&alerts=no`)
    .then((response) => response.json())
    .then((data) => {
        var data1 = data.forecast.forecastday;
        data1.forEach((post)=>{
            var lokasi = `Lokasi = ${data.location.name},${data.location.region},${data.location.country}`;
            var tanggal = `Tanggal : ${post.date}`;
            var temperature = `Temperature : ${post.day.avgtemp_c} celsius`;
            var angin = `Kecepatan Angin : ${(post.day.maxwind_kph*0.27778).toFixed(2)} m/s`;
            var perkiraan_daya = (Math.pow((post.day.maxwind_kph*0.27778),3)*1/2*9144*1.2*0.4)/1000;
            var perkiraan_daya1 = `Daya yang dihasilkan : ${perkiraan_daya.toFixed(2)} kilowatt`;
            document.getElementById('lokasi').innerHTML=lokasi;
            document.getElementById('tanggal').innerHTML=tanggal;
            document.getElementById('temperature').innerHTML=temperature;
            document.getElementById('kecepatan_angin').innerHTML=angin;
            document.getElementById('daya_dihasilkan').innerHTML=perkiraan_daya1;
        })               
    })
    
    infoWindow.open(map);
  });
}

window.initMap = initMap;

export {};

