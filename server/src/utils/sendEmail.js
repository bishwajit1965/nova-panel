import nodemailer from "nodemailer";
import { config } from "../config/env.js";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Nova Panel" <${config.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};
