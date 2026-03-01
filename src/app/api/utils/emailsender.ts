// lib/emailSender.ts
import axios from 'axios';

type EmailRecipient = {
  address: string;
};

type EmailAttachment = {
  // File data as base64 encoded string
  content: string;
  // Filename with extension
  name: string;
  // Optional MIME type (if not provided, will be guessed from file extension)
  contentType?: string;
};

type EmailOptions = {
  subject: string;
  body: string;
  isHtml?: boolean;
  recipients: string[];
  cc?: string[];
  bcc?: string[];
  saveToSentItems?: boolean;
  attachments?: EmailAttachment[];
};

/**
 * Sends an email using Microsoft Graph API with optional attachments
 * @param options Email configuration options
 * @returns Promise resolving to success status and message or error
 */
export async function sendEmail(options: EmailOptions) {
  const tenantId = process.env.AZURE_TENANT_ID!;
  const clientId = process.env.AZURE_CLIENT_ID!;
  const clientSecret = process.env.AZURE_CLIENT_SECRET!;
  const senderEmail = process.env.AZURE_SENDER_EMAIL!;

  try {
    // Step 1: Get access token
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Format recipients
    const formatRecipients = (emails: string[]) => {
      return emails.map(email => ({
        emailAddress: { address: email },
      }));
    };

    // Format attachments if provided
    const formattedAttachments =
      options.attachments?.map(attachment => ({
        '@odata.type': '#microsoft.graph.fileAttachment',
        name: attachment.name,
        contentType: attachment.contentType || getContentTypeFromFileName(attachment.name),
        contentBytes: attachment.content,
      })) || [];

    // Step 2: Send email
    const emailPayload = {
      message: {
        subject: options.subject,
        body: {
          contentType: options.isHtml !== false ? 'HTML' : 'Text',
          content: options.body,
        },
        toRecipients: formatRecipients(options.recipients),
        ...(options.cc && options.cc.length > 0
          ? { ccRecipients: formatRecipients(options.cc) }
          : {}),
        ...(options.bcc && options.bcc.length > 0
          ? { bccRecipients: formatRecipients(options.bcc) }
          : {}),
        ...(formattedAttachments.length > 0 ? { attachments: formattedAttachments } : {}),
      },
      saveToSentItems: options.saveToSentItems !== false ? 'true' : 'false',
    };

    await axios.post(
      `https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`,
      emailPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return { success: true, message: 'Email sent successfully' };
  } catch (error: any) {
    console.error('Error sending email:', error?.response?.data || error.message);
    return {
      success: false,
      error: error?.response?.data || error.message,
    };
  }
}

/**
 * Helper function to guess MIME type from file extension
 */
function getContentTypeFromFileName(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    txt: 'text/plain',
    csv: 'text/csv',
    html: 'text/html',
    zip: 'application/zip',
    json: 'application/json',
    xml: 'application/xml',
  };

  return mimeTypes[extension] || 'application/octet-stream';
}
