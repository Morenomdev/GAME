// HTML VARIABLES
const sectionSelectAttack = document.getElementById('select-attack');
const sectionReset = document.getElementById('section-reset');
const divMessage = document.getElementById('messages');
const divLifes = document.getElementById('card-attack-div');
const buttonPetPlayer = document.getElementById('button-pet');

const buttonReset = document.getElementById('button-reset');

const spanPetPlayer = document.getElementById('pet__player');
const sectionSelectPet = document.getElementById('select-pet');
const startMessage = document.getElementById('start-message');
const resultDiv = document.getElementById('result-div');
const attackPlayerDiv = document.getElementById('attackPlayer-div');
const attackEnemyDiv = document.getElementById('attackEnemy-div');
const petEnemy = document.getElementById('pet__enemy');
const containerCards = document.getElementById('container-cards');
const containerButtons = document.getElementById('container-buttons');

const petEnemyLife = document.getElementById('enemy-pet-life');
const petPlayerLife = document.getElementById('player-pet-life');

const sectionWatchMap = document.getElementById('watch-map');
const map = document.getElementById('map');

let attackPlayer = '';
let attackEnemy = [];
let result = '';

let mokepones = [];
let buttons = [];
let usedAttacksPlayer = [];
let attacksMokeponEnemy;

let indexAttackPlayer;
let indexAttackEnemy;
let victoriesPlayer = 0;
let victoriesEnemy = 0;

let petPlayer = '';

let inputChamaleon;
let inputTurtle;
let inputBasur;
let inputTucapalma;
let inputLangosta;
let inputPydos;

let optionMokepon;
let optionAttack;

let buttonFire;
let buttonWater;
let buttonGround;

let lienzo = map.getContext('2d');
let interval;

class Mokepon {
  constructor(name, photo, life, type) {
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = [];
    this.type = type;
    this.x = 20;
    this.y = 30;
    this.width = 80;
    this.height = 80;
    this.mapPhoto = new Image();
    this.mapPhoto.src = photo;
    this.velX = 0;
    this.velY = 0;
  }
}

let chamaleon = new Mokepon('Chamaleon', './assets/Chamaleon_attack.png', 3);
let turtle = new Mokepon('Turtle', './assets/Turtle_attack.png', 3);
let basur = new Mokepon('Basur', './assets/Basur_attack.png', 3);
let pydos = new Mokepon('Pydos', './assets/Pydos_attack.png', 3);
let tucapalma = new Mokepon('Tucapalma', './assets/Tucapalma_attack.png', 3);
let langosta = new Mokepon('Langosta', './assets/Langosta_attack.png', 3);

turtle.attacks.push(
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Ground', id: 'button__ground' }
);

chamaleon.attacks.push(
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Water', id: 'button__water' },
  { name: 'Ground', id: 'button__ground' }
);

basur.attacks.push(
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' }
);

pydos.attacks.push(
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Ground', id: 'button__ground' }
);

tucapalma.attacks.push(
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Fire', id: 'button__fire' },
  { name: 'Water', id: 'button__water' },
  { name: 'Ground', id: 'button__ground' }
);

langosta.attacks.push(
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Ground', id: 'button__ground' },
  { name: 'Water', id: 'button__water' },
  { name: 'Fire', id: 'button__fire' }
);

// test
mokepones.push(chamaleon, turtle, basur, pydos, tucapalma, langosta);

function startGame() {
  sectionSelectAttack.style.display = 'none';
  sectionWatchMap.style.display = 'none';

  mokepones.forEach((mokepon) => {
    optionMokepon = `
    <input type="radio" name="pet" id="${mokepon.name}" />
    <label for="${mokepon.name}" class="card-pet-label">
            ${mokepon.name}
            <img
              class="img-pet"
              src="${mokepon.photo}"
              alt="${mokepon.name}"
            />
          </label>
    `;
    containerCards.innerHTML += optionMokepon;

    inputChamaleon = document.getElementById('Chamaleon');
    inputTurtle = document.getElementById('Turtle');
    inputBasur = document.getElementById('Basur');
    inputPydos = document.getElementById('Pydos');
    inputLangosta = document.getElementById('Langosta');
    inputTucapalma = document.getElementById('Tucapalma');
  });

  sectionReset.style.display = 'none';

  divMessage.style.display = 'none';

  divLifes.style.display = 'none';

  buttonPetPlayer.addEventListener('click', selectionPetPlayer);

  //   document.getElementById('enemy-pet-life').innerHTML = petEnemyLife;
  //   document.getElementById('player-pet-life').innerHTML = petPlayerLife;

  buttonReset.addEventListener('click', reset);
  paintMokepon();
}

