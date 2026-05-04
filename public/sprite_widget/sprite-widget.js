/* =========================================================
   Sprite Animator Widget
   ---------------------------------------------------------
   Usage:
     <link rel="stylesheet" href="sprite-widget/sprite-widget.css">
     <div id="my-widget"></div>
     <script src="sprite-widget/sprite-widget.js"></script>
     <script>
       SpriteAnimator.mount("#my-widget", {
         sprites: [
           { id: "beholder", label: "Beholder", src: "BEHOLDER.png",
             frames: 8, frameWidth: 256, frameHeight: 256, fps: 8 },
           // add more here as you build them...
         ],
         defaultId: "beholder"
       });
     </script>

   Adding a new sprite later:
     - Drop the PNG into your site assets
     - Add a new entry to the `sprites` array (id, label, src, frames,
       frameWidth, frameHeight, fps)
     - That's it — appears in the dropdown automatically
   ========================================================= */

(function () {
  const NS = {};

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function mount(target, opts) {
    const root = typeof target === "string" ? document.querySelector(target) : target;
    if (!root) throw new Error("SpriteAnimator: target not found");

    const sprites = (opts && opts.sprites) || [];
    const defaultId = (opts && opts.defaultId) || (sprites[0] && sprites[0].id);

    root.classList.add("sa-widget");
    root.innerHTML = "";

    // Header
    const header = el("div", "sa-header");
    const title = el("h2", "sa-title");
    title.innerHTML = 'SPRITE ANIMATOR / <span class="sa-accent">preview</span>';
    const meta = el("div", "sa-meta");
    header.appendChild(title);
    header.appendChild(meta);
    root.appendChild(header);

    // Toolbar (sprite picker — future-proof for many)
    const toolbar = el("div", "sa-toolbar");
    const pickerLabel = el("label");
    pickerLabel.appendChild(document.createTextNode("Sprite "));
    const select = el("select", "sa-select");
    sprites.forEach((s) => {
      const o = el("option");
      o.value = s.id;
      o.textContent = s.label || s.id;
      select.appendChild(o);
    });
    if (defaultId) select.value = defaultId;
    pickerLabel.appendChild(select);
    toolbar.appendChild(pickerLabel);
    root.appendChild(toolbar);

    // Preview stage
    const stagePanel = el("p", "sa-panel-label");
    stagePanel.innerHTML = '<span class="sa-num">01</span> animation preview';
    root.appendChild(stagePanel);

    const stage = el("div", "sa-stage");
    const frame = el("div", "sa-frame");
    stage.appendChild(frame);
    root.appendChild(stage);

    // Controls
    const controls = el("div", "sa-controls");
    const pauseBtn = el("button", "sa-btn", "⏸ pause");
    controls.appendChild(pauseBtn);

    const fpsLabel = el("label");
    fpsLabel.appendChild(document.createTextNode("fps "));
    const fpsRange = el("input", "sa-range");
    fpsRange.type = "range"; fpsRange.min = "1"; fpsRange.max = "24"; fpsRange.step = "1"; fpsRange.value = "8";
    fpsLabel.appendChild(fpsRange);
    const fpsVal = el("span", "sa-fpsval", "8");
    fpsLabel.appendChild(fpsVal);
    controls.appendChild(fpsLabel);

    const spacer = el("div", "sa-spacer");
    controls.appendChild(spacer);

    const scrubLabel = el("label");
    scrubLabel.appendChild(document.createTextNode("frame "));
    const scrub = el("input", "sa-scrub");
    scrub.type = "range"; scrub.min = "0"; scrub.max = "0"; scrub.step = "1"; scrub.value = "0";
    scrubLabel.appendChild(scrub);
    controls.appendChild(scrubLabel);

    root.appendChild(controls);

    // Sheet
    const sheetPanel = el("p", "sa-panel-label");
    sheetPanel.innerHTML = '<span class="sa-num">02</span> sprite sheet';
    sheetPanel.style.marginTop = "28px";
    root.appendChild(sheetPanel);

    const sheet = el("div", "sa-sheet");
    root.appendChild(sheet);

    // Footer
    const footer = el("div", "sa-footer");
    const fLeft = el("span", "", "");
    const fMid = el("span", "", "");
    const fRight = el("span", "", "loop · sequential");
    footer.appendChild(fLeft);
    footer.appendChild(fMid);
    footer.appendChild(fRight);
    root.appendChild(footer);

    // ---- state ----
    let current = null;
    let curFrame = 0;
    let fps = 8;
    let playing = true;
    let lastTs = performance.now();
    let frameAccum = 0;
    let rafId = 0;

    function setActiveCell(idx) {
      sheet.querySelectorAll(".sa-cell").forEach((c, i) => {
        c.classList.toggle("sa-active", i === idx);
      });
    }

    function showFrame(idx) {
      if (!current) return;
      const px = -idx * current.previewSize;
      frame.style.backgroundPosition = px + "px 0";
      scrub.value = idx;
      setActiveCell(idx);
    }

    function buildSheet(s) {
      sheet.innerHTML = "";
      sheet.style.gridTemplateColumns = `repeat(${s.frames}, 1fr)`;
      for (let f = 0; f < s.frames; f++) {
        const cell = el("div", "sa-cell");
        cell.dataset.frame = f;
        const num = el("div", "sa-cell-num", String(f + 1).padStart(2, "0"));
        cell.appendChild(num);
        const thumb = el("div", "sa-thumb");
        thumb.style.backgroundImage = `url("${s.src}")`;
        cell.appendChild(thumb);
        cell.addEventListener("click", () => {
          playing = false;
          pauseBtn.textContent = "▶ play";
          curFrame = f;
          showFrame(curFrame);
        });
        sheet.appendChild(cell);
      }
      // size thumbs after layout
      requestAnimationFrame(() => {
        const cells = sheet.querySelectorAll(".sa-cell");
        cells.forEach((cell, idx) => {
          const w = cell.clientWidth;
          const ratio = s.frameHeight / s.frameWidth;
          const cellH = cell.clientHeight;
          // We want the thumb to show the full frame. Sheet is (frames * frameW) x frameH.
          // Display sheet at scale where width = w*frames, height = w*ratio.
          const dispW = w * s.frames;
          const dispH = w * ratio;
          const thumb = cell.querySelector(".sa-thumb");
          thumb.style.backgroundSize = dispW + "px " + dispH + "px";
          thumb.style.backgroundPosition = (-idx * w) + "px " + ((cellH - dispH) / 2) + "px";
        });
      });
    }

    function loadSprite(id) {
      const s = sprites.find((x) => x.id === id);
      if (!s) return;
      current = Object.assign({}, s);
      // Compute preview size: target ~512px max dimension while keeping integer scale if possible
      const maxDim = 512;
      const baseDim = Math.max(s.frameWidth, s.frameHeight);
      let scale = Math.max(1, Math.floor(maxDim / baseDim));
      if (baseDim * scale > maxDim) scale = Math.max(1, scale - 1);
      // If the sprite is small (e.g. 64), allow bigger scale
      if (baseDim < 64) scale = Math.floor(maxDim / baseDim);
      current.scale = scale;
      current.previewSize = s.frameWidth * scale;
      current.previewHeight = s.frameHeight * scale;

      frame.style.width = current.previewSize + "px";
      frame.style.height = current.previewHeight + "px";
      frame.style.backgroundImage = `url("${s.src}")`;
      frame.style.backgroundSize =
        (s.frameWidth * s.frames * scale) + "px " + (s.frameHeight * scale) + "px";

      fps = s.fps || 8;
      fpsRange.value = fps;
      fpsVal.textContent = fps;

      scrub.max = String(s.frames - 1);
      curFrame = 0;
      frameAccum = 0;
      showFrame(0);

      buildSheet(s);

      // meta + footer
      meta.innerHTML =
        `frame: <b>${s.frameWidth}×${s.frameHeight}</b> &nbsp;·&nbsp; ` +
        `frames: <b>${s.frames}</b> &nbsp;·&nbsp; ` +
        `source: <b>${s.src.split("/").pop()}</b>`;
      fLeft.textContent = "sprite · " + (s.label || s.id);
      fMid.textContent = "frame · " + s.frameWidth + "×" + s.frameHeight;
    }

    // ---- loop ----
    function tick(now) {
      const dt = Math.min(0.1, (now - lastTs) / 1000);
      lastTs = now;
      if (playing && current) {
        frameAccum += dt;
        const ft = 1 / fps;
        while (frameAccum >= ft) {
          frameAccum -= ft;
          curFrame = (curFrame + 1) % current.frames;
          showFrame(curFrame);
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    // ---- wire events ----
    select.addEventListener("change", () => loadSprite(select.value));
    pauseBtn.addEventListener("click", () => {
      playing = !playing;
      pauseBtn.textContent = playing ? "⏸ pause" : "▶ play";
    });
    fpsRange.addEventListener("input", () => {
      fps = parseInt(fpsRange.value, 10);
      fpsVal.textContent = fps;
    });
    scrub.addEventListener("input", () => {
      playing = false;
      pauseBtn.textContent = "▶ play";
      curFrame = parseInt(scrub.value, 10);
      if (current) showFrame(curFrame);
    });
    window.addEventListener("resize", () => {
      if (current) buildSheet(current);
    });

    // ---- init ----
    if (sprites.length === 0) {
      stage.innerHTML = '<div class="sa-empty">No sprites configured</div>';
      return;
    }
    loadSprite(defaultId);
    rafId = requestAnimationFrame((t) => { lastTs = t; tick(t); });

    // ---- public api on the root element ----
    return {
      addSprite(s) {
        sprites.push(s);
        const o = el("option");
        o.value = s.id; o.textContent = s.label || s.id;
        select.appendChild(o);
      },
      setSprite(id) {
        select.value = id;
        loadSprite(id);
      },
      destroy() {
        cancelAnimationFrame(rafId);
        root.innerHTML = "";
      }
    };
  }

  NS.mount = mount;
  window.SpriteAnimator = NS;
})();
