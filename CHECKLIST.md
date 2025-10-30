# Deployment Checklist

## Before Pushing to GitHub

- [ ] Update `vite.config.ts` with your repo name:
  ```javascript
  base: '/your-repo-name/'  // Change this!
  ```
  (Skip if using custom domain or `username.github.io`)

- [ ] Test locally:
  ```bash
  npm run build
  npm run preview
  ```

## Push to GitHub

- [ ] Initialize git repo (if not done):
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  ```

- [ ] Add remote and push:
  ```bash
  git remote add origin https://github.com/USERNAME/REPO.git
  git push -u origin main
  ```

## Configure GitHub Pages

- [ ] Go to repo Settings → Pages
- [ ] Set Source to **"GitHub Actions"**
- [ ] Wait for workflow to complete (check Actions tab)

## Verify Deployment

- [ ] Visit: `https://USERNAME.github.io/REPO/`
- [ ] Click the chat button (bottom-right)
- [ ] Try sending a message about Dreamweaver
- [ ] Test switching between AI models

## If Something's Wrong

See DEPLOY.md for troubleshooting steps.

---

## Quick Test Checklist

Once deployed, verify:

- [ ] Page loads without blank screen
- [ ] Chat button appears (bottom-right)
- [ ] Chat opens when clicked
- [ ] Model selector shows 6 options
- [ ] Welcome message appears
- [ ] Can type in text box
- [ ] Shows "Loading AI service..." briefly
- [ ] Can send message
- [ ] Receives AI response
- [ ] Can switch models
- [ ] Mobile responsive (check on phone)
