// EmailJS Configuration
// EmailJS is now configured and ready to use!

export const emailjsConfig = {
  serviceId: 'service_desm0ib', // Your EmailJS Service ID
  templateId: 'template_85mnite', // Your EmailJS Template ID
  publicKey: 'kZWHTDlQPUZV5oCgG', // Your EmailJS Public Key
};

// Template content for EmailJS "Contact Us" template:
// Copy this into your EmailJS template editor:

/*
Subject: Portfolio Contact: Message from {{from_name}}

Hello Nikhil,

You have received a new message from your portfolio website:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form at nikhildamre.dev

Reply directly to this email to respond to {{from_name}}.
*/

// Template variables to use in EmailJS:
// - from_name: {{from_name}}
// - from_email: {{from_email}}
// - message: {{message}}
// - to_email: nikhildamre17@gmail.com (set this as default in EmailJS)