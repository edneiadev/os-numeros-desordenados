const questionsByLevel = [
  [
    { prompt: "2.364 + 300 ___ 3 UNIDADES DE MILHAR", answer: "<" },
    { prompt: "4.189 + 900 ___ 5 UNIDADES DE MILHAR", answer: ">" },
    { prompt: "2.999 + 10 ___ 3 UNIDADES DE MILHAR", answer: ">" },
    { prompt: "2.990 + 10 ___ 3 UNIDADES DE MILHAR", answer: "=" },
    { prompt: "2.999 + 1 ___ 3 UNIDADES DE MILHAR", answer: "=" },
    { prompt: "6 UNIDADES DE MILHAR ___ 5.500 + 1.000", answer: "<" },
    { prompt: "6 UNIDADES DE MILHAR ___ 5.500 + 500", answer: "=" },
    { prompt: "8 UNIDADES DE MILHAR ___ 4.200 + 3.800", answer: "=" }
  ],
  [
    { prompt: "30 CENTENAS ___ 3 UNIDADES DE MILHAR", answer: "=" },
    { prompt: "30 CENTENAS ___ 300 UNIDADES", answer: ">" },
    { prompt: "999 + 10 ___ 1 UNIDADE DE MILHAR", answer: ">" },
    { prompt: "999 + 100 ___ 1.099 UNIDADES", answer: "=" },
    { prompt: "999 + 1.002 ___ 2 UNIDADES DE MILHAR", answer: ">" },
    { prompt: "665 + 2 DEZENASS ___ 675 UNIDADES", answer: ">" },
    { prompt: "542 + 2 CENTENAS ___ 842 UNIDADES", answer: "<" },
    { prompt: "135 + 2 CENTENAS ___ 335 UNIDADES", answer: "=" }
  ],
  [
    { prompt: "1 UNIDADE DE MILHAR ___ 400 + 600", answer: "=" },
    { prompt: "2 UNIDADES DE MILHAR ___ 1.550 + 50", answer: "<" },
    { prompt: "3 UNIDADES DE MILHAR ___ 1.500 + 1.500", answer: "=" },
    { prompt: "9 UNIDADES DE MILHAR ___ 5.000 + 5.000", answer: "<" },
    { prompt: "1 UNIDADE DE MILHAR E 5 DEZENAS ___ 1.500 UNIDADES", answer: "<" },
    { prompt: "2 UNIDADES DE MILHAR E 5 UNIDADES ___ 1.000 + 1.500", answer: "<" },
    { prompt: "4 UNIDADES DE MILHAR E 4 CENTENAS ___ 4.400 UNIDADES", answer: "=" },
    { prompt: "6 UNIDADES DE MILHAR E 3 DEZENAS ___ 6.003 UNIDADES", answer: ">" }
  ]
];

const clues = [
  "É O NOME DE UM ANIMAL.",
  "TEM UMA VOGAL REPETIDA.",
  "COMEÇA COM A LETRA P ."
];

const narratives = [
  { image: "./imagens/narrativa1.jpeg", text: "Era para ser um dia tranquilo na cidade de Belo Horizonte." },
  { image: "./imagens/narrativa2.jpeg", text: "Mas uma coisa estranha aconteceu: os números ficaram fora de ordem." },
  { image: "./imagens/narrativa3.jpeg", text: "A cidade virou uma confusão. Ninguém podia comprar, vender ou cozinhar uma receita." },
  { image: "./imagens/narrativa4.jpeg", text: "A sua turma foi chamada para ajudar a solucionar o problema." },
  { image: "./imagens/narrativa5.jpeg", text: "A missão de vocês é descobrir a senha secreta que ordena os números." },
  { image: "./imagens/narrativa6.jpeg", text: "Para isso, é preciso resolver os desafios de matemática." }
];

const feedbackMedia = {
  correct: { image: "./imagens/acerto.jpeg", audio: "./sons/acerto.mp3", title: "Resposta Certa!", text: "Os números começam a voltar para o lugar." },
  wrong: { image: "./imagens/erro.jpeg", audio: "./sons/erro.mp3", title: "Resposta Errada!", text: "A cidade continua confusa. Tente outra carta." },
  timeout: { image: "./imagens/tempo-esgotado.jpeg", audio: "./sons/tempo-esgotado.mp3", title: "Tempo Esgotado!", text: "O relógio venceu essa rodada." },
  clueUnlocked: { image: null, audio: null, title: "Pista Liberada!", text: "" },
  clueBlocked: { image: null, audio: null, title: "Pista Bloqueada!", text: "" },
  victory: { image: "./imagens/vitoria.jpeg", audio: "./sons/vitoria.mp3", title: "Vitória!", text: "Vocês reorganizaram os números e salvaram Belo Horizonte!" },
  defeat: { image: "./imagens/derrota.jpeg", audio: "./sons/derrota.mp3", title: "Senha Incorreta", text: "A senha ainda não está certa. Reúna as pistas e tente de novo." }
};

