export default {
    app: {
        portfolio: {
            owner: "Sara Roche Polo",
            title: "Sara Roche Polo · Portfolio",
            description: "Portfolio personal de Sara Roche Polo."
        },
        header: {
            links: {
                about: "Sobre mí",
                contact: "Contacto"
            }
        },
        footer: {
            left: {
                designer: "Diseñadora de Producto · UX/UI"
            },
            center: {
                linkedin: "LinkedIn"
            }
        },
        home: {
            seo: {
                title: "Sara Roche Polo | Diseñadora de Producto UX/UI",
                description: "Product Designer UX/UI con más de 3 años de experiencia transformando necesidades complejas en soluciones intuitivas, combinando diseño digital y comunicación visual."
            },
            hero: {
                product_designer: "Diseñadora de Producto · UX/UI",
                h1: "Transformando<line></line>necesidades complejas<line></line>en <highlight>experiencias claras</highlight><line></line><highlight>y funcionales</highlight>",
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
                description: "Conoce la trayectoria de Sara Roche Polo, Product Designer UX/UI con experiencia en crear soluciones intuitivas y sistemas visuales consistentes."
            },
            header: "Sobre mí",
            h1: "Hola, soy"
        },
        contact: {
            seo: {
                title: "Contacto | Sara Roche Polo",
                description: "Contacta con Sara Roche Polo, Product Designer UX/UI disponible para nuevas oportunidades y proyectos digitales."
            },
            header: "Contacto",
            h1: "Hablemos",
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