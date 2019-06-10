window.addEventListener('load', function () {
    if (typeof google === "undefined") {
        return null;
    }

    var mapElm = document.querySelectorAll('.advgb-map-block .advgb-map-content');
    for (var i = 0; i < mapElm.length; i++) {
        elm = mapElm[i];
        var lat = parseFloat(elm.dataset.lat),
            lng = parseFloat(elm.dataset.lng),
            zoom = parseFloat(elm.dataset.zoom),
            defaultMarker = elm.dataset.default,
            icon = elm.dataset.icon,
            title = elm.dataset.title,
            info = decodeURIComponent(elm.dataset.info),
            mapStyle = decodeURIComponent(elm.dataset.style);

        var location = {
            lat: lat,
            lng: lng
        };

        var map = new google.maps.Map(elm, {
            zoom: zoom,
            center: location,
            styles: mapStyle !== '' ? JSON.parse(mapStyle) : {},
            gestureHandling: 'cooperative'
        });
        var infoWindow = new google.maps.InfoWindow({
            content: info
        });
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: {
                url: icon || defaultMarker,
                scaledSize: new google.maps.Size(27, 43)
            }
        });
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        })
    }
});