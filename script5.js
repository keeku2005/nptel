let current = 0;
let score = 0;

// Get the number of questions from URL parameter
const params = new URLSearchParams(window.location.search);
let totalQuestions = params.get('count');

// If 'all' is selected, use all questions
if(totalQuestions === 'all') {
  totalQuestions = questions.length;
} else {
  totalQuestions = Math.min(parseInt(totalQuestions), questions.length);
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.classList.add("option-btn");
    btn.onclick = () => checkAnswer(btn, opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(button, selected) {
  const correctAnswer = questions[current].answer;

  // Disable all buttons
  document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);

  // Color feedback
  if (selected === correctAnswer) {
    button.style.backgroundColor = "#4CAF50"; // green
    score++;
  } else {
    button.style.backgroundColor = "#f44336"; // red
    document.querySelectorAll(".option-btn").forEach(btn => {
      if (btn.innerText === correctAnswer) btn.style.backgroundColor = "#4CAF50";
    });
  }

  // Move to next question after 1.5 seconds
  setTimeout(() => {
    current++;
    if (current < totalQuestions) loadQuestion();
    else window.location.href = `result20.html?score=${score}`;
  }, 1500);
}

window.onload = loadQuestion;
