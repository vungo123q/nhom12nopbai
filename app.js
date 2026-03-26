const $ = (id) => document.getElementById(id);

const el = {
  year: $("year"),
  btnCyclePitch: $("btnCyclePitch"),
  btnStart: $("btnStart"),
  btnReset: $("btnReset"),

  homeName: $("homeName"),
  awayName: $("awayName"),
  homeScore: $("homeScore"),
  awayScore: $("awayScore"),
  minute: $("minute"),

  statAttack: $("statAttack"),
  statShots: $("statShots"),
  statPossession: $("statPossession"),

  pitch: $("pitch"),
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// Theme cycling
const pitchThemes = [
  {
    pitch: "#0b5b36",
    pitch2: "#0a4f31",
    pitchLine: "rgba(255, 255, 255, 0.55)",
    pitchGlow: "rgba(42, 255, 170, 0.22)",
  },
  {
    pitch: "#0a3f66",
    pitch2: "#08355b",
    pitchLine: "rgba(186, 230, 253, 0.55)",
    pitchGlow: "rgba(56, 189, 248, 0.22)",
  },
  {
    pitch: "#5b2a0a",
    pitch2: "#4c2308",
    pitchLine: "rgba(255, 231, 200, 0.55)",
    pitchGlow: "rgba(251, 146, 60, 0.20)",
  },
];

let themeIdx = 0;

function applyPitchTheme(theme) {
  document.documentElement.style.setProperty("--pitch", theme.pitch);
  document.documentElement.style.setProperty("--pitch2", theme.pitch2);
  document.documentElement.style.setProperty("--pitchLine", theme.pitchLine);
  document.documentElement.style.setProperty("--pitchGlow", theme.pitchGlow);
}

// Simple match simulation
let running = false;
let tickHandle = null;
let minute = 0;
let home = 0;
let away = 0;

function setScore(h, a) {
  el.homeScore.textContent = String(h);
  el.awayScore.textContent = String(a);
}

function setMinute(m) {
  el.minute.textContent = `${String(m).padStart(2, "0")}'`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStats() {
  // Just for fun: keep values plausible based on scores.
  const diff = Math.abs(home - away);
  const attack = clamp(45 + diff * 5 + randomInt(-8, 8), 15, 90);
  const shots = clamp(5 + diff * 2 + randomInt(-2, 8), 0, 40);
  const poss = clamp(50 + (home >= away ? randomInt(-18, 18) : randomInt(-25, 25)), 10, 90);

  el.statAttack.textContent = `${attack}%`;
  el.statShots.textContent = String(shots);
  el.statPossession.textContent = `${poss}%`;
}

function toggleRunning(next) {
  running = next;
  el.btnStart.textContent = running ? "Đang chạy" : "Bắt đầu";
  el.btnStart.disabled = false;
}

function step() {
  // advance time
  minute += 1;
  setMinute(minute);

  // sometimes score
  const chance = 0.33; // ~1 goal every 3 steps on average
  if (Math.random() < chance) {
    const side = Math.random() < 0.5 ? "home" : "away";
    if (side === "home") home += 1;
    else away += 1;
    setScore(home, away);
  }

  updateStats();

  // stop after 90 minutes demo
  if (minute >= 90) {
    toggleRunning(false);
    clearInterval(tickHandle);
    tickHandle = null;
  }
}

function startMatch() {
  if (running) return;
  toggleRunning(true);

  // Ensure immediate feel
  tickHandle = setInterval(step, 1800);
  step();
}

function resetMatch() {
  toggleRunning(false);
  if (tickHandle) clearInterval(tickHandle);
  tickHandle = null;

  minute = 0;
  home = 0;
  away = 0;
  setMinute(minute);
  setScore(home, away);

  updateStats();
}

function cyclePitch() {
  themeIdx = (themeIdx + 1) % pitchThemes.length;
  applyPitchTheme(pitchThemes[themeIdx]);
}

function init() {
  el.year.textContent = String(new Date().getFullYear());
  setMinute(0);
  setScore(0, 0);
  updateStats();
  applyPitchTheme(pitchThemes[themeIdx]);

  el.btnCyclePitch.addEventListener("click", cyclePitch);
  el.btnStart.addEventListener("click", startMatch);
  el.btnReset.addEventListener("click", resetMatch);
}

init();

