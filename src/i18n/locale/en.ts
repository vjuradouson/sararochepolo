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
                h1: "Transforming<line></line>complex needs<line></line>into <highlight>clear experiences</highlight><line></line><highlight>and functional</highlight>",
                description: "Product Designer with over 3 years of experience <highlight>crafting intuitive interfaces and consistent visual systems.</highlight> I combine UX, UI, and visual communication to create <highlight>digital and physical solutions aligned with both business goals and user needs.</highlight>"
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
            h1: "Let's talk",
            description: "I'm available for product design, UX/UI, and visual systems projects. If you're building a digital product or looking to improve the user experience, I'd love to help. I typically respond within 24-48 hours.",
            form: {
                title: "Tell me about your project",
                field: {
                    name: {
                        label: "Name",
                        placeholder: "Your name"
                    },
                    email: {
                        label: "Email",
                        placeholder: "Your email address"
                    },
                    message: {
                        label: "Message",
                        placeholder: "Tell me about your project..."
                    }
                }
            },
            contact_link: {
                linkedin: {
                    label: "LinkedIn",
                    value: "Sara Roche Polo",
                    href: "https://www.linkedin.com/in/sara-roche-polo-a7114318b/"
                },
                location: {
                    label: "Location",
                    value: "Zaragoza, España"
                }
            }
        }
    }
} as const