
class myMap {

    constructor(data,    mapData, tempChart, humidityChart, pollutionChart) {
        this.width = 600;
        this.height = 500;

        this.projection = d3.geoMercator()
          .center([-122.0, 37.5])
          .scale(2000)
          .translate([this.width/2, this.height/2]);
        this.path = d3.geoPath().projection(this.projection);

        this.allData = data;
        this.tempChart = tempChart;

        this.humidityChart = humidityChart;
        this.pollutionChart = pollutionChart;
        this.chartCount = 0;
        this.lineChartColors = ["Purple", "Red", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
        this.previousNames = [];
        this.prevLines = null;

		this.mapData = mapData;

		//console.log(this.mapData);

        this.cityData = [{x:87, y:221, n:"Eureka", c:"Humbolt"},{x:184, y:332, n:"Sacramento", c:"Sacramento"},
            {x:143, y:366, n:"San Francisco", c:"San Francisco"},{x:167, y:387, n:"San Jose", c:"Santa Clara"},
            {x:245, y:406, n:"Fresno", c:"Fresno"},{x:277, y:468, n:"Bakersfield", c:"Kern"},
            {x:282, y:523, n:"Los Angeles", c:"Los Angeles"},{x:324, y:567, n:"San Diego", c:"San Diego"}];

        this.date = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

		this.selectedFeature = "Temperature";
		this.selectedCitys = {"Eureka":false, "Sacramento":false, "San_Francisco":false, "San_Jose":false,
			"Fresno":false, "Bakersfield":false, "Los_Angeles":false, "San_Diego":false};

		this.lastCity = "Eureka";

		this.selectedDays = this.date;

		this.svgMap = d3.select("#map").append("svg").attr("width", this.width).attr("height", this.height);
		this.svgDate = d3.select("#date").append("svg").attr("width", 800).attr("height", 100);
		this.svgContainer = d3.select(".optionChart").append("svg").attr("width", 380).attr("height", 50);
		this.svgLegend = d3.select("#legend").append("svg").attr("width", this.width).attr("height", 100);

		this.drawOption();
		this.drawMap();
		this.drawDate();
    }

	drawOption(){
		//----Draw Option Rects--------
        let svgContainer = this.svgContainer;

        let that = this;

        svgContainer.append('rect')
                        .attr("x", 10)
                        .attr("y", 0)
                        .attr("width", 120)
                        .attr("height", 40)
                        .style("fill", 'F17665')
                        .classed('recttemp','true')
                        .on("click", function(d){
                            svgContainer.select("recthum").classed("recttempHi", false);
                            d3.select(this).classed("recttempHi", true);
                            d3.select(this).style('fill', '#F17665');
                            d3.select(".recthum").style('fill', 'white');
                            d3.select(".rectpol").style('fill', 'white');
                            that.selectedFeature = "Temperature";
                            document.getElementById("myTempSVG").style.display = "block";
                            document.getElementById("myHumiditySVG").style.display = "none";
                            document.getElementById("myPollutionSVG").style.display = "none";
							document.getElementById("reco").style.display = "block";
							that.update();
                         })
                            .on('mouseover', function(d) {
                                d3.select(this).style("cursor", "pointer");
                            })
                            .on('mouseout', function(d) {
                                d3.select(this).style("cursor", "default");
                            });
        svgContainer.append('rect')
                        .attr("x", 135)
                        .attr("y", 0)
                        .attr("width", 120)
                        .attr("height", 40)
                        .classed('recthum','true')
                        .on("click", function(d){
                            svgContainer.select("rectemp").classed("recthumHi", false);
                            d3.select(this).classed("recthumHi", true);

                            d3.select(this).style('fill', '#93C758');
                            d3.select(".recttemp").style('fill', 'white');
                            d3.select(".rectpol").style('fill', 'white');
                            that.selectedFeature = "Humidity";
                            document.getElementById("myTempSVG").style.display = "none";
                            document.getElementById("myHumiditySVG").style.display = "block";
                            document.getElementById("myPollutionSVG").style.display = "none";
							document.getElementById("reco").style.display = "none";
                            that.update();
                            })
                            .on('mouseover', function(d) {
                                d3.select(this).style("cursor", "pointer");
                            })
                            .on('mouseout', function(d) {
                                d3.select(this).style("cursor", "default");
                            });
        svgContainer.append('rect')
                        .attr("x", 260)
                        .attr("y", 0)
                        .attr("width", 120)
                        .attr("height", 40)
                        .classed('rectpol','true')
                        .on("click", function(d){
                            svgContainer.select("recthum").classed("rectpolHi", false);
                            d3.select(this).classed("rectpolHi", true);

                            d3.select(this).style('fill', '#7396EC');
                            d3.select(".recttemp").style('fill', 'white');
                            d3.select(".recthum").style('fill', 'white');
                            that.selectedFeature = "Pollution";
                            document.getElementById("myTempSVG").style.display = "none";
                            document.getElementById("myHumiditySVG").style.display = "none";
                            document.getElementById("myPollutionSVG").style.display = "block";
							document.getElementById("reco").style.display = "none";

							that.update();

                            })
                            .on('mouseover', function(d) {
                                d3.select(this).style("cursor", "pointer");
                            })
                            .on('mouseout', function(d) {
                                d3.select(this).style("cursor", "default");
                            });


        svgContainer.append('text')
                        .text('Temperature')
                        .attr("x", 25)
                        .attr("y", 25)
                        .attr("width", 120)
                        .attr("height", 40)
                        .on("click", function(d){
                            d3.select(".recttemp").style('fill', '#F17665');
                            d3.select(".recthum").style('fill', 'white');
                            d3.select(".rectpol").style('fill', 'white');
                            that.selectedFeature = "Temperature";
                            document.getElementById("myTempSVG").style.display = "block";
                            document.getElementById("myHumiditySVG").style.display = "none";
                            document.getElementById("myPollutionSVG").style.display = "none";
                            that.update();
                            })
                        .on('mouseover', function(d) {
                            //d3.select(".recttemp").style('fill', '#F78B0A');
                                d3.select(this).style("cursor", "pointer");
                        })
                        .on('mouseout', function(d) {
                            //d3.select(".recttemp").style('fill', 'white');
                            d3.select(this).style("cursor", "default");
                        });
        svgContainer.append('text')
                        .text('Humidity')
                        .attr("x", 165)
                        .attr("y", 25)
                        .attr("width", 120)
                        .attr("height", 40)
                        .on("click", function(d){
                            d3.select(".recthum").style('fill', '#93C758');
                            d3.select(".recttemp").style('fill', 'white');
                            d3.select(".rectpol").style('fill', 'white');
                            that.selectedFeature = "Humidity";
                            document.getElementById("myTempSVG").style.display = "none";
                            document.getElementById("myHumiditySVG").style.display = "block";
                            document.getElementById("myPollutionSVG").style.display = "none";
                            that.update();
                            })
                        .on('mouseover', function(d) {
                            //d3.select(".recthum").style('fill', '#93C758');
                            d3.select(this).style("cursor", "pointer");
                        })
                        .on('mouseout', function(d) {
                            //d3.select(".recthum").style('fill', 'white');
                            d3.select(this).style("cursor", "default");
                        });
        svgContainer.append('text')
                        .text('Pollution')
                        .attr("x", 290)
                        .attr("y", 25)
                        .attr("width", 120)
                        .attr("height", 40)
                        .on("click", function(d){
                            d3.select(".rectpol").style('fill', '#7396EC');
                            d3.select(".recttemp").style('fill', 'white');
                            d3.select(".recthum").style('fill', 'white');
                            that.selectedFeature = "Pollution";
                            document.getElementById("myTempSVG").style.display = "none";
                            document.getElementById("myHumiditySVG").style.display = "none";
                            document.getElementById("myPollutionSVG").style.display = "block";
                            that.update();
                            })
                        .on('mouseover', function(d) {
                            //d3.select(".rectpol").style('fill', '#3EBAE8');
                            d3.select(this).style("cursor", "pointer");
                        })
                        .on('mouseout', function(d) {
                            //d3.select(".rectpol").style('fill', 'white');
                            d3.select(this).style("cursor", "default");
                        });

	}

    drawMap() {
    	let svgMap = this.svgMap;
		let that = this;
        //------------Draw Map-----------------
        svgMap.selectAll("CA")
            .data(this.mapData.features)
            .enter()
            .append("path")
            .attr("stroke","#000")
            .attr("stroke-width",1)
            .attr("d", this.path )
            .attr("fill", "white")
            .attr("id", d=>d.properties.name);

        //------------Legend----------------
        let procedData = {};
		for(let city in this.allData){
			let tem = [];
			let hum = [];
		    let pol = [];
			for(let d in that.allData[city]){
				//console.log(d);
				let date_list = that.allData[city][d].created_in.split(" ");
                let day = parseFloat(date_list[0].split("-")[2]);
			    //console.log(day);
                if(day >= that.selectedDays[0] && day <= that.selectedDays[that.selectedDays.length - 1]){
					tem.push(that.allData[city][d]["Temperature_F"]);
					hum.push(that.allData[city][d]["Humidity_"]);
					pol.push(that.allData[city][d]["PM2_5_CF_ATM_ug_m3"]);
				}
			}

			procedData[city] = {"Temperature":tem, "Humidity":hum, "Pollution":pol};
		}

		let arrMax = [];
		let arrmin = [];
		let arrAvg = [];
		for(let c in procedData){
			arrMax.push(d3.max(procedData[c][that.selectedFeature]));
			arrmin.push(d3.min(procedData[c][that.selectedFeature]));
			arrAvg.push(d3.mean(procedData[c][that.selectedFeature]));
		}
		let maxScale = d3.max(arrMax);
		let minScale = d3.min(arrmin);

		let colorScale;

		if(that.selectedFeature == "Humidity") {
			colorScale = d3.scaleLinear()
				.domain([minScale, maxScale])
				.range([d3.rgb("#b8d4c0"), d3.rgb("green")]);
		}else if(that.selectedFeature == "Temperature"){
			colorScale = d3.scaleLinear()
				.domain([minScale, maxScale])
				.range([d3.rgb("#b8d4c0"), d3.rgb("red")]);
		}else{
			colorScale = d3.scaleLinear()
				.domain([minScale, maxScale])
				.range([d3.rgb("#b8d4c0"), d3.rgb("blue")]);
		}

		let legendQuantile = d3.legendColor()
			.shapeWidth(40)
			.cells(11)
			.orient('horizontal')
			.labelFormat(d3.format('.1r'))
			.scale(colorScale);

		let lsvg = this.svgLegend;
		let gLegend = lsvg.append("g")
			.classed("legendQuantile", true)
			.attr("transform", "translate(100, 30)")
			.call(legendQuantile);

        let gText = lsvg.append("g").classed("legnedtext", true);

        let btext = gText.append("text")
            .text(d => {
            	if(that.selectedFeature == "Humidity") return "Avg. Humidity";
				else if(that.selectedFeature == "Temperature") return "Avg. Fahrenheit";
				else return "Avg. PM2.5"
			})
            .attr("x", 350)
            .attr("y", 25)
            .attr("class", "tilestext");

	    //------------Draw City Name------------
        let gCityLables = svgMap.append('g');
        let cityLables = gCityLables.selectAll('text')
            .data(this.cityData)
            .enter();

        cityLables.append("text")
            .text(d=>d.n)
            .attr("x", d=>{
                if(d.n=="San Francisco") return d.x+110;
                else return d.x+138;})
            .attr("y", d=>d.y-113)
            .attr("id", d=>d.n.replace(" ", "_"))
            .attr("class", "citylable");

        //------------Draw City Circles------------
        let gCircles = svgMap.append('g').classed("gCircle", true);
        let circles = gCircles.selectAll('circle')
                        .data(this.cityData)
                        .enter();

		//let temp = [38.5, 27.1, 46.6, 71.2, 33.3, 45.1, 19.4, 83.7];

        circles.append("circle")
            .attr("cx", d=>d.x+138)
            .attr("cy", d=>d.y-128)
            .attr("r", 10)
            .style("fill", (d, i) => colorScale(arrAvg[i]))
            .attr("id", d=>d.n.replace(" ", "_"))
            .append("title")
            .text(d=>d.n);

        gCircles.selectAll('circle')
            .on('click', function(d){
				//d3.selectAll("circle").style("opacity", "0.5");
				//d3.select(this).attr("r", "20");
				if(that.selectedCitys[this.id] == false){
					d3.select(this).classed("selected", true);
					d3.selectAll("text#" + this.id).style("font-size", "20px").style("stroke", "red");
					that.selectedCitys[this.id] = true;
					that.lastCity = this.id;
				}else{
					d3.select(this).classed("selected", false);
					d3.selectAll("text#" + this.id).style("font-size", "10px").style("stroke", "black");
					that.selectedCitys[this.id] = false;
					that.lastCity = "none";
				}

				that.update();
            });

		this.tempChart.drawChart("Eureka", this.lineChartColors[0]);
		this.humidityChart.drawChart("Eureka", this.lineChartColors[0]);
		this.pollutionChart.drawChart("Eureka", this.lineChartColors[0]);
    }

	drawDate(){
        //----------------------------------------------------------------
		//Draw Date
        let svgDate = this.svgDate;

		let that = this;

		svgDate.append("text").attr("x", 400).attr("y", 50)
               .text("December 2017").attr("class", "tilestext");

        let xScale = d3.scaleLinear()
            .domain([1, 31])
            .range([60, 760]);

        let rDate = svgDate.append("g").append("rect")
            .attr("x", 50)
            .attr("y", 60)
            .attr("width", 740)
            .attr("height", 30)
            .style("fill", '#C6DBEF');

        let gtexts = svgDate.append("g");
        let texts = gtexts.selectAll("text").data(this.date);
        texts.enter().append("text")
            .attr("x", (d) => xScale(d))
            .attr("y", 80)
            .text((d) => d)
            .style("fill", '#FFF');

        //----Draw days brush-------------
        let daysBrush = d3.brushX()
            .extent([[50, 60],[790, 90]])
            .on("end", d => {
                let days = [];
                if (d3.event.selection != null) {
                    let brushstart = d3.event.selection[0];
                    let brushend = d3.event.selection[1];
                    let texts = svgDate.selectAll("text")
                        .each(function (d, i) {
                            let pos = parseFloat(d3.select(this).attr("x"));
                            if (pos >= brushstart && pos <= brushend && d != null) {
                                days.push(d);
                            }
                        });
                }

				that.selectedDays = days;
                that.update();
            });

        svgDate.append("g").attr("class", "brush").call(daysBrush);
    }

    update() {
		let that = this;
		let svgMap = this.svgMap;
		if(that.selectedDays.length==0){
			that.selectedDays = that.date;
		}
		let procedData = {};

		for(let city in this.allData){
			let tem = [];
			let hum = [];
		    let pol = [];
			for(let d in that.allData[city]){
				//console.log(d);
				let date_list = that.allData[city][d].created_in.split(" ");
                let day = parseFloat(date_list[0].split("-")[2]);
			    //console.log(day);
                if(day >= that.selectedDays[0] && day <= that.selectedDays[that.selectedDays.length - 1]){
					//console.log(day);
					tem.push(parseFloat(that.allData[city][d]["Temperature_F"]));
					hum.push(parseFloat(that.allData[city][d]["Humidity_"]));
					pol.push(parseFloat(that.allData[city][d]["PM2_5_CF_ATM_ug_m3"]));
				}
			}

			procedData[city] = {"Temperature":tem, "Humidity":hum, "Pollution":pol};
		}

		let arrMax = [];
		let arrmin = [];
		let arrAvg = [];
		for(let c in procedData){
			arrMax.push(d3.max(procedData[c][that.selectedFeature]));
			arrmin.push(d3.min(procedData[c][that.selectedFeature]));
			arrAvg.push(d3.mean(procedData[c][that.selectedFeature]));
		}
		let maxScale = d3.max(arrMax);
		let minScale = d3.min(arrmin);

		let colorScale;

		if(that.selectedFeature == "Humidity") {
			colorScale = d3.scaleLinear()
				.domain([minScale, maxScale])
				.range([d3.rgb("#b8d4c0"), d3.rgb("green")]);
		}else if(that.selectedFeature == "Temperature"){
			colorScale = d3.scaleLinear()
				.domain([minScale, maxScale])
				.range([d3.rgb("#b8d4c0"), d3.rgb("red")]);
		}else{
			colorScale = d3.scaleLinear()
				.domain([minScale, maxScale])
				.range([d3.rgb("#b8d4c0"), d3.rgb("blue")]);
		}

		let legendQuantile = d3.legendColor()
			.shapeWidth(40)
			.cells(11)
			.orient('horizontal')
			.labelFormat(d3.format('.1r'))
			.scale(colorScale);

		d3.selectAll(".legendQuantile").remove();

		let lsvg = this.svgLegend;

		let gLegend = lsvg.append("g")
			.classed("legendQuantile", true)
			.attr("transform", "translate(100, 30)")
			.call(legendQuantile);

		d3.selectAll(".legnedtext").remove();
        let gText = lsvg.append("g").classed("legnedtext", true);

        let btext = gText.append("text")
            .text(d => {
            	if(that.selectedFeature == "Humidity") return "Avg. Humidity";
				else if(that.selectedFeature == "Temperature") return "Avg. Fahrenheit";
				else return "Avg. PM2.5"
			})
            .attr("x", 350)
            .attr("y", 25)
            .attr("class", "tilestext");

		svgMap.selectAll(".gCircle").remove();

		let gCircles = svgMap.append('g').classed("gCircle", true);
		let circles = gCircles.selectAll('circle')
						.data(this.cityData)
						.enter();

		circles.append("circle")
			.attr("cx", d=>d.x+138)
			.attr("cy", d=>d.y-128)
			.attr("r", 10)
			.style("fill", (d, i) => colorScale(arrAvg[i]))
			.attr("id", d=>d.n.replace(" ", "_"))
			.classed("selected", d=> that.selectedCitys[d.n.replace(" ", "_")])
			.append("title")
			.text(d=>d.n);

		gCircles.selectAll('circle')
			.on('click', function(d){
				if(that.selectedCitys[this.id] == false){
					//d3.select(this).classed("selected", true);
					d3.selectAll("text#" + this.id).style("font-size", "20px");
					that.selectedCitys[this.id] = true;
					that.lastCity = this.id;
				}else{
					//d3.select(this).classed("selected", false);
					d3.selectAll("text#" + this.id).style("font-size", "10px");
					that.selectedCitys[this.id] = false;
					that.lastCity = "none";
				}

				that.update();
			});


		this.tempChart.update(this.lastCity, procedData, this.selectedCitys, this.selectedDays);
		this.humidityChart.update(procedData, this.selectedCitys, this.selectedDays);
		this.pollutionChart.update(procedData, this.selectedCitys, this.selectedDays);
    }
}
