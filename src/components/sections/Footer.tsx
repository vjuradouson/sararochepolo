export default function Footer() {
    return (
        <footer className="border-t border-neutral-200 py-12 md:py-16 text-brand-muted">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left */}
                <div className="text-center md:text-left">
                    <p className="font-serif tracking-tight text-brand-dark text-lg">
                        Sara Roche Polo
                    </p>
                    <p className="text-sm">
                        Product Designer · UX/UI
                    </p>
                </div>

                {/* Center */}
                <div className="flex gap-6 text-sm">

                    {/* Email */}
                    <a
                        href="mailto:hola@sararoche.com"
                        className="flex items-center gap-2 hover:text-brand-dark transition group"
                    >
                        <img
                            src="/media/icons/mail-icon.svg"
                            alt="linkedin"
                            className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                        />
                        <span>Email</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/sara-roche-polo-a7114318b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0A66C2] transition-colors"
                    >
                        <img
                            src="/media/icons/linkedin-icon.svg"
                            alt="linkedin"
                            className="w-4 h-4 opacity-70 hover:opacity-100 transition"
                        />
                        <span>LinkedIn</span>
                    </a>

                </div>

                {/* Right */}
                <div className="text-sm text-center md:text-right">
                    © {new Date().getFullYear()}
                    <br className="md:hidden" />
                    <span className="ml-1">
                        Diseñado y desarrollado por Sara
                    </span>
                </div>

            </div>
        </footer>
    );
}