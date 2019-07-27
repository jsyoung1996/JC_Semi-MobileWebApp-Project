// JavaScript Document
      // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.552497, lng: 126.988855},
          zoom: 15,
          mapTypeId: 'roadmap'
        });
		var infoWindow = new google.maps.InfoWindow;
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
		
        var markers2 = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }
			
          // Clear out the old markers2.
          markers2.forEach(function(marker) {
            marker.setMap(null);
          });
          markers2 = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon2 = {
              url: place.icon,
              size: new google.maps.Size(200, 200),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(50, 50)
            }; //icon2 닫히는 괄호
            // Create a marker for each place.
            /*markers2.push(new google.maps.Marker({
              map: map,
              icon: icon2,
              title: place.name,
              position: place.geometry.location
			  
            })); //markers2.push가 닫히는 괄호 */
			
			 var markers2 = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon : icon2,
				title : '검색하신 위치입니다.'
              }); // var marker 닫는 괄호
			
			
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            } //else 닫히는 괄호
          });//places.forEach 닫히는 괄호
          map.fitBounds(bounds);
        }); //searchBox.addListener 닫히는 괄호
var infoWindow2 = new google.maps.InfoWindow;
		
			
          // Change this depending on the name of your PHP or XML file
          downloadUrl('http://200.1.5.67/2A3_html/xml.php', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
			  var id = markerElem.getAttribute('id');
              var name = markerElem.getAttribute('name');
              var address = markerElem.getAttribute('address');
              var type = markerElem.getAttribute('type');
			  var lat = markerElem.getAttribute('lat');
			  var lng = markerElem.getAttribute('lng');
  			  var time = markerElem.getAttribute('time');
  			  var female_b = markerElem.getAttribute('female_b');
			  var male_b = markerElem.getAttribute('male_b');
			  var male_s = markerElem.getAttribute('male_s');
              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));

              var infowincontent = document.createElement('div');
			  var button = document.createElement('button');
			  button.textContent = '즐겨찾기 추가';
              var strong = document.createElement('strong');
              strong.textContent = name
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));
			  infowincontent.appendChild(document.createElement('br'));
			  

              var text = document.createElement('text');
              text.textContent = address
              infowincontent.appendChild(text);
			  infowincontent.appendChild(document.createElement('br'));

              var text2 = document.createElement('text');
              text2.textContent = "남자대변기 : " + male_b + "개 남자소변기 : " + male_s + "개 여자대변기 : "  + female_b + "개"
              infowincontent.appendChild(text2);
			  infowincontent.appendChild(document.createElement('br'));	
			  
			  var text3 = document.createElement('text');
              text3.textContent = "개방시간 : " + time
              infowincontent.appendChild(text3);
			  infowincontent.appendChild(document.createElement('br'));	
			  infowincontent.appendChild(document.createElement('br'));	
			  		  
			  infowincontent.appendChild(button);		  
			  button.onclick = function(){
				  alert('즐겨찾기에 추가되었습니다.');
				  };
			  
			  
              var toilet = 'images/toilet.png';
              var marker = new google.maps.Marker({
                map: map,
                position: point,
                icon : toilet
              }); // var marker 닫는 괄호
			  
			  
              marker.addListener('click', function() {
                infoWindow2.setContent(infowincontent);
                infoWindow2.open(map, marker);
              }); //marker.addListener 닫는 괄호
			  
            }); //Array.prototype.forEach.call 닫는 괄호
          }); //downloadUrl 닫는 괄호
        } //initMap 닫는 괄호


      function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
      }

      function doNothing() {}
