/* ==========================================================================
   🧠 SCRIPT.JS — LE CERVEAU & MOTEUR DU JEU PIXELQUEST
   Rôle pédagogique : Gère les règles du jeu, le synthétiseur de sons 8-bit,
   l'XP et les sauvegardes localStorage, le combat contre les Boss, le mini-jeu
   d'arcade et les Easter Eggs (Danse Pixel & Code Konami).
   ========================================================================== */

/* ==========================================================================
   🔊 1. SYNTHÉTISEUR AUDIO 8-BIT (Web Audio API — Zéro fichier MP3 externe)
   Son coupé par défaut pour la politesse web (§9), activable en 1 clic !
   ========================================================================== */
let soundEnabled = false;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function play8BitSound(type) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const playTone = (freq, startOffset, duration, wave = "square", vol = 0.08) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now + startOffset);
    gain.gain.setValueAtTime(vol, now + startOffset);
    gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + startOffset);
    osc.stop(now + startOffset + duration);
  };

  if (type === "coin") {
    playTone(987.77, 0, 0.08, "square", 0.1);
    playTone(1318.51, 0.08, 0.28, "square", 0.1);
  } else if (type === "step") {
    playTone(260, 0, 0.05, "triangle", 0.07);
    playTone(340, 0.06, 0.06, "triangle", 0.07);
  } else if (type === "hit") {
    playTone(190, 0, 0.09, "sawtooth", 0.1);
    playTone(120, 0.05, 0.09, "square", 0.1);
  } else if (type === "unlock") {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, i * 0.08, 0.16, "square", 0.09));
  } else if (type === "rainbow") {
    [440, 554.37, 659.25, 880, 659.25, 880, 1108.73].forEach((f, i) =>
      playTone(f, i * 0.09, 0.14, "square", 0.09)
    );
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("btnSoundToggle");
  if (soundEnabled) {
    initAudio();
    btn.textContent = "🔊 Son: ON";
    btn.classList.add("active-toggle");
    play8BitSound("coin");
  } else {
    btn.textContent = "🔇 Son: OFF";
    btn.classList.remove("active-toggle");
  }
}

/* ==========================================================================
   📈 2. SYSTÈME D'XP, NIVEAUX & BADGES EN LOCALSTORAGE
   ========================================================================== */
const STORAGE_KEY = "maxence_pixelquest_save_v1";
let gameState = {
  xp: 0,
  visitedZones: [],
  unlockedBosses: [],
  foundAbsurdFact: false,
  foundSecretTreasure: false,
  triggeredDance: false,
  triggeredKonami: false,
  miniGameBest: 120
};

const ALL_BADGES = [
  { id: "explorer", emoji: "🧭", nom: "Explorateur", desc: "Visiter les 4 zones de la carte" },
  { id: "bossSlayer", emoji: "⚔️", nom: "Chasseur de Boss", desc: "Débloquer les 3 projets de Maxence" },
  { id: "detective", emoji: "🕵️", nom: "Détective Fun", desc: "Démasquer le fait absurde" },
  { id: "treasure", emoji: "💎", nom: "Chasseur de Trésor", desc: "Ouvrir le coffre secret du Boss Final" },
  { id: "dancer", emoji: "🕺", nom: "Danseur Pixel", desc: "Cliquer 5 fois sur l'avatar de Maxence" },
  { id: "konami", emoji: "🌈", nom: "Maître Konami", desc: "Activer le mode Rainbow" }
];

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      gameState = { ...gameState, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Mode navigation privée : sauvegarde temporaire en mémoire.");
  }
  updateHudUI();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (e) {}
  updateHudUI();
}

function addXP(amount, reasonText) {
  gameState.xp += amount;
  saveState();
  showToast(`+${amount} XP — ${reasonText}`);
  play8BitSound("unlock");
}

function getHeroRank(xp) {
  if (xp >= 100) return "Niv. 5 — Légende de l'Arcade 🏆";
  if (xp >= 70)  return "Niv. 4 — Maître du Pixel ⚡";
  if (xp >= 40)  return "Niv. 3 — Chevalier du Code 🗡️";
  if (xp >= 20)  return "Niv. 2 — Explorateur Rétro 🧭";
  return "Niv. 1 — Héros en herbe 🌱";
}

