import { BaseChart } from './BaseChart.js';

export class StackedAreaChart extends BaseChart {

    constructor(data_object, annotations, key_arr, chart_type, group, margin, chart_width, chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType){
        super(data_object, annotations, key_arr, chart_type, group, margin, chart_width, chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType);

    }

    draw_chart_visual(){

        this.y = d3.scaleLinear()
                        //.domain([0, d3.max(data, d => d.total)]).nice()
                        .domain([0, 100]).nice()
                        .range([this.chart_height, 0]);

        const area = d3.area()
                        .x((d, i) => this.x(this.data_object[i].month))
                        .y0(d => this.y(d[0]))
                        .y1(d => this.y(d[1]))
                        .curve(this.curveType);

        const layers = this.g.selectAll("path")
                            .data(this.stackedData)
                            .join("path")
                            .attr("fill", d => this.color(d.key))
                            .attr("d", d => area(d.slice(0, 1))); // Start with only first point
        
        //Adding the x-axis and its label
        this.xAxisGroup = this.g.append("g")
                            .attr("transform", `translate(30,${this.chart_height})`)
                            .call(d3.axisBottom(this.x));
        this.xAxisGroup.selectAll("text")
                            .attr("font-family", "Glacial Indifference")
                            .attr("transform", "translate(0,10) rotate(-45)");

        this.g.append("text")
                .attr("x", this.chart_width/2)
                .attr("y", this.chart_height+55)
                .attr("text-anchor", "middle")
                .attr("font-family", "Glacial Indifference")
                .text("Month");
        
        //Adding the y-axis and its label.
        this.yAxisGroup = this.g.append("g")
                .attr("transform", `translate(30,0)`)
                .call(d3.axisLeft(this.y));
        this.yAxisGroup.selectAll("text")
                .attr("font-family", "Glacial Indifference");
                
        this.g.append("text")
            .attr("x", -this.chart_height/2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("font-family", "Glacial Indifference")
            .text("Percentage (%) of Articles");
        
        //Adding the chart title
        this.g.append("text")
            .attr("x", this.chart_width/2+30)
            .attr("y", -10)
            .attr("font-size", 20)
            .attr("text-anchor", "middle")
            .attr("font-family", "Bebas Neue")
            .text(this.title);
        
        let i = 1;
        
        const animate = () => {

            let trans_dur = 0;
            let dur = 0;

            if (i > this.data_object.length){ 
                //i = 0;
                return;
            }
            
            layers.data(this.stackedData)
                .attr("transform", "translate(30, 0)")
                .transition(0)
                .duration(1000)
                .attr("d", d => area(d.slice(0, i)))
                .on("end", () => {
                                    if (i <= this.data_object.length){

                                        let month_text = this.data_object[i-1]['month'];
                                        let data_val = this.stackedData[0][i-1][1];
                                        
                                        let label_hor_offset = 0;
                                        if (month_text == "Jul-24"){
                                            label_hor_offset = 15;
                                        }
                                        else if (month_text == "Aug-23"){
                                            label_hor_offset = 45;

                                        }
                                        else{
                                            label_hor_offset = 39;
                                        }

                                        let label_vertical_offset = 15;
                                        if (data_val == 0){
                                            label_vertical_offset = -5;
                                        }

                                        this.g.append("text")
                                            .attr("x", this.x(month_text)+label_hor_offset)
                                            .attr("y", this.y(data_val)+label_vertical_offset)
                                            .attr("font-size", 10)
                                            .attr("text-anchor", "middle")
                                            .attr("font-family", "Bebas Neue")
                                            .text(data_val + "%");
                                        
                                        this.annotations.forEach(annotation => {
                                            
                                            if (annotation.month == month_text){

                                                annotation.x = this.x(month_text)+25;
                                                
                                                if (data_val == 0){
                                                    annotation.y = this.y(data_val);
                                                }else{
                                                    annotation.y = this.y(data_val-10);
                                                }

                                                annotation.dx = -1;
                                                annotation.dy = 0;

                                                const makeAnnotations = d3.annotation()
                                                                            .annotations([annotation]);

                                                this.g.append("g")
                                                        .call(makeAnnotations)
                                                        .selectAll(".annotation")
                                                        .data([annotation]) //bind full annotation objects
                                                        .style("cursor", "pointer")
                                                        .on("click", function(event, d) {
                                                            if (d.url) {
                                                            window.open(d.url, "_blank");
                                                            }
                                                        });
                                                
                                                d3.selectAll(".annotation-note-title")
                                                    .style("font-family", "Glacial Indifference")
                                                    .style("fill", "black")
                                                    .style("font-style", "italic")
                                                    .style("font-size", "15");
                                                
                                                d3.selectAll(".annotation-note-label")
                                                    .style("font-family", "Glacial Indifference")
                                                    .style("fill", "black")
                                                    .style("font-size", "10");

                                                // Horizontal line under the note (title/label)
                                                d3.selectAll(".annotation-note path")
                                                    .style("stroke", "black")
                                                    .style("stroke-width", "1px");
                                                
                                                d3.selectAll(".annotation-connector path")
                                                    .style("stroke", "black")      // Change the line color
                                                    .style("stroke-width", "1px"); // Optional: make the line thicker
                                            }
                                        });
                                    }
                                    animate();
                                    i++;
                                    
                                }); // call animate again after transition completes            
        }

        animate();  

        this.add_legend();
                    
    }

    add_legend(){
        // Position it beside the chart
        const legend = this.g.append("g")
                            //.attr("class", "legend")
                            .attr("transform", `translate(${this.chart_width + 40}, 20)`);

        //Legend item height and spacing
        const legendSpacing = - 20;

        this.key_arr.forEach((d, i) => {

            const legendRow = legend.append("g")
                                    .attr("transform", `translate(0, ${i * legendSpacing})`);

            // Colored rectangle
            legendRow.append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", this.color(d));

            // Text label
            legendRow.append("text")
                .attr("x", 20)
                .attr("y", 12)
                .attr("font-size", 12)
                .text(d);
        });
    }
}
