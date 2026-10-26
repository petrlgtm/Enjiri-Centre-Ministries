"use server";

import { SITE_URL } from "@/lib/site";
import { MINISTRY_INBOX, addToAudience, button, details, escapeHtml, layout, quote, sendEmail } from "@/lib/email";

type ActionResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

export async function sendContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}): Promise<ActionResult> {
  // Honeypot: real visitors never see or fill this field
  if (input.company) return { ok: true };

  const name = clean(input.name, 100);
  const email = clean(input.email, 200);
  const subject = clean(input.subject, 150);
  const message = clean(input.message, 5000);
  if (!name || !EMAIL_RE.test(email) || !subject || message.length < 2) {
    return { ok: false, error: "Please fill in every field with a valid email address." };
  }

  const firstName = escapeHtml(name.split(/\s+/)[0]);
  const sentAt = new Date().toLocaleString("en-GB", { timeZone: "Africa/Kampala", dateStyle: "medium", timeStyle: "short" });

  const delivered = await sendEmail({
    to: MINISTRY_INBOX,
    replyTo: email,
    subject: `New message: ${subject}`,
    html: layout({
      preheader: `${name} wrote: ${message.slice(0, 90)}`,
      kicker: "Website contact form",
      title: `New message from ${escapeHtml(name)}`,
      body:
        details([
          ["Name", escapeHtml(name)],
          ["Email", `<a href="mailto:${escapeHtml(email)}" style="color:#8a6d1b;">${escapeHtml(email)}</a>`],
          ["Subject", escapeHtml(subject)],
          ["Received", `${sentAt} (EAT)`],
        ]) +
        quote(message) +
        button(`Reply to ${firstName}`, `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`),
    }),
    text: `New message from ${name} <${email}>\nSubject: ${subject}\nReceived: ${sentAt} (EAT)\n\n${message}`,
  });
  if (!delivered) return { ok: false, error: "We couldn't send your message right now. Please try again or call us." };

  await sendEmail({
    to: email,
    replyTo: MINISTRY_INBOX,
    subject: "We've received your message — Enjiri Center Ministries",
    html: layout({
      preheader: "Thank you for reaching out. A member of our team will respond soon.",
      kicker: "Message received",
      title: `Thank you, ${firstName}`,
      body:
        `<p style="margin:0 0 14px;">We've received your message and a member of our team will get back to you as soon as possible. If it's urgent, you can call us on <strong>+256 742 735 862</strong>.</p>` +
        `<p style="margin:0;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#8a6d1b;">Your message · ${escapeHtml(subject)}</p>` +
        quote(message) +
        `<p style="margin:0;font-family:Georgia,serif;font-style:italic;color:#1a1714;">“The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.” <span style="font-style:normal;font-size:13px;color:#6b6359;">— Numbers 6:24–25</span></p>` +
        button("Watch our latest sermons", `${SITE_URL}/sermons`),
    }),
    text: `Thank you, ${name.split(/\s+/)[0]}.\n\nWe've received your message and a member of our team will get back to you soon. If it's urgent, call +256 742 735 862.\n\nYour message (${subject}):\n${message}\n\nPreaching Christ, Restoring Hope\nEnjiri Center Ministries International · Maggwa Third-Lane, Jinja, Uganda`,
  });

  return { ok: true };
}

export async function subscribeToNewsletter(input: { email: string; company?: string }): Promise<ActionResult> {
  if (input.company) return { ok: true };
  const email = clean(input.email, 200);
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };

  await addToAudience(email);

  const welcomed = await sendEmail({
    to: email,
    replyTo: MINISTRY_INBOX,
    subject: "Welcome to the Enjiri Center family",
    html: layout({
      preheader: "Devotionals, events and sermons — straight to your inbox.",
      kicker: "You're subscribed",
      title: "Welcome to the family",
      body:
        `<p style="margin:0 0 14px;">Thank you for joining us. You'll receive devotionals, news of upcoming gatherings — from <strong>Redefining Destinies</strong> every second Tuesday to our crusades and soul winning campaigns — and our latest messages.</p>` +
        `<p style="margin:0 0 14px;">We'd love to worship with you in person. You'll find us at <strong>Maggwa Third-Lane, Jinja</strong>.</p>` +
        button("See upcoming events", `${SITE_URL}/services`),
    }),
    text: `Welcome to the Enjiri Center family!\n\nYou'll receive devotionals, news of upcoming gatherings and our latest messages.\nSee upcoming events: ${SITE_URL}/services\n\nPreaching Christ, Restoring Hope\nMaggwa Third-Lane, Jinja, Uganda`,
  });
  if (!welcomed) return { ok: false, error: "We couldn't subscribe you right now. Please try again." };

  await sendEmail({
    to: MINISTRY_INBOX,
    subject: `New newsletter subscriber: ${email}`,
    html: layout({
      preheader: `${email} subscribed on the website.`,
      kicker: "Newsletter",
      title: "New subscriber",
      body: details([["Email", `<a href="mailto:${escapeHtml(email)}" style="color:#8a6d1b;">${escapeHtml(email)}</a>`]]),
    }),
    text: `New newsletter subscriber: ${email}`,
  });

  return { ok: true };
}
