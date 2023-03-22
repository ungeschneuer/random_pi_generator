const [resultEl, positionEl, promptEl] = [
  document.getElementById("result"),
  document.getElementById("position"),
  document.getElementById('prompt')
];
const interval = 100; // Increase this value to slow down the animation
let pi = '';
let prompts = [];

async function init() {
  // Load pi digits and prompts
  const [piResponse, promptsResponse] = await Promise.all([
    fetch('../pi_digits.txt'),
    fetch('prompts.txt')
  ]);
  pi = await piResponse.text();
  prompts = (await promptsResponse.text()).split('\n');
}
init();

async function getRandomPiDigit() {
  const position = Math.floor(Math.random() * 1000000);
  let currentValue = 0;

  const piDigit = pi.charAt(position);

  // Hide intro element
  document.getElementById("intro").style.display = "none";
  promptEl.classList.remove('fade-in');
  positionEl?.classList?.remove("fade-in");

  // Load and display a random prompt
  const randomIndex = Math.floor(Math.random() * prompts.length);
  promptEl.textContent = prompts[randomIndex];

  function updateResult(timestamp) {
    // Increment currentValue until it matches piDigit
    currentValue = Math.min(currentValue + 1, piDigit);
    resultEl.innerText = currentValue;

    // If currentValue is less than piDigit, wait for the next animation frame and update again
    if (currentValue < piDigit) {
      setTimeout(() => {
        requestAnimationFrame(updateResult);
      }, interval)    
    } else {
      // Once currentValue matches piDigit, display the position and fade in the elements
      positionEl.innerHTML = `Position ${position+1}`;
      positionEl?.classList?.add("fade-in");
      promptEl.classList.add('fade-in');
    }
  }

  // Start updating the result
  requestAnimationFrame(updateResult);
}
