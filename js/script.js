let attackPlayer = '';
let attackEnemy = '';

function startGame() {
  let buttonPetPlayer = document.getElementById('button-pet');
  buttonPetPlayer.addEventListener('click', selectionPetPlayer);

  let buttonFire = document.getElementById('button__fire');
  buttonFire.addEventListener('click', attackFire);

  let buttonWater = document.getElementById('button__water');
  buttonWater.addEventListener('click', attackWater);

  let buttonGround = document.getElementById('button__ground');
  buttonGround.addEventListener('click', attackGround);
}

function attackFire() {
    attackPlayer = 'Fire';
    spanAttackEnemy();
}
function attackWater() {
    attackPlayer = 'Water';
    spanAttackEnemy();
}
function attackGround() {
    attackPlayer = 'Ground';
    spanAttackEnemy();
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectionPetPlayer() {
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
    attackEnemy = 'Fire';
  } else if (numberEnemy == 2) {
    attackEnemy = 'Water';
  } else if (numberEnemy == 3) {
    attackEnemy = 'Ground';
  }
  createMessage();
}

function createMessage() {
  let paragraph = document.createElement('p');
  let sectionMessages = document.getElementById('messages');
  paragraph.innerHTML = 'Your pet attacks with ' + attackPlayer + ', pet of enemy attacks with ' + attackEnemy;
  sectionMessages.appendChild(paragraph);
}

window.addEventListener('load', startGame);
