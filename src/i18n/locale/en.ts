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
                button: {
                    label: "Contact"
                },
                product_designer: "Transforming <line></line>complex needs <line></line>into <highlight>clear experiences </highlight><line></line><highlight>and functional</highlight>",
                image_title: "UX/UI mobile app design projects by Sara Roche Polo",
                image_alt: "Mobile app design mockups by Sara Roche Polo, including a transport app and a pet app interface"
            },
            intro: {
                description: "Product Designer with over 3 years of experience <highlight>crafting intuitive interfaces and consistent visual systems.</highlight> I combine UX, UI, and visual communication to create <highlight>digital and physical solutions aligned with both business goals and user needs.</highlight>",
                image_title: "Creative process and UX/UI design by Sara Roche Polo",
                image_alt: "Sara Roche Polo holding a Moleskine notebook as part of her UX/UI design process",
                hover: {
                    label: "Hi there!"
                }
            },
            projects: {
                1: {
                    subtitle: "Company Publication",
                    title: "Social Media and Meta Ads",
                    description: "Brand content for social media and Meta Ads following company guidelines.",
                    image_title: "Branded content for social media and Meta Ads by Sara Roche Polo",
                    image_alt: "Social media posts and Meta Ads campaigns designed by Sara Roche Polo following company brand guidelines"
                },
                2: {
                    subtitle: "Personal Project",
                    title: "Design in Figma",
                    description: "Design and prototyping of applications using Figma.",
                    image_title: "Personal UX/UI design project in Figma by Sara Roche Polo",
                    image_alt: "Mobile app design mockups by Sara Roche Polo, including a transport app and a pet app interface"
                },
                3: {
                    subtitle: "PPersonal Project",
                    title: "Mobile UI Concept",
                    description: "VVisual exploration of modern interfaces for mobile apps.",
                    image_title: "Modern mobile UI concept designed by Sara Roche Polo",
                    image_alt: "Conceptual mobile interface design featuring vehicle illustrations and visual app elements created by Sara Roche Polo"
                }
            }
        },
        about: {
            seo: {
                title: "About Me | Sara Roche Polo",
                description: "Learn more about Sara Roche Polo, a Product Designer UX/UI focused on creating intuitive solutions and consistent visual systems."
            },
            h1: "About Me",
            header: "Hi, I'm Sara",
            image_title: "Professional portrait of Sara Roche Polo, UX/UI Product Designer",
            image_alt: "Photo of Sara Roche Polo, UX/UI designer, with a neutral background for her professional portfolio"
        },
        contact: {
            seo: {
                title: "Contact | Sara Roche Polo",
                description: "Get in touch with Sara Roche Polo, a Product Designer UX/UI open to new opportunities and digital projects."
            },
            h1: "Contact",
            header: "Shall we talk?",
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
                    label: "Send",
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