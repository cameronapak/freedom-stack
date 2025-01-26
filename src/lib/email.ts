/**
 * Adapted from: https://developers.netlify.com/guides/send-emails-with-astro-and-resend/
 */
import { createTransport, type Transporter } from "nodemailer";

type SendEmailOptions = {
  /** Email address of the recipient */
  to: string;
  /** Subject line of the email */
  subject: string;
  /** Message used for the body of the email */
  html: string;
};

// Singleton instance
let transporter: Transporter | null = null;

async function getEmailTransporter(): Promise<Transporter> {
  // Return existing transporter if already initialized
  if (transporter) {
    return transporter;
  }

  const requiredEnvVars = ["MAIL_HOST", "MAIL_PORT", "MAIL_SECURE", "MAIL_AUTH_USER", "MAIL_AUTH_PASS", "MAIL_FROM"];

  const missingEnvVars = requiredEnvVars.filter((envVar) => !import.meta.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing mail configuration: ${missingEnvVars.join(", ")}`);
  }

  // Create new transporter if none exists
  transporter = createTransport({
    host: import.meta.env.MAIL_HOST,
    port: parseInt(import.meta.env.MAIL_PORT),
    secure: import.meta.env.MAIL_SECURE === "true",
    auth: {
      user: import.meta.env.MAIL_AUTH_USER,
      pass: import.meta.env.MAIL_AUTH_PASS
    }
  });

  return transporter;
}

export async function sendEmail(options: SendEmailOptions): Promise<Transporter> {
  const emailTransporter = await getEmailTransporter();
  return new Promise(async (resolve, reject) => {
    // Build the email message
    const { to, subject, html } = options;
    const from = import.meta.env.MAIL_FROM;
    const message = { to, subject, html, from };

    // Send the email
    emailTransporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("Message sent:", info.messageId);
      resolve(info);
    });
  });
}
