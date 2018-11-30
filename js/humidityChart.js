class HumidityChart {

    constructor(data) {
		this.allData = data;
        this.width = 800;
        this.height = 500;
        this.svg = d3.select("#waves").append("svg").attr("width", this.width).attr("height", this.height).attr('id', 'myHumiditySVG').style("display", "none");
        //this.svg.style.display = "none";
		/*this.projection = d3.geoMercator() 
		  .center([-119.0, 37.5])
		  .scale(2000)
		  .translate([this.width/2, this.height/2]);*/
        this.path = d3.geoPath().projection(this.projection);
        this.margin = {top: 50, right: 20, bottom: 50, left: 100};
		
        //this.CityData;
        //this.cityName;
        this.lines = null;
        this.cityLines = null;
    }
    
    drawChart(cityName, color){
        //console.log(color);
        let that = this;
        
        let gSVG = this.svg.append('g');
        //left
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", 51)
            .attr("y1", 1)
            .attr("y2", this.height - 20)
        //top
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", 1)
            .attr("y2", 1) 
        //right           
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", this.width - 1)
            .attr("x2", this.width - 1)
            .attr("y1", 1)
            .attr("y2", this.height - 20)
        //bottom
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 20)
            .attr("y2", this.height - 20)

        gSVG.append("text")
            .attr("x", 51)
            .attr("y", this.height - 10)
            .text("Dec 1")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
            
        gSVG.append("text")
            .attr("x", ((this.width - 51) / 2) + 25)
            .attr("y", this.height - 10)
            .text("Dec 15")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        gSVG.append("text")
            .attr("x", this.width - 35)
            .attr("y", this.height - 10)
            .text("Dec 31")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");


        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 25)
            .text("0%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 138)
            .text("25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 257.5)
            .text("50%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 377)
            .text("75%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
       
            
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 490)
            .text("100%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("line")
            .style("stroke", "grey")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 140)
            .attr("y2", this.height - 140)
            .style("stroke-width", 0.5)
            .style("stroke-opacity", 0.5);
        
        gSVG.append("line")
            .style("stroke", "grey")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 259.5)
            .attr("y2", this.height - 259.5)
            .style("stroke-width", 0.5)
            .style("stroke-opacity", 0.5);
            
        gSVG.append("line")
            .style("stroke", "grey")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 379)
            .attr("y2", this.height - 379)
            .style("stroke-width", 0.5)
            .style("stroke-opacity", 0.5);
                    
    }

	update(data, citys, days){
		let lineChartColors = ["Purple", "Red", "Green", "Orange", "Violet", "Indigo", "Blue", "Black"];
		let that = this;
		let cnt = 0;

		this.svg.selectAll('g').remove();

		let gSVG = this.svg.append('g');
		//left
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", 51)
            .attr("y1", 1)
            .attr("y2", this.height - 20)
        //top
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", 1)
            .attr("y2", 1)
        //right
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", this.width - 1)
            .attr("x2", this.width - 1)
            .attr("y1", 1)
            .attr("y2", this.height - 20)
        //bottom
        gSVG.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 20)
            .attr("y2", this.height - 20)

        gSVG.append("text")
            .attr("x", 51)
            .attr("y", this.height - 10)
            .text(d =>{return "Dec" + days[0];})
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        gSVG.append("text")
            .attr("x", ((this.width - 51) / 2) + 25)
            .attr("y", this.height - 10)
            .text(d =>{return "Dec" + days[parseInt(days.length/2)];})
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

		gSVG.append("text")
            .attr("x", this.width - 35)
            .attr("y", this.height - 10)
            .text(d =>{return "Dec" + days[days.length-1];})
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

		gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 25)
            .text("0%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 138)
            .text("25%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 257.5)
            .text("50%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 377)
            .text("75%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
       
            
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 490)
            .text("100%")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        
        gSVG.append("line")
            .style("stroke", "grey")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 140)
            .attr("y2", this.height - 140)
            .style("stroke-width", 0.5)
            .style("stroke-opacity", 0.5);
        
        gSVG.append("line")
            .style("stroke", "grey")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 259.5)
            .attr("y2", this.height - 259.5)
            .style("stroke-width", 0.5)
            .style("stroke-opacity", 0.5);
            
        gSVG.append("line")
            .style("stroke", "grey")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 379)
            .attr("y2", this.height - 379)
            .style("stroke-width", 0.5)
            .style("stroke-opacity", 0.5);

		let i = 0;
		for(let c in citys){
			if(citys[c] == true){				
				let iData = this.allData[c.replace(" ", "_")];
				let CityData = [];
				let color = lineChartColors[i];
				for(let j=0; j<iData.length; j++){
					let date_list = iData[j].created_in.split(" ");
					let day = parseFloat(date_list[0].split("-")[2]);
					if(day >= days[0] && day <= days[days.length - 1]){
					 	 CityData.push(iData[j]);
					}
				}

				let xScale = d3.scaleLinear()
		            .domain([0, CityData.length])
		            .range([this.margin.left, this.width - this.margin.right]);

		        gSVG = this.svg.append('g');
		        
				that.lines = gSVG.selectAll('line')
		                        .data(CityData)
		                        .enter()
		                        //.append('g');


		      that.cityLines = that.lines.append("line")
	            .style("stroke", color)
	            .attr("y2", (d, i)=>480 - (d.Humidity_ * 4.79))
	            .attr("y1", function(d, i) {
	                if(i < 1){
	                    return 480 - (d.Humidity_ * 4.79);
	                }
	                else{
	                    return 480 - (that.lines.data()[i-1].Humidity_ * 4.79)
	                }
	            })
				.attr("x2", function (d, i) {                
	                //console.log(d.created_in);
	                let date = d.created_in;
	                let date_list = date.split(" ");
	                let year = parseFloat(date_list[0].split("-")[0]);
	                let day = parseFloat(date_list[0].split("-")[2]);
	                let time = date_list[1];
	                let first_time = time.split("-")[0];
	                let first_time_list = first_time.split(":")
	                let hour = parseFloat(first_time_list[0]);
	                let minute = parseFloat(first_time_list[1]);
	                hour = hour + (minute / 60);
	                day = day + (hour / 24);

	                if(year == "2018" && day == 1){
	                    day = 32;
	                }                

					let delta = days[days.length-1] - days[0];
		            return (day-days[0])*31/delta *23 +50;
	            })
				.attr("x1", function(d, i) {
	                let date;
	                if(i < 1){
	                    date = d.created_in;
	                }
	                else{
	                    date = that.lines.data()[i-1].created_in;
	                }
	                let date_list = date.split(" ");
	                let year = parseFloat(date_list[0].split("-")[0]);
	                let day = parseFloat(date_list[0].split("-")[2]);
	                let time = date_list[1];
	                let first_time = time.split("-")[0];
	                let first_time_list = first_time.split(":")
	                let hour = parseFloat(first_time_list[0]);
	                let minute = parseFloat(first_time_list[1]);
	                hour = hour + (minute / 60);
	                day = day + (hour / 24);

	                if(year == "2018" && day == 1){
	                    day = 32
	                }                

					let delta = days[days.length-1] - days[0];
		           return (day-days[0])*31/delta *23 +50;
	            })
				.append("title")
	            .text(d=>d.Humidity_);
			}
			i ++;
		}
	}
}
