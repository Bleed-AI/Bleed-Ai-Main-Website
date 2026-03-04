# 🚀 Quick Start - Deploy to Hostinger in 5 Minutes

## What's Ready
- ✅ Website fully built and tested
- ✅ All pages working (Homepage + /book-call)
- ✅ Popups implemented and styled
- ✅ Ready to upload to Hostinger

---

## 3 Ways to Deploy

### Method 1: File Manager (Easiest)
1. Log into Hostinger: https://hpanel.hostinger.com
2. Click **File Manager** → Navigate to **public_html**
3. Download `bleedai-hostinger-deploy.tar.gz` from your computer
4. Upload it in File Manager
5. Right-click → **Extract**
6. Done! Your site is live

### Method 2: FTP Upload (Fastest)
1. Get FTP credentials from Hostinger Control Panel
2. Use FileZilla: https://filezilla-project.org/
3. Connect with your FTP details
4. Drag-and-drop all files from `out/` folder to `/public_html/`
5. Done! Your site is live

### Method 3: Hostinger App (Mobile)
1. Download Hostinger app on your phone
2. Log in with your credentials
3. Find File Manager
4. Upload the deployment package
5. Extract and done!

---

## Testing After Upload

### ✅ Quick Test (30 seconds)
```
1. Open https://yourdomain.com
2. Wait 10 seconds → CTA popup should appear
3. Click close button → Testimonials show up
4. Visit https://yourdomain.com/book-call
5. Both pages working = SUCCESS ✅
```

### 🔍 Full Test (2 minutes)
- [ ] CTA popup appears after 10 seconds
- [ ] Button has glow animation on hover
- [ ] "Limited Spots Available" badge is visible
- [ ] Can close popup with X button
- [ ] Testimonials cycle through (3 total)
- [ ] /book-call page works
- [ ] Mobile design looks good (zoom out on desktop)
- [ ] No red errors in browser console (F12 key)

---

## File Locations

| File/Folder | Purpose |
|------------|---------|
| `bleedai-hostinger-deploy.tar.gz` | Download this to deploy |
| `out/` | All website files (alternative to tar.gz) |
| `HOSTINGER_DEPLOYMENT_GUIDE.md` | Detailed instructions |
| `DEPLOYMENT_CHECKLIST.md` | Full verification checklist |

---

## What Gets Uploaded

```
Your Domain Root (public_html/)
├── index.html                    ← Homepage
├── book-call/index.html          ← Book call page
├── 404.html                      ← Error page
├── _next/                        ← JavaScript & CSS
├── images/                       ← All images
└── [other static files]
```

**Total Size:** 1.2 MB compressed | ~5 MB uncompressed

---

## After Deployment

### If Everything Works ✅
- Your website is live
- Popups will show automatically
- No further action needed
- Bookmark: `HOSTINGER_DEPLOYMENT_GUIDE.md` for future updates

### If Something's Wrong ❌
1. **Check console errors:** Open browser, press F12, click Console
2. **Check file upload:** Go to File Manager, verify files are there
3. **Wait 5 minutes:** DNS might need to propagate
4. **Clear cache:** Press Ctrl+Shift+Delete (or Cmd+Shift+Del on Mac)
5. **Try different browser:** Sometimes cache issues with one browser

### Common Quick Fixes
| Problem | Solution |
|---------|----------|
| Blank page | Clear cache (Ctrl+Shift+Delete) |
| No styles | Check if `_next` folder exists in public_html |
| Popups don't show | Wait 10 seconds, check F12 console |
| Slow loading | Normal for first load, refresh the page |

---

## Important URLs

| URL | Purpose |
|-----|---------|
| `https://yourdomain.com` | Your homepage |
| `https://yourdomain.com/book-call` | Book call page |
| `https://hpanel.hostinger.com` | Hostinger control panel |

---

## Before You Start

### Have Ready:
- [ ] Hostinger login credentials
- [ ] Domain name
- [ ] FTP credentials (if using FTP method)
- [ ] The `out/` folder or `bleedai-hostinger-deploy.tar.gz` file

### Time Needed:
- Upload: 2-5 minutes
- Testing: 2-3 minutes
- **Total: ~5-10 minutes**

---

## During Upload

### File Manager Method
```
Step 1: Upload (.tar.gz file)          1-2 min
Step 2: Extract                        1 min
Step 3: Move to public_html root       1 min
Step 4: Test in browser                2 min
TOTAL TIME: 5-6 minutes
```

### FTP Method
```
Step 1: Connect FTP                    1 min
Step 2: Upload all files               2-3 min
Step 3: Test in browser                2 min
TOTAL TIME: 5-6 minutes
```

---

## Support

### Need Help?
Check these files in order:
1. **QUICK_START.md** (this file) - Quick answers
2. **HOSTINGER_DEPLOYMENT_GUIDE.md** - Detailed steps
3. **DEPLOYMENT_CHECKLIST.md** - Verification guide
4. **DEPLOYMENT_SUMMARY.md** - Complete overview

---

## Key Reminder

⚠️ **All files must go into `public_html` folder, NOT in a subfolder**

✅ Correct:
```
public_html/index.html
public_html/_next/
public_html/book-call/
```

❌ Wrong:
```
public_html/out/index.html
public_html/out/_next/
```

---

## One-Line Summary

**Upload everything from the `out/` folder to Hostinger's `public_html` folder → Your website is live! 🎉**

---

**Status:** ✅ Ready to Deploy
**Build Date:** February 5, 2026
**Version:** 1.0 - Production Ready

Good luck! 🚀
