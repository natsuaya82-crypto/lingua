# Lingua — the writing system feature, as a standalone brief

Everything needed to add "draw your own letters, then type your language in
them" to `www/index.html`. Written to be handed to Claude Code and implemented
without any other context.

**What it does.** The user draws each letter of their alphabet by tapping points
on a square canvas. The app compiles those drawings into a real OpenType font
**on the device**, installs it as a `@font-face`, and a toggle switches every
word in the app between roman letters and the ones they drew. Nothing about the
stored data changes — the toggle is a `font-family` swap.

**Why on the device.** No network, no build step, no server, works offline, works
the moment a letter is saved. The whole font writer is ~760 lines of ES5 and
produces about 4 KB for a ten-letter alphabet in roughly a millisecond.

---

## Fast path

    git apply --3way writing-system.diff
    node tools/inline-otf5.mjs --check
    node tools/i18n-check.mjs
    node tools/verify-script.mjs

`writing-system.diff` is the whole feature as one diff against the commit before
it. If it applies cleanly, stop here and go to **Verifying** at the bottom. If it
conflicts because the local `www/index.html` has moved on, implement by hand from
the next section — every piece is in `files/` verbatim, so nothing has to be
retyped or reinvented.

---

## The seven pieces

| # | Where | What | Source in `files/` |
|---|---|---|---|
| 1 | `tools/font-spike/otf5.js` | the font writer | `otf5.js` |
| 2 | `www/index.html`, `<style>` | the screens' CSS + the one toggle rule | `app-styles.css` |
| 3 | `www/index.html`, before `render()` | the feature itself, ~375 lines | `app-script.js` |
| 4 | `www/index.html`, inside `render()` | three lines | below |
| 5 | `www/index.html`, `vHome()` | one TOC row | below |
| 6 | all ten language blocks | 24 keys | `i18n-keys.json` |
| 7 | `tools/inline-otf5.mjs` + `tools/pre-commit` | the copy, and the guard on it | `inline-otf5.mjs` |

### 1. The font writer

Copy `files/otf5.js` to `tools/font-spike/otf5.js` **verbatim**. Do not retype it
and do not modernise it. It is a hand-written OpenType/CFF writer:
`head`/`hhea`/`maxp`/`OS/2`/`name`/`cmap`/`post`/`CFF `/`hmtx`, plus a `GSUB`
with one ligature lookup. It exports one function:

```js
LinguaFont.build(glyphDefs, opts) -> { bytes, metrics, spaceAdv, dataUrl() }
```

A glyph def is `{ name, roman, strokes }`. `strokes` is a list of
`{ pts: [[x, y] | [x, y, 'c'], ...], closed?: true }` in a 1000-unit em, y-down.
`roman` is the string of codepoints that should resolve to this drawing — the app
passes `'aA'` so an initial capital uses the same letter.

`opts` is `{ mode:'center', pen:{width,angleDeg,contrast}, ligatures, family, style }`.

Two things about it that are not obvious and are load-bearing:

- **Outlines come from a Minkowski sum, not from offsetting.** Sweeping a convex
  nib along a segment is the convex hull of the nib placed at both ends. So every
  contour emitted is convex, the CFF charstrings need only `rmoveto`/`rlineto`/
  `endchar`, and a curve tighter than the pen *cannot* fold the outline inside
  out. Someone drawing a tight curl on a phone with a fat pen would hit that
  constantly with a real offsetting routine.
- **A closed stroke needs no hole flag.** The counter is simply where the pen did
  not go, and non-zero fill does the rest.

### 2. CSS

Paste `files/app-styles.css` into the existing `<style>` block, at the end, just
before `</style>`. It defines `.gtiles/.gtile` (the letter grid), `.gcanv` (the
drawing canvas), `.gtools` (the buttons), `.spv` (the preview card), and this,
which is the entire switching mechanism:

```css
html[data-script="on"] .hw,
html[data-script="on"] .line,
html[data-script="on"] .tname,
html[data-script="on"] .link .src{font-family:'LinguaScript',serif;letter-spacing:0}
```

Nothing in it sets a colour of its own — every colour is a palette variable, both
themes, same as the rest of the file.

