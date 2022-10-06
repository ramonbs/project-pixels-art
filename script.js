/* eslint-disable no-param-reassign */
// Variáveis com escopo global -----------------------------------------------------------------
const colorPalette = document.querySelector('#color-palette');

const button = document.querySelector('#button-random-color');

const resetButton = document.querySelector('#clear-board');

const createButton = document.querySelector('#generate-board');

const grid = document.querySelector('#pixel-board');

// Funções ------------------------------------------------------------------------------------
function setPixelColor(event, capturedColor) {
  const capturedPixel = event.target;
  capturedPixel.style.backgroundColor = capturedColor;
}

// gerando cores aleatórias para o background
function generateRandomColor() {
  const colorMaker = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i += 1) {
    color += colorMaker[Math.floor(Math.random() * 16)];
  }
  return color;

  // Referência https://stackoverflow.com/questions/1484506/random-color-generator
}

// Função para gerar a relação entri número de pixel por linhas de acordo com o valor que o usuário colocar na input
function dynamicRowColumnsGeneration(value) {
  for (let i = 0; i < value; i += 1) {
    grid.style.gridTemplateColumns = `repeat(${value}, 50px)`;
    grid.style.gridTemplateRows = `repeat(${value}, 50px)`;
  }
}

// Salvando as cores no localStorage
function saveStorageColors() {
  const colorsArray = [];
  const color = document.querySelectorAll('.color');
  for (let i = 0; i < color.length; i += 1) {
    colorsArray.push(color[i].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(colorsArray));

  // Para todos os recovery e saves, usei como referência o projeto da aula 5.4 Web Storage, exercício "Agora a prática", onde era necessário salvar localmente vários elementos como cor de fundo, tamanho do texto, estilo da fonte e etc.
}

// Salvando o quadro no localStorage
function saveStoragePixelsArt() {
  const pixelArt = [];
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixelArt.push(pixel[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelArt));

  // Para todos os recovery e saves, usei como referência o projeto da aula 5.4 Web Storage, exercício "Agora a prática", onde era necessário salvar localmente vários elementos como cor de fundo, tamanho do texto, estilo da fonte e etc.
}

// Function to save the board size in the local storage
function saveBoardSize(value) {
  localStorage.setItem('boardSize', value);
}

// Função para trocar a classe selected
function selectColorPalette() {
  let capturedColor = 'black';
  colorPalette.addEventListener('click', (event) => {
    const selectedColor = document.querySelector('.selected');
    selectedColor.classList.remove('selected');
    const capturedClass = event.target;
    capturedClass.classList.add('selected');
    capturedColor = capturedClass.style.backgroundColor;
  });
  grid.addEventListener('click', (event) => {
    setPixelColor(event, capturedColor);
    saveStoragePixelsArt();
  });
}

// Função para criar os quadrados
function createDiv() {
  for (let i = 0; i < 4; i += 1) {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorPalette.appendChild(colorDiv);
  }
}

// Função para criar a cor de fundo dos quadrados
function createBackgroundColor() {
  const color = document.querySelectorAll('.color');
  for (let i = 0; i < 4; i += 1) {
    if (i === 0) {
      color[i].style.backgroundColor = '#000';
      color[i].className = 'color selected';
    } else {
      color[i].style.backgroundColor = `#${generateRandomColor()}`;
    }
  }
}

// Função para criar o quadro de pixels
function createInitialBoard() {
  for (let i = 0; i < 25; i += 1) {
    const div = document.createElement('div');
    div.className = 'pixel';
    div.style.height = '40px';
    div.style.width = '40px';
    div.style.border = '1px solid #000';
    div.style.backgroundColor = 'white';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(5, 50px)';
    grid.style.gridTemplateRows = 'repeat(5, 50px)';
    grid.appendChild(div);
  }
}

function elementsOfBoard(value) {
  for (let i = 0; i < value * value; i += 1) {
    const div = document.createElement('div');
    div.className = 'pixel';
    div.style.height = '40px';
    div.style.width = '40px';
    div.style.border = '1px solid #000';
    div.style.backgroundColor = 'white';
    grid.style.display = 'grid';
    dynamicRowColumnsGeneration(value);
    grid.appendChild(div);
  }
}

// Função para gerar cores aleatórias ao clicar no botão
function selectColor() {
  for (let i = 1; i < 4; i += 1) {
    const color = document.querySelectorAll('.color')[i];
    color.style.backgroundColor = `#${generateRandomColor()}`;
  }
  saveStorageColors();
}

// Função para recuperar as cores do localStorage e colocar nos quadrados
function recoveryColor() {
  const savedColors = JSON.parse(localStorage.getItem('colorPalette'));
  for (let i = 0; i < 4; i += 1) {
    const color = document.querySelectorAll('.color')[i];
    color.style.backgroundColor = savedColors[i];
    if (i === 0) {
      color.className = 'color selected';
    }
  }
  // Para todos os recovery e saves, usei como referência o projeto da aula 5.4 Web Storage, exercício "Agora a prática", onde era necessário salvar localmente vários elementos como cor de fundo, tamanho do texto, estilo da fonte e etc.
}

// Função para recuperar as artes do localStorage
function recoveryPixelArt(savedBoardSize) {
  const savedPixelArt = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let i = 0; i < savedBoardSize; i += 1) {
    const pixel = document.querySelectorAll('.pixel')[i];
    pixel.style.backgroundColor = savedPixelArt[i];
  }
  // Para todos os recovery e saves, usei como referência o projeto da aula 5.4 Web Storage, exercício "Agora a prática", onde era necessário salvar localmente vários elementos como cor de fundo, tamanho do texto, estilo da fonte e etc.
}

