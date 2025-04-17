let currentPokemon = "";
let score = 0;
let maxScore = 0;
let guessedCorrectly = false;
let lives = 3;

function getRandomId() {
  return Math.floor(Math.random() * 151) + 1;
}

async function loadPokemon() {
  const id = getRandomId();
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  currentPokemon = data.name.toLowerCase();
  const imageUrl = data.sprites.other["official-artwork"].front_default;

  const img = document.getElementById("pokemon-img");
  img.src = imageUrl;
  img.classList.add("silhouette");

  document.getElementById("guess-input").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").disabled = true;
  guessedCorrectly = false;

  enableInputs();
}

function checkGuess() {
  const userGuess = document.getElementById("guess-input").value.toLowerCase();
  const img = document.getElementById("pokemon-img");

  if (userGuess === currentPokemon) {
    document.getElementById("feedback").textContent = "¡Correcto!";
    img.classList.remove("silhouette");
    guessedCorrectly = true;
    document.getElementById("next-btn").disabled = false;
  } else {
    lives--;
    updateLives();
    if (lives <= 0) {
      document.getElementById("feedback").textContent = "¡Has perdido todas tus vidas! Reinicia para volver a jugar.";
      disableInputs();
    } else {
      document.getElementById("feedback").textContent = `Incorrecto. Te quedan ${lives} vidas.`;
    }
  }
}

function nextPokemon() {
  if (guessedCorrectly) {
    score++;
    updateScore();
    loadPokemon();
  }
}

function restartGame() {
  if (score > maxScore) {
    maxScore = score;
  }
  score = 0;
  lives = 3;
  updateScore();
  updateLives();
  loadPokemon();
}

function updateScore() {
  document.getElementById("score").textContent = `Puntos: ${score} | Máximo: ${maxScore}`;
}

function updateLives() {
  const heart = "❤️".repeat(lives);
  document.getElementById("lives").textContent = `Vidas: ${lives} ${heart}`;
}

function disableInputs() {
  document.getElementById("guess-input").disabled = true;
  document.querySelector('button[onclick="checkGuess()"]').disabled = true;
  document.getElementById("next-btn").disabled = true;
}

function enableInputs() {
  document.getElementById("guess-input").disabled = false;
  document.querySelector('button[onclick="checkGuess()"]').disabled = false;
}

window.onload = () => {
  updateScore();
  updateLives();
  loadPokemon();
};

