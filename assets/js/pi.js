async function getRandomPiDigit() {
  const position = Math.floor(Math.random() * 1000000);
  let currentValue = 0;
  const result = document.getElementById("result");
  const positionEl = document.getElementById("position");
  const interval = 100; // Increase this value to slow down the animation

  const response = await fetch("pi_digits.txt");
  const pi = await response.text();
  const piDigit = pi.charAt(position);

  function updateResult(timestamp) {
    currentValue = Math.min(currentValue + 1, piDigit);
    result.innerText = currentValue;
    if (currentValue < piDigit) {
      setTimeout(() => {
        requestAnimationFrame(updateResult);
      }, interval);
    } else {
      positionEl.innerHTML = `at the position ${position+1}.`;
      positionEl?.classList?.add("fade-in");
    }
  }

  requestAnimationFrame(updateResult);
}
