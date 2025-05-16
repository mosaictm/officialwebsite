import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { name, email, phone, message } = request.body;

    if (!name || !email || !message) {
      return response.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       // e.g., 'smtp.gmail.com'
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,     // Gmail address
        pass: process.env.SMTP_PASSWORD, // 16-digit App Password (no spaces)
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"Mosaic" <${process.env.SMTP_USER}>`, // FIXED this line
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
You received a new message from your website contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return response.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return response.status(500).json({ message: 'Failed to send message.', error: errorMessage });
  }
}