const state = {
  currentScreen: "screen-start",
  narrativeIndex: 0,
  currentLevel: 0,
  currentQuestion: null,
  currentCardIndex: null,
  currentQuestionIndex: 0,
  usedQuestions: [[], [], []],
  cardResults: [[], [], []],
  correctPerLevel: [0, 0, 0],
  cluesUnlocked: [false, false, false],
  timer: 60,
  timerId: null,
  musicEnabled: true,
  installPrompt: null,
  feedbackContinue: null
};

const elements = {
  screens: [...document.querySelectorAll(".screen")],
  startButton: document.querySelector("#start-button"),
  narrativeImage: document.querySelector("#narrative-image"),
  narrativeText: document.querySelector("#narrative-text"),
  narrativeButton: document.querySelector("#narrative-button"),
  cardsGrid: document.querySelector("#cards-grid"),
  cardsLevelLabel: document.querySelector("#cards-level-label"),
  questionLevel: document.querySelector("#question-level"),
  questionIndex: document.querySelector("#question-index"),
  questionTimer: document.querySelector("#question-timer"),
  questionText: document.querySelector("#question-text"),
  answerButtons: [...document.querySelectorAll(".answer-button")],
  questionCard: document.querySelector("#question-card"),
  feedbackVisual: document.querySelector("#feedback-visual"),
  feedbackTitle: document.querySelector("#feedback-title"),
  feedbackText: document.querySelector("#feedback-text"),
  feedbackButton: document.querySelector("#feedback-button"),
  finalForm: document.querySelector("#final-form"),
  finalInput: document.querySelector("#final-input"),
  cluesList: document.querySelector("#clues-list"),
  endingVisual: document.querySelector("#ending-visual"),
  endingTitle: document.querySelector("#ending-title"),
  endingText: document.querySelector("#ending-text"),
  restartButton: document.querySelector("#restart-button"),
  soundToggle: document.querySelector("#sound-toggle"),
  fullscreenToggle: document.querySelector("#fullscreen-toggle"),
  installButton: document.querySelector("#install-button")
};

const audio = {
  theme: new Audio("./sons/musica-tema.mp3"),
  tick: new Audio("./sons/tic-tac.mp3")
};

audio.theme.loop = true;
audio.theme.volume = 0.35;
audio.tick.volume = 0.3;

function showScreen(screenId) {
  elements.screens.forEach((screen) => screen.classList.toggle("active", screen.id === screenId));
  state.currentScreen = screenId;
}

function startThemeMusic() {
  if (!state.musicEnabled) return;
  audio.theme.currentTime = 0;
  audio.theme.play().catch(() => {});
}

function stopThemeMusic() {
  audio.theme.pause();
}

function playSound(src) {
  if (!state.musicEnabled || !src) return;
  const effect = new Audio(src);
  effect.play().catch(() => {});
}

