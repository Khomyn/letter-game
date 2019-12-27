const ul = document.getElementById('letter-wrapper');
const button = document.getElementById('button');
const guesses = document.getElementById('guesses');
const guessesNumber = document.getElementById('number');
const liList = ul.getElementsByTagName('li');
const endGame = document.getElementById('end-game');

let attemps = 5;
const puzzle = 'qwerty qwerty'.split('');

const checkIsGuessed = (puzzle) => {
  const letters = [];
  for(i = 0; i < liList.length; i++) {
    if(liList[i].innerText === '') {
      letters.push(' ');
    } else {
      letters.push(liList[i].innerText.toLowerCase());
    }
  }
  const word = letters.join('').toLowerCase();

  console.log(puzzle.join('').toLowerCase())
  console.log(word);
  console.log(puzzle.join('') === word);
//
//   if(puzzle === word) {
//     return true;
//   }
//   return false;

  return puzzle.join('').toLowerCase() === word;
}


const render = (puzzle) => {
  puzzle.forEach( letter => {
    const li = document.createElement('li');
    li.innerText = letter != ' ' ? '*' : letter;
    ul.appendChild(li);
  });
}

const checkAndPrint = (puzzle, char) => {
  let isGuessed = false;

  puzzle.forEach((letter, index) => {

    if(letter.toLowerCase() === char.toLowerCase()) {
      liList[index].innerText = char.toLowerCase();
      isGuessed = true;
    };
  });

  if(!isGuessed) {
    attemps--;
  }
}

const renderMsg = (attemps) => {
  if(checkIsGuessed(puzzle)) {
    guesses.innerHTML = 'You Win!';
    return;
  }

  guesses.innerHTML = attemps > 0 ? `Guesses left: ${attemps}` : `Nice try! The word was "${puzzle.join('')}"`;
}



window.addEventListener('keypress', (event) => {
  console.log(event.key);
  if(attemps <= 0 || checkIsGuessed(puzzle)) {
    renderMsg(attemps);
    return;
  };

  checkAndPrint(puzzle, event.key);
  renderMsg(attemps);
});

renderMsg(attemps);
render(puzzle);