# group_project_3
Group Project #3

Required data clean up:
Source File: HealthInsuranceCoverage.geojson
jq --compact-output ".features" HealthInsuranceCoverage.geojson > Health.geojson
Output File: Health.geojson

This allows it to be imported into MongoDB

Command line:
mongoimport --db detroit_insurance --collection health_ins --file "static/data/Health.geojson" --jsonArray

Then run the mongo.py to initate the flask local web environment.


We need to explain our data source.

We need to explain our story of what we're using the data for.

We need to detail each file used in the readme as well.





Technical Requirements for Project 3

Data and Delivery (25 points)
Data components used in the project are clearly documented. (5 points)  
NOT YET - PENDING

The dataset contains at least 100 unique records. (5 points)  
YES - 177 

A database is used to house the data (SQL, MongoDB, SQLite, etc.). (5 points)  
YES - MongoDB

The project is powered by a Python Flask API and includes HTML/CSS, JavaScript, and the chosen database. (10 points)  
YES - /api/data/ to confirm the json data  
/ to run the index.html of our 5 visualizations.

Back End (25 points)  
The page created to showcase data visualizations runs without error. (7.5 points)  
YES

A JavaScript library not shown in class is used in the project. (7.5 points)  
YES - Chart.js 

The project conforms to one of the following designs: (10 points)  
YES - A dashboard page with multiple charts that all reference the same data

Visualizations (25 points)  
A minimum of three unique views present the data. (5 points)  
YES - 5 total - 3 unique

Multiple user-driven interactions (such as dropdowns, filters, or a zoom feature) are included on the final page. (5 points)  
YES - Clickable, zoom, and mouse hover.

The final page displays visualizations in a clear, digestible manner. (5 points)  
YES - Easy to read and soft colors as well

The data story is easy to interpret for users of all levels. (10 points)  
YES - Compares the availability of health insurance per zip code in the city of detroit.  Also includes the bonus view of Adults vs Children

Group Presentation (25 points)  
All group members speak during the presentation. (5 points)  


The content is relevant to the project. (5 points)  


The presentation maintains audience interest. (5 points)  


Content, transitions, and conclusions flow smoothly within any time restrictions. (10 points)  

