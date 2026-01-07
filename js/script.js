function startGame() {
  let buttonPetPlayer = document.getElementById('button-pet');
  buttonPetPlayer.addEventListener('click', selectionPetPlayer);
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
  if(numberEnemy == 1){
    petEnemy.innerHTML = 'Chamaleon'
  } else if(numberEnemy == 2){
    petEnemy.innerHTML = 'Turtle'
  } else if(numberEnemy == 3){
    petEnemy.innerHTML = 'Basur'
  }

  return petEnemy;
}

window.addEventListener('load', startGame);
