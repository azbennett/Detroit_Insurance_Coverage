fetch('static/data/HealthInsuranceCoverage.geojson') //grabs the geojson file
  .then(response => response.json())
  .then(data => {
    //console.log('Fetched data:', data);

    //initialize the varables to zero
    let totalWithHealthInsurance = 0;
    let totalNoHealthInsurance = 0;
    let totalunder18WithHealthInsurance = 0;
    let totalunder18NoHealthInsurance = 0;

    data.features.forEach(feature => {
      
      //variables for our pie chart functions
      totalWithHealthInsurance += feature.properties.WithHealthInsurance;
      totalNoHealthInsurance += feature.properties.NoHealthInsurance;
      totalunder18WithHealthInsurance += feature.properties.WithInsurance_U18;
      totalunder18NoHealthInsurance += feature.properties.NoInsurance_U18;
    });

    //runs our 4 visualizations
    zipStackedBar(data);//bar chart for adults
    zipStackedBar_U18(data);//bar chart for kids
    createPieChart(totalWithHealthInsurance, totalNoHealthInsurance);//pie chart for adults
    under18_PieChart(totalunder18WithHealthInsurance, totalunder18NoHealthInsurance);//pie chart for kids
  });    

  //pie chart showing Adult Health Insurance Coverage Total Avg
  function createPieChart(totalWithHealthInsurance, totalNoHealthInsurance) {
    const totalPopulation = totalWithHealthInsurance + totalNoHealthInsurance;
    const pctWithHealthInsurance = (totalWithHealthInsurance / totalPopulation) * 100;
    const pctNoHealthInsurance = (totalNoHealthInsurance / totalPopulation) * 100;
  
    //console.log("Did the 3 figures calc?: ")
    //console.log(totalPopulation);
    //console.log(pctWithHealthInsurance);
    //console.log(pctNoHealthInsurance);

    const data = {
      labels: ['% With Health Insurance', '% With No Health Insurance'],
      datasets: [{
        data: [pctWithHealthInsurance, pctNoHealthInsurance],
        backgroundColor: ['#36A2EB', '#FF6384'], // Colors for each segment
      }]
    };
  
    const ctx = document.getElementById('piechart').getContext('2d');
  
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Health Insurance Coverage (Values are in % format)',
            font: { size: 20 }
          }
        },
        legend: {
          display: true,
          position: 'top'
        }
      }
    });
  }

  //pie chart showing Child Health Insurance Coverage Total Avg
  function under18_PieChart(totalunder18WithHealthInsurance, totalunder18NoHealthInsurance) {
    const totalPopulation = totalunder18WithHealthInsurance + totalunder18NoHealthInsurance;
    const pctWithHealthInsurance = (totalunder18WithHealthInsurance / totalPopulation) * 100;
    const pctNoHealthInsurance = (totalunder18NoHealthInsurance / totalPopulation) * 100;
  

    //console.log("Did the 3 figures calc?: ")
    //console.log(totalPopulation);
    //console.log(pctWithHealthInsurance);
    //console.log(pctNoHealthInsurance);


    const data = {
      labels: ['% Under 18 With Health Insurance', '% Under 18 Without Health Insurance'],
      datasets: [{
        data: [pctWithHealthInsurance, pctNoHealthInsurance],
        backgroundColor: ['#36A2EB', '#FF6384'], // Colors for each segment
      }]
    };
  
    const ctx = document.getElementById('U18piechart').getContext('2d');
  
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Under 18 Health Insurance Coverage (Values are in % format)',
            font: { size: 20 }
          }
        },
        legend: {
          display: true,
          position: 'top'
        }
      }
    });
  }

  //stacked bar chart showing Adult Health Insurance Coverage Per Zip Code
  function zipStackedBar(data) {
    const labels = data.features.map(feature => feature.properties.GEOID10.slice(-5));
    const withHealthInsurance = data.features.map(feature => feature.properties.WithHealthInsurance);
    const noHealthInsurance = data.features.map(feature => feature.properties.NoHealthInsurance);
  
    //console.log("Did the 3 figures calc?: ")
    //console.log(labels);
    //console.log(withHealthInsurance);
    //console.log(noHealthInsurance);

    const ctx = document.getElementById('zipbar').getContext('2d');
  
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'With Health Insurance',
            backgroundColor: '#36A2EB',
            data: withHealthInsurance
          },
          {
            label: 'No Health Insurance',
            backgroundColor: '#FF6384',
            data: noHealthInsurance
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Health Insurance Coverage by Zip Code',
            font: { size: 20 }
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  };

  //stacked bar chart showing Child Health Insurance Coverage Per Zip Code
  function zipStackedBar_U18(data) {
    const labels = data.features.map(feature => feature.properties.GEOID10.slice(-5));
    const withHealthInsurance = data.features.map(feature => feature.properties.WithInsurance_U18);
    const noHealthInsurance = data.features.map(feature => feature.properties.NoInsurance_U18);
  
    //console.log("Did the 3 figures calc?: ")
    //console.log(labels);
    //console.log(withHealthInsurance);
    //console.log(noHealthInsurance);

    const ctx = document.getElementById('zipbaru18').getContext('2d');
  
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Under 18 With Health Insurance',
            backgroundColor: '#36A2EB',
            data: withHealthInsurance
          },
          {
            label: 'Under 18 Without Health Insurance',
            backgroundColor: '#FF6384',
            data: noHealthInsurance
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Under 18 Health Insurance Coverage by Zip Code',
            font: { size: 20 }
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  };  