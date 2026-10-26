import { SITE_URL } from "@/lib/site";

/*
 * Transactional email via Resend's REST API.
 * Email clients ignore stylesheets, so templates use table layout with inline styles.
 */

const API_KEY = process.env.RESEND_API_KEY || process.env.Resend_key || "";
export const EMAIL_FROM = process.env.EMAIL_FROM || "Enjiri Center Ministries <hello@enjiricenterministries.org>";
export const MINISTRY_INBOX = process.env.CONTACT_INBOX || "enjiricenter@gmail.com";

const LOGO = "https://cdn.sanity.io/images/shcw5txc/production/a155b222da98472fa175f3f5015421f4fe5ca14f-1170x1174.jpg?w=144&h=144&fit=crop&auto=format";
const C = {
  royal: "#0b1f45",
  gold: "#c9a84c",
  goldDark: "#8a6d1b",
  cream: "#fffbf5",
  page: "#f1ece2",
  heading: "#1a1714",
  body: "#4a4238",
  muted: "#6b6359",
  rule: "#e8dfcc",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

const paragraphs = (text: string) =>
  escapeHtml(text)
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px;">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");

export function button(label: string, href: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px;"><tr>
    <td style="background:${C.gold};">
      <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.royal};text-decoration:none;">${label}</a>
    </td></tr></table>`;
}

export function quote(text: string) {
  return `<div style="margin:22px 0;padding:18px 22px;border-left:3px solid ${C.gold};background:#ffffff;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.body};">${paragraphs(text)}</div>`;
}

export function details(rows: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0;border-top:1px solid ${C.rule};">
    ${rows
      .map(
        ([k, v]) => `<tr>
      <td style="padding:12px 0;border-bottom:1px solid ${C.rule};width:110px;vertical-align:top;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.goldDark};">${k}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${C.rule};font-family:${SANS};font-size:15px;color:${C.heading};">${v}</td>
    </tr>`,
      )
      .join("")}
  </table>`;
}

/** Branded shell: royal header with logo, cream body, royal footer with slogan and contact lines. */
export function layout({ preheader, kicker, title, body }: { preheader: string; kicker: string; title: string; body: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
    <tr><td style="background:${C.royal};padding:28px 36px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="padding-right:16px;"><img src="${LOGO}" width="56" height="56" alt="Enjiri Center Ministries" style="display:block;border-radius:50%;border:2px solid ${C.gold};"></td>
        <td style="font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:2px;line-height:1.5;color:#ffffff;text-transform:uppercase;">Enjiri Center<br><span style="color:${C.gold};">Ministries International</span></td>
      </tr></table>
    </td></tr>
    <tr><td style="height:4px;background:${C.gold};line-height:4px;font-size:0;">&nbsp;</td></tr>
    <tr><td style="background:${C.cream};padding:40px 36px 36px;">
      <p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${C.goldDark};">${kicker}</p>
      <h1 style="margin:0 0 22px;font-family:${SERIF};font-size:28px;line-height:1.25;font-weight:700;color:${C.heading};">${title}</h1>
      <div style="font-family:${SANS};font-size:15px;line-height:1.7;color:${C.body};">${body}</div>
    </td></tr>
    <tr><td style="background:${C.royal};padding:30px 36px;text-align:center;">
      <p style="margin:0 0 14px;font-family:${SERIF};font-size:18px;font-style:italic;color:${C.gold};">Preaching Christ, Restoring Hope</p>
      <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.8;color:rgba(255,255,255,0.75);">
        Maggwa Third-Lane, Jinja, Uganda<br>
        +256 742 735 862 &nbsp;·&nbsp; +256 781 573 536<br>
        <a href="mailto:enjiricenter@gmail.com" style="color:#ffffff;text-decoration:none;">enjiricenter@gmail.com</a> &nbsp;·&nbsp;
        <a href="${SITE_URL}" style="color:#ffffff;text-decoration:none;">${SITE_URL.replace(/^https?:\/\/(www\.)?/, "")}</a>
      </p>
      <p style="margin:14px 0 0;font-family:${SANS};font-size:11px;letter-spacing:1px;color:rgba(255,255,255,0.5);">@enjiricenterministriesintl</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailOptions): Promise<boolean> {
  if (!API_KEY) {
    console.error("Resend API key missing (RESEND_API_KEY)");
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject, html, text, ...(replyTo && { reply_to: replyTo }) }),
  });
  if (!res.ok) console.error("Resend send failed", res.status, await res.text());
  return res.ok;
}

/** Adds a subscriber to the Resend audience when RESEND_AUDIENCE_ID is configured. */
export async function addToAudience(email: string): Promise<void> {
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!API_KEY || !audience) return;
  const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  if (!res.ok) console.error("Resend audience add failed", res.status, await res.text());
}
