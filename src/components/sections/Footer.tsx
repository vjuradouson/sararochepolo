export default function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12 md:py-16 text-center text-brand-muted">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-4">
                <p className="font-serif tracking-tight text-brand-dark text-lg">
                    Sara Roche.
                </p>
                <div className="text-sm">
                    © {new Date().getFullYear()} Creado con diseño visual minimalista.
                </div>
            </div>
        </footer>
    );
}
