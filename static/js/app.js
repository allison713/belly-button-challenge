const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(importedData) {
  let data = importedData

  d3.select("body").append("div").attr("id","plot");

  //Start with a graph pre-loaded
  //**********CHANGE THIS GRAPH*******/
  function init() {
    data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16] }];
  
    Plotly.newPlot("plot", data);
  };

  console.log(data);

  //Add name IDs to the dropdown menu list
  for (let i=0;i<data.length;i++){
    let options = d3.select("#selDataset").append("option");
    options.attr("value",data.names[i]);
    options.text(`${data.names[i]}`);
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
  }
  init();
});