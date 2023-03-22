// Function to open the canvas modal
function openCanvasModal() {
  // Cache DOM References
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var headline = document.getElementById("headline").textContent;
  var number = document.getElementById("result").textContent;
  var position = document.getElementById("position").textContent;
  var prompt = document.getElementById("prompt").textContent;

  // Extract common style properties into variables
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, '#8a54c1');
  gradient.addColorStop(1, '#fc466b');
  const buttonStyle = {
    width: 300,
    height: 70,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'white',
    fillColor: 'transparent',
    link: "pi.schneuer.online"
  };
  const headlineStyle = "bold 110px Arial";
  const numberStyle = "bold 120px Arial";
  const positionStyle = "normal 40px Arial";
  const promptStyle = "normal 60px Arial";
  const buttonTextStyle = "bold 30px Arial";
  const buttonTextColor = "#ffffff";

  // Set the background color
  ctx.fillStyle = "#212529";
  ctx.textAlign = 'center';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the text on the canvas with the gradient color
  ctx.fillStyle = gradient;
  ctx.font = headlineStyle;
  ctx.fillText(headline, canvas.width / 2, canvas.height / 2 - 600);

  ctx.fillStyle = gradient;
  ctx.font = numberStyle;
  ctx.fillText(number, canvas.width / 2, canvas.height / 2 - 300);

  ctx.fillStyle = gradient;
  ctx.font = positionStyle;
  ctx.fillText(position, canvas.width / 2, canvas.height / 2 - 217);

  ctx.fillStyle = gradient;
  ctx.font = promptStyle;
  let wrappedText = wrapText(ctx, prompt, canvas.width / 2, canvas.height / 2 + 70, 850, 80)
  wrappedText.forEach(function (item) {
    // item[0] is the text
    // item[1] is the x coordinate to fill the text at
    // item[2] is the y coordinate to fill the text at
    ctx.fillText(item[0], item[1], item[2]);
  })

  // Define button properties
  const {width, height, borderRadius, borderWidth, borderColor, fillColor, link} = buttonStyle;
  const x = canvas.width / 2 - 150;
  const y = canvas.height / 2 + 750;

  // Calculate x and y positions with borderRadius offset
  const xPos = x + borderRadius;
  const yPos = y + borderRadius;

  // Draw the button
  ctx.beginPath();
  ctx.moveTo(xPos, y);
  ctx.lineTo(xPos + width - borderRadius * 2, y);
  ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
  ctx.lineTo(x + width, yPos + height - borderRadius * 2);
  ctx.arcTo(x + width, y + height, xPos + width - borderRadius * 2, y + height, borderRadius);
  ctx.lineTo(xPos, y + height);
  ctx.arcTo(x, y + height, x, yPos + height - borderRadius * 2, borderRadius);
  ctx.lineTo(x, yPos);
  ctx.arcTo(x, y, xPos, y, borderRadius);
  ctx.lineTo(xPos + width - borderRadius * 2, y);
  ctx.closePath();

  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.stroke();

  // Draw the text
  ctx.font = 'bold 30px Arial';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(link, x + width / 2, y + height / 2);

  // Convert the canvas to an image
  var dataURL = canvas.toDataURL("image/png");

  // Set the download link href to the data URL
  var downloadLink = document.getElementById("downloadLink");
  var imagepres = document.getElementById("story-img");
  downloadLink.href = dataURL;
  imagepres.src = dataURL;
}

// Get the canvas modal element
var canvasModal = document.getElementById("canvasModal");

// Get the button that opens the canvas modal
var canvasModalButton = document.querySelector("[data-bs-target='#canvasModal']");

var canvasModalButtonClose = document.querySelector("[data-bs-dismiss='modal']");


// Add an event listener to the canvas modal show event
canvasModal.addEventListener("show.bs.modal", openCanvasModal);





function wrapText(ctx, text, x, y, maxWidth, lineHeight) {    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(' ');
  let line = ''; // This will store the text of the current line
  let testLine = ''; // This will store the text when we add a word, to test if it's too long
  let lineArray = []; // This is an array of lines, which the function will return

  // Lets iterate over each word
  for (var n = 0; n < words.length; n++) {
    // Create a test line, and measure it..
    testLine += `${words[n]} `;
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    // If the width of this test line is more than the max width
    if (testWidth > maxWidth && n > 0) {
      // Then the line is finished, push the current line into "lineArray"
      lineArray.push([line, x, y]);
      // Increase the line height, so a new line is started
      y += lineHeight;
      // Update line and test line to use this word as the first word on the next line
      line = `${words[n]} `;
      testLine = `${words[n]} `;
    }
    else {
      // If the test line is still less than the max width, then add the word to the current line
      line += `${words[n]} `;
    }
    // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
    if (n === words.length - 1) {
      lineArray.push([line, x, y]);
    }
  }
  // Return the line array
  return lineArray;
}
