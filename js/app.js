/* =========================================================
   PARA NICOLE — JavaScript
   Todo funciona en GitHub Pages sin backend.
   ========================================================= */

/* ========= PERSONALIZA AQUÍ ========= */

// IMPORTANTE:
// JavaScript cuenta los meses desde 0.
// Enero = 0, febrero = 1, marzo = 2 ... diciembre = 11.
// Ejemplo: 14 de febrero de 2025 -> new Date(2025, 1, 14, 0, 0, 0)
const FECHA_INICIO = new Date(2025, 1, 14, 0, 0, 0);

const NOMBRE_ELLA = "Nicole";
const NOMBRE_TUYO = "Cristhofer";

/* ==================================== */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const introScreen = $("#introScreen");
const enterBtn = $("#enterBtn");
const topbar = $("#topbar");
const music = $("#music");
const musicToggle = $("#musicToggle");
const musicLabel = $("#musicLabel");
const songButton = $("#songButton");
const songStatus = $("#songStatus");
const vinyl = $("#vinyl");
const equalizer = $("#equalizer");

let hasEntered = false;
let musicLoaded = true;

/* ---------- entrada ---------- */

enterBtn.addEventListener("click", async () => {
  hasEntered = true;
  introScreen.classList.add("hide");
  topbar.classList.add("show");

  createHeartBurst(18);

  // Los navegadores suelen permitir audio después de un clic del usuario.
  try {
    await music.play();
    setMusicUI(true);
  } catch (error) {
    // Si todavía no existe el mp3 o el navegador lo bloquea, la web sigue funcionando.
    setMusicUI(false);
  }

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 150);
});

/* ---------- música ---------- */

function setMusicUI(isPlaying) {
  vinyl.classList.toggle("playing", isPlaying);
  equalizer.classList.toggle("playing", isPlaying);
  musicToggle.classList.toggle("playing", isPlaying);
  songButton.textContent = isPlaying ? "⏸ Pausar" : "▶ Reproducir";
  musicLabel.textContent = isPlaying ? "Sonando" : "Música";
}

async function toggleMusic() {
  if (!musicLoaded) {
    songStatus.innerHTML =
      'Añade <strong>assets/music/nuestra-cancion.mp3</strong> y vuelve a cargar la página.';
    return;
  }

  if (music.paused) {
    try {
      await music.play();
      setMusicUI(true);
    } catch {
      setMusicUI(false);
    }
  } else {
    music.pause();
    setMusicUI(false);
  }
}

musicToggle.addEventListener("click", toggleMusic);
songButton.addEventListener("click", toggleMusic);

music.addEventListener("play", () => setMusicUI(true));
music.addEventListener("pause", () => setMusicUI(false));
music.addEventListener("error", () => {
  musicLoaded = false;
  setMusicUI(false);
  songStatus.innerHTML =
    'Todavía no hay canción. Coloca tu MP3 como <strong>assets/music/nuestra-cancion.mp3</strong>.';
});

/* ---------- contador ---------- */

const daysEl = $("#days");
const hoursEl = $("#hours");
const minutesEl = $("#minutes");
const secondsEl = $("#seconds");

function updateCounter() {
  let diff = Date.now() - FECHA_INICIO.getTime();

  if (diff < 0) diff = 0;

  const dayMs = 1000 * 60 * 60 * 24;
  const hourMs = 1000 * 60 * 60;
  const minuteMs = 1000 * 60;

  const days = Math.floor(diff / dayMs);
  const hours = Math.floor((diff % dayMs) / hourMs);
  const minutes = Math.floor((diff % hourMs) / minuteMs);
  const seconds = Math.floor((diff % minuteMs) / 1000);

  daysEl.textContent = days.toLocaleString("es-ES");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

/* ---------- reveal on scroll ---------- */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

$$(".reveal").forEach(el => revealObserver.observe(el));

/* ---------- carta ---------- */

const letterModal = $("#letterModal");
const openLetter = $("#openLetter");
const closeLetter = $("#closeLetter");

function showLetter() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function hideLetter() {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

openLetter.addEventListener("click", showLetter);
closeLetter.addEventListener("click", hideLetter);

$$("[data-close-letter]").forEach(el => {
  el.addEventListener("click", hideLetter);
});

/* ---------- secreto ---------- */

const secretBtn = $("#secretBtn");
const secretModal = $("#secretModal");
const secretClose = $("#secretClose");
const secretOkay = $("#secretOkay");

function showSecret() {
  secretModal.classList.add("open");
  secretModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  createHeartBurst(14);
}

function hideSecret() {
  secretModal.classList.remove("open");
  secretModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

secretBtn.addEventListener("click", showSecret);
secretClose.addEventListener("click", hideSecret);
secretOkay.addEventListener("click", hideSecret);

/* ---------- botón NO travieso ---------- */

const choiceArea = $("#choiceArea");
const noBtn = $("#noBtn");
const yesBtn = $("#yesBtn");
const yesMessage = $("#yesMessage");

let noAttempts = 0;

function moveNoButton() {
  noAttempts += 1;
  noBtn.classList.add("runaway");

  const area = choiceArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, area.width - btn.width);
  const maxY = Math.max(0, area.height - btn.height);

  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY}px`;

  const messages = [
    "¿Segura? 🤨",
    "Piénsalo bien 😂",
    "Esa opción no funciona 😌",
    "Nicoleeee 😭",
    "Solo queda el Sí ❤️"
  ];

  noBtn.textContent = messages[Math.min(noAttempts - 1, messages.length - 1)];
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", event => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

yesBtn.addEventListener("click", () => {
  choiceArea.style.display = "none";
  yesMessage.classList.add("show");
  createHeartBurst(45);
});

/* ---------- corazones ---------- */

const floatingHearts = $("#floatingHearts");

function createFloatingHeart({ burst = false } = {}) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.35 ? "♥" : "♡";

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${12 + Math.random() * 22}px`;
  heart.style.animationDuration = `${burst ? 4 : 7 + Math.random() * 5}s`;
  heart.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);

  floatingHearts.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

function createHeartBurst(amount = 20) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => createFloatingHeart({ burst: true }), i * 55);
  }
}

setInterval(() => {
  if (hasEntered && document.visibilityState === "visible") {
    createFloatingHeart();
  }
}, 1150);

/* ---------- mouse glow ---------- */

const cursorGlow = $("#cursorGlow");

window.addEventListener("pointermove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

/* ---------- parallax suave ---------- */

const parallaxCards = $$(".parallax-card");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  parallaxCards.forEach(card => {
    const speed = Number(card.dataset.speed || 0.04);
    card.style.translate = `0 ${scrollY * speed}px`;
  });

  if (hasEntered && scrollY > 80) {
    topbar.classList.add("show");
  }
});

/* ---------- botones magnéticos (desktop) ---------- */

$$(".magnetic").forEach(button => {
  button.addEventListener("pointermove", e => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

/* ---------- Escape cierra modales ---------- */

window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    hideLetter();
    hideSecret();
  }
});

/* ---------- pequeño detalle de consola ---------- */
console.log(`%c${NOMBRE_TUYO} ♥ ${NOMBRE_ELLA}`, "font-size:22px;color:#bc5367;font-weight:bold;");
console.log("Hecho para funcionar como sitio estático en GitHub Pages.");
