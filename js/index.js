var myLatLng = {lat: 38.9072, lng: -77.0369};
var icon = 'mtg.png';

function initMap() {

  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: myLatLng,
      zoom: 11
    });

  $.getJSON('js/meetings.json', function (meeting) {
    console.log(meeting['meetings'][0]['address']);

    $.each(meeting.meetings, function (key, data) {
      console.log('key : ' + key + ' & data : ' + data.name );
      var mtgAddress = meeting['meetings'][key]['address'].split(' ').join('+');
      console.log(mtgAddress);
      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + mtgAddress + '&key=AIzaSyAZInx_2Z-qyDZXz2eMhSCd9xBLyeiAf7Q', function (locationData) {
        console.log(locationData.results[0].geometry.location);
        var geolocation = locationData.results[0].geometry.location;
        var lat = locationData.results[0].geometry.location.lat;
        var lng = locationData.results[0].geometry.location.lng;
        var meetingAddress = meeting.meetings[key].address;
        var meetingName = meeting.meetings[key].name;

        var marker = new google.maps.Marker({
          position: geolocation,
          map: map,
          animation: google.maps.Animation.DROP,
          title: meetingName,
          icon: icon
        });

        var infoWindow = new google.maps.InfoWindow({
              content: meetingName

            });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
            });
      });

    });

  });

};
