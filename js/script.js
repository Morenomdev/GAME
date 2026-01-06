function startGame() {
  let buttonPetPlayer = document.getElementById('button-pet');
  buttonPetPlayer.addEventListener('click', selectionPetPLayer);
}

function selectionPetPLayer() {
  let petSelected = '';
  let inputChamaleon = document.getElementById('chamaleon');
  let inputTurtle = document.getElementById('turtle');
  let inputBasur = document.getElementById('basur');
  if (inputChamaleon.checked) {
    petSelected = 'chamaleon';
  } else if (inputTurtle.checked) {
    petSelected = 'turtle';
  } else if (inputBasur.checked) {
    petSelected = 'basur';
  } else {
    alert('You should select a pet')
  }
    document.getElementById('pet-player').innerHTML = petSelected ;
  return document.getElementById('pet-player').innerHTML ;
}


if( selectionPetPLayer().length > 0 ){
}



window.addEventListener('load', startGame);