function paintMokepon() {
  chamaleon.x = chamaleon.x + chamaleon.velX;
  chamaleon.y = chamaleon.y + chamaleon.velY;
  lienzo.clearRect(0, 0, map.width, map.height);
  lienzo.drawImage(
    chamaleon.mapPhoto,
    chamaleon.x,
    chamaleon.y,
    chamaleon.width,
    chamaleon.height
  );
}

function moveMokeponUp() {
  chamaleon.velY = -5;
}
function moveMokeponLeft() {
  chamaleon.velX = -5;
}
function moveMokeponDown() {
  chamaleon.velY = 5;
}
function moveMokeponRight() {
  chamaleon.velX = 5;
}

function stopMotion() {
  chamaleon.velX = 0;
  chamaleon.velY = 0;
}

function selectionPetPlayer() {
  sectionWatchMap.style.display = 'flex';
  interval = setInterval(paintMokepon, 50);

  window.addEventListener('keydown', pressKey);
  window.addEventListener('keyup', stopMotion);

  if (
    inputChamaleon.checked == false &&
    inputTurtle.checked == false &&
    inputBasur.checked == false &&
    inputPydos.checked == false &&
    inputLangosta.checked == false &&
    inputTucapalma.checked == false
  ) {
    alert('You should select a pet');
  } else {
    divMessage.style.display = 'flex';
    sectionSelectAttack.style.display = 'flex';

    sectionSelectPet.style.display = 'none';

    divLifes.style.display = 'grid';

    if (inputChamaleon.checked) {
      spanPetPlayer.innerHTML = inputChamaleon.id;
      petPlayer = inputChamaleon.id;
    } else if (inputTurtle.checked) {
      spanPetPlayer.innerHTML = inputTurtle.id;
      petPlayer = inputTurtle.id;
    } else if (inputBasur.checked) {
      spanPetPlayer.innerHTML = inputBasur.id;
      petPlayer = inputBasur.id;
    } else if (inputPydos.checked) {
      spanPetPlayer.innerHTML = inputPydos.id;
      petPlayer = inputPydos.id;
    } else if (inputLangosta.checked) {
      spanPetPlayer.innerHTML = inputLangosta.id;
      petPlayer = inputLangosta.id;
    } else if (inputTucapalma.checked) {
      spanPetPlayer.innerHTML = inputTucapalma.id;
      petPlayer = inputTucapalma.id;
    } else {
      alert('You should select a pet');
    }

    extractAttacks(petPlayer);
    selectionPetEnemy();
  }
}

function pressKey(event) {
  switch (event.key) {
    case 'ArrowUp':
      moveMokeponUp();
      break;
    case 'ArrowDown':
      moveMokeponDown();
      break;
    case 'ArrowLeft':
      moveMokeponLeft();
      break;
    case 'ArrowRight':
      moveMokeponRight();
      break;

    default:
      break;
  }
}

function finalMessage(finalMessage) {
  //   let paragraph = document.createElement('p');
  let divMessage = document.getElementById('result-div');
  divMessage.innerHTML = finalMessage;

  buttonPetPlayer.disabled = true;

  sectionReset.style.display = 'flex';
  //   sectionReset.style.display = 'flex'

  //   sectionReset.style.display = 'none';
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function extractAttacks(petPlayer) {
  let attacks = [];
  for (let i = 0; i < mokepones.length; i++) {
    if (petPlayer === mokepones[i].name) {
      attacks = mokepones[i].attacks;
    }
  }
  //test to watch result array
  //   console.log(attacks);
  showButtonsAttacks(attacks);
}

function showButtonsAttacks(attacks) {
  attacks.forEach((attack) => {
    optionAttack = `
    <button id="${attack.id}" class="button__attack BAttack">${attack.name}</button>
    `;
    containerButtons.innerHTML += optionAttack;
  });
  buttonFire = document.getElementById('button__fire');
  buttonWater = document.getElementById('button__water');
  buttonGround = document.getElementById('button__ground');
  buttons = document.querySelectorAll('.BAttack');
  //   console.log(buttons)
}

function secuenceAttacks() {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (e.target.textContent === 'Fire') {
        usedAttacksPlayer.push('Fire');
        console.log(usedAttacksPlayer);
        button.style.background = 'gray';
        button.disabled = true;
      } else if (e.target.textContent === 'Water') {
        usedAttacksPlayer.push('Water');
        console.log(usedAttacksPlayer);
        button.style.background = 'gray';
        button.disabled = true;
      } else if (e.target.textContent === 'Ground') {
        usedAttacksPlayer.push('Ground');
        console.log(usedAttacksPlayer);
        button.style.background = 'gray';
        button.disabled = true;
      }
      randomAttackEnemy();
    });
  });
}

