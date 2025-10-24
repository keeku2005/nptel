let current = 0;
let score = 0;

// Get question count from localStorage
let selectedCount = localStorage.getItem("questionCount");
let selectedQuestions = [];

if (selectedCount === "all") {
  selectedQuestions = questions;
} else {
  selectedQuestions = questions.slice(0, parseInt(selectedCount || questions.length));
}

function loadQuestion() {
  const q = selectedQuestions[current];
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
  const correctAnswer = selectedQuestions[current].answer;

  const allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach(btn => (btn.disabled = true));

  if (selected === correctAnswer) {
    button.style.backgroundColor = "#4CAF50";
    score++;
  } else {
    button.style.backgroundColor = "#f44336";
    allButtons.forEach(btn => {
      if (btn.innerText === correctAnswer) btn.style.backgroundColor = "#4CAF50";
    });
  }

  setTimeout(() => {
    current++;
    if (current < selectedQuestions.length) loadQuestion();
    else window.location.href = `result20.html?score=${score}`;
  }, 1500);
}

window.onload = loadQuestion;

