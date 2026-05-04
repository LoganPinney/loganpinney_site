# Sprite Animator Widget

Drop-in animated sprite-sheet viewer for your site. Ships with a sprite picker so you can register multiple sheets and switch between them.

## Files

```
sprite-widget/
├── index.html              demo page
├── sprite-widget.css       widget styles (scoped under .sa-widget)
├── sprite-widget.js        widget logic
└── sprites/
    └── BEHOLDER.png        your uploaded sheet
```

## Embed on your site

```html
<link rel="stylesheet" href="/path/to/sprite-widget/sprite-widget.css">
<div id="my-sprites"></div>
<script src="/path/to/sprite-widget/sprite-widget.js"></script>
<script>
  SpriteAnimator.mount("#my-sprites", {
    sprites: [
      { id: "beholder", label: "Beholder",
        src: "/path/to/sprites/BEHOLDER.png",
        frames: 8, frameWidth: 256, frameHeight: 256, fps: 8 }
    ],
    defaultId: "beholder"
  });
</script>
```

## Adding more sprites later

Each sheet is one entry in the `sprites` array:

| field        | description                                |
|--------------|--------------------------------------------|
| `id`         | unique key                                 |
| `label`      | name shown in the dropdown                 |
| `src`        | URL to the PNG                             |
| `frames`     | number of frames (laid out horizontally)   |
| `frameWidth` | width of one frame in px                   |
| `frameHeight`| height of one frame in px                  |
| `fps`        | default playback speed                     |

Sheets must be a single horizontal strip (frames laid left-to-right). The dropdown surfaces automatically as soon as there's more than one entry.

## Runtime API

```js
const widget = SpriteAnimator.mount("#my-sprites", { sprites: [...] });
widget.addSprite({ id, label, src, frames, frameWidth, frameHeight, fps });
widget.setSprite("beholder");
widget.destroy();
```

## Features

- Auto-scales preview to ~512px while keeping integer-pixel rendering
- Pause / FPS slider / frame scrubber
- Click any cell in the sheet to jump to that frame
- Fully scoped CSS (`.sa-widget` namespace) — won't collide with site styles
