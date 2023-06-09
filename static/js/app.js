const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and add names to drop down list.
d3.json(url).then(function(importedData) {
  let data = importedData;

  //Start with a graph pre-loaded
  function init() {
    var table = d3.select("#sample-metadata").append("table");
    var tbody = table.append("tbody");
    tbody.append("tr").text(`id: ${data.metadata[0].id}`).attr("id","table-row-1");
    tbody.append("tr").text(`ethnicity: ${data.metadata[0].ethnicity}`).attr("id","table-row-2");
    tbody.append("tr").text(`gender: ${data.metadata[0].gender}`).attr("id","table-row-3");
    tbody.append("tr").text(`age: ${data.metadata[0].age}`).attr("id","table-row-4");
    tbody.append("tr").text(`location: ${data.metadata[0].location}`).attr("id","table-row-5");
    tbody.append("tr").text(`bbtype: ${data.metadata[0].bbtype}`).attr("id","table-row-6");
    tbody.append("tr").text(`wfreq: ${data.metadata[0].wfreq}`).attr("id","table-row-7");
    
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
      autosize: false,
      width: 1100,
      height: 450
    }

    Plotly.newPlot("bar", traceData, layout);
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
      title: `OTUs by sample size for ${data.samples[0].id}`,
      autosize: false,
      width: 1250,
      height: 500
    }

    Plotly.newPlot("bubble", traceData, layout);
  };

  //Add name IDs to the dropdown menu list
  for (let i=0;i<data.names.length;i++){
    d3.select("#selDataset").append("option").property("value",data.names[i]).text(data.names[i]);
  };

  //Trigger to update the graph
  d3.selectAll("#selDataset").on("change", function() {
    updatedemo();
    updatePlotly();
    updatePlotly2();
  });

  //Function to update demographic information when dropdown is selected
  function updatedemo() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let name = dropdownMenu.property("value");
    // Loop to find a match to the new dropdown value.
    for (let i=0;i<data.names.length;i++){
      if (data.samples[i].id == name) {
        d3.select("#table-row-1").text(`id: ${data.metadata[i].id}`);
        d3.select("#table-row-2").text(`ethnicity: ${data.metadata[i].ethnicity}`);
        d3.select("#table-row-3").text(`gender: ${data.metadata[i].gender}`);
        d3.select("#table-row-4").text(`age: ${data.metadata[i].age}`);
        d3.select("#table-row-5").text(`location: ${data.metadata[i].location}`);
        d3.select("#table-row-6").text(`bbtype: ${data.metadata[i].bbtype}`);
        d3.select("#table-row-7").text(`wfreq: ${data.metadata[i].wfreq}`);
    }}};

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
      autosize: false,
      width: 1100,
      height: 450
    }
    //new graph
    Plotly.newPlot("bar", trace, layout);
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
      title: `OTUs by sample size for ${title2}`,
      autosize: false,
      width: 1250,
      height: 500
    }
    //new graph
    Plotly.newPlot("bubble", trace2, layout2);
  }};

  init();
  init2();
});

