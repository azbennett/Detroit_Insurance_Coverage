# Detroit Health Insurance Coverage
## Data Source
- Source File: `HealthInsuranceCoverage.geojson`
- Clean Data File: `Health.geojson`
- Website: [Live Version](https://azbennett.github.io/group_project_3/live/)
The data is available in GeoJSON format, which was cleaned up using the `jq` command-line tool and then imported into MongoDB using `mongoimport` command. The dataset contains 177 unique records and is stored in the `detroit_insurance` database under the collection `health_ins`.
## Project Overview
This project utilizes health insurance coverage data for Detroit to create interactive visualizations and a data story. The data visualizations are presented through a Python Flask API, and the front-end includes HTML, CSS, and JavaScript using Chart.js library.
## Visualizations
The project includes five visualizations comparing the availability of health insurance per zip code in Detroit. The visualizations are designed to be easy to read and use soft colors for better understanding. User-driven interactions, such as dropdowns, filters, zoom, and mouse hover, allow users to explore the data further.
## Data Story
The data story presented in the project focuses on analyzing health insurance coverage in Detroit and highlights the differences in coverage across various zip codes. Additionally, a bonus view compares insurance coverage between adults and children, providing valuable insights into healthcare accessibility in the city.
## Data Cleaning Process
The data was processed using the following steps:
- The GeoJSON file was cleaned up using the `jq` command-line tool to prepare it for MongoDB import.
- To get the City and County names from a GeoID10, the first 2 characters were dropped to result in a zip code. This information was cross-referenced with the `usa_zipcode_of_mi-1539j.csv` dataset to obtain the city name and county name for use in the Leaflet map popup details.
## Instructions
To run the project locally, follow these steps:
1. Use the cleaned data file (Health.geojson) to import it into MongoDB. `jq --compact-output ".features" HealthInsuranceCoverage.geojson > Health.geojson`
2. Command line: `mongoimport --db detroit_insurance --collection health_ins --file "static/data/Health.geojson" --jsonArray`
3. Run the Flask app using the `mongo.py` script.
4. Navigate your browser to [http://127.0.0.1:5000](http://127.0.0.1:5000).
Alternatively, you can explore the live version of the project [https://azbennett.github.io/group_project_3/live/](https://azbennett.github.io/group_project_3/live/).
## Why do we have two versions? 
- You will notice we have the main mongoDB / Flask version running in our root folder. 
- But in addition to that we have a 'live' version running off the original geojson data. 
- We did this so our data will always run on a github pages front and so that our classmates can view the data from home without needing to create a mongoDB of their own.
- There was minor code changes to make each one run but overall the code is the same.
## Technical Requirements
- Data components are documented.
- The dataset contains 177 unique records.
- MongoDB is used to house the data.
- The project is powered by a Python Flask API, HTML/CSS, JavaScript, and Chart.js library.
- The project conforms to the design of a dashboard page with multiple charts referencing the same data.
## Group Presentation
The group presentation covers all aspects of the project, with each member contributing their part. The content is relevant, engaging, and flows smoothly within time restrictions.
For more details, please visit the live application and explore the interactive visualizations.
## URL Sources
- https://catalog.data.gov/dataset/healthinsurancecoverage-d3b6c/resource/edab6e3a-1f64-4e3f-bacd-d8cd97b19362?inner_span=True
- https://jqlang.github.io/jq/
- https://www.downloadexcelfiles.com/us_en/download-list-us-zip-codes-michigan-state#gsc.tab=0
- https://www.chartjs.org/docs/latest/samples/information.html
- https://favicon.io/emoji-favicons/ambulance
- https://flask.palletsprojects.com/en/2.3.x/patterns/favicon/
- https://stackoverflow.com/questions/22029114/how-to-import-geojson-file-to-mongodb  