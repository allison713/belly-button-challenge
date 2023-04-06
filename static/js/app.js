const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Add a space for the graph on the webpage
d3.select("body").append("div").attr("id","plot");

//Testing to see if I can add something to the dropdown menu
// d3.json(url).then(function(importedData){
//   let data = importedData
//   d3.select("#selDataset").append("option").property("value",data.names[1]).text(data.names[1]);
// })

// Fetch the JSON data and add names to drop down list.
d3.json(url).then(function(importedData) {
  let data = importedData;


  //*********Find a way to turn the y-values into a list so they plot next to each other* */
  //Start with a graph pre-loaded
  function init() {
    let trace = {
      x: data.samples[0].sample_values.slice(0,11),
      y: data.samples[0].otu_ids.slice(0,11).map(String),
      text: data.samples[0].otu_ids.slice(0,11).map(String),
      type: "bar",
      orientation: "h"
    };

    let traceData = [trace];

    let layout = {
      title: `OTU for ${data.samples[0].id}`,
    }

    Plotly.newPlot("plot", traceData, layout);
  };




  console.log(data);

  //Add name IDs to the dropdown menu list
  for (let i=0;i<data.names.length;i++){
    d3.select("#selDataset").append("option").property("value",data.names[i]).text(data.names[i]);
  };

  //Trigger to update the graph
  d3.selectAll("#selDataset").on("change", updatePlotly);

  //Function to change graph when dropdown is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    let name = dropdownMenu.property("value");

    if (name === 'dataset1') {
      x = [1, 2, 3, 4, 5];
      y = [1, 2, 4, 8, 16];
    }

    else if (name === 'dataset2') {
      x = [10, 20, 30, 40, 50];
      y = [1, 10, 100, 1000, 10000];
    }

    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  };
  init();
});

