# Deployment Guide

## GitHub Pages with GitHub Actions (Recommended)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Step 2: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"**
   - (NOT "Deploy from a branch")

### Step 3: Configure Base Path (If Needed)

If your repo is at `github.com/username/repo-name`, you need to update `vite.config.ts`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/repo-name/',  // ← Change this to your actual repo name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

**Exception:** If deploying to a custom domain or `username.github.io` (no repo name in URL), keep `base: './'`

### Step 4: Trigger Deployment

Push any commit to trigger the workflow:

```bash
git commit --allow-empty -m "Trigger deployment"
git push
```

### Step 5: Check Deployment Status

1. Go to the **Actions** tab in your GitHub repo
2. Watch the "Deploy to GitHub Pages" workflow
3. Once complete (green checkmark), your site is live!

### Step 6: Access Your Site

Your chatbot will be at:
```
https://yourusername.github.io/repo-name/
```

---

## Troubleshooting

### Blank White Screen

**Possible causes:**

1. **Wrong base path** - Check `vite.config.ts` matches your repo name
2. **Puter.js not loading** - Open browser console, look for network errors
3. **Assets not loading** - Check Network tab in browser dev tools

**To debug:**

1. Open browser console (F12)
2. Look for errors
3. Check Network tab - are CSS/JS files loading?
4. Wait 10 seconds - Puter.js needs time to initialize

### GitHub Actions Workflow Fails

1. Check the Actions tab for error messages
2. Make sure `package.json` has all dependencies
3. Verify Node version (workflow uses Node 20)

### Assets Return 404

- Your `base` path in `vite.config.ts` doesn't match your deployment URL
- If repo is `my-chatbot`, use `base: '/my-chatbot/'`

### "Loading AI service..." Never Completes

- Puter.js script blocked by ad blocker or privacy extension
- Network issues preventing Puter.js from loading
- Check browser console for errors

---

## Alternative: Manual Deploy

If you want to deploy without GitHub Actions:

1. Run `npm run build`
2. Upload contents of `dist/` folder to your web host
3. Make sure `base` in `vite.config.ts` is `'./'`

---

## Environment Variables

This project doesn't need environment variables for production. Puter.js handles authentication client-side.

---

## Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to `/public` folder with your domain
2. Update `base: './'` in `vite.config.ts`
3. Configure DNS with your domain provider
4. Follow GitHub's custom domain setup guide
