function getMyLocation() {
    var posOption = {maximumAge: 3000, timeout: 50000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, posOption);
	//getCurrentPosition - 현재 위치 좌표 객체를 제공
}
//성공시
function onSuccess(position) {
    loadGoogleMap(position.coords.latitude, position.coords.longitude);
	//loadGoogleMap호출 후에 위도경도 값을 인자로 넘겨준다.
}
//실패 콜백 함수
function onError(posError) {
    alert('Error Code : ' + posError.code + ' / Error Message : ' + posError.message);    
}

function loadGoogleMap(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    //$('#map').gmap('destroy'); 	//기존지도를 삭제 ?
    $('#map').gmap({'center': latlng, 'zoom': 15, }); //새 지도를 생성
    //현재위치를 표시해주는 마커
	$('#map').gmap('addMarker', {'position': latlng}).click(function() {
        $('#map').gmap('openInfoWindow', {'content': '현재위치' }, this);});
}
