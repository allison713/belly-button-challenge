*Troubleshooting Log*

1. Created a loop to add names to the drop down menu. It wouldn't initialize, so I tested adding one name to check code.
One name was able to be added with no problems, so the issue was with my loop.

Fixed the problem by changing the length from data.length to data.names.length to specify that I want the loop to run until it runs out of names.
