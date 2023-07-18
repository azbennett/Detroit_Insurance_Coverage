// Get the map div element
var mapDiv = document.getElementById('map');

// Create a new script element
var script = document.createElement('script');

// Set the source of the script dynamically based on the selected JavaScript file
script.src = 'static/js/logic.js'; // Replace with your default JavaScript file

// Function to load the selected JavaScript file
function loadScript() {
  // Get the selected value from the selector
  var selectedValue = jsSelector.value;

  // Set the source of the script based on the selected value
  script.src = 'static/js/' + selectedValue;

  // Check if the script element already exists in the document
  // If it does, remove it before adding the new one
  var existingScript = document.getElementById('dynamicScript');
  if (existingScript) {
    existingScript.parentNode.removeChild(existingScript);
  }

  // Set an ID for the script element
  script.id = 'dynamicScript';

  // Append the script element to the HTML document
  document.body.appendChild(script);
}

// Attach an event listener to the selector element
jsSelector.addEventListener('change', loadScript);

// Load the initial selected JavaScript file
loadScript();