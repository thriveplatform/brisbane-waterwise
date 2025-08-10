import { BaseChart } from './BaseChart.js';
import { StackedAreaChart } from './StackedAreaChart.js';

function get_chart_instance(chart_type, data_object, annotations, key_arr, group, margin, chart_width, full_chart_width, chart_height, full_chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType){
  
  switch (chart_type){
    case 'A'://Area Chart
      let area_chart = new StackedAreaChart(data_object, annotations, key_arr, group, margin, chart_width, full_chart_width, chart_height, full_chart_height, color_arr, pos_x, pos_y, title, xlabel, ylabel, curveType);
      area_chart.remove_annotations();
      return area_chart;

    default:
      console.log('Unsupported chart type!!');
      
  }
}

export function redrawCharts(chart_width, chart_height, chart_container){

  console.log(chart_width, chart_height);
  //var FULL_CHART_WIDTH = 444;
  //var FULL_CHART_HEIGHT = 463;
  var FULL_CHART_WIDTH = 508;
  var FULL_CHART_HEIGHT = 405;

  d3.select(chart_container).selectAll("svg").remove();

  var margin = {left:50,right:25,top:50,bottom:0};

  var svg = d3.select(chart_container)
                .append("svg")
                  .attr("height", "100%")
                  .attr("width", "100%");

  const g = svg.append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

  //First chart
  // Number of articles: environment related and total
  const data1 = [
    {month: 'Aug-23', "Environmental": 3, "Others": 4},
    {month: 'Sep-23', "Environmental": 2, "Others": 14},
    {month: 'Oct-23', "Environmental": 1, "Others": 4},
    {month: 'Nov-23', "Environmental": 1, "Others": 4},
    {month: 'Dec-23', "Environmental": 4, "Others": 6},
    {month: 'Jan-24', "Environmental": 1, "Others": 11},
    {month: 'Feb-24', "Environmental": 0, "Others": 14},
    {month: 'Mar-24', "Environmental": 0, "Others": 18},
    {month: 'Apr-24', "Environmental": 8, "Others": 38},
    {month: 'May-24', "Environmental": 0, "Others": 14},
    {month: 'Jun-24', "Environmental": 10, "Others": 34},
    {month: 'Jul-24', "Environmental": 23, "Others": 58},
    {month: 'Aug-24', "Environmental": 1, "Others": 12}
  ];

  // Features of the annotation
  const annotations1 = [
      {
          note: {
              title: "          Coral damage in Tahiti",
              label: "AP News, 2023",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: chart_height,
          dy: -100,
          dx: 0,
          wrap: 140,
          month: "Dec-23",
          url: "https://apnews.com/article/olympics-paris-surfing-tahiti-coral-032662b649a34e3d12bf62c87e2ca727"
      },    
      {
          note: {
              //label: "The Associated Press",
              title: "Paris mayor to swim in Seine",
              label: "RTÉ, 2024",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: chart_height,
          dy: -250,
          dx: 0,
          wrap: 140,
          month: "Jul-24",
          url: "https://www.rte.ie/news/world/2024/0717/1460305-paris-mayor-seine/"
      }
  ];

  const color_arr1 = ["#369482", "#edebe3"];  //#369482:dark green , edebe3:cream
  const key_arr1 = ["Environmental", "Others"];
  let pos_x1 = 0;
  let pos_y1 = 0;
  let char_instance1 = get_chart_instance("A", data1, annotations1, key_arr1, g, margin, chart_width, FULL_CHART_WIDTH, chart_height, FULL_CHART_HEIGHT, color_arr1, pos_x1, pos_y1, "Environmental Focus in Articles Leading up to the Olympics", "Month", "Percentage(%) of Articles", d3.curveLinear);

  //Second chart
  // Number of articles: environment related and total
  const data2 = [
    {month: 'Aug-23', "Environmental - Aquatic": 3, "Environmental - Non-Aquatic": 3},
    {month: 'Sep-23', "Environmental - Aquatic": 0, "Environmental - Non-Aquatic": 2},
    {month: 'Oct-23', "Environmental - Aquatic": 1, "Environmental - Non-Aquatic": 1},
    {month: 'Nov-23', "Environmental - Aquatic": 1, "Environmental - Non-Aquatic": 1},
    {month: 'Dec-23', "Environmental - Aquatic": 3, "Environmental - Non-Aquatic": 4},
    {month: 'Jan-24', "Environmental - Aquatic": 1, "Environmental - Non-Aquatic": 1},
    {month: 'Feb-24', "Environmental - Aquatic": 0, "Environmental - Non-Aquatic": 0},
    {month: 'Mar-24', "Environmental - Aquatic": 0, "Environmental - Non-Aquatic": 0},
    {month: 'Apr-24', "Environmental - Aquatic": 6, "Environmental - Non-Aquatic": 8},
    {month: 'May-24', "Environmental - Aquatic": 0, "Environmental - Non-Aquatic": 0},
    {month: 'Jun-24', "Environmental - Aquatic": 6, "Environmental - Non-Aquatic": 10},
    {month: 'Jul-24', "Environmental - Aquatic": 17, "Environmental - Non-Aquatic": 23},
    {month: 'Aug-24', "Environmental - Aquatic": 1, "Environmental - Non-Aquatic": 1}
  ];

  // Features of the annotation
  const annotations2 = [
      {
          note: {
              title: "Tower construction in Tahiti paused",
              label: "CNN, 2023",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: chart_height,
          dy: -200,
          dx: 0,
          wrap: 120,
          month: "Dec-23",
          url: "https://www.cnn.com/2023/12/07/sport/olympic-tahiti-surf-environmental-damage-intl-spt/index.html"
      },
      {
          note: {
              title: "Illness and withdrawals ahead of triathlon",
              label: "RTÉ, 2024",
              titleClassName: "custom-title",
              labelClassName: "custom-label"
          },
          x: 0,
          y: chart_height,
          dy: -40,
          dx: 0,
          wrap: 120,
          month: "Aug-24",
          url: "https://www.rte.ie/sport/paris-2024/2024/0804/1463482-illness-and-withdrawals-ahead-of-mixed-relay-triathlon/"
      }
  ];

  const color_arr2 = ["#549ec4", "#8ce3b0"];// skyblue: #549ec4, lightgreen: #8ce3b0
  const key_arr2 = ["Environmental - Aquatic", "Environmental - Non-Aquatic"];
  
  let pos_x2 = chart_width + 190 * chart_width/FULL_CHART_WIDTH;
  let pos_y2 = 0;
  
  let char_instance2 = get_chart_instance("A", data2, annotations2, key_arr2, g, margin, chart_width, FULL_CHART_WIDTH, chart_height, FULL_CHART_HEIGHT, color_arr2, pos_x2, pos_y2, "Aquatic Focus in Environmental Articles Leading up to the Olympics", "Month", "Percentage(%) of Articles", d3.curveMonotoneX);
}