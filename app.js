// let n = Math.sqrt(boxes.length) * 2 + 2;
// let num = Math.sqrt(boxes.length);
// let winnigComb = [];
// for (let i = 0; i < n; i++) {
//   winnigComb.push([]);
// }
// for (let i = 0; i < num; i++) {
//   for (let j = num * i; j < num * (i + 1); j++) {
//     winnigComb[i].push(j);
//   }
//   for (let k = i; k < num * (num - 1) + num; k += num) {
//     winnigComb[i + num].push(k);
//   }
//   let num1 = num + 1;
//   winnigComb[num * 2].push(i * num1);
// }
// for (let i = 1; i < num + 1; i++) {
//   let num2 = num - 1;
//   winnigComb[num * 2 + 1].push(i * num2);
// }
let game = document.querySelector(".game");
for (let i = 0; i < 9; i++) {
  let box = document.createElement("div");
  box.classList.add("box");
  game.append(box);
}
let move = 0;
let boxes = document.querySelectorAll(".box");
let gameNum = 0;
let resForLS = [];
let winningMoves = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
game.addEventListener("mouseover", (e) => {
  if (e.target.innerHTML === "") {
    if (move % 2 === 0) {
      e.target.setAttribute("style", "");
      e.target.classList.add("hoveredX");
    } else {
      e.target.classList.add("hoveredO");
    }
  }
});
game.addEventListener("click", (e) => {
  e.target.classList.remove("hoveredX");
  e.target.classList.remove("hoveredO");
});
game.addEventListener("mouseout", (e) => {
  e.target.classList.remove("hoveredX");
  e.target.classList.remove("hoveredO");
});
boxes.forEach((e) => {
  e.addEventListener("click", (event) => {
    if (event.target.innerHTML === "") {
      if (move % 2 === 0) {
        event.target.innerHTML = "X";
        event.target.style.backgroundColor = "#FF6F61";
      } else {
        event.target.innerHTML = "O";
        event.target.style.backgroundColor = "#88B04B";
      }
      move++;
      if (move >= 5) {
        checkWinner(move);
      }
    }
  });
});
function checkWinner(totalMoves) {
  for (let i = 0; i < winningMoves.length; i++) {
    let a = boxes[winningMoves[i][0]];
    let b = boxes[winningMoves[i][1]];
    let c = boxes[winningMoves[i][2]];
    if (a.innerHTML === "X" && b.innerHTML === "X" && c.innerHTML === "X") {
      showWinner(a, b, c);
      setTimeout(() => {
        finishGame("PLayer 1", totalMoves);
      }, 1000);
    } else if (
      a.innerHTML === "O" &&
      b.innerHTML === "O" &&
      c.innerHTML === "O"
    ) {
      showWinner(a, b, c);
      setTimeout(() => {
        finishGame("PLayer 2", totalMoves);
      }, 1000);
    }
  }
  setTimeout(() => {
    isDraw(move);
  }, 1001);
}
function finishGame(player, totalMoves) {
  gameNum++;
  resForLS.push(`Moves: ${totalMoves}`);
  resForLS.push(`Winner: ${player}`);
  localStorage.setItem(`Game ${gameNum}`, resForLS);
  resForLS.pop();
  resForLS.pop();
  document.querySelector(".modalText").innerHTML = `Winner: ${player}
  Moves: ${totalMoves}`;
  document.querySelector(".modal-content").style.transform =
    "perspective(600px) translate(0px,0%) rotateX(0deg)";
  document.querySelector(".modal-content").style.opacity = "1";
  document.querySelector(".modal").classList.remove("hidden");
  restartGame();
}
function isDraw(a) {
  if (a >= 9) {
    finishGame("Draw", 9);
  }
}
function restartGame() {
  move = 0;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].style.backgroundColor = "#edf1ff";
    boxes[i].style = "";
  }
}
document.querySelector(".restartBtn").addEventListener("click", () => {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".modal-content").style.transform =
    "perspective(600px) translate(0px,-100%) rotateX(45deg)";
  document.querySelector(".modal-content").style.opacity = "0";
  restartGame();
});
function showWinner(a, b, c) {
  return (
    (a.style.backgroundColor = "#34568B"),
    (b.style.backgroundColor = "#34568B"),
    (c.style.backgroundColor = "#34568B"),
    (a.style.color = "#EFC050"),
    (b.style.color = "#EFC050"),
    (c.style.color = "#EFC050")
  );
}
