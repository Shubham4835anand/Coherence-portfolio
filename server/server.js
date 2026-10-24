import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server directory and root
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security and performance middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(compression());
app.use(express.json());

// Rate limiter for general requests
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', generalLimiter);

// Strict rate limiter for contact submissions
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this IP, please try again in a few minutes.' }
});

// Paths to JSON data
const contentPath = path.join(__dirname, 'data', 'content.json');
const leadsPath = path.join(__dirname, 'data', 'leads.json');

// Helper to load content
function loadContent() {
  try {
    const raw = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading content.json:', err);
    return null;
  }
}

// Nodemailer Transporter
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('[EMAIL] EMAIL_USER or EMAIL_PASS not configured in .env. Skipping email dispatch.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: user,
      pass: pass
    }
  });
}

// Send Email Notifications
async function sendLeadEmails(lead) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: 'Transporter not configured' };

  const targetEmail = process.env.LEAD_NOTIFICATION_EMAIL || process.env.EMAIL_USER;

  // 1. Notification to Agency / Admin
  const adminMailOptions = {
    from: `"Coherence Visual Inquiries" <${process.env.EMAIL_USER}>`,
    to: targetEmail,
    replyTo: lead.email,
    subject: `[New Lead] ${lead.name} - ${lead.service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #ECECF2; border-radius: 10px; background-color: #FFFFFF;">
        <h2 style="color: #C72C81; margin-top: 0; margin-bottom: 18px; font-size: 22px;">New Client Inquiry Received</h2>
        <p style="color: #555566; font-size: 14px; margin-bottom: 20px;">A potential client has submitted an inquiry through the Coherence Visual website:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #F0EFF6;">
            <td style="padding: 10px 0; font-weight: bold; width: 140px; color: #17153B;">Client Name:</td>
            <td style="padding: 10px 0; color: #333344;">${lead.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EFF6;">
            <td style="padding: 10px 0; font-weight: bold; color: #17153B;">Email Address:</td>
            <td style="padding: 10px 0;"><a href="mailto:${lead.email}" style="color: #C72C81; text-decoration: none;">${lead.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EFF6;">
            <td style="padding: 10px 0; font-weight: bold; color: #17153B;">Phone Number:</td>
            <td style="padding: 10px 0;"><a href="tel:${lead.phone}" style="color: #17153B; text-decoration: none;">${lead.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EFF6;">
            <td style="padding: 10px 0; font-weight: bold; color: #17153B;">Service Needed:</td>
            <td style="padding: 10px 0;"><span style="background: #F1EFF9; color: #17153B; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px;">${lead.service}</span></td>
          </tr>
          <tr style="border-bottom: 1px solid #F0EFF6;">
            <td style="padding: 10px 0; font-weight: bold; color: #17153B;">Timestamp:</td>
            <td style="padding: 10px 0; color: #666677;">${new Date(lead.timestamp).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #17153B;">Client IP:</td>
            <td style="padding: 10px 0; color: #888899; font-size: 12px;">${lead.ip}</td>
          </tr>
        </table>

        <div style="background-color: #F8F8FC; border-left: 4px solid #C72C81; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
          <div style="font-weight: bold; color: #17153B; margin-bottom: 8px;">Project Details & Message:</div>
          <p style="margin: 0; color: #444455; white-space: pre-line; line-height: 1.6;">${lead.message}</p>
        </div>

        <div style="text-align: center; padding-top: 10px; border-top: 1px solid #ECECF2; font-size: 12px; color: #888899;">
          Coherence Visual Automated Lead Notification System
        </div>
      </div>
    `
  };

  // 2. Confirmation Receipt to Client
  const clientMailOptions = {
    from: `"Coherence Visual" <${process.env.EMAIL_USER}>`,
    to: lead.email,
    subject: `Thank you for contacting Coherence Visual`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #ECECF2; border-radius: 10px; background-color: #FFFFFF;">
        <h2 style="color: #17153B; margin-top: 0; margin-bottom: 12px;">Thank you for reaching out!</h2>
        <p style="color: #555566; font-size: 15px; line-height: 1.6;">Hi <strong>${lead.name}</strong>,</p>
        <p style="color: #555566; font-size: 15px; line-height: 1.6;">
          We have received your inquiry regarding <strong>${lead.service}</strong>. Our managing directors and creative strategy team will review your requirements and contact you within 24 business hours.
        </p>

        <div style="background-color: #F8F8FC; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <div style="font-size: 13px; font-weight: bold; color: #17153B; margin-bottom: 6px;">Summary of your message:</div>
          <p style="margin: 0; font-size: 13px; color: #666677; font-style: italic;">"${lead.message}"</p>
        </div>

        <p style="color: #555566; font-size: 14px; line-height: 1.6;">
          If you have immediate questions, feel free to reply directly to this email or call us at <a href="tel:+919876543210" style="color: #C72C81; text-decoration: none; font-weight: bold;">+91 98765 43210</a>.
        </p>

        <div style="margin-top: 30px; padding-top: 16px; border-top: 1px solid #ECECF2; color: #888899; font-size: 12px;">
          <strong>Coherence Visual</strong> &bull; Digital Marketing Agency<br/>
          Creative Media Hub, New Delhi, India
        </div>
      </div>
    `
  };

  try {
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log(`[EMAIL] Notification sent to ${targetEmail} (MessageId: ${adminInfo.messageId})`);

    // Attempt client confirmation as well
    try {
      await transporter.sendMail(clientMailOptions);
      console.log(`[EMAIL] Confirmation sent to client ${lead.email}`);
    } catch (clientErr) {
      console.warn(`[EMAIL] Client confirmation skipped or failed: ${clientErr.message}`);
    }

    return { sent: true, messageId: adminInfo.messageId };
  } catch (err) {
    console.error('[EMAIL ERROR] Failed to send email via SMTP:', err);
    return { sent: false, error: err.message };
  }
}

// 1. Navigation Endpoint (Blog explicitly excluded)
app.get('/api/nav', (req, res) => {
  const content = loadContent();
  if (!content) return res.status(500).json({ error: 'Content unavailable' });

  // Filter out any accidental 'blog' references
  const nav = (content.navigation || []).filter(item => 
    !item.path.toLowerCase().includes('blog') && 
    !item.name.toLowerCase().includes('blog')
  );

  res.json({
    navigation: nav,
    brand: content.brand
  });
});

// 2. Brand & Metadata Endpoint
app.get('/api/brand', (req, res) => {
  const content = loadContent();
  if (!content) return res.status(500).json({ error: 'Content unavailable' });
  res.json(content.brand);
});

// 3. Page Content Endpoint
app.get('/api/content/:page', (req, res) => {
  const { page } = req.params;
  const content = loadContent();
  if (!content) return res.status(500).json({ error: 'Content unavailable' });

  // Normalize page name
  const pageKey = page === 'home' || page === '' ? 'home' : page;

  if (pageKey === 'blog') {
    return res.status(404).json({ error: 'Page not found' });
  }

  const pageData = content.pages[pageKey];
  if (!pageData) {
    return res.status(404).json({ error: `Page '${pageKey}' not found` });
  }

  res.json({
    page: pageKey,
    brand: content.brand,
    navigation: content.navigation,
    data: pageData
  });
});

// 4. Contact Form Submission Endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, phone, message, service } = req.body;

  // Validation
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('A valid name with at least 2 characters is required.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('A valid email address is required.');
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
    errors.push('A valid phone number is required.');
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    errors.push('Message must be at least 5 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    service: service || 'General Inquiry',
    message: message.trim(),
    timestamp: new Date().toISOString(),
    ip: req.ip || req.headers['x-forwarded-for'] || 'unknown'
  };

  try {
    // 1. Save lead to JSON file
    let leads = [];
    if (fs.existsSync(leadsPath)) {
      const raw = fs.readFileSync(leadsPath, 'utf8');
      leads = JSON.parse(raw || '[]');
    }
    leads.push(newLead);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
    console.log(`[LEAD RECEIVED] ${newLead.name} (${newLead.email}) for ${newLead.service}`);

    // 2. Dispatch real email via Nodemailer
    const emailResult = await sendLeadEmails(newLead);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
      leadId: newLead.id,
      emailSent: emailResult.sent
    });
  } catch (err) {
    console.error('Error saving lead or sending email:', err);
    return res.status(500).json({ success: false, message: 'Server error saving inquiry.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Coherence Visual API', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Coherence Visual Express API listening on http://localhost:${PORT}`);
  // Test transporter initialization on start
  const transporter = getTransporter();
  if (transporter) {
    transporter.verify().then(() => {
      console.log(`[EMAIL] Nodemailer SMTP verified & connected to ${process.env.EMAIL_HOST} (${process.env.EMAIL_USER})`);
    }).catch(err => {
      console.error('[EMAIL] Nodemailer SMTP connection check failed:', err.message);
    });
  }
});
