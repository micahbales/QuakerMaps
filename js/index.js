function initMap(s) {

  var selector = s || "any";

  var icon = 'mtg.png';

  $.getJSON('js/meetings.json', function (meetings) {

    var bounds = new google.maps.LatLngBounds();

    var mapDiv = document.getElementById('map');
    var mapOptions = {
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'map_style']
        }
      };
    var map = new google.maps.Map(mapDiv, mapOptions);

    // var attemptedPlots = 0;
    // var totalMeetings = meetings.length;
    // var totalMatch = 0;

    $.each(meetings, function (key, data) {

      // attemptedPlots++;

      var address = meetings[key]['address'].split(' ').join('+');


      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAZInx_2Z-qyDZXz2eMhSCd9xBLyeiAf7Q', function (locationData) {

        var geolocation = locationData.results[0].geometry.location;
        var meetingName = meetings[key].name;
        var meetingAddress = meetings[key].address;
        var meetingState = meetings[key].state;
        var meetingZip = meetings[key].zip;
        var meetingPhone = meetings[key].phone;
        var meetingWebsite = meetings[key].website;
        var meetingEmail = meetings[key].email;
        var meetingYM = meetings[key].ym;
        var meetingTime = meetings[key].time;
        var meetingStyle = meetings[key].style;
        var meetingBranch = meetings[key].branch;

        var criterion;

        if (selector !== "any" && selector.length === 2) {
          criterion = meetingState;
        } else if (parseInt(selector) > 0) {
          criterion = meetingZip;
        } else if (selector.length > 2) {
          criterion = meetingYM;
        } else {
          criterion = "any";
        }

        if (selector === criterion || selector === "any") {

          // totalMatch++;

          var marker = new google.maps.Marker({
            position: geolocation,
            map: map,
            animation: google.maps.Animation.DROP,
            title: meetingName,
            icon: icon
          });

            var windowContent = meetingName + "<br />" + meetingAddress + "<br />" + meetingPhone + "<br />" + meetingWebsite + "<br />" + meetingEmail + "<br />" + meetingTime;
            var infoWindow = new google.maps.InfoWindow({
                  content: windowContent
                });

            google.maps.event.addListener(marker, 'click', () => {
                infoWindow.open(map, marker);
                });

            bounds.extend(new google.maps.LatLng(geolocation));

            map.center = bounds.getCenter();
            map.fitBounds(bounds);

            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');

          }



      });

    });

    if (totalMatch === 0 && totalMeetings === attemptedPlots) { initMap(); }

  });

  var mapStyles = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}];
  var styledMap = new google.maps.StyledMapType(mapStyles, {name : "Custom Syle"});

};

$('#nav-icon').on('click', function () {
  $('#navbar').toggleClass('no-display');
});

var formID;

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
}

$('button[type="submit"]').on('click', function (e) {

  e.preventDefault;

  if (this.id === "state-submit") {
    formID = document.getElementById('state-select').value;
  } else if (this.id === "zip-submit") {
    formID = document.getElementById('zip-text').value;
    if (!(parseInt(formID) < 99999 && formID.length === 5)) {
      formID = "";
    }
  } else if (this.id === "ym-submit") {
    formID = document.getElementById('ym-select').value;
  }

  if (formID !== "") {
    initMap(formID);
    $('#navbar').toggleClass('no-display');
  }

  return false;

});
