
import nodemailer, { Transporter } from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  service: process.env.SMTP_SERVICE,
  auth: {
      // user:'ebenezerfrimpong17@gmail.com',
      // pass: 'ktdlqikdqlkokscv'
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
  }
})

export const mailOptions = {
  from: email,
};