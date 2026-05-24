const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendEmail() {
  const serverAddress = process.env.INPUT_SERVER_ADDRESS;
  const serverPort = process.env.INPUT_SERVER_PORT;
  const username = process.env.INPUT_USERNAME;
  const password = process.env.INPUT_PASSWORD;
  const from = process.env.INPUT_FROM;
  const to = process.env.INPUT_TO;
  const subject = process.env.INPUT_SUBJECT;
  const body = process.env.INPUT_BODY;
  const attachmentsInput = process.env.INPUT_ATTACHMENTS;

  try {
    let transporter = nodemailer.createTransport({
      host: serverAddress,
      port: serverPort,
      secure: serverPort === 465,
      auth: {
        user: username,
        pass: password,
      },
    });

    let attachments = [];
    if (attachmentsInput) {
      const attachmentPaths = attachmentsInput.split(',').map(p => p.trim());
      for (const filePath of attachmentPaths) {
        if (fs.existsSync(filePath)) {
          attachments.push({
            filename: path.basename(filePath),
            path: filePath,
          });
        } else {
          console.warn(`Warning: Attachment not found: ${filePath}`);
        }
      }
    }

    await transporter.sendMail({
      from,
      to,
      subject,
      text: body,
      attachments,
    });

    console.log('✅ Email sent successfully!');
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    process.exit(1);
  }
}

sendEmail();
