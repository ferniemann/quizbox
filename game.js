const gamesList = document.querySelector("#games");
const screenStart = document.querySelector("#choose-game");
const screenGame = document.querySelector("#question-wrapper");
const btnStart = document.querySelector("#btn-start");
const btnCheck = document.querySelector("#btn-check");
const btnNext = document.querySelector("#btn-next");

const questions = [];

let round = 0;
let correctAnswer = "";

renderStartScreen();

function renderStartScreen() {
    screenStart.hidden = false;
    screenGame.hidden = true;
    btnStart.hidden = false;
    btnCheck.hidden = true;
    btnNext.hidden = true;

    gamesList.addEventListener("change", chooseGame);
    btnStart.addEventListener("click", startGame);
}

function chooseGame(e) {
    if (document.querySelector(".chosen")) {
        const oldChoice = document.querySelector(".chosen");
        oldChoice.classList.remove("chosen");

        styleChosenOption(oldChoice);
    }
    const currentChoice = e.target;
    currentChoice.classList.add("chosen");

    styleChosenOption(currentChoice);
}

function startGame() {
    btnStart.hidden = true;
    btnCheck.hidden = false;
    screenGame.hidden = false;

    const chosenGame = document.querySelector(".chosen").id;
    loadGameData(chosenGame);
}

function loadGameData(game) {
    fetch(`./data/${game}.json`)
        .then((res) => res.json())
        .then((data) => {
            questions.push(...data);
            round = 0;
            renderGame(round);
        });
}

function renderGame(count) {
    screenStart.hidden = true;
    btnCheck.hidden = false;
    btnNext.hidden = true;

    const question = questions[count].question;
    const answers = questions[count].answers;

    const questionWrapper = document.querySelector("#question");
    const answersWrapper = document.querySelector("#answers");

    correctAnswer = answers.slice(0, 1)[0];
    console.log(correctAnswer);

    questionWrapper.innerText = question;
    answersWrapper.innerText = "";

    answers.forEach((answer) => {
        const wrapper = document.createElement("li");
        wrapper.classList.add("answer-wrapper");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.id = createRandomId();
        input.classList.add("answer-input");
        input.dataset.answer = answer;

        const label = document.createElement("label");
        label.setAttribute("for", input.id);
        label.innerText = answer;
        label.classList.add("answer-text");

        wrapper.append(input, label);
        answersWrapper.append(wrapper);
    });

    answersWrapper.addEventListener("change", highlightAnswer);
    btnCheck.addEventListener("click", checkAnswer);
}

function checkAnswer() {
    const choiceField = document.querySelector(".active");
    const chosenAnswer = choiceField.querySelector(".answer-input").dataset.answer;

    if (choiceField) {
        if (chosenAnswer === correctAnswer) {
            choiceField.classList.add("correct");
        } else if (chosenAnswer !== correctAnswer) {
            const correctField = document.querySelector(
                `[data-answer="${correctAnswer}"]`
            ).parentElement;

            choiceField.classList.add("wrong");
            correctField.classList.add("correct");
        }

        choiceField.parentElement.removeEventListener("change", highlightAnswer);
        btnCheck.removeEventListener("click", checkAnswer);

        btnCheck.hidden = true;
        btnNext.hidden = false;

        btnNext.addEventListener("click", nextQuestion);
    }
}

function nextQuestion() {
    round++;

    renderGame(round);
}

function highlightAnswer(e) {
    console.log(e.target);
    if (document.querySelector(".active")) {
        document.querySelector(".active").classList.toggle("active");
    }
    const chosenAnswer = e.target.parentElement;
    chosenAnswer.classList.toggle("active");
}

function styleChosenOption(option) {
    option.parentElement.classList.toggle("choice");
}

function createRandomId() {
    const letters = "qwertzuiopasdfghjklyxcvbnm";
    let id = "";

    for (let i = 0; i < 8; i++) {
        const randomIndex =
            Math.floor(Math.random() * (Math.floor(25) - Math.ceil(0) + 1)) + Math.ceil(0);
        id += letters[randomIndex];
    }

    return id;
}
