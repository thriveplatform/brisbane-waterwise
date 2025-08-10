import { BaseChart } from './BaseChart.js';

export class StackedAreaChart extends BaseChart {

    constructor(data_object, annotations, key_arr, chart_type, group, margin, chart_width, full_chart_width, chart_height, full_chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType){
        super(data_object, annotations, key_arr, chart_type, group, margin, chart_width, full_chart_width, chart_height, full_chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType);

    }

    draw_chart_visual(){

        var scale_height = (this.chart_height - 20) * this.chart_height/this.full_chart_height;
        this.y = d3.scaleLinear()
                        .domain([0, 100]).nice()
                        .range([scale_height, 0]);

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
                            //.attr("transform", `translate(30,${this.chart_height})`)
                            .attr("transform", `translate(30,${scale_height})`)
                            .call(d3.axisBottom(this.x));

        let x_ticker_size = 14;
        let x_ticker_size1 = (this.chart_width/this.full_chart_width) * 14;
        let x_ticker_size2 = scale_height/this.chart_height * 14;//Math.pow(scale_height/this.chart_height, 0.5) * 14;
        if (x_ticker_size1 < x_ticker_size2){
            x_ticker_size = x_ticker_size1;
        }
        else{
            x_ticker_size = x_ticker_size2;
        }
        this.xAxisGroup.selectAll("text")
                            .attr("font-size", x_ticker_size)
                            .attr("font-family", "Glacial Indifference")
                            .attr("transform", "translate(0,10) rotate(-45)");

        //let x_axis_label_size = (this.chart_width/this.full_chart_width) * 16;
        let x_axis_label_size = 16;
        let x_axis_label_size1 = (this.chart_width/this.full_chart_width) * 16;
        let x_axis_label_size2 = Math.pow(scale_height/this.chart_height, 0.5) * 16;
        if (x_axis_label_size1 < x_axis_label_size2){
            x_axis_label_size = x_axis_label_size1;
        }
        else{
            x_axis_label_size = x_axis_label_size2;
        }
        /*this.g.append("text")
                .attr("x", this.chart_width/2)
                .attr("y", (scale_height+60*scale_height/this.chart_height))
                .attr("text-anchor", "middle")
                .attr("font-family", "Glacial Indifference")
                .attr("font-size", x_axis_label_size)
                .text("Month");*/
        
        //Adding the y-axis and its label.
        this.yAxisGroup = this.g.append("g")
                .attr("transform", `translate(30,0)`)
                .call(d3.axisLeft(this.y));
        let y_ticker_size = 14;
        //let y_ticker_size1 = (this.chart_height/this.full_chart_height) * 14;
        let y_ticker_size1 = this.chart_width/this.full_chart_width * 14;
        let y_ticker_size2 = Math.pow((scale_height/this.chart_height), 0.5) * 14;
        if (y_ticker_size1 < y_ticker_size2){
            y_ticker_size = y_ticker_size1;
        }
        else{
            y_ticker_size = y_ticker_size2;
        }

        this.yAxisGroup.selectAll("text")
                .attr("font-size", y_ticker_size)
                .attr("font-family", "Glacial Indifference");
        
        let y_axis_label_size = 16;
        let y_axis_label_size1 = (scale_height/this.chart_height) * 16;
        let y_axis_label_size2 = Math.pow(this.chart_width/this.full_chart_width, 0.5) * 16;
        if (y_axis_label_size1 < y_axis_label_size2){
            y_axis_label_size = y_axis_label_size1;
        }
        else{
            y_axis_label_size = y_axis_label_size2;
        }
        this.g.append("text")
            //.attr("x", -this.chart_height/2)
            .attr("x", -scale_height/2)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("font-size", y_axis_label_size)
            .attr("font-family", "Glacial Indifference")
            .text("Percentage (%) of Articles");
        
        //Adding the chart title
        let chart_title_size = 20;
        let chart_title_size1 = (this.chart_width/this.full_chart_width) * 20;
        let chart_title_size2 = Math.pow(scale_height/this.chart_height, 0.5) * 20;
        if (chart_title_size1 < chart_title_size2){
            chart_title_size = chart_title_size1;
        }
        else{
            chart_title_size = chart_title_size2;
        }
        this.g.append("text")
            .attr("x", this.chart_width/2+30)
            .attr("y", -10)
            .attr("font-size", chart_title_size)
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
                                        if (month_text == "Aug-24"){
                                            label_hor_offset = 15;
                                        }
                                        else if (month_text == "Aug-23"){
                                            label_hor_offset = 45;

                                        }
                                        else{
                                            label_hor_offset = 39;
                                        }
                                        label_hor_offset = label_hor_offset * (this.chart_width/this.full_chart_width);

                                        let label_vertical_offset = 15;
                                        if (data_val == 0){
                                            label_vertical_offset = -5;
                                        }
                                        //Special override to avoid overlapping issue.
                                        if (i == 1 && data_val == 75){
                                            label_vertical_offset = 100;
                                        }
                                        if (i == 9 && data_val == 75){
                                            label_vertical_offset = 100;
                                        }
                                        if (i == 12 && data_val == 73){
                                            label_vertical_offset = 40;
                                        }
                                        label_vertical_offset = label_vertical_offset * (scale_height/this.chart_height);
                                        
                                        let label_font_size = 16;
                                        let label_font_size1 = (this.chart_width/this.full_chart_width) * 16;
                                        let label_font_size2 = (this.chart_height/this.full_chart_height) * 16;
                                        if (label_font_size1 < label_font_size2){
                                            label_font_size = label_font_size1;
                                            
                                        }
                                        else{
                                            label_font_size = label_font_size2;
                                        }
                                        this.g.append("text")
                                            .attr("x", this.x(month_text) + label_hor_offset)
                                            .attr("y", this.y(data_val) + label_vertical_offset)
                                            .attr("font-size", label_font_size)
                                            .attr("text-anchor", "middle")
                                            .attr("fill", "#08386b")
                                            .attr("font-family", "Bebas Neue")
                                            .text(data_val + "%");

                                        this.annotations.forEach(annotation => {
                                            
                                            if (annotation.month == month_text){

                                                annotation.x = this.x(month_text) + 30;// * this.chart_width/this.full_chart_width;// + 25 * this.chart_width/this.full_chart_width;
                                                
                                                annotation.y = this.y(0);
                                                
                                                if ((month_text == 'Jul-24') || (month_text == 'Aug-24')){
                                                    annotation.dx = -1;
                                                }
                                                else{
                                                    if (this.chart_width < 345){
                                                        annotation.dx = +1;
                                                    }
                                                    else{
                                                        annotation.dx = -1;
                                                    }
                                                }
                                                
                                                //annotation.dy = this.y(annotation.dy*this.chart_height/this.full_chart_height) - annotation.y;//-60 * this.chart_height/this.full_chart_height;
                                                //annotation.dy = annotation.dy * this.chart_height/this.full_chart_height;
                                                //annotation.dy = annotation.dy * Math.pow(this.chart_height/this.full_chart_height, 3);
                                                annotation.dy = annotation.dy * Math.pow(this.chart_height/this.full_chart_height, 3);
                                                
                                                let title_size = 15;
                                                let title_size1 = (this.chart_width/this.full_chart_width)*15;
                                                //let title_size2 = (this.chart_height/this.full_chart_height)*15;
                                                let title_size2 = (scale_height/this.chart_height)*15;
                                                
                                                if (title_size1 < title_size2){
                                                    title_size = title_size1;
                                                }
                                                else{
                                                    title_size = title_size2;
                                                }

                                                annotation.note = {
                                                    ...annotation.note,
                                                    titleFontSize: title_size
                                                };
                                                
                                                const makeAnnotations = d3.annotation()
                                                                            .annotations([annotation]);

                                                this.g.append("g")
                                                        .call(makeAnnotations)
                                                        .selectAll(".annotation")
                                                        .data([annotation])
                                                        .style("cursor", "pointer")
                                                        .on("click", function(event, d) {
                                                            if (d.url) {
                                                            window.open(d.url, "_blank");
                                                            }
                                                        });
                                                
                                                d3.selectAll(".annotation-note-title")
                                                    .style("font-size", title_size)
                                                    .style("font-family", "Glacial Indifference")
                                                    .style("fill", "black")
                                                    .style("opacity", "1")
                                                    .style("font-style", "italic");
                                                
                                                d3.selectAll(".annotation-note-label")
                                                    .style("font-size", title_size)
                                                    .style("font-family", "Glacial Indifference")
                                                    .style("fill", "black")
                                                    .style("opacity", "1")
                                                    .style("font-style", "normal");
                                                
                                                // Horizontal line under the note (title/label)
                                                d3.selectAll(".annotation-note path")
                                                    .style("stroke", "black")
                                                    .style("stroke-width", "1px");
                                                
                                                d3.select("svg").append("defs").append("marker")
                                                    .attr("id", "arrowhead")
                                                    .attr("viewBox", "0 -5 10 10")
                                                    .attr("refX", 10) // Adjust based on your line length/placement
                                                    .attr("refY", 0)
                                                    .attr("markerWidth", 6)
                                                    .attr("markerHeight", 6)
                                                    .attr("orient", "90")
                                                    .append("path")
                                                    .attr("d", "M0,-5L10,0L0,5") // Triangle shape
                                                    //.attr("d", "M100,100 L100,300") // Triangle shape
                                                    .attr("fill", "black");
                                                
                                                d3.selectAll(".annotation-connector path")
                                                    .style("stroke", "black")      // Change the line color
                                                    .style("stroke-width", "1px") // Optional: make the line thicker
                                                    .attr("marker-start", "url(#arrowhead)");
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
                            .attr("transform", `translate(${this.chart_width + 40 * this.chart_width/this.full_chart_width}, 30)`);

        //Legend item height and spacing
        const legendSpacing = - 30;

        this.key_arr.forEach((d, i) => {

            const legendRow = legend.append("g")
                                    .attr("transform", `translate(0, ${i * legendSpacing})`);
            
            let rect_width = (this.chart_width/this.full_chart_width)*15;
            let rect_height = (this.chart_height/this.full_chart_height)*15;

            // Colored rectangle
            legendRow.append("rect")
                .attr("width", rect_width)
                .attr("height", rect_height)
                .attr("fill", this.color(d));

            // Text label
            let legend_font_size = 15;
            let legend_font_size1 = (this.chart_width/this.full_chart_width)*15;
            let legend_font_size2 = (this.chart_height/this.full_chart_height)*15;
            if (legend_font_size1 < legend_font_size2){
                legend_font_size = legend_font_size1;
            }
            else{
                legend_font_size = legend_font_size2;
            }

            legendRow.append("text")
                .attr("x", 20*this.chart_width/this.full_chart_width)
                .attr("y", 12*this.chart_height/this.full_chart_height)
                .attr("font-size", legend_font_size)
                .attr("font-family", "Glacial Indifference")
                .text(d);
        });
    }
}
