// For ESLint
/* global google */
const google = window.google

$(document).ready(() => {
    let coordinateArrays = [],
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
            
                if(coordinatesArray.length !== 0) return
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
                writeCoordinates(true)
                console.log("created new polygon in polygon array")
            })

            polygonArray.forEach((mapPolygon, key) => {
                mapPolygon.addListener('dragend', () => {
                    let googleArray = mapPolygon.getPath(),
                        stagingArray = [],
                        len = googleArray.getLength()

                    for (var i = 0; i < len; i++) {
                        let tempArray = googleArray.getAt(i).toUrlValue(15).split(',')
                        stagingArray.push({lat: parseFloat(tempArray[0]), lng: parseFloat(tempArray[1])})
                    }

                    coordinateArrays[key] = stagingArray;
                    writeCoordinates(true)
                })
            })
        } else {
            let selectedPolygon = polygonArray[polygonArray.length - 1],
                relevantCoordinates = coordinateArrays[coordinateArrays.length - 1]
            
            console.log(relevantCoordinates, 'relevant coordinates')
            selectedPolygon.setPaths(relevantCoordinates)
            selectedPolygon.getPaths().forEach((path, key) => {
                path.addListener("set_at", () => {
                    polygonArray.forEach((mapPolygon, key) => {
                        let googleArray = mapPolygon.getPath(),
                            stagingArray = [],
                            len = googleArray.getLength()

                        for (var i = 0; i < len; i++) {
                            let tempArray = googleArray.getAt(i).toUrlValue(15).split(',')
                            stagingArray.push({lat: parseFloat(tempArray[0]), lng: parseFloat(tempArray[1])})
                        }

                        coordinateArrays[key] = stagingArray;
                        writeCoordinates(true)
                    })
                })
                
            })

        }
    }
    
    console.log(coordinateArrays)

    function coordinatesBuilder(newCoords = {}) {
        coordinateArrays[coordinateArrays.length - 1].push(newCoords)
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

    
    let turnOnPolygon = true,
    drawPolygonsListener = '',
    newPolygon = true
    
    $(".turn-on-polygon").click(() => {
        if(turnOnPolygon) {
            console.log("turn on polygon")
            
            if(newPolygon) coordinateArrays.push([])
            polygonBuilder(coordinateArrays[coordinateArrays.length - 1])
            newPolygon = false

            drawPolygonsListener = map.addListener('click', (e) => {
                let latLngCoordinates = {lat: e.latLng.lat(), lng: e.latLng.lng()}
                console.log(latLngCoordinates)
                coordinatesBuilder(latLngCoordinates)
                console.log(coordinateArrays)
                polygonBuilder(coordinateArrays)
                writeCoordinates()

                if(coordinateArrays[coordinateArrays.length - 1].length > 2) {
                    $(".turn-off-polygon").prop("disabled", false)
                }
            })

            $(".turn-on-polygon").text("Stop Drawing")

            turnOnPolygon = false
        } else {
            google.maps.event.removeListener(drawPolygonsListener)

            if(coordinateArrays[coordinateArrays.length - 1].length === 0) {
                $(".turn-on-polygon").text("Draw Polygon")
            } else {
                $(".turn-on-polygon").text("Edit Polygon")
            }
            
            turnOnPolygon = true
        }
    })

    $(".turn-off-polygon").click(() => {
        $(".turn-off-polygon").prop("disabled", true)
        $(".turn-on-polygon").text("Draw Polygon")
        google.maps.event.removeListener(drawPolygonsListener)
        newPolygon = true
        turnOnPolygon = true
    })
})
