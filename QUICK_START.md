# 🚀 Quick Start Guide - Pearl Contact System

## ⚡ 5-Minute Setup

### Step 1: Install Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Install with default settings
- Restart your computer

### Step 2: Open Terminal
- Press `Win + R`
- Type: `powershell`
- Type: `cd c:\Users\ruhi0\Desktop\app`

### Step 3: Install Packages
```powershell
npm install
```

### Step 4: Get Gmail App Password
1. Go to [Gmail Security](https://myaccount.google.com/security)
2. Click "App passwords" (bottom of page)
3. Select Mail → Windows Computer
4. Copy the 16-character password

### Step 5: Configure Email
Edit `.env` file and change:
```
GMAIL_PASS=paste_your_16_char_password_here
```

### Step 6: Start Server
```powershell
npm start
```

You should see:
```
🚀 Server is running on http://localhost:3000
```

## ✅ Testing

### Test 1: Open Website
- Go to http://localhost:3000
- Click "Contact" link
- Fill form and click "Send Message"
- ✅ Should open WhatsApp AND send email

### Test 2: Check Database
- Go to http://localhost:3000/admin.html
- Should see your contact in the table
- ✅ Contact saved successfully

### Test 3: Check Email
- Go to your Gmail inbox
- Should have email from contact form
- ✅ Email received

## 📊 Access Points

| Purpose | URL |
|---------|-----|
| Contact Form | http://localhost:3000/contact.html |
| Admin Panel | http://localhost:3000/admin.html |
| API - All Contacts | http://localhost:3000/api/contacts |
| API - Single Contact | http://localhost:3000/api/contacts/1 |

## 🔧 Common Issues & Fixes

### "npm: command not found"
- Node.js not installed or not in PATH
- Restart computer after installing Node.js

### "Cannot find module 'express'"
- Run `npm install` again
- Check internet connection

### "Email not sending"
- Check Gmail App Password is correct (16 chars, with spaces removed)
- Make sure 2FA is enabled on Gmail
- Check `.env` file has correct credentials

### "Port 3000 already in use"
- Another app using port 3000
- Change PORT in `.env` to 3001
- Restart server

## 📝 File Explanations

| File | Purpose |
|------|---------|
| `server.js` | Backend API server |
| `contact.html` | Contact form page |
| `admin.html` | Admin dashboard to view contacts |
| `.env` | Email credentials (keep secret!) |
| `package.json` | Project dependencies |
| `contacts.db` | SQLite database (auto-created) |

## 💡 Next Steps

### Deploy to Internet
Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) for deployment options

### Customize Email
Edit email template in `server.js` (line ~95)

### Add More Pages
Copy contact form code to other pages

### Advanced
- Add payment processing
- User authentication
- Advanced filtering
- Data analytics

## 🆘 Need Help?

1. Check server console for errors
2. Open browser DevTools (F12)
3. Check Network tab for API responses
4. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed help

## 🎉 You're All Set!

Your contact system is now ready:
✅ Form collects data
✅ Saves to database
✅ Sends you email
✅ Sends user to WhatsApp

**Enjoy! 🚀**
