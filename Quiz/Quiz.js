const questions = [
  {
    question: "Which keyword declares a variable in JavaScript?",
    answers: ["int", "let", "string", "define"],
    correct: 1
  },
  {
    question: "Which method prints to the browser console?",
    answers: ["console.log()", "print()", "echo()", "document.write()"],
    correct: 0
  },
  {
    question: "What does DOM stand for?",
    answers: [
      "Document Object Model",
      "Data Object Management",
      "Digital Output Method",
      "Document Oriented Mode"
    ],
    correct: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "<!-- -->", "#", "**"],
    correct: 0
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Microsoft", "Netscape", "Google", "Apple"],
    correct: 1
  },
  {
    question: "Which operator checks both value and type?",
    answers: ["==", "=", "===", "!="],
    correct: 2
  },
  {
    question: "Which function converts JSON to an object?",
    answers: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()"
    ],
    correct: 0
  },
  {
    question: "Which loop repeats while a condition is true?",
    answers: ["for", "while", "switch", "if"],
    correct: 1
  },
  {
    question: "Which HTML tag links JavaScript?",
    answers: ["<js>", "<javascript>", "<script>", "<code>"],
    correct: 2
  },
  {
    question: "Which keyword exits a loop?",
    answers: ["continue", "exit", "break", "stop"],
    correct: 2
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const currentQuestionElement = document.getElementById("current-question");
const totalQuestionElement = document.getElementById("total-question");

const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("time");

const scoreElement = document.getElementById("score");
const maxScoreElement = document.getElementById("max-score");
const messageElement = document.getElementById("message");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 15;
let timer;

totalQuestionElement.textContent = questions.length;
maxScoreElement.textContent = questions.length;

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  currentQuestion = 0;
  score = 0;

  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);

  selectedAnswer = null;
  timeLeft = 15;
  timerElement.textContent = timeLeft;

  const q = questions[currentQuestion];

  questionElement.textContent = q.question;
  currentQuestionElement.textContent = currentQuestion + 1;

  progressBar.style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";

  answersElement.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");

    button.addEventListener("click", () => selectAnswer(button, index));

    answersElement.appendChild(button);
  });

  startTimer();
}

function selectAnswer(button, index) {
  if (selectedAnswer !== null) return;

  selectedAnswer = index;

  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => btn.disabled = true);

  const correct = questions[currentQuestion].correct;

  if (index === correct) {
    button.style.background = "green";
    button.style.color = "white";
    score++;
  } else {
    button.style.background = "red";
    button.style.color = "white";

    buttons[correct].style.background = "green";
    buttons[correct].style.color = "white";
  }

  clearInterval(timer);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);

      const buttons = document.querySelectorAll(".answer-btn");
      buttons.forEach(btn => btn.disabled = true);

      const correct = questions[currentQuestion].correct;

      buttons[correct].style.background = "green";
      buttons[correct].style.color = "white";

      setTimeout(() => {
        nextQuestion();
      }, 1000);
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  scoreElement.textContent = score;

  let percent = (score / questions.length) * 100;

  if (percent === 100) {
    messageElement.textContent = "Perfect! 🎉";
  } else if (percent >= 80) {
    messageElement.textContent = "Excellent!";
  } else if (percent >= 60) {
    messageElement.textContent = "Good Job!";
  } else if (percent >= 40) {
    messageElement.textContent = "Keep Practicing!";
  } else {
    messageElement.textContent = "Try Again!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}

