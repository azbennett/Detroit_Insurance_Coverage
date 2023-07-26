fetch('static/data/HealthInsuranceCoverage.geojson')
  .then(response => response.json())
  .then(data => {
    let totalWithHealthInsurance = 0;
    let totalNoHealthInsurance = 0;
    let totalunder18WithHealthInsurance = 0;
    let totalunder18NoHealthInsurance = 0;

    data.features.forEach(feature => {
      totalWithHealthInsurance += feature.properties.WithHealthInsurance;
      totalNoHealthInsurance += feature.properties.NoHealthInsurance;
      totalunder18WithHealthInsurance += feature.properties.WithInsurance_U18;
      totalunder18NoHealthInsurance += feature.properties.NoInsurance_U18;
    });

    zipStackedBar(data);
    zipStackedBar_U18(data);
    createPieChart(totalWithHealthInsurance, totalNoHealthInsurance);
    under18_PieChart(totalunder18WithHealthInsurance, totalunder18NoHealthInsurance);
  });    

  function createPieChart(totalWithHealthInsurance, totalNoHealthInsurance) {
    const totalPopulation = totalWithHealthInsurance + totalNoHealthInsurance;
    const pctWithHealthInsurance = (totalWithHealthInsurance / totalPopulation) * 100;
    const pctNoHealthInsurance = (totalNoHealthInsurance / totalPopulation) * 100;
  
    const data = {
      labels: ['With Health Insurance', 'No Health Insurance'],
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
            text: 'Health Insurance Coverage',
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

  function under18_PieChart(totalunder18WithHealthInsurance, totalunder18NoHealthInsurance) {
    const totalPopulation = totalunder18WithHealthInsurance + totalunder18NoHealthInsurance;
    const pctWithHealthInsurance = (totalunder18WithHealthInsurance / totalPopulation) * 100;
    const pctNoHealthInsurance = (totalunder18NoHealthInsurance / totalPopulation) * 100;
  
    const data = {
      labels: ['Under 18 With Health Insurance', 'Under 18 Without Health Insurance'],
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
            text: 'Under 18 Health Insurance Coverage',
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

  function zipStackedBar(data) {
    const labels = data.features.map(feature => feature.properties.GEOID10.slice(-5));
    const withHealthInsurance = data.features.map(feature => feature.properties.WithHealthInsurance);
    const noHealthInsurance = data.features.map(feature => feature.properties.NoHealthInsurance);
  
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

  function zipStackedBar_U18(data) {
    const labels = data.features.map(feature => feature.properties.GEOID10.slice(-5));
    const withHealthInsurance = data.features.map(feature => feature.properties.WithInsurance_U18);
    const noHealthInsurance = data.features.map(feature => feature.properties.NoInsurance_U18);
  
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