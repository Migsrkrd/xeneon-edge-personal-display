# Xeneon Edge Widget ✅

A small React (Vite) app that acts as a personal launcher/dashboard and includes a simple password generator tool.

---

## Features ✨

- Quick launcher buttons for local apps, websites, and custom URI schemes (Discord, Slack, Excel, Spotify, etc.)
- Password Generator page that produces 10 formatted passwords: `AdjectiveNoun###` (each word capitalized; 3-digit number)
  - Click any password to copy it to clipboard and (if opened in a separate window) the window will attempt to close automatically.
  - "Regenerate 10" and "Copy All" controls provided.
- Client-side only — no server required. Uses React Router for SPA routes.

---


## Usage 🚀

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser (default: http://localhost:5173). The home view shows launcher buttons.

4. Open the Password Generator:
   - Click the **Password Generator** button to open the generator in a new tab/window, or visit `/password-generator` directly.
   - Click a password to copy it to your clipboard (browser will ask for clipboard permission if needed). If the page was opened in a new window (via `window.open` or target `_blank`), it will try to close the window after copying.

---

## Notes & Limitations ⚠️

- A browser web page cannot reliably launch arbitrary .exe files or change system-wide mute—those actions require a native helper (Electron, server, or OS-level integration). This project opens custom URI schemes (when available) or URLs.
- Clipboard operations use `navigator.clipboard` and require secure context (HTTPS or localhost) and user permission in some browsers.
- The password generator uses small word lists (packages in package.json). The generator output is deterministic only in structure — the words are random selections.

---

## Contributing / Extending 🔧

- Want the generator to support options (length, separators, more words)? Add UI controls in `src/pages/passwordGenerator.jsx`.
- To open local apps reliably: add a small native helper or convert the app to Electron.

---

If you'd like, I can also extract styles into a dedicated CSS file, add animations, or add a modal instead of a new tab for the password generator. Want any of those? 💬