### 3. The feature

Paste `files/app-script.js` into `www/index.html` **immediately before**
`function render()`. It needs `analyze()`, `save()`, `render()`, `go()`, `t()`,
`tn()`, `esc()`, `toast()`, `WORDS`, `LINES`, `SET`, `langName` — all of which
already exist — and `LinguaFont`, which piece 7 inlines.

Also add the storage line next to the other `LS_*` constants:

```js
var LS_G='lingua.script';
/* The writing system. `g` maps a romanisation to the strokes drawn for it;
   `extra` holds letters the person added by hand that no word uses yet, so a
   script can be built before the dictionary is. Nothing here is ever what gets
   stored as text — a word is roman letters in WORDS and stays that way. */
var SCRIPT={g:{}, extra:[]};
```

load it beside the others:

```js
try{
  var gg=JSON.parse(localStorage.getItem(LS_G)||'null');
  if(gg && gg.g){ SCRIPT.g=gg.g; SCRIPT.extra=gg.extra||[]; }
}catch(e){}
```

save it in `save()`:

```js
localStorage.setItem(LS_G,JSON.stringify(SCRIPT));
```

and add `script:false` to the `SET` defaults.

What the pasted block contains, in the order it appears:

```
GPEN                 the pen. width 60, angle 0, contrast 1. fixed, everywhere.
GPLACE               the four corner marks an undrawn letter gets
glyphKey(r)          'sh' -> 's_h', because a digraph cannot be a codepoint
scriptLetters()      the alphabet: sounds your words use + hand-added + drawn
scriptDrawn(L)       how many of them have a drawing
scriptGlyphDefs()    -> {defs, ligs}; adds 'aA' casing and digraph components
SFONT / scriptSig()  what the installed font was built from, as one string
installScriptFont()  build + inject @font-face. ~1ms, no network
scriptOn()/setScript()
vScript()            the letters screen
addLetter()
GE / newGE / editGlyph / geMark      the editor's state and its undo mark
vGlyph()             the drawing screen
geCur/geCurve/geClose/geNew/geDel/geUndo/geClear/geSave
geMount/geAt/geDown/geMove/geUp      pointer handling on the canvas
geTools/geDraw/geTiles               canvas painting
```

### 4. Three lines in `render()`

```js
function render(){
  document.documentElement.setAttribute('lang', uiLang());
  if(!SET.done){ app.innerHTML=vOb(); return; }
  /* a word written since the font was built can need a letter it does not have */
  if(SFONT.sig!==null && SFONT.sig!==scriptSig()) installScriptFont();     // <-- add
  var v = route==='words'? vWords()
        // ...
        : route==='script'? vScript()                                      // <-- add
        : route==='glyph'? vGlyph()                                        // <-- add
        : vHome();
  /* one attribute decides whether words are shown in roman letters or in the
     ones you drew — the text itself never changes, only the family it is set in */
  document.documentElement.setAttribute('data-script', scriptOn()? 'on':'off');  // <-- add
  app.innerHTML=v;
  /* the canvases have to be filled after the HTML exists, and sized in device
     pixels, which is something no markup can say */
  if(route==='glyph') geMount();                                           // <-- add
  if(route==='script') geTiles();                                          // <-- add
}
installScriptFont();                                                       // <-- add
render();
```

The staleness guard is not decoration. The alphabet follows the dictionary, so a
word written *after* the font was built can need a letter the font does not have.
Without this, that character silently falls back to a system font and the whole
feature looks broken for one letter. Rebuilding costs about a millisecond, which
is cheap enough that being right costs nothing.

### 5. One TOC row in `vHome()`

```js
['V',  t('toc.make'), 'make',  ''],
['VI', t('toc.script'),'script', (function(){
  var L=scriptLetters(), d=scriptDrawn(L);
  return d? d+' / '+L.length : '—';
})()]
```

### 6. The 24 keys, in all ten languages

`files/i18n-keys.json` is `{ lang: { key: string } }` for en, es, pt, fr, de, it,
ru, zh, ko, ja. **Generate the insertion, do not hand-edit ten blocks** —
`files/add-script-keys.mjs` is the script that did it, and it inserts after each
block's own `'toc.make'` line. Two things it learned the hard way:

