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
        polygonArray = []
    
    function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 49.256994090673, lng: -123.13892841339},
            zoom: 14
        })
        return map
    }
    
    const map = initMap()
    
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
        } else {
            console.log(polygonArray[polygonArray.length - 1])
            polygonArray[polygonArray.length - 1].setMap(null)
            polygonArray.pop()
            polygonArray.push(
                new google.maps.Polygon({
                    map: map,
                    paths: coordinateArrays[coordinateArrays.length - 1],
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
        }
    }
    
    function coordinatesBuilder(newCoords = {}) {  
        coordinateArrays[coordinateArrays.length - 1].push(newCoords)
    }
    
    
    function drawPolygons() {
        coordinatesBuilder({lat: 49.25797441136, lng: -123.13682556152})
        polygonBuilder()
    }
    
    function writeCoordinates() {
        let count = 0
            
        coordinateArrays.forEach((coordArray) => {
            count++;
            let coordHTML = ''

            if(document.getElementById('coordinates-box').childElementCount < coordinateArrays.length) {
                    coordArray.forEach(coordSet => {
                        coordHTML += `<p>${coordSet['lat']}, ${coordSet['lng']}</p>`
                    })
                document.getElementById('coordinates-box').innerHTML += `
                    <div class="polygon-${count}-coordinates">
                        <h6 class="title coordinates">Polygon ${count}</h6>
                        `+ coordHTML +`
                    </div>`
            } else if(count == coordinateArrays.length) {
                let coordLat = coordArray[coordArray.length - 1]['lat'],
                    coordLong = coordArray[coordArray.length - 1]['lng']
                document.querySelector(`#coordinates-box .polygon-${count}-coordinates`).innerHTML += `<p>${coordLat}, ${coordLong}</p>`
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

    //   var blueCoords = [
    //     {lat: 25.774, lng: -60.190},
    //     {lat: 18.466, lng: -46.118},
    //     {lat: 32.321, lng: -44.757}
    //   ];
    
    //   var redCoords = [
    //     {lat: 25.774, lng: -80.190},
    //     {lat: 18.466, lng: -66.118},
    //     {lat: 32.321, lng: -64.757}
    //   ];
    
    //   // Construct a draggable blue triangle with geodesic set to false.
    //   new google.maps.Polygon({
    //     map: map,
    //     paths: blueCoords,
    //     strokeColor: '#0000FF',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: '#0000FF',
    //     fillOpacity: 0.35,
    //     draggable: true,
    //     geodesic: false,
    //   });
})
