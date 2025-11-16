# 🔄 Update URLs for Production

## Step 1: Update contact.html

In `contact.html`, find the form submission handler and update the API URL:

### Current (Development):
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

### After Deployment to yourdomain.com:
```javascript
const response = await fetch('https://yourdomain.com/api/contact', {
```

**Location**: Search for `localhost:3000` in contact.html and replace with your domain

---

## Step 2: Update admin.html

In `admin.html`, update all API calls:

### Current (Development):
```javascript
fetch('http://localhost:3000/api/contacts')
fetch('http://localhost:3000/api/contacts/' + id)
```

### After Deployment:
```javascript
fetch('https://yourdomain.com/api/contacts')
fetch('https://yourdomain.com/api/contacts/' + id)
```

**Location**: Search for `localhost:3000` in admin.html and replace with your domain

---

## Step 3: Update WhatsApp Number (Optional)

In `contact.html`, search for the WhatsApp integration:

### Current:
```javascript
const whatsappURL = `https://api.whatsapp.com/send?phone=919328422802&text=${encodedMessage}`;
```

This is already set to your WhatsApp number (+91 9328422802). Only change if you want a different number.

---

## Step 4: Deployment Helper Script

Create a file called `deploy.sh` to automate updates:

```bash
#!/bin/bash

# Configuration
DOMAIN="yourdomain.com"
OLD_URL="http://localhost:3000"
NEW_URL="https://$DOMAIN"

echo "🚀 Updating URLs for production deployment to $DOMAIN"

# Update contact.html
sed -i "s|$OLD_URL|$NEW_URL|g" contact.html
echo "✓ Updated contact.html"

# Update admin.html
sed -i "s|$OLD_URL|$NEW_URL|g" admin.html
echo "✓ Updated admin.html"

echo "✅ All URLs updated to: $NEW_URL"
echo ""
echo "Next steps:"
echo "1. Commit changes: git add . && git commit -m 'Update URLs for production'"
echo "2. Deploy to your hosting provider"
echo "3. Verify at: https://$DOMAIN/contact.html"
```

### How to use:
```bash
# 1. Edit deploy.sh and set DOMAIN="yourdomain.com"
# 2. Run: bash deploy.sh
# 3. Verify changes with: grep yourdomain.com contact.html admin.html
```

---

## Step 5: Production Configuration Files

### .env for Production Server:
```properties
# Gmail SMTP Configuration
GMAIL_USER=sujal.rajput.071003@gmail.com
GMAIL_PASS=jqxdycuzdzznnkxtk

# Server Configuration
PORT=80
NODE_ENV=production

# Optional: SSL Certificate Paths (if using HTTPS)
# SSL_CERT=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
# SSL_KEY=/etc/letsencrypt/live/yourdomain.com/privkey.pem

# Optional: PostgreSQL Database (upgrade from SQLite)
# DB_USER=postgres
# DB_PASSWORD=secure_password
# DB_HOST=localhost
# DB_NAME=contacts_db
```

### .env for Development (your local machine):
```properties
# Gmail SMTP Configuration
GMAIL_USER=sujal.rajput.071003@gmail.com
GMAIL_PASS=jqxdycuzdzznnkxtk

# Server Configuration
PORT=3000
NODE_ENV=development
```

---

## Step 6: Verify Before Deployment

Run these tests locally before deploying:

```bash
# 1. Start the server
npm start

# 2. Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "1234567890",
    "service": "Web Design",
    "message": "This is a test"
  }'

# 3. Expected response:
# {"success":true,"message":"Contact saved successfully...","id":1}

# 4. Retrieve contacts
curl http://localhost:3000/api/contacts

# 5. Open in browser
# http://localhost:3000/contact.html
# http://localhost:3000/admin.html
```

---

## Summary

| Item | Development | Production |
|------|-------------|-----------|
| URL | http://localhost:3000 | https://yourdomain.com |
| Port | 3000 | 80 or 443 |
| SSL | No | Yes (Let's Encrypt) |
| Environment | development | production |
| Database | SQLite (contacts.db) | SQLite or PostgreSQL |
| Backups | Manual | Automated daily |

---

## Ready to Deploy?

✅ Your site is ready! Choose your hosting from:
1. **Heroku** - Easiest (5 minutes)
2. **DigitalOcean** - Good balance (20 minutes)
3. **AWS** - Most powerful (30 minutes)
4. **Your VPS** - Full control (45 minutes)

See `DEPLOYMENT_GUIDE.md` for detailed steps!
