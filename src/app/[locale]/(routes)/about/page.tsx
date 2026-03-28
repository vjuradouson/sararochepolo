import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About · Sara Roche",
    description: "Conoce más sobre Sara Roche, su historia y sus habilidades.",
};

const skills = [
    "Branding & Identidad visual",
    "Fotografía",
    "Diseño editorial",
    "Ilustración digital",
    "Dirección de arte",
    "Motion graphics",
];

export default function AboutPage() {
    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
            {/* Heading */}
            <div className="mb-20">
                <p className="text-sm font-medium uppercase tracking-widest text-brand-muted mb-4">
                    Sobre mí
                </p>
                <h1 className="text-5xl font-serif tracking-tight text-brand-dark sm:text-6xl md:text-7xl">
                    Hola, soy Sara Roche Polo
                </h1>
            </div>

            {/* Content grid */}
            <div className="grid gap-16 md:grid-cols-2">
                {/* Left — bio */}
                <div className="flex flex-col gap-10">
                    {/* Avatar placeholder */}
                    <div className="w-40 h-40 rounded-full bg-neutral-200 overflow-hidden ring-4 ring-neutral-100" />

                    <div className="space-y-6 text-lg text-brand-muted leading-relaxed max-w-lg">
                        <p>
                            Soy diseñadora creativa con pasión por construir marcas con
                            carácter. Me especializo en proyectos donde la identidad visual y
                            la narrativa van de la mano.
                        </p>
                        <p>
                            Con más de{" "}
                            <span className="font-medium text-brand-dark">
                                5 años de experiencia
                            </span>{" "}
                            trabajando con estudios y marcas independientes, combino rigor
                            técnico con una mirada estética cuidada.
                        </p>
                        <p>
                            Actualmente disponible para proyectos freelance y colaboraciones.
                        </p>
                    </div>
                </div>

                {/* Right — skills */}
                <div className="flex flex-col gap-12 mt-4 md:mt-0">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-6">
                            Habilidades
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <li
                                    key={skill}
                                    className="flex items-center gap-3 text-base text-brand-dark"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-muted flex-shrink-0" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-6">
                            Contacto
                        </h2>
                        <ul className="space-y-4 text-base text-brand-dark">
                            <li className="flex items-center">
                                <span className="text-brand-muted w-24">Email</span>
                                <a
                                    href="mailto:hola@sararoche.com"
                                    className="font-medium hover:underline underline-offset-4"
                                >
                                    hola@sararoche.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <span className="text-brand-muted w-24">Ubicación</span>
                                <span className="font-medium">Madrid, España</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
