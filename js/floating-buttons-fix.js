/**
 * SOLUCION DEFINITIVA: Botones Flotantes
 * Este script reemplaza los botones HTML existentes con botones creados dinámicamente
 * que garantizan tener tamaño visible
 */

(function() {
    'use strict';

    function createFloatingButtons() {
        console.log('[Floating Buttons] Iniciando creación de botones...');

        // Eliminar botones existentes si existen
        const oldButtons = document.querySelectorAll('.btn-whatsapp, .btn-scroll-top, #scrollTopBtn');
        oldButtons.forEach(btn => {
            console.log('[Floating Buttons] Eliminando botón viejo:', btn.className);
            btn.remove();
        });

        // Crear estilos inline garantizados
        const baseStyles = `
            position: fixed;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            z-index: 9999;
            text-decoration: none;
            font-family: "Font Awesome 6 Brands", "Font Awesome 6 Free";
            font-weight: 900;
        `;

        const desktopSize = `
            width: 60px;
            height: 60px;
            font-size: 24px;
            right: 2rem;
        `;

        const mobileSize = `
            width: 50px;
            height: 50px;
            font-size: 20px;
            right: 1rem;
        `;

        const isMobile = window.innerWidth < 768;
        const sizeStyles = isMobile ? mobileSize : desktopSize;

        // ===== BOTON WHATSAPP =====
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = 'https://wa.me/50684756191';
        whatsappBtn.target = '_blank';
        whatsappBtn.rel = 'noopener noreferrer';
        whatsappBtn.setAttribute('aria-label', 'WhatsApp');
        whatsappBtn.className = 'btn-floating-dynamic btn-whatsapp-dynamic';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
        whatsappBtn.style.cssText = baseStyles + sizeStyles + `
            bottom: ${isMobile ? '1rem' : '2rem'};
            background: #25D366;
        `;

        // ===== BOTON SCROLL TO TOP =====
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollTopBtnDynamic';
        scrollBtn.setAttribute('aria-label', 'Volver arriba');
        scrollBtn.className = 'btn-floating-dynamic btn-scroll-dynamic';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        scrollBtn.style.cssText = baseStyles + sizeStyles + `
            bottom: ${isMobile ? '5rem' : '6rem'};
            background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        `;

        // Agregar al DOM
        document.body.appendChild(whatsappBtn);
        document.body.appendChild(scrollBtn);

        console.log('[Floating Buttons] Botones creados exitosamente');
        console.log('[Floating Buttons] WhatsApp:', whatsappBtn.getBoundingClientRect());
        console.log('[Floating Buttons] Scroll:', scrollBtn.getBoundingClientRect());

        // ===== FUNCIONALIDAD SCROLL TO TOP =====
        let scrollTimeout;

        function updateScrollButton() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > 150) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
                scrollBtn.style.pointerEvents = 'auto';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
                scrollBtn.style.pointerEvents = 'none';
            }
        }

        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateScrollButton, 10);
        }, {passive: true});

        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ===== HOVER EFFECTS =====
        [whatsappBtn, scrollBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            });
        });

        // ===== RESPONSIVE =====
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                const nowMobile = window.innerWidth < 768;
                const newSize = nowMobile ? '50px' : '60px';
                const newFontSize = nowMobile ? '20px' : '24px';
                const newRight = nowMobile ? '1rem' : '2rem';
                const newWhatsappBottom = nowMobile ? '1rem' : '2rem';
                const newScrollBottom = nowMobile ? '5rem' : '6rem';

                [whatsappBtn, scrollBtn].forEach(btn => {
                    btn.style.width = newSize;
                    btn.style.height = newSize;
                    btn.style.fontSize = newFontSize;
                    btn.style.right = newRight;
                });

                whatsappBtn.style.bottom = newWhatsappBottom;
                scrollBtn.style.bottom = newScrollBottom;
            }, 250);
        });

        console.log('[Floating Buttons] Setup completo ✓');
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createFloatingButtons);
    } else {
        createFloatingButtons();
    }
})();
