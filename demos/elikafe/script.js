/* =========================================================
   Eli Kafea — JavaScript
   1) Menú de navegación en móvil
   2) Animaciones "reveal" al hacer scroll
   3) Estado Abierto/Cerrado en tiempo real según el horario
   4) Año dinámico en el footer
   ========================================================= */

(function () {
  "use strict";

  // Marcamos que el JS está activo → habilita las animaciones (ver CSS).
  document.documentElement.classList.add("js");

  /* ---------- 1) Menú móvil ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Cerrar el menú al pinchar un enlace
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2) Animaciones al hacer scroll ---------- */
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

    // Red de seguridad: si por lo que sea el observer no dispara
    // (p. ej. la pestaña se abre en segundo plano), mostramos todo.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }, 2500);
  } else {
    // Fallback: mostrar todo
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 3) Estado Abierto / Cerrado ---------- */
  // Horario:  Lu-Vi 7:30-13:30 y 16:00-20:00  ·  Sáb-Dom 7:30-14:00
  // getDay(): 0=Dom, 1=Lun ... 6=Sáb
  var schedule = {
    weekday: [[450, 810], [960, 1200]], // 7:30-13:30 y 16:00-20:00 (en minutos)
    weekend: [[450, 840]]               // 7:30-14:00
  };

  function minutesNow(d) { return d.getHours() * 60 + d.getMinutes(); }

  function getRanges(day) {
    if (day === 0 || day === 6) return schedule.weekend;
    return schedule.weekday;
  }

  function formatHM(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return h + ":" + (m < 10 ? "0" + m : m);
  }

  function updateStatus() {
    var statusEl = document.getElementById("openStatus");
    var todayEl = document.getElementById("todayHours");
    if (!statusEl) return;

    var now = new Date();
    var day = now.getDay();
    var mins = minutesNow(now);
    var ranges = getRanges(day);

    // Texto del horario de hoy
    if (todayEl) {
      todayEl.textContent = ranges
        .map(function (r) { return formatHM(r[0]) + "–" + formatHM(r[1]); })
        .join(" · ");
    }

    var isOpen = ranges.some(function (r) { return mins >= r[0] && mins < r[1]; });

    var label, closed;
    if (isOpen) {
      // ¿Cuándo cierra?
      var current = ranges.find(function (r) { return mins >= r[0] && mins < r[1]; });
      label = "Abierto · cierra a las " + formatHM(current[1]);
      closed = false;
    } else {
      // Próxima apertura de hoy (si la hay)
      var next = ranges.find(function (r) { return mins < r[0]; });
      if (next) {
        label = "Cerrado · abre a las " + formatHM(next[0]);
      } else {
        label = "Cerrado ahora";
      }
      closed = true;
    }

    statusEl.innerHTML =
      '<span class="dot' + (closed ? " dot--closed" : "") + '"></span> ' + label;
  }

  updateStatus();
  // Refrescar cada minuto por si tienen la web abierta
  setInterval(updateStatus, 60000);

  /* ---------- 4) Año del footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
