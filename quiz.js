const questions = [
  {
    question: "What is a wetland?",
    answers: [
      { text: "A place that’s always dry", correct: false },
      { text: "A watery area where plants and animals live", correct: true },
      { text: "A sandy desert", correct: false },
      { text: "An ocean", correct: false }
    ]
  },
  {
    question: "Which animal is commonly found in wetlands?",
    answers: [
      { text: "Penguin", correct: false },
      { text: "Camel", correct: false },
      { text: "Frog", correct: true },
      { text: "Polar Bear", correct: false }
    ]
  },
  {
    question: "Why are wetlands important?",
    answers: [
      { text: "They filter water and prevent floods", correct: true },
      { text: "They’re fun to build houses on", correct: false },
      { text: "They create deserts", correct: false },
      { text: "They melt icebergs", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next Question";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  resultElement.innerText = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
    resultElement.innerText = "✅ Correct!";
  } else {
    selectedButton.classList.add("wrong");
    resultElement.innerText = "❌ Oops! Try the next one.";
  }

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "inline-block";
}

startGame();
