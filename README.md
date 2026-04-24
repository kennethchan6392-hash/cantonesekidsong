# 粵語兒歌

小學生向粵語兒歌列表（React + Vite）。

## 開發（唔好用 Live Server 開根目錄）

呢個係 **Vite + React** 專案，一定要用 Vite 編譯 JSX：

```bash
npm install
npm run dev
```

喺瀏覽器開終端顯示嘅網址，**一定要包埠號**，例如 `http://localhost:5173/` 或 `http://127.0.0.1:5174/`（以終端為準）。  
只打 `127.0.0.1` 唔打 `:5173` 之類 → 連唔到 Vite → **白屏**。

**唔好用** VS Code「Live Server」去開專案 **根目錄** 嘅 `index.html`——佢唔識編譯 `/src/main.jsx`，會 **白屏**。

## 預覽打包後嘅網頁

- 同 GitHub Pages 一樣嘅路徑：`npm run build` 然後 `npm run preview`，再開提示嘅網址（路徑會包倉庫名）。
- 想喺本機用 **相對路徑**（例如用 Live Server 只開 `dist` 資料夾）：

```bash
npm run build:local
npm run preview:local
```

或用任何靜態伺服器指住 `dist/`（用 `build:local` 產出）。

## 部署到 GitHub Pages

專案已包括 **GitHub Actions**（[.github/workflows/deploy-github-pages.yml](.github/workflows/deploy-github-pages.yml)）：每次 push `main` 會 `npm ci` → `npm run build` → 只上傳 **`dist/`**。

**重要（只做一次）：** 去 GitHub repo → **Settings → Pages → Build and deployment**：

- **Source** 揀 **GitHub Actions**（唔好再揀「Deploy from a branch」用 `main` / `(root)`）。  
  若果用 branch  deploy 根目錄，網站會變成直接出未建置嘅 `index.html`（入面係 `/src/main.jsx`）→ **畫面空白**。

推送之後喺 **Actions** 分頁睇 workflow 是否綠燈；完成後先再開：

**https://kennethchan6392-hash.github.io/cantonesekidsong/**

（亦可自行用 `npm run deploy` 推到 `gh-pages` 分支；同 Pages 來源二揀一即可，避免混亂。）

`npm run build` 會用 `vite.config.js` 嘅 `GH_PAGES_BASE`（須同倉庫名 `cantonesekidsong` 一致）；本機靜態預覽用 `build:local`。