function updateHudUI() {
  document.getElementById("heroNameDisplay").textContent = USER_DATA.pseudo;
  document.getElementById("heroRankDisplay").textContent = getHeroRank(gameState.xp);
  const pct = Math.min(100, Math.round((gameState.xp / 100) * 100));
  document.getElementById("xpCounterText").textContent = `${gameState.xp} / 100 XP`;
  document.getElementById("xpBarFill").style.width = `${pct}%`;

  // Mise à jour des pastilles de la carte du monde
  ["about", "projects", "scores", "contact"].forEach((zone) => {
    const node = document.getElementById(`node-${zone}`);
    const pill = document.getElementById(`pill-${zone}`);
    if (node && pill) {
      if (gameState.visitedZones.includes(zone)) {
        node.classList.add("visited");
        pill.textContent = "✓ VISITÉ";
      } else {
        node.classList.remove("visited");
        pill.textContent = "+10 XP";
      }
    }
  });

  const countEl = document.getElementById("zonesCountText");
  if (countEl) {
    countEl.textContent = `${gameState.visitedZones.length} / 4`;
  }

  renderBadges();
}

function showToast(msg) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "xp-toast";
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3300);
}

/* ==========================================================================
   🗺️ 3. NAVIGATION ENTRE L'ACCUEIL, LA CARTE ET LES 4 NIVEAUX
   ========================================================================== */
function switchScreen(screenId) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");

  const btnGoMap = document.getElementById("btnGoMap");
  btnGoMap.style.display = screenId === "screenStart" || screenId === "screenMap" ? "none" : "inline-flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startGame() {
  if (!soundEnabled) {
    toggleSound();
  } else {
    play8BitSound("coin");
  }
  spawnConfetti();
  showWorldMap();
}

function showWorldMap() {
  play8BitSound("step");
  switchScreen("screenMap");
}

function travelToZone(zoneKey, leftPct, topPct) {
  const hero = document.getElementById("mapHero");
  play8BitSound("step");

  if (hero) {
    hero.classList.add("walking");
    hero.style.left = `${leftPct}%`;
    hero.style.top = `${topPct}%`;
  }

  setTimeout(() => {
    if (hero) hero.classList.remove("walking");

    // +10 XP à la première visite de chaque zone (§5 & §11)
    if (!gameState.visitedZones.includes(zoneKey)) {
      gameState.visitedZones.push(zoneKey);
      addXP(10, `Zone découverte : ${zoneKey.toUpperCase()}`);
      spawnConfetti();

      // Vérifie si les 4 zones sont explorées -> Badge Explorateur !
      if (gameState.visitedZones.length === 4) {
        setTimeout(() => {
          addXP(20, "BADGE DÉBLOQUÉ : Explorateur Légendaire 🧭 !");
          spawnConfetti();
        }, 600);
      }
    } else {
      updateHudUI();
    }

    switchScreen(`screen-${zoneKey}`);
  }, 550);
}

/* ==========================================================================
   🧱 4. GÉNÉRATION DYNAMIQUE DES CONTENUS DEPUIS USER-DATA.JS
   ========================================================================== */
function initContent() {
  // 1. Stats RPG
  const statsContainer = document.getElementById("statsContainer");
  statsContainer.innerHTML = USER_DATA.stats
    .map(
      (st) => `
      <div class="stat-row">
        <div class="stat-label">
          <span>${st.nom}</span>
          <span style="color:${st.couleur}">${st.valeur} / 100</span>
        </div>
        <div class="stat-bar-bg">
          <div class="stat-bar-fill" style="width:${st.valeur}%; background:${st.couleur};"></div>
        </div>
      </div>
    `
    )
    .join("");

  // Hobbies
  const hobbiesContainer = document.getElementById("hobbiesContainer");
  hobbiesContainer.innerHTML = USER_DATA.hobbies
    .map((h) => `<span class="hobby-pill">${h}</span>`)
    .join("");

  // 5 Faits Fun (dont 1 absurde)
  const factsContainer = document.getElementById("factsContainer");
  factsContainer.innerHTML = USER_DATA.faitsFun
    .map(
      (f, idx) => `
      <div class="fact-card clickable" id="fact-${idx}" onclick="checkAbsurdFact(${idx})">
        <span class="fact-num">FAIT #${idx + 1}</span>
        <p>${f.texte}</p>
      </div>
    `
    )
    .join("");

  // 2. Projets / Boss à débloquer
  renderBossProjects();

  // 3. Tableau des High Scores IRL
  const hsTable = document.getElementById("highScoresTable");
  hsTable.innerHTML = `
    <thead>
      <tr>
        <th>DÉFI / CATÉGORIE</th>
        <th>SCORE DE ${USER_DATA.pseudo}</th>
        <th>RANG</th>
      </tr>
    </thead>
    <tbody>
      ${USER_DATA.highScores
        .map(
          (row) => `
        <tr>
          <td>${row.categorie}</td>
          <td style="color:var(--neon-cyan); font-weight:bold;">${row.record}</td>
          <td style="font-family:var(--font-pixel); font-size:9px; color:var(--neon-yellow);">${row.rang}</td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;

  document.getElementById("mgBest").textContent = gameState.miniGameBest;
}

