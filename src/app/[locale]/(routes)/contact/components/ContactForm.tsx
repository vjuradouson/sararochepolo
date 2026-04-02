"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-motion-variants";
import { useTranslations, useLocale } from "next-intl";
import NeoButton from "@/components/ui/NeoButton";

export default function ContactForm() {
    const t = useTranslations("app");
    const locale = useLocale();

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-locale": locale
                },
                body: JSON.stringify(form),
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

        } catch (err) {
            setError(
                t("contact.form.submit.catch.prefix") +
                " " +
                (err instanceof Error
                    ? err.message
                    : t("contact.form.submit.catch.unknown"))
            );
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
        return (
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-start gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-8"
            >
                <span className="text-2xl">✉️</span>
                <h2 className="text-lg">
                    {t("contact.form.submit.success.message")}
                </h2>
                <p className="text-sm text-brand-muted">
                    {t("contact.form.submit.success.description")}
                </p>
                <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm font-medium underline underline-offset-4 text-brand-muted transition-colors"
                >
                    {t("contact.form.submit.success.button")}
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                    {t("contact.form.field.name.label")}
                </label>
                <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.field.name.placeholder")}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-dark"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                    {t("contact.form.field.email.label")}
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.field.email.placeholder")}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-dark"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                    {t("contact.form.field.message.label")}
                </label>
                <textarea
                    ref={textareaRef}
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.field.message.placeholder")}
                    className="w-full min-h-[120px] rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-dark resize-none overflow-hidden"
                />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <NeoButton
                size="sm"
                type="submit"
                className="w-full md:w-1/2 mx-auto justify-center"
            >
                <span>
                    {loading
                        ? t("contact.form.button.sending")
                        : t("contact.form.button.label")}
                </span>
            </NeoButton>
        </form>
    );
}