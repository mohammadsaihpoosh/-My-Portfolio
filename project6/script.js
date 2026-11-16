// Storage may be restricted by private browsing or file previews.
function readBootState() { try { return sessionStorage.getItem("ps2ArchiveBooted"); } catch (_) { return null; } }
function writeBootState() { try { sessionStorage.setItem("ps2ArchiveBooted", "yes"); } catch (_) {} }

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const bootScreen = $("#bootScreen");
  const bootProgress = $("#bootProgress");
  const bootText = $("#bootText");
  const skipBoot = $("#skipBoot");
  const toast = $("#toast");

  const gameDialog = $("#gameDialog");
  const fileDialog = $("#fileDialog");

  let bootTimer = null;
  let toastTimer = null;
  let bootFinished = false;
  let selectedGame = null;
  let recoveredFiles = new Set();
  let visitCount = 42;

  const games = {
    blackveil: {
      code: "FILE_001.BIN",
      title: "BLACK VEIL",
      status: "DAMAGED / PARTIAL RECOVERY",
      description:
        "An unverified survival-horror concept associated with a fictional 2004 build. The recovered notes describe an abandoned town, a broken save system and a final area missing from the map.",
      year: "2004?",
      genre: "SURVIVAL HORROR",
      region: "PAL?",
      media: "DVD-ROM",
      image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80"
    },
    roomzero: {
      code: "FILE_002.DAT",
      title: "ROOM ZERO",
      status: "UNKNOWN / UNVERIFIED",
      description:
        "A fictional psychological-horror record. Its imaginary development notes refer to a room that appears only after a console shutdown. No verified release information exists.",
      year: "2002?",
      genre: "PSYCHOLOGICAL",
      region: "NTSC-J?",
      media: "DISC 02",
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80"
    },
    deadchannel: {
      code: "FILE_003.BIN",
      title: "DEAD CHANNEL",
      status: "LOST / FILE HEADER DAMAGED",
      description:
        "An invented archive entry about a television station that broadcasts after midnight. The supposed audio track and level data have not been recovered.",
      year: "2006?",
      genre: "UNKNOWN",
      region: "UNKNOWN",
      media: "NO MANUAL",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80"
    },
    ashfall: {
      code: "FILE_004.IMG",
      title: "ASHFALL PROTOCOL",
      status: "INCOMPLETE / BUILD 0.7",
      description:
        "A fictional tactical-action concept. A fragment of a mission list survives in the archive, but its final mission is absent. The entry is a creative placeholder, not a verified unreleased game.",
      year: "2005?",
      genre: "TACTICAL ACTION",
      region: "UNKNOWN",
      media: "DVD-ROM",
      image:
        "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80"
    },
    morrow: {
      code: "FILE_005.DAT",
      title: "MORROW STATIC",
      status: "CORRUPTED / RECOVERY FAILED",
      description:
        "A fictional role-playing game record. The concept imagines dialogue that changes when a memory card is removed. No actual game or release is being claimed.",
      year: "2003?",
      genre: "RPG",
      region: "NTSC-U?",
      media: "MEMORY CARD",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80"
    },
    whiteout: {
      code: "FILE_006.BIN",
      title: "WHITEOUT",
      status: "PARTIAL / AUDIO MISSING",
      description:
        "An invented horror archive entry built around silent rooms, bright corridors and incomplete level records. Its image is atmospheric reference photography.",
      year: "2001?",
      genre: "HORROR",
      region: "UNKNOWN",
      media: "DISC 01",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80"
    },
    nullcity: {
      code: "FILE_007.MAP",
      title: "NULL CITY",
      status: "UNREADABLE / MAP LOST",
      description:
        "A fictional simulation entry. The imaginary map data points to a city absent from every other file in this invented directory.",
      year: "2007?",
      genre: "SIMULATION",
      region: "UNKNOWN",
      media: "MAP DATA",
      image:
        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80"
    },
    lastsave: {
      code: "FILE_008.SAV",
      title: "LAST SAVE",
      status: "SEALED / DO NOT LOAD",
      description:
        "A fictional save-file record with one remaining slot and a date that appears to be in the future. The details are part of the site's horror-fiction concept.",
      year: "UNKNOWN",
      genre: "ACTION",
      region: "UNKNOWN",
      media: "MEMORY CARD",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80"
    }
  };

  const recoveredFileData = {
    "07": {
      id: "FILE_07.DAT",
      text: [
        "VOICE_03 // PARTIAL TRANSCRIPT",
        "--------------------------------",
        "",
        "[00:00:01] background noise detected",
        "[00:00:05] ...are you still there?",
        "[00:00:08] [AUDIO CORRUPTED]",
        "[00:00:13] do not open the second door",
        "[00:00:16] [SIGNAL LOST]",
        "",
        "END OF RECOVERABLE DATA",
        "",
        "NOTE: FICTIONAL ARCHIVE CONTENT"
      ].join("\n")
    },
    "12": {
      id: "FILE_12.BIN",
      text: [
        "MAP_VOID // RECOVERY REPORT",
        "--------------------------------",
        "",
        "SECTOR 00: READABLE",
        "SECTOR 01: READABLE",
        "SECTOR 02: NULL",
        "SECTOR 03: NULL",
        "SECTOR 04: OUT OF RANGE",
        "",
        "MAP BOUNDS: UNKNOWN",
        "PLAYER POSITION: INVALID",
        "EXIT NODE: NOT FOUND",
        "",
        "RECOVERY ABORTED."
      ].join("\n")
    },
    "19": {
      id: "FILE_19.TXT",
      text: [
        "READ_ME_FINAL.TXT",
        "--------------------------------",
        "",
        "If this file is open, the directory",
        "has loaded successfully.",
        "",
        "You may close the viewer now.",
        "",
        "There is nothing else to recover.",
        "",
        "Seriously.",
        "",
        "[EOF]"
      ].join("\n")
    }
  };

  function notify(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("visible");

    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("visible");
    }, 2600);
  }

  function finishBoot() {
    if (bootFinished) return;
    bootFinished = true;

    window.clearInterval(bootTimer);

    if (bootProgress) bootProgress.style.width = "100%";
    if (bootText) bootText.textContent = "DIRECTORY MOUNTED.";

    window.setTimeout(() => {
      bootScreen?.classList.add("finished");
    }, 250);
  }

  function startBoot() {
    if (!bootScreen || readBootState() === "yes") {
      bootScreen?.classList.add("finished");
      bootFinished = true;
      return;
    }

    let progress = 0;
    const messages = [
      "CHECKING DISC DIRECTORY...",
      "READING MEMORY CARD...",
      "RECOVERING FILE HEADERS...",
      "WARNING: UNKNOWN SECTOR",
      "MOUNTING DIRECTORY..."
    ];

    let messageIndex = 0;

    bootTimer = window.setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 5;
      progress = Math.min(progress, 100);

      if (bootProgress) bootProgress.style.width = `${progress}%`;

      if (progress >= (messageIndex + 1) * 20) {
        if (bootText && messageIndex < messages.length) {
          bootText.textContent = messages[messageIndex];
        }
        messageIndex++;
      }

      if (progress >= 100) {
        writeBootState();
        finishBoot();
      }
    }, 180);
  }

  skipBoot?.addEventListener("click", () => {
    writeBootState();
    finishBoot();
  });

  function openSection(sectionName) {
    const sectionMap = {
      games: "#gamesSection",
      lost: "#lostSection",
      fragments: "#fragmentsSection",
      about: "#aboutSection"
    };

    const targetSelector = sectionMap[sectionName];
    if (!targetSelector) return;

    Object.values(sectionMap).forEach(selector => {
      $(selector)?.classList.add("hidden");
    });

    $(targetSelector)?.classList.remove("hidden");

    $$(".menu-option[data-section]").forEach(button => {
      const isActive = button.dataset.section === sectionName;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (sectionName === "games") {
      $("#archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      $(".main-console")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  $$(".menu-option[data-section]").forEach(button => {
    button.addEventListener("click", () => {
      openSection(button.dataset.section);
    });
  });

  $("#enterArchive")?.addEventListener("click", () => {
    openSection("games");
    notify("DIRECTORY 001 / READY FOR INSPECTION");
  });

  function filterGames() {
    const query = ($("#searchInput")?.value || "").trim().toLowerCase();
    const genre = $("#genreFilter")?.value || "all";
    const entries = $$(".game-entry");
    let visibleCount = 0;

    entries.forEach(entry => {
      const title = (entry.dataset.title || "").toLowerCase();
      const description = (
        $(".entry-description", entry)?.textContent || ""
      ).toLowerCase();

      const matchesText = !query ||
        title.includes(query) ||
        description.includes(query);

      const matchesGenre = genre === "all" ||
        entry.dataset.genre === genre;

      const visible = matchesText && matchesGenre;
      entry.classList.toggle("hidden", !visible);

      if (visible) visibleCount++;
    });

    if ($("#resultLabel")) {
      $("#resultLabel").textContent =
        `${String(visibleCount).padStart(3, "0")} RECORDS LOCATED`;
    }

    $("#emptyState")?.classList.toggle("hidden", visibleCount !== 0);
    $("#gameList")?.classList.toggle("hidden", visibleCount === 0);
    $("#fileCount") && ($("#fileCount").textContent =
      String(visibleCount).padStart(3, "0"));
  }

  $("#searchInput")?.addEventListener("input", filterGames);
  $("#genreFilter")?.addEventListener("change", filterGames);

  $("#clearSearch")?.addEventListener("click", () => {
    if ($("#searchInput")) $("#searchInput").value = "";
    if ($("#genreFilter")) $("#genreFilter").value = "all";
    filterGames();
    $("#searchInput")?.focus();
  });

  function openGame(gameId) {
    const game = games[gameId];
    if (!game || !gameDialog) return;

    selectedGame = gameId;

    $("#dialogCode").textContent = game.code;
    $("#dialogTitle").textContent = game.title;
    $("#dialogStatus").textContent = `[ ${game.status} ]`;
    $("#dialogDescription").textContent = game.description;

    const visual = $("#dialogVisual");
    visual.replaceChildren();

    const image = document.createElement("img");
    image.src = game.image;
    image.alt = `${game.title} atmospheric archive image`;

    image.addEventListener("error", () => {
      image.remove();
      const fallback = document.createElement("span");
      fallback.textContent = "IMAGE DATA UNAVAILABLE";
      visual.append(fallback);
    }, { once: true });

    visual.append(image);

    const facts = [
      ["YEAR", game.year],
      ["GENRE", game.genre],
      ["REGION", game.region],
      ["MEDIA", game.media]
    ];

    const factsContainer = $("#dialogFacts");
    factsContainer.replaceChildren();

    facts.forEach(([label, value]) => {
      const item = document.createElement("div");
      const labelElement = document.createElement("span");
      const valueElement = document.createElement("strong");

      labelElement.textContent = label;
      valueElement.textContent = value;
      item.append(labelElement, valueElement);
      factsContainer.append(item);
    });

    const markButton = $("#markFileButton");
    const isMarked = recoveredFiles.has(gameId);

    markButton.textContent = isMarked
      ? "[ REMOVE RECOVERY MARK ]"
      : "[ MARK FOR RECOVERY ]";

    if (!gameDialog.open) gameDialog.showModal();
  }

  $$(".game-entry").forEach(entry => {
    entry.addEventListener("click", () => openGame(entry.dataset.game));
  });

  $("#markFileButton")?.addEventListener("click", () => {
    if (!selectedGame) return;

    if (recoveredFiles.has(selectedGame)) {
      recoveredFiles.delete(selectedGame);
      notify("RECOVERY MARK REMOVED.");
    } else {
      recoveredFiles.add(selectedGame);
      notify("FILE MARKED FOR RECOVERY.");
    }

    const button = $("#markFileButton");
    button.textContent = recoveredFiles.has(selectedGame)
      ? "[ REMOVE RECOVERY MARK ]"
      : "[ MARK FOR RECOVERY ]";
  });

  function openRecoveredFile(fileId) {
    const file = recoveredFileData[fileId];
    if (!file || !fileDialog) return;

    $("#fileViewerId").textContent = file.id;
    $("#fileViewerContent").textContent = file.text;

    if (!fileDialog.open) fileDialog.showModal();
  }

  $$(".lost-file").forEach(button => {
    button.addEventListener("click", () => {
      openRecoveredFile(button.dataset.file);
    });
  });

  $$(".fragment").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.fragment;
      notify(`IMAGE CACHE ${id} / READ ONLY`);
    });
  });

  $$("[data-close-dialog]").forEach(button => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      dialog?.close();
    });
  });

  [gameDialog, fileDialog].forEach(dialog => {
    dialog?.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if ($("#corruptionOverlay")?.classList.contains("active")) {
        restoreSystem();
      }
    }
  });

  const corruptionOverlay = $("#corruptionOverlay");

  $("#corruptButton")?.addEventListener("click", () => {
    corruptionOverlay?.classList.add("active");
    corruptionOverlay?.setAttribute("aria-hidden", "false");
    notify("SYSTEM WARNING / SIMULATED ERROR");
  });

  function restoreSystem() {
    corruptionOverlay?.classList.remove("active");
    corruptionOverlay?.setAttribute("aria-hidden", "true");

    const sector = $("#sector");
    if (sector) {
      sector.textContent = "0x" +
        Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(3, "0");
    }

    notify("SYSTEM RESTORED / SOME DATA MAY BE MISSING");
  }

  $("#restoreButton")?.addEventListener("click", restoreSystem);

  $("#staticButton")?.addEventListener("click", () => {
    document.body.classList.toggle("signal-restored");
    const restored = document.body.classList.contains("signal-restored");

    const staticBox = $(".static-box");
    if (staticBox) {
      staticBox.textContent = restored ? "SIGNAL\nRESTORED" : "NO\nSIGNAL";
    }

    notify(restored ? "SIGNAL RESTORED." : "SIGNAL LOST.");
  });

  function updateClock() {
    const clock = $("#clock");
    if (!clock) return;

    const now = new Date();
    clock.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(value => String(value).padStart(2, "0"))
      .join(":");
  }

  function updateVisitorNumber() {
    const visitorElement = $("#visitorNumber");
    if (!visitorElement) return;

    try {
      const stored = localStorage.getItem("ps2ArchiveVisitCount");
      visitCount = stored ? Number(stored) : 42;

      if (!Number.isFinite(visitCount) || visitCount < 42) {
        visitCount = 42;
      }

      visitCount += 1;
      localStorage.setItem("ps2ArchiveVisitCount", String(visitCount));
    } catch {
      visitCount = 43;
    }

    visitorElement.textContent = String(visitCount).padStart(6, "0");
  }

  function addImageFallbacks() {
    $$("img").forEach(image => {
      image.addEventListener("error", () => {
        image.style.display = "none";

        const container = image.closest(".entry-art, .fragment");
        if (container) {
          container.classList.add("image-unavailable");
          container.setAttribute("data-image-error", "IMAGE NOT FOUND");
        }
      }, { once: true });
    });
  }

  function init() {
    addImageFallbacks();
    updateClock();
    updateVisitorNumber();
    window.setInterval(updateClock, 1000);
    startBoot();

    // Keep the initial directory selection synchronized with the menu.
    openSection("games");
  }

  init();
})();
