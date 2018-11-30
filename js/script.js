
loadData().then(data => {
	//console.log(data);
	let tempChart = new TempChart(data);
	let humidityChart = new HumidityChart(data);
	let pollutionChart = new PollutionChart(data);
	
	d3.json("data/CA.geo.json").then(mapData => {
		let CAMap = new myMap(data, mapData, tempChart, humidityChart, pollutionChart);
	});
	
});

/**
 * A file loading function or CSVs
 * @param file
 * @returns {Promise<T>}
 */
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let Bakersfield = await loadFile('data/csv_files/Averaged_Bakersfield.csv');
    let Eureka = await loadFile('data/csv_files/Averaged_Eureka.csv');
    let Fresno = await loadFile('data/csv_files/Averaged_Fresno.csv');
    let Los_Angeles = await loadFile('data/csv_files/Averaged_Los_Angeles.csv');
    let Sacramento = await loadFile('data/csv_files/Averaged_Sacramento.csv');
    let San_Diego = await loadFile('data/csv_files/Averaged_San_Diego.csv');
    let San_Francisco = await loadFile('data/csv_files/Averaged_San_Francisco.csv');
    let San_Jose = await loadFile('data/csv_files/Averaged_San_Jose.csv');

    return {
        'Bakersfield': Bakersfield,
        'Eureka': Eureka,
        'Fresno': Fresno,
        'Los_Angeles': Los_Angeles,
        'Sacramento': Sacramento,
        'San_Diego': San_Diego,
        'San_Francisco': San_Francisco,
        'San_Jose': San_Jose
    };
}
