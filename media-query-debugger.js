/**
 * 🔍 MEDIA QUERY DEBUGGER
 * Script para diagnosticar problemas con media queries en tu portafolio
 *
 * CÓMO USAR:
 * 1. Abre index.html en Chrome
 * 2. Presiona F12 para abrir DevTools
 * 3. Ve a la pestaña "Console"
 * 4. Copia y pega TODO este archivo en la consola
 * 5. Presiona Enter
 * 6. Cambia el tamaño de la ventana y observa los mensajes
 */

console.clear();
console.log('%c🔍 MEDIA QUERY DEBUGGER ACTIVADO', 'background: #667eea; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('📊 Cambia el tamaño de la ventana para ver qué media queries se activan\n\n');

// Define los breakpoints de tu CSS
const breakpoints = [
    { name: 'Desktop Large', min: 1024, max: 9999, cssLine: 'Base styles', color: '#10b981' },
    { name: 'Tablet', min: 768, max: 1023, cssLine: 'Line 1555: @media (max-width: 1023px)', color: '#3b82f6' },
    { name: 'Mobile ⚠️ (767px)', min: 481, max: 767, cssLine: 'Line 1566: @media (max-width: 767px)', color: '#10b981' },
    { name: 'Mobile Conflict ⚠️ (768px)', min: 0, max: 768, cssLine: 'Line 1642: @media (max-width: 768px)', color: '#ef4444' },
    { name: 'Extra Small Mobile', min: 0, max: 480, cssLine: 'Line 1621: @media (max-width: 480px)', color: '#8b5cf6' }
];

// Elementos críticos a monitorear
const criticalElements = [
    { selector: '.hero-section', name: 'Hero Section' },
    { selector: '.hero-stats', name: 'Hero Stats' },
    { selector: '.project-image-wrapper', name: 'Project Images (CONFLICTO AQUÍ)' },
    { selector: '.skill-card', name: 'Skill Cards' },
    { selector: '.contact-form-wrapper', name: 'Contact Form' },
    { selector: '.navbar', name: 'Navigation Bar' },
    { selector: '.stat-item', name: 'Stat Items' }
];

function getCurrentBreakpoint() {
    const width = window.innerWidth;
    return breakpoints.filter(bp => width >= bp.min && width <= bp.max);
}

function analyzeElement(selector, name) {
    const element = document.querySelector(selector);
    if (!element) {
        return { exists: false };
    }

    const styles = window.getComputedStyle(element);
    return {
        exists: true,
        display: styles.display,
        width: element.offsetWidth,
        height: element.offsetHeight,
        visibility: styles.visibility,
        overflow: styles.overflow
    };
}

function printReport() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const activeBreakpoints = getCurrentBreakpoint();

    console.clear();
    console.log('%c═══════════════════════════════════════════════════', 'color: #667eea; font-weight: bold;');
    console.log('%c📏 VIEWPORT ACTUAL', 'background: #667eea; color: white; font-size: 16px; padding: 5px; border-radius: 3px;');
    console.log(`   Ancho: ${width}px`);
    console.log(`   Alto: ${height}px`);
    console.log('%c═══════════════════════════════════════════════════\n', 'color: #667eea; font-weight: bold;');

    // Active breakpoints
    console.log('%c🎯 MEDIA QUERIES ACTIVOS:', 'background: #10b981; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');

    if (activeBreakpoints.length === 0) {
        console.log('   ✅ Ninguno (estilos base)');
    } else {
        activeBreakpoints.forEach((bp, index) => {
            const icon = bp.name.includes('⚠️') ? '⚠️' : '✅';
            console.log(`   ${icon} %c${bp.name}`, `color: ${bp.color}; font-weight: bold;`);
            console.log(`      📄 ${bp.cssLine}`);
        });
    }

    // Conflict detection
    if (width <= 768 && width >= 767) {
        console.log('\n%c⚠️⚠️⚠️ ZONA DE CONFLICTO DETECTADA ⚠️⚠️⚠️', 'background: #ef4444; color: white; font-size: 14px; padding: 8px; border-radius: 3px;');
        console.log('%cEstás en 767px-768px donde AMBOS media queries pueden estar activos!', 'color: #ef4444; font-weight: bold;');
        console.log('Esto causa que los estilos se sobrescriban mutuamente.\n');
    }

    // Element analysis
    console.log('\n%c🔍 ANÁLISIS DE ELEMENTOS CRÍTICOS:', 'background: #3b82f6; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');

    criticalElements.forEach(({ selector, name }) => {
        const analysis = analyzeElement(selector, name);

        if (!analysis.exists) {
            console.log(`   ❌ ${name}: No encontrado`);
            return;
        }

        const isHidden = analysis.display === 'none' || analysis.visibility === 'hidden';
        const icon = isHidden ? '👻' : '✅';

        console.log(`   ${icon} ${name}:`);
        console.log(`      Display: ${analysis.display}`);
        console.log(`      Tamaño: ${analysis.width}x${analysis.height}px`);

        // Warnings
        if (analysis.width === 0 && analysis.display !== 'none') {
            console.log(`      %c⚠️ Ancho cero - posible problema!`, 'color: #f59e0b; font-weight: bold;');
        }
        if (analysis.overflow !== 'visible' && analysis.overflow !== 'hidden') {
            console.log(`      ℹ️ Overflow: ${analysis.overflow}`);
        }
    });

    // Project image specific check
    const projectImg = document.querySelector('.project-image-wrapper');
    if (projectImg) {
        const height = window.getComputedStyle(projectImg).height;
        console.log('\n%c🎨 ANÁLISIS ESPECÍFICO: Project Image Wrapper', 'background: #8b5cf6; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');
        console.log(`   Altura actual: ${height}`);

        if (width <= 768 && width > 767) {
            console.log(`   %c⚠️ A 768px debería ser 350px (línea 1644)`, 'color: #ef4444; font-weight: bold;');
        }
        if (width <= 767) {
            console.log(`   %cℹ️ A ≤767px no hay regla específica en el conflicto`, 'color: #3b82f6;');
        }
    }

    // Recommendations
    console.log('\n%c💡 RECOMENDACIONES:', 'background: #10b981; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');

    if (width > 768) {
        console.log('   ✅ Tamaño OK - No hay conflictos activos');
    } else if (width === 768 || width === 767) {
        console.log('   ⚠️ Estás en la zona de conflicto!');
        console.log('   Prueba cambiar entre 766px, 767px, 768px, 769px');
        console.log('   Observa qué elementos cambian de tamaño/posición');
    } else if (width < 767) {
        console.log('   ✅ Mobile - Todos los media queries deberían estar activos');
        console.log('   Verifica que los elementos se apilen correctamente');
    }

    console.log('\n%c═══════════════════════════════════════════════════', 'color: #667eea; font-weight: bold;');
    console.log('%cℹ️ Cambia el tamaño de la ventana para ver cambios en tiempo real', 'color: #666; font-style: italic;');
    console.log('%c═══════════════════════════════════════════════════\n\n', 'color: #667eea; font-weight: bold;');
}

