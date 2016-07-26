console.log("hi");

var myLatLng = {lat: 38.890103, lng: -76.930356};
var icon = 'mtg.png';

function initMap() {

  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: myLatLng,
      zoom: 15
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'This is Home',
    icon: icon
  });

  var infoWindow = new google.maps.InfoWindow({
        content: 'hey there how ya doin?'
      });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
      });

}
