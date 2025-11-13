/**
 * 🔍 MEDIA QUERY DEBUGGER LITE
 * Versión optimizada - no satura la consola
 *
 * CÓMO USAR:
 * 1. Abre index.html en Chrome
 * 2. Presiona F12 → pestaña "Console"
 * 3. Copia y pega este script completo
 * 4. Presiona Enter
 * 5. Cambia el tamaño de la ventana (espera 1 segundo entre cambios)
 */

console.clear();
console.log('%c🔍 MEDIA QUERY DEBUGGER LITE', 'background: #667eea; color: white; font-size: 18px; padding: 10px; border-radius: 5px;');
console.log('%cVersión ligera - actualiza cada 1 segundo\n', 'color: #666; font-style: italic;');

// Breakpoints
const breakpoints = {
    desktop: window.matchMedia('(min-width: 1024px)'),
    tablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
    mobile: window.matchMedia('(max-width: 767px)'),
    mobileSmall: window.matchMedia('(max-width: 480px)'),
    // Conflict zone
    conflict768: window.matchMedia('(max-width: 768px)'),
    conflict767: window.matchMedia('(max-width: 767px)')
};

// Display element (visual indicator)
let indicator = document.getElementById('mq-debugger-indicator');
if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'mq-debugger-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 14px;
        z-index: 99999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        min-width: 250px;
    `;
    document.body.appendChild(indicator);
}

function getActiveBreakpoint() {
    const width = window.innerWidth;

    if (width >= 1024) return { name: 'Desktop', color: '#10b981' };
    if (width >= 768 && width <= 1023) return { name: 'Tablet', color: '#3b82f6' };
    if (width <= 480) return { name: 'Mobile Small', color: '#8b5cf6' };
    if (width <= 767) return { name: 'Mobile', color: '#10b981' };

    return { name: 'Unknown', color: '#666' };
}

function checkConflict() {
    const width = window.innerWidth;
    // Conflict zone: 767px and 768px
    if (width === 767 || width === 768) {
        return {
            hasConflict: true,
            both768: breakpoints.conflict768.matches,
            both767: breakpoints.conflict767.matches
        };
    }
    return { hasConflict: false };
}

function updateIndicator() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const bp = getActiveBreakpoint();
    const conflict = checkConflict();

    let html = `
        <div style="margin-bottom: 8px;">
            <strong style="color: #10b981;">📏 Viewport</strong><br>
            ${width}px × ${height}px
        </div>
        <div style="margin-bottom: 8px;">
            <strong style="color: ${bp.color};">🎯 Breakpoint</strong><br>
            ${bp.name}
        </div>
    `;

    if (conflict.hasConflict) {
        html += `
            <div style="background: #ef4444; padding: 8px; margin-top: 8px; border-radius: 4px;">
                <strong>⚠️ CONFLICTO DETECTADO</strong><br>
                <small>Zona: 767-768px</small>
            </div>
        `;
    }

    html += `
        <div style="margin-top: 8px; font-size: 11px; opacity: 0.7;">
            <em>Cambia tamaño para actualizar</em>
        </div>
    `;

    indicator.innerHTML = html;
}

function logReport() {
    const width = window.innerWidth;
    const bp = getActiveBreakpoint();
    const conflict = checkConflict();

    console.log(`\n%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'color: #667eea;');
    console.log(`%c📏 ${width}px × ${window.innerHeight}px`, 'font-weight: bold; font-size: 14px;');
    console.log(`%c🎯 ${bp.name}`, `color: ${bp.color}; font-weight: bold;`);

    // Media queries activos
    console.log('\n%cMedia Queries Activos:', 'color: #3b82f6; font-weight: bold;');
    console.log(`  (max-width: 1023px): ${breakpoints.tablet.matches || breakpoints.mobile.matches ? '✅' : '❌'}`);
    console.log(`  (max-width: 768px):  ${breakpoints.conflict768.matches ? '✅' : '❌'}`);
    console.log(`  (max-width: 767px):  ${breakpoints.conflict767.matches ? '✅' : '❌'}`);
    console.log(`  (max-width: 480px):  ${breakpoints.mobileSmall.matches ? '✅' : '❌'}`);

    if (conflict.hasConflict) {
        console.log(`\n%c⚠️ CONFLICTO: Ambos 768px y 767px pueden estar activos`, 'background: #ef4444; color: white; padding: 4px; border-radius: 3px;');
    }

    console.log(`%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`, 'color: #667eea;');
}

// Initial update
updateIndicator();
logReport();

// Debounced resize handler (1 segundo)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    updateIndicator(); // Update visual immediately

    resizeTimeout = setTimeout(() => {
        logReport(); // Log to console after 1 second
    }, 1000);
});

// Export utilities
window.mqDebug = {
    show: () => {
        indicator.style.display = 'block';
        console.log('✅ Indicador visual activado');
    },
    hide: () => {
        indicator.style.display = 'none';
        console.log('❌ Indicador visual desactivado');
    },
    report: () => {
        logReport();
    },
    check: (width) => {
        const originalWidth = window.innerWidth;
        console.log(`\n%cSimulando viewport de ${width}px:`, 'font-weight: bold; color: #667eea;');
        console.log(`Actual: ${originalWidth}px`);
        console.log('Usa DevTools Responsive Mode para cambiar el tamaño real');
    }
};

console.log('\n%c✅ Debugger instalado correctamente!', 'background: #10b981; color: white; padding: 8px; border-radius: 4px;');
console.log('\n%cComandos disponibles:', 'font-weight: bold; color: #667eea;');
console.log('  mqDebug.show()   - Mostrar indicador visual');
console.log('  mqDebug.hide()   - Ocultar indicador visual');
console.log('  mqDebug.report() - Generar reporte manual');
console.log('\n%cEl indicador visual aparece arriba a la izquierda ↖️', 'color: #666; font-style: italic;');
console.log('%cLos logs aparecen solo 1 vez por segundo (no satura la consola)', 'color: #10b981; font-style: italic;');
