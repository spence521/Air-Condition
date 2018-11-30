class TempChart {

    constructor(data) {
		this.allData = data;
        this.width = 800;
        this.height = 500;
		this.svg = d3.select("#waves").append("svg").attr("width", this.width).attr("height", this.height).attr('id', 'myTempSVG');

//CODE FOR THE INFO BELOW CHART STARTS HERE
	
    

    this.svg2 = d3.select("#reco").append("svg")
                  .attr("width", 400)
                  .attr("height", 500);
	this.svgLegend = d3.select("#reco").append("svg")
                   .attr("width", this.width/2)
                   .attr("height", this.height);
	
		this.InfoArray = {
			"San_Diego":{"Air":"GOOD", "Pop":"1,410,000", "Reg":"2,240,181", "Ind":"150,000", "Com":"22.2 min."},
			"Los_Angeles":{"Air":"VERY BAD", "Pop":"3,000,980", "Reg":"6,490,5371", "Ind":"600,000", "Com":"29.8 min."},
			"Bakersfield":{"Air":"FAIR", "Pop":"376,371", "Reg":"442,603", "Ind":"600,000", "Com":"21.1 min."},
			"Fresno":{"Air":"VERY BAD", "Pop":"522,021", "Reg":"521,231", "Ind":"75,000", "Com":"20.2 min."},
			"San_Jose":{"Air":"VERY BAD", "Pop":"1,000,300", "Reg":"1,390,562", "Ind":"220,000", "Com":"29.3 min."},
			"San_Francisco":{"Air":"BAD", "Pop":"870,887", "Reg":"411,267", "Ind":"200,000", "Com":"31.4 min."},
			"Sacramento":{"Air":"VERY BAD", "Pop":"501,901", "Reg":"954,879", "Ind":"72,000", "Com":"23.9 min."},
			"Eureka":{"Air":"VERY GOOD", "Pop":"27,177", "Reg":"20,000", "Ind":"5,500", "Com":"11.6 min."}
		};


//ENDS HERE

        this.margin = {top: 50, right: 20, bottom: 50, left: 100};

        //this.CityData;
        //cityName;
        this.lines = null;
        this.cityLines = null;
          //INFO BOX FLAG
        this.flag = true;
    }

    drawChart(){
        //console.log(cityName);
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
            .text("35F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 138)
            .text("50F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 257.5)
            .text("65F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 377)
            .text("80F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
       
            
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 490)
            .text("95F")
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

		
        //CODE FOR THE INFO BELOW CHART STARTS HERE
            

    	}

	drawInfo(cityName, color){
		let that = this;
          if (this.flag==true){

                this.svg2.selectAll('text').remove();

                this.svg2.append('text').text(cityName)
                .attr("x", 150)
                .attr("y", 25)
                .attr("width", 120)
                .attr("height", 40)
                .attr('font-size',"20px")
                .style("fill", color);

                this.svg2.append('text').text('Air:')
                .attr("x", 150)
                .attr("y", 55)
                .attr("width", 120)
                .attr("height", 40)
                .style("fill", "gray");


                this.svg2.append('text').text('Population:')
                .attr("x", 150)
                .attr("y", 75)
                .attr("width", 120)
                .attr("height", 40)
                .style("fill", "gray");


                this.svg2.append('text').text('Registered vehicles:')
                .attr("x", 150)
                .attr("y", 95)
                .attr("width", 120)
                .attr("height", 40)
                .style("fill", "gray");


                this.svg2.append('text').text('Nbr. Industries:')
                .attr("x", 150)
                .attr("y", 115)
                .attr("width", 120)
                .attr("height", 40)
                .style("fill", "gray");

                this.svg2.append('text').text('Commute time:')
                .attr("x", 150)
                .attr("y", 135)
                .attr("width", 120)
                .attr("height", 40)
                .style("fill", "gray");


            //CITIES INFORMATION
			for(let city in this.InfoArray){
				if(cityName == city){
					this.svg2.append('text').text(this.InfoArray[city]["Air"])
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px")
                          .style("fill", color);
                    this.svg2.append('text').text(this.InfoArray[city]["Pop"])
                          .attr("x", 240)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px")
                          .style("fill", color);
                    this.svg2.append('text').text(this.InfoArray[city]["Reg"])
                          .attr("x", 308)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px")
                          .style("fill", color);
                    this.svg2.append('text').text(this.InfoArray[city]["Ind"])
                          .attr("x", 271)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px")
                          .style("fill", color);
                    this.svg2.append('text').text(this.InfoArray[city]["Com"])
                          .attr("x", 273)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px")
                          .style("fill", color);
				}
			}
		}
	}

	update(last, data, citys, days){
		let lineChartColors = ["Purple", "Red", "Green", "Orange", "Violet", "Indigo", "Blue", "Black"];
		let that = this;

		this.svg.selectAll('g').remove();
		this.svgLegend.selectAll("g").remove();
		this.svg2.selectAll('text').remove();
		
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
            .text("35F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 138)
            .text("50F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 257.5)
            .text("65F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
        
        
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 377)
            .text("80F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
       
            
        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 490)
            .text("95F")
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
		let p = 0;
		let tail = "";
		let lmark = 0;
		let tmark = 0;
		for(let c in citys){
			if(citys[c] == true){
				if(last != "none" && last == c){
					lmark = i;
				}else{
					tail = c;
					tmark = i;
				}
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
		            .attr("y2", (d, i)=>480 - (d.Temperature_F * 479 / 60) + (35 * 479 / 60))
		            .attr("y1", function(d, i) {
		                if(i < 1){
		                    return 480 - (d.Temperature_F * 479 / 60) + (35 * 479 / 60);
		                }
		                else{
		                    return 480 - (that.lines.data()[i-1].Temperature_F * 479 / 60) + (35 * 479 / 60)
		                }
		            })
					.attr("x2", function (d, i) {
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
		            .text(d=>d.Temperature_F);

					//Draw legend
					let gleg = this.svgLegend.append("g");
					gleg.append("text")
						.attr("x", 50)
			            .attr("y", 20*(p+1))
			            .text(c)
			            .attr("font-family", "sans-serif")
			            .attr("font-size", "16px")
			            .attr("fill", color);
					gleg.append("line")
						.style("stroke", color)
			            .attr("x1", 180)
			            .attr("x2", 280)
			            .attr("y1", 20*(p+1)-8)
			            .attr("y2", 20*(p+1)-8)
			            .style("stroke-width", 2);
					p++;
			}

			if(last != "none")
				this.drawInfo(last, lineChartColors[lmark]);
			else if(tail != "")
				this.drawInfo(tail, lineChartColors[tmark]);
			
			i ++;
		}
	}
}
