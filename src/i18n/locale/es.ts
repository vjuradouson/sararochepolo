export default {
    app: {
        portfolio: {
            owner: "Sara Roche Polo",
            title: "Sara Roche Polo",
            description: "Diseñadora de Producto UX/UI en Zaragoza con más de 3 años de experiencia transformando necesidades complejas en soluciones intuitivas, combinando diseño digital y comunicación visual.",
            seo: {
                keywords: "Sara Roche Polo, Diseñadora de Producto, UX/UI, Zaragoza, Portfolio, Diseño Digital, Comunicación Visual",
                schema: {
                    person: {
                        job_title: "Diseñadora de Producto · UX/UI",
                    },
                    website: {
                        name: "Sara Roche Polo"
                    },
                    profile: {
                        name: "Sara Roche Polo · Diseñadora UX/UI"
                    },
                    creative_work: {
                        "name": "Portfolio UX/UI de Sara Roche Polo"
                    },
                    professional_service: {
                        address: {
                            addressLocality: "Zaragoza",
                            addressRegion: "Aragón",
                            addressCountry: "ES"
                        }
                    },
                    service: {
                        name: "Diseñadora UX/UI en Zaragoza",
                    }
                }
            }
        },
        header: {
            links: {
                about: "Sobre mí",
                contact: "Contacto"
            },
            language_switcher: {
                en: "Inglés",
                es: "Español"
            }
        },
        footer: {
            left: {
                designer: "Diseñadora de Producto · UX/UI en Zaragoza"
            },
            center: {
                linkedin: "LinkedIn"
            }
        },
        home: {
            seo: {
                title: "Sara Roche Polo | Diseñadora de Producto UX/UI en Zaragoza",
                description: "Diseñadora de Producto UX/UI en Zaragoza con más de 3 años de experiencia transformando necesidades complejas en soluciones intuitivas, combinando diseño digital y comunicación visual."
            },
            hero: {
                h1: "Diseñadora de Producto · UX/UI",
                product_designer: "Transformando <line></line>necesidades complejas <line></line>en <highlight>experiencias claras </highlight><line></line><highlight>y funcionales</highlight>",
                description: "Diseñadora de producto con más de 3 años de experiencia <highlight>diseñando interfaces intuitivas y sistemas visuales consistentes.</highlight> Combino UX, UI y comunicación visual para crear <highlight>soluciones digitales y físicas alineadas con negocio y usuario.</highlight>"
            },
            services: {
                title: "— ¿Qué ofrezco?",
                subtitle: "Servicios de diseño",
            }
        },
        about: {
            seo: {
                title: "Sobre mí | Sara Roche Polo",
                description: "Conoce la trayectoria de Sara Roche Polo, Diseñadora de Producto UX/UI con experiencia en crear soluciones intuitivas y sistemas visuales consistentes."
            },
            header: "Sobre mí",
            h1: "Hola, soy Sara"
        },
        contact: {
            seo: {
                title: "Contacto | Sara Roche Polo",
                description: "Contacta con Sara Roche Polo, Diseñadora de Producto UX/UI disponible para nuevas oportunidades y proyectos digitales."
            },
            h1: "Contacto",
            header: "Hablemos",
            description: "Estoy disponible para proyectos de diseño de producto, UX/UI y sistemas visuales.Si estás construyendo un producto digital o necesitas mejorar la experiencia de usuario, estaré encantada de ayudarte. Respondo normalmente en 24–48h.",
            form: {
                title: "Cuéntame sobre tu proyecto",
                field: {
                    name: {
                        label: "Nombre",
                        placeholder: "Tu nombre"
                    },
                    email: {
                        label: "Email",
                        placeholder: "Tu dirección de email"
                    },
                    message: {
                        label: "Mensaje",
                        placeholder: "Cuéntame sobre tu proyecto..."
                    }
                },
                button: {
                    label: "Enviar mensaje",
                    sending: "Enviando..."
                },
                submit: {
                    json_error: "Respuesta inválida del servidor.",
                    ko: "Error enviando el mensaje.",
                    catch: {
                        prefix: "Hubo un error",
                        unknown: "Error desconocido"
                    },
                    success: {
                        message: "¡Mensaje enviado con éxito!",
                        description: "¡Te responderé pronto!",
                        button: "Enviar otro mensaje"
                    }
                },
                api: {
                    missing_fields: "Por favor, completa todos los campos.",
                    invalid_name: "El nombre es demasiado largo.",
                    invalid_email: "El email es demasiado largo.",
                    message_too_long: "El mensaje es demasiado largo.",
                    error_sending_mail: "Error enviando email"
                }
            },
            contact_link: {
                linkedin: {
                    label: "LinkedIn",
                    value: "Sara Roche Polo",
                    href: "https://www.linkedin.com/in/sara-roche-polo-a7114318b/"
                },
                location: {
                    label: "Ubicación",
                    value: "Zaragoza, España"
                }
            }
        }
    }
} as const