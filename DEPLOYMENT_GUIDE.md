# 🚀 Production Deployment Guide

## Prerequisites
- Node.js installed on your server
- Your domain name pointing to your server
- SSL certificate (Let's Encrypt is free)
- Database backup plan

---

## Step 1: Choose Your Hosting Provider

### Option A: Heroku (Easiest)
1. Sign up at https://www.heroku.com
2. Install Heroku CLI
3. Run: `heroku create your-app-name`
4. Run: `git push heroku main`
5. Set environment variables:
   ```
   heroku config:set GMAIL_USER=sujal.rajput.071003@gmail.com
   heroku config:set GMAIL_PASS=jqxdycuzdzznnkxtk
   heroku config:set NODE_ENV=production
   ```

### Option B: AWS EC2
1. Launch Ubuntu EC2 instance
2. Install Node.js: `sudo apt install nodejs npm`
3. Clone your repository
4. Run: `npm install`
5. Use PM2 to keep server running: `npm install -g pm2` then `pm2 start server.js`

### Option C: DigitalOcean App Platform
1. Sign up at https://www.digitalocean.com
2. Connect your GitHub repository
3. Set environment variables in Dashboard
4. Deploy automatically

### Option D: Your Own Server (VPS/Dedicated)
1. SSH into your server
2. Install Node.js and npm
3. Clone repository
4. Configure firewall to allow port 80/443
5. Use PM2 or systemd to keep server running

---

## Step 2: Update Your Domain

Add these DNS records (example for DigitalOcean/AWS):

```
A Record:    example.com      -> Your Server IP
A Record:    www.example.com  -> Your Server IP
```

---

## Step 3: Set Up SSL/HTTPS (IMPORTANT!)

### Using Let's Encrypt (Free):

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update your .env
PORT=443
SSL_CERT=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
SSL_KEY=/etc/letsencrypt/live/yourdomain.com/privkey.pem
```

### Update server.js for HTTPS:

```javascript
const https = require('https');
const fs = require('fs');

if (process.env.NODE_ENV === 'production') {
    const options = {
        cert: fs.readFileSync(process.env.SSL_CERT),
        key: fs.readFileSync(process.env.SSL_KEY)
    };
    https.createServer(options, app).listen(PORT, () => {
        console.log(`🔒 Secure server running on https://yourdomain.com`);
    });
} else {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
```

---

## Step 4: Database Migration

### Important: Don't use SQLite in production!

Upgrade to PostgreSQL:

1. **Install PostgreSQL on your server:**
   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

2. **Create database:**
   ```bash
   sudo -u postgres createdb contacts_db
   ```

3. **Update server.js to use PostgreSQL:**

```javascript
const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME
});

// Replace all db.run() with pool.query()
```

4. **Add to .env:**
   ```
   DB_USER=postgres
   DB_PASSWORD=your_secure_password
   DB_HOST=localhost
   DB_NAME=contacts_db
   DB_PORT=5432
   ```

5. **Install pg module:**
   ```bash
   npm install pg
   ```

---

## Step 5: Environment Variables in Production

Update your `.env` file on the production server:

```properties
# Gmail SMTP Configuration
GMAIL_USER=sujal.rajput.071003@gmail.com
GMAIL_PASS=jqxdycuzdzznnkxtk

# Server Configuration
PORT=80
NODE_ENV=production

# SSL Configuration (if using HTTPS)
SSL_CERT=/etc/letsencrypt/live/yourdomain.com/fullchain.pem
SSL_KEY=/etc/letsencrypt/live/yourdomain.com/privkey.pem

# Database (PostgreSQL in production)
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_NAME=contacts_db
```

---

## Step 6: Backup Strategy

### Daily Database Backups:

```bash
# Create backup script: backup.sh
#!/bin/bash
BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump contacts_db > $BACKUP_DIR/contacts_$DATE.sql
# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete
```

Make it run daily with cron:
```bash
0 2 * * * /path/to/backup.sh
```

---

## Step 7: Monitoring & Logging

### Use PM2 for Process Management:

```bash
npm install -g pm2

# Start server
pm2 start server.js --name "contact-form"

# Enable auto-restart on reboot
pm2 startup
pm2 save

# View logs
pm2 logs contact-form

# Monitor
pm2 monit
```

---

## Step 8: Update contact.html for Production

Change API endpoint from `localhost:3000` to your domain:

**Before (Development):**
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

**After (Production):**
```javascript
const response = await fetch('https://yourdomain.com/api/contact', {
```

---

## Step 9: Security Checklist

- ✅ HTTPS/SSL enabled
- ✅ Environment variables in `.env` (never commit credentials)
- ✅ Database password strong and unique
- ✅ CORS configured for your domain only
- ✅ Rate limiting enabled (prevent spam)
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection headers
- ✅ Regular backups scheduled
- ✅ Monitor server logs
- ✅ Update dependencies regularly

---

## Step 10: Test Before Going Live

1. Fill out the contact form
2. Verify data saves to database
3. Verify email is sent
4. Verify WhatsApp message opens
5. Check admin dashboard
6. Test from different devices
7. Test on slow connections

---

## Troubleshooting

### Port 80/443 requires sudo
```bash
sudo node server.js
# Better: Use reverse proxy (nginx)
```

### Nginx Reverse Proxy Setup:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Check if port is in use:
```bash
sudo lsof -i :80
sudo lsof -i :443
```

---

## Support

For issues, check:
- Server logs: `pm2 logs`
- Email configuration: Verify GMAIL_PASS is correct
- Database connection: Check credentials in .env
- SSL certificate: Check expiration `certbot certificates`

---

**Your site is now production-ready! 🎉**
