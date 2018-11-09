/*let votePercentageChart = new VotePercentageChart();

let tileChart = new TileChart();

let shiftChart = new TrendChart();

let electoralVoteChart = new ElectoralVoteChart(shiftChart);
*/
//load the data corresponding to all the election years
//pass this data and instances of all the charts that update on year selection to yearChart's constructor
//d3.csv("Data/Averaged_San_Fransisco.csv");



d3.csv("Data/Averaged_San_Fransisco.csv").then(electionWinners => {
    console.log(electionWinners);
    
    //let yearChart = new YearChart(electoralVoteChart, tileChart, votePercentageChart, electionWinners);
    //yearChart.update();
});






//data.then((d) => {

    //console.log(d);
    //console.log(d[0]['PM2.5_CF_ATM_ug/m3'])
    //let yearChart = new YearChart(electoralVoteChart, tileChart, votePercentageChart, electionWinners);
    //yearChart.update();
//});

let aScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.a)])
    .range([0, 140]);
