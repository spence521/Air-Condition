let tempChart = new TempChart();
let humidityChart = new HumidityChart();
let pollutionChart = new PollutionChart();

d3.json("data/CA.geo.json").then(data => {
    let CAMap = new Map(data, tempChart, humidityChart, pollutionChart);
    CAMap.drawMap();
});