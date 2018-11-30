class PollutionChart {

    constructor(data) {
		this.allData = data;
        this.width = 800;
        this.height = 500;
        this.svg = d3.select("#waves").append("svg").attr("width", this.width).attr("height", this.height).attr('id', 'myPollutionSVG').style("display", "none");

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
            .attr("x", 11)
            .attr("y", this.height - 25)
            .text("0 PM2.5")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        gSVG.append("text")
            .attr("x", 6)
            .attr("y", this.height - 138)
            .text("55 PM2.5")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        gSVG.append("text")
            .attr("x", 1)
            .attr("y", this.height - 257.5)
            .text("110 PM2.5")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");


        gSVG.append("text")
            .attr("x", 1)
            .attr("y", this.height - 377)
            .text("165 PM2.5")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");


        gSVG.append("text")
            .attr("x", 1)
            .attr("y", this.height - 490)
            .text("220 PM2.5")
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

    drawInfo(cityName, color){

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
                  .style("fill", color);


                  this.svg2.append('text').text('Population:')
                  .attr("x", 150)
                  .attr("y", 75)
                  .attr("width", 120)
                  .attr("height", 40)
                  .style("fill", color);


                  this.svg2.append('text').text('Registered vehicles:')
                  .attr("x", 150)
                  .attr("y", 95)
                  .attr("width", 120)
                  .attr("height", 40)
                  .style("fill", color);


                  this.svg2.append('text').text('Nbr. Industries:')
                  .attr("x", 150)
                  .attr("y", 115)
                  .attr("width", 120)
                  .attr("height", 40)
                  .style("fill", color);

                  this.svg2.append('text').text('Commute time:')
                  .attr("x", 150)
                  .attr("y", 135)
                  .attr("width", 120)
                  .attr("height", 40)
                  .style("fill", color);


              //CITIES INFORMATION

              //SAN DIEGO


                          if (cityName=='San_Diego'){


                            this.svg2.append('text').text('Good')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('1,410,000')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('2,240,181')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('150,000')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text('22.2 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);




                          }

              //SAN FRANCISCO

                          if (cityName=='San_Francisco'){


                            this.svg2.append('text').text('Bad')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('870,887')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('411,267')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('200,000')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text('31.4 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);
                          }

              //BAKERSFIELD

                          if (cityName=='Bakersfield'){


                            this.svg2.append('text').text('Fair')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('376,371')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('442,603')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('60,000')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text(' 21.1 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);
                          }

              //SACRAMENTO

                          if (cityName=='Sacramento'){


                            this.svg2.append('text').text('VERY BAD')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('501,901')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('954,879')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('72,000')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text(' 23.9 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);
                          }


              //LOS ANGELES

                          if (cityName=='Los_Angeles'){


                            this.svg2.append('text').text('VERY BAD')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('3,000,980')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('6,490,537')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('600,000')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text('29.8 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);
                          }

              //FRESNO

                          if (cityName=='Fresno'){


                            this.svg2.append('text').text('VERY BAD')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('522,021')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('521,231')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('75,000')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text('20.2 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);
                          }

              //SAN JOSE

                          if (cityName=='San_Jose'){


                            this.svg2.append('text').text('VERY BAD')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('1,000,300')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('1,390,562')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('220,000')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text('29.3 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);
                          }

              //EUREKA

                          if (cityName=='Eureka'){


                            this.svg2.append('text').text('VERY GOOD')
                            .attr("x", 180)
                            .attr("y", 55)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"30px")
                            .style("fill", color);

                            this.svg2.append('text').text('27,177')
                            .attr("x", 230)
                            .attr("y", 75)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('20,000')
                            .attr("x", 298)
                            .attr("y", 95)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);


                            this.svg2.append('text').text('5,500')
                            .attr("x", 261)
                            .attr("y", 115)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);

                            this.svg2.append('text').text('11.6 min.')
                            .attr("x", 263)
                            .attr("y", 135)
                            .attr("width", 120)
                            .attr("height", 40)
                            .attr('font-size',"20px")
                            .style("fill", color);
                          }




                  }

              //ENDS HERE

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
			.attr("x", 11)
			.attr("y", this.height - 25)
			.text("0 PM2.5")
			.attr("font-family", "sans-serif")
			.attr("font-size", "10px")
			.attr("fill", "black");

		gSVG.append("text")
			.attr("x", 6)
			.attr("y", this.height - 138)
			.text("55 PM2.5")
			.attr("font-family", "sans-serif")
			.attr("font-size", "10px")
			.attr("fill", "black");

		gSVG.append("text")
			.attr("x", 1)
			.attr("y", this.height - 257.5)
			.text("110 PM2.5")
			.attr("font-family", "sans-serif")
			.attr("font-size", "10px")
			.attr("fill", "black");


		gSVG.append("text")
			.attr("x", 1)
			.attr("y", this.height - 377)
			.text("165 PM2.5")
			.attr("font-family", "sans-serif")
			.attr("font-size", "10px")
			.attr("fill", "black");


		gSVG.append("text")
			.attr("x", 1)
			.attr("y", this.height - 490)
			.text("220 PM2.5")
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
	            .attr("y2", (d, i)=>480 - (d.PM2_5_CF_ATM_ug_m3 * 479 / 220))
	            .attr("y1", function(d, i) {
	                if(i < 1){
	                    return 480 - (d.PM2_5_CF_ATM_ug_m3 * 479 / 220);
	                }
	                else{
	                    return 480 - (that.lines.data()[i-1].PM2_5_CF_ATM_ug_m3 * 479 / 220)
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
	            .text(d=>d.PM2_5_CF_ATM_ug_m3);
			}
			i ++;
		}
	}
}
