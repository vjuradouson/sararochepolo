"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-motion-variants";

export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO: conectar con un servicio de envío (Resend, Formspree, etc.)
        setSent(true);
    }

    if (sent) {
        return (
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-start gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0a0a0a] p-8"
            >
                <span className="text-2xl">✉️</span>
                <h2 className="text-lg font-serif text-brand-dark">
                    ¡Mensaje enviado!
                </h2>
                <p className="text-sm text-brand-muted">
                    Gracias por escribirme. Te respondo pronto.
                </p>
                <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
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
                <label
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-widest text-brand-muted"
                >
                    Nombre
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:ring-2 focus:ring-brand-dark transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-widest text-brand-muted"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:ring-2 focus:ring-brand-dark transition"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="message"
                    className="text-xs font-semibold uppercase tracking-widest text-brand-muted"
                >
                    Mensaje
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cuéntame tu proyecto..."
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] px-4 py-3 text-sm text-brand-dark placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:ring-2 focus:ring-brand-dark transition resize-none"
                />
            </div>

            <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-brand-dark px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-[#0a0a0a] hover:opacity-80 transition-opacity"
            >
                Enviar mensaje
            </button>
        </form>
    );
}
