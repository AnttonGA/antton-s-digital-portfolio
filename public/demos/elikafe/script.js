/* =========================================================
   Eli kafea — JavaScript
   1) Selector de idioma ES / EU (euskera)
   2) Menú de navegación en móvil
   3) Animaciones "reveal" al hacer scroll
   4) Estado Abierto/Cerrado en tiempo real (bilingüe)
   5) Año dinámico en el footer
   ========================================================= */

(function () {
  "use strict";

  // Marcamos que el JS está activo → habilita las animaciones (ver CSS).
  document.documentElement.classList.add("js");

  /* ---------- 1) Idioma ES / EU ----------
     Cada texto traducible lleva un atributo data-eu con la versión en
     euskera. El contenido original del HTML es el castellano y se guarda
     la primera vez en data-es, para poder alternar sin recargar. */
  var langToggle = document.getElementById("langToggle");
  var currentLang = "es";

  // Textos del estado Abierto/Cerrado en cada idioma
  var I18N_STATUS = {
    es: {
      checking: "Comprobando…",
      openUntil: function (h) { return "Abierto · cierra a las " + h; },
      closedNext: function (h) { return "Cerrado · abre a las " + h; },
      closedNow: "Cerrado ahora"
    },
    eu: {
      checking: "Egiaztatzen…",
      openUntil: function (h) { return "Irekita · " + h + "ean ixten du"; },
      closedNext: function (h) { return "Itxita · " + h + "ean irekitzen du"; },
      closedNow: "Itxita orain"
    }
  };

  function applyLang(lang) {
    currentLang = lang === "eu" ? "eu" : "es";
    document.documentElement.lang = currentLang === "eu" ? "eu" : "es";

    document.querySelectorAll("[data-eu]").forEach(function (el) {
      // Guardamos la versión castellana la primera vez
      if (!el.hasAttribute("data-es")) {
        el.setAttribute("data-es", el.innerHTML.trim());
      }
      el.innerHTML = el.getAttribute(currentLang === "eu" ? "data-eu" : "data-es");
    });

    // El botón muestra el idioma AL QUE se cambiaría
    if (langToggle) langToggle.textContent = currentLang === "eu" ? "ES" : "EU";

    try { localStorage.setItem("elikafea-lang", currentLang); } catch (e) {}

    updateStatus(); // re-pintar el estado en el idioma correcto
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      applyLang(currentLang === "eu" ? "es" : "eu");
    });
  }

  /* ---------- 2) Menú móvil ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 3) Animaciones al hacer scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });

    // Red de seguridad: si el observer no dispara, mostramos todo.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }, 2500);
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 4) Estado Abierto / Cerrado ----------
     Horario:  Lu-Vi 7:30-13:30 y 16:00-20:00  ·  Sáb-Dom 7:30-14:00
     getDay(): 0=Dom, 1=Lun ... 6=Sáb */
  var schedule = {
    weekday: [[450, 810], [960, 1200]], // 7:30-13:30 y 16:00-20:00 (en minutos)
    weekend: [[450, 840]]               // 7:30-14:00
  };

  function minutesNow(d) { return d.getHours() * 60 + d.getMinutes(); }
  function getRanges(day) { return (day === 0 || day === 6) ? schedule.weekend : schedule.weekday; }
  function formatHM(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return h + ":" + (m < 10 ? "0" + m : m);
  }

  function updateStatus() {
    var statusEl = document.getElementById("openStatus");
    var todayEl = document.getElementById("todayHours");
    if (!statusEl) return;

    var t = I18N_STATUS[currentLang] || I18N_STATUS.es;
    var now = new Date();
    var day = now.getDay();
    var mins = minutesNow(now);
    var ranges = getRanges(day);

    if (todayEl) {
      todayEl.textContent = ranges
        .map(function (r) { return formatHM(r[0]) + "–" + formatHM(r[1]); })
        .join(" · ");
    }

    var current = ranges.find(function (r) { return mins >= r[0] && mins < r[1]; });
    var label, closed;

    if (current) {
      label = t.openUntil(formatHM(current[1]));
      closed = false;
    } else {
      var next = ranges.find(function (r) { return mins < r[0]; });
      label = next ? t.closedNext(formatHM(next[0])) : t.closedNow;
      closed = true;
    }

    statusEl.innerHTML =
      '<span class="dot' + (closed ? " dot--closed" : "") + '"></span> ' + label;
  }

  /* ---------- 5) Año del footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Arranque ----------
     Idioma guardado o castellano por defecto. Para arrancar en euskera
     por defecto, cambia "es" por "eu" en la línea de abajo. */
  var saved = "es";
  try { saved = localStorage.getItem("elikafea-lang") || "es"; } catch (e) {}
  applyLang(saved);
})();
