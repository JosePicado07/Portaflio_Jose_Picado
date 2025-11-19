/* ========================================
   LANGUAGE SWITCHER - ES/EN Translation System
   José Picado Portfolio
   ======================================== */

// Current language state (default: Spanish)
let currentLanguage = 'es';

// Complete translations object with all content
const translations = {
    es: {
        // Navigation
        'nav-about': 'Sobre Mí',
        'nav-projects': 'Proyectos',
        'nav-skills': 'Skills',
        'nav-contact': 'Contacto',

        // Hero Section
        'hero-title': 'Data Engineer',
        'hero-tagline': 'Transformando procesos de 6 horas en 45 minutos mediante automatización inteligente y arquitectura escalable',
        'hero-stat1': 'Reducción latencia',
        'hero-stat2': 'Registros procesados',
        'hero-stat3': 'Años experiencia',
        'hero-cta': 'Ver Proyectos',
        'hero-github': 'GitHub',
        'hero-downloadCV': 'Descargar CV',
        'hero-slogan': 'Precision in Process, Power in Performance',

        // About Section
        'about-title': 'Sobre Mí',
        'about-p1': 'Data Engineer con experiencia construyendo pipelines ETL y sistemas de datos en producción. Especializado en optimización de procesamiento a gran escala: reduje sistema de auditoría empresarial de 6 horas a 45 minutos (92% mejora) procesando 500K+ registros.',
        'about-p2': 'Mi background combina análisis de datos, integración de APIs y diseño de arquitectura escalable. En WWT Costa Rica, desarrollo aplicaciones Python en producción, frameworks de calidad de datos y pipelines automatizados que procesan 350+ flujos de datos concurrentes.',
        'about-p3': 'Actualmente cursando Ingeniería en Desarrollo de Software en Universidad Cenfotec (60% completado), aplicando aprendizaje continuo para dominar Apache Spark, patrones DDD y arquitectura cloud.',
        'about-card1': 'Rendimiento',
        'about-card2': 'Escala',
        'about-card3': 'Calidad',

        // Projects Section
        'projects-title': 'Proyectos',
        'projects-subtitle': 'Soluciones de datos que transforman negocios',

        // Project 1
        'project1-title': 'Sistema de Auditoría Empresarial',
        'project1-desc': 'Automatización de procesamiento de compliance auditando 500K+ registros con reducción del 92% en latencia (6 horas → 45 minutos). Implementé framework de validación de calidad de datos con detección automática de anomalías.',
        'project1-status': 'Producción (2024)',
        'project1-value1': '92%',
        'project1-impact1': 'Reducción tiempo',
        'project1-value2': '95%',
        'project1-impact2': 'Reducción revisión manual',

        // Project 2
        'project2-title': 'Pipeline ETL SharePoint-to-Power BI',
        'project2-desc': 'Pipeline de datos incremental end-to-end con autenticación OAuth 2.0, logrando 80% reducción en tiempo de procesamiento. Diseñado para scheduling diario confiable y recuperación de errores.',
        'project2-status': 'Producción (2024)',
        'project2-value1': '80%',
        'project2-impact1': 'Reducción procesamiento',
        'project2-value2': '350+',
        'project2-impact2': 'Flujos concurrentes',

        // Project 3
        'project3-title': 'Herramienta Inteligente de Normalización de Datos',
        'project3-desc': 'Aplicación desktop PyQt6 con algoritmo de fuzzy matching (85% precisión) para normalización automatizada de datos. Reduce entrada manual de datos en 4 horas por semana.',
        'project3-status': 'Producción (2024)',
        'project3-value1': '4h',
        'project3-impact1': 'Horas ahorradas/sem',
        'project3-value2': '85%',
        'project3-impact2': 'Precisión automatización',

        // Project 4
        'project4-title': 'Proyecto de Medallion Architecture en Databricks',
        'project4-desc': 'Pipeline ETL end-to-end con arquitectura medallion (Bronze→Silver→Gold) procesando +100K transacciones. Implementa PySpark, Delta Lake y Great Expectations para calidad de datos, con dashboard Streamlit interactivo.',
        'project4-status': 'Académico (2024)',
        'project4-value1': '100K+',
        'project4-impact1': 'Transacciones procesadas',
        'project4-value2': '3 capas',
        'project4-impact2': 'Arquitectura Medallion',

        // Project Actions
        'project-view-code': 'Ver Código',
        'project-confidential': 'Proyecto Empresarial',

        // Skills Section
        'skills-title': 'Skills',
        'skills-cat1': 'Languages',
        'skills-cat2': 'Data Engineering',
        'skills-cat3': 'Architecture',
        'skills-cat4': 'Cloud & Tools',

        // Contact Section
        'contact-title': 'Contacto',
        'contact-heading': '¿Hablamos de tu próximo proyecto de datos?',
        'contact-available-text': 'Consultoría Data Engineering • Automatización • Arquitectura ETL • Optimización',
        'contact-cv': 'Descargar CV',

        // Contact Form
        'form-name': 'Nombre',
        'form-email': 'Email',
        'form-message': 'Mensaje',
        'form-submit': 'Enviar',
        'form-success': '¡Mensaje enviado exitosamente! Te contactaré pronto.',
        'form-error': 'Error al enviar mensaje. Por favor intenta de nuevo o contáctame directamente.',

        // Footer
        'footer-rights': 'Todos los derechos reservados'
    },

    en: {
        // Navigation
        'nav-about': 'About',
        'nav-projects': 'Projects',
        'nav-skills': 'Skills',
        'nav-contact': 'Contact',

        // Hero Section
        'hero-title': 'Data Engineer',
        'hero-tagline': 'Transforming 6-hour processes into 45 minutes through intelligent automation and scalable architecture',
        'hero-stat1': 'Latency reduction',
        'hero-stat2': 'Records processed',
        'hero-stat3': 'Years experience',
        'hero-cta': 'View Projects',
        'hero-github': 'GitHub',
        'hero-downloadCV': 'Download CV',
        'hero-slogan': 'Precision in Process, Power in Performance',

        // About Section
        'about-title': 'About Me',
        'about-p1': 'Data Engineer with experience building production ETL pipelines and data systems. Specialized in large-scale processing optimization: reduced enterprise audit system from 6 hours to 45 minutes (92% improvement) processing 500K+ records.',
        'about-p2': 'My background combines data analysis, API integration, and scalable architecture design. At WWT Costa Rica, I develop production Python applications, data quality frameworks, and automated pipelines handling 350+ concurrent data flows.',
        'about-p3': 'Currently pursuing Software Development degree at Universidad Cenfotec (60% completed), applying continuous learning to master Apache Spark, DDD patterns, and cloud architecture.',
        'about-card1': 'Performance',
        'about-card2': 'Scale',
        'about-card3': 'Quality',

        // Projects Section
        'projects-title': 'Projects',
        'projects-subtitle': 'Data solutions that transform businesses',

        // Project 1
        'project1-title': 'Enterprise Audit System',
        'project1-desc': 'Automated compliance audit processing 500K+ records with 92% latency reduction (6 hours → 45 minutes). Built data quality validation framework with automated anomaly detection.',
        'project1-status': 'Production (2024)',
        'project1-value1': '92%',
        'project1-impact1': 'Time reduction',
        'project1-value2': '95%',
        'project1-impact2': 'Manual review reduction',

        // Project 2
        'project2-title': 'SharePoint-to-Power BI ETL Pipeline',
        'project2-desc': 'End-to-end incremental data pipeline with OAuth 2.0 authentication, achieving 80% processing time reduction. Designed for reliable daily scheduling and error recovery.',
        'project2-status': 'Production (2024)',
        'project2-value1': '80%',
        'project2-impact1': 'Processing reduction',
        'project2-value2': '350+',
        'project2-impact2': 'Concurrent flows',

        // Project 3
        'project3-title': 'Intelligent Data Truncation Tool',
        'project3-desc': 'PyQt6 desktop application with fuzzy matching algorithm (85% accuracy) for automated data normalization. Reduced manual data entry by 4 hours per week.',
        'project3-status': 'Production (2024)',
        'project3-value1': '4h',
        'project3-impact1': 'Hours/week saved',
        'project3-value2': '85%',
        'project3-impact2': 'Automation accuracy',

        // Project 4
        'project4-title': 'Databricks Medallion Architecture Project',
        'project4-desc': 'End-to-end ETL pipeline with medallion architecture (Bronze→Silver→Gold) processing 100K+ transactions. Implements PySpark, Delta Lake, and Great Expectations for data quality, with interactive Streamlit dashboard.',
        'project4-status': 'Academic (2024)',
        'project4-value1': '100K+',
        'project4-impact1': 'Transactions processed',
        'project4-value2': '3 layers',
        'project4-impact2': 'Medallion Architecture',

        // Project Actions
        'project-view-code': 'View Code',
        'project-confidential': 'Enterprise Project',

        // Skills Section
        'skills-title': 'Skills',
        'skills-cat1': 'Languages',
        'skills-cat2': 'Data Engineering',
        'skills-cat3': 'Architecture',
        'skills-cat4': 'Cloud & Tools',

        // Contact Section
        'contact-title': 'Contact',
        'contact-heading': "Let's talk about your next data project?",
        'contact-available-text': 'Data Engineering Consulting • Automation • ETL Architecture • Optimization',
        'contact-cv': 'Download CV',

        // Contact Form
        'form-name': 'Name',
        'form-email': 'Email',
        'form-message': 'Message',
        'form-submit': 'Send',
        'form-success': 'Message sent successfully! I will contact you soon.',
        'form-error': 'Error sending message. Please try again or contact me directly.',

        // Footer
        'footer-rights': 'All rights reserved'
    }
};

