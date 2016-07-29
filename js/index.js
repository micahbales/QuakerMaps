var myLatLng = {lat: 38.9072, lng: -77.0369};
var icon = 'mtg.png';

function initMap() {

  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: myLatLng,
      zoom: 11
    });

  $.getJSON('js/meetings.json', (meeting) => {

    $.each(meeting.meetings, (key, data) => {

      var mtgAddress = meeting['meetings'][key]['address'].split(' ').join('+');

      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + mtgAddress + '&key=AIzaSyAZInx_2Z-qyDZXz2eMhSCd9xBLyeiAf7Q', (locationData) => {

        var geolocation = locationData.results[0].geometry.location;
        var lat = locationData.results[0].geometry.location.lat;
        var lng = locationData.results[0].geometry.location.lng;
        var meetingName = meeting.meetings[key].name;
        var meetingAddress = meeting.meetings[key].address;
        var meetingPhone = meeting.meetings[key].phone;
        var meetingWebsite = meeting.meetings[key].website;
        var meetingEmail = meeting.meetings[key].email;
        var meetingYM = meeting.meetings[key].ym;
        var meetingTime = meeting.meetings[key].time;
        var meetingStyle = meeting.meetings[key].style;
        var meetingBranch = meeting.meetings[key].branch;
        var windowContent = meetingName + "<br />" + meetingAddress + "<br />" + meetingPhone + "<br />" + meetingWebsite + "<br />" + meetingEmail + "<br />" + meetingTime;

        var marker = new google.maps.Marker({
          position: geolocation,
          map: map,
          animation: google.maps.Animation.DROP,
          title: meetingName,
          icon: icon
        });

        var infoWindow = new google.maps.InfoWindow({
              content: windowContent

            });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
            });
      });

    });

  });

};
