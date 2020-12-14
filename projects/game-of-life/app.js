const mainElem = document.querySelector('.main');
const startButton = document.querySelector('.buttons__start');
const stopButton = document.querySelector('.buttons_stop');
const resetButton = document.querySelector('.buttons_reset');
const blackButton = document.querySelector('.buttons_black');
const heightValue = document.querySelector('.setup__height-value');
const widthValue = document.querySelector('.setup__width-value');
const refreshValue = document.querySelector('.setup__refresh-value');

(() => {
  const startArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let rows = (heightValue.value) = 15;
  let cols = (widthValue.value) = 15;
  let refreshRate = parseInt(refreshValue.value);
  let run, cells;
  let currentArr = [...startArr];

  const getDeepCopy = (inObject) => {
    let outObject, value, key;

    if (typeof inObject !== 'object' || inObject === null) return inObject;

    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key];

      outObject[key] = getDeepCopy(value);
    }

    return outObject;
  };
  const invertCell = (e) => {
    startButton.disabled = false;
    e.target.classList.toggle('alive');
    e.target.textContent = e.target.textContent === '1' ? '0' : '1';
    currentArr[e.target.dataset.i][e.target.dataset.j] =
      currentArr[e.target.dataset.i][e.target.dataset.j] === 1
        ? 0
        : 1;
  };
  const addCellListeners = () => {
    cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.addEventListener('click', invertCell);
    });
  };
  const removeCellListeners = () => {
    cells.forEach(cell => {
      cell.removeEventListener('click', invertCell);
    });
  };
  const resetCellListeners = () => {
    startButton.disabled = false;
    removeCellListeners();
    addCellListeners();
  };
  const getRandomizedArr = (m = 10, n = 10, random = true, value = 0) => {
    const outerArr = [];
    for (let i = 0; i < m; i++) {
      const innerArr = [];
      for (let j = 0; j < n; j++) {
        random ? innerArr.push(Math.round(Math.random())) : innerArr.push(value);
      }
      outerArr.push(innerArr);
    }
    return outerArr;
  };
  const checkNeighbours = (state, count) => {
    if ((state === 1 && (count === 2 || count === 3)) || (state === 0 && count === 3)) return 1;
    return 0;
  };
  const getTransformedArr = (currentArray) => {
    const arr = getDeepCopy(currentArray);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbours = 0;

        //top-left
        currentArray[i - 1] ?
          currentArray[i - 1][j - 1] &&
          currentArray[i - 1][j - 1] === 1 ?
            neighbours++ : null : null;

        //top-mid
        currentArray[i - 1] ?
          currentArray[i - 1][j] &&
          currentArray[i - 1][j] === 1 ?
            neighbours++ : null : null;

        //top-right
        currentArray[i - 1] ?
          currentArray[i - 1][j + 1] &&
          currentArray[i - 1][j + 1] === 1 ?
            neighbours++ : null : null;

        //mid-left
        currentArray[i] ?
          currentArray[i][j - 1] &&
          currentArray[i][j - 1] === 1 ?
            neighbours++ : null : null;

        //mid-right
        currentArray[i] ?
          currentArray[i][j + 1] &&
          currentArray[i][j + 1] === 1 ?
            neighbours++ : null : null;

        //bot-left
        currentArray[i + 1] ?
          currentArray[i + 1][j - 1] &&
          currentArray[i + 1][j - 1] === 1 ?
            neighbours++ : null : null;

        //bot-mid
        currentArray[i + 1] ?
          currentArray[i + 1][j] &&
          currentArray[i + 1][j] === 1 ?
            neighbours++ : null : null;

        //bot-right
        currentArray[i + 1] ?
          currentArray[i + 1][j + 1] &&
          currentArray[i + 1][j + 1] === 1 ?
            neighbours++ : null : null;

        arr[i][j] = checkNeighbours(currentArray[i][j], neighbours);
      }
    }

    return arr;
  };
  const getHTML = (currentState) => {
    let markup = '';
    for (let i = 0; i < rows; i++) {
      let str = '<div class="row">';
      for (let j = 0; j < cols; j++) {
        str += `<div ${currentState[i][j] ?
          `data-i="${i}" data-j="${j}" class="cell alive"` :
          `data-i="${i}" data-j="${j}" class="cell"`}>${currentState[i][j]}</div>`;
      }
      markup += str + '</div>';
    }
    return markup;
    // return currentState.map(entry => {
    //   let str = '<div class="row">';
    //
    //   for (let i = 0; i < cols; i++) {
    //     str += `<div ${entry[i] ?
    //       'class="cell alive"' :
    //       'class="cell dead"'}>${entry[i]}</div>`;
    //   }
    //
    //   return str + '</div>';
    // }).join('');
  };
  const runApp = (rate = 1) => {
    let checkTimer = 0;
    let checkMarkup = '';
    run = setInterval(() => {
      checkTimer++;
      const prevMarkup = getHTML(currentArr);
      currentArr = getTransformedArr(currentArr);
      const currentMarkup = getHTML(currentArr);

      if (prevMarkup !== currentMarkup) {
        mainElem.innerHTML = currentMarkup;
      } else {
        clearInterval(run);
        resetCellListeners();
        startButton.textContent = 'Start';
        startButton.disabled = true;
        stopButton.style.display = 'none';
        startButton.style.display = 'inline-block';
      }

      if (checkTimer % 2 === 0) {
        checkMarkup = prevMarkup;
      }

      if (checkTimer % 2 !== 0 && checkMarkup === currentMarkup) {
        clearInterval(run);
        resetCellListeners();
        startButton.textContent = 'Start';
        startButton.disabled = true;
        stopButton.style.display = 'none';
        startButton.style.display = 'inline-block';
      }
      // console.clear();
      // currentState.map(entry => console.log(`${entry.map(el => `[${el}]`).toString()}`));
    }, 1000 / rate);
    startButton.textContent = 'Continue';
  };

  startButton.addEventListener('click', () => {
    startButton.textContent === 'Restart'
      ? currentArr = getRandomizedArr(rows, cols)
      : null;
    runApp(refreshRate);
    startButton.textContent = 'Continue';
    startButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
  });
  stopButton.addEventListener('click', () => {
    clearInterval(run);
    stopButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    resetCellListeners();
  });
  resetButton.addEventListener('click', () => {
    clearInterval(run);
    currentArr = getRandomizedArr(rows, cols);
    mainElem.innerHTML = getHTML(currentArr);
    startButton.textContent = 'Start';
    stopButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    resetCellListeners();
  });
  blackButton.addEventListener('click', () => {
    currentArr = getRandomizedArr(rows, cols, false);
    mainElem.innerHTML = getHTML(currentArr);
    resetCellListeners();
    startButton.disabled = true;
    startButton.textContent = 'Start';
  });
  heightValue.addEventListener('input', () => {
    clearInterval(run);
    rows = parseInt(heightValue.value);
    currentArr = getRandomizedArr(rows, cols);
    mainElem.innerHTML = getHTML(currentArr);
    resetCellListeners();
  });
  widthValue.addEventListener('input', () => {
    clearInterval(run);
    cols = parseInt(widthValue.value);
    currentArr = getRandomizedArr(rows, cols);
    mainElem.innerHTML = getHTML(currentArr);
    resetCellListeners();
  });
  refreshValue.addEventListener('input', () => {
    refreshRate = parseInt(refreshValue.value);
    clearInterval(run);
    runApp(refreshRate);
  });

  mainElem.innerHTML = getHTML(currentArr);
  addCellListeners();
})();
