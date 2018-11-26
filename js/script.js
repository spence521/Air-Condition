let chart = new Chart()

d3.json("data/CA.geo.json").then(data => {
    let CAMap = new Map(data, chart);
    CAMap.drawMap();
});