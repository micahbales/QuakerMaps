console.log("hi");

var myLatLng = {lat: 38.890103, lng: -76.930356};

function initMap() {

  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: myLatLng,
      zoom: 15
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'This is Home'
  });

}
