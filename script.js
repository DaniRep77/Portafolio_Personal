// Sistema de traducción mejorado
document.addEventListener('DOMContentLoaded', function() {
    const translateBtn = document.getElementById('translateBtn');
    const translateBtnText = translateBtn.querySelector('span');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    let currentLang = 'es';
    let currentTheme = 'light';
    
    // Textos para el botón de traducción
    const buttonTexts = {
        'es': 'EN',
        'en': 'ES'
    };
    
    // Función para cambiar el idioma
    function toggleLanguage() {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        console.log('Cambiando idioma a:', currentLang);
        
        // Actualizar todos los elementos con datos de traducción
        document.querySelectorAll('[data-es], [data-en]').forEach(element => {
            if (element.hasAttribute(`data-${currentLang}`)) {
                const newText = element.getAttribute(`data-${currentLang}`);
                
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // Para inputs y textareas, actualizar placeholder
                    const placeholder = element.getAttribute(`data-${currentLang}-placeholder`);
                    if (placeholder) {
                        element.placeholder = placeholder;
                    }
                } else if (element.tagName === 'TITLE') {
                    // Para el título de la página
                    document.title = newText;
                } else {
                    // Para otros elementos, actualizar texto
                    element.textContent = newText;
                }
            }
        });
        
        // Actualizar el texto del botón
        translateBtnText.textContent = buttonTexts[currentLang];
        
        // Cambiar el idioma del documento HTML
        document.documentElement.lang = currentLang;
        
        // Guardar preferencia en localStorage
        localStorage.setItem('preferredLanguage', currentLang);
        
        console.log('Idioma cambiado exitosamente a:', currentLang);
    }
    
    // Función para aplicar traducción al cargar la página
    function applyStoredLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && savedLang !== 'es') {
            currentLang = savedLang;
            // Forzar la actualización de la traducción
            toggleLanguage();
            // Volver a establecer el idioma correcto
            currentLang = savedLang;
        }
    }
    
    // Función para cambiar el tema
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Cambiar el ícono
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Cambiar a modo claro';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Cambiar a modo oscuro';
        }
        
        // Guardar preferencia en localStorage
        localStorage.setItem('preferredTheme', currentTheme);
    }

    // Datos de los proyectos
    const projectsData = {
        'adopta-amigo': {
            category: 'Web',
            title: 'Adopta a un amigo',
            subtitle: 'Plataforma web para refugio de animales',
            description: 'Plataforma web desarrollada para un refugio de animales con el objetivo de promover la adopción responsable. El sistema incluye catálogo de mascotas disponibles, formularios de adopción, gestión de perfiles de animales y panel administrativo para el personal del refugio. La plataforma ha facilitado más de 50 adopciones exitosas en su primer año de funcionamiento.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Cloudinary'],
            role: 'Gestor de Calidad - Gestor de Calidad comprometido con la mejora continua y la excelencia operativa. Especializado en optimizar procesos, garantizar el cumplimiento de estándares y fomentar una cultura organizacional orientada a la eficiencia, la innovación y la satisfacción del cliente.',
            image: "img\\adoctaunamigo.jpeg",
            liveLink: '#',
            codeLink: 'https://github.com/DaniRep77/WebApplication1'
        },
        'planificador-tareas': {
            category: 'Mobile App',
            title: 'Planificador de Tareas',
            subtitle: 'Aplicación móvil para organización personal',
            description: 'Aplicación móvil desarrollada para ayudar a los usuarios en la gestión eficiente de sus tareas diarias. Incluye funciones como recordatorios inteligentes, categorización de tareas, seguimiento de progreso y sincronización entre dispositivos. La aplicación utiliza almacenamiento local para funcionar sin conexión a internet.',
            technologies: ['React Native', 'Firebase', 'Android Studio', 'Redux', 'Local Storage'],
            role: 'Desarrollador Mobile - Encargado del desarrollo completo de la aplicación utilizando React Native, implementación de la lógica de negocio, integración con Firebase para sincronización en la nube, y optimización del rendimiento para dispositivos Android.',
            image: "img\\TaskPLanner (2).jpeg",
            liveLink: '#',
            codeLink: 'https://github.com/gabrielaamaya/progral-2024-semi'
        },
        'artesanias-conchita': {
            category: 'Software',
            title: 'Artesanías Conchita',
            subtitle: 'Sistema de gestión empresarial',
            description: 'Prototipo de software empresarial desarrollado para Artesanías Conchita, permitiendo el control completo de facturación, inventario y clientes. El sistema automatiza procesos manuales, genera reportes detallados y mejora la eficiencia operativa de la empresa. Incluye módulos de ventas, compras, inventario y reportes financieros.',
            technologies: ['Visual Studio', 'C#', 'SQL Server', 'Adobe XD', 'Illustrator', 'Windows Forms'],
            role: 'Gestor de Calidad - Gestor de Calidad comprometido con la mejora continua y la excelencia operativa. Especializado en optimizar procesos, garantizar el cumplimiento de estándares y fomentar una cultura organizacional orientada a la eficiencia, la innovación y la satisfacción del cliente.',
            image: "img\\artesaniasconchita.jpeg",
            liveLink: '#',
            codeLink: 'https://github.com/DaniRep77/Progra2-Semi-2025'
        }
    };

    // Función para mostrar detalles del proyecto
    function showProjectDetails(projectId) {
        const project = projectsData[projectId];
        if (!project) return;
        
        // Actualizar contenido
        document.getElementById('detail-category').textContent = project.category;
        document.getElementById('detail-title').textContent = project.title;
        document.getElementById('detail-subtitle').textContent = project.subtitle;
        document.getElementById('detail-description').textContent = project.description;
        document.getElementById('detail-role').textContent = project.role;
        document.getElementById('detail-image').src = project.image;
        document.getElementById('detail-image').alt = project.title;
        document.getElementById('detail-live-link').href = project.liveLink;
        document.getElementById('detail-code-link').href = project.codeLink;
        
        // Actualizar tecnologías
        const techContainer = document.getElementById('detail-technologies');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
        });
        
        // Mostrar sección de detalles y ocultar proyectos
        document.getElementById('detalles-proyecto').style.display = 'block';
        document.getElementById('proyectos').style.display = 'none';
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }

    // Función para cerrar detalles del proyecto
    function closeProjectDetails() {
        document.getElementById('detalles-proyecto').style.display = 'none';
        document.getElementById('proyectos').style.display = 'block';
    }

    // Inicialización
    function init() {
        // Aplicar idioma guardado
        applyStoredLanguage();
        
        // Aplicar tema guardado
        const savedTheme = localStorage.getItem('preferredTheme');
        if (savedTheme && savedTheme !== 'light') {
            currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                themeToggle.title = 'Cambiar a modo claro';
            }
        }
        
        // Añadir event listeners a las tarjetas de proyecto
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card) => {
            const projectId = card.getAttribute('data-project');
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => showProjectDetails(projectId));
        });
        
        // Event listener para el botón de cerrar
        document.getElementById('closeProjectDetails').addEventListener('click', closeProjectDetails);
        
        // También hacer que los botones "Ver Proyectos" en las tarjetas funcionen
        document.querySelectorAll('.view-project').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const card = this.closest('.project-card');
                const projectId = card.getAttribute('data-project');
                showProjectDetails(projectId);
            });
        });
        
        // Eventos principales
        translateBtn.addEventListener('click', toggleLanguage);
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Inicializar la aplicación
    init();
});