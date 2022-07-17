const cubes = document.querySelectorAll('.cub');
const cubesParent = document.querySelectorAll('.cub-parent');

let step = null;
const array = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
 
cubes.forEach( item => {
    item.addEventListener('click', getMyList);
});

function getMyList (e) {
  const cub = e.target;
  let cubIndex;
  let parerntIndex;

  let finely;

  if (cub.textContent !== '') {
      cub.innerHTML = ''
  } else {
    finely = checkMyCub(cub, cubIndex, parerntIndex);
  }

  let stepImage = document.createElement('img');
      stepImage.classList.add('stepImage');

    if (finely == 'x') {
        stepImage.src = './icons/x.png';
        cub.appendChild(stepImage);
    } else if (finely == 'o') {
        stepImage.src = './icons/o.png';
        cub.appendChild(stepImage);
    }
    
     findWinner(cub);
}

function checkMyCub (cub, cubIndex, parerntIndex) {
  if (cub.children[0] == undefined) {
    if (step == null) {
        step = 'x';
        pushCube(cub, step);
        return step;
    }

    if (step == 'o') {
        step = 'x';
        pushCube(cub, step);
        return step;
    }

    if (step == 'x') {
        step = 'o';
        pushCube(cub, step);
        return step;
    }
  } else {
     alert('You can" put here');
  }
}

function pushCube (cub, step) {
    let cubIndex;
    const cubParent = cub.parentElement;

    if (cub.classList.contains('left')) {
        cubIndex = 0;
    } else if (cub.classList.contains('mid')) {
        cubIndex = 1;
    } else if (cub.classList.contains('right')) {
        cubIndex = 2;
    }

    if (cubParent.classList.contains('gameLine1')) {
        pushStep(0, cubIndex, step);
    }   
    else if (cubParent.classList.contains('gameLine2')) {
        pushStep(1, cubIndex, step);
    }
    else if (cubParent.classList.contains('gameLine3')) {
       pushStep(2, cubIndex, step);  
    }
}

function pushStep (place, cubIndex) {
   array[place][cubIndex] = step;
}   

function findWinner (cub) {
    for (let i = 0; i < array.length; i++) {
        if ((array[i][0] == array[i][1] && array[i][0] == array[i][2]) && array[i][0] !== "") {
            verticalWin(cub);
        }

        if (((array[0][i] == array[1][i]) && (array[0][i] == array[2][i])) && array[0][i] !== "") {
            // showWin(cub);
            horizontalWin(cub);
            // resetGame();
        }

        if (((array[0][0] == array[1][1]) && (array[2][2] == array[0][0])) && array[0][0] !== "") {
            slantWin(cub);
            break;
        } else if (((array[0][2] == array[1][1]) && (array[2][0] == array[0][2])) && array[0][2] !== "") {
            slantWin(cub);
            break;
        }
    }
}

function verticalWin (cub) {
    let line = createWinLine();

    if (cub.classList.contains('vertical-1')) {
        line.style.cssText = `
            transform: rotate(90deg);
            left: 46%;
            top: -32%;
        `;
    } else if (cub.classList.contains('vertical-2')) {
        line.style.cssText = `
            transform: rotate(90deg);
            left: 46%;
            top: 1%;
        `;
    } else if (cub.classList.contains('vertical-3')) {
        line.style.cssText = `
            transform: rotate(90deg);
            left: 46%;
            top: 34%;
        `;
    }

    createWinParent(line);
    resetGame();
}

function createWinLine () {
  const parent = document.createElement('div');
    parent.setAttribute('id', 'parent');
  const line = document.createElement('div');
    line.classList.add('lineWin');
    parent.append(line);

    return line;
}

function createWinParent (line) {
    const gameContent = document.querySelector('#Game');
    gameContent.appendChild(line);

    return gameContent;
}

function horizontalWin (cub) {
  let line = createWinLine();

    if (cub.classList.contains('horizontal-1')) {
        line.style.left = "12%";
    } else if (cub.classList.contains('horizontal-2')) {
        line.style.left = "45%";
    } else if (cub.classList.contains('horizontal-3')) {
        line.style.left = "78%";
    }

    createWinParent(line);
    resetGame();
}

function slantWin (cub) {
  let line = createWinLine();

     if (cub.classList.contains("slant-1")) {
        line.style.cssText = `
            transform: rotate(-45deg);
            left: 46%;
            top: -4%;
            height: 660px;
        `;
    } else if (cub.classList.contains('slant-2')) {
        line.style.cssText = `
            transform: rotate(45deg);
            left: 46%;
            top: -7%;
            height: 660px;
        `;
    }

    createWinParent(line);
    resetGame();
}

function resetGame () {
    setTimeout( () => {
        document.location.reload(true);
    }, 800) // refreshing page for Win!
}