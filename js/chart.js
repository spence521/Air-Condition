class Chart {

    constructor() {
        this.width = 550;
        this.height = 500;
		this.svg = d3.select("#chart").append("svg").attr("width", this.width).attr("height", this.height);
		/*this.projection = d3.geoMercator() 
		  .center([-119.0, 37.5])
		  .scale(2000)
		  .translate([this.width/2, this.height/2]);*/
        this.path = d3.geoPath().projection(this.projection);
        this.margin = {top: 50, right: 20, bottom: 50, left: 100};
		
        this.CityData;
        this.cityName;
    }
    
    drawChart(data, cityName, color){
        console.log(color);
        this.CityData = data;
        this.cityName = cityName;

        let xScale = d3.scaleLinear()
            .domain([0, this.CityData.length])
            .range([this.margin.left, this.svgWidth - this.margin.right]);  
        
        let gSVG = this.svg.append('g');
		let lines = gSVG.selectAll('g')
                        .data(this.CityData)
                        .enter()
                        .append('g');
        //left
        lines.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", 51)
            .attr("y1", 1)
            .attr("y2", this.height - 130)
        //top
        lines.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", 1)
            .attr("y2", 1) 
        //right           
        lines.append("line")
            .style("stroke", "black")
            .attr("x1", this.width - 1)
            .attr("x2", this.width - 1)
            .attr("y1", 1)
            .attr("y2", this.height - 130)
        //bottom
        lines.append("line")
            .style("stroke", "black")
            .attr("x1", 51)
            .attr("x2", this.width - 1)
            .attr("y1", this.height - 130)
            .attr("y2", this.height - 130)
        lines.append("text")
            .attr("x", (this.width / 8) + 50)
            .attr("y", 50)
            .text("Temperature Average (" + this.cityName + ")")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red");
        lines.append("text")
            .attr("x", (this.width / 8) + 50)
            .attr("y", 75)
            .text("December 2017")
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "black");
        lines.append("text")
            .attr("x", 51)
            .attr("y", this.height - 110)
            .text("Dec 1")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
            
        lines.append("text")
            .attr("x", ((this.width - 51) / 2) + 25)
            .attr("y", this.height - 110)
            .text("Dec 15")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        lines.append("text")
            .attr("x", this.width - 35)
            .attr("y", this.height - 110)
            .text("Dec 31")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        lines.append("text")
            .attr("x", 20)
            .attr("y", this.height - 130)
            .text("40F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        
        lines.append("text")
            .attr("x", 20)
            .attr("y", this.height - 260)
            .text("57.5F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        lines.append("text")
            .attr("x", 20)
            .attr("y", this.height - 390)
            .text("75F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        let cityLines = lines.append("line")
            .style("stroke", color)
            .attr("y2", (d, i)=>700 - (d.Temperature_F * 8))
            .attr("y1", function(d, i) {
                if(i < 1){
                    return 700 - (d.Temperature_F * 8);
                }
                else{
                    return 700 - (lines.data()[i-1].Temperature_F * 8)
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
                return (day * 15) + 50; 
            })
			.attr("x1", function(d, i) {
                let date;
                if(i < 1){
                    date = d.created_in;
                }
                else{
                    date = lines.data()[i-1].created_in;
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
                return (day * 15) + 50;
            })
			.append("title")
			.text(d=>d.Temperature_F);
    }
}