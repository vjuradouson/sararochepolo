import type { Metadata } from "next";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
    title: "Contacto · Sara Roche",
    description: "Ponte en contacto con Sara Roche para tu próximo proyecto.",
};

const contactLinks = [
    { label: "Email", value: "hola@sararoche.com", href: "mailto:hola@sararoche.com" },
    { label: "Instagram", value: "@sararoche", href: "https://instagram.com/sararoche" },
    { label: "LinkedIn", value: "Sara Roche", href: "https://linkedin.com/in/sararoche" },
    { label: "Ubicación", value: "Madrid, España", href: null },
];

export default function ContactPage() {
    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
            {/* Heading */}
            <div className="mb-20">
                <p className="text-sm font-medium uppercase tracking-widest text-brand-muted mb-4">
                    Contacto
                </p>
                <h1 className="text-5xl font-serif tracking-tight text-brand-dark sm:text-6xl md:text-7xl">
                    Hablemos
                </h1>
            </div>

            <div className="grid gap-16 md:grid-cols-2">
                {/* Left — info */}
                <div className="flex flex-col gap-12">
                    <p className="text-lg text-brand-muted leading-relaxed max-w-md">
                        ¿Tienes un proyecto en mente? Me encantaría escucharte. Escríbeme y
                        te respondo en menos de 48&nbsp;h.
                    </p>

                    <ul className="space-y-6">
                        {contactLinks.map(({ label, value, href }) => (
                            <li key={label} className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                                    {label}
                                </span>
                                {href ? (
                                    <a
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="text-base font-medium text-brand-dark hover:underline underline-offset-4"
                                    >
                                        {value}
                                    </a>
                                ) : (
                                    <span className="text-base font-medium text-brand-dark">
                                        {value}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right — form */}
                <div>
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
