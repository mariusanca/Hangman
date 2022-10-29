let inputWord;
let tries = 1;
let foundLetters = 0;
const maxTries = 7;
let usedLetters = new Set();

function changeInsertTab() {
    document.getElementById('insert-tab').innerHTML = `
    <div id="insert-tab">
        <p class="insert-text">Please insert one letter</p>
        <input type="text" class="form-control" id="input-letter" maxlength="1">
        <button type="button" class="btn btn-success" onclick="tryLetter()" id="try-button">Try</button>
        <p id="used-letters"> Letters you have tried: </p>
        <br>
    </div>
    `
}

function displayImage() {
    document.getElementById('image-print').innerHTML = `
    <div class="image" id="image-print">
    <img src="IMG/${tries}.jpg">  
    <br>
    </div>
    `;
}

function displayOutputWord() {
    for (let index = 0; index < inputWord.length; ++index) {
        document.getElementById('display-word').innerHTML += `<span id= "${index}"> _</span>`;
    }
}

function save() {
    inputWord = document.getElementById('input-word').value;
    changeInsertTab();
    displayImage();
    displayOutputWord();
}

function replaceOutputWord(index, letter) {
    document.getElementById(index).innerHTML = `<span id= "${index}"> ${letter}</span>`;
}

function displayWinner() {
    document.getElementById('insert-tab').innerHTML = '<h1 class="winning-message">Congratulations, you WON!</h1';
}

function displayLoose() {
    document.getElementById('insert-tab').innerHTML = `
    <h1 class="loosing-message">
    <p class="loosing-1">No more attempts available.</p>
    <p class="loosing-2">You lost!</p>
    </h1>
    `;
}

function checkLetter(letter) {
    let found = 0;
    for (let index = 0; index < inputWord.length; ++index) {
        if (inputWord[index] == letter) {
            ++found;
            replaceOutputWord(index, letter);
        }
    }
    if (found == 0) {
        ++tries;
        displayImage();
    }
    if (tries == maxTries) {
        displayLoose();
    }
    foundLetters += found;
    if (foundLetters == inputWord.length) {
        displayWinner();
    }
}

function tryLetter() {
    let letter = document.getElementById('input-letter').value;
    if (usedLetters.has(letter)) {
        alert('You already tried this letter! Please insert another letter!')
    } else {
        usedLetters.add(letter);
        checkLetter(letter);
        document.getElementById('used-letters').innerHTML += letter + ' ';
    }
}