function playFallbackTone(mode) {
  if (!state.musicEnabled || !window.AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "triangle";
  osc.frequency.value = mode === "good" ? 620 : mode === "bad" ? 220 : 420;
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
  osc.start();
  osc.stop(ctx.currentTime + 0.45);
  osc.onended = () => ctx.close();
}

function setVisual(container, imagePath, fallbackText, tone) {
  container.innerHTML = "";
  if (imagePath) {
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = fallbackText;
    container.appendChild(img);
    return;
  }

  const fallback = document.createElement("div");
  fallback.className = `feedback-fallback ${tone}`;
  fallback.textContent = fallbackText;
  container.appendChild(fallback);
}

function renderNarrative() {
  const item = narratives[state.narrativeIndex];
  elements.narrativeImage.src = item.image;
  elements.narrativeImage.alt = `Ilustração da narrativa ${state.narrativeIndex + 1}`;
  elements.narrativeText.textContent = item.text;
  elements.narrativeButton.textContent = state.narrativeIndex === narratives.length - 1 ? "Começar o jogo" : "Continuar";
  showScreen("screen-narrative");
}

function shuffleQuestions(level) {
  return [...questionsByLevel[level]].sort(() => Math.random() - 0.5);
}

function resetGame() {
  state.narrativeIndex = 0;
  state.currentLevel = 0;
  state.currentQuestion = null;
  state.currentCardIndex = null;
  state.currentQuestionIndex = 0;
  state.usedQuestions = [shuffleQuestions(0), shuffleQuestions(1), shuffleQuestions(2)];
  state.cardResults = [Array(8).fill(null), Array(8).fill(null), Array(8).fill(null)];
  state.correctPerLevel = [0, 0, 0];
  state.cluesUnlocked = [false, false, false];
  clearTimer();
  renderCards();
  renderClues();
}

function renderCards() {
  elements.cardsGrid.innerHTML = "";
  elements.cardsLevelLabel.textContent = `Nível ${state.currentLevel + 1}`;
  for (let i = 0; i < 8; i += 1) {
    const result = state.cardResults[state.currentLevel][i];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `play-card shuffle${result ? ` resolved ${result}` : ""}`;
    button.disabled = Boolean(result);
    button.innerHTML = `<div class="card-number">${i + 1}</div><span>♥</span><div class="card-corner">${i + 1}</div>${result ? `<div class="card-result">${result === "correct" ? "RESPOSTA CERTA" : result === "wrong" ? "RESPOSTA ERRADA" : "TEMPO ESGOTADO"}</div>` : ""}`;
    button.addEventListener("animationend", () => button.classList.remove("shuffle"), { once: true });
    button.addEventListener("click", () => chooseCard(i));
    elements.cardsGrid.appendChild(button);
  }
}

function chooseCard(cardIndex) {
  const levelDeck = state.usedQuestions[state.currentLevel];
  if (!levelDeck.length) {
    finishLevel();
    return;
  }

  state.currentCardIndex = cardIndex;
  state.currentQuestion = levelDeck.shift();
  state.currentQuestionIndex += 1;
  renderCards();
  elements.questionLevel.textContent = `Nível ${state.currentLevel + 1}`;
  elements.questionIndex.textContent = `Questão ${state.currentQuestionIndex}`;
  elements.questionText.textContent = state.currentQuestion.prompt;
  elements.questionCard.classList.remove("flipped");
  elements.answerButtons.forEach((button) => { button.disabled = true; });
  showScreen("screen-question");

  setTimeout(() => {
    elements.questionCard.classList.add("flipped");
    elements.answerButtons.forEach((button) => { button.disabled = false; });
  }, 250);

  startTimer();
}

function startTimer() {
  clearTimer();
  state.timer = 60;
  updateTimerDisplay();
  if (state.musicEnabled) {
    audio.tick.currentTime = 0;
    audio.tick.play().catch(() => {});
  }
  state.timerId = window.setInterval(() => {
    state.timer -= 1;
    updateTimerDisplay();
    if (state.timer <= 0) handleAnswer(null);
  }, 1000);
}

function clearTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
  audio.tick.pause();
  audio.tick.currentTime = 0;
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(state.timer / 60)).padStart(2, "0");
  const seconds = String(state.timer % 60).padStart(2, "0");
  elements.questionTimer.textContent = `${minutes}:${seconds}`;
}

function handleAnswer(answer) {
  clearTimer();
  elements.answerButtons.forEach((button) => { button.disabled = true; });
  if (answer === null) {
    state.cardResults[state.currentLevel][state.currentCardIndex] = "timeout";
    showFeedback("timeout", () => continueAfterQuestion(false));
    return;
  }

  const isCorrect = answer === state.currentQuestion.answer;
  if (isCorrect) state.correctPerLevel[state.currentLevel] += 1;
  state.cardResults[state.currentLevel][state.currentCardIndex] = isCorrect ? "correct" : "wrong";
  showFeedback(isCorrect ? "correct" : "wrong", () => continueAfterQuestion(isCorrect));
}

function continueAfterQuestion() {
  const reachedGoal = state.correctPerLevel[state.currentLevel] >= 5;
  const outOfCards = state.cardResults[state.currentLevel].every(Boolean) || state.usedQuestions[state.currentLevel].length === 0;
  renderCards();
  if (reachedGoal || outOfCards) {
    finishLevel();
    return;
  }
  state.currentCardIndex = null;
  showScreen("screen-cards");
}

function finishLevel() {
  const passed = state.correctPerLevel[state.currentLevel] >= 5;
  if (passed) {
    state.cluesUnlocked[state.currentLevel] = true;
    showFeedback("clueUnlocked", advanceLevel, `Pista ${state.currentLevel + 1}: ${clues[state.currentLevel]}`);
    return;
  }
  showFeedback("clueBlocked", advanceLevel, "Vocês não chegaram a 5 acertos neste nível. A pista ficou bloqueada.");
}

