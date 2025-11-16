# Pearl Contact System - Setup Guide

## 🚀 Features

- ✅ Contact form with validation
- ✅ SQLite database to store all contact submissions
- ✅ Automatic email notifications to sujal.rajput.071003@gmail.com
- ✅ WhatsApp integration for direct messaging
- ✅ RESTful API for contact management
- ✅ Beautiful responsive design

## 📋 Prerequisites

- Node.js (v14 or higher) - Download from [nodejs.org](https://nodejs.org/)
- npm (comes with Node.js)
- Gmail account with 2FA enabled

## 🔧 Installation & Setup

### Step 1: Install Dependencies

Open PowerShell in the `c:\Users\ruhi0\Desktop\app` directory and run:

```powershell
npm install
```

### Step 2: Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go back to Security → App passwords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password

### Step 3: Configure Environment Variables

Edit the `.env` file and replace `your_app_password_here` with the Gmail App Password:

```
GMAIL_USER=sujal.rajput.071003@gmail.com
GMAIL_PASS=your_16_char_app_password
```

### Step 4: Start the Server

In PowerShell, run:

```powershell
npm start
```

You should see:
```
🚀 Server is running on http://localhost:3000
📧 Email notifications will be sent to: sujal.rajput.071003@gmail.com
💾 Database file: contacts.db
```

## 📝 How It Works

1. User fills out the contact form on `contact.html`
2. Clicks "Send Message" button
3. Form data is sent to backend API (`/api/contact`)
4. Backend:
   - ✅ Validates the data
   - ✅ Saves to SQLite database (`contacts.db`)
   - ✅ Sends email notification to your Gmail
   - ✅ Returns success response
5. Frontend:
   - ✅ Shows success message
   - ✅ Opens WhatsApp with pre-filled message
   - ✅ Resets form

## 📚 API Endpoints

### POST /api/contact
Submit a new contact form

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Web Design",
  "message": "I'm interested in your services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact saved and email sent successfully",
  "id": 1
}
```

### GET /api/contacts
Retrieve all contacts

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "service": "Web Design",
      "message": "I'm interested...",
      "createdAt": "2024-11-16 10:30:45"
    }
  ]
}
```

### GET /api/contacts/:id
Retrieve a specific contact by ID

### DELETE /api/contacts/:id
Delete a contact by ID

## 📊 Database Structure

The `contacts.db` SQLite database contains a `contacts` table with:

```sql
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔍 Accessing Your Database

### Option 1: Using SQLite Browser (Easy)
1. Download [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Open it and click "Open Database"
3. Select `contacts.db` from the app folder
4. View/manage your contacts

### Option 2: Using Command Line
```powershell
sqlite3 contacts.db
SELECT * FROM contacts;
.quit
```

## ⚠️ Troubleshooting

### Email Not Sending
- Check if 2FA is enabled on your Gmail
- Verify the App Password is correct in `.env`
- Make sure you're using 16-character app password, not regular password
- Check firewall/antivirus isn't blocking SMTP

### Server Won't Start
- Make sure port 3000 is not in use
- Check if all npm packages are installed
- Try: `npm install` again

### Form Not Submitting
- Open browser console (F12) and check for errors
- Make sure server is running on http://localhost:3000
- Check network tab to see API response

## 🚀 Deployment Options

### Option 1: Heroku
1. Create account on [Heroku](https://www.heroku.com/)
2. Install Heroku CLI
3. Add `.env` variables to Heroku config
4. Deploy with `git push heroku main`

### Option 2: AWS/Google Cloud
- Create Node.js instance
- Set up environment variables
- Use SQLite or upgrade to PostgreSQL

### Option 3: DigitalOcean
- Create Droplet
- Install Node.js
- Deploy using PM2 for process management

## 📧 Email Customization

Edit the HTML email template in `server.js` (around line 95) to customize the email design.

## 🔐 Security Tips

- Never commit `.env` file with real credentials
- Use strong Gmail App Password
- Implement rate limiting for production
- Add CSRF protection
- Validate all input on backend

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs in console
3. Check browser console for errors

## 📄 File Structure

```
app/
├── server.js          # Express backend server
├── package.json       # NPM dependencies
├── .env               # Environment variables (add your credentials)
├── contact.html       # Contact form page
├── about.html         # About page
├── index.html         # Home page
├── work.html          # Work/Portfolio page
├── services.html      # Services page
├── style.css          # Global styles
├── app.js             # Global JavaScript
└── contacts.db        # SQLite database (auto-created)
```

---

**Happy coding! 🎉**
