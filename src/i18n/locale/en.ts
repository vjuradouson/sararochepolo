export default {
    app: {
        portfolio: {
            owner: "Sara Roche Polo",
            title: "Sara Roche Polo",
            description: "Product Designer UX/UI based in Zaragoza with 3+ years of experience transforming complex needs into intuitive and effective digital experiences.",
            seo: {
                keywords: "Sara Roche Polo, Product Designer, UX/UI, Zaragoza, Portfolio, Digital Design, Visual Communication",
                schema: {
                    person: {
                        job_title: "Product Designer · UX/UI",
                        description: "Product Designer specialized in UX/UI"
                    },
                    website: {
                        name: "Sara Roche Polo"
                    },
                    profile: {
                        name: "Sara Roche Polo · Product Designer"
                    },
                    creative_work: {
                        "name": "Sara Roche Polo UX/UI Portfolio"
                    },
                    professional_service: {
                        address: {
                            addressLocality: "Zaragoza",
                            addressRegion: "Aragón",
                            addressCountry: "ES"
                        }
                    },
                    service: {
                        name: "UX UI Design Services in Zaragoza",
                    }
                }
            }
        },
        header: {
            links: {
                about: "About",
                contact: "Contact"
            },
            language_switcher: {
                en: "English",
                es: "Spanish"
            }
        },
        footer: {
            left: {
                designer: "Product Designer · UX/UI based in Zaragoza"
            },
            center: {
                linkedin: "LinkedIn"
            }
        },
        home: {
            seo: {
                title: "Sara Roche Polo | Product Designer UX/UI based in Zaragoza",
                description: "Product Designer UX/ UI based in Zaragoza with 3 + years of experience transforming complex needs into intuitive and effective digital experiences."
            },
            hero: {
                h1: "Product Designer · UX/UI",
                product_designer: "Transforming <line></line>complex needs <line></line>into <highlight>clear experiences </highlight><line></line><highlight>and functional</highlight>",
                description: "Product Designer with over 3 years of experience <highlight>crafting intuitive interfaces and consistent visual systems.</highlight> I combine UX, UI, and visual communication to create <highlight>digital and physical solutions aligned with both business goals and user needs.</highlight>"
            },
            services: {
                title: "— What I offer?",
                subtitle: "Design services",
            }
        },
        about: {
            seo: {
                title: "About Me | Sara Roche Polo",
                description: "Learn more about Sara Roche Polo, a Product Designer UX/UI focused on creating intuitive solutions and consistent visual systems."
            },
            h1: "About Me",
            header: "Hi, I'm Sara"
        },
        contact: {
            seo: {
                title: "Contact | Sara Roche Polo",
                description: "Get in touch with Sara Roche Polo, a Product Designer UX/UI open to new opportunities and digital projects."
            },
            h1: "Contact",
            header: "Let's talk",
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
                },
                button: {
                    label: "Send Message",
                    sending: "Sending..."
                },
                submit: {
                    json_error: "Invalid server response.",
                    ko: "Error sending the message.",
                    catch: {
                        prefix: "There was an error",
                        unknown: "Unknown error"
                    },
                    success: {
                        message: "Message sent successfully!",
                        description: "I'll get back to you soon!",
                        button: "Send another message"
                    }
                },
                api: {
                    missing_fields: "Please fill in all fields.",
                    invalid_name: "The name is too long.",
                    invalid_email: "The email is too long.",
                    message_too_long: "The message is too long.",
                    error_sending_mail: "Error sending email"
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