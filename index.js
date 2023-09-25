const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const gameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],
[2, 4, 6]];


//function to initalize the game

function init() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];  //update in logic
    boxes.forEach((box, index) => {  //update in ui also
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`; //to reset to defalt css
    })
    gameBtn.classList.remove("active");
    gameInfo.innerText = `${currPlayer} - Player Turn`;
}

init();

function swapTurn() {
    if (currPlayer === 'X') {
        currPlayer = "O";
    }
    else {
        currPlayer = "X";
    }

    gameInfo.innerText = `${currPlayer} - Player Turn`;
}

function chkgame() {
    let answer = "";
    winningPos.forEach((position) => { //base case for winnig
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== ""
            || gameGrid[position[2]] !== "") && gameGrid[position[0]] ===
            (gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            //chk if winner is X or O
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //disable pointer so that there cant be nxt turn
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //Mark the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if (answer !== "") {
        gameInfo.innerText = `${answer} -  WINS🥳🥳`;
        gameBtn.classList.add("active");
        return;
    }

    //when game is tied
    let count = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            count++;
    });

    if (count === 9) {
        gameInfo.innerText = "Game Tied!!!";
        gameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currPlayer;  //changes in UI
        gameGrid[index] = currPlayer;    //changes in grid in inner logic
        boxes[index].style.pointerEvents = "none";
        //swap turns
        swapTurn();
        //chk if any player has won or not
        chkgame();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

gameBtn.addEventListener("click", (init));