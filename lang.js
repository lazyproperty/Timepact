/* Общий скрипт для index.html, privacy.html, terms.html.
   Подключается в <head> БЕЗ defer: язык ставится до первой отрисовки, мигания нет.
   Показ/скрытие языковых блоков делает CSS по <html lang="..">, JS только меняет lang. */
(function () {
  'use strict';

  var LANGS = ['en', 'de', 'es', 'zh', 'ru'];
  var KEY = 'timepact_lang';

  function detectLang() {
    try {
      var s = localStorage.getItem(KEY);
      if (LANGS.indexOf(s) !== -1) return s;
    } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) !== -1 ? n : 'en';
  }

  var lang = detectLang();
  document.documentElement.lang = lang;

  var EVENTS = [
    { year: "4.6 Ga", t: { en: "Formation of Earth", de: "Entstehung der Erde", es: "Formación de la Tierra", zh: "地球形成", ru: "Формирование Земли" } },
    { year: "4.1 Ga", t: { en: "First liquid water", de: "Erstes flüssiges Wasser", es: "Primera agua líquida", zh: "最早的液态水", ru: "Первая жидкая вода" } },
    { year: "3.8 Ga", t: { en: "First life — prokaryotes", de: "Erstes Leben", es: "Primera vida", zh: "最早的生命", ru: "Первая жизнь" } },
    { year: "2.4 Ga", t: { en: "Great Oxidation Event", de: "Große Oxidation", es: "Gran Oxidación", zh: "大氧化事件", ru: "Великое окисление" } },
    { year: "750 Ma", t: { en: "Snowball Earth", de: "Schneeball Erde", es: "Tierra bola de nieve", zh: "雪球地球", ru: "Земля-снежок" } },
    { year: "541 Ma", t: { en: "Cambrian explosion", de: "Kambrische Explosion", es: "Explosión cámbrica", zh: "寒武纪大爆发", ru: "Кембрийский взрыв" } },
    { year: "375 Ma", t: { en: "First tetrapods on land", de: "Erste Tetrapoden", es: "Primeros tetrápodos", zh: "首批四足动物", ru: "Первые тетраподы" } },
    { year: "252 Ma", t: { en: "Permian extinction", de: "Perm-Aussterben", es: "Extinción del Pérmico", zh: "二叠纪大灭绝", ru: "Пермское вымирание" } },
    { year: "230 Ma", t: { en: "First dinosaurs", de: "Erste Dinosaurier", es: "Primeros dinosaurios", zh: "最早的恐龙", ru: "Первые динозавры" } },
    { year: "66 Ma", t: { en: "End of dinosaurs", de: "Ende der Dinosaurier", es: "Fin de los dinosaurios", zh: "恐龙灭绝", ru: "Гибель динозавров" } },
    { year: "55 Ma", t: { en: "First primates", de: "Erste Primaten", es: "Primeros primates", zh: "最早的灵长类", ru: "Первые приматы" } },
    { year: "6 Ma", t: { en: "Human–chimp split", de: "Mensch-Schimpansen-Split", es: "Separación humano-chimpancé", zh: "人类与黑猩猩分化", ru: "Разделение человека и шимпанзе" } },
    { year: "300 Ka", t: { en: "Homo sapiens appears", de: "Homo sapiens erscheint", es: "Aparece Homo sapiens", zh: "智人出现", ru: "Появление Homo sapiens" } },
    { year: "70 Ka", t: { en: "Out of Africa", de: "Aus-Afrika-Migration", es: "Migración fuera de África", zh: "走出非洲", ru: "Миграция из Африки" } },
    { year: "12 Ka", t: { en: "End of last ice age", de: "Ende der Eiszeit", es: "Fin de la glaciación", zh: "末次冰期结束", ru: "Конец ледникового периода" } },
    { year: "10 Ka", t: { en: "Agricultural revolution", de: "Agrarrevolution", es: "Revolución agrícola", zh: "农业革命", ru: "Аграрная революция" } },
    { year: "3500 BCE", t: { en: "Writing invented in Sumer", de: "Schrift in Sumer", es: "Escritura en Sumer", zh: "苏美尔文字", ru: "Письменность в Шумере" } },
    { year: "2560 BCE", t: { en: "Great Pyramid of Giza", de: "Große Pyramide", es: "Gran Pirámide", zh: "吉萨大金字塔", ru: "Пирамида в Гизе" } },
    { year: "776 BCE", t: { en: "First Olympic Games", de: "Erste Olympische Spiele", es: "Primeros Juegos Olímpicos", zh: "第一届奥运会", ru: "Первые Олимпийские игры" } },
    { year: "44 BCE", t: { en: "Assassination of Caesar", de: "Ermordung Cäsars", es: "Asesinato de César", zh: "恺撒遇刺", ru: "Убийство Цезаря" } },
    { year: "476 CE", t: { en: "Fall of Western Rome", de: "Untergang Westroms", es: "Caída de Roma", zh: "西罗马灭亡", ru: "Падение Западного Рима" } },
    { year: "1066 CE", t: { en: "Battle of Hastings", de: "Schlacht bei Hastings", es: "Batalla de Hastings", zh: "黑斯廷斯战役", ru: "Битва при Гастингсе" } },
    { year: "1440 CE", t: { en: "Gutenberg's press", de: "Gutenbergs Druckpresse", es: "Imprenta de Gutenberg", zh: "古腾堡印刷机", ru: "Печатный станок Гутенберга" } },
    { year: "1492 CE", t: { en: "Columbus reaches Americas", de: "Kolumbus in Amerika", es: "Colón llega a América", zh: "哥伦布抵达美洲", ru: "Колумб достигает Америки" } },
    { year: "1687 CE", t: { en: "Newton's Principia", de: "Newtons Principia", es: "Principia de Newton", zh: "牛顿《原理》", ru: "«Начала» Ньютона" } },
    { year: "1789 CE", t: { en: "French Revolution", de: "Französische Revolution", es: "Revolución Francesa", zh: "法国大革命", ru: "Французская революция" } },
    { year: "1859 CE", t: { en: "Darwin: Origin of Species", de: "Darwin: Entstehung der Arten", es: "Darwin: El origen", zh: "达尔文《物种起源》", ru: "Дарвин: Происхождение видов" } },
    { year: "1903 CE", t: { en: "First airplane flight", de: "Erster Flug", es: "Primer vuelo", zh: "首次飞行", ru: "Первый полёт" } },
    { year: "1969 CE", t: { en: "Humans on the Moon", de: "Menschen auf dem Mond", es: "Humanos en la Luna", zh: "人类登月", ru: "Люди на Луне" } },
    { year: "1991 CE", t: { en: "World Wide Web", de: "World Wide Web", es: "World Wide Web", zh: "万维网", ru: "Интернет" } }
  ];

  var colItems = [];

  function byId(id) { return document.getElementById(id); }

  // Язык: меняем <html lang> (остальное делает CSS), обновляем select и подписи в колонках.
  function applyLang(l, save) {
    if (LANGS.indexOf(l) === -1) l = 'en';
    lang = l;
    document.documentElement.lang = l;
    if (save) {
      try { localStorage.setItem(KEY, l); } catch (e) {}
    }
    var sel = byId('langSelect');
    if (sel) sel.value = l;
    colItems.forEach(function (it) {
      it.t.textContent = it.ev.t[l] || it.ev.t.en;
    });
  }

  // Колонки строятся ОДИН раз; при смене языка меняется только текст.
  function buildCols() {
    var L = byId('colLeft'), R = byId('colRight');
    if (!L || !R) return;
    var shuffled = EVENTS.slice().sort(function () { return Math.random() - 0.5; });
    var half = Math.floor(shuffled.length / 2);
    shuffled.forEach(function (ev, i) {
      var el = document.createElement('div');
      el.className = 'era-item';
      var y = document.createElement('span');
      y.className = 'year';
      y.textContent = ev.year;
      var t = document.createElement('span');
      el.appendChild(y);
      el.appendChild(t);
      (i < half ? L : R).appendChild(el);
      colItems.push({ el: el, t: t, ev: ev });
    });
  }

  // Анимация запускается один раз, один setInterval на страницу.
  function animateCols() {
    colItems.forEach(function (it) {
      setTimeout(function () {
        it.el.classList.add('visible');
        if (Math.random() > 0.55) it.el.classList.add('bright');
      }, Math.random() * 2500);
    });

    setInterval(function () {
      colItems.forEach(function (it) {
        if (Math.random() > 0.72) {
          it.el.classList.remove('visible', 'bright');
          setTimeout(function () {
            if (Math.random() > 0.3) it.el.classList.add('visible');
            if (Math.random() > 0.55) it.el.classList.add('bright');
          }, 1800 + Math.random() * 3000);
        }
      });
    }, 3500);
  }

  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { obs.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildCols();
    applyLang(lang, false);
    animateCols();
    initReveal();

    var fy = byId('fyear');
    if (fy) fy.textContent = new Date().getFullYear();

    var sel = byId('langSelect');
    if (sel) sel.addEventListener('change', function (e) { applyLang(e.target.value, true); });
  });

  // Язык сменили в другой вкладке
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) applyLang(detectLang(), false);
  });

  // Возврат кнопкой «Назад» (страница из bfcache): подхватываем актуальный язык
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) applyLang(detectLang(), false);
  });
})();
