import { Resend } from 'resend';
import { logger } from '../utils/logger';
import { env } from '../config/env';

let resendClient: Resend | null = null;

/**
 * Initialize Resend client
 */
const getResendClient = (): Resend => {
  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }
  return resendClient;
};

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailTemplate {
  subject: string;
  html: (data: Record<string, unknown>) => string;
  text?: (data: Record<string, unknown>) => string;
}

/**
 * Send email using Resend
 */
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const resend = getResendClient();
    
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    
    const emailData: any = {
      from: options.from || 'onboarding@resend.dev',
      to: recipients,
      subject: options.subject,
    };
    
    if (options.html) {
      emailData.html = options.html;
    }
    if (options.text) {
      emailData.text = options.text;
    }
    if (options.replyTo) {
      emailData.reply_to = options.replyTo;
    }
    
    const result = await resend.emails.send(emailData);

    if (result.error) {
      logger.error({ error: result.error }, 'Failed to send email');
      return false;
    }

    logger.info({ emailId: result.data?.id, to: recipients }, 'Email sent successfully');
    return true;
  } catch (error) {
    logger.error({ error }, 'Email service error');
    return false;
  }
};

/**
 * Email templates
 */
export const emailTemplates: Record<string, EmailTemplate> = {
  welcome: {
    subject: 'Welcome to Our Platform!',
    html: (data) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome</title>
        </head>
        <body>
          <h1>Welcome, ${data.name || 'User'}!</h1>
          <p>Thank you for joining our platform. We're excited to have you on board.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
        </body>
      </html>
    `,
    text: (data) => `Welcome, ${data.name || 'User'}! Thank you for joining our platform.`,
  },
  
  passwordReset: {
    subject: 'Password Reset Request',
    html: (data) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
        </head>
        <body>
          <h1>Password Reset Request</h1>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <p><a href="${data.resetUrl}">Reset Password</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </body>
      </html>
    `,
    text: (data) => `Password Reset Request. Click here to reset: ${data.resetUrl}`,
  },
};

/**
 * Send templated email
 */
export const sendTemplatedEmail = async (
  templateName: string,
  to: string | string[],
  data: Record<string, unknown>,
  from?: string
): Promise<boolean> => {
  const template = emailTemplates[templateName];
  
  if (!template) {
    logger.error({ templateName }, 'Email template not found');
    return false;
  }

  return sendEmail({
    to,
    subject: template.subject,
    html: template.html(data),
    text: template.text?.(data),
    from,
  });
};

