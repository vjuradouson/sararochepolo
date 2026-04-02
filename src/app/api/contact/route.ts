import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { RESEND_API_KEY, CONTACT_EMAIL, MAIL_FROM } from "@/lib/config";

const resend = new Resend(RESEND_API_KEY);

// =========================
// Utils
// =========================

function escapeHtml(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatMessage(message: string) {
    return escapeHtml(message).replace(/\n/g, "<br />");
}

// =========================
// Validation
// =========================

function validateContactForm(
    data: { name: string; email: string; message: string },
    t: (key: string) => string
) {
    const { name, email, message } = data;

    if (!name || !email || !message) {
        return t("contact.form.api.missing_fields");
    }

    if (name.length > 100) {
        return t("contact.form.api.invalid_name");
    }

    if (email.length > 254) {
        return t("contact.form.api.invalid_email");
    }

    if (message.length > 3000) {
        return t("contact.form.api.message_too_long");
    }

    return null;
}

// =========================
// Email Template
// =========================

function buildEmailTemplate(
    t: (key: string) => string,
    {
        name,
        email,
        message,
    }: {
        name: string;
        email: string;
        message: string;
    }
) {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e5e7eb;">
            
            <h2 style="margin: 0 0 24px 0; font-size: 20px; color: #111827;">
                Nuevo mensaje desde el Portfolio
            </h2>

            <div style="margin-bottom: 20px;">
                <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                    Nombre
                </p>
                <p style="margin: 4px 0 0 0; font-size: 16px; color: #111827;">
                    ${escapeHtml(name)}
                </p>
            </div>

            <div style="margin-bottom: 20px;">
                <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                    Email
                </p>
                <p style="margin: 4px 0 0 0; font-size: 16px;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
                        ${escapeHtml(email)}
                    </a>
                </p>
            </div>

            <div style="margin-top: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                    Mensaje
                </p>

                <div style="background: #f9fafb; border-radius: 12px; padding: 16px; font-size: 15px; color: #111827; line-height: 1.6;">
                    ${formatMessage(message)}
                </div>
            </div>

        </div>
    </div>
    `;
}

// =========================
// Email Sender
// =========================

async function sendContactEmail(
    t: (key: string) => string,
    data: { name: string; email: string; message: string }
) {
    const { name, email, message } = data;

    if (!CONTACT_EMAIL) {
        throw new Error("CONTACT_EMAIL is not defined");
    }

    return resend.emails.send({
        from: MAIL_FROM || "Portfolio <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        subject: `[Portfolio] Mensaje de ${name}`,
        html: buildEmailTemplate(t, { name, email, message }),
    });
}

// =========================
// Handler
// =========================

export async function POST(req: Request) {
    // 👉 locale desde frontend (recomendado)
    const locale = req.headers.get("x-locale") || "en";

    const t = await getTranslations({
        locale,
        namespace: "app",
    });

    try {
        const body = await req.json();

        const error = validateContactForm(body, t);
        if (error) {
            return Response.json({ error }, { status: 400 });
        }

        await sendContactEmail(t, body);

        return Response.json({ success: true });

    } catch (error) {
        return Response.json(
            { error: t("contact.form.api.error_sending_mail") },
            { status: 500 }
        );
    }
}