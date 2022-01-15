// Choose and Store Earthquake API
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

async function main(){
    // Pull Earthquake Data
    const quakeResponse = await fetch(url);
    const quakeData = await quakeResponse.json();
    console.log(quakeData);

    features(quakeData.features);

}

main();

