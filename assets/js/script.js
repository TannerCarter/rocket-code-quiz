var container = document.getElementById("container");

function getHome() {
  let div = document.createElement("div");
  let title = document.createElement("p");
  title.innerText = "Title Here";

  let subTitle = document.createElement("p");
  subTitle.innerText = "Sub Title Here";

  let startButton = document.createElement("button");
  startButton.innerText = "Start";

  div.append(title);
  div.append(subTitle);
  div.append(startButton);

  return div;
}

let homePage = getHome();
container.append(homePage);