function recoveryBoardSize() {
  const savedBoardSize = JSON.parse(localStorage.getItem('boardSize'));
  if (savedBoardSize < 5) {
    elementsOfBoard(5);
  } else {
    elementsOfBoard(savedBoardSize);
  }
  recoveryPixelArt(savedBoardSize * savedBoardSize);
}

// Função para limpar o quadro
function clearGrid() {
  const pixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
  // Tirei como referência o projeto do jogo da velha feito pela acadêmia de lógica com Cadu!
  saveStoragePixelsArt();
}

// Função para criar o quadro de acordo com o input
function reCreateBoard() {
  const input = document.querySelector('#board-size');
  const { value } = input;
  if (value <= 0) {
    alert('Board Inválido!');
    recoveryBoardSize();
  } else if (value < 5) {
    elementsOfBoard(5);
  } else if (value > 50) {
    alert('Board muito grande!');
    elementsOfBoard(50);
  } else {
    elementsOfBoard(value);
  }
  saveStoragePixelsArt();
  saveBoardSize(value);
}

// Função que remove a board para poder recriá-la no reCreateBoard
function removeBoard() {
  document
    .querySelectorAll('.pixel')
    .forEach((i) => i.parentNode.removeChild(i));

  // Referência de https://stackoverflow.com/questions/61155301/how-to-remove-divs-inside-a-grid
}

// Função para verificar se existe cores salvas no localStorage e chamar a função recoveryColor

function checkStorage() {
  if (localStorage.length === 0) {
    createDiv();
    createInitialBoard();
    createBackgroundColor();
    saveStoragePixelsArt();
    saveStorageColors();
    saveBoardSize(5);
  } else {
    createDiv();
    recoveryColor();
    recoveryBoardSize();
  }
  // Referência foi a aula ao vivo junto com o Rods, no qual ele continuou o jogo de kart do mario e salvou os personagens escolhidos no localStorage.
}

// Chamadas ------------------------------------------------------------------------------------

button.addEventListener('click', selectColor);

resetButton.addEventListener('click', clearGrid);

createButton.addEventListener('click', removeBoard);

createButton.addEventListener('click', reCreateBoard);

grid.removeEventListener('click', selectColor);

checkStorage();

selectColorPalette();