function selectionPetEnemy() {
  let numberEnemy = random(0, mokepones.length - 1);

  petEnemy.innerHTML = mokepones[numberEnemy].name;
  attacksMokeponEnemy = mokepones[numberEnemy].attacks;
  secuenceAttacks();

  return petEnemy;
}

function randomAttackEnemy() {
  startMessage.style.display = 'none';

  let randomAttack = random(0, attacksMokeponEnemy.length - 1);

  if (randomAttack == 0 || randomAttack == 1) {
    attackEnemy.push('Fire');
  } else if (randomAttack == 3 || randomAttack == 4) {
    attackEnemy.push('Water');
  } else {
    attackEnemy.push('Ground');
  }
  console.log(attackEnemy);
  startBattle();
  //   createMessage();
}

function startBattle() {
  if (usedAttacksPlayer.length === 5) {
    combatResult();
  }
}

function createMessage(result) {
  //   let paragraph = document.createElement('p');

  let newAttackPlayer = document.createElement('p');
  let newAttackEnemy = document.createElement('p');

  resultDiv.innerHTML = result;
  newAttackPlayer.innerHTML = indexAttackPlayer;
  newAttackEnemy.innerHTML = indexAttackEnemy;

  attackPlayerDiv.appendChild(newAttackPlayer);
  attackEnemyDiv.appendChild(newAttackEnemy);
}

function indexBothOponents(player, enemy) {
  indexAttackPlayer = usedAttacksPlayer[player];
  indexAttackEnemy = attackEnemy[enemy];
}

function combatResult() {
  for (let index = 0; index < usedAttacksPlayer.length; index++) {
    // console.log(usedAttacksPlayer[index])
    if (usedAttacksPlayer[index] === attackEnemy[index]) {
      indexBothOponents(index, index);
      createMessage('DRAW');
    } else if (
      usedAttacksPlayer[index] == 'Fire' &&
      attackEnemy[index] == 'Ground'
    ) {
      indexBothOponents(index, index);
      createMessage('YOU WIN');
      victoriesPlayer++;
      petPlayerLife.innerHTML = victoriesPlayer;
    } else if (
      usedAttacksPlayer[index] == 'Water' &&
      attackEnemy[index] == 'Fire'
    ) {
      indexBothOponents(index, index);
      createMessage('YOU WIN');
      victoriesPlayer++;
      petPlayerLife.innerHTML = victoriesPlayer;
    } else if (
      usedAttacksPlayer[index] == 'Ground' &&
      attackEnemy[index] == 'Water'
    ) {
      indexBothOponents(index, index);
      createMessage('YOU WIN');
      victoriesPlayer++;
      petPlayerLife.innerHTML = victoriesPlayer;
    } else {
      indexBothOponents(index, index);
      createMessage('YOU LOSE');
      victoriesEnemy++;
      petEnemyLife.innerHTML = victoriesEnemy;
    }
    petPlayerLife.innerHTML = victoriesPlayer;
    petEnemyLife.innerHTML = victoriesEnemy;
  }
  checkLife();
}

function checkLife() {
  if (victoriesPlayer == victoriesEnemy) {
    finalMessage('ITs A DRAW');
  } else if (victoriesPlayer > victoriesEnemy) {
    finalMessage('YEEEES YOU WIN');
  } else {
    finalMessage('SORRY YOU LOSE');
  }
}

function reset() {
  location.reload();
}

window.addEventListener('load', startGame);
