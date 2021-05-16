const main = document.getElementById("main");

let score;
let timer = 80;
let questionNum = 0;
let current = {};

const questions = [
  {
    question: " Commonly used data types DO not include:",
    choices: [
      {
        id: "a",
        value: "strings",
      },
      {
        id: "b",
        value: "booleans",
      },
      {
        id: "c",
        value: "alerts",
      },
      {
        id: "d",
        value: "numbers",
      },
    ],
    correctResponse: "booleans",
  },
];

function getHomePage() {
  let div = document.createElement("div");
  let title = document.createElement("p");
  title.innerText = "To begin this quiz, please click the start button.";

  let subTitle = document.createElement("p");
  subTitle.innerText =
    "Note: 10 seconds will be reduced from your time, if answered incorrectly.";

  let startButton = document.createElement("button");
  startButton.innerText = "Start Quiz";

  startButton.onclick = onStart;

  div.append(title);
  div.append(subTitle);
  div.append(startButton);

  return div;
}

function onStart() {
  clean();
  showNextQuestion();
}

function clean() {
  console.log("Cleaning canvas");
  if (main.hasChildNodes()) {
    let childNodes = main.childNodes;
    for (i = 0; i < childNodes.length; i++) {
      main.removeChild(childNodes[i]);
    }
  }
}

function handleAnswer(e) {
  let correctAnswer = current.question.correctResponse;
  current.answerResult.innerText = `Correct answer is ${correctAnswer}. Answered ${e.target.innerText}`;
  current.answerResult.hidden = false;
  current.nextQButton.style.visibility = "visible";
}

function showNextQuestion() {
  clean();
  main.append(nextQuestion());
}

function nextQuestion() {
  let div;
  if (questionNum < questions.length) {
    div = document.createElement("div");
    const _question = questions[questionNum];
    current.question = _question;
    console.log(_question);
    let question = document.createElement("p");
    question.innerText = _question.question;
    div.append(question);

    for (i = 0; i < _question.choices.length; i++) {
      let answerChoice = _question.choices[i];
      let b = document.createElement("button");
      b.setAttribute("id", answerChoice.id);
      b.setAttribute("class", "answerChoice");
      b.innerText = answerChoice.value;
      b.onclick = handleAnswer;
      div.append(b);
    }

    let label = document.createElement("label");
    label.innerText = "This label should be hidden at first.";
    label.hidden = true;
    div.append(label);
    current.answerResult = label;

    let nextQButton = document.createElement("button");
    nextQButton.innerText = "Next Question";
    nextQButton.onclick = nextQuestion;
    nextQButton.setAttribute("class", "answerChoice");
    nextQButton.style.visibility = "hidden";
    nextQButton.onclick = showNextQuestion;

    current.nextQButton = nextQButton;

    div.append(nextQButton);

    questionNum++;
  } else {
    div = document.createElement("div");
    let p = document.createElement("p");
    p.innerText = "No more questions";
    div.append(p);
  }
  return div;
}

let homePage = getHomePage();
main.append(homePage);