// Check media queries support
function checkMediaQuerySupport() {
    const mediaQueries = [
        window.matchMedia('(max-width: 1023px)'),
        window.matchMedia('(max-width: 768px)'),
        window.matchMedia('(max-width: 767px)'),
        window.matchMedia('(max-width: 480px)')
    ];

    console.log('%c🔬 TEST DE MEDIA QUERIES:', 'background: #f59e0b; color: white; font-size: 14px; padding: 5px; border-radius: 3px;');
    console.log('   @media (max-width: 1023px):', mediaQueries[0].matches ? '✅ ACTIVO' : '❌ INACTIVO');
    console.log('   @media (max-width: 768px):', mediaQueries[1].matches ? '✅ ACTIVO' : '❌ INACTIVO');
    console.log('   @media (max-width: 767px):', mediaQueries[2].matches ? '✅ ACTIVO' : '❌ INACTIVO');
    console.log('   @media (max-width: 480px):', mediaQueries[3].matches ? '✅ ACTIVO' : '❌ INACTIVO');

    // Detect conflict
    if (mediaQueries[1].matches && mediaQueries[2].matches) {
        console.log('\n   %c⚠️⚠️ AMBOS 768px Y 767px ESTÁN ACTIVOS - CONFLICTO CONFIRMADO', 'background: #ef4444; color: white; font-weight: bold; padding: 5px;');
    }
    console.log('');
}

// Run initial report
printReport();
checkMediaQuerySupport();

// Monitor resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        printReport();
        checkMediaQuerySupport();
    }, 500);
});

console.log('%c✅ Debugger instalado correctamente!', 'background: #10b981; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%cAhora cambia el tamaño de la ventana y observa los reportes automáticos\n\n', 'color: #666; font-style: italic;');

// Export functions for manual use
window.mqDebug = {
    report: printReport,
    check: checkMediaQuerySupport,
    analyze: (selector) => {
        const result = analyzeElement(selector, selector);
        console.log(result);
        return result;
    }
};

console.log('%cℹ️ También puedes usar estas funciones manualmente:', 'color: #3b82f6; font-weight: bold;');
console.log('   mqDebug.report()  - Mostrar reporte completo');
console.log('   mqDebug.check()   - Revisar media queries activos');
console.log('   mqDebug.analyze(".tu-selector")  - Analizar elemento específico\n\n');