- Anchor on the **key definition shape** `/^\s*['"]toc\.make['"]\s*:/`, not on the
  string `toc.make`, which also appears inside `vHome()` and `vMake()`.
- Match **the block's own quoting** for the key, and always double-quote the
  value. The en and ja blocks quote keys with `'`, the rest with `"`.

It exits before writing if the anchor count is not exactly 10.

### 7. The inliner, and the guard on it

`www/index.html` is a single file on purpose — it is both the Vercel preview and
the Capacitor `webDir` — so the font writer cannot be a `<script src>`. Copy
`files/inline-otf5.mjs` to `tools/inline-otf5.mjs`, and put these markers in
`www/index.html` where the writer should live (before the feature block):

```js
/* --- BEGIN GENERATED from tools/font-spike/otf5.js -------------------------
   ... (the marker comment is kept; anything between the markers is replaced)
   --------------------------------------------------------------------- */
/* --- END GENERATED --------------------------------------------------------- */
```

Then `node tools/inline-otf5.mjs`. **Edit `otf5.js`, never the copy.**

Add this to `tools/pre-commit` so the pair can never drift:

```sh
if git diff --cached --name-only | grep -qE '^(www/index\.html|tools/font-spike/otf5\.js)$'; then
  node tools/inline-otf5.mjs --check || {
    echo 'The inlined copy of otf5.js is out of date. Run:'
    echo '  node tools/inline-otf5.mjs && git add www/index.html'
    exit 1
  }
fi
```

The inliner also gates on ES5, after blanking comments and string bodies — prose
like "no `Math.hypot` in ES5" would otherwise trip the very check that sentence is
explaining.

---

## The contract

These are not preferences. Breaking any of them breaks something measured.

**ES5 only inside `www/index.html`.** No arrow functions, `const`/`let`, template
literals, `Set`/`Map`, spread, `Math.hypot`, `Array.from`, `.includes()`,
`.padStart()`. The target is an old WKWebView; a `const` that every desktop
browser shrugs at is a blank screen on a real phone. Tools under `tools/` are Node
ESM and may use anything.

**Stored text stays ASCII.** `WORDS[i].hw` is roman letters before the toggle and
after it. The toggle is a `font-family` swap and nothing else. This is what keeps
CSV export, search, sorting and any future sync honest, and it is why nothing is
ever locked inside a font.

**The pen is one global setting.** `GPEN={width:60, angleDeg:0, contrast:1.0}`.
There is no per-stroke width anywhere. Kana, Hangul and Latin on a phone are all
one weight; a script someone draws should be too. Weight is therefore a slider if
it is ever wanted, and calligraphic contrast is two numbers.

**One letter is one square cell.** `CELL = 800` in a 1000 em, `advance = CELL`,
placement `mode:'center'` (`dx = round((CELL - (xMax - xMin)) / 2 - xMin)`), space
is one full cell. Measured: 13.6px per cell at 17px, identical for every letter,
worst pair error 0px, an 8-letter line exactly 8 cells.

**The cmap is keyed by romanisation.** A letter is reached by the roman letters it
is written with, so the system keyboard types it with no keyboard extension and no
transliteration step. A digraph like `sh` becomes glyph `s_h` reached by an
OpenType `liga`, and costs exactly one cell.

**Font metrics.** em 1000, ascender 800, descender −200. The authoring canvas is
y-down and fonts are y-up, so `fontY = 800 - y`.

**Palette.** Every colour is a variable, both themes, no exceptions.

---

## Gotchas already paid for

- **`hmtx.lsb` is descriptive metadata; the path coordinates are what position
  ink.** Writing a left sidebearing without translating the outline leaves every
  glyph wherever it happened to be drawn. Translate by `dx = lsb − xMin`.
- **One codepoint may be claimed once.** Two cmap segments with the same start is
  an overlapping-range error in a format 4 subtable. `addCode()` in `otf5.js`
  gives the first claim the win, which is what makes `roman: 'aA'` safe.
