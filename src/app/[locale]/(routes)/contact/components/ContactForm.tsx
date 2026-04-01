"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-motion-variants";
import { useTranslations } from "next-intl";

export default function ContactForm() {
    const t = useTranslations("app");

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
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error enviando el mensaje");
            }

            setSent(true);
            setForm({ name: "", email: "", message: "" });

        } catch (err) {
            setError(
                "Hubo un error: " +
                (err instanceof Error ? err.message : "Error desconocido")
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
                <h2 className="text-lg text-brand-dark">
                    ¡Mensaje enviado!
                </h2>
                <p className="text-sm text-brand-muted">
                    Gracias por escribirme. Te respondo pronto.
                </p>
                <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm font-medium underline underline-offset-4 text-brand-muted hover:text-brand-dark transition-colors"
                >
                    Enviar otro mensaje
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                    {t('contact.form.field.name.label')}
                </label>
                <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.field.name.placeholder')}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-brand-dark outline-none focus:ring-2 focus:ring-brand-dark"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                    {t('contact.form.field.email.label')}
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.field.email.placeholder')}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-brand-dark outline-none focus:ring-2 focus:ring-brand-dark"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                    {t('contact.form.field.message.label')}
                </label>
                <textarea
                    ref={textareaRef}
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.field.message.placeholder')}
                    className="w-full min-h-[120px] rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-brand-dark outline-none focus:ring-2 focus:ring-brand-dark resize-none overflow-hidden"
                />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-xl bg-brand-dark px-6 py-3 text-sm font-semibold text-white hover:opacity-80 transition-opacity disabled:opacity-50"
            >
                {loading ? "Enviando..." : "Enviar mensaje"}
            </button>
        </form>
    );
}