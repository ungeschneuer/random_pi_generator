function getRandomPiDigit() {
  // Generate a random number between 0 and 999999 to represent the position in the pi number
  const position = Math.floor(Math.random() * 1000000);
  let currentValue = 0;
  const result = document.getElementById("result");

  // Read pi digits from a file using AJAX
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const pi = this.responseText;
      // Get the random digit of pi with its position
      const piDigit = pi.charAt(position);
      // Display the result on the webpage


      const timer = setInterval(() => {

        // Add the increment to the current value
        currentValue += 1;

        // Update the result element
        result.innerText = currentValue;

        // If the current value is greater than or equal to the random number, stop the timer and set the result to the random number
        if (currentValue >= piDigit) {
          clearInterval(timer);
          result.innerText = piDigit;
        }
      }, 50);

      document.getElementById("position").innerHTML = `at the position ${position}.`;

      if (!document.getElementById("position").classList.contains("fade-in")) {
        document.getElementById("position").classList.add("fade-in");
      }

    }
  };
  xhttp.open("GET", "pi_digits.txt", true);
  xhttp.send();
}