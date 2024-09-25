const crosswordGrid = [
    [{ letter: 'v', number: 1 }, {}, {}, {}, {}, {}, {letter: 'B',number: 9}, {letter: 'U'}, {letter: 'G',number: 10}, {}, {}, {}, {}],
    [{ letter: 'I', number: 2 }, {letter: 'N'}, {letter: 'C', number: 5}, {letter: 'O'}, { letter: 'G' }, {letter: 'N'}, {letter: 'I'}, {letter: 'T'}, {letter: 'O'}, {}, {}, {}, {}],
    [{ letter: 'R' }, {}, {letter: 'O'}, {}, { }, {}, {letter: 'N'}, {}, {letter: 'O'}, {}, {letter: 'C',number: 11}, {}, {}],
    [{ letter: 'U' }, {}, {letter: 'F'}, {}, {}, {}, {}, {}, {letter: 'G'}, {}, {letter: 'O'}, {}, {}],
    [{ letter: 'S' }, {}, {letter: 'F',number: 6}, {letter: 'T'}, {letter: 'M', number: 7}, {}, {}, {}, {letter: 'L'}, {}, {letter: 'O'}, {}, {}],
    [{}, {}, { letter: 'E'}, {}, { letter: 'O'}, { }, {}, { }, {letter: 'E'}, {}, {letter: 'K'}, {}, {}],
    [{letter: 'W', number: 3 }, {}, {letter: 'E'}, {}, { letter: 'N'}, {}, {}, {}, {}, {  }, {letter: 'I'}, {}, {}],
    [{letter: 'I'}, {}, {}, { }, { letter: 'D'}, {}, {letter: 'B',number: 12}, {letter: 'A'}, { letter: 'T'}, {letter: 'T'}, {letter: 'E'}, {letter: 'R'}, {letter: 'Y'}],
    [{letter: 'N'}, {}, {}, {}, { letter: 'A',number: 8 }, { letter: 'P'}, { letter: 'P'}, {  letter: 'L'}, { letter: 'E'}, {}, {letter: 'S'}, {}, {}],
    [{letter: 'D'}, {}, {}, {}, { letter: 'Y'}, {}, {}, { }, {}, {}, {}, {}, {}],
    [{letter: 'O'}, {}, {}, {}, {}, {}, {letter: 'B',number: 13}, {letter: 'I'}, {letter: 'T'}, {letter: 'C'}, {letter: 'O'}, {letter: 'I'}, {letter: 'N'}],
    [{letter: 'W',number: 4}, {letter: 'E'}, {letter: 'E'}, {letter: 'K'}, {letter: 'E'}, {letter: 'N'}, {letter: 'D'}, {}, {}, {}, {}, {}, {}],
    [{letter: 'S'}, {}, {}, {}, {}, {}, {}, {}, {letter: 'M',number: 14 }, {letter: 'O'}, {letter: 'U'}, {letter: 'S'}, {letter: 'E'}]
];

const crosswordGridElement = document.getElementById('crossword-grid');
const hintCountElement = document.getElementById('hint-count');
const timerElement = document.getElementById('timer');
let hintCount = 3;
let timerInterval;
let startTime;
let userName;

// Create the grid
crosswordGrid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
        const input = document.createElement('input');
        input.maxLength = 1;
        input.dataset.row = rowIndex;
        input.dataset.col = colIndex;
        if (cell.letter) {
            input.dataset.correct = cell.letter.toUpperCase(); // Ensure the correct answer is in uppercase
            if (cell.number) {
                input.placeholder = cell.number; // Set the placeholder number
            }
        } else {
            input.disabled = true; // Non-fillable blocks
        }
        crosswordGridElement.appendChild(input);
    });
});

// Start the timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Show the start dialog
function showStartDialog() {
    Swal.fire({
        title: "WELCOME TO GANESH'S CROSSWORD GAME",
        input: 'text',
        inputLabel: 'ENTER YOUR NAME',
        inputPlaceholder: 'Enter your name',
        confirmButtonText: 'Start',
        imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRsaXo5bzN6a2Y3d3lraDl1dzAyZTRpY3l1YmZqemQyZDNyajd5MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/36zY31s4bXb8c/giphy.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'WELCOME',
        preConfirm: (name) => {
            if (!name) {
                Swal.showValidationMessage('You need to enter your name');
            }
            return name;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            userName = result.value;
            document.getElementById('game-container').style.display = 'block';
            startTimer();
        }
    });
}

// Check answers
document.getElementById('check-answers').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#crossword-grid input');
    let allCorrect = true;
    inputs.forEach(input => {
        if (!input.disabled) {
            const correctAnswer = input.dataset.correct;
            if (input.value.toUpperCase() !== correctAnswer) {
                input.style.backgroundColor = '#dc3545';
                allCorrect = false;
            } else {
                input.style.backgroundColor = '#28a745';
            }
        }
    });
    if (allCorrect) {
        clearInterval(timerInterval);
        const elapsedTime = timerElement.textContent;
        Swal.fire({
            title: 'Congratulations!',
            text: `${userName}, you solved the crossword in ${elapsedTime}.`,
            imageUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlpb3ZteXNsMm1hNW8xM2JpajNteGlteTRrbnkzaGR5ZmttcXZleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iUOzkJmvnFfqM/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Success',
            confirmButtonText: 'Yay!'
        });
    } else {
        Swal.fire({
            title: 'Oops!',
            text: 'Some answers are incorrect. Please try again.',
            imageUrl: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Qya3U1dGs2Z2lrdGU2aGN3ZWxrczhqM3lsdHh3Z2JpbGMzYXljayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4Zt2BAmW8NNBe/giphy.gif',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Error',
            confirmButtonText: 'Retry'
        });
    }
});

// Reset game
document.getElementById('reset-game').addEventListener('click', () => {
    const inputs = document.querySelectorAll('#crossword-grid input');
    inputs.forEach(input => {
        if (!input.disabled) {
            input.value = '';
            input.style.backgroundColor = '';
        }
    });
    hintCount = 3;
    hintCountElement.textContent = hintCount;
    timerElement.textContent = '00:00';
    clearInterval(timerInterval);
    startTimer();
});

// Provide a hint
document.getElementById('give-hint').addEventListener('click', () => {
    if (hintCount > 0) {
        const inputs = document.querySelectorAll('#crossword-grid input');
        const emptyInputs = Array.from(inputs).filter(input => input.value === '' && !input.disabled);
        if (emptyInputs.length > 0) {
            const randomInput = emptyInputs[Math.floor(Math.random() * emptyInputs.length)];
            randomInput.value = randomInput.dataset.correct;
            randomInput.style.backgroundColor = 'yellow';
            hintCount--;
            hintCountElement.textContent = hintCount;
        }
    } else {
        Swal.fire({
            title: 'No hints left!',
            text: 'You have used all your hints.',
            icon: 'info',
            confirmButtonText: 'Okay'
        });
    }
});

// Show the start dialog when the page loads
window.addEventListener('load', () => {
    showStartDialog();
});