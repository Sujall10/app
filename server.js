const express = require('express');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Initialize SQLite Database
const db = new sqlite3.Database('./contacts.db', (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            service TEXT,
            message TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Database table created/verified');
        }
    });
}

// Configure Nodemailer for Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER || 'your-email@gmail.com',
        pass: process.env.GMAIL_PASS || 'your-app-password'
    }
});

// Verify transporter connection (non-blocking)
transporter.verify((error, success) => {
    if (error) {
        console.log('⚠️  SMTP Error - Email may not work:', error.message);
        console.log('ℹ️  Server will still run. Check your Gmail app password.');
    } else {
        console.log('✓ SMTP Server is ready to send emails');
    }
});

// API endpoint to handle form submission
app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, phone, service, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            error: 'Please fill in all required fields' 
        });
    }

    try {
        // Save to database
        db.run(
            `INSERT INTO contacts (firstName, lastName, email, phone, service, message) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, email, phone || null, service || null, message],
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ 
                        success: false, 
                        error: 'Failed to save to database' 
                    });
                }

                console.log(`Contact saved with ID: ${this.lastID}`);

                // Send email notification
                const mailOptions = {
                    from: process.env.GMAIL_USER || 'your-email@gmail.com',
                    to: 'sujal.rajput.071003@gmail.com',
                    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #333; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
                                New Contact Form Submission
                            </h2>
                            
                            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                                <p><strong>Service Interested In:</strong> ${service || 'Not specified'}</p>
                            </div>

                            <div style="margin: 20px 0;">
                                <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                                <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #8B5CF6; white-space: pre-wrap;">
                                    ${message}
                                </p>
                            </div>

                            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                                <p style="margin: 0; color: #2e7d32;">
                                    <strong>✓ This contact has been automatically saved to your database</strong>
                                </p>
                                <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                                    Received at: ${new Date().toLocaleString()}
                                </p>
                            </div>

                            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                            <p style="color: #999; font-size: 12px; text-align: center;">
                                This is an automated email from Pearl's Contact Form
                            </p>
                        </div>
                    `
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Email sending error:', error);
                        // Still return success since database was saved
                        return res.json({ 
                            success: true, 
                            message: 'Contact saved successfully (email notification failed)',
                            id: this.lastID
                        });
                    } else {
                        console.log('Email sent:', info.response);
                        return res.json({ 
                            success: true, 
                            message: 'Contact saved and email sent successfully',
                            id: this.lastID
                        });
                    }
                });
            }
        );
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error occurred' 
        });
    }
});

// API endpoint to retrieve all contacts
app.get('/api/contacts', (req, res) => {
    db.all('SELECT * FROM contacts ORDER BY createdAt DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve contacts' });
        }
        res.json({ success: true, data: rows });
    });
});

// API endpoint to get contact by ID
app.get('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve contact' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ success: true, data: row });
    });
});

// API endpoint to delete a contact
app.delete('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM contacts WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete contact' });
        }
        res.json({ success: true, message: 'Contact deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📧 Email notifications will be sent to: sujal.rajput.071003@gmail.com`);
    console.log(`💾 Database file: contacts.db\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nClosing database connection...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});
