const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];

const pacMan = []; //This array holds all the pacman

const pacManWidth = 100;
const pacManHeight = 100;
// console.log(window.getComputedStyle("button").style.width);

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

function makePac() {
  // returns an object with random values
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  let direction = {
    x: 0,
    y: 0,
  };

  let focus = 0;

  let game = document.querySelector("#game");
  let newImg = document.createElement("img");
  newImg.style.position = "absolute";
  newImg.style.top = position.y + "px";
  newImg.style.left = position.x + "px";

  newImg.src = pacArray[0][0];
  newImg.style.width = `${pacManWidth}px`;
  newImg.style.height = `${pacManHeight}px`;

  game.appendChild(newImg);

  return {
    position,
    velocity,
    newImg,
    direction,
    focus,
  };
}

function update() {
  pacMan.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newImg.style.left = item.position.x + "px";
    item.newImg.style.top = item.position.y + "px";

    item.focus = (item.focus + 1) % 2;
    item.newImg.src = pacArray[item.direction.x][item.focus];
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;

  if (
    !item.direction.x &&
    winWidth < item.position.x + pacManWidth + item.velocity.x
  ) {
    item.direction.x = 1;
    item.velocity.x = -item.velocity.x;
  } else if (item.direction.x && item.position.x + item.velocity.x <= 0) {
    item.direction.x = 0;
    item.velocity.x = -item.velocity.x;
  }

  if (
    !item.direction.y &&
    winHeight < item.position.y + pacManHeight + item.velocity.y
  ) {
    item.direction.y = 1;
    item.velocity.y = -item.velocity.y;
  } else if (item.direction.y && item.position.y + item.velocity.y <= 0) {
    item.direction.y = 0;
    item.velocity.y = -item.velocity.y;
  }
}

document.querySelector("#add").addEventListener("click", () => {
  pacMan.push(makePac());
});

document.querySelector("#start-game").addEventListener("click", update);
