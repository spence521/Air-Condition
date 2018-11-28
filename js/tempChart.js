class TempChart {

    constructor() {
        this.width = 800;
        this.height = 500;
		this.svg = d3.select("#waves").append("svg").attr("width", this.width).attr("height", this.height).attr('id', 'myTempSVG');

//CODE FOR THE INFO BELOW CHART STARTS HERE

    this.svg1 = d3.select("#reco").append("svg")
                   .attr("width", 400)
                   .attr("height", 500);

    this.svg2 = d3.select("#reco").append("svg")
                  .attr("width", 400)
                  .attr("height", 500);

//ENDS HERE

    /*this.projection = d3.geoMercator() 
		  .center([-119.0, 37.5])
		  .scale(2000)
		  .translate([this.width/2, this.height/2]);*/
        this.path = d3.geoPath().projection(this.projection);
        this.margin = {top: 50, right: 20, bottom: 50, left: 100};

        this.CityData;
        this.cityName;
        this.lines = null;
        this.cityLines = null;
          //INFO BOX FLAG
        this.flag = false;
    }

    drawChart(data, cityName, color){
        console.log(color);
        let that = this;
        this.CityData = data;
        this.cityName = cityName;

        let xScale = d3.scaleLinear()
            .domain([0, this.CityData.length])
            .range([this.margin.left, this.svgWidth - this.margin.right]);

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
        /*gSVG.append("text")
            .attr("x", (this.width / 8) + 50)
            .attr("y", 50)
            .text("Temperature Average (" + this.cityName + ")")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red");*/
        /*gSVG.append("text")
            .attr("x", (this.width / 8) + 50)
            .attr("y", 75)
            .text("December 2017")
            .attr("font-family", "sans-serif")
            .attr("font-size", "17px")
            .attr("fill", "black");*/
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

        /*gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 10)
            .text("23F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");*/

        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 51)
            .text("40F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");


        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 186)
            .text("57.5F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 321)
            .text("75F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

        gSVG.append("text")
            .attr("x", 20)
            .attr("y", this.height - 456)
            .text("92.5F")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");


		that.lines = gSVG.selectAll('g')
                        .data(this.CityData)
                        .enter()
                        .append('g');

                        //lines.exit().remove();

                        /*let newlines = lines
                        .enter()
                        .append('line');

                        lines=newlines.merge(lines);*/





        that.cityLines = that.lines.append("line")
            .style("stroke", color)
            .attr("y2", (d, i)=>770 - (d.Temperature_F * 8))
            .attr("y1", function(d, i) {
                if(i < 1){
                    return 770 - (d.Temperature_F * 8);
                }
                else{
                    return 770 - (that.lines.data()[i-1].Temperature_F * 8)
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
                return (day * 23) + 50;
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
                return (day * 23) + 50;
            })
			.append("title")
            .text(d=>d.Temperature_F);

            //CODE FOR THE INFO BELOW CHART STARTS HERE
            



                        if (this.flag===true){

                        this.svg2.selectAll('text').remove();

                        this.svg2.append('text').text(this.cityName)
                        .attr("x", 150)
                        .attr("y", 25)
                        .attr("width", 120)
                        .attr("height", 40)
                        .attr('font-size',"20px");

                        this.svg2.append('text').text('Air:')
                        .attr("x", 150)
                        .attr("y", 55)
                        .attr("width", 120)
                        .attr("height", 40);


                        this.svg2.append('text').text('Population:')
                        .attr("x", 150)
                        .attr("y", 75)
                        .attr("width", 120)
                        .attr("height", 40);


                        this.svg2.append('text').text('Registered vehicles:')
                        .attr("x", 150)
                        .attr("y", 95)
                        .attr("width", 120)
                        .attr("height", 40);


                        this.svg2.append('text').text('Nbr. Industries:')
                        .attr("x", 150)
                        .attr("y", 115)
                        .attr("width", 120)
                        .attr("height", 40);

                        this.svg2.append('text').text('Commute time:')
                        .attr("x", 150)
                        .attr("y", 135)
                        .attr("width", 120)
                        .attr("height", 40);


            //CITIES INFORMATION

            //SAN DIEGO


                        if (this.cityName==='San Diego'){


                          this.svg2.append('text').text('Good')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('1,410,000')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('2,240,181')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('150,000')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text('22.2 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");




                        }

            //SAN FRANCISCO

                        if (this.cityName==='San Francisco'){


                          this.svg2.append('text').text('Bad')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('870,887')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('411,267')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('200,000')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text('31.4 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //BAKERSFIELD

                        if (this.cityName==='Bakersfield'){


                          this.svg2.append('text').text('Fair')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('376,371')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('442,603')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('60,000')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text(' 21.1 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //SACRAMENTO

                        if (this.cityName==='Sacramento'){


                          this.svg2.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('501,901')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('954,879')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('72,000')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text(' 23.9 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }


            //LOS ANGELES

                        if (this.cityName==='Los Angeles'){


                          this.svg2.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('3,000,980')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('6,490,537')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('600,000')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text('29.8 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //FRESNO

                        if (this.cityName==='Fresno'){


                          this.svg2.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('522,021')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('521,231')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('75,000')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text('20.2 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //SAN JOSE

                        if (this.cityName==='San Jose'){


                          this.svg2.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('1,000,300')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('1,390,562')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('220,000')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text('29.3 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //EUREKA

                        if (this.cityName==='Eureka'){


                          this.svg2.append('text').text('VERY GOOD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg2.append('text').text('27,177')
                          .attr("x", 230)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('20,000')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg2.append('text').text('5,500')
                          .attr("x", 261)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg2.append('text').text('11.6 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }




                        }

                             if (this.flag===false){
                              this.svg1.append('text').text(this.cityName)
                              .attr("x", 150)
                              .attr("y", 25)
                              .attr("width", 120)
                              .attr("height", 40)
                              .attr('font-size',"20px")
                              this.flag = true;

                              this.svg1.append('text').text('Air:')
                              .attr("x", 150)
                              .attr("y", 55)
                              .attr("width", 120)
                              .attr("height", 40);


                              this.svg1.append('text').text('Population:')
                              .attr("x", 150)
                              .attr("y", 75)
                              .attr("width", 120)
                              .attr("height", 40);


                              this.svg1.append('text').text('Registered vehicles:')
                              .attr("x", 150)
                              .attr("y", 95)
                              .attr("width", 120)
                              .attr("height", 40);


                              this.svg1.append('text').text('Nbr. Industries:')
                              .attr("x", 150)
                              .attr("y", 115)
                              .attr("width", 120)
                              .attr("height", 40);

                              this.svg1.append('text').text('Commute time:')
                              .attr("x", 150)
                              .attr("y", 135)
                              .attr("width", 120)
                              .attr("height", 40);

            //SAN DIEGO

                              if (this.cityName==='San Diego'){


                                this.svg1.append('text').text('Good')
                                .attr("x", 180)
                                .attr("y", 55)
                                .attr("width", 120)
                                .attr("height", 40)
                                .attr('font-size',"30px");

                                this.svg1.append('text').text('1,410,000')
                                .attr("x", 230)
                                .attr("y", 75)
                                .attr("width", 120)
                                .attr("height", 40)
                                .attr('font-size',"20px");


                                this.svg1.append('text').text('2,240,181')
                                .attr("x", 298)
                                .attr("y", 95)
                                .attr("width", 120)
                                .attr("height", 40)
                                .attr('font-size',"20px");


                                this.svg1.append('text').text('150,000')
                                .attr("x", 265)
                                .attr("y", 115)
                                .attr("width", 120)
                                .attr("height", 40)
                                .attr('font-size',"20px");

                                this.svg1.append('text').text('22.2 min.')
                                .attr("x", 263)
                                .attr("y", 135)
                                .attr("width", 120)
                                .attr("height", 40)
                                .attr('font-size',"20px");

                                }
            //SAN FRANCISCO

                        if (this.cityName==='San Francisco'){


                          this.svg1.append('text').text('Bad')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg1.append('text').text('870,887')
                          .attr("x", 235)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('411,267')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('200,000')
                          .attr("x", 265)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg1.append('text').text('31.4 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //BAKERSFIELD

                        if (this.cityName==='Bakersfield'){


                          this.svg1.append('text').text('Fair')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg1.append('text').text('376,371')
                          .attr("x", 235)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('442,603')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('60,000')
                          .attr("x", 265)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg1.append('text').text(' 21.1 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //SACRAMENTO

                        if (this.cityName==='Sacramento'){


                          this.svg1.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg1.append('text').text('501,901')
                          .attr("x", 235)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('954,879')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('72,000')
                          .attr("x", 265)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg1.append('text').text(' 23.9 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }


            //LOS ANGELES

                        if (this.cityName==='Los Angeles'){


                          this.svg1.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg1.append('text').text('3,000,980')
                          .attr("x", 235)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('6,490,537')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('600,000')
                          .attr("x", 265)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg1.append('text').text('29.8 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //FRESNO

                        if (this.cityName==='Fresno'){


                          this.svg1.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg1.append('text').text('522,021')
                          .attr("x", 235)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('521,231')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('75,000')
                          .attr("x", 265)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg1.append('text').text('20.2 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //SAN JOSE

                        if (this.cityName==='San Jose'){


                          this.svg1.append('text').text('VERY BAD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg1.append('text').text('1,000,300')
                          .attr("x", 235)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('1,390,562')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('220,000')
                          .attr("x", 265)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg1.append('text').text('29.3 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }

            //EUREKA

                        if (this.cityName==='Eureka'){


                          this.svg1.append('text').text('VERY GOOD')
                          .attr("x", 180)
                          .attr("y", 55)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"30px");

                          this.svg1.append('text').text('27,177')
                          .attr("x", 235)
                          .attr("y", 75)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('20,000')
                          .attr("x", 298)
                          .attr("y", 95)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");


                          this.svg1.append('text').text('5,500')
                          .attr("x", 265)
                          .attr("y", 115)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");

                          this.svg1.append('text').text('11.6 min.')
                          .attr("x", 263)
                          .attr("y", 135)
                          .attr("width", 120)
                          .attr("height", 40)
                          .attr('font-size',"20px");
                        }






                            }

            //ENDS HERE

    }
}
