*Troubleshooting Log*

1. Created a loop to add names to the drop down menu. It wouldn't initialize, so I tested adding one name to check code.
One name was able to be added with no problems, so the issue was with my loop.

Fixed the problem by changing the length from data.length to data.names.length to specify that I want the loop to run until it runs out of names.


*Sources*
 - UTA class assignment 14-Interactive-Visualizations > 3 > Activities > 09-Ins_Dropdown_Events
Sourced to assist in editing drop down menus and triggering a change.

 - UTA class assignment 14-Interactive-Visualizations > 2 > Activities > 09-Stu_Top_Ten_Greek_Gods
Sourced to assist in creating horizontal bar charts.

 - Stack Overflow tip for running multiple functions at once. 
 https://stackoverflow.com/questions/24658374/calling-two-functions-on-same-click-event-with-d3-js

 - Plotly documentation for sizing.
 https://plotly.com/javascript/setting-graph-size/