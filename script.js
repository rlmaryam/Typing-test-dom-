const words = [
  "javascript", "coding", "project", "keyboard", "practice",
  "speed", "accuracy", "challenge", "developer", "function"
];

const textContainer = document.getElementById('text-container');
const inputBox = document.getElementById('input-box');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');
const errorsElement = document.getElementById('errors');
const accuracyElement = document.getElementById('accuracy');

let longText = generateLongText();
let timeLeft = 60;
let timer;
let errors = 0;
let totalTyped = 0;

textContainer.textContent = longText;

// Shuffle words
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate text
function generateLongText() {
  const shuffleWords = shuffleArray([...words]);
  return shuffleWords.join(" ");
}

// Start timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

// Handle typing
inputBox.addEventListener('input', () => {
  const typedText = inputBox.value;
  totalTyped++;
  errors = 0;

  textContainer.innerHTML = "";
  const textArray = longText.split("");

  textArray.forEach((char, index) => {
    const span = document.createElement('span');
    if (index < typedText.length) {
      if (typedText[index] === char) {
        span.classList.add('correct');
      } else {
        span.classList.add('error');
        errors++;
      }
    }
    span.textContent = char;
    textContainer.appendChild(span);
  });

  errorsElement.textContent = errors;
  let accuracy = typedText.length > 0 ? Math.max(0, ((typedText.length - errors) / typedText.length) * 100) : 100;
  accuracyElement.textContent = accuracy.toFixed(0) + "%";
});

// End test
function endTest() {
  inputBox.disabled = true;
  finalScoreElement.textContent = `Test Over! Your accuracy: ${accuracyElement.textContent}, Errors: ${errors}`;
}

// Restart
tryAgainButton.addEventListener('click', () => {
  clearInterval(timer);
  timeLeft = 60;
  timerElement.textContent = timeLeft;
  inputBox.value = "";
  inputBox.disabled = false;
  longText = generateLongText();
  textContainer.textContent = longText;
  errors = 0;
  errorsElement.textContent = errors;
  accuracyElement.textContent = "100%";
  finalScoreElement.textContent = "";
  startTimer();
});

// Start immediately
startTimer();
