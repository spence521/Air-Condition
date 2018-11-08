class Chart {

    constructor(data) {
        this.width = 500;
        this.height = 500;
		this.svg = d3.select("#chart").append("svg").attr("width", this.width).attr("height", this.height);
		/*this.projection = d3.geoMercator() 
		  .center([-119.0, 37.5])
		  .scale(2000)
		  .translate([this.width/2, this.height/2]);*/
        this.path = d3.geoPath().projection(this.projection);
        this.margin = {top: 10, right: 20, bottom: 30, left: 50};
		
		this.CityData = data;
    }
    
    drawChart(){


        let xScale = d3.scaleLinear()
            .domain([0, this.CityData.length])
            .range([this.margin.left, this.svgWidth - this.margin.right]);  
        
        let gSVG = this.svg.append('g');
		let circles = gSVG.selectAll('g')
                        .data(this.CityData)
                        .enter()
                        .append('g');

		let cityCircles = circles.append("circle")
			.attr("cy", (d, i)=>200 - d.Temperature_F * 2)
			.attr("cx", function (d) {                
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
                    day = 32
                }
                console.log(day);
                
                return day * 10; 
            })
			.attr("r", 0.1)
			.append("title")
			.text(d=>d.created_in);
        
        
        /*let xScale = d3.scaleLinear()
            .domain([0, this.CityData.length])
            .range([this.margin.left, this.svgWidth - this.margin.right]);        


        var that = this;        
        let gSVG = this.svg.append('g');        
        var data = [[0, (this.svgHeight - 40)/2], [this.svgWidth, (this.svgHeight - 40)/2]];
        var lineGenerator = d3.line();
        var pathString = lineGenerator(data);
        gSVG.append('path')
            .attr('d', pathString)
            .style("stroke-dasharray", ("3, 3"))
            .attr('stroke', 'black');
            
        let years = gSVG.selectAll('g')
                        .data(this.CityData)
                        .enter()
                        .append('g');
        
        let yearCircles = years.append('circle')
            .attr('r', 15)
            .attr('cx', function(d, i) {return xScale(i)} )
            .attr('cy', function(d){
                let date = toString(d.created_in);
                let date_list = str.split(" ");
                let day = parseFloat(date_list[0].split("-")[2]);
                let time = date_list[1];
                let first_time = time.split("-")[0];
                let first_time_list = first_time.split(":")
                let hour = parseFloat(first_time_list[0]);
                let minute = parseFloat(first_time_list[1]);
                hour = hour + (minute / 60);
                day = day + (hour / 24);
                return day; 
            })
            .attr('class', function(d){
                return that.chooseClass(d.PARTY)
            });*/
        




        /*var lineFunction = d3.svg.line()
                         .x(function(d) { return d.Temperature_F; })
                         .y(function(d){ 
                             let date = toString(d.created_in);
                             let date_list = str.split(" ");
                             let day = parseFloat(date_list[0].split("-")[2]);
                             let time = date_list[1];
                             let first_time = time.split("-")[0];
                             let first_time_list = first_time.split(":")
                             let hour = parseFloat(first_time_list[0]);
                             let minute = parseFloat(first_time_list[1]);
                             hour = hour + (minute / 60);
                             day = day + (hour / 24);
                             return day; 
                            })
                         .interpolate("linear");
        var svgContainer = d3.select("body").append("svg")
                                            .attr("width", 200)
                                            .attr("height", 200);
        var lineGraph = svgContainer.append("path")
                                    .attr("d", lineFunction(this.CityData))
                                    .attr("stroke", "blue")
                                    .attr("stroke-width", 2)
                                    .attr("fill", "none");*/


        /*let gSVG = this.svg.append('g');
		let paths = gSVG.selectAll('g')
                        .data(this.CityData)
                        .enter()
                        .append('g');

		let cityPaths = paths.append("path")
			.attr("cx", d=>d.x-15)
			.attr("cy", d=>d.y-128)
			.attr("r", 5)
			.append("title")
			.text(d=>d.n);



        var svgWidth = 600, svgHeight = 400;
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;
        var svg = d3.select('svg')
            .attr("width", svgWidth)
            .attr("height", svgHeight);
        
        var g = svg.append("g")
            .attr("transform", 
               "translate(" + margin.left + "," + margin.top + ")"
            );
        var x = d3.scaleTime().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);
        var line = d3.line()
            .x(function(d) { return x(d.date)})
            .y(function(d) { return y(d.value)})
        x.domain(d3.extent(data, function(d) { return d.date }));
        y.domain(d3.extent(data, function(d) { return d.value }));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();
        
        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        */
    }
}