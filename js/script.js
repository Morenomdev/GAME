let attackPlayer = '';
let attackEnemy = '';
let result = '';
let petPlayerLife = 3;
let petEnemyLife = 3;

function startGame() {
  let sectionSelectAttack = document.getElementById('select-attack');
  sectionSelectAttack.style.display = 'none';

  let sectionReset = document.getElementById('section-reset');
  sectionReset.style.display = 'none';

  let buttonPetPlayer = document.getElementById('button-pet');
  buttonPetPlayer.addEventListener('click', selectionPetPlayer);

  let buttonFire = document.getElementById('button__fire');
  buttonFire.addEventListener('click', attackFire);

  let buttonWater = document.getElementById('button__water');
  buttonWater.addEventListener('click', attackWater);

  let buttonGround = document.getElementById('button__ground');
  buttonGround.addEventListener('click', attackGround);

  document.getElementById('enemy-pet-life').innerHTML = petEnemyLife;
  document.getElementById('player-pet-life').innerHTML = petPlayerLife;

  let buttonReset = document.getElementById('button-reset');
  buttonReset.addEventListener('click', reset);

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
  let sectionSelectAttack = document.getElementById('select-attack');
  sectionSelectAttack.style.display = 'block';

  let sectionSelectPet = document.getElementById('select-pet');
  sectionSelectPet.style.display = 'none';

  let petSelected = '';
  let inputChamaleon = document.getElementById('chamaleon');
  let inputTurtle = document.getElementById('turtle');
  let inputBasur = document.getElementById('basur');
  let spanPetPlayer = document.getElementById('pet__player');
  //   let petEnemy =

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

function selectionPetEnemy() {
  let petEnemy = document.getElementById('pet__enemy');
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
  let paragraph = document.createElement('p');
  let sectionMessages = document.getElementById('messages');
  paragraph.innerHTML =
    'Your pet attacks with ' +
    attackPlayer +
    ', pet of enemy attacks with ' +
    attackEnemy +
    ' - ' +
    result;
  sectionMessages.appendChild(paragraph);
  checkLife();
}

function finalMessage(finalMessage) {
  let paragraph = document.createElement('p');
  let sectionMessages = document.getElementById('messages');
  paragraph.innerHTML = finalMessage;
  sectionMessages.appendChild(paragraph);

  let buttonPetPlayer = document.getElementById('button-pet');
  buttonPetPlayer.disabled = true;

  let buttonFire = document.getElementById('button__fire');
  buttonFire.disabled = true;

  let buttonWater = document.getElementById('button__water');
  buttonWater.disabled = true;

  let buttonGround = document.getElementById('button__ground');
  buttonGround.disabled = true;

  let sectionReset = document.getElementById('section-reset');
  sectionReset.style.display = 'block';

  //   sectionReset.style.display = 'none';
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
