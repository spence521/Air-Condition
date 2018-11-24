
class Map {

    constructor(data, chart) {
        this.width = 600;
        this.height = 500;
        this.svg = d3.select("#map").append("svg").attr("width", this.width).attr("height", this.height);
        this.projection = d3.geoMercator() 
          .center([-122.0, 37.5])
          .scale(2000)
          .translate([this.width/2, this.height/2]);
        this.path = d3.geoPath().projection(this.projection);
        
        this.mapData = data;
        this.chart = chart;
        this.chartCount = 0;
        this.lineChartColors = ["Blue", "Orange", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
        this.previousNames = [];
        this.prevLines = null;

        this.cityData = [{x:87, y:221, n:"Eureka", c:"Humbolt"},{x:184, y:332, n:"Sacramento", c:"Sacramento"},
            {x:143, y:366, n:"San Francisco", c:"San Francisco"},{x:167, y:387, n:"San Jose", c:"Santa Clara"},
            {x:245, y:406, n:"Fresno", c:"Fresno"},{x:277, y:468, n:"Bakersfield", c:"Kern"},
            {x:282, y:523, n:"Los Angeles", c:"Los Angeles"},{x:324, y:567, n:"San Diego", c:"San Diego"}];
    }

    drawMap() {
        //console.log(this.mapData);
        this.svg.selectAll("CA")
            .data(this.mapData.features)
            .enter()
            .append("path")
            .attr("stroke","#000")
            .attr("stroke-width",1)
            .attr("d", this.path )
            .attr("fill", "white")
            .attr("id", d=>d.properties.name);

        var that = this;
        let gSVG = this.svg.append('g');
        let circles = gSVG.selectAll('g')
                        .data(this.cityData)
                        .enter()
                        .append('g');

        let cityCircles = circles.append("circle")
            .attr("cx", d=>d.x+138)
            .attr("cy", d=>d.y-128)
            .attr("r", 5)
            .append("title")
            .text(d=>d.n);
        
        circles.selectAll('circle')
            .on('mouseover', function(d) {
                d3.select(this)
                    .style('fill', 'red')
            })
            .on('mouseout', function(d) {
                d3.select(this).style('fill', 'white');
            })
            .on('click', function(d){
                let filename = "data/csv_files/Averaged_" + d.n.replace(" ", "_") + ".csv";
                
                if(true/*!(that.previousNames.indexOf(d.n) > -1) && that.chartCount < 1*/)
                {
                    console.log(that.chartCount);
                    let c_count = that.chartCount;                    
                    d3.csv(filename).then((chartData) => {
                        if(that.chart.lines != null && that.chartCount > 2) { that.chart.lines.remove(); }
                        that.chart.drawChart(chartData, d.n, that.lineChartColors[c_count > 0 ? 1 : 0]);
                    });
                    that.chartCount = that.chartCount + 1;
                }
                that.previousNames.push(d.n);
            });
        
        let lsvg = d3.select("#legend").append("svg")
            .attr("width", this.width)
            .attr("height", 100);
        
        var defs = lsvg.append("defs");
 
        var linearGradient = defs.append("linearGradient")
            .attr("id","linearColor")
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","100%")
            .attr("y2","0%");
        var a = d3.rgb(255,255,0);
        var b = d3.rgb(255,0,0);
        var stop1 = linearGradient.append("stop")
            .attr("offset","0%")
            .style("stop-color",a.toString());
         
        var stop2 = linearGradient.append("stop")
            .attr("offset","100%")
        
        var colorRect = lsvg.append("rect")
            .attr("x", 15)
            .attr("y", 50)
            .attr("width", 400)
            .attr("height", 30)
            .style("fill","url(#" + linearGradient.attr("id") + ")");

    }
    
    update() {
        
    }
}
