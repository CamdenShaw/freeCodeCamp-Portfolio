// For ESLint
/* global google */
const google = window.google

$(document).ready(() => {
    let coordinateArrays = [
            [
                {lat: 49.257162147031, lng: -123.14618110657},
                {lat: 49.266320353131, lng: -123.14570903778},
                {lat: 49.265900289126, lng: -123.11493873596}
            ],
            [
                {lat: 49.257022100106, lng: -123.13158988953},
                {lat: 49.256882052783, lng: -123.11511039734},
                {lat: 49.257946402467, lng: -123.13326358795}
            ]
        ],
        polygonArray = [],
        styles = [
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
        
    function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 49.256994090673, lng: -123.13892841339},
            zoom: 14,
            styles: styles,
            disableDefaultUI: true,
            zoomControl: true
        })
        
        return map
        
    }

    const map = initMap()

    let input = document.getElementById('pac-input')
    const searchBox = new google.maps.places.SearchBox(input)
    
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry")
                return;
            }

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport)
            } else {
                bounds.extend(place.geometry.location)
            }
        })
        map.fitBounds(bounds)
    })
    
    function polygonBuilder(polygon = []) {
        if(polygon.length === 0) {
            coordinateArrays.forEach((coordinatesArray) => {
                polygonArray.push(
                    new google.maps.Polygon({
                        map: map,
                        paths: coordinatesArray,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        draggable: true,
                        geodesic: true,
                        editable: true
                    })
                )
            })

            polygonArray.forEach((mapPolygon, key) => {
                mapPolygon.addListener('dragend', () => {
                    let googleArray = mapPolygon.getPath(),
                        stagingArray = [],
                        len = googleArray.getLength()

                    for (var i = 0; i < len; i++) {
                        let tempArray = googleArray.getAt(i).toUrlValue(11).split(',')
                        stagingArray.push({lat: tempArray[0], lng: tempArray[1]})
                    }
                    console.log(stagingArray, 'drag end success')
                    coordinateArrays[key] = stagingArray;
                    console.log(key, coordinateArrays)
                    writeCoordinates(true)
                })
            })
        } else {
            polygonArray[polygonArray.length - 1].setPaths(coordinateArrays[coordinateArrays.length - 1])
        }
    }
    
    console.log(coordinateArrays)

    function coordinatesBuilder(newCoords = {}) {
        coordinateArrays[coordinateArrays.length - 1].push(newCoords)
    }
    
    
    function drawPolygons() {
        coordinatesBuilder({lat: 49.25797441136, lng: -123.13682556152})
        polygonBuilder()
    }
    
    function writeCoordinates(overwrite = false) {
        let coordCount = 0

        if(overwrite) document.getElementById('coordinates-box').innerHTML = ''
            
        coordinateArrays.forEach((coordArray) => {
            coordCount++;
            let coordHTML = ''

            if(document.getElementById('coordinates-box').childElementCount < coordinateArrays.length || overwrite) {

                coordArray.forEach(coordSet => {
                    coordHTML += `<p>${coordSet['lat']}, ${coordSet['lng']}</p>`
                })

                document.getElementById('coordinates-box').innerHTML += `
                    <div class="polygon-${coordCount}-coordinates">
                        <h6 class="title coordinates">Polygon ${coordCount}</h6>
                        `+ coordHTML +`
                    </div>`
            } else if(coordCount === coordinateArrays.length) {
                let coordLat = coordArray[coordArray.length - 1]['lat'],
                    coordLong = coordArray[coordArray.length - 1]['lng']
                document.querySelector(`#coordinates-box .polygon-${coordCount}-coordinates`).innerHTML += `<p>${coordLat}, ${coordLong}</p>`
            }
        }) 
    }

    drawPolygons()

    writeCoordinates()

    map.addListener('click', (e) => {
        let latLngCoordinates = {lat: e.latLng.lat(), lng: e.latLng.lng()}
        coordinatesBuilder(latLngCoordinates)
        polygonBuilder([coordinateArrays])
        writeCoordinates()
    })
})
