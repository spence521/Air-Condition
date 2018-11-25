
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

        //------------Draw City Name------------
        let gCityLables = this.svg.append('g');
        let cityLables = gCityLables.selectAll('text')
            .data(this.cityData)
            .enter();
            
        cityLables.append("text")
            .text(d=>d.n)
            .attr("x", d=>{
                if(d.n=="San Francisco") return d.x+110;
                else return d.x+138;})
            .attr("y", d=>d.y-113)
            .attr("class", "citylable");
        
        //------------Draw City Circles------------
        let that = this;
        let gCircles = this.svg.append('g');
        let circles = gCircles.selectAll('circle')
                        .data(this.cityData)
                        .enter();

        circles.append("circle")
            .attr("cx", d=>d.x+138)
            .attr("cy", d=>d.y-128)
            .attr("r", 5)
            .append("title")
            .text(d=>d.n);
        
        gCircles.selectAll('circle')
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
        
        //------------Draw Inner Legend------------
        let gInLeg = this.svg.append('g');
        let lRect = gInLeg.append("rect")
            .attr("x", 80)
            .attr("y", 290)
            .attr("width", 170)
            .attr("height", 100)
            .classed("innerLegendRect",true);
        
        let tRect = gInLeg.append("rect")
            .attr("x", 90)
            .attr("y", 300)
            .attr("width", 30)
            .attr("height", 20)
            .style("fill", "#0080ff");
        let tText = gInLeg.append("text")
            .text("Temperature")
            .attr("x", 125)
            .attr("y", 315)
            .style("font-size", "10px");
        let pRect = gInLeg.append("rect")
            .attr("x", 90)
            .attr("y", 320)
            .attr("width", 30)
            .attr("height", 20)
            .style("fill", "#51e76b");
        let pText = gInLeg.append("text")
            .text("Pollution")
            .attr("x", 125)
            .attr("y", 335)
            .style("font-size", "10px");
        let hRect = gInLeg.append("rect")
            .attr("x", 90)
            .attr("y", 340)
            .attr("width", 30)
            .attr("height", 20)
            .style("fill", "#9b3ab8");
        let hText = gInLeg.append("text")
            .text("Humidity")
            .attr("x", 125)
            .attr("y", 355)
            .style("font-size", "10px");
            
        let exText = gInLeg.append("text")
            .text("Proportions of averaged values")
            .attr("x", 90)
            .attr("y", 380)
            .style("font-size", "10px");
        //------------Legend----------------
        let lsvg = d3.select("#legend").append("svg")
            .attr("width", this.width)
            .attr("height", 100);
        
        let defs = lsvg.append("defs");
        let linearGradient = defs.append("linearGradient")
            .attr("id","linearColor")
            .attr("x1","0%")
            .attr("y1","0%")
            .attr("x2","100%")
            .attr("y2","10%");
        let a = d3.rgb(230,238,250);
        let b = d3.rgb(21,69,149);
        let stop1 = linearGradient.append("stop")
            .attr("offset","0%")
            .style("stop-color",a.toString());
         
        let stop2 = linearGradient.append("stop")
            .attr("offset","100%")
            .style("stop-color",b.toString());
        
        let colorRect = lsvg.append("rect")
            .attr("x", 100)
            .attr("y", 30)
            .attr("width", 400)
            .attr("height", 30)
            .style("fill","url(#" + linearGradient.attr("id") + ")");
        
        let gText = lsvg.append("g").classed("legnedtext", true);
        let ltext = gText.append("text")
            .text("0")
            .attr("x", 110)
            .attr("y", 28)
            .attr("class", "tilestext");
            
        let rtext = gText.append("text")
            .text("100")
            .attr("x", 485)
            .attr("y", 28)
            .attr("class", "tilestext");
        
        let btext = gText.append("text")
            .text("Avg. Fahrenheit")
            .attr("x", 300)
            .attr("y", 80)
            .attr("class", "tilestext");
    }
    
    update() {
        
    }
}
