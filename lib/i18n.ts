export type Lang = "es" | "en" | "pt" | "fr";

export const defaultLang: Lang = "es";

export const translations = {
    es: {
        nav: {
            about: "Acerca de",
            portfolio: "Portafolio",
            services: "Servicios",
            contact: "Contacto",
            menuLabel: "Abrir menú",
        },
        footer: {
            tagline: "videomaker · producción visual",
        },
        home: {
            showreel: "Showreel",
            portfolioLabel: "Portafolio",
            category1Title: "Cine / Vídeo",
            category1Alt: "Cinematografía — dirección de fotografía en set de rodaje",
            category2Title: "Comercial / Branded Content",
            category2Alt: "Producción audiovisual comercial — rodaje de branded content",
            tagline1: "Imagen con propósito.",
            tagline2: "Narrativa con impacto.",
            cta: "Iniciar un proyecto",
            viewAll: "Ver portafolio completo",
            casesLabel: "Marcas con las que he trabajado",
            casesTitle: "Marcas",
        },
        about: {
            pageLabel: "Acerca de",
            pageTitle: "Lucas Lemes",
            metaTitle: "Acerca de — Lucas Lemes",
            metaDesc:
                "Lucas Lemes es director audiovisual, documentalista y productor con actuación internacional entre Europa, América del Sur, África y Estados Unidos.",
            role: "Director Audiovisual · Documentalista · Productor",
            bio1: "Lucas Lemes es director audiovisual, documentalista y productor con actuación internacional entre Europa, América del Sur, África y Estados Unidos. Su trabajo transita entre cine, moda, publicidad y proyectos culturales, siempre orientado por la narrativa, la estética y la identidad.",
            bio2: "Con más de diez años de experiencia, construyó su trayectoria en contextos globales como el Festival de Cannes (Francia), Paris Fashion Week, London Fashion Week y las Olimpiadas de París, además de producciones realizadas en ciudades como Nueva York y Aspen, en Estados Unidos. Sus proyectos han circulado en entornos internacionales de alto nivel e incluyen un documental exhibido en CNN Portugal (NiT TV), además de producciones vinculadas a marcas y eventos de relevancia global.",
            bio3: "Su actuación combina lenguaje cinematográfico y precisión estética, ya sea en la dirección de documentales de autor filmados en múltiples países, o en la creación de contenidos visuales para grandes marcas, artistas e instituciones culturales. A lo largo de su carrera, ha desarrollado trabajos en ciudades como Cannes, París, Londres, Lisboa, Zúrich, Nueva York y Aspen, consolidando una práctica multicultural y transnacional.",
            bio4: "Paralelamente a su trabajo comercial y de moda, desarrolla proyectos de autor con un enfoque social e intercultural. Actualmente dirige un documental internacional filmado en 11 países, explorando temas como la longevidad, la salud mental y el propósito desde una perspectiva humana y global.",
            bio5: "Reconocido como Diplomático Civil por su actuación en proyectos humanitarios en Angola, Lucas entiende lo audiovisual como un instrumento de registro, diálogo cultural y transformación social. Su trabajo parte de la convicción de que la imagen y la narrativa son herramientas de construcción de memoria, territorio e identidad.",
            bio6: "Entre el cine y el branded content, entre el mercado internacional y el de autor, su práctica está guiada por una constante: crear imágenes con propósito y narrativas con impacto.",
            skill1: "Cine · Documental",
            skill2: "Publicidad · Branded Content",
            skill3: "Dirección de Fotografía",
            skill4: "Edición · Postproducción",
            cta: "Trabajar juntos",
        },
        portfolio: {
            pageLabel: "Trabajos",
            pageTitle: "Portafolio",
            metaTitle: "Portafolio — Lucas Lemes",
            metaDesc: "Portafolio de Lucas Lemes: películas, vídeos y branded content de alto nivel.",
            cat1: "Cine / Vídeo",
            cat2: "Comercial / Branded Content",
            cat3: "Fotografía / Galería",
            works: [
                { title: "Deriva", subtitle: "Cortometraje · 2023", alt: "Deriva — cortometraje cinematográfico" },
                { title: "Reflejos", subtitle: "Documental · 2023", alt: "Reflejos — documental visual" },
                { title: "Liminal", subtitle: "Experimental · 2024", alt: "Liminal — película experimental" },
                { title: "Reserva — Campaña Verano", subtitle: "Branded Content · 2024", alt: "Reserva — campaña de moda" },
                { title: "Vivo — Nueva Era", subtitle: "Spot Publicitario · 2023", alt: "Vivo — spot publicitario" },
                { title: "Amaro — Identidad", subtitle: "Branded Content · 2023", alt: "Amaro — branded content editorial" },
            ],
            galleryTitles: {
                "ana-rocha-e-apolinario": "Ana Rocha & Apolinário",
                "mayron-brum": "Mayron Brum",
                "revolve": "REVOLVE",
                "revolve-nye-2024": "REVOLVE NYE 2024",
                "white-space": "WHITE SPACE"
            }
        },
        services: {
            pageLabel: "Lo que ofrezco",
            pageTitle: "Servicios",
            metaTitle: "Servicios — Lucas Lemes",
            metaDesc: "Servicios de producción audiovisual ofrecidos por Lucas Lemes: cine, branded content, publicidad y más.",
            ctaLabel: "¿Listo para crear algo extraordinario?",
            ctaBtn: "Ponerse en contacto",
            list: [
                {
                    number: "01",
                    title: "Dirección & Producción de Vídeo",
                    description: "Concepción creativa, dirección y producción de películas publicitarias, spots, vídeos institucionales y contenido de marca. Del guion a la entrega, con control total de la calidad visual y narrativa.",
                },
                {
                    number: "02",
                    title: "Branded Content",
                    description: "Desarrollo de contenido audiovisual que comunica la identidad y los valores de la marca a través de narrativas auténticas y cinematográficas — construyendo una conexión real con el público.",
                },
                {
                    number: "03",
                    title: "Dirección de Fotografía",
                    description: "Creación de la identidad visual de proyectos a través de la fotografía cinematográfica. Definición de paleta de colores, diseño de iluminación, composición y movimiento de cámara para cada narrativa.",
                },
                {
                    number: "04",
                    title: "Edición & Postproducción",
                    description: "Edición narrativa, color grading cinematográfico, diseño de sonido y entrega en cualquier formato — broadcast, digital, plataformas de streaming o proyección.",
                },
                {
                    number: "05",
                    title: "Documental",
                    description: "Producción de documentales corporativos, culturales y sociales. Narrativa basada en personajes reales, investigación en profundidad y lenguaje cinematográfico de impacto.",
                },
                {
                    number: "06",
                    title: "Consultoría Visual",
                    description: "Consultoría estratégica de identidad visual y lenguaje audiovisual para marcas, productoras y creadores de contenido que buscan elevar el estándar estético de su comunicación.",
                },
            ],
        },
        contact: {
            pageLabel: "Escríbeme",
            pageTitle: "Contacto",
            metaTitle: "Contacto — Lucas Lemes",
            metaDesc: "Ponte en contacto con Lucas Lemes para proyectos de videomaker y producción visual.",
            intro: "Abierto a proyectos de cine, publicidad, branded content y producción visual. Ponte en contacto para hablar sobre tu próximo proyecto.",
            emailLabel: "Correo electrónico",
            locationLabel: "Ubicación",
            locationValue: "Brasil — proyectos nacionales e internacionales",
            instagramLabel: "Instagram",
            vimeoLabel: "Vimeo",
            whatsappLabel: "WhatsApp",
            formName: "Nombre",
            formNamePlaceholder: "Tu nombre",
            formEmail: "Correo electrónico",
            formEmailPlaceholder: "tu@correo.com",
            formProject: "Tipo de proyecto",
            formProjectDefault: "Seleccionar",
            formMessage: "Mensaje",
            formMessagePlaceholder: "Cuéntame sobre tu proyecto...",
            formSubmit: "Enviar mensaje",
            sentTitle: "Mensaje enviado.",
            sentSub: "Responderé en un plazo de 48 horas.",
            projectOptions: [
                { value: "film", label: "Cine / Vídeo" },
                { value: "commercial", label: "Comercial / Publicidad" },
                { value: "branded", label: "Branded Content" },
                { value: "doc", label: "Documental" },
                { value: "other", label: "Otro" },
            ],
        },
        videoCaptions: {
            "Amiri Official.mp4": {
                title: "AMIRI – Paris Fashion Week (2025)",
                subtitle: "París, Francia | 2025",
                description: "Dirección y captación vertical para AMIRI durante el Paris Fashion Week. Un registro inmersivo de la estética contemporánea de la marca en el contexto del desfile oficial."
            },
            "Flair.mp4": {
                title: "Campanha Marca Jóias Ana Rocha & Apolinário",
                subtitle: "Director Audiovisual",
                description: "Campaña cinematográfica para marca de joyas, explorando forma, textura e identidad a través de un lenguaje minimalista y sensorial."
            },
            "Lavinia Fuksas.mp4": {
                title: "LAVÍNIA FUKSAS – Jewelry Campaign",
                subtitle: "Dirección y fotografía",
                description: "Campaña cinematográfica para marca de joyas, explorando forma, textura e identidad a través de un lenguaje minimalista y sensorial."
            },
            "Kyle.mp4": {
                title: "KYLE HO – Les Amoureux SS24",
                subtitle: "London Fashion Week | 2023",
                description: "Dirección y producción para el diseñador oficial del London Fashion Week. Película exhibida en DiscoveryLAB, explorando movimiento, estética y narrativa emocional."
            },
            "Kyle Film.mp4": {
                title: "KYLE HO – “A Dialogue With Myself” AW24",
                subtitle: "London Fashion Week | 2024",
                description: "Cortometraje de moda de autor presentado en DiscoveryLAB. Investigación visual sobre identidad y dualidad en la colección AW24."
            },
            "Final.mp4": {
                title: "META – Casa Brasil",
                subtitle: "Olimpiadas de París | 2025",
                description: "Producción y edición de aproximadamente 40 películas oficiales para Meta en la Casa Brasil, registrando a atletas y personalidades brasileñas en el contexto olímpico internacional."
            },
            "Elen Mountain Part I.mp4": {
                title: "REVOLVE – Aspen Campaign Part I",
                subtitle: "Aspen, Estados Unidos | 2023",
                description: "Dirección y captación en campaña de invierno para Revolve. Estética de montaña y atmósfera cinematográfica en el escenario de Aspen."
            },
            "Elen Mountain Part II.mp4": {
                title: "REVOLVE – Aspen Campaign Part II",
                subtitle: "Aspen, Estados Unidos | 2024",
                description: "Continuidad de la narrativa visual de la marca en ambiente alpino, combinando moda, paisaje y movimiento."
            },
            "The Snow Lodge Polo.mp4": {
                title: "SNOW POLO SEASON",
                subtitle: "Aspen, Estados Unidos",
                description: "Registro cinematográfico de la temporada de Snow Polo, captando la intersección entre deporte, elegancia y paisaje."
            },
            "Reels Day 2.mp4": {
                title: "L’ORÉAL PARIS",
                subtitle: "Festival de Cannes",
                description: "Producción audiovisual realizada durante el Festival de Cannes para L’Oréal Paris."
            },
            "New Year Video.mp4": {
                title: "NEW YEAR 2025/2026 – David Guetta",
                subtitle: "Producción Audiovisual",
                description: "Producción audiovisual de celebración internacional de Año Nuevo, con la presencia de David Guetta. Atmósfera, música y experiencia colectiva como eje narrativo."
            }
        }
    },
    en: {
        nav: {
            about: "About",
            portfolio: "Portfolio",
            services: "Services",
            contact: "Contact",
            menuLabel: "Open menu",
        },
        footer: {
            tagline: "videomaker · visual production",
        },
        home: {
            showreel: "Showreel",
            portfolioLabel: "Portfolio",
            category1Title: "Film / Video",
            category1Alt: "Cinematography — director of photography on film set",
            category2Title: "Commercial / Branded Content",
            category2Alt: "Commercial audiovisual production — branded content shoot",
            tagline1: "Image with purpose.",
            tagline2: "Narrative with impact.",
            cta: "Start a project",
            viewAll: "View full portfolio",
            casesLabel: "Brands I've worked with",
            casesTitle: "Brands",
        },
        about: {
            pageLabel: "About",
            pageTitle: "Lucas Lemes",
            metaTitle: "About — Lucas Lemes",
            metaDesc:
                "Lucas Lemes is an audiovisual director, documentarian and producer with international experience across Europe, South America, Africa and the United States.",
            role: "Audiovisual Director · Documentarian · Producer",
            bio1: "Lucas Lemes is an audiovisual director, documentarian and producer with international experience across Europe, South America, Africa and the United States. His work oscillates between cinema, fashion, advertising and cultural projects, always driven by narrative, aesthetics and identity.",
            bio2: "With over ten years of experience, he has built a career in global contexts such as the Cannes Film Festival (France), Paris Fashion Week, London Fashion Week and the Paris Olympics, in addition to productions in cities like New York and Aspen, in the United States. His projects have circulated in high-level international environments and include a documentary aired on CNN Portugal (NiT TV), as well as productions linked to globally relevant brands and events.",
            bio3: "His work combines cinematographic language and aesthetic precision, whether directing original documentaries filmed in multiple countries or creating visual content for major brands, artists and cultural institutions. Throughout his career, he has developed work in cities such as Cannes, Paris, London, Lisbon, Zurich, New York and Aspen, consolidating a multicultural and transnational practice.",
            bio4: "Parallel to his commercial and fashion work, he develops original projects with a social and intercultural approach. He is currently directing an international documentary filmed in 11 countries, exploring themes such as longevity, mental health and purpose from a human and global perspective.",
            bio5: "Recognised as a Civil Diplomat for his work on humanitarian projects in Angola, Lucas understands audiovisual media as an instrument for documentation, cultural dialogue and social transformation. His work is based on the conviction that image and narrative are tools for building memory, territory and identity.",
            bio6: "Between cinema and branded content, between the international and independent markets, his practice is guided by one constant: creating images with purpose and narratives with impact.",
            skill1: "Cinema · Documentary",
            skill2: "Advertising · Branded Content",
            skill3: "Director of Photography",
            skill4: "Editing · Post-production",
            cta: "Work together",
        },
        portfolio: {
            pageLabel: "Works",
            pageTitle: "Portfolio",
            metaTitle: "Portfolio — Lucas Lemes",
            metaDesc: "Portfolio of Lucas Lemes: films, videos and high-end branded content.",
            cat1: "Film / Video",
            cat2: "Commercial / Branded Content",
            cat3: "Photography / Gallery",
            works: [
                { title: "Drift", subtitle: "Short film · 2023", alt: "Drift — cinematic short film" },
                { title: "Reflections", subtitle: "Documentary · 2023", alt: "Reflections — visual documentary" },
                { title: "Liminal", subtitle: "Experimental · 2024", alt: "Liminal — experimental film" },
                { title: "Reserva — Summer Campaign", subtitle: "Branded Content · 2024", alt: "Reserva — fashion campaign" },
                { title: "Vivo — New Era", subtitle: "Commercial Spot · 2023", alt: "Vivo — commercial spot" },
                { title: "Amaro — Identity", subtitle: "Branded Content · 2023", alt: "Amaro — editorial branded content" },
            ],
            galleryTitles: {
                "ana-rocha-e-apolinario": "Ana Rocha & Apolinário",
                "mayron-brum": "Mayron Brum",
                "revolve": "REVOLVE",
                "revolve-nye-2024": "REVOLVE NYE 2024",
                "white-space": "WHITE SPACE"
            }
        },
        services: {
            pageLabel: "What I offer",
            pageTitle: "Services",
            metaTitle: "Services — Lucas Lemes",
            metaDesc: "Audiovisual production services by Lucas Lemes: film, branded content, advertising, and more.",
            ctaLabel: "Ready to create something extraordinary?",
            ctaBtn: "Get in touch",
            list: [
                {
                    number: "01",
                    title: "Video Direction & Production",
                    description: "Creative conception, direction and production of commercials, spots, corporate videos and brand content. From script to delivery, with full control over visual and narrative quality.",
                },
                {
                    number: "02",
                    title: "Branded Content",
                    description: "Development of audiovisual content that communicates brand identity and values through authentic, cinematic narratives — building a genuine connection with the audience.",
                },
                {
                    number: "03",
                    title: "Director of Photography",
                    description: "Creating the visual identity of projects through cinematic photography. Definition of colour palette, lighting design, composition and camera movement for each narrative.",
                },
                {
                    number: "04",
                    title: "Editing & Post-production",
                    description: "Narrative editing, cinematic colour grading, sound design and delivery in any format — broadcast, digital, streaming platforms or projection.",
                },
                {
                    number: "05",
                    title: "Documentary",
                    description: "Production of corporate, cultural and social documentaries. Character-driven narratives, in-depth research and high-impact cinematic language.",
                },
                {
                    number: "06",
                    title: "Visual Consultancy",
                    description: "Strategic consultancy on visual identity and audiovisual language for brands, production companies and content creators seeking to elevate the aesthetic standard of their communication.",
                },
            ],
        },
        contact: {
            pageLabel: "Get in touch",
            pageTitle: "Contact",
            metaTitle: "Contact — Lucas Lemes",
            metaDesc: "Contact Lucas Lemes for videomaker and visual production projects.",
            intro: "Open to projects in cinema, advertising, branded content and visual production. Get in touch to talk about your next project.",
            emailLabel: "Email",
            locationLabel: "Location",
            locationValue: "Brazil — national and international projects",
            instagramLabel: "Instagram",
            vimeoLabel: "Vimeo",
            whatsappLabel: "WhatsApp",
            formName: "Name",
            formNamePlaceholder: "Your name",
            formEmail: "Email",
            formEmailPlaceholder: "you@email.com",
            formProject: "Project type",
            formProjectDefault: "Select",
            formMessage: "Message",
            formMessagePlaceholder: "Tell me about your project...",
            formSubmit: "Send message",
            sentTitle: "Message sent.",
            sentSub: "I'll get back to you within 48 hours.",
            projectOptions: [
                { value: "film", label: "Film / Video" },
                { value: "commercial", label: "Commercial / Advertising" },
                { value: "branded", label: "Branded Content" },
                { value: "doc", label: "Documentary" },
                { value: "other", label: "Other" },
            ],
        },
        videoCaptions: {
            "Amiri Official.mp4": {
                title: "AMIRI – Paris Fashion Week (2025)",
                subtitle: "Paris, France | 2025",
                description: "Direction and vertical capture for AMIRI during Paris Fashion Week. An immersive record of the brand's contemporary aesthetics within the context of the official show."
            },
            "Flair.mp4": {
                title: "Jewelry Campaign Ana Rocha & Apolinário",
                subtitle: "Audiovisual Director",
                description: "Cinematic campaign for jewelery brand, exploring shape, texture and identity through a minimalist and sensory language."
            },
            "Lavinia Fuksas.mp4": {
                title: "LAVÍNIA FUKSAS – Jewelry Campaign",
                subtitle: "Direction and photography",
                description: "Cinematic campaign for a jewelry brand, exploring form, texture, and identity through minimalist and sensory language."
            },
            "Kyle.mp4": {
                title: "KYLE HO – Les Amoureux SS24",
                subtitle: "London Fashion Week | 2023",
                description: "Direction and production for the official London Fashion Week designer. Film exhibited at DiscoveryLAB, exploring movement, aesthetics, and emotional narrative."
            },
            "Kyle Film.mp4": {
                title: "KYLE HO – “A Dialogue With Myself” AW24",
                subtitle: "London Fashion Week | 2024",
                description: "Original fashion short film presented at DiscoveryLAB. Visual investigation into identity and duality in the AW24 collection."
            },
            "Final.mp4": {
                title: "META – Casa Brasil",
                subtitle: "Paris Olympics | 2025",
                description: "Production and editing of approximately 40 official films for Meta at Casa Brasil, recording Brazilian athletes and personalities in the international Olympic context."
            },
            "Elen Mountain Part I.mp4": {
                title: "REVOLVE – Aspen Campaign Part I",
                subtitle: "Aspen, United States | 2023",
                description: "Direction and capture for winter campaign for Revolve. Mountain aesthetics and cinematic atmosphere in the Aspen setting."
            },
            "Elen Mountain Part II.mp4": {
                title: "REVOLVE – Aspen Campaign Part II",
                subtitle: "Aspen, United States | 2024",
                description: "Continuity of the brand's visual narrative in an alpine environment, combining fashion, landscape, and movement."
            },
            "The Snow Lodge Polo.mp4": {
                title: "SNOW POLO SEASON",
                subtitle: "Aspen, United States",
                description: "Cinematic record of the Snow Polo season, capturing the intersection of sport, elegance, and landscape."
            },
            "Reels Day 2.mp4": {
                title: "L’ORÉAL PARIS",
                subtitle: "Cannes Festival",
                description: "Audiovisual production carried out during the Cannes Festival for L’Oréal Paris."
            },
            "New Year Video.mp4": {
                title: "NEW YEAR 2025/2026 – David Guetta",
                subtitle: "Audiovisual Production",
                description: "Audiovisual production for international New Year's celebration, featuring David Guetta. Atmosphere, music, and collective experience as the narrative axis."
            }
        }
    },
    pt: {
        nav: {
            about: "Sobre",
            portfolio: "Portfólio",
            services: "Serviços",
            contact: "Contato",
            menuLabel: "Abrir menu",
        },
        footer: {
            tagline: "videomaker · produção visual",
        },
        home: {
            showreel: "Showreel",
            portfolioLabel: "Portfólio",
            category1Title: "Cinema / Vídeo",
            category1Alt: "Cinematografia — direção de fotografia em set de filmagem",
            category2Title: "Comercial / Branded Content",
            category2Alt: "Produção audiovisual comercial — gravação de branded content",
            tagline1: "Imagem com propósito.",
            tagline2: "Narrativa com impacto.",
            cta: "Iniciar um projeto",
            viewAll: "Ver portfólio completo",
            casesLabel: "Marcas com as quais trabalhei",
            casesTitle: "Marcas",
        },
        about: {
            pageLabel: "Sobre",
            pageTitle: "Lucas Lemes",
            metaTitle: "Sobre — Lucas Lemes",
            metaDesc:
                "Lucas Lemes é diretor audiovisual, documentarista e produtor com atuação internacional entre Europa, América do Sul, África e Estados Unidos.",
            role: "Diretor Audiovisual · Documentarista · Produtor",
            bio1: "Lucas Lemes é diretor audiovisual, documentarista e produtor com atuação internacional entre Europa, América do Sul, África e Estados Unidos. Seu trabalho transita entre cinema, moda, publicidade e projetos autorais, sempre movido pela narrativa, estética e identidade.",
            bio2: "Com mais de dez anos de experiência, construiu sua trajetória em contextos globais como o Festival de Cannes (França), Paris Fashion Week, London Fashion Week e as Olimpíadas de Paris, além de produções realizadas em cidades como Nova York e Aspen, nos Estados Unidos. Seus projetos circularam em ambientes internacionais de alto nível e incluem um documentário exibido na CNN Portugal (NiT TV), além de produções vinculadas a marcas e eventos de relevância global.",
            bio3: "Sua atuação combina linguagem cinematográfica e precisão estética, seja na direção de documentários de autor filmados em múltiplos países, ou na criação de conteúdos visuais para grandes marcas, artistas e instituições culturais. Ao longo de sua carreira, desenvolveu trabalhos em cidades como Cannes, Paris, Londres, Lisboa, Zurique, Nova York e Aspen, consolidando uma prática multicultural e transnacional.",
            bio4: "Paralelamente ao seu trabalho comercial e de moda, desenvolve projetos autorais com foco social e intercultural. Atualmente dirige um documentário internacional filmado em 11 países, explorando temas como longevidade, saúde mental e propósito a partir de uma perspectiva humana e global.",
            bio5: "Reconhecido como Diplomata Civil por sua atuação em projetos humanitários em Angola, Lucas entende o audiovisual como um instrumento de registro, diálogo cultural e transformação social. Seu trabalho parte da convicção de que a imagem e a narrativa são ferramentas de construção de memória, território e identidade.",
            bio6: "Entre o cinema e o branded content, entre o mercado internacional e o autoral, sua prática é guiada por uma constante: criar imagens com propósito e narrativas com impacto.",
            skill1: "Cinema · Documentário",
            skill2: "Publicidade · Branded Content",
            skill3: "Direção de Fotografia",
            skill4: "Edição · Pós-produção",
            cta: "Trabalhar juntos",
        },
        portfolio: {
            pageLabel: "Trabalhos",
            pageTitle: "Portfólio",
            metaTitle: "Portfólio — Lucas Lemes",
            metaDesc: "Portfólio de Lucas Lemes: filmes, vídeos e branded content de alto nível.",
            cat1: "Cinema / Vídeo",
            cat2: "Comercial / Branded Content",
            cat3: "Fotografia / Galería",
            works: [
                { title: "Deriva", subtitle: "Curta-metragem · 2023", alt: "Deriva — curta-metragem cinematográfico" },
                { title: "Reflexos", subtitle: "Documentário · 2023", alt: "Reflexos — documentário visual" },
                { title: "Liminal", subtitle: "Experimental · 2024", alt: "Liminal — filme experimental" },
                { title: "Reserva — Campanha Verão", subtitle: "Branded Content · 2024", alt: "Reserva — campanha de moda" },
                { title: "Vivo — Nova Era", subtitle: "Spot Publicitário · 2023", alt: "Vivo — spot publicitário" },
                { title: "Amaro — Identidade", subtitle: "Branded Content · 2023", alt: "Amaro — branded content editorial" },
            ],
            galleryTitles: {
                "ana-rocha-e-apolinario": "Ana Rocha & Apolinário",
                "mayron-brum": "Mayron Brum",
                "revolve": "REVOLVE",
                "revolve-nye-2024": "REVOLVE NYE 2024",
                "white-space": "WHITE SPACE"
            }
        },
        services: {
            pageLabel: "O que ofereço",
            pageTitle: "Serviços",
            metaTitle: "Serviços — Lucas Lemes",
            metaDesc: "Serviços de produção audiovisual oferecidos por Lucas Lemes: cinema, branded content, publicidade e mais.",
            ctaLabel: "Pronto para criar algo extraordinário?",
            ctaBtn: "Entrar em contato",
            list: [
                {
                    number: "01",
                    title: "Direção & Produção de Vídeo",
                    description: "Concepção criativa, direção e produção de filmes publicitários, spots, vídeos institucionais e conteúdo de marca. Do roteiro à entrega, com controle total da qualidade visual e narrativa.",
                },
                {
                    number: "02",
                    title: "Branded Content",
                    description: "Desenvolvimento de conteúdo audiovisual que comunica a identidade e os valores da marca através de narrativas autênticas e cinematográficas — construindo uma conexão real com o público.",
                },
                {
                    number: "03",
                    title: "Direção de Fotografia",
                    description: "Criação da identidade visual de projetos através da fotografia cinematográfica. Definição de paleta de cores, design de iluminação, composição e movimento de câmera para cada narrativa.",
                },
                {
                    number: "04",
                    title: "Edição & Pós-produção",
                    description: "Edição narrativa, color grading cinematográfico, sound design e entrega em qualquer formato — broadcast, digital, plataformas de streaming ou projeção.",
                },
                {
                    number: "05",
                    title: "Documentário",
                    description: "Produção de documentários corporativos, culturais e sociais. Narrativa baseada em personagens reais, pesquisa profunda e linguagem cinematográfica de impacto.",
                },
                {
                    number: "06",
                    title: "Consultoria Visual",
                    description: "Consultoria estratégica de identidade visual e linguagem audiovisual para marcas, produtoras e criadores de conteúdo que buscam elevar o padrão estético de sua comunicação.",
                },
            ],
        },
        contact: {
            pageLabel: "Escreva para mim",
            pageTitle: "Contato",
            metaTitle: "Contato — Lucas Lemes",
            metaDesc: "Entre em contato com Lucas Lemes para projetos de videomaker e produção visual.",
            intro: "Aberto a projetos de cinema, publicidade, branded content e produção visual. Entre em contato para falar sobre seu próximo projeto.",
            emailLabel: "E-mail",
            locationLabel: "Localização",
            locationValue: "Brasil — projetos nacionais e internacionais",
            instagramLabel: "Instagram",
            vimeoLabel: "Vimeo",
            whatsappLabel: "WhatsApp",
            formName: "Nome",
            formNamePlaceholder: "Seu nome",
            formEmail: "E-mail",
            formEmailPlaceholder: "seu@email.com",
            formProject: "Tipo de projeto",
            formProjectDefault: "Selecionar",
            formMessage: "Mensagem",
            formMessagePlaceholder: "Conte-me sobre seu projeto...",
            formSubmit: "Enviar mensagem",
            sentTitle: "Mensagem enviada.",
            sentSub: "Responderei dentro de 48 horas.",
            projectOptions: [
                { value: "film", label: "Cinema / Vídeo" },
                { value: "commercial", label: "Comercial / Publicidade" },
                { value: "branded", label: "Branded Content" },
                { value: "doc", label: "Documentário" },
                { value: "other", label: "Outro" },
            ],
        },
        videoCaptions: {
            "Amiri Official.mp4": {
                title: "AMIRI – Paris Fashion Week (2025)",
                subtitle: "Paris, França | 2025",
                description: "Direção e captação vertical para AMIRI durante a Paris Fashion Week. Um registro imersivo da estética contemporânea da marca no contexto do desfile oficial."
            },
            "Flair.mp4": {
                title: "Campanha Marca Jóias Ana Rocha & Apolinário",
                subtitle: "Diretor Audiovisual",
                description: "Campanha cinematográfica para marca de joias, explorando forma, textura e identidade através de uma linguagem minimalista e sensorial."
            },
            "Lavinia Fuksas.mp4": {
                title: "LAVÍNIA FUKSAS – Jewelry Campaign",
                subtitle: "Direção e fotografia",
                description: "Campanha cinematográfica para marca de joias, explorando forma, textura e identidade através de uma linguagem minimalista e sensorial."
            },
            "Kyle.mp4": {
                title: "KYLE HO – Les Amoureux SS24",
                subtitle: "London Fashion Week | 2023",
                description: "Direção e produção para o designer oficial da London Fashion Week. Filme exibido no DiscoveryLAB, explorando movimento, estética e narrativa emocional."
            },
            "Kyle Film.mp4": {
                title: "KYLE HO – “A Dialogue With Myself” AW24",
                subtitle: "London Fashion Week | 2024",
                description: "Curta-metragem de moda autoral apresentado no DiscoveryLAB. Investigação visual sobre identidade e dualidade na coleção AW24."
            },
            "Final.mp4": {
                title: "META – Casa Brasil",
                subtitle: "Olimpíadas de Paris | 2025",
                description: "Produção e edição de aproximadamente 40 filmes oficiais para a Meta na Casa Brasil, registrando atletas e personalidades brasileiras no contexto olímpico internacional."
            },
            "Elen Mountain Part I.mp4": {
                title: "REVOLVE – Aspen Campaign Part I",
                subtitle: "Aspen, Estados Unidos | 2023",
                description: "Direção e captação em campanha de inverno para a Revolve. Estética de montanha e atmosfera cinematográfica no cenário de Aspen."
            },
            "Elen Mountain Part II.mp4": {
                title: "REVOLVE – Aspen Campaign Part II",
                subtitle: "Aspen, Estados Unidos | 2024",
                description: "Continuidade da narrativa visual da marca em ambiente alpino, combinando moda, paisagem e movimento."
            },
            "The Snow Lodge Polo.mp4": {
                title: "SNOW POLO SEASON",
                subtitle: "Aspen, Estados Unidos",
                description: "Registro cinematográfico da temporada de Snow Polo, captando a interseção entre esporte, elegância e paisagem."
            },
            "Reels Day 2.mp4": {
                title: "L’ORÉAL PARIS",
                subtitle: "Festival de Cannes",
                description: "Produção audiovisual realizada durante o Festival de Cannes para a L’Oréal Paris."
            },
            "New Year Video.mp4": {
                title: "NEW YEAR 2025/2026 – David Guetta",
                subtitle: "Produção Audiovisual",
                description: "Produção audiovisual da celebração internacional de Ano Novo, com a presença de David Guetta. Atmosfera, música e experiência coletiva como eixo narrativo."
            }
        }
    },
    fr: {
        nav: {
            about: "À propos",
            portfolio: "Portfolio",
            services: "Services",
            contact: "Contact",
            menuLabel: "Ouvrir le menu",
        },
        footer: {
            tagline: "vidéaste · production visuelle",
        },
        home: {
            showreel: "Showreel",
            portfolioLabel: "Portfolio",
            category1Title: "Cinéma / Vidéo",
            category1Alt: "Cinématographie — directeur de la photographie sur le plateau de tournage",
            category2Title: "Commercial / Branded Content",
            category2Alt: "Production audiovisuelle commerciale — tournage de contenu de marque",
            tagline1: "L'image avec un sens.",
            tagline2: "Le récit avec un impact.",
            cta: "Démarrer un projet",
            viewAll: "Voir le portfolio complet",
            casesLabel: "Marques avec lesquelles j'ai travaillé",
            casesTitle: "Marques",
        },
        about: {
            pageLabel: "À propos",
            pageTitle: "Lucas Lemes",
            metaTitle: "À propos — Lucas Lemes",
            metaDesc:
                "Lucas Lemes est réalisateur audiovisuel, documentariste et producteur avec une expérience internationale entre l'Europe, l'Amérique du Sud, l'Afrique et les États-Unis.",
            role: "Réalisateur Audiovisuel · Documentariste · Producteur",
            bio1: "Lucas Lemes est réalisateur audiovisuel, documentariste et producteur avec une expérience internationale entre l'Europe, l'Amérique du Sud, l'Afrique et les États-Unis. Son travail oscille entre cinéma, mode, publicité et projets d'auteur, toujours guidé par la narration, l'esthétique et l'identité.",
            bio2: "Avec plus de dix ans d'expérience, il a construit son parcours dans des contextes mondiaux tels que le Festival de Cannes (France), la Paris Fashion Week, la London Fashion Week et les Jeux Olympiques de Paris, ainsi que des productions réalisées dans des villes comme New York et Aspen, aux États-Unis. Ses projets ont circulé dans des environnements internationaux de haut niveau et incluent un documentaire diffusé sur CNN Portugal (NiT TV), ainsi que des productions liées à des marques et des événements de portée mondiale.",
            bio3: "Son travail combine langage cinématographique et précision esthétique, que ce soit dans la réalisation de documentaires d'auteur filmés dans plusieurs pays, ou dans la création de contenus visuels pour de grandes marques, des artistes et des institutions culturelles. Tout au long de sa carrière, il a développé des travaux dans des villes comme Cannes, Paris, Londres, Lisbonne, Zurich, New York et Aspen, consolidant une pratique multiculturelle et transnationale.",
            bio4: "Parallèlement à son travail commercial et de mode, il développe des projets d'auteur axés sur le social et l'interculturel. Il réalise actuellement un documentaire international filmé dans 11 pays, explorant des thèmes tels que la longévité, la santé mentale et le sens de la vie d'un point de vue humain et global.",
            bio5: "Reconnu comme Diplomate Civil pour son action dans des projets humanitaires en Angola, Lucas comprend l'audiovisuel comme um instrument d'enregistrement, de dialogue culturel et de transformation sociale. Son travail part de la conviction de qu'image et récit sont des outils de construction de la mémoire, du territoire et de l'identité.",
            bio6: "Entre le cinéma et le contenu de marque, entre le marché international et l'indépendant, sa pratique est guidée par une constante : créer des images qui ont du sens et des récits qui ont un impact.",
            skill1: "Cinéma · Documentaire",
            skill2: "Publicité · Branded Content",
            skill3: "Directeur de la Photographie",
            skill4: "Montage · Post-production",
            cta: "Travailler ensemble",
        },
        portfolio: {
            pageLabel: "Travaux",
            pageTitle: "Portfolio",
            metaTitle: "Portfolio — Lucas Lemes",
            metaDesc: "Portfolio de Lucas Lemes : films, vidéos et contenu de marque haut de gamme.",
            cat1: "Cinéma / Vidéo",
            cat2: "Commercial / Branded Content",
            cat3: "Photographie / Galerie",
            works: [
                { title: "Dérive", subtitle: "Court-métrage · 2023", alt: "Dérive — court-métrage cinématographique" },
                { title: "Reflets", subtitle: "Documentaire · 2023", alt: "Reflets — documentaire visuel" },
                { title: "Liminal", subtitle: "Expérimental · 2024", alt: "Liminal — film expérimental" },
                { title: "Reserva — Campagne d'été", subtitle: "Branded Content · 2024", alt: "Reserva — campagne de mode" },
                { title: "Vivo — Nouvelle Ère", subtitle: "Spot Publicitaire · 2023", alt: "Vivo — spot publicitaire" },
                { title: "Amaro — Identité", subtitle: "Branded Content · 2023", alt: "Amaro — contenu de marque éditorial" },
            ],
            galleryTitles: {
                "ana-rocha-e-apolinario": "Ana Rocha & Apolinário",
                "mayron-brum": "Mayron Brum",
                "revolve": "REVOLVE",
                "revolve-nye-2024": "REVOLVE NYE 2024",
                "white-space": "WHITE SPACE"
            }
        },
        services: {
            pageLabel: "Ce que je propose",
            pageTitle: "Services",
            metaTitle: "Services — Lucas Lemes",
            metaDesc: "Services de production audiovisuelle proposés par Lucas Lemes : cinéma, contenu de marque, publicité et plus.",
            ctaLabel: "Prêt à créer quelque chose d'extraordinaire ?",
            ctaBtn: "Prendre contact",
            list: [
                {
                    number: "01",
                    title: "Réalisation & Production Vidéo",
                    description: "Conception créative, réalisation et production de films publicitaires, spots, vidéos institutionnelles et contenu de marque. Du scénario à la livraison, avec un contrôle total de la qualité visuelle et narrative.",
                },
                {
                    number: "02",
                    title: "Branded Content",
                    description: "Développement de contenu audiovisuel qui communique l'identité et les valeurs de la marque à travers des récits authentiques et cinématographique — en construisant une véritable connexion avec le public.",
                },
                {
                    number: "03",
                    title: "Direction de la Photographie",
                    description: "Création de l'identité visuelle de projets à travers la photographie cinématographique. Définition de la palette de couleurs, conception de l'éclairage, composition et mouvement de caméra pour chaque récit.",
                },
                {
                    number: "04",
                    title: "Montage & Post-production",
                    description: "Montage narratif, étalonnage cinématographique, conception sonore et livraison dans n'importe quel format — diffusion, numérique, plateformes de streaming ou projection.",
                },
                {
                    number: "05",
                    title: "Documentaire",
                    description: "Production de documentaires d'entreprise, culturels et sociaux. Récits basés sur des personnages réels, recherche approfondie et langage cinématographique à fort impact.",
                },
                {
                    number: "06",
                    title: "Conseil Visuel",
                    description: "Conseil stratégique en identité visuelle et langage audiovisuel pour les marques, les sociétés de production et les créateurs de contenu qui cherchent à élever les standards esthétiques de leur communication.",
                },
            ],
        },
        contact: {
            pageLabel: "Écrivez-moi",
            pageTitle: "Contact",
            metaTitle: "Contact — Lucas Lemes",
            metaDesc: "Contactez Lucas Lemes pour des projets de vidéaste et de production visuelle.",
            intro: "Ouvert aux projets de cinéma, publicité, contenu de marque et production visuelle. Contactez-moi pour discuter de votre prochain projet.",
            emailLabel: "Courriel",
            locationLabel: "Emplacement",
            locationValue: "Brésil — projets nationaux et internationaux",
            instagramLabel: "Instagram",
            vimeoLabel: "Vimeo",
            whatsappLabel: "WhatsApp",
            formName: "Nom",
            formNamePlaceholder: "Votre nom",
            formEmail: "Courriel",
            formEmailPlaceholder: "votre@email.com",
            formProject: "Type de projet",
            formProjectDefault: "Sélectionner",
            formMessage: "Message",
            formMessagePlaceholder: "Parlez-moi de votre projet...",
            formSubmit: "Envoyer le message",
            sentTitle: "Message envoyé.",
            sentSub: "Je vous répondrai dans les 48 heures.",
            projectOptions: [
                { value: "film", label: "Cinéma / Vidéo" },
                { value: "commercial", label: "Commercial / Publicité" },
                { value: "branded", label: "Branded Content" },
                { value: "doc", label: "Documentaire" },
                { value: "other", label: "Autre" },
            ],
        },
        videoCaptions: {
            "Amiri Official.mp4": {
                title: "AMIRI – Paris Fashion Week (2025)",
                subtitle: "Paris, France | 2025",
                description: "Réalisation et capture verticale pour AMIRI lors de la Paris Fashion Week. Un enregistrement immersif de l'esthétique contemporaine de la marque dans le contexte du défilé officiel."
            },
            "Flair.mp4": {
                title: "Campagne de la marque de bijoux Ana Rocha & Apolinário",
                subtitle: "Réalisateur Audiovisuel",
                description: "Campagne cinématographique pour une marque de bijoux, explorant la forme, la texture et l'identité à travers un langage minimaliste et sensoriel."
            },
            "Lavinia Fuksas.mp4": {
                title: "LAVÍNIA FUKSAS – Jewelry Campaign",
                subtitle: "Réalisation et photographie",
                description: "Campagne cinématographique pour une marque de bijoux, explorant la forme, la texture et l'identité à travers un langage minimaliste et sensoriel."
            },
            "Kyle.mp4": {
                title: "KYLE HO – Les Amoureux SS24",
                subtitle: "London Fashion Week | 2023",
                description: "Réalisation et production pour le designer officiel de la London Fashion Week. Film exposé à DiscoveryLAB, explorant le mouvement, l'esthétique et le récit émotionnel."
            },
            "Kyle Film.mp4": {
                title: "KYLE HO – “A Dialogue With Myself” AW24",
                subtitle: "London Fashion Week | 2024",
                description: "Court-métrage de mode d'auteur présenté à DiscoveryLAB. Recherche visuelle sobre l'identité et la dualité dans la collection AW24."
            },
            "Final.mp4": {
                title: "META – Casa Brasil",
                subtitle: "Jeux Olympiques de Paris | 2025",
                description: "Production et montage d'environ 40 films officiels pour Meta à la Casa Brasil, enregistrant des athlètes et des personnalités brésiliennes dans le contexte olympique international."
            },
            "Elen Mountain Part I.mp4": {
                title: "REVOLVE – Aspen Campaign Part I",
                subtitle: "Aspen, États-Unis | 2023",
                description: "Réalisation et capture dans la campagne d'hiver de Revolve. Esthétique de montagne et atmosphère cinématographique dans le décor d'Aspen."
            },
            "Elen Mountain Part II.mp4": {
                title: "REVOLVE – Aspen Campaign Part II",
                subtitle: "Aspen, États-Unis | 2024",
                description: "Continuité du récit visuel de la marque dans un environnement alpin, combinant mode, paysage et mouvement."
            },
            "The Snow Lodge Polo.mp4": {
                title: "SNOW POLO SEASON",
                subtitle: "Aspen, États-Unis",
                description: "Enregistrement cinématographique de la saison de Snow Polo, captant l'intersection entre le sport, l'élégance et le paysage."
            },
            "Reels Day 2.mp4": {
                title: "L’ORÉAL PARIS",
                subtitle: "Festival de Cannes",
                description: "Production audiovisuelle réalisée lors du Festival de Cannes pour L’Oréal Paris."
            },
            "New Year Video.mp4": {
                title: "NEW YEAR 2025/2026 – David Guetta",
                subtitle: "Production Audiovisuelle",
                description: "Production audiovisuelle de la célébration internationale du Nouvel An, avec la présence de David Guetta. Atmosphère, musique et expérience collective comme axe narratif."
            }
        }
    },
} as const;

export function getT(lang: Lang) {
    return translations[lang];
}

export function isValidLang(lang: string): lang is Lang {
    return lang === "es" || lang === "en" || lang === "pt" || lang === "fr";
}
