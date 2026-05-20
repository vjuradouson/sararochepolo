"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import NeoButton from "@/components/ui/NeoButton";
import { trackFormSubmit } from "@/lib/gtm";
import { TURNSTILE_SITE_KEY } from "@/lib/config";
import TurnstileWidget from "./TurnstileWidget";

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE_OUT },
    },
};

export default function ContactForm() {
    const t = useTranslations("app");
    const locale = useLocale();

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const startedAtRef = useRef<number>(Date.now());

    const handleVerify = useCallback((token: string) => setTurnstileToken(token), []);
    const handleExpire = useCallback(() => setTurnstileToken(""), []);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

        if (e.target.name === "message" && textareaRef.current) {
            const el = textareaRef.current;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (TURNSTILE_SITE_KEY && !turnstileToken) {
            setError(t("contact.form.submit.captcha_required"));
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-locale": locale,
                },
                body: JSON.stringify({
                    ...form,
                    honeypot,
                    startedAt: startedAtRef.current,
                    turnstileToken,
                }),
            });

            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error(t("contact.form.submit.json_error"));
            }

            if (!res.ok) {
                throw new Error(data?.error || t("contact.form.submit.ko"));
            }

            setSent(true);
            setForm({ name: "", email: "", message: "" });
            setTurnstileToken("");
            startedAtRef.current = Date.now();
            trackFormSubmit({ form_id: 'contact', status: 'success' });
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : t("contact.form.submit.catch.unknown");
            setError(t("contact.form.submit.catch.prefix") + ": " + errorMessage);
            trackFormSubmit({
                form_id: 'contact',
                status: 'error',
                error_message: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
        return (
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeInUp}
                className="flex flex-col items-start gap-4 rounded-2xl bg-neutral-100 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            >
                <h2 className="text-lg font-light">
                    {t("contact.form.submit.success.message")}
                </h2>
                <p className="text-sm text-neutral-500">
                    {t("contact.form.submit.success.description")}
                </p>
                <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm underline text-neutral-500"
                >
                    {t("contact.form.submit.success.button")}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col gap-6"
        >
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                />
            </div>

            {["name", "email", "message"].map((field) => (
                <motion.div key={field} variants={fadeInUp} className="flex flex-col gap-2">
                    <label
                        htmlFor={field}
                        className="text-md font-semibold"
                    >
                        {t(`contact.form.field.${field}.label`)}
                    </label>

                    {field === "message" ? (
                        <textarea
                            id={field}
                            ref={textareaRef}
                            name={field}
                            required
                            value={form.message}
                            onChange={handleChange}
                            className="shadow-[inset_6px_6px_10px_#d3d3d3,inset_-1px_-1px_1px_#eeeeee] w-full min-h-[140px] rounded-3xl bg-neutral-100 px-4 py-3 text-md outline-none placeholder:text-neutral-700 resize-none"
                        />
                    ) : (
                        <input
                            id={field}
                            name={field}
                            type={field === "email" ? "email" : "text"}
                            required
                            value={form[field as keyof typeof form]}
                            onChange={handleChange}
                            placeholder={t(`contact.form.field.${field}.placeholder`)}
                            className="shadow-[inset_6px_6px_10px_#d3d3d3,inset_-1px_-1px_1px_#eeeeee] w-full rounded-full bg-neutral-100 px-5 py-3 text-md outline-none placeholder:text-neutral-500"
                        />
                    )}
                </motion.div>
            ))}

            {error && <p className="text-md text-red-500">{error}</p>}

            <motion.div
                variants={fadeInUp}
                className="w-full"
            >
                <NeoButton
                    size="md"
                    type="submit"
                    className="w-full justify-center rounded-full py-3 text-xl tracking-[0.3em] bg-light-blue color-black font-bold"
                >
                    <span className="uppercase font-semibold">
                        {loading
                            ? t("contact.form.button.sending")
                            : t("contact.form.button.label")}
                    </span>
                </NeoButton>
            </motion.div>

            {TURNSTILE_SITE_KEY && (
                <TurnstileWidget
                    sitekey={TURNSTILE_SITE_KEY}
                    locale={locale}
                    onVerify={handleVerify}
                    onExpire={handleExpire}
                    onError={handleExpire}
                />
            )}
        </motion.form>
    );
}
