export type Lang = "es" | "en";

export const translations = {
  es: {
    nav: {
      servicios: "Servicios",
      casos: "Casos",
      agencias: "Agencias",
      contacto: "Contacto",
      cta: "Valoración gratuita",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      kicker: "Automatización · Integración de IA · Desarrollo a medida",
      title: "Automatizo los procesos que hoy haces a mano.",
      subtitle:
        "Pedidos que entran por WhatsApp o email y acaban solos en tu sistema. Facturas en PDF que se vuelcan a contabilidad. Informes que se generan solos. Asistentes que responden desde tus manuales. Menos tareas repetidas, más tiempo para tu negocio.",
      ctaPrimary: "Pedir valoración gratuita",
      ctaSecondary: "Ver servicios",
      about:
        "Soy Antton Gorrochategui, desarrollador full-stack en Donostia. Vengo del marketing, así que entiendo tu negocio antes de escribir una línea de código.",
      photoAlt: "Retrato de Antton Gorrochategui",
    },
    services: {
      eyebrow: "Servicios",
      title: "Cómo te quito trabajo de encima",
      items: [
        {
          title: "Diagnóstico de automatización",
          description:
            "Reviso los procesos reales de tu empresa y te digo cuáles compensa automatizar. Te entrego un plan por fases con presupuesto para cada una. En pocos días tienes una hoja de ruta clara.",
          price: "Desde 600 €",
        },
        {
          title: "Automatizar un proceso concreto",
          description:
            "Esa tarea repetitiva que os come horas: pedidos que llegan por WhatsApp o email y acaban solos en el sistema, facturas en PDF que se vuelcan a contabilidad, informes que se generan solos.",
          price: "",
        },
        {
          title: "Asistente sobre tu documentación",
          description:
            "Un buscador o asistente que responde desde tus manuales, catálogos y procedimientos reales. Tu equipo deja de perder el tiempo buscando en carpetas.",
          price: "",
        },
      ],
      maintenanceEyebrow: "Servicio recurrente",
      maintenanceTitle: "Mantenimiento mensual",
      maintenanceDesc:
        "Una vez algo está funcionando, me encargo de que siga funcionando: vigilancia, ajustes, pequeñas mejoras y soporte. Para que tu automatización evolucione contigo y no dependas de nadie a última hora.",
      maintenanceCta: "Hablar de mantenimiento",
      detailLink: "Ver los servicios en detalle",
      agenciesPre: "¿Eres agencia o estudio de diseño?",
      agenciesLink: "Trabajo en marca blanca",
    },
    cases: {
      eyebrow: "Trabajo",
      title: "Casos reales",
      tabCases: "Casos",
      tabAbout: "Sobre mí",
      labelProblem: "El problema",
      labelSolution: "Qué construí",
      labelResult: "El resultado",
      stackAria: "Tecnologías del proyecto",
      otherTitle: "Otros proyectos",
      items: [
        {
          id: "mekoa",
          context: "SaaS · Salud animal · Equipo de dos",
          title: "Plataforma de telemedicina veterinaria",
          problema:
            "Atender una consulta veterinaria a distancia es un rosario de pasos manuales: recoger el motivo, agendar, hacer la videollamada, tomar notas y redactar el informe clínico. Lento y fácil de equivocarse.",
          solucion:
            "Construí la plataforma de principio a fin: un chat con IA recoge y ordena el caso, el cliente reserva cita, la videoconsulta se transcribe en directo y el informe clínico se genera solo.",
          resultado:
            "El veterinario se centra en atender; el papeleo se genera automáticamente. En producción, con cuatro tipos de usuario (dueño, profesional, clínica y administración).",
        },
        {
          id: "canexion",
          context: "Retail · Tienda física + online · En producción",
          title: "CRM para un programa de fidelización",
          problema:
            "El programa de fidelización se llevaba en una hoja de cálculo: difícil de mantener, sin una visión clara del cliente y con trabajo manual cada día.",
          solucion:
            "Un CRM a medida, construido desde cero, que reúne a los clientes de la tienda física y de la online y automatiza el día a día del programa.",
          resultado:
            "Sustituyó la hoja de cálculo y hoy se usa a diario en producción: el programa de fidelización se gestiona en un solo sitio, con una visión del cliente que antes estaba dispersa.",
        },
        {
          id: "akademia-ene",
          context: "Educación · Escuela de idiomas",
          title: "Plataforma de cursos online",
          problema:
            "La escuela quería vender y servir sus cursos de idiomas por internet sin montar (ni pagar) una plataforma a medida desde cero.",
          solucion:
            "Monté la web de cursos sobre WooCommerce, con una arquitectura tipo campus online, entregada en remoto entre Bratislava y Donostia.",
          resultado:
            "La escuela tiene su catálogo de cursos funcionando sobre una base conocida y fácil de mantener por ellos mismos.",
        },
      ],
      other: [
        {
          id: "birakari",
          title: "Birakari",
          year: "2025",
          description:
            "Marketplace de compraventa de material de montaña de segunda mano. Lo fundé y llevé producto, tecnología y captación. En pausa.",
        },
        {
          id: "kahir",
          title: "Kahir",
          year: "2024 – 2025",
          description:
            "Plataforma de rutas de montaña estilo Wikiloc con una IA conversacional que recomienda rutas según tu historial, tus hábitos y la previsión del tiempo.",
        },
      ],
    },
    about: {
      toolsTitle: "Herramientas",
      groups: [
        {
          label: "Desarrollo",
          items: [
            "TypeScript", "React", "Node.js", "Hono", "PostgreSQL", "Supabase",
            "Row-Level Security", "REST APIs", "PHP", "JavaScript", "Vite",
            "TailwindCSS", "Zod", "Vitest", "Git",
          ],
        },
        {
          label: "IA",
          items: [
            "APIs de Anthropic y OpenAI", "Vercel AI SDK", "RAG y embeddings",
            "Agentes conversacionales", "Observabilidad de LLM",
          ],
        },
        {
          label: "Producto y marketing",
          items: [
            "WordPress", "WooCommerce", "Figma", "SEO (SEMrush, Ahrefs)", "GA4",
            "GTM", "Email marketing", "Go-to-market", "Scrum / Agile",
          ],
        },
      ],
      languagesTitle: "Idiomas",
      languages: [
        { language: "Euskera", level: "Nativo" },
        { language: "Castellano", level: "Nativo" },
        { language: "Inglés", level: "C1" },
        { language: "Francés", level: "A1" },
      ],
      experienceTitle: "Experiencia",
      experiences: [
        {
          company: "Canexion",
          role: "Marketing Director & Internal Tooling",
          period: "Mar 2026 – Actualidad",
          description: [
            "CRM de fidelización a medida, construido desde cero y hoy en uso diario en producción.",
            "Estrategia de presencia digital completa para la tienda física y la online.",
          ],
        },
        {
          company: "Akademia eñe Online",
          role: "New Entrepreneur · Erasmus para Jóvenes Emprendedores",
          period: "Mar 2026 – Sep 2026",
          description: [
            "Desarrollo de la plataforma web que aloja los cursos online de la escuela.",
            "Arquitectura LMS sobre WooCommerce, entregada en remoto entre Bratislava y Donostia bajo Scrum/Agile.",
          ],
        },
        {
          company: "Ayesa",
          role: "Customer Success & Retention Lead",
          period: "Sep 2025 – Feb 2026",
          description: [
            "Onboarding de nuevos clientes y diseño de estrategias de retención.",
            "Gestión directa de relaciones con clientes y coordinación de eventos.",
          ],
        },
        {
          company: "Teklatam",
          role: "Marketing Lead · Santiago de Chile",
          period: "Ene 2025 – Ago 2025",
          description: [
            "Estrategia de marketing digital y presencia online para una empresa tecnológica.",
            "Desarrollo de la web corporativa y lanzamiento de nuevos productos.",
            "SEO, contenido y adquisición de pago.",
          ],
        },
        {
          company: "Bizipoza",
          role: "Event Operations Supervisor · Euskadi",
          period: "Abr 2025 – May 2025",
          description: [],
        },
        {
          company: "FITT",
          role: "Asistente de Marketing (prácticas) · Rumanía",
          period: "2022 – 2023",
          description: [],
        },
      ],
      educationTitle: "Formación",
      education: [
        {
          title: "Grado en Marketing e Investigación de Mercados",
          school: "Universitat Oberta de Catalunya",
          period: "2025",
        },
        {
          title: "Desarrollo Web (FP)",
          school: "Lanbide",
          period: "",
        },
      ],
    },
    contact: {
      eyebrow: "Valoración gratuita",
      title: "Cuéntame el proceso que te come horas",
      intro:
        "Te digo si tiene solución, cuánto costaría a grandes rasgos y por dónde empezaría. Sin compromiso y sin tecnicismos.",
      directIntro: "¿Prefieres el trato directo? Escríbeme o llámame.",
      location: "Con base en Donostia · disponible en remoto.",
    },
    leadForm: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tucorreo@empresa.com",
      empresa: "Empresa",
      empresaOptional: "(opcional)",
      empresaPlaceholder: "Nombre de tu empresa",
      mensaje: "¿Qué proceso te come horas?",
      mensajePlaceholder: "Cuéntame brevemente la tarea manual que quieres quitarte de encima.",
      submit: "Pedir valoración gratuita",
      submitting: "Enviando…",
      successTitle: "Mensaje enviado",
      successBody: "Gracias. Reviso tu caso y te respondo en menos de 24 horas.",
      toastSuccess: "¡Recibido! Te respondo en menos de 24 h.",
      toastError: "No se ha podido enviar. Escríbeme a anttongorrochategui@gmail.com.",
    },
    footer: {
      servicios: "Servicios",
      casos: "Casos",
      agencias: "Agencias",
      contacto: "Contacto",
    },
    serviciosPage: {
      eyebrow: "Servicios",
      title: "Qué puedo automatizar en tu empresa.",
      intro:
        "Tres formas de empezar, según lo claro que tengas el problema. El alcance y el presupuesto los cerramos en la valoración gratuita, sin compromiso.",
      durationLabel: "Duración orientativa:",
      packageCta: "Hablar de esto",
      packages: [
        {
          title: "Diagnóstico de automatización",
          description:
            "Antes de construir nada, miro tu operativa real. Identifico los tres o cuatro procesos que más te compensa automatizar y te entrego una hoja de ruta con presupuesto por fases, para que decidas con datos y sin comprometerte a todo de golpe.",
          points: [
            "Revisión de tus procesos reales, no de una plantilla",
            "Los 3–4 procesos que más horas te ahorran, priorizados",
            "Plan por fases con un presupuesto para cada una",
          ],
          duration: "Dos o tres días",
          price: "Desde 600 €",
        },
        {
          title: "Automatizar un proceso concreto",
          description:
            "Cogemos esa tarea repetitiva que os come horas y la dejamos funcionando sola. Conecto las herramientas que ya usas y, donde hace falta, meto IA para que el proceso se encargue solo.",
          points: [
            "Pedidos que llegan por WhatsApp o email y acaban solos en tu sistema",
            "Facturas en PDF que se vuelcan a contabilidad",
            "Informes mensuales que se generan y se envían solos",
          ],
          duration: "Dos o tres semanas",
          price: "",
        },
        {
          title: "Asistente sobre tu documentación",
          description:
            "Monto un buscador o asistente que responde desde los manuales, catálogos y procedimientos reales de tu empresa. Tu equipo pregunta en lenguaje normal y obtiene la respuesta correcta, con su fuente.",
          points: [
            "Responde desde tu documentación real; no se lo inventa",
            "Tu equipo deja de buscar en carpetas y PDFs",
            "Se actualiza cuando cambia tu documentación",
          ],
          duration: "Según el volumen de documentación",
          price: "",
        },
      ],
      maintenanceEyebrow: "Servicio recurrente",
      maintenanceTitle: "Mantenimiento mensual",
      maintenanceDesc:
        "Una vez algo está funcionando, me encargo de que siga funcionando: vigilancia, ajustes, pequeñas mejoras y soporte. Un servicio recurrente para que la automatización evolucione contigo y no dependas de nadie a última hora.",
      ctaTitle: "¿Cuál encaja con tu caso?",
      ctaDesc:
        "Cuéntame el proceso que te come horas y te digo si tiene solución, cuánto costaría a grandes rasgos y por dónde empezaría. Sin compromiso.",
      ctaButton: "Pedir valoración gratuita",
    },
    agenciasPage: {
      eyebrow: "Para agencias y estudios",
      title: "La capa técnica bajo tu marca.",
      intro:
        "Si tu estudio de diseño o branding recibe proyectos que necesitan desarrollo o automatización con IA, los ejecuto por ti en marca blanca. Tú mantienes al cliente y tu marca; yo pongo la parte técnica.",
      ctaTop: "Hablemos de tu proyecto",
      howTitle: "Cómo colaboro",
      model: [
        { title: "Bajo tu marca", description: "Trabajo en segundo plano. Tú das la cara ante tu cliente; yo no aparezco en ningún momento." },
        { title: "El código es tuyo", description: "Repositorio tuyo desde el primer día y código documentado. Sin cajas negras ni dependencias de mí para mantenerlo." },
        { title: "Tú pones tu margen", description: "Te paso un precio de coste técnico; lo que le cobras a tu cliente lo decides tú." },
        { title: "No capto a tus clientes", description: "Compromiso de no captación: no contacto ni trabajo directamente con tus clientes. Esa relación es tuya." },
        { title: "Dos rondas de revisión", description: "Cada proyecto incluye dos rondas de revisión para ajustar el resultado antes de la entrega." },
        { title: "Comunicación clara", description: "Vengo del marketing: entiendo un briefing de agencia sin traducción de por medio y te hablo en tu idioma, no en tecnicismos." },
      ],
      capsTitle: "Qué puedo construir para tus clientes",
      capabilities: [
        "Webs y ecommerce a medida",
        "Automatización de procesos",
        "Integración de IA (agentes, RAG sobre documentación)",
        "Asistentes internos y buscadores sobre datos propios",
      ],
      capsLink: "Ver los servicios en detalle",
      ctaTitle: "¿Tienes un proyecto para un cliente?",
      ctaDesc:
        "Cuéntame qué necesitas y te digo si encaja, cuánto costaría a grandes rasgos y en cuánto tiempo. Sin compromiso.",
      ctaButton: "Hablemos",
    },
    notFound: {
      message: "Vaya, esta página no existe.",
      back: "Volver al inicio",
    },
    seo: {
      home: {
        title: "Antton Gorrochategui · Automatización de procesos con IA",
        description:
          "Automatizo los procesos que hoy haces a mano: pedidos, facturas, informes y asistentes con IA. Desarrollo full-stack a medida en Donostia. Valoración gratuita, sin compromiso.",
      },
      servicios: {
        title: "Servicios · Automatización e IA para empresas · Antton Gorrochategui",
        description:
          "Diagnóstico de automatización, automatización de procesos concretos y asistentes con IA sobre tu documentación. Sin precios ocultos: el alcance se cierra en una valoración gratuita.",
      },
      agencias: {
        title: "Marca blanca para agencias · Antton Gorrochategui",
        description:
          "La capa técnica bajo tu marca: desarrollo y automatización con IA en marca blanca para agencias y estudios. Repositorio tuyo, sin captación y con dos rondas de revisión.",
      },
      notFound: {
        title: "Página no encontrada · Antton Gorrochategui",
        description: "La página que buscas no existe.",
      },
    },
  },

  en: {
    nav: {
      servicios: "Services",
      casos: "Case studies",
      agencias: "Agencies",
      contacto: "Contact",
      cta: "Free assessment",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      kicker: "Automation · AI integration · Custom development",
      title: "I automate the work you're still doing by hand.",
      subtitle:
        "Orders that arrive by WhatsApp or email and land in your system on their own. PDF invoices that flow into your accounting. Reports that generate themselves. Assistants that answer from your own manuals. Less repetitive work, more time for your business.",
      ctaPrimary: "Get a free assessment",
      ctaSecondary: "See services",
      about:
        "I'm Antton Gorrochategui, a full-stack developer in Donostia (Basque Country). I come from marketing, so I understand your business before I write a line of code.",
      photoAlt: "Portrait of Antton Gorrochategui",
    },
    services: {
      eyebrow: "Services",
      title: "How I take work off your plate",
      items: [
        {
          title: "Automation assessment",
          description:
            "I review your company's real processes and tell you which ones are worth automating. You get a phased plan with a budget for each phase. In a few days you have a clear roadmap.",
          price: "From €600",
        },
        {
          title: "Automate a specific process",
          description:
            "That repetitive task eating up your hours: orders arriving by WhatsApp or email that land in the system on their own, PDF invoices that flow into accounting, reports that generate themselves.",
          price: "",
        },
        {
          title: "Assistant over your documentation",
          description:
            "A search tool or assistant that answers from your real manuals, catalogues and procedures. Your team stops wasting time digging through folders.",
          price: "",
        },
      ],
      maintenanceEyebrow: "Recurring service",
      maintenanceTitle: "Monthly maintenance",
      maintenanceDesc:
        "Once something is up and running, I keep it running: monitoring, tweaks, small improvements and support. So your automation evolves with you and you're never stuck at the last minute.",
      maintenanceCta: "Talk about maintenance",
      detailLink: "See the services in detail",
      agenciesPre: "Are you an agency or design studio?",
      agenciesLink: "I work white-label",
    },
    cases: {
      eyebrow: "Work",
      title: "Real projects",
      tabCases: "Case studies",
      tabAbout: "About me",
      labelProblem: "The problem",
      labelSolution: "What I built",
      labelResult: "The result",
      stackAria: "Project technologies",
      otherTitle: "Other projects",
      items: [
        {
          id: "mekoa",
          context: "SaaS · Animal health · Two-person team",
          title: "Veterinary telemedicine platform",
          problema:
            "Running a remote vet consultation is a chain of manual steps: gathering the reason for the visit, booking, doing the video call, taking notes and writing the clinical report. Slow and error-prone.",
          solucion:
            "I built the platform end to end: an AI chat gathers and structures the case, the client books an appointment, the video consultation is transcribed live and the clinical report is generated automatically.",
          resultado:
            "The vet focuses on care; the paperwork is generated automatically. In production, with four user types (owner, professional, clinic and admin).",
        },
        {
          id: "canexion",
          context: "Retail · Physical + online store · In production",
          title: "CRM for a loyalty programme",
          problema:
            "The loyalty programme was run on a spreadsheet: hard to maintain, no clear view of the customer and manual work every day.",
          solucion:
            "A custom CRM, built from scratch, that brings together the customers of the physical and online store and automates the day-to-day of the programme.",
          resultado:
            "It replaced the spreadsheet and is now used daily in production: the loyalty programme lives in a single place, with a customer view that used to be scattered.",
        },
        {
          id: "akademia-ene",
          context: "Education · Language school",
          title: "Online courses platform",
          problema:
            "The school wanted to sell and deliver its language courses online without building (or paying for) a fully custom platform from scratch.",
          solucion:
            "I built the courses site on WooCommerce, with an online-campus architecture, delivered remotely between Bratislava and Donostia.",
          resultado:
            "The school has its course catalogue running on a familiar, easy-to-maintain base they can manage themselves.",
        },
      ],
      other: [
        {
          id: "birakari",
          title: "Birakari",
          year: "2025",
          description:
            "Marketplace for buying and selling second-hand mountain gear. I founded it and led product, technology and growth. On hold.",
        },
        {
          id: "kahir",
          title: "Kahir",
          year: "2024 – 2025",
          description:
            "Wikiloc-style mountain route platform with a conversational AI that recommends routes based on your history, habits and the weather forecast.",
        },
      ],
    },
    about: {
      toolsTitle: "Tools",
      groups: [
        {
          label: "Development",
          items: [
            "TypeScript", "React", "Node.js", "Hono", "PostgreSQL", "Supabase",
            "Row-Level Security", "REST APIs", "PHP", "JavaScript", "Vite",
            "TailwindCSS", "Zod", "Vitest", "Git",
          ],
        },
        {
          label: "AI",
          items: [
            "Anthropic & OpenAI APIs", "Vercel AI SDK", "RAG & embeddings",
            "Conversational agents", "LLM observability",
          ],
        },
        {
          label: "Product & marketing",
          items: [
            "WordPress", "WooCommerce", "Figma", "SEO (SEMrush, Ahrefs)", "GA4",
            "GTM", "Email marketing", "Go-to-market", "Scrum / Agile",
          ],
        },
      ],
      languagesTitle: "Languages",
      languages: [
        { language: "Basque", level: "Native" },
        { language: "Spanish", level: "Native" },
        { language: "English", level: "C1" },
        { language: "French", level: "A1" },
      ],
      experienceTitle: "Experience",
      experiences: [
        {
          company: "Canexion",
          role: "Marketing Director & Internal Tooling",
          period: "Mar 2026 – Present",
          description: [
            "Custom loyalty CRM, built from scratch and now in daily production use.",
            "Full digital presence strategy across the physical and online store.",
          ],
        },
        {
          company: "Akademia eñe Online",
          role: "New Entrepreneur · Erasmus for Young Entrepreneurs",
          period: "Mar 2026 – Sep 2026",
          description: [
            "Development of the web platform hosting the school's online courses.",
            "WooCommerce-based LMS architecture, delivered remotely between Bratislava and Donostia under Scrum/Agile.",
          ],
        },
        {
          company: "Ayesa",
          role: "Customer Success & Retention Lead",
          period: "Sep 2025 – Feb 2026",
          description: [
            "Onboarding of new clients and design of retention strategies.",
            "Direct management of client relationships and event coordination.",
          ],
        },
        {
          company: "Teklatam",
          role: "Marketing Lead · Santiago, Chile",
          period: "Jan 2025 – Aug 2025",
          description: [
            "Digital marketing and online presence strategy for a tech company.",
            "Development of the corporate website and launch of new products.",
            "SEO, content and paid acquisition.",
          ],
        },
        {
          company: "Bizipoza",
          role: "Event Operations Supervisor · Basque Country",
          period: "Apr 2025 – May 2025",
          description: [],
        },
        {
          company: "FITT",
          role: "Marketing Assistant (internship) · Romania",
          period: "2022 – 2023",
          description: [],
        },
      ],
      educationTitle: "Education",
      education: [
        {
          title: "BSc in Marketing & Market Research",
          school: "Universitat Oberta de Catalunya",
          period: "2025",
        },
        {
          title: "Web Development (vocational)",
          school: "Lanbide",
          period: "",
        },
      ],
    },
    contact: {
      eyebrow: "Free assessment",
      title: "Tell me about the process eating up your hours",
      intro:
        "I'll tell you whether it has a solution, roughly what it would cost and where I'd start. No commitment and no jargon.",
      directIntro: "Prefer to talk directly? Email or call me.",
      location: "Based in Donostia · available remotely.",
    },
    leadForm: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      empresa: "Company",
      empresaOptional: "(optional)",
      empresaPlaceholder: "Your company's name",
      mensaje: "What process is eating up your hours?",
      mensajePlaceholder: "Briefly tell me about the manual task you want to get off your plate.",
      submit: "Get a free assessment",
      submitting: "Sending…",
      successTitle: "Message sent",
      successBody: "Thanks. I'll review your case and get back to you within 24 hours.",
      toastSuccess: "Got it! I'll reply within 24 h.",
      toastError: "Couldn't send. Email me at anttongorrochategui@gmail.com.",
    },
    footer: {
      servicios: "Services",
      casos: "Case studies",
      agencias: "Agencies",
      contacto: "Contact",
    },
    serviciosPage: {
      eyebrow: "Services",
      title: "What I can automate in your company.",
      intro:
        "Three ways to start, depending on how clearly you've pinned down the problem. Scope and budget are agreed in the free assessment, no commitment.",
      durationLabel: "Rough timeline:",
      packageCta: "Talk about this",
      packages: [
        {
          title: "Automation assessment",
          description:
            "Before building anything, I look at how you actually operate. I identify the three or four processes most worth automating and hand you a roadmap with a phased budget, so you decide with data and without committing to everything at once.",
          points: [
            "A review of your real processes, not a template",
            "The 3–4 processes that save you the most hours, prioritised",
            "A phased plan with a budget for each phase",
          ],
          duration: "Two or three days",
          price: "From €600",
        },
        {
          title: "Automate a specific process",
          description:
            "We take that repetitive task eating your hours and leave it running on its own. I connect the tools you already use and, where needed, add AI so the process handles itself.",
          points: [
            "Orders arriving by WhatsApp or email that land in your system on their own",
            "PDF invoices that flow into accounting",
            "Monthly reports that generate and send themselves",
          ],
          duration: "Two or three weeks",
          price: "",
        },
        {
          title: "Assistant over your documentation",
          description:
            "I build a search tool or assistant that answers from your company's real manuals, catalogues and procedures. Your team asks in plain language and gets the right answer, with its source.",
          points: [
            "Answers from your real documentation; it doesn't make things up",
            "Your team stops digging through folders and PDFs",
            "It updates when your documentation changes",
          ],
          duration: "Depends on the volume of documentation",
          price: "",
        },
      ],
      maintenanceEyebrow: "Recurring service",
      maintenanceTitle: "Monthly maintenance",
      maintenanceDesc:
        "Once something is up and running, I keep it running: monitoring, tweaks, small improvements and support. A recurring service so your automation evolves with you and you're never stuck at the last minute.",
      ctaTitle: "Which one fits your case?",
      ctaDesc:
        "Tell me about the process eating up your hours and I'll tell you whether it has a solution, roughly what it would cost and where I'd start. No commitment.",
      ctaButton: "Get a free assessment",
    },
    agenciasPage: {
      eyebrow: "For agencies and studios",
      title: "The technical layer under your brand.",
      intro:
        "If your design or branding studio takes on projects that need development or AI automation, I deliver them for you white-label. You keep the client and your brand; I bring the technical side.",
      ctaTop: "Let's talk about your project",
      howTitle: "How I work with you",
      model: [
        { title: "Under your brand", description: "I work in the background. You face the client; I never appear." },
        { title: "The code is yours", description: "Your repository from day one and documented code. No black boxes and no dependency on me to maintain it." },
        { title: "You set your margin", description: "I give you a technical cost price; what you charge your client is up to you." },
        { title: "I don't poach your clients", description: "A no-solicitation commitment: I don't contact or work directly with your clients. That relationship is yours." },
        { title: "Two rounds of revisions", description: "Every project includes two rounds of revisions to fine-tune the result before delivery." },
        { title: "Clear communication", description: "I come from marketing: I understand an agency brief without a translator and speak your language, not jargon." },
      ],
      capsTitle: "What I can build for your clients",
      capabilities: [
        "Custom websites and ecommerce",
        "Process automation",
        "AI integration (agents, RAG over documentation)",
        "Internal assistants and search over your own data",
      ],
      capsLink: "See the services in detail",
      ctaTitle: "Have a project for a client?",
      ctaDesc:
        "Tell me what you need and I'll tell you whether it fits, roughly what it would cost and how long it would take. No commitment.",
      ctaButton: "Let's talk",
    },
    notFound: {
      message: "Oops, this page doesn't exist.",
      back: "Back to home",
    },
    seo: {
      home: {
        title: "Antton Gorrochategui · AI process automation",
        description:
          "I automate the work you're still doing by hand: orders, invoices, reports and AI assistants. Custom full-stack development in Donostia. Free assessment, no commitment.",
      },
      servicios: {
        title: "Services · Automation & AI for businesses · Antton Gorrochategui",
        description:
          "Automation assessment, automating specific processes and AI assistants over your documentation. No hidden prices: scope is agreed in a free assessment.",
      },
      agencias: {
        title: "White-label for agencies · Antton Gorrochategui",
        description:
          "The technical layer under your brand: development and AI automation white-label for agencies and studios. Your repository, no poaching and two rounds of revisions.",
      },
      notFound: {
        title: "Page not found · Antton Gorrochategui",
        description: "The page you're looking for doesn't exist.",
      },
    },
  },
};
