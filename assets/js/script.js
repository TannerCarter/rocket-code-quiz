//Questions Data/ Info Start
const questions = [
  {
    title: "Arrays in javascript can be used to store ___.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ___ when being assigned to variables.",
    choices: ["commas", "quotes", "curly brackets", "parenthesis"],
    answer: "quotes",
  },
  {
    title: "Commonly used data types DO not include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "booleans",
  },
];
//Questions Data/ Info End

//Score board; Time; Information Start
$(function () {
  let score = $("#score");
  let end = $("#end");
  let time = $("#time");
  let start = $("#start");
  let question = $("#question");
  let startBtn = $("#start-btn");
  let final = $("#final");
  let finalSubmit = $("#finalSubmit");
  let finalInput = $("#finalInput");
  let timeCount = questions.length * 22;
  let curentQuestion = 0;
  let interval;
  //history Data and Start
  let history = $("#history");
  let back = $("#back");
  let clearHistory = $("#clearHistory");
  let historyArray = [];
  localStorage.setItem("score", JSON.stringify([])); //
  getHistory = () => {
    $("#score-box").empty();
    if (localStorage.getItem("score")) {
      historyArray = JSON.parse(localStorage.getItem("score"));
      historyArray.sort((a, b) => b.score - a.score);
    }
    historyArray.forEach((item, index) => {
      let itemscore = $(
        `<div class="score-item">${index + 1}. ${
          item.name
        } <span class="s-score">${item.score}</span></div>`
      );
      $("#score-box").append(itemscore);
    });
  };

  getHistory();

  score.on("click", function () {
    history.addClass("active");
  });

  back.on("click", function () {
    history.removeClass("active");
  });

  clearHistory.on("click", function () {
    localStorage.setItem("score", JSON.stringify([]));
    getHistory();
  });

  //Questions Start
  function startQuiz() {
    start.addClass("fade");
    question.addClass("active");
    nextQuestion(curentQuestion);
  }
  //Next Question
  function nextQuestion(number) {
    if (number <= questions.length - 1) {
      $("#question-title").text(questions[number].title);
      $("#answer-btn").empty();

      questions[number].choices.forEach((item, index) => {
        let answer = $(`<button class="answer">${index + 1}. ${item}</button>`);
        $("#answer-btn").append(answer);
      });
    } else {
      question.removeClass("active");
      end.addClass("active");
      clearInterval(interval);
      if (timeCount < 0) {
        time.text(0);
        final.text(0);
      } else {
        final.text(timeCount);
        time.text(timeCount);
      }
    }
  }

  //Answer Start
  $(document).on("click", ".answer", function () {
    if (
      this.innerText.slice(3, this.innerText.length) ===
      questions[curentQuestion].answer
    ) {
    } else {
      timeCount -= 20;
      if (timeCount < 0) {
        time.text(0);
        final.text(0);
      }
    }
    curentQuestion++;
    nextQuestion(curentQuestion);
  });
  startBtn.on("click", function () {
    startQuiz();
    interval = setInterval(function () {
      if (timeCount <= 0) {
        timeCount = 0;
        return;
      }
      timeCount--;
      time.text(timeCount);
    }, 1000);
  });

  //Questions end.

  //Finish and set as active page

  finalSubmit.on("click", function () {
    if (timeCount < 0) {
      timeCount = 0;
    }
    if (finalInput.val()) {
      historyArray.push({ name: finalInput.val(), score: timeCount });
      finalInput.val("");
      localStorage.setItem("score", JSON.stringify(historyArray));
      history.addClass("active");
      getHistory();
    }
    end.removeClass("active");
    start.removeClass("fade");
    curentQuestion = 0;
    time.text(0);
    timeCount = questions.length * 20;
  });
});
