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


    condition(average){
    if (average<15){
       return 'Very healthy'
    }
    if(average<20 && average>15){
       return 'Healthy'
    }
    if (average<50 && average>20){
      return 'Caution'
    }
    if (average<100 && average>50){
      return 'Unhealthy'
    }
    if (average<100 && average>50){
      return 'Very Unhealthy'
    }

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


		that.lines = gSVG.selectAll('g')
                        .data(this.CityData)
                        .enter()
                        .append('g');

                        //lines.exit().remove();

                        /*let newlines = lines
                        .enter()
                        .append('line');

                        lines=newlines.merge(lines);*/


                        this.div = d3.select("#waves").append("div")
                         .attr("class", "tooltip")
                         .style("opacity", 0);


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
            .on('mouseover', function(d){
                //d3.select(".recthum").style('fill', '#93C758');
                //this.div.html(d.Temperature_F + "<br/>"  + d.Humidity);
                //console.log(console.log(d.Temperature_F));
              })
                //console.log('jiji')})
            .on('mouseout', function(d) {
                    //d3.select(".recthum").style('fill', 'white');
                    //d3.select(this).style("cursor", "default")
                    //console.log('jojo');
                })
			.append("title")
            .text(d=>d.Temperature_F);

            //CODE FOR THE INFO BELOW CHART STARTS HERE
           //console.log(this.CityData);
           //this.CityData.map(function(d,i){console.log(d.PM2_5_CF_ATM_ug_m3,i)});
           /*.on('mouseover', function(d) {
               //d3.select(".recthum").style('fill', '#93C758');
               //d3.select(this).style("cursor", "pointer");
               console.log('jiji');
           })*/


         //this.condition(89);




         //CODE FOR THE INFO BELOW CHART STARTS HERE
        //console.log(this.CityData);
        //this.CityData.map(function(d,i){console.log(d.PM2_5_CF_ATM_ug_m3,i)});



      //this.condition(89);




                     if (this.flag===true){

                     this.svg2.selectAll('text').remove();

                     this.svg2.append('text').text(this.cityName)
                     .attr("x", 150)
                     .attr("y", 25)
                     .attr("width", 120)
                     .attr("height", 40)
                     .attr('font-size',"30px")
                     .style("fill", color)
                     .style('fontWeight', 'bold');

                     this.svg2.append('text').text('Air:')
                     .attr("x", 150)
                     .attr("y", 55)
                     .attr("width", 120)
                     .attr("height", 40);
                     //.style("fill", color);




                     this.svg2.append('text').text('Population:')
                     .attr("x", 150)
                     .attr("y", 75)
                     .attr("width", 120)
                     .attr("height", 40);
                     //.style("fill", color);


                     this.svg2.append('text').text('Registered vehicles:')
                     .attr("x", 150)
                     .attr("y", 95)
                     .attr("width", 120)
                     .attr("height", 40);
                     //.style("fill", color);


                     this.svg2.append('text').text('Nbr. Industries:')
                     .attr("x", 150)
                     .attr("y", 115)
                     .attr("width", 120)
                     .attr("height", 40);
                     //.style("fill", color);

                     this.svg2.append('text').text('Commute time:')
                     .attr("x", 150)
                     .attr("y", 135)
                     .attr("width", 120)
                     .attr("height", 40);
                     //.style("fill", color);


         //CITIES INFORMATION

         //SAN DIEGO


                     if (this.cityName==='San Diego'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);

                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                     if (this.cityName==='San Francisco'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                     if (this.cityName==='Bakersfield'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                     if (this.cityName==='Sacramento'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                     if (this.cityName==='Los Angeles'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                     if (this.cityName==='Fresno'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                     if (this.cityName==='San Jose'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                     if (this.cityName==='Eureka'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg2.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

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

                          if (this.flag===false){
                           this.svg1.append('text').text(this.cityName)
                           .attr("x", 150)
                           .attr("y", 25)
                           .attr("width", 120)
                           .attr("height", 40)
                           .attr('font-size',"30px")
                           .style("fill", color)
                           this.flag = true;

                           this.svg1.append('text').text('Air:')
                           .attr("x", 150)
                           .attr("y", 55)
                           .attr("width", 120)
                           .attr("height", 40);
                           //.style("fill", color);


                           this.svg1.append('text').text('Population:')
                           .attr("x", 150)
                           .attr("y", 75)
                           .attr("width", 120)
                           .attr("height", 40);
                           //.style("fill", color);


                           this.svg1.append('text').text('Registered vehicles:')
                           .attr("x", 150)
                           .attr("y", 95)
                           .attr("width", 120)
                           .attr("height", 40);
                           //.style("fill", color);


                           this.svg1.append('text').text('Nbr. Industries:')
                           .attr("x", 150)
                           .attr("y", 115)
                           .attr("width", 120)
                           .attr("height", 40);
                           //.style("fill", color);

                           this.svg1.append('text').text('Commute time:')
                           .attr("x", 150)
                           .attr("y", 135)
                           .attr("width", 120)
                           .attr("height", 40);
                           //.style("fill", color);

         //SAN DIEGO

                           if (this.cityName==='San Diego'){

                             var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                             console.log(totalSum/745);


                             this.svg1.append('text').text(this.condition(totalSum/745))
                             .attr("x", 180)
                             .attr("y", 55)
                             .attr("width", 120)
                             .attr("height", 40)
                             .attr('font-size',"30px")
                             .style("fill", color);

                             this.svg1.append('text').text('1,410,000')
                             .attr("x", 230)
                             .attr("y", 75)
                             .attr("width", 120)
                             .attr("height", 40)
                             .attr('font-size',"20px")
                             .style("fill", color);


                             this.svg1.append('text').text('2,240,181')
                             .attr("x", 298)
                             .attr("y", 95)
                             .attr("width", 120)
                             .attr("height", 40)
                             .attr('font-size',"20px")
                             .style("fill", color);


                             this.svg1.append('text').text('150,000')
                             .attr("x", 265)
                             .attr("y", 115)
                             .attr("width", 120)
                             .attr("height", 40)
                             .attr('font-size',"20px")
                             .style("fill", color);

                             this.svg1.append('text').text('22.2 min.')
                             .attr("x", 263)
                             .attr("y", 135)
                             .attr("width", 120)
                             .attr("height", 40)
                             .attr('font-size',"20px")
                             .style("fill", color);

                             }
         //SAN FRANCISCO

                     if (this.cityName==='San Francisco'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg1.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px")
                       .style("fill", color);

                       this.svg1.append('text').text('870,887')
                       .attr("x", 235)
                       .attr("y", 75)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px");
                       //.style("fill", color);


                       this.svg1.append('text').text('411,267')
                       .attr("x", 298)
                       .attr("y", 95)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('200,000')
                       .attr("x", 265)
                       .attr("y", 115)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);

                       this.svg1.append('text').text('31.4 min.')
                       .attr("x", 263)
                       .attr("y", 135)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);
                     }

         //BAKERSFIELD

                     if (this.cityName==='Bakersfield'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg1.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

                       this.svg1.append('text').text('376,371')
                       .attr("x", 235)
                       .attr("y", 75)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('442,603')
                       .attr("x", 298)
                       .attr("y", 95)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('60,000')
                       .attr("x", 265)
                       .attr("y", 115)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);

                       this.svg1.append('text').text(' 21.1 min.')
                       .attr("x", 263)
                       .attr("y", 135)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);
                     }

         //SACRAMENTO

                     if (this.cityName==='Sacramento'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg1.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

                       this.svg1.append('text').text('501,901')
                       .attr("x", 235)
                       .attr("y", 75)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('954,879')
                       .attr("x", 298)
                       .attr("y", 95)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('72,000')
                       .attr("x", 265)
                       .attr("y", 115)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);

                       this.svg1.append('text').text(' 23.9 min.')
                       .attr("x", 263)
                       .attr("y", 135)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);
                     }


         //LOS ANGELES

                     if (this.cityName==='Los Angeles'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg1.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

                       this.svg1.append('text').text('3,000,980')
                       .attr("x", 235)
                       .attr("y", 75)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('6,490,537')
                       .attr("x", 298)
                       .attr("y", 95)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('600,000')
                       .attr("x", 265)
                       .attr("y", 115)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);

                       this.svg1.append('text').text('29.8 min.')
                       .attr("x", 263)
                       .attr("y", 135)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);
                     }

         //FRESNO

                     if (this.cityName==='Fresno'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg1.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

                       this.svg1.append('text').text('522,021')
                       .attr("x", 235)
                       .attr("y", 75)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('521,231')
                       .attr("x", 298)
                       .attr("y", 95)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('75,000')
                       .attr("x", 265)
                       .attr("y", 115)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);

                       this.svg1.append('text').text('20.2 min.')
                       .attr("x", 263)
                       .attr("y", 135)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);
                     }

         //SAN JOSE

                     if (this.cityName==='San Jose'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg1.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

                       this.svg1.append('text').text('1,000,300')
                       .attr("x", 235)
                       .attr("y", 75)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('1,390,562')
                       .attr("x", 298)
                       .attr("y", 95)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('220,000')
                       .attr("x", 265)
                       .attr("y", 115)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);

                       this.svg1.append('text').text('29.3 min.')
                       .attr("x", 263)
                       .attr("y", 135)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);
                     }

         //EUREKA

                     if (this.cityName==='Eureka'){

                       var totalSum = d3.sum(this.CityData.map(function(d){return d.PM2_5_CF_ATM_ug_m3}));
                       console.log(totalSum/745);


                       this.svg1.append('text').text(this.condition(totalSum/745))
                       .attr("x", 180)
                       .attr("y", 55)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"30px");
                       //.style("fill", color);

                       this.svg1.append('text').text('27,177')
                       .attr("x", 235)
                       .attr("y", 75)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('20,000')
                       .attr("x", 298)
                       .attr("y", 95)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);


                       this.svg1.append('text').text('5,500')
                       .attr("x", 265)
                       .attr("y", 115)
                       .attr("width", 120)
                       .attr("height", 40)
                       .attr('font-size',"20px")
                       .style("fill", color);

                       this.svg1.append('text').text('11.6 min.')
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
}
