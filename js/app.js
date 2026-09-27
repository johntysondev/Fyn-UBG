(() => {
  const $ = id => document.getElementById(id);

  const read = (k, fb) => {
    const v = localStorage.getItem(k);
    return v === null ? fb : v;
  };
  const write = (k, v) => localStorage.setItem(k, v);

  let favs = [];
  try { favs = JSON.parse(read('evil_ubg_favs', '[]')) || []; } catch (e) { favs = []; }

  const prefs = {
    tab: 'home',
    query: '',
    catalogQuery: '',
    favs: favs,
    cloak: read('evil_ubg_cloak', 'quizlet'),
    font: read('evil_ubg_font', 'clean'),
    theme: read('evil_ubg_theme', 'dark'),
    panicKey: read('evil_ubg_panic_key', ']'),
    panicUrl: read('evil_ubg_panic_url', 'https://classroom.google.com'),
    antiClose: read('evil_ubg_anti_close', 'false') === 'true',
    launch: read('evil_ubg_launch', 'player'),
    layout: read('evil_ubg_layout', ''),
    searchMode: read('evil_ubg_searchmode', 'games'),
    density: read('evil_ubg_density', 'normal'),
    motion: read('evil_ubg_motion', 'on'),
    picks: [],
    playing: null
  };

  const pics = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>`,
    games: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="3"></rect><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="11" x2="15.01" y2="11"></line><line x1="18" y1="13" x2="18.01" y2="13"></line></svg>`,
    apps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    bookmarks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    crosshair: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"></circle><line x1="12" y1="3" x2="12" y2="7"></line><line x1="12" y1="17" x2="12" y2="21"></line><line x1="3" y1="12" x2="7" y2="12"></line><line x1="17" y1="12" x2="21" y2="12"></line></svg>`,
    tunnel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="12" rx="9" ry="6"></ellipse><ellipse cx="12" cy="12" rx="5" ry="3"></ellipse><ellipse cx="12" cy="12" rx="2" ry="1"></ellipse></svg>`,
    cube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l9 4.9v10.2L12 22 3 17.1V6.9L12 2z"></path><path d="M12 22V12"></path><path d="M21 7l-9 5-9-5"></path></svg>`,
    target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1" fill="currentColor"></circle></svg>`,
    crosswalk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="8" y1="4" x2="8" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line><line x1="16" y1="4" x2="16" y2="20"></line></svg>`,
    polygon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon></svg>`,
    default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="3"></rect><circle cx="8" cy="12" r="2"></circle><line x1="14" y1="12" x2="18" y2="12"></line></svg>`
  };

  const ui = {
    pageTitle: $('page-title'),
    loaderScreen: $('loader-screen'),
    loaderBar: $('loader-bar'),
    tabList: $('side-nav-list'),
    browserTabs: $('browser-tab-strip'),
    browserAddr: $('browser-address'),
    browserFs: $('browser-fullscreen-btn'),
    chooser: $('layout-chooser'),
    navBrand: $('nav-brand'),
    navFs: $('nav-fullscreen-btn'),
    homeView: $('hero-home-view'),
    logo: $('brand-logo-interactive'),
    search: $('center-search-input'),
    searchGo: $('center-go-btn'),
    catalogView: $('catalog-view'),
    catalogTitle: $('catalog-section-title'),
    catalogCount: $('catalog-count-badge'),
    catalogSearch: $('catalog-search-input'),
    grid: $('games-grid'),
    settingsView: $('settings-view'),
    fontGrid: $('font-selector-grid'),
    themeGrid: $('theme-selector-grid'),
    launchGrid: $('launch-selector-grid'),
    layoutGrid: $('layout-selector-grid'),
    searchModeGrid: $('searchmode-selector-grid'),
    densityGrid: $('density-selector-grid'),
    motionGrid: $('motion-selector-grid'),
    cloaks: $('cloak-presets'),
    panicKeyInput: $('panic-key-input'),
    panicUrlInput: $('panic-url-input'),
    antiCloseBox: $('anti-close-checkbox'),
    resetBtn: $('reset-settings-btn'),
    saveBtn: $('save-settings-btn'),
    player: $('game-player-view'),
    playerBack: $('player-back-btn'),
    playerTitle: $('player-game-title'),
    playerReload: $('player-reload-btn'),
    playerNewtab: $('player-newtab-btn'),
    playerFs: $('player-fullscreen-btn'),
    playerBox: $('player-container'),
    playerLoading: $('player-loading'),
    playerBlocked: $('player-blocked'),
    playerBlockedReload: $('player-blocked-reload'),
    playerBlockedNewtab: $('player-blocked-newtab'),
    playerBlockedDismiss: $('player-blocked-dismiss'),
    toasts: $('toast-container')
  };

  const disguises = {
    quizlet: {
      title: "Your Sets | Quizlet",
    },
    classroom: {
      title: "Classes | Google Classroom",
    },
    drive: {
      title: "My Drive - Google Drive",
    },
    desmos: {
      title: "Desmos | Graphing Calculator",
    },
    canvas: {
      title: "Dashboard | Canvas LMS",
    },
    docs: {
      title: "Algebra II Notes - Google Docs",
    }
  };

  const sideApps = [
    { id: "app-discord", title: "Discord Web", category: "apps", icon: "crosshair", badge: "CHAT", desc: "Connect with communities and friend groups on Discord.", embedUrl: "https://discord.com/app", isBuiltin: false },
    { id: "app-youtube", title: "YouTube Piped", category: "apps", icon: "tunnel", badge: "VIDEO", desc: "Ad-free, tracker-free YouTube video player.", embedUrl: "https://piped.video/", isBuiltin: false },
    { id: "app-chatgpt", title: "ChatGPT AI", category: "apps", icon: "cube", badge: "AI", desc: "AI assistant for instant answers, writing, and code assistance.", embedUrl: "https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat", isBuiltin: false },
    { id: "app-movies", title: "Cinema Streaming", category: "apps", icon: "target", badge: "STREAM", desc: "High-speed movie and series stream player.", embedUrl: "https://fmoviesz.to/", isBuiltin: false },
    { id: "app-ao3", title: "AO3 Reader", category: "apps", icon: "crosswalk", badge: "READ", desc: "Archive of Our Own stories and library works.", embedUrl: "https://archiveofourown.org/", isBuiltin: false },
    { id: "app-music", title: "Lo-Fi Music Stream", category: "apps", icon: "polygon", badge: "AUDIO", desc: "Continuous chill lo-fi study beats and instrumental streams.", embedUrl: "https://lofigirl.com/", isBuiltin: false }
  ];

  function notify(msg, pic) {
    const box = document.createElement('div');
    box.className = 'toast';
    box.innerHTML = (pic || pics.default) + '<span>' + msg + '</span>';
    ui.toasts.appendChild(box);
    setTimeout(function () {
      box.style.opacity = '0';
      box.style.transform = 'translateY(6px)';
      box.style.transition = 'all 0.2s ease';
      setTimeout(function () { box.remove(); }, 200);
    }, 2200);
  }

  function boot() {
    let done = 0;
    const tick = setInterval(function () {
      done += Math.floor(Math.random() * 9) + 7;
      if (done > 100) done = 100;
      ui.loaderBar.style.width = done + '%';
      if (done >= 100) {
        clearInterval(tick);
        setTimeout(function () {
          ui.loaderScreen.classList.add('fade-out');
          setTimeout(function () { ui.loaderScreen.style.display = 'none'; }, 350);
        }, 200);
      }
    }, 30);
  }

  function markActive(grid, attr, val) {
    if (!grid) return;
    grid.querySelectorAll('.theme-card').forEach(function (card) {
      card.classList.toggle('active', card.dataset[attr] === val);
    });
  }

  function setDisguise(key) {
    const d = disguises[key];
    if (!d) return;
    document.title = d.title;
    ui.pageTitle.textContent = d.title;
    prefs.cloak = key;
    write('evil_ubg_cloak', key);
    document.querySelectorAll('.cloak-card').forEach(function (card) {
      card.classList.toggle('active', card.dataset.preset === key);
    });
  }

  function setFont(key) {
    document.body.classList.remove('font-mono', 'font-serif', 'font-clean');
    document.body.classList.add('font-' + key);
    prefs.font = key;
    write('evil_ubg_font', key);
    document.querySelectorAll('.font-card').forEach(function (card) {
      card.classList.toggle('active', card.dataset.font === key);
    });
  }

  function setTheme(key) {
    const ok = ['dark', 'light', 'slate', 'navy'];
    const v = ok.indexOf(key) >= 0 ? key : 'dark';
    document.body.dataset.theme = v;
    prefs.theme = v;
    write('evil_ubg_theme', v);
    markActive(ui.themeGrid, 'theme', v);
  }

  function setLaunch(key) {
    const v = (key === 'tab') ? 'tab' : 'player';
    prefs.launch = v;
    write('evil_ubg_launch', v);
    markActive(ui.launchGrid, 'launch', v);
  }

  function setLayout(key) {
    const v = (key === 'browser') ? 'browser' : 'side';
    prefs.layout = v;
    write('evil_ubg_layout', v);
    document.body.dataset.layout = v;
    markActive(ui.layoutGrid, 'layout', v);
  }

  function setSearchMode(key) {
    const v = (key === 'google') ? 'google' : 'games';
    prefs.searchMode = v;
    write('evil_ubg_searchmode', v);
    markActive(ui.searchModeGrid, 'searchmode', v);
  }

  function setDensity(key) {
    const v = (key === 'compact') ? 'compact' : 'normal';
    document.body.dataset.density = v;
    prefs.density = v;
    write('evil_ubg_density', v);
    markActive(ui.densityGrid, 'density', v);
  }

  function setMotion(key) {
    const v = (key === 'off') ? 'off' : 'on';
    document.body.dataset.motion = v;
    prefs.motion = v;
    write('evil_ubg_motion', v);
    markActive(ui.motionGrid, 'motion', v);
  }

  function mixPicks() {
    const all = window.EVIL_GAMES || [];
    const copy = all.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    prefs.picks = copy.slice(0, 24);
  }

  function bail() {
    window.location.replace(prefs.panicUrl || 'https://classroom.google.com');
  }

  function gameUrl(game) {
    if (!game) return null;
    if (game.file) return game.file;
    if (game.embedUrl) return game.embedUrl;
    if (game.folder) return encodeURI(game.folder) + '/index.html';
    return null;
  }

  function startGame(game) {
    const url = gameUrl(game);
    if (!url) {
      notify('No game URL found', pics.default);
      return;
    }
    if (prefs.launch === 'tab') {
      window.open(url, '_blank', 'noopener');
      window.location.href = url;
      return;
    }
    showGame(game);
  }

  let stuckTimer = null;

  function showGame(game) {
    prefs.playing = game;
    const url = gameUrl(game);
    ui.playerTitle.textContent = game.title;
    ui.playerBox.innerHTML = '';
    ui.playerBlocked.classList.add('hidden');
    ui.playerLoading.classList.remove('hidden');
    const frame = document.createElement('iframe');
    frame.src = url;
    frame.allow = 'autoplay; fullscreen; gamepad';
    frame.allowFullscreen = true;
    frame.title = game.title;
    frame.addEventListener('load', function () {
      ui.playerLoading.classList.add('hidden');
      watchForStuck();
    });
    ui.playerBox.appendChild(frame);
    ui.player.classList.remove('hidden');
  }

  function watchForStuck() {
    clearTimeout(stuckTimer);
    stuckTimer = setTimeout(function () {
      if (ui.player.classList.contains('hidden') || !prefs.playing) return;
      const frame = ui.playerBox.querySelector('iframe');
      if (!frame) return;
      let stuck = false;
      try {
        const doc = frame.contentDocument;
        if (!doc || !doc.body) {
          stuck = true;
        } else {
          const live = !!doc.querySelector('canvas, video, object, embed, svg');
          stuck = !live && (doc.body.innerText || '').trim().length < 20;
        }
      } catch (e) {
        return;
      }
      if (stuck) ui.playerBlocked.classList.remove('hidden');
    }, 9000);
  }

  function stopGame() {
    clearTimeout(stuckTimer);
    ui.playerBox.innerHTML = '';
    ui.player.classList.add('hidden');
    prefs.playing = null;
  }

  function playInTab() {
    if (!prefs.playing) return;
    const url = gameUrl(prefs.playing);
    const win = window.open(url, '_blank', 'noopener');
    if (!win) notify('Popup blocked — allow popups for new tabs', pics.default);
  }

  function openTab(id) {
    prefs.tab = id;
    if (!ui.player.classList.contains('hidden')) stopGame();
    document.querySelectorAll('.nav-item').forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.tabId === id);
    });
    document.querySelectorAll('.browser-tab').forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.tabId === id);
    });
    if (ui.browserAddr) ui.browserAddr.value = 'fyn://' + id;
    ui.homeView.classList.toggle('hidden', id !== 'home');
    ui.catalogView.classList.toggle('hidden', ['games', 'random', 'bookmarks'].indexOf(id) < 0);
    ui.settingsView.classList.toggle('hidden', id !== 'settings');
    if (id === 'games') {
      ui.catalogTitle.textContent = 'Games';
      paintGrid();
    } else if (id === 'random') {
      ui.catalogTitle.textContent = 'Random Picks';
      mixPicks();
      paintGrid();
    } else if (id === 'bookmarks') {
      ui.catalogTitle.textContent = 'Bookmarks & Favorites';
      paintGrid();
    }
  }

  function runQuery(raw) {
    const q = (raw || '').trim();
    if (!q) return;
    if (q.indexOf('http://') === 0 || q.indexOf('https://') === 0 || q.indexOf('.com') > 0 || q.indexOf('.org') > 0 || q.indexOf('.io') > 0 || q.indexOf('.net') > 0) {
      let url = q;
      if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) url = 'https://' + url;
      window.open(url, '_blank', 'noopener');
      return;
    }
    prefs.query = q;
    prefs.catalogQuery = q;
    if (ui.catalogSearch) ui.catalogSearch.value = q;
    if (prefs.searchMode === 'google') {
      window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank', 'noopener');
      return;
    }
    openTab('games');
    notify('Searching games: "' + q + '"', pics.games);
  }

  function matches(list) {
    const q = (prefs.catalogQuery || prefs.query || '').trim().toLowerCase();
    if (!q) return list;
    return list.filter(function (g) {
      return (g.title && g.title.toLowerCase().indexOf(q) >= 0) ||
        (g.folder && g.folder.toLowerCase().indexOf(q) >= 0) ||
        (g.file && g.file.toLowerCase().indexOf(q) >= 0);
    });
  }

  function tabItems() {
    if (prefs.tab === 'random') return matches(prefs.picks);
    if (prefs.tab === 'bookmarks') {
      const all = (window.EVIL_GAMES || []).concat(sideApps);
      return matches(all.filter(function (item) { return prefs.favs.indexOf(item.id) >= 0; }));
    }
    return matches(window.EVIL_GAMES || []);
  }

  const FALLBACK_ART = ['logo.png', 'splash.png', 'splash.jpg', 'icon.png', 'icon.jpg', 'cover.png'];

  function artFor(game) {
    const out = [];
    if (game.cover) out.push(game.cover);
    if (game.folder) {
      const base = encodeURI(game.folder);
      FALLBACK_ART.forEach(function (name) {
        const url = base + '/' + name;
        if (out.indexOf(url) < 0) out.push(url);
      });
    }
    return out;
  }

  function loadArt(img, game) {
    const tries = artFor(game);
    if (!tries.length) {
      img.src = fakeCover(game);
      return;
    }
    let i = 0;
    img.addEventListener('error', function () {
      i++;
      if (i < tries.length) {
        img.src = tries[i];
      } else if (!img.dataset.ph) {
        img.dataset.ph = '1';
        img.src = fakeCover(game);
      } else {
        img.remove();
      }
    });
    img.src = tries[0];
  }

  function fakeCover(game) {
    const clean = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    const title = clean(game.title || 'Game');
    const first = clean((title.trim()[0] || '?').toUpperCase());
    let hue = 0;
    for (const ch of game.id) hue = (hue * 31 + ch.charCodeAt(0)) % 360;
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'><rect width='320' height='200' fill='#161616'/><text x='160' y='120' font-family='Arial,sans-serif' font-size='84' font-weight='bold' text-anchor='middle' fill='hsl(" + hue + ",25%,38%)'>" + first + "</text><text x='12' y='186' font-family='Arial,sans-serif' font-size='13' fill='#888888'>" + title.slice(0, 34) + "</text></svg>";
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  function flipFav(id) {
    const at = prefs.favs.indexOf(id);
    if (at >= 0) {
      prefs.favs.splice(at, 1);
      notify('Removed bookmark', pics.bookmarks);
    } else {
      prefs.favs.push(id);
      notify('Bookmarked', pics.bookmarks);
    }
    write('evil_ubg_favs', JSON.stringify(prefs.favs));
    paintGrid();
  }

  function paintGrid() {
    const items = tabItems();
    ui.grid.innerHTML = '';
    ui.catalogCount.textContent = items.length + ' items';
    if (!items.length) {
      ui.grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; color: #777; font-family: var(--font-mono);"><p style="font-size: 15px; color: #fff; margin-bottom: 6px;">Nothing here.</p><small>Try a different search or tab.</small></div>';
      return;
    }
    items.forEach(function (item) {
      const saved = prefs.favs.indexOf(item.id) >= 0;
      const card = document.createElement('div');
      card.className = 'game-card';
      card.dataset.id = item.id;
      const hasArt = (item.file || item.folder) ? '<img class="card-cover" loading="lazy" decoding="async" alt="' + item.title.replace(/"/g, '') + ' cover" />' : '';
      card.innerHTML = '<div class="card-thumbnail">' +
        '<div class="card-vector-icon">' + (pics[item.icon] || pics.default) + '</div>' +
        hasArt +
        '<div class="card-overlay-play"><div class="card-play-btn"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div></div>' +
        '<button class="card-fav-btn' + (saved ? ' active' : '') + '" title="Bookmark" data-id="' + item.id + '"><svg viewBox="0 0 24 24" fill="' + (saved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></button>' +
        '</div><div class="card-meta"><h4 class="card-title">' + item.title + '</h4></div>';
      card.addEventListener('click', function (e) {
        if (e.target.closest('.card-fav-btn')) return;
        if (item.file || item.folder) startGame(item);
        else window.open(item.embedUrl, '_blank', 'noopener');
      });
      card.querySelector('.card-fav-btn').addEventListener('click', function (e) {
        e.stopPropagation();
        flipFav(item.id);
      });
      const shot = card.querySelector('.card-cover');
      if (shot) loadArt(shot, item);
      ui.grid.appendChild(card);
    });
  }

  function wireOptions(grid, attr, fn, label) {
    if (!grid) return;
    grid.addEventListener('click', function (e) {
      const card = e.target.closest('.theme-card');
      if (!card) return;
      fn(card.dataset[attr]);
      notify(label + ': ' + card.querySelector('strong').textContent.trim(), pics.settings);
    });
  }

  function wire() {
    if (ui.logo) {
      ui.logo.addEventListener('click', function () {
        notify('fyn ubg', pics.home);
      });
    }

    ui.tabList.addEventListener('click', function (e) {
      const tab = e.target.closest('.nav-item');
      if (!tab) return;
      if (tab.dataset.tabId === 'random' && prefs.tab === 'random') {
        mixPicks();
        paintGrid();
        notify('Shuffled', pics.games);
        return;
      }
      openTab(tab.dataset.tabId);
    });

    if (ui.navBrand) {
      ui.navBrand.addEventListener('click', function () {
        openTab('home');
      });
    }

    ui.navFs.addEventListener('click', function () {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
      else document.exitFullscreen().catch(function () {});
    });

    if (ui.browserTabs) {
      ui.browserTabs.addEventListener('click', function (e) {
        const tab = e.target.closest('.browser-tab');
        if (!tab) return;
        if (tab.dataset.tabId === 'random' && prefs.tab === 'random') {
          mixPicks();
          paintGrid();
          notify('Shuffled', pics.games);
          return;
        }
        openTab(tab.dataset.tabId);
      });
    }

    if (ui.browserAddr) {
      ui.browserAddr.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') runQuery(ui.browserAddr.value);
      });
    }

    if (ui.browserFs) {
      ui.browserFs.addEventListener('click', function () {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(function () {});
        else document.exitFullscreen().catch(function () {});
      });
    }

    if (ui.chooser) {
      ui.chooser.addEventListener('click', function (e) {
        const pick = e.target.closest('[data-layout-pick]');
        if (pick) {
          ui.chooser.querySelectorAll('.pick-card').forEach(function (card) {
            card.classList.toggle('selected', card === pick);
          });
          return;
        }
        if (e.target.closest('#layout-next-btn')) {
          const sel = ui.chooser.querySelector('.pick-card.selected') || ui.chooser.querySelector('[data-layout-pick="side"]');
          setLayout(sel.dataset.layoutPick);
          ui.chooser.classList.add('hidden');
        }
      });
    }

    if (ui.catalogSearch) {
      ui.catalogSearch.addEventListener('input', function () {
        prefs.catalogQuery = ui.catalogSearch.value;
        prefs.query = ui.catalogSearch.value;
        if (['games', 'random', 'bookmarks'].indexOf(prefs.tab) >= 0) paintGrid();
      });
      ui.catalogSearch.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          ui.catalogSearch.value = '';
          prefs.catalogQuery = '';
          prefs.query = '';
          paintGrid();
        }
        e.stopPropagation();
      });
    }

    ui.playerBack.addEventListener('click', stopGame);
    ui.playerReload.addEventListener('click', function () {
      if (prefs.playing) showGame(prefs.playing);
    });
    ui.playerNewtab.addEventListener('click', playInTab);
    ui.playerFs.addEventListener('click', function () {
      if (!document.fullscreenElement) ui.player.requestFullscreen().catch(function () {});
      else document.exitFullscreen().catch(function () {});
    });
    ui.playerBlockedReload.addEventListener('click', function () {
      if (prefs.playing) showGame(prefs.playing);
    });
    ui.playerBlockedNewtab.addEventListener('click', playInTab);
    ui.playerBlockedDismiss.addEventListener('click', function () {
      ui.playerBlocked.classList.add('hidden');
    });

    ui.searchGo.addEventListener('click', function () {
      runQuery(ui.search.value);
    });
    ui.search.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runQuery(ui.search.value);
    });

    if (ui.fontGrid) {
      ui.fontGrid.addEventListener('click', function (e) {
        const card = e.target.closest('.font-card');
        if (!card) return;
        setFont(card.dataset.font);
        notify('Font: ' + card.querySelector('strong').textContent, pics.settings);
      });
    }

    wireOptions(ui.themeGrid, 'theme', setTheme, 'Theme');
    wireOptions(ui.launchGrid, 'launch', setLaunch, 'Launch');
    wireOptions(ui.layoutGrid, 'layout', setLayout, 'Layout');
    wireOptions(ui.searchModeGrid, 'searchmode', setSearchMode, 'Search');
    wireOptions(ui.densityGrid, 'density', setDensity, 'Cards');
    wireOptions(ui.motionGrid, 'motion', setMotion, 'Motion');

    ui.saveBtn.addEventListener('click', function () {
      prefs.panicKey = (ui.panicKeyInput.value || '').trim() || ']';
      prefs.panicUrl = (ui.panicUrlInput.value || '').trim() || 'https://classroom.google.com';
      prefs.antiClose = ui.antiCloseBox.checked;
      write('evil_ubg_panic_key', prefs.panicKey);
      write('evil_ubg_panic_url', prefs.panicUrl);
      write('evil_ubg_anti_close', prefs.antiClose);
      notify('Settings saved', pics.settings);
    });

    ui.resetBtn.addEventListener('click', function () {
      setDisguise('quizlet');
      setFont('clean');
      setTheme('dark');
      setLaunch('player');
      setLayout('side');
      setSearchMode('games');
      setDensity('normal');
      setMotion('on');
      prefs.panicKey = ']';
      prefs.panicUrl = 'https://classroom.google.com';
      prefs.antiClose = false;
      ui.panicKeyInput.value = ']';
      ui.panicUrlInput.value = 'https://classroom.google.com';
      ui.antiCloseBox.checked = false;
      notify('Defaults restored', pics.default);
    });

    ui.cloaks.addEventListener('click', function (e) {
      const card = e.target.closest('.cloak-card');
      if (!card) return;
      setDisguise(card.dataset.preset);
      notify('Now showing as ' + card.querySelector('strong').textContent, pics.default);
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === prefs.panicKey && ['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) < 0) {
      e.preventDefault();
      bail();
      return;
    }
    if (['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) < 0) {
      if (e.key === '1') { e.preventDefault(); openTab('home'); return; }
      if (e.key === '2') { e.preventDefault(); openTab('games'); return; }
      if (e.key === '3') { e.preventDefault(); openTab('random'); return; }
      if (e.key === '4') { e.preventDefault(); openTab('bookmarks'); return; }
      if (e.key === '5') { e.preventDefault(); openTab('settings'); return; }
      if (e.key === '/') {
        e.preventDefault();
        if (prefs.tab === 'home') ui.search.focus();
        else if (ui.catalogSearch) ui.catalogSearch.focus();
        return;
      }
    }
    if (e.key === 'Escape' && !ui.player.classList.contains('hidden')) {
      stopGame();
    }
  });

  window.addEventListener('beforeunload', function (e) {
    if (prefs.antiClose) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  function start() {
    const firstRun = !localStorage.getItem('evil_ubg_layout');
    setDisguise(prefs.cloak);
    setFont(prefs.font);
    setTheme(prefs.theme);
    setLaunch(prefs.launch);
    setLayout(prefs.layout || 'side');
    setSearchMode(prefs.searchMode);
    setDensity(prefs.density);
    setMotion(prefs.motion);
    ui.panicKeyInput.value = prefs.panicKey;
    ui.panicUrlInput.value = prefs.panicUrl;
    ui.antiCloseBox.checked = prefs.antiClose;
    wire();
    openTab('home');
    boot();
    if (firstRun && ui.chooser) ui.chooser.classList.remove('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