- **cmap format 4 `entrySelector` must be exactly `log2(segCount)`,** and encoding
  records must be sorted by platformID (Unicode 0 before Windows 3). Chromium's
  OTS sanitizer rejects both mistakes; opentype.js does not, so opentype.js
  parsing is not sufficient proof.
- **`s` + `h` is one cell, not two.** Any spacing check has to skip pairs that are
  digraphs in `scriptLetters()`, or it fails on the ligature doing its job.
- **Reversing a contour to fix winding is wrong for curves** — a control point
  belongs to the segment *arriving* at its node. This pipeline sidesteps it
  entirely: every contour is a convex hull of corners, with no controls to
  re-attach. Do not add a winding-correction step.

---

## Verifying

```
node tools/inline-otf5.mjs --check    # the copy is not stale
node tools/i18n-check.mjs             # every screen, every language
node tools/verify-script.mjs          # the real app in a phone-sized Chromium
```

`files/verify-script.mjs` drives the actual `www/index.html` at 402×874,
deviceScaleFactor 3, with Playwright + Chromium. Copy it to `tools/`. It checks,
in six sections: that a tap places a point where it was tapped and a drag moves
it; that the font is really loaded and is not a fallback; that the square cell,
the pair spacing, the digraph and the shared capital all hold; that a word written
*after* the font was built grows the alphabet and rebuilds the font; that the
toggle changes only the family while stored data stays ASCII; and that both
palettes render every tile with no app errors.

It separates app errors from resource-load failures on purpose. A sandbox with no
route to Google Fonts will fail to load the page's web fonts, and failing on that
is failing on the network, not on the code.

Expected, all passing:

```
1. the point editor    tap places a point (3); points land within 6u; drag ok;
                       curve flag 'c'; 2 -> 7 contours; 8/8 drawn
2. the font in the page  LinguaScript:loaded; not a fallback
3. the square cell     13.6px at 17px; pair 0px; 7-letter word 0px;
                       sh = 1 cell; capital = same drawing; space = 1 cell
4. a word written after the font was built
                       ahiklssht -> ahiklnorsshtu; n 1 cells, r 1 cells; 4 cells
5. the toggle          LinguaScript, serif; text still "Ashi"; stored stays ASCII
6. the screens, in both palettes
                       dark 8 tiles 0 blank; light 8 tiles 0 blank; threw nothing
```

`node tools/font-spike/verify-otf5.mjs` is a stronger check but needs the spike's
`build5.mjs` and `opentype.js` present. It proves the hand-written writer against
opentype.js three ways — placement numbers, a point-for-point parse, and
byte-identical Chromium rasters — plus that an uppercase codepoint resolves to the
same gid with no duplicate glyph.

---

## Known limits

1. **None of this has run in WKWebView on real hardware.** Chromium's OTS is the
   strictest gate available off-device and it passes, but CoreText is a different
   parser. This is the first thing to check on a real phone.
2. **Placement inside the cell is `center`.** `asdrawn` and `fit` also exist. It is
   one constant if it should change.
3. **~700 bytes per glyph** — a hull per flattened segment is more points than a
   designer would place. 4 KB for ten letters, ~140 KB for a 200-glyph system.
   Generated on device, so not worth optimising yet. The lever, if it ever is:
   emit a true two-sided offset for runs whose curvature radius exceeds the nib
   radius, keeping the hull union only for the tight ones.
4. **`fit` mode cannot widen a narrow letter.** X-scaling a vertical stem leaves it
   a vertical stem. A square-cell system needs the square visible *in the editor*;
   no post-processing recovers a letter drawn too narrow.

---

## Files

```
WRITING-SYSTEM.md      this file
writing-system.diff    the whole feature as one diff (fast path)
files/otf5.js              the font writer            -> tools/font-spike/
files/inline-otf5.mjs      the copier + ES5 gate      -> tools/
files/add-script-keys.mjs  the i18n insertion         -> tools/
files/verify-script.mjs    the end-to-end check       -> tools/
files/app-script.js        the feature, ES5           -> paste before render()
files/app-styles.css       the screens' CSS           -> paste before </style>
files/i18n-keys.json       24 keys x 10 languages
files/script-decide.png    what it looks like, and the one open choice
files/script-proof.png     both screens, both palettes
```
