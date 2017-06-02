//you using this
function init_map(){
        var map = new google.maps.Map(
            document.getElementById('gmap_canvas'), 
            {zoom:13,center:new google.maps.LatLng(40.7050758,-74.00916039999998), mapTypeId: google.maps.MapTypeId.ROADMAP}
        );     
        var bounds = new google.maps.LatLngBounds();
        var locations = [
            ['Evan',40.7050758,-74.00916039999998],
            ['Mauro',40.7050758,-74.02916039999998],
            ['Arum',40.7050758,-74.04916039999998],
            ['Summer',40.7050758,-74.06916039999998]
        ];  
        setMarkers(map,locations);
        
        function setMarkers(map, locations){
            var marker;
            for(var i=0;i<locations.length;i++){
            var name = locations[i][0];
            var lat = locations[i][1];
            var lng = locations[i][2];

            latlang = new google.maps.LatLng(lat,lng)
            var marker = new google.maps.Marker({
                map:map,
                position:latlang
            });
            myName='<strong>'+name+'<strong>';
            var infowindow = new google.maps.InfoWindow({content:myName})
            console.log(myName)
            google.maps.event.addListener(marker,'click',
            (function(marker,name,infowindow){
                return function(){
                //infowindow.setContent(name);
                infowindow.open(map,marker);
                };
            }
            )
            (marker,name,infowindow));
            //map.setCenter(latlang);
            bounds.extend(latlang)
            }
            map.fitBounds(bounds);
        }
    }
    // google.maps.event.addDomListener(window, 'load', init_map);

