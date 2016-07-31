var myLatLng = {lat: 38.935, lng: -77.025};
var icon = 'mtg.png';

function initMap() {
  var mapStyles = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];
  var styledMap = new google.maps.StyledMapType(mapStyles, {name : "Styled Map"});

  var mapDiv = document.getElementById('map');
  var mapOptions = {
      center: myLatLng,
      zoom: 12,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'map_style']
      }
    };
  var map = new google.maps.Map(mapDiv, mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

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
