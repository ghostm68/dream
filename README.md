# Dreamweaver Chatbot

An embeddable AI chatbot widget for exploring the Dreamweaver literary work, powered by Puter.js with support for multiple AI models.

## Features

- Multiple AI model selection (GPT-4o, Claude 3.5 Sonnet, Gemini, DeepSeek, Llama)
- Context-aware responses about the Dreamweaver literary work
- No API keys required (users pay for their own usage via Puter.js)
- Embeddable chat widget with clean, modern UI
- Mobile responsive design

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` folder.

## Deployment Options

### Option 1: GitHub Pages (Recommended)

This project includes a GitHub Actions workflow that automatically builds and deploys on push.

**Setup Steps:**

1. Push this repo to GitHub

2. Go to repository Settings → Pages

3. Under "Build and deployment":
   - Set Source to **"GitHub Actions"** (not "Deploy from a branch")

4. Push any commit to the `main` branch to trigger deployment

5. Your chatbot will be live at `https://yourusername.github.io/repo-name/`

**Important:** If your repo name is not the root domain, update `vite.config.ts`:
```javascript
base: '/your-repo-name/'  // Change this to match your repo name
```

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Installs dependencies
- Runs the build
- Deploys to GitHub Pages

### Option 2: Direct File Upload

Upload these files to your web server:
- `dist/index.html` → Your main page
- `dist/assets/` → All files in this folder

Make sure to preserve the folder structure.

### Option 3: Embed in Existing Site

To add the chatbot to an existing webpage:

1. Add Puter.js script to your HTML `<head>`:
```html
<script src="https://js.puter.com/v2/"></script>
```

2. Include the built CSS and JS files:
```html
<link rel="stylesheet" href="path/to/assets/index-WWEF5Rg-.css">
<script type="module" src="path/to/assets/index-CLsfCveu.js"></script>
```

3. Add a root div:
```html
<div id="root"></div>
```

The chat button will appear in the bottom-right corner.

## Troubleshooting

### Blank Screen Issues

If you see a blank screen:

1. **Check browser console** for errors
2. **Verify Puter.js loaded** - Look for the Puter.js script in Network tab
3. **Check asset paths** - Ensure CSS/JS files are loading correctly
4. **Wait for Puter.js** - The widget shows "Loading AI service..." while Puter.js initializes

### GitHub Pages Specific

- Paths are relative (`./assets/`) so they work in subdirectories
- Make sure the `dist/` folder is committed to your repo
- Allow a few minutes after pushing for GitHub Pages to update

## How It Works

The chatbot uses:
- **Puter.js** for AI access without backend infrastructure
- **React** for the UI components
- **Tailwind CSS** for styling
- **Vite** for building and bundling

The AI models are accessed client-side, with users authenticating through Puter and paying for their own usage.

## Customization

### Change Available Models

Edit `src/models.ts` to add/remove AI models.

### Modify Context

Edit `src/dreamweaverContext.ts` to change the AI's knowledge base and behavior.

### Styling

The widget uses Tailwind CSS. Colors and styling can be modified in the component files in `src/components/`.
