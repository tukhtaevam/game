let input = document.querySelector(".input"),
  btn = document.querySelector(".btn"),
  time = document.querySelector(".time"),
  gameZone = document.querySelector(".game__zone"),
  score = 0,
  gameTime = 0,
  interval = 0;

btn.addEventListener("click", () => {
  if (input.value > 4) {
    gameTime = input.value;
    input.value = "";
    gameZone.innerHTML = "";
    score = 0;
    startGame();
  } else {
    alert("Нужно вести минимум 5 секунд");
  }
});

gameZone.addEventListener("click", (event) => {
  if (event.target.classList.contains("ball")) {
    score++;
    event.target.remove();
    createBall();
  }
});

function startGame() {
  time.innerHTML = gameTime;
  interval = setInterval(() => decreaseTime(), 1000);
  createBall();
}

function decreaseTime() {
  if (gameTime == 1) {
    time.innerHTML = 0;
    endGame();
  } else {
    time.innerHTML = --gameTime;
  }
}

function endGame() {
  gameZone.innerHTML = `<h2>Вы набрали ${score} баллов</h2>`;
  clearInterval(interval);
}

function createBall() {
  let ball = document.createElement("div");
  ball.classList.add("ball");

  let shapeType = random(1, 4);

  switch (shapeType) {
    case 1:
      ball.classList.add("circle");
      break;
    case 2:
      ball.classList.add("square");
      break;
    case 3:
      ball.classList.add("rectangle");
      break;
    case 4:
      ball.classList.add("triangle");
      break;
  }

  if (shapeType !== 4) {
    let size = random(50, 100);
    ball.style.width = size + "px";
    ball.style.height = size + "px";
  } 
  if (shapeType == 3) {
    let size = random(50, 100);
    ball.style.width = size + "px" ;
    ball.style.height = size + "px" * 0.8;
  }

  ball.style.background = shapeType !== 4 ? getRandomColor() : "transparent";

  let zoneBounds = gameZone.getBoundingClientRect();

  let leftValue = random(0, zoneBounds.width - 100);
  let topValue = random(0, zoneBounds.height - 100);

  ball.style.left = leftValue + "px";
  ball.style.top = topValue + "px";

  gameZone.append(ball);
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
