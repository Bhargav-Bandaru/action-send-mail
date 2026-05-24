# Send Mail Action

A custom GitHub Action to send emails with optional attachments.

## Usage

```yaml
- name: Send Email
  uses: Bhargav-Bandaru/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 587
    username: ${{ secrets.GMAIL_USERNAME }}
    password: ${{ secrets.GMAIL_APP_PASSWORD }}
    from: ${{ secrets.GMAIL_USERNAME }}
    to: recipient@example.com
    subject: 'Test Report'
    body: 'Please find the attached report'
    attachments: 'target/cucumber-reports.html'
```

## Inputs

- `server_address` - SMTP server address (required)
- `server_port` - SMTP server port (required)
- `username` - SMTP username (required)
- `password` - SMTP password (required)
- `from` - Sender email (required)
- `to` - Recipient email (required)
- `subject` - Email subject (required)
- `body` - Email body (required)
- `attachments` - (Optional) Comma-separated file paths

## Features

- ✅ SMTP support (Gmail, Outlook, custom servers)
- ✅ Email attachments
- ✅ Secure credential handling via GitHub Secrets
- ✅ Automatic SSL/TLS detection based on port

## Setup

1. Add GitHub Secrets to your repository:
   - `GMAIL_USERNAME` - Your email address
   - `GMAIL_APP_PASSWORD` - Your Gmail app password or SMTP password
   - `TO_EMAIL` - Recipient email address

2. Use in your workflow as shown in the Usage section above

## Notes

- For Gmail with 2FA enabled, use an [App Password](https://support.google.com/accounts/answer/185833)
- Port 587 = TLS, Port 465 = SSL
