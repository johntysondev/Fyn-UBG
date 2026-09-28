import { LibcurlClient } from './libcurl.mjs';

function siteBase() {
  const p = location.pathname;
  return p.slice(0, p.lastIndexOf('/') + 1);
}

function waitControl(timeoutMs) {
  if (navigator.serviceWorker.controller) return Promise.resolve();
  const ready = navigator.serviceWorker.ready.then(() => {});
  const changed = new Promise((resolve) => {
    navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true });
  });
  const timeout = new Promise((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([ready, changed, timeout]);
}

window.SJ = {
  ready: false,
  failed: false,
  warned: false,
  wispUsed: '',
  controller: null,
  base: siteBase(),

  async init(wispUrl) {
    if (this.ready) return true;
    if (this.failed) return false;
    const wisp = (wispUrl || '').trim();
    if (!wisp) {
      this.failed = true;
      return false;
    }
    try {
      if (!('serviceWorker' in navigator)) throw new Error('sw unsupported');
      if (typeof $scramjetController === 'undefined') throw new Error('controller lib missing');
      const alive = await this.ping(wisp);
      if (!alive) throw new Error('wisp unreachable');
      const reg = await navigator.serviceWorker.register('sj/sw.js', { scope: 'sj/' });
      await waitControl(8000);
      const sw = navigator.serviceWorker.controller || reg.active;
      if (!sw) throw new Error('sw not controlling');
      this.controller = new $scramjetController.Controller({
        serviceworker: sw,
        transport: new LibcurlClient({ wisp }),
        config: {
          prefix: this.base + 'sj/go/',
          scramjetPath: this.base + 'sj/scramjet.js',
          injectPath: this.base + 'sj/controller.inject.js',
          wasmPath: this.base + 'sj/scramjet.wasm'
        }
      });
      await this.controller.wait();
      this.ready = true;
      this.wispUsed = wisp;
      return true;
    } catch (e) {
      this.failed = true;
      return false;
    }
  },

  async retarget(wispUrl) {
    const wisp = (wispUrl || '').trim();
    if (!this.ready || !this.controller) return this.init(wispUrl);
    if (wisp === this.wispUsed) return true;
    try {
      const mod = await import('./libcurl.mjs');
      this.controller.setTransport(new mod.LibcurlClient({ wisp }));
      this.wispUsed = wisp;
      return true;
    } catch (e) {
      return false;
    }
  },

  ping(wisp) {
    return new Promise((resolve) => {
      let done = false;
      const finish = (v) => {
        if (done) return;
        done = true;
        try { ws.close(); } catch (e) {}
        resolve(v);
      };
      let ws = null;
      try {
        ws = new WebSocket(wisp);
      } catch (e) {
        finish(false);
        return;
      }
      const t = setTimeout(() => finish(false), 5000);
      ws.onopen = () => { clearTimeout(t); finish(true); };
      ws.onerror = () => { clearTimeout(t); finish(false); };
    });
  },

  play(iframe, absUrl) {
    if (!this.ready || !this.controller) return null;
    try {
      const frame = this.controller.createFrame(iframe);
      frame.go(absUrl);
      return iframe.src;
    } catch (e) {
      return null;
    }
  },

  encode(absUrl) {
    if (!this.ready || !this.controller) return null;
    try {
      const ghost = document.createElement('iframe');
      const frame = this.controller.createFrame(ghost);
      frame.go(absUrl);
      return ghost.src;
    } catch (e) {
      return null;
    }
  }
};
