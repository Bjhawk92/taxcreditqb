import { FORMSPREE_ENDPOINT, WEB3FORMS_KEY } from "@/lib/site";

export type FormPayload = Record<string, string>;

export async function submitForm(payload: FormPayload, subject: string) {
  if (WEB3FORMS_KEY) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        ...payload,
      }),
    });
    if (!res.ok) throw new Error("Submit failed");
    return;
  }

  if (FORMSPREE_ENDPOINT) {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ subject, ...payload }),
    });
    if (!res.ok) throw new Error("Submit failed");
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 450));
}
