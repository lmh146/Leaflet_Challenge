// Choose and Store Earthquake API

async function main(){
    // Pull Earthquake Data
    const quakeResponse = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson");
    const quakeData = await quakeResponse.json();
    console.log(quakeData);

    var map = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5
    });

    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    const quakeInfo = quakeData.features;

    const coord = [];

    for (let i = 0; i < quakeInfo.length; i++) {
        let quake = quakeInfo[i];

        // let quakeMarker = L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]]).addTo(map);
        let quakeSet = {
            location: [quake.geometry.coordinates[1], quake.geometry.coordinates[0]],
            depth: quake.geometry.coordinates[2],
            place: quake.properties.place,
            magnitude: quake.properties.mag
        }
        coord.push(quakeSet);
    }

    console.log(coord);

    // Function for color selection
    function getColor(c) {
        if (c > 90) {
            return "#f24646";
        }
        else if (c > 70) {
            return "#f76130";
        }
        else if (c > 50) {
            return "#ee9700";
        }
        else if (c > 30) {
            return "#d6bd00";
        }
        else if (c > 10) {
            return "#bed600";
        }
        else {
            return "#87f744";
        }
    }

    for (let i = 0; i < coord.length; i++){


        L.circle(coord[i].location, {
            fillOpacity: 1,
            color: "black",
            fillColor: getColor(coord[i].depth),
            radius: (coord[i].magnitude) * 10500
        }).bindPopup(`<h1>Location:${coord[i].place}</h1> <hr> <h2>Magnitude:${coord[i].magnitude}</h2> <h2>Depth:${coord[i].depth}</h2>`).addTo(map);
    }

    // Create Legend
    let legend = L.control({position: "bottomright"});


    legend.onAdd = function (map) {
        // Create Values
        let div = L.DomUtil.create('div', 'map legend')
            depthVal = [-10, 10, 30, 50, 70, 90],
            labels = []

        for (let i = 0; i < depthVal.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depthVal[i] + 1) + '"></i> ' +
                depthVal[i] + (depthVal[i + 1] ? '&ndash;' + depthVal[i + 1] + '<br>' : '+');
        }

        return div;
    };
    legend.addTo(map);
}

main();