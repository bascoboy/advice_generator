// This function runs when the webpage has fully loaded
window.onload = function () {
  // Find the button with the ID "random-advice-button" and store it in the variable generateButton
  var generateButton = document.getElementById("random-advice-button");
  // Add an event listener to the button that listens for a click event and calls the generateAdvice function when clicked
  generateButton.addEventListener("click", generateAdvice);
}

// This function is called when the "random-advice-button" is clicked
function generateAdvice() {
  // Call the function to animate the dice icon
  animateDice();
  // Call the function to handle the button click (e.g., disabling the button)
  handleClick();
  // The URL of the API that gives random advice
  const apiURL = "https://api.adviceslip.com/advice";
  // Find the element with the ID "advice-id" and store it in the variable adviceID
  const adviceID = document.getElementById("advice-id");
  // Find the element with the ID "advice-text" and store it in the variable adviceQuote
  const adviceQuote = document.getElementById("advice-text");

  // Fetch data from the advice API
  fetch(apiURL)
    // When the data is fetched, convert it to JSON format
    .then((response) => {
      return response.json();
    })
    // When the JSON data is ready, process it
    .then((data) => {
      // Get the "slip" object from the JSON data
      const adviceJson = data["slip"];
      // Set the inner HTML of the adviceID element to the ID of the advice
      adviceID.innerHTML = adviceJson["id"];
      // Set the inner HTML of the adviceQuote element to the text of the advice
      adviceQuote.innerHTML = adviceJson["advice"];
    });
}

// This function animates the dice icon when called
function animateDice() {
  // Find the element with the ID "dice-icon" and store it in the variable diceIcon
  var diceIcon = document.getElementById("dice-icon");
  // Get the current rotation angle of the dice icon
  var currentRotation = getRotationAngle(diceIcon);

  // If the current rotation is 0 degrees
  if (currentRotation === 0) {
    // Rotate the icon to -180 degrees
    diceIcon.style.transform = "rotate(-180deg)";
  } else {
    // Otherwise, reset the rotation to 0 degrees (original state)
    diceIcon.style.transform = "rotate(0deg)";
  }

  // Set the transition effect for the rotation, making it smooth over 0.5 seconds
  diceIcon.style.transition = "transform 0.5s ease";
}

// This function gets the current rotation angle of an element
function getRotationAngle(element) {
  // Get the computed style of the element
  var st = window.getComputedStyle(element, null);
  // Get the transform property value of the element
  var tr = st.getPropertyValue("transform");

  // If the transform property has a value and it's not "none"
  if (tr && tr !== "none") {
    // Split the transform value to get the rotation values
    var values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    // Get the a and b values of the transform matrix
    var a = values[0];
    var b = values[1];
    // Calculate the angle in degrees using atan2
    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    // If the angle is negative, convert it to a positive value by adding 360
    return (angle < 0) ? angle + 360 : angle;
  }
  // If there's no transform value, return 0 degrees
  return 0;
}

// This function handles the click event of the button
function handleClick() {
  // Find the button with the ID "random-advice-button" and store it in the variable generateButton
  var generateButton = document.getElementById("random-advice-button");
  // Disable the button to prevent multiple clicks
  generateButton.disabled = true;

  // Set a timeout to re-enable the button after 3 seconds (3000 milliseconds)
  setTimeout(() => {
    // Enable the button again
    generateButton.disabled = false;
  }, 3000); // 3000 milliseconds = 3 seconds
}