function advanceLevel() {
  if (state.currentLevel === questionsByLevel.length - 1) {
    renderClues();
    showScreen("screen-final");
    return;
  }

  state.currentLevel += 1;
  state.currentQuestionIndex = 0;
  state.currentCardIndex = null;
  renderCards();
  showScreen("screen-cards");
}

function renderClues() {
  elements.cluesList.innerHTML = "";
  clues.forEach((clue, index) => {
    const item = document.createElement("div");
    item.className = `clue-item${state.cluesUnlocked[index] ? "" : " locked"}`;
    item.textContent = state.cluesUnlocked[index] ? `Pista ${index + 1}: ${clue}` : `Pista ${index + 1}: BLOQUEADA`;
    elements.cluesList.appendChild(item);
  });
}

function showFeedback(type, onContinue, customText = "") {
  const item = feedbackMedia[type];
  state.feedbackContinue = onContinue;
  elements.feedbackTitle.textContent = item.title;
  elements.feedbackText.textContent = customText || item.text;
  const tone = type === "correct" || type === "clueUnlocked" ? "good" : type === "wrong" ? "bad" : "warn";
  setVisual(elements.feedbackVisual, item.image, item.title, tone);
  showScreen("screen-feedback");
  if (item.audio) playSound(item.audio);
  else playFallbackTone(tone);
}

function showEnding(type) {
  const item = feedbackMedia[type];
  elements.endingTitle.textContent = item.title;
  elements.endingText.textContent = item.text;
  setVisual(elements.endingVisual, item.image, item.title, type === "victory" ? "good" : "bad");
  showScreen("screen-ending");
  if (item.audio) playSound(item.audio);
}

function handleInstallPrompt(event) {
  event.preventDefault();
  state.installPrompt = event;
  elements.installButton.disabled = false;
  elements.installButton.textContent = "Instalar";
  elements.installButton.title = "Instalar este jogo no celular";
}

async function installApp() {
  if (!state.installPrompt) {
    const isStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone;
    if (isStandalone) {
      elements.installButton.textContent = "Instalado";
      elements.installButton.disabled = true;
      return;
    }
    if (window.location.protocol === "file:") {
      elements.installButton.textContent = "Abra no navegador";
      elements.installButton.title = "A instalação não funciona abrindo o arquivo direto. Abra por um navegador com servidor local ou site publicado.";
      return;
    }
    elements.installButton.textContent = "Menu do navegador";
    elements.installButton.title = "Se a instalação não abrir, use o menu do navegador e escolha Adicionar à tela inicial.";
    return;
  }
  state.installPrompt.prompt();
  await state.installPrompt.userChoice;
  state.installPrompt = null;
  elements.installButton.disabled = true;
  elements.installButton.textContent = "Instalado";
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
}

function toggleSound() {
  state.musicEnabled = !state.musicEnabled;
  elements.soundToggle.textContent = `Som: ${state.musicEnabled ? "On" : "Off"}`;
  if (state.musicEnabled && ["screen-cards", "screen-question", "screen-final"].includes(state.currentScreen)) {
    audio.theme.play().catch(() => {});
  } else if (!state.musicEnabled) {
    stopThemeMusic();
    audio.tick.pause();
  }
}

elements.startButton.addEventListener("click", () => {
  resetGame();
  startThemeMusic();
  renderNarrative();
});

elements.narrativeButton.addEventListener("click", () => {
  if (state.narrativeIndex < narratives.length - 1) {
    state.narrativeIndex += 1;
    renderNarrative();
    return;
  }
  renderCards();
  showScreen("screen-cards");
});

elements.answerButtons.forEach((button) => {
  button.addEventListener("click", () => handleAnswer(button.dataset.answer));
});

elements.feedbackButton.addEventListener("click", () => {
  if (!state.feedbackContinue) return;
  const next = state.feedbackContinue;
  state.feedbackContinue = null;
  next();
});

elements.finalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const guess = elements.finalInput.value.trim().toUpperCase();
  if (guess === "PORCO") showEnding("victory");
  else showEnding("defeat");
});

elements.restartButton.addEventListener("click", () => {
  stopThemeMusic();
  elements.finalInput.value = "";
  showScreen("screen-start");
});

elements.soundToggle.addEventListener("click", toggleSound);
elements.fullscreenToggle.addEventListener("click", toggleFullscreen);
elements.installButton.addEventListener("click", installApp);
window.addEventListener("beforeinstallprompt", handleInstallPrompt);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

window.addEventListener("appinstalled", () => {
  elements.installButton.disabled = true;
  elements.installButton.textContent = "Instalado";
});

renderClues();
