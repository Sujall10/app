# 🎯 Pearl Contact System - QUICK REFERENCE CARD

## 🚀 START HERE

```
Step 1: npm install
Step 2: Configure .env (add Gmail password)
Step 3: npm start
Step 4: Visit http://localhost:3000/contact.html
```

---

## 📍 IMPORTANT NUMBERS

| Item | Value |
|------|-------|
| **Port** | 3000 |
| **Gmail** | sujal.rajput.071003@gmail.com |
| **WhatsApp** | +91 9328422802 |

---

## 🔗 ACCESS POINTS

| Location | URL |
|----------|-----|
| **Website** | http://localhost:3000 |
| **Contact Form** | http://localhost:3000/contact.html |
| **Admin Panel** | http://localhost:3000/admin.html |
| **All Contacts API** | http://localhost:3000/api/contacts |

---

## 📝 FORM FIELDS

- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Service (dropdown)
- Message (required)

---

## 🎬 FLOW ON SUBMIT

1. Form validates ✓
2. Data saved to database ✓
3. Email sent to Gmail ✓
4. WhatsApp opens ✓
5. Success message ✓

---

## 📊 DATABASE INFO

**File:** contacts.db
**Type:** SQLite3
**Table:** contacts
**Created:** Automatically on first run

---

## 🔧 COMMANDS

```powershell
# Install dependencies
npm install

# Start server
npm start

# Stop server
Ctrl + C

# Run setup verification
.\verify-setup.bat

# Start with batch file
.\START_SERVER.bat
```

---

## 📧 EMAIL SETUP

1. Go: https://myaccount.google.com/apppasswords
2. Select: Mail + Windows Computer
3. Copy: 16-character password
4. Paste: Into .env GMAIL_PASS line

---

## ⚠️ TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| npm: command not found | Install Node.js |
| Cannot find module | Run: npm install |
| Email not sending | Check 16-char password |
| Port 3000 in use | Change port in .env |
| Database error | Delete contacts.db |

---

## 📂 KEY FILES

| File | Purpose |
|------|---------|
| server.js | Backend API |
| contact.html | Contact form |
| admin.html | Dashboard |
| .env | Email config |
| package.json | Dependencies |

---

## 🎯 ADMIN PANEL FEATURES

- View all contacts
- See contact details
- Delete contacts
- Export to CSV
- View statistics
- Auto-refresh

---

## 📱 RESPONSIVE SIZES

- Desktop: 1200px+
- Tablet: 768-1024px
- Mobile: 480-768px
- Small: <480px

---

## ✅ TESTING CHECKLIST

- [ ] Server starts
- [ ] Website loads
- [ ] Form submits
- [ ] Email received
- [ ] WhatsApp opens
- [ ] Admin shows contact
- [ ] CSV exports
- [ ] Mobile responsive

---

## 📚 DOCUMENTATION FILES

**Read these in order:**
1. COMPLETE_SUMMARY.md ← Overview
2. QUICK_START.md ← Setup (5 min)
3. VISUAL_GUIDE.md ← Diagrams
4. INSTALLATION_CHECKLIST.md ← Verify

---

## 🔐 SECURITY

✓ Input validation
✓ Environment variables
✓ SQL injection prevention
✓ CORS configured
✓ Error handling

---

## 📈 API ENDPOINTS

```
POST /api/contact
  → Submit contact form

GET /api/contacts
  → Get all contacts

GET /api/contacts/1
  → Get contact by ID

DELETE /api/contacts/1
  → Delete contact
```

---

## 💾 BACKUP

```
Important files to backup:
- contacts.db (database)
- .env (credentials)
- Exported CSVs (data)
```

---

## 🚀 DEPLOYMENT

When ready to go live, see:
**SETUP_GUIDE.md → Deployment section**

Options:
- Heroku
- AWS
- DigitalOcean
- Google Cloud
- Azure

---

## 📞 CONTACTS

**Send notifications to:**
sujal.rajput.071003@gmail.com

**WhatsApp to:**
+91 9328422802

---

## ⏱️ TYPICAL TIMES

| Task | Time |
|------|------|
| npm install | 5-10 min |
| .env setup | 2 min |
| npm start | <5 sec |
| Form submit | <1 sec |
| Email send | 1-3 sec |
| Admin load | <1 sec |

---

## 🆘 COMMON ERRORS

```
Error: Cannot find module
→ Run: npm install

Error: EADDRINUSE
→ Port in use, change PORT in .env

Error: Database locked
→ Delete contacts.db, restart

Error: Email failed
→ Check Gmail App Password
```

---

## 📋 FILE STRUCTURE

```
app/
├── server.js
├── contact.html
├── admin.html
├── package.json
├── .env
├── .env.example
├── .gitignore
├── START_SERVER.bat
├── verify-setup.bat
├── contacts.db
└── docs/
```

---

## 💡 TIPS & TRICKS

1. Use incognito browser to bypass cache
2. Check browser console (F12) for errors
3. Monitor server console for logs
4. Export CSV for data analysis
5. Delete test contacts from admin

---

## 🎯 SUCCESS INDICATORS

✓ No console errors
✓ Contacts appear in admin
✓ Emails arrive quickly
✓ WhatsApp opens
✓ Form submits in <1 sec
✓ Mobile looks good

---

## 🏁 YOU'RE READY!

**Start:**
```
npm install
```

**Then:**
```
npm start
```

**Then:**
Visit http://localhost:3000/contact.html

**Done!** 🎉

---

**Questions?** Check DOCUMENTATION_INDEX.md

**Need help?** See INSTALLATION_CHECKLIST.md
