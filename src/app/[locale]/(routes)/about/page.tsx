import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About · Sara Roche Polo",
    description: "Conoce más sobre Sara Roche Polo, Product Designer especializada en UX/UI.",
};

const skills = [
    "UX Research & User Flows",
    "UI Design & Design Systems",
    "Figma & Prototyping",
    "WordPress & Web Design",
    "Branding & Visual Identity",
    "Print Design & Prepress (CMYK)",
];

export default function AboutPage() {
    return (
        <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-16">
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
                    {/* Avatar */}
                    <div className="w-40 h-40 relative rounded-full overflow-hidden ring-4 ring-neutral-100">
                        <Image
                            src="/media/about/profile.jpeg"
                            alt="Sara Roche Polo"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>

                    <div className="space-y-6 text-lg text-brand-muted leading-relaxed max-w-lg">
                        <p>
                            Soy <span className="font-medium text-brand-dark">Product Designer especializada en UX/UI</span> con más de 3 años de experiencia
                            transformando necesidades complejas en soluciones digitales claras, funcionales y visualmente coherentes.
                        </p>

                        <p>
                            Actualmente trabajo en <span className="font-medium text-brand-dark">Grupo Piquer</span>, donde diseño experiencias digitales en entornos educativos,
                            mejorando la usabilidad, la estructura de la información y la consistencia visual de la plataforma.
                        </p>

                        <p>
                            Mi perfil combina diseño de producto y comunicación visual, lo que me permite trabajar tanto en interfaces digitales
                            como en piezas físicas, asegurando una experiencia de marca consistente en todos los puntos de contacto.
                        </p>

                        <p>
                            Formación en Estudios Ingleses (C2) y educación, lo que me aporta una fuerte capacidad de comunicación,
                            pensamiento estructurado y atención al detalle.
                        </p>

                        <p>
                            Actualmente disponible para colaboraciones, proyectos freelance y oportunidades en producto digital.
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
                            Información
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
                                <span className="font-medium">Zaragoza, España</span>
                            </li>

                            <li className="flex items-center">
                                <span className="text-brand-muted w-24">Idiomas</span>
                                <span className="font-medium">
                                    Español nativo · Inglés C2
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}