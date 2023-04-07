const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Add a space for the graphs on the webpage
d3.select("body").append("div").attr("id","bar_plot");
d3.select("body").append("div").attr("id","bubble_chart");

// Fetch the JSON data and add names to drop down list.
d3.json(url).then(function(importedData) {
  let data = importedData;

  //Start with a graph pre-loaded
  function init() {
    let names = data.samples[0].otu_ids.slice(0,11).map(id => `OTU ${id}`)
    let text = data.samples[0].otu_labels.slice(0,11).map(label => label)
    let trace = {
      x: data.samples[0].sample_values.slice(0,11),
      y: names,
      text: text,
      type: "bar",
      orientation: "h"
    };

    let traceData = [trace];

    let layout = {
      title: `Top 10 OTUs for ${data.samples[0].id}`,
    }

    Plotly.newPlot("bar_plot", traceData, layout);
  };

  //Start with a bubble graph pre-loaded
  function init2() {
    var otu_id = data.samples[0].otu_ids.map(x => x);
    var sample_values = data.samples[0].sample_values.map(y => y);
    var otu_label = data.samples[0].otu_labels.map(z => z);

    let trace = {
      x: otu_id,
      y: sample_values,
      mode: 'markers',
      text: otu_label,
      marker: {
        color: otu_id,
        colorscale: 'Portland',
        size: sample_values
      }
    };

    let traceData = [trace];

    let layout = {
      title: `OTUs by sample size for ${data.samples[0].id}`
    }

    Plotly.newPlot("bubble_chart", traceData, layout);
  };

  //Add name IDs to the dropdown menu list
  for (let i=0;i<data.names.length;i++){
    d3.select("#selDataset").append("option").property("value",data.names[i]).text(data.names[i]);
  };

  //Trigger to update the graph
  d3.selectAll("#selDataset").on("change", function() {
    updatePlotly();
    updatePlotly2();
  });

  //Function to change graph when dropdown is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let name = dropdownMenu.property("value");
    // Loop to find a match to the new dropdown value.
    for (let i=0;i<data.names.length;i++){
      if (data.samples[i].id == name) {
        var xChoice = data.samples[i].sample_values.slice(0,11);
        var yChoice = data.samples[i].otu_ids.slice(0,11).map(id => `OTU ${id}`);
        var textChoice = data.samples[i].otu_labels.slice(0,11).map(label => label);
        var title = data.samples[i].id;
      }
      //update the graph
      update = {
        x: xChoice,
        y: yChoice,
        text: textChoice,
        type: "bar",
        orientation: "h"
      };
    }

    let trace = [update];
    let layout = {
      title: `Top 10 OTUs for ${title}`,
    }
    //new graph
    Plotly.newPlot("bar_plot", trace, layout);
  };

  //Function to change graph when dropdown is selected
  function updatePlotly2() {
    // Use D3 to select the dropdown menu
    let dropdownMenu2 = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let name2 = dropdownMenu2.property("value");
    // Loop to find a match to the new dropdown value.
    for (let i=0;i<data.names.length;i++){
      if (data.samples[i].id == name2) {
        var xChoice2 = data.samples[i].otu_ids.map(x => x);
        var yChoice2 = data.samples[i].sample_values.map(y => y);
        var textChoice2 = data.samples[i].otu_labels.map(z => z);
        var title2 = data.samples[i].id;
      }
      //update the graph
      let update2 = {
        x: xChoice2,
        y: yChoice2,
        mode: 'markers',
        text: textChoice2,
        marker: {
          color: xChoice2,
          colorscale: 'Portland',
          size: yChoice2
        }
      };

    let trace2 = [update2];
    let layout2 = {
      title: `OTUs by sample size for ${title2}`
    }
    //new graph
    Plotly.newPlot("bubble_chart", trace2, layout2);
  }};

  init();
  init2();
});

