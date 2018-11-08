
/** Class representing the map view. */
class Map {

    constructor(data) {
        this.width = 500;
        this.height = 500;
		this.svg = d3.select("#chart").append("svg").attr("width", this.width).attr("height", this.height);
		this.projection = d3.geoMercator() 
		  .center([-119.0, 37.5])
		  .scale(2000)
		  .translate([this.width/2, this.height/2]);
		this.path = d3.geoPath().projection(this.projection);
		
		this.CA = data;
		/*
		let data;
		d3.json("data/CA.geo.json", data);
		console.log(data);
		
		this.Shasta = d3.json("data/CA/Shasta.geo.json");
		this.Fresno = d3.json("data/CA/Fresno.geo.json");
		this.San_Francisco = d3.json("data/CA/San Francisco.geo.json");
		this.Los_Angeles = d3.json("data/CA/Los Angeles.geo.json");
		this.San_Diego = d3.json("data/CA/San Diego.geo.json");
		this.Santa_Clara = d3.json("data/CA/Santa Clara.geo.json");
		this.Sacramento = d3.json("data/CA/Sacramento.geo.json");
		this.Kern = d3.json("data/CA/Kern.geo.json");
		*/
		this.coordinate = [{x:160, y:226, n:"Redding"},{x:184, y:332, n:"Sacramento"},{x:143, y:366, n:"San Francisco"},
			{x:167, y:387, n:"San Jose"},{x:245, y:406, n:"Fresno"},{x:277, y:468, n:"Los Angeles"},
			{x:282, y:523, n:"Bakersfield"},{x:324, y:567, n:"San Diego"}];
    }

    /**
     * Renders the map
     * @param world the topojson data with the shape of all countries and a string for the activeYear
     */
    drawMap() {
		console.log(this.CA);
		//console.log(this.Shasta);
        this.svg.selectAll("CA")
			.data(this.CA.features)
			.enter()
			.append("path")
		    .attr("stroke","#000")
		    .attr("stroke-width",1)
		    .attr("d", this.path )
			.attr("fill", "white")
			.attr("id", "CA");
		/*
		this.svg.selectAll("sha")
		    .data(this.Shasta.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#000")
		    .attr("stroke-width",1)
		    .attr("d", this.path )
			.attr("fill", "white")
			.attr("id", "sha");

		this.svg.selectAll("fre")
		    .data( this.Fresno.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#F00")
		    .attr("stroke-width",1)
		    .attr("d", this.path )
			.attr("fill", "white")
			.attr("id", "fre");

		this.svg.selectAll("sfr")
		    .data( this.San_Francisco.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#000")
		    .attr("stroke-width",1)
		    .attr("d", this.path )
			.attr("fill", "white")
			.attr("id", "srf");

		this.svg.selectAll("la")
		    .data( this.Los_Angeles.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#00F")
		    .attr("stroke-width",1)
		    .attr("d", this.path)
			.attr("fill", "white")
			.attr("id", "la");

		this.svg.selectAll("sd")
		    .data( this.San_Diego.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#000")
		    .attr("stroke-width",1)
		    .attr("d", this.path)
			.attr("fill", "white")
			.attr("id", "sd");

		this.svg.selectAll("scla")
		    .data( this.Santa_Clara.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#000")
		    .attr("stroke-width",1)
		    .attr("d", this.path)
			.attr("fill", "white")
			.attr("id", "scla");
			
		this.svg.selectAll("sac")
		    .data( this.Sacramento.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#000")
		    .attr("stroke-width",1)
		    .attr("d", this.path)
			.attr("fill", "white")
			.attr("id", "sac");
		
		this.svg.selectAll("kern")
		    .data( this.Kern.features )
		    .enter()
		    .append("path")
		    .attr("stroke","#000")
		    .attr("stroke-width",1)
		    .attr("d", this.path)
			.attr("fill", "white")
			.attr("id", "kern");
		*/
d3.json("data/CA/Shasta.geo.json").then(json => {
  console.log(json.features);
  let china= this.svg.selectAll("sha")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#0F0")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "sha");
});


d3.json("data/CA/Fresno.geo.json").then(json => {

  let china= this.svg.selectAll("FR")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#F00")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "FR");
  });

d3.json("data/CA/San Francisco.geo.json").then(json => {
  let china= this.svg.selectAll("sfr")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#00F")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "srf");
  });

d3.json("data/CA/Los Angeles.geo.json").then(json => {
  let china= this.svg.selectAll("la")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#00F")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "la");
  });

d3.json("data/CA/San Diego.geo.json").then(json => {
  let china= this.svg.selectAll("sd")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#0F0")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "sd");
  });


d3.json("data/CA/Santa Clara.geo.json").then(json => {
  let china= this.svg.selectAll("scla")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#0F0")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "scla");
  });

d3.json("data/CA/Sacramento.geo.json").then(json => {
  let china= this.svg.selectAll("sac")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#0F0")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "sac");
  });

d3.json("data/CA/Kern.geo.json").then(json => {
  let china = this.svg.selectAll("kern")
    .data( json.features )
    .enter()
    .append("path")
    .attr("stroke","#0F0")//线的颜色
    .attr("stroke-width",1)
    .attr("d", this.path )
	.attr("fill", "white")
	.attr("id", "kern");
  });
}

	drawCitys(){
		let gSVG = this.svg.append('g');
		let circles = gSVG.selectAll('g')
                        .data(this.coordinate)
                        .enter()
                        .append('g');

		let cityCircles = circles.append("circle")
			.attr("cx", d=>d.x-15)
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
				console.log(filename);
				
                d3.csv(filename).then((chartData) => {
					let chart = new Chart(chartData);
					chart.drawChart();
				});
			});
        
        let lsvg = d3.select("#chart").append("svg")
			.attr("width", this.width)
			.attr("height", this.height);
		
		/*
		let colorScale = d3.scaleLinear()
			.domain([0, 100])
			.range([d3.rgb("gray"), d3.rgb("red")]);

		let legendQuantile = d3.legendColor()
			.shapeWidth(40)
			.cells(10)
			.orient('horizontal')
			.labelFormat(d3.format('.1r'))
			.scale(colorScale);

		let gLegend = lsvg.append("g")
			.classed("legendQuantile", true)
			.attr("transform", "translate(0, 50)")
			.call(legendQuantile);
		*/
		var defs = lsvg.append("defs");
 
		var linearGradient = defs.append("linearGradient")
			.attr("id","linearColor")
			.attr("x1","0%")
			.attr("y1","0%")
			.attr("x2","100%")
			.attr("y2","0%");
		var a = d3.rgb(255,255,0);	//红色
		var b = d3.rgb(255,0,0);	//绿色
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
