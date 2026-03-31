import { h1, head, s } from "framer-motion/client";

export default {
    app: {
        portfolio: {
            owner: "Sara Roche Polo",
            title: "Sara Roche Polo · Portfolio",
            description: "Personal portfolio of Sara Roche Polo."
        },
        header: {
            links: {
                about: "About",
                contact: "Contact"
            },
        },
        footer: {
            left: {
                designer: "Product Designer · UX/UI"
            },
            center: {
                email: "Email",
                linkedin: "LinkedIn"
            }
        },
        home: {
            seo: {
                title: "Sara Roche Polo · Visual Design & Art Direction",
                description: "Portfolio of Sara Roche Polo, specialized in visual identity and premium branding."
            },
            hero: {
                product_designer: "Product Designer · UX/UI",
            },
            services: {
                title: "— What I offer?",
                subtitle: "Design services",
            }
        },
        about: {
            seo: {
                title: "About Me · Sara Roche Polo",
                description: "Learn more about Sara Roche Polo, a Product Designer specialized in UX/UI."
            },
            header: "About Me",
            h1: "Hi, I'm"
        },
        contact: {
            seo: {
                title: "Contact · Sara Roche Polo",
                description: "Get in touch with Sara Roche Polo for your next project."
            },
            header: "Contact",
            h1: "Let's talk"
        }
    }
} as const