var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

var socket = io();

socket.on('chat message', function(msg) {
	$('body').append($('<p>').text(msg));
});

socket.on("latLng", function(latLng) {
	alert('someone just put their location in');
	createMarker(latLng);

});

$('form').submit(function(e){
	var objLL = {"latitude": $("#latitude").val(), "longitude": $("#longitude").val()};
  	socket.emit('latLng', objLL);
});

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};
function success(pos) {
  var crd = pos.coords;

  document.getElementById("latitude").value = crd.latitude;
  document.getElementById("longitude").value = crd.longitude;
};
navigator.geolocation.getCurrentPosition(success, error, options);

var map;
var bounds;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 37.789, lng: -122.392},
	  zoom: 8
	});
	
	bounds = new google.maps.LatLngBounds();

	createMarkers(bounds);
}

function createMarkers(bounds) {
	var image = '../images/redcircle.png';

	for (var i = 0; i < dbResults.length; i++) {
      var latLng = new google.maps.LatLng(dbResults[i].latitude,dbResults[i].longitude);
      bounds.extend(latLng);
      var marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.kp,
        map: map,
        icon: image
      });
    }

    map.fitBounds(bounds);
}

function createMarker(obj) {
	var image = '../images/redcircle.png';
	var latLng = new google.maps.LatLng(obj.latitude, obj.longitude);
	bounds.extend(latLng);
	map.fitBounds(bounds);
	var marker = new google.maps.Marker({
		position: latLng,
		animation: google.maps.Animation.kp,
		map: map,
		icon: image
	});

} 