// Mini-jeu de détection du fait absurde dans "Qui suis-je ?"
function checkAbsurdFact(index) {
  const fact = USER_DATA.faitsFun[index];
  const card = document.getElementById(`fact-${index}`);
  const feedback = document.getElementById("absurdFeedback");

  if (fact.estAbsurde) {
    card.classList.add("correct-absurd");
    feedback.style.color = "var(--neon-green)";
    feedback.textContent = "🎉 BIEN JOUÉ ! Le vélociraptor mangeur de brocolis était évidemment FAUX !";
    spawnConfetti();
    if (!gameState.foundAbsurdFact) {
      gameState.foundAbsurdFact = true;
      addXP(15, "Détective : Fait absurde démasqué !");
    } else {
      play8BitSound("unlock");
    }
  } else {
    card.classList.add("wrong-absurd");
    feedback.style.color = "var(--neon-pink)";
    feedback.textContent = `❌ Eh non ! Ce fait-là sur ${USER_DATA.pseudo} est 100 % VRAI ! Cherche encore...`;
    play8BitSound("hit");
  }
}

// Gestion des Boss de Projets (3 clics pour briser le bouclier de chaque Boss)
const bossHpState = { proj1: 3, proj2: 3, proj3: 3 };

function renderBossProjects() {
  const container = document.getElementById("bossProjectsContainer");
  container.innerHTML = USER_DATA.projets
    .map((p) => {
      const isUnlocked = gameState.unlockedBosses.includes(p.id);
      const hp = isUnlocked ? 0 : bossHpState[p.id];
      const hpPct = Math.round((hp / 3) * 100);
      return `
      <div class="boss-card ${isUnlocked ? "unlocked" : ""}" id="bosscard-${p.id}">
        <div>
          <div class="boss-header">
            <div class="boss-icon-box">${p.iconeBoss}</div>
            <div>
              <div style="font-family:var(--font-pixel); font-size:10px; color:var(--neon-pink);">${p.nomBoss}</div>
              <div style="font-size:24px; font-weight:bold; color:var(--neon-yellow);">${p.titreProjet}</div>
            </div>
          </div>

          <!-- Zone Verrouillée (Combat contre le Boss) -->
          <div class="boss-lock-zone">
            <p style="color:var(--text-muted); font-size:20px;">${p.defi}</p>
            <div class="boss-hp-track">
              <div class="boss-hp-fill" id="hpfill-${p.id}" style="width:${hpPct}%;"></div>
            </div>
            <button class="pixel-btn clickable" style="width:100%; justify-content:center; background:var(--neon-pink); color:#fff; margin-top:8px;"
                    onclick="attackBoss('${p.id}')">
              ⚔️ ATTAQUER LE BOSS (${hp}/3 PV)
            </button>
          </div>

          <!-- Zone Débloquée (Détails du Projet) -->
          <div class="boss-project-details">
            <span style="display:inline-block; background:rgba(56,239,125,0.18); border:2px solid var(--neon-green); padding:3px 10px; font-family:var(--font-pixel); font-size:8px; color:var(--neon-green); margin-bottom:10px;">
              ✓ BOSS VAINCU • ${p.badgeTech}
            </span>
            <p style="font-size:22px; margin-bottom:12px;">${p.description}</p>
            <div style="font-family:var(--font-pixel); font-size:9px; color:var(--neon-cyan);">
              🌟 PROJET CRÉÉ PAR ${USER_DATA.pseudo}
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

function attackBoss(projId) {
  if (gameState.unlockedBosses.includes(projId)) return;
  bossHpState[projId] = Math.max(0, bossHpState[projId] - 1);
  play8BitSound("hit");

  if (bossHpState[projId] === 0) {
    gameState.unlockedBosses.push(projId);
    spawnConfetti();
    addXP(15, "Projet Boss débloqué !");
    if (gameState.unlockedBosses.length === USER_DATA.projets.length) {
      setTimeout(() => addXP(20, "BADGE : Tous les Boss sont vaincus ⚔️ !"), 500);
    }
  }
  renderBossProjects();
}

// Affichage des Badges
function renderBadges() {
  const container = document.getElementById("badgesContainer");
  if (!container) return;

  const earnedMap = {
    explorer: gameState.visitedZones.length >= 4,
    bossSlayer: gameState.unlockedBosses.length >= 3,
    detective: gameState.foundAbsurdFact,
    treasure: gameState.foundSecretTreasure,
    dancer: gameState.triggeredDance,
    konami: gameState.triggeredKonami
  };

  container.innerHTML = ALL_BADGES.map((b) => {
    const isEarned = earnedMap[b.id];
    return `
      <div class="badge-item ${isEarned ? "earned" : ""}" title="${b.desc}">
        <span class="badge-emoji">${b.emoji}</span>
        <span class="badge-name">${b.nom}</span>
        <span style="font-size:15px; color:var(--text-muted);">${isEarned ? "DÉBLOQUÉ !" : "🔒 Secret"}</span>
      </div>
    `;
  }).join("");
}

/* ==========================================================================
   🕹️ 5. VRAI MINI-JEU D'ARCADE : "MAXENCE ASTRO-DODGE" (Zone 3)
   ========================================================================== */
let mgRunning = false;
let mgScore = 0;
let mgPlayerX = 140;
let mgItems = [];
let mgAnimId = null;

function startMiniGame() {
  const canvas = document.getElementById("arcadeCanvas");
  if (!canvas) return;
  mgRunning = true;
  mgScore = 0;
  mgPlayerX = 140;
  mgItems = [];
  document.getElementById("mgScore").textContent = "0";
  document.getElementById("btnStartMiniGame").textContent = "🔄 REJOUER";
  play8BitSound("coin");
  if (mgAnimId) cancelAnimationFrame(mgAnimId);
  loopMiniGame();
}

function moveMiniPlayer(dir) {
  mgPlayerX = Math.max(10, Math.min(284, mgPlayerX + dir * 28));
}

function loopMiniGame() {
  if (!mgRunning) return;
  const canvas = document.getElementById("arcadeCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#050611";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grille rétro au sol
  ctx.strokeStyle = "rgba(0, 245, 212, 0.2)";
  ctx.beginPath();
  ctx.moveTo(0, 200);
  ctx.lineTo(320, 200);
  ctx.stroke();

  // Apparition d'étoiles (bonus) et météorites (danger)
  if (Math.random() < 0.065) {
    mgItems.push({
      x: Math.random() * 290 + 10,
      y: -15,
      speed: 2.1 + Math.random() * 1.8,
      isStar: Math.random() > 0.35
    });
  }

  // Dessiner Maxence (vaisseau/héros cyan & or)
  ctx.fillStyle = "#00f5d4";
  ctx.fillRect(mgPlayerX, 182, 26, 16);
  ctx.fillStyle = "#fee440";
  ctx.fillRect(mgPlayerX + 6, 176, 14, 6);

  // Mise à jour des objets
  for (let i = mgItems.length - 1; i >= 0; i--) {
    const it = mgItems[i];
    it.y += it.speed;

    if (it.isStar) {
      ctx.fillStyle = "#fee440";
      ctx.fillRect(it.x, it.y, 12, 12);
    } else {
      ctx.fillStyle = "#ff2a85";
      ctx.fillRect(it.x, it.y, 14, 14);
    }

    // Collision avec Maxence (Hitbox AABB)
    const hitX = it.x + 12 > mgPlayerX && it.x < mgPlayerX + 26;
    const hitY = it.y + 12 > 176 && it.y < 198;

    if (hitX && hitY) {
      if (it.isStar) {
        mgScore += 10;
        document.getElementById("mgScore").textContent = mgScore;
        play8BitSound("coin");
        if (mgScore > gameState.miniGameBest) {
          gameState.miniGameBest = mgScore;
          document.getElementById("mgBest").textContent = mgScore;
          saveState();
          if (mgScore === 130) {
            addXP(20, "Record de Maxence battu au Mini-Jeu !");
            spawnConfetti();
          }
        }
        mgItems.splice(i, 1);
        continue;
      } else {
        // Fin de partie
        mgRunning = false;
        play8BitSound("hit");
        ctx.fillStyle = "rgba(9, 10, 26, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff2a85";
        ctx.font = "14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("💥 GAME OVER ! SCORE: " + mgScore, 160, 105);
        ctx.fillStyle = "#fee440";
        ctx.fillText("Clique sur REJOUER !", 160, 130);
        return;
      }
    }

    if (it.y > 225) {
      mgItems.splice(i, 1);
    }
  }

  mgAnimId = requestAnimationFrame(loopMiniGame);
}

/* ==========================================================================
   📬 6. ZONE 4 : FORMULAIRE DE CONTACT & COFFRE AU TRÉSOR CACHÉ
   ========================================================================== */
function handleContactSubmit(e) {
  e.preventDefault();
  const pseudo = document.getElementById("senderPseudo").value.trim();
  const quest = document.getElementById("questType").value;
  const msg = document.getElementById("senderMsg").value.trim();

  const confirmBox = document.getElementById("contactConfirmation");
  confirmBox.style.display = "block";
  confirmBox.innerHTML = `
    <div style="font-family:var(--font-pixel); font-size:10px; color:var(--neon-green); margin-bottom:6px;">
      ✅ PARCHEMIN TRANSMIS À ${USER_DATA.pseudo} !
    </div>
    <p><strong>Aventurier :</strong> ${escapeHtml(pseudo)}</p>
    <p><strong>Mission :</strong> ${escapeHtml(quest)}</p>
    <p><strong>Message :</strong> « ${escapeHtml(msg)} »</p>
  `;

  spawnConfetti();
  addXP(10, "Message envoyé au Boss Final !");
  e.target.reset();
}

function openSecretTreasure() {
  const btn = document.getElementById("secretChestBtn");
  const txt = document.getElementById("chestStatusText");
  btn.textContent = "👑";
  txt.innerHTML = `<strong style='color:var(--neon-yellow);'>TRÉSOR LÉGENDAIRE TROUVÉ !</strong> Tu as découvert la Couronne Pixel secrète de ${USER_DATA.pseudo} !`;
  spawnConfetti();

  if (!gameState.foundSecretTreasure) {
    gameState.foundSecretTreasure = true;
    addXP(25, "TRÉSOR CACHÉ DÉCOUVERT 💎 !");
  } else {
    play8BitSound("unlock");
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

/* ==========================================================================
   ✨ 7. EFFETS « WAOUH » & EASTER EGGS (Danse 5 clics, Konami, Jour/Nuit, Curseur)
   ========================================================================== */
// Easter Egg 1 : 5 clics sur l'avatar de Maxence -> Danse Pixel !
let avatarClicks = 0;
function handleAvatarClick() {
  avatarClicks++;
  play8BitSound("step");

  if (avatarClicks >= 5) {
    avatarClicks = 0;
    const targets = [
      document.getElementById("startAvatarBox"),
      document.getElementById("hudAvatarBtn"),
      document.getElementById("mapHero")
    ];
    targets.forEach((el) => {
      if (el) {
        el.classList.add("dancing");
        setTimeout(() => el.classList.remove("dancing"), 4000);
      }
    });
    spawnConfetti();
    if (!gameState.triggeredDance) {
      gameState.triggeredDance = true;
      addXP(15, `EASTER EGG : Danse Pixel de ${USER_DATA.pseudo} 🕺 !`);
    } else {
      showToast(`🕺 ${USER_DATA.pseudo} LANCE SA DANSE PIXEL !`);
      play8BitSound("rainbow");
    }
  } else {
    showToast(`👾 Clic sur ${USER_DATA.pseudo} (${avatarClicks}/5)...`);
  }
}

// Easter Egg 2 : Code Konami (↑ ↑ ↓ ↓ ← → ← → B A) -> Mode Rainbow 10s !
const KONAMI_SEQ = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];
let konamiIndex = 0;

window.addEventListener("keydown", (e) => {
  // Déplacement mini-jeu si actif
  if (mgRunning) {
    if (e.key === "ArrowLeft") moveMiniPlayer(-1);
    if (e.key === "ArrowRight") moveMiniPlayer(1);
  }

  // Raccourcis clavier 1, 2, 3, 4 sur la carte
  const mapScreen = document.getElementById("screenMap");
  if (mapScreen && mapScreen.classList.contains("active")) {
    if (e.key === "1") travelToZone("about", 20, 26);
    if (e.key === "2") travelToZone("projects", 80, 26);
    if (e.key === "3") travelToZone("scores", 22, 77);
    if (e.key === "4") travelToZone("contact", 78, 77);
  }

  // Vérification du Code Konami
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const expected = KONAMI_SEQ[konamiIndex];
  if (key === expected) {
    konamiIndex++;
    if (konamiIndex === KONAMI_SEQ.length) {
      konamiIndex = 0;
      triggerKonamiRainbow();
    }
  } else {
    konamiIndex = key === KONAMI_SEQ[0] ? 1 : 0;
  }
});

function triggerKonamiRainbow() {
  document.body.classList.add("rainbow-mode");
  play8BitSound("rainbow");
  spawnConfetti();

  if (!gameState.triggeredKonami) {
    gameState.triggeredKonami = true;
    addXP(25, "CODE KONAMI : Mode Rainbow 10s activé 🌈 !");
  } else {
    showToast("🌈 KONAMI CODE : MODE RAINBOW 10 SECONDES !");
  }

  setTimeout(() => {
    document.body.classList.remove("rainbow-mode");
  }, 10000);
}

// Mode Jour / Nuit dans le jeu
function toggleDayNight() {
  document.body.classList.toggle("day-mode");
  const isDay = document.body.classList.contains("day-mode");
  const btn = document.getElementById("btnDayNight");
  btn.textContent = isDay ? "☀️ Jour" : "🌙 Nuit";
  play8BitSound("step");
  showToast(isDay ? `☀️ Le soleil se lève sur le royaume de ${USER_DATA.pseudo} !` : "🌙 La nuit étoilée tombe sur PixelQuest !");
}

// Changement de curseur custom (Épée 🗡️ ou Fusée 🚀)
function toggleCursor() {
  const isSword = document.body.classList.contains("cursor-sword");
  document.body.classList.toggle("cursor-sword", !isSword);
  document.body.classList.toggle("cursor-rocket", isSword);
  const btn = document.getElementById("btnCursorToggle");
  btn.textContent = isSword ? "🚀 Fusée" : "🗡️ Épée";
  play8BitSound("step");
}

// Pluie de confettis Pixel-Art
function spawnConfetti() {
  const colors = ["#00f5d4", "#ff2a85", "#fee440", "#9b5de5", "#38ef7d"];
  for (let i = 0; i < 28; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti-pixel";
    conf.style.left = Math.random() * 96 + "vw";
    conf.style.top = Math.random() * 35 + 10 + "vh";
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.animationDuration = 1 + Math.random() * 1.1 + "s";
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 2200);
  }
}

function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
  gameState = {
    xp: 0,
    visitedZones: [],
    unlockedBosses: [],
    foundAbsurdFact: false,
    foundSecretTreasure: false,
    triggeredDance: false,
    triggeredKonami: false,
    miniGameBest: 120
  };
  bossHpState.proj1 = 3;
  bossHpState.proj2 = 3;
  bossHpState.proj3 = 3;
  initContent();
  updateHudUI();
  showToast("🔄 Progression réinitialisée à 0 XP !");
}

// Création des étoiles / nuages en arrière-plan
function initSkyStars() {
  const sky = document.getElementById("skyBg");
  for (let i = 0; i < 32; i++) {
    const st = document.createElement("div");
    st.className = "star";
    st.style.left = Math.random() * 100 + "vw";
    st.style.top = Math.random() * 100 + "vh";
    st.style.animationDelay = Math.random() * 3 + "s";
    sky.appendChild(st);
  }
}

// Initialisation au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
  initSkyStars();
  initContent();
  loadState();

  const hudAvatarBtn = document.getElementById("hudAvatarBtn");
  if (hudAvatarBtn) {
    hudAvatarBtn.addEventListener("click", handleAvatarClick);
  }

  // Contrôle souris & tactile (glisser du doigt) sur le mini-jeu
  const canvas = document.getElementById("arcadeCanvas");
  if (canvas) {
    const updatePlayerFromClientX = (clientX) => {
      if (!mgRunning) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      mgPlayerX = Math.max(10, Math.min(284, (clientX - rect.left) * scaleX - 14));
    };

    canvas.addEventListener("mousemove", (e) => updatePlayerFromClientX(e.clientX));
    canvas.addEventListener("touchmove", (e) => {
      if (!mgRunning || !e.touches[0]) return;
      e.preventDefault();
      updatePlayerFromClientX(e.touches[0].clientX);
    }, { passive: false });
  }
});
