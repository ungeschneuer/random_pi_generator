function getRandomPiDigit() {
  const position = Math.floor(Math.random() * 1000000);
  let currentValue = 0;
  const result = document.getElementById("result");
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const pi = this.responseText;
          const piDigit = pi.charAt(position);
          const timer = setInterval(()=>{
              currentValue += 1;
              result.innerText = currentValue;
              if (currentValue >= piDigit) {
                  clearInterval(timer);
                  result.innerText = piDigit;
              }
          }
          , 50);
          document.getElementById("position").innerHTML = `at the position ${position+1}.`;
          if (!document.getElementById("position").classList.contains("fade-in")) {
              document.getElementById("position").classList.add("fade-in");
          }
      }
  }
  ;
  xhttp.open("GET", "pi_digits.txt", true);
  xhttp.send();
}
