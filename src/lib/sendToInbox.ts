import { PERSONAL_INFO } from '../data/portfolioData';

// GitHub Pages is static, so form submissions are relayed to Yogesh's inbox by FormSubmit (formsubmit.co).
// The very first submission triggers a one-time activation email that must be confirmed.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${PERSONAL_INFO.email}`;

export async function sendToInbox(
  subject: string,
  replyTo: string,
  fields: Record<string, string>
): Promise<void> {
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _replyto: replyTo,
      _template: 'table',
      _captcha: 'false',
    }),
  });

  const data: { success?: string | boolean; message?: string } | null = await res.json().catch(() => null);
  if (!res.ok || data?.success === 'false' || data?.success === false) {
    throw new Error(data?.message || `Request failed (HTTP ${res.status})`);
  }
}
