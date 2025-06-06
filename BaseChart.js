export class BaseChart {

    constructor(data_object, key_arr, group, margin, chart_width, chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType){
        
        this.data_object = data_object;
        this.key_arr = key_arr;
        this.margin = margin;
        this.chart_width = chart_width;
        this.chart_height = chart_height;
        this.color_arr = color_arr;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.title = title;
        this.xlabel = xlabel;
        this.ylabel = ylabel;
        this.curveType = curveType;

        //Create a group
        this.g = group.append("g")
                        .attr("transform", `translate(${pos_x},${pos_y})`);

        //Function to stack the data properly for an area chart.
        this.stack = d3.stack()
                        .keys(key_arr)
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetNone);
        
        this.stackedData = this.stack(
                    this.data_object.map(d => {
                        const denominator = d[key_arr[1]];
                        const numerator = d[key_arr[0]];
                        let val1 = 0, val2 = 0;

                        if (denominator > 0) {
                            val1 = Math.round((numerator / denominator) * 100);
                            val2 = 100 - val1;
                        }

                        return {
                            month: d.month,
                            [key_arr[0]]: val1,
                            [key_arr[1]]: val2
                        };
                    })
                );

        //Preparing the x-axis scale.
        this.months = this.data_object.map(d => d.month);
        this.x = d3.scalePoint()
                        .domain(this.months)
                        .range([0, chart_width]);
        
        //Setting the colours.
        this.color = d3.scaleOrdinal()
                        .domain(key_arr)
                        .range(color_arr);

        this.draw_chart_visual();
    }

    draw_chart_visual(){
        

    }
}