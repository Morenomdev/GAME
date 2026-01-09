// HTML VARIABLES
const sectionSelectAttack = document.getElementById('select-attack');
const sectionReset = document.getElementById('section-reset');
const divMessage = document.getElementById('messages');
const divLifes = document.getElementById('card-attack-div');
const buttonPetPlayer = document.getElementById('button-pet');
const buttonFire = document.getElementById('button__fire');
const buttonWater = document.getElementById('button__water');
const buttonGround = document.getElementById('button__ground');
const buttonReset = document.getElementById('button-reset');
const inputChamaleon = document.getElementById('chamaleon');
const inputTurtle = document.getElementById('turtle');
const inputBasur = document.getElementById('basur');
const spanPetPlayer = document.getElementById('pet__player');
const sectionSelectPet = document.getElementById('select-pet');
const startMessage = document.getElementById('start-message');
const resultDiv = document.getElementById('result-div');
const attackPlayerDiv = document.getElementById('attackPlayer-div');
const attackEnemyDiv = document.getElementById('attackEnemy-div');
const petEnemy = document.getElementById('pet__enemy');

let petSelected = '';
let attackPlayer = '';
let attackEnemy = '';
let result = '';
let petPlayerLife = 3;
let petEnemyLife = 3;

function startGame() {
  sectionSelectAttack.style.display = 'none';

  sectionReset.style.display = 'none';

  divMessage.style.display = 'none';

  divLifes.style.display = 'none';

  buttonPetPlayer.addEventListener('click', selectionPetPlayer);

  buttonFire.addEventListener('click', attackFire);

  buttonWater.addEventListener('click', attackWater);

  buttonGround.addEventListener('click', attackGround);

  document.getElementById('enemy-pet-life').innerHTML = petEnemyLife;
  document.getElementById('player-pet-life').innerHTML = petPlayerLife;

  buttonReset.addEventListener('click', reset);
}

function finalMessage(finalMessage) {
  //   let paragraph = document.createElement('p');
  let divMessage = document.getElementById('result-div');
  divMessage.innerHTML = finalMessage;

  buttonPetPlayer.disabled = true;

  buttonFire.disabled = true;

  buttonWater.disabled = true;

  buttonGround.disabled = true;

  sectionReset.style.display = 'flex';
  //   sectionReset.style.display = 'flex'

  //   sectionReset.style.display = 'none';
}

function attackFire() {
  attackPlayer = 'FIRE';
  spanAttackEnemy();
}
function attackWater() {
  attackPlayer = 'WATER';
  spanAttackEnemy();
}
function attackGround() {
  attackPlayer = 'GROUND';
  spanAttackEnemy();
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectionPetPlayer() {
  //   let petEnemy =
  if (
    inputChamaleon.checked == false &&
    inputTurtle.checked == false &&
    inputBasur.checked == false
  ) {
    alert('You should select a pet');
  } else {
    divMessage.style.display = 'flex';
    sectionSelectAttack.style.display = 'flex';

    sectionSelectPet.style.display = 'none';

    divLifes.style.display = 'grid';

    if (inputChamaleon.checked) {
      petSelected = 'chamaleon';
      spanPetPlayer.innerHTML = 'Chamaleon';
    } else if (inputTurtle.checked) {
      petSelected = 'turtle';
      spanPetPlayer.innerHTML = 'Turtle';
    } else if (inputBasur.checked) {
      petSelected = 'basur';
      spanPetPlayer.innerHTML = 'Basur';
    } else {
      alert('You should select a pet');
    }
    selectionPetEnemy();
    return petSelected;
  }
}

function selectionPetEnemy() {
  let numberEnemy = random(1, 3);
  if (numberEnemy == 1) {
    petEnemy.innerHTML = 'Chamaleon';
  } else if (numberEnemy == 2) {
    petEnemy.innerHTML = 'Turtle';
  } else if (numberEnemy == 3) {
    petEnemy.innerHTML = 'Basur';
  }

  return petEnemy;
}

function spanAttackEnemy() {
  startMessage.style.display = 'none';
  let numberEnemy = random(1, 3);
  if (numberEnemy == 1) {
    attackEnemy = 'FIRE';
  } else if (numberEnemy == 2) {
    attackEnemy = 'WATER';
  } else if (numberEnemy == 3) {
    attackEnemy = 'GROUND';
  }
  combatResult();
  createMessage();
}

function createMessage() {
  //   let paragraph = document.createElement('p');

  resultDiv.innerHTML = result;
  let newAttackPlayer = document.createElement('p');
  let newAttackEnemy = document.createElement('p');
  newAttackPlayer.innerHTML = attackPlayer;
  newAttackEnemy.innerHTML = attackEnemy;

  //   paragraph.innerHTML =
  //     'Your pet attacks with ' +
  //     attackPlayer +
  //     ', pet of enemy attacks with ' +
  //     attackEnemy +
  //     ' - ' +
  //     result;
  attackPlayerDiv.appendChild(newAttackPlayer);
  attackEnemyDiv.appendChild(newAttackEnemy);
  checkLife();
}

function combatResult() {
  if (attackEnemy == attackPlayer) {
    result = 'DRAW';
  } else if (attackPlayer == 'FIRE' && attackEnemy == 'GROUND') {
    result = 'YOU WIN';
    petEnemyLife--;
  } else if (attackPlayer == 'WATER' && attackEnemy == 'FIRE') {
    result = 'YOU WIN';
    petEnemyLife--;
  } else if (attackPlayer == 'GROUND' && attackEnemy == 'WATER') {
    result = 'YOU WIN';
    petEnemyLife--;
  } else {
    result = 'YOU LOSE';
    petPlayerLife--;
  }
  document.getElementById('enemy-pet-life').innerHTML = petEnemyLife;
  document.getElementById('player-pet-life').innerHTML = petPlayerLife;
}

function checkLife() {
  if (petEnemyLife == 0) {
    finalMessage('CONGRATULATIONS YOU WIN');
    // alert('YOU WIN');
    // reset();
  } else if (petPlayerLife == 0) {
    finalMessage('SORRY YOU LOSE');
    // reset();

    // alert('YOU LOSE');
  }
}

function reset() {
  location.reload();
}

window.addEventListener('load', startGame);
