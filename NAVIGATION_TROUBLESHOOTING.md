# 🔧 Navigation Links - Troubleshooting Guide

## Issue: About, Service, Work Pages Not Opening

Your navigation links might not be working for several reasons. Let me help you diagnose and fix this.

---

## 🔍 Common Causes

### 1. **Server Not Running on Correct Port**
- Your server is set to port **80** in `.env`
- But try accessing on port **3000** first (default Node.js port)

**Test**: 
- Try: `http://localhost:3000/index.html`
- NOT: `http://localhost/index.html`

**Fix**: Change `.env` PORT from 80 to 3000 (port 80 requires admin privileges)

### 2. **Express Server Not Serving Static Files Correctly**
- The `server.js` should serve all HTML files as static content

**Current status**: ✅ Should be working (Express uses `express.static()`)

### 3. **Links Might Be Using Wrong Paths**
- Navigation uses relative paths: `work.html`, `service.html`, `about.html`
- These should work fine if served from same directory

---

## ✅ How to Test & Fix

### Step 1: Update .env to Use Port 3000 (Easier)

Edit your `.env` file:

```properties
# Change this:
PORT=80

# To this:
PORT=3000
```

**Why?** Port 80 requires admin privileges and can cause issues. Port 3000 is standard for development.

### Step 2: Restart Server

```bash
# Stop current server (Ctrl+C or)
Get-Process node | Stop-Process -Force

# Start with npm
npm start
```

### Step 3: Test in Browser

Open: **`http://localhost:3000`** (NOT localhost:80)

Try clicking:
- ✅ Work
- ✅ Services
- ✅ About
- ✅ Contact

---

## 🔗 Navigation Link Verification

Your `index.html` has these links:

```html
<li><a href="work.html">Work</a></li>
<li><a href="service.html">Services</a></li>
<li><a href="about.html">About</a></li>
<li><a href="contact.html">Contact</a></li>
```

**These are correct!** ✅

---

## 📝 Verify All Files Exist

Run this command to verify all HTML files are in the same directory:

```bash
Get-ChildItem C:\Users\ruhi0\Desktop\app\*.html
```

You should see:
- ✅ index.html
- ✅ about.html
- ✅ service.html
- ✅ work.html
- ✅ contact.html

If any are missing, that's your problem!

---

## 🔧 Update .env File Now

I'll help you change the port. Here's what to do:

1. Open `.env` file in VS Code
2. Find: `PORT=80`
3. Change to: `PORT=3000`
4. Save (Ctrl+S)
5. Restart server:
   ```bash
   npm start
   ```

---

## 🌐 Then Try This

Open in browser: **http://localhost:3000**

Click each navigation link:
1. **Work** → Should open `http://localhost:3000/work.html`
2. **Services** → Should open `http://localhost:3000/service.html`
3. **About** → Should open `http://localhost:3000/about.html`
4. **Contact** → Should open `http://localhost:3000/contact.html`

---

## 💡 If Still Not Working

Check these:

1. **Is server running?**
   ```bash
   Get-Process node
   ```
   Should show: `node.exe`

2. **Is it on port 3000?**
   ```bash
   netstat -ano | findstr :3000
   ```
   Should show listening port

3. **Are there console errors?**
   - Open Developer Tools: **F12**
   - Go to **Console** tab
   - Look for red errors
   - Tell me what you see!

4. **Can you access index.html directly?**
   - Try: `http://localhost:3000/index.html`
   - Should see the homepage

---

## 🚀 Quick Fix Checklist

- [ ] Changed PORT from 80 to 3000 in `.env`
- [ ] Restarted server with `npm start`
- [ ] Accessing `http://localhost:3000` (not 80)
- [ ] All HTML files exist in directory
- [ ] Links work! ✅

---

## 📌 Navigation Links Reference

| Link | File | URL |
|------|------|-----|
| Work | work.html | http://localhost:3000/work.html |
| Services | service.html | http://localhost:3000/service.html |
| About | about.html | http://localhost:3000/about.html |
| Contact | contact.html | http://localhost:3000/contact.html |

---

**Try changing the port to 3000 first - that's probably the issue!** 🎯
