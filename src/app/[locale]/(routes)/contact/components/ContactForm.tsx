"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import NeoButton from "@/components/ui/NeoButton";

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
                    "x-locale": locale,
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
                initial="hidden"
                animate="show"
                variants={fadeInUp}
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
                    className="mt-2 text-sm font-medium underline underline-offset-4 text-brand-muted"
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
            className="flex flex-col gap-5"
        >
            {["name", "email", "message"].map((field, i) => (
                <motion.div key={field} variants={fadeInUp} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                        {t(`contact.form.field.${field}.label`)}
                    </label>

                    {field === "message" ? (
                        <textarea
                            ref={textareaRef}
                            name="message"
                            required
                            value={form.message}
                            onChange={handleChange}
                            placeholder={t(`contact.form.field.${field}.placeholder`)}
                            className="w-full min-h-[120px] rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-dark focus:border-transparent resize-none"
                        />
                    ) : (
                        <input
                            name={field}
                            type={field === "email" ? "email" : "text"}
                            required
                            value={(form as any)[field]}
                            onChange={handleChange}
                            placeholder={t(`contact.form.field.${field}.placeholder`)}
                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-dark focus:border-transparent"
                        />
                    )}
                </motion.div>
            ))}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full md:w-1/2 mx-auto"
            >
                <NeoButton
                    size="sm"
                    type="submit"
                    className="w-full justify-center"
                >
                    <span>
                        {loading
                            ? t("contact.form.button.sending")
                            : t("contact.form.button.label")}
                    </span>
                </NeoButton>
            </motion.div>
        </motion.form>
    );
}