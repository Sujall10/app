# 🚀 Deploy Frontend to GitHub Pages + Backend to Heroku

## Overview

You'll have:
- **Frontend**: `https://sujall10.github.io/app/` (GitHub Pages)
- **Backend**: `https://your-app.herokuapp.com` (Heroku)
- **Database**: PostgreSQL on Heroku
- **Email**: Gmail SMTP
- **WhatsApp**: Still works!

---

## Step 1: Prepare GitHub Pages Deployment

### 1.1 Create GitHub Repository (If not done)

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit: Pearl contact system"
git remote add origin https://github.com/sujall10/app.git
git branch -M main
git push -u origin main
```

### 1.2 Verify on GitHub

Go to: `https://github.com/sujall10/app`

You should see all your files.

---

## Step 2: Configure GitHub Pages

### 2.1 Enable GitHub Pages

1. Go to: `https://github.com/sujall10/app/settings`
2. Scroll to "GitHub Pages"
3. **Source**: Select `main` branch
4. **Folder**: Select `/ (root)`
5. Click "Save"

### 2.2 Your GitHub Pages Site

It will be available at: `https://sujall10.github.io/app/`

**Wait 2-5 minutes** for it to deploy.

---

## Step 3: Update Frontend URLs for Backend

Your frontend files need to know WHERE the backend is.

### 3.1 Update contact.html

Find this line:
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

Replace with:
```javascript
const response = await fetch('https://your-heroku-app.herokuapp.com/api/contact', {
```

### 3.2 Update admin.html

Find all instances of:
```
http://localhost:3000
```

Replace with:
```
https://your-heroku-app.herokuapp.com
```

### 3.3 Commit & Push

```bash
git add contact.html admin.html
git commit -m "Update API URLs for production"
git push origin main
```

---

## Step 4: Deploy Backend to Heroku

### 4.1 Install Heroku CLI

Download: https://devcenter.heroku.com/articles/heroku-cli

### 4.2 Create Heroku App

```bash
heroku login
heroku create your-heroku-app
```

(Replace `your-heroku-app` with your desired app name, e.g., `pearl-contact-api`)

### 4.3 Create Procfile

Create a file called `Procfile` (no extension):

```
web: node server.js
```

### 4.4 Configure Database

Heroku uses PostgreSQL instead of SQLite. Update `server.js`:

```javascript
// At the top of server.js, replace SQLite with:

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Initialize database
pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        service VARCHAR(100),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);
```

### 4.5 Add Heroku PostgreSQL

```bash
heroku addons:create heroku-postgresql:hobby-dev -a your-heroku-app
```

### 4.6 Install pg Package

```bash
npm install pg
```

### 4.7 Deploy to Heroku

```bash
git add .
git commit -m "Add Procfile and PostgreSQL configuration"
git push heroku main
```

### 4.8 Set Environment Variables

```bash
heroku config:set GMAIL_USER=sujal.rajput.071003@gmail.com -a your-heroku-app
heroku config:set GMAIL_PASS=bsymwrfrivxrdbkv -a your-heroku-app
heroku config:set NODE_ENV=production -a your-heroku-app
```

### 4.9 Check Logs

```bash
heroku logs --tail -a your-heroku-app
```

---

## Step 5: Verify Everything Works

### 5.1 Test Frontend

Open: `https://sujall10.github.io/app/`

You should see your portfolio site with working navigation.

### 5.2 Test Contact Form

1. Click "Contact" link
2. Fill out form
3. Click "Send Message"
4. **Expected**:
   - ✅ Data saved to Heroku database
   - ✅ Email sent to inbox
   - ✅ WhatsApp message opens
   - ✅ Success message shown

### 5.3 Test Admin Dashboard

Open: `https://sujall10.github.io/app/admin.html`

You should see all submitted contacts.

---

## 🛠️ Updated server.js for PostgreSQL

Here's the updated connection code:

```javascript
const express = require('express');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Initialize database table
pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        service VARCHAR(100),
        message TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Database table verified');
    }
});

// API endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, phone, service, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            error: 'Please fill in all required fields' 
        });
    }

    try {
        // Save to database
        const result = await pool.query(
            `INSERT INTO contacts (firstName, lastName, email, phone, service, message) 
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [firstName, lastName, email, phone || null, service || null, message]
        );

        const contactId = result.rows[0].id;
        console.log(`Contact saved with ID: ${contactId}`);

        // Send email (same as before)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'sujal.rajput.071003@gmail.com',
            subject: `New Contact: ${firstName} ${lastName}`,
            html: `
                <h2>New Contact Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Return success
        res.json({ 
            success: true, 
            message: 'Contact saved successfully',
            id: contactId
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error' 
        });
    }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM contacts ORDER BY createdAt DESC'
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve contacts' });
    }
});

// Get single contact
app.get('/api/contacts/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM contacts WHERE id = $1',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve contact' });
    }
});

// Delete contact
app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM contacts WHERE id = $1 RETURNING id',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ success: true, message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
```

---

## 📋 Deployment Checklist

- [ ] GitHub repository created with all files
- [ ] GitHub Pages enabled
- [ ] Frontend URLs updated for backend API
- [ ] Heroku CLI installed
- [ ] Heroku app created
- [ ] PostgreSQL database added to Heroku
- [ ] Procfile created
- [ ] server.js updated for PostgreSQL
- [ ] package.json has `pg` module
- [ ] Environment variables set on Heroku
- [ ] Code pushed to Heroku
- [ ] Frontend accessible at GitHub Pages URL
- [ ] Backend API working on Heroku
- [ ] Contact form tested end-to-end

---

## 🎯 Final URLs

**Frontend (GitHub Pages):**
```
https://sujall10.github.io/app/
https://sujall10.github.io/app/contact.html
https://sujall10.github.io/app/admin.html
https://sujall10.github.io/app/about.html
https://sujall10.github.io/app/service.html
https://sujall10.github.io/app/work.html
```

**Backend (Heroku):**
```
https://your-heroku-app.herokuapp.com/api/contact
https://your-heroku-app.herokuapp.com/api/contacts
```

---

## 🚀 Quick Start Summary

```bash
# 1. Push to GitHub
git add .
git commit -m "Update for GitHub Pages + Heroku"
git push origin main

# 2. Enable GitHub Pages
# → Go to repo settings → GitHub Pages → Select main branch

# 3. Install Heroku
# → Download from https://devcenter.heroku.com/articles/heroku-cli

# 4. Deploy backend to Heroku
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev -a your-app-name
npm install pg
git push heroku main
heroku config:set GMAIL_USER=... GMAIL_PASS=...

# 5. Done! Your site is live at:
# Frontend: https://sujall10.github.io/app/
# Backend: https://your-app-name.herokuapp.com
```

---

## ❓ FAQ

**Q: Can I use a custom domain instead of github.io?**
A: Yes! Configure custom domain in GitHub Pages settings.

**Q: Will my data be safe?**
A: Yes! PostgreSQL on Heroku is secure. Always use HTTPS (automatic with Heroku).

**Q: What if I exceed free tier limits?**
A: Upgrade to paid plans. Very affordable ($7-25/month).

**Q: Can I switch databases later?**
A: Yes! PostgreSQL code is standard. Works with any provider.

---

**Ready to deploy? Let me know your Heroku app name!** 🎉