/**
 * Switch between Spanish and English languages
 * Updates all elements with data-translate attribute
 */
function switchLanguage() {
    // Toggle language
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';

    // Update all translatable elements
    updateContent();

    // Update language button display
    updateLanguageButton();

    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);

    // Add smooth transition effect
    document.body.style.opacity = '0.95';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

/**
 * Update all content on the page based on current language
 */
function updateContent() {
    // Get all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[currentLanguage][key];

        if (translation) {
            // Check if element is an input/textarea (placeholder) or regular text content
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

/**
 * Update the language switcher button display
 */
function updateLanguageButton() {
    const currentLangSpan = document.getElementById('currentLang');
    const otherLangSpan = document.getElementById('otherLang');

    if (currentLanguage === 'es') {
        currentLangSpan.textContent = 'ES';
        otherLangSpan.textContent = 'EN';
    } else {
        currentLangSpan.textContent = 'EN';
        otherLangSpan.textContent = 'ES';
    }
}

/**
 * Initialize language on page load
 */
function initLanguage() {
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
    } else {
        // Default to Spanish
        currentLanguage = 'es';
    }

    // Update content and button on initial load
    updateContent();
    updateLanguageButton();
}

// Initialize language when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initLanguage);

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        getCurrentLanguage: () => currentLanguage,
        translations
    };
}
