/**
 * MySock - Shared Navigation & Page Utilities
 * Used by all inner pages
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Custom Cursor
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.querySelectorAll('a, button, .magnetic, input, textarea, .tilt-card, .faq-question').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // ============================================
    // Page Loader
    // ============================================
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('loading');
            }, 800);
        });
    }

    // ============================================
    // Navbar Scroll
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ============================================
    // Mobile Menu
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navLinks.style.display = '';
            } else {
                navLinks.classList.add('open');
                navLinks.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: rgba(3, 0, 20, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 2rem;
                    gap: 1.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                `;
            }
        });

        // Close menu when nav link is clicked on mobile
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navLinks.style.display = '';
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ============================================
    // Active Nav Link Highlighting
    // ============================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPath || href.endsWith(currentPath))) {
            link.classList.add('active-link');
            link.style.color = 'var(--text-primary)';
        }
    });

    // ============================================
    // Magnetic Buttons
    // ============================================
    document.querySelectorAll('.magnetic').forEach(el => {
        const strength = el.dataset.strength || 20;
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x / strength * 2}px, ${y / strength * 2}px) scale(1.05)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // ============================================
    // Ripple Effect on Buttons
    // ============================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.35);
                border-radius: 50%;
                transform: scale(0);
                animation: navRipple 0.6s ease-out forwards;
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                width: 200px; height: 200px;
                margin-left: -100px; margin-top: -100px;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `@keyframes navRipple { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(rippleStyle);

    // ============================================
    // Scroll Reveal
    // ============================================
    const revealEls = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-fade, .reveal-slide, .service-card, .feature-item, .testimonial-card, .stat-card, .step-card, .glass-card, .process-step, .faq-item');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, i * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.97)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
        revealObs.observe(el);
    });

    // ============================================
    // Tilt Cards
    // ============================================
    document.querySelectorAll('.tilt-card').forEach(card => {
        const maxTilt = card.dataset.tiltMax || 12;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2, cy = rect.height / 2;
            const tiltX = (y - cy) / cy * maxTilt;
            const tiltY = (cx - x) / cx * maxTilt;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03,1.03,1.03)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    });

    // ============================================
    // Card Glow
    // ============================================
    document.querySelectorAll('.service-card').forEach(card => {
        const glow = card.querySelector('.card-glow');
        if (!glow) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            glow.style.background = `radial-gradient(circle 200px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(124,58,237,0.4), rgba(236,72,153,0.2) 50%, transparent 70%)`;
            glow.style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    });

    // ============================================
    // FAQ Accordion
    // ============================================
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        // Initialize closed
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease';
        answer.style.opacity = '0';

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                const a = i.querySelector('.faq-answer');
                if (a) { a.style.maxHeight = '0'; a.style.opacity = '0'; }
                const icon = i.querySelector('.faq-question i');
                if (icon) { icon.className = 'ph ph-plus'; }
            });

            // Toggle open
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + 'px';
                answer.style.opacity = '1';
                const icon = question.querySelector('i');
                if (icon) icon.className = 'ph ph-minus';
            }
        });
    });

    // ============================================
    // Smooth Scroll for anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // "Scroll to explore" smooth scroll
    // ============================================
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.addEventListener('click', () => {
            const trustBar = document.querySelector('.trust-bar') || document.querySelector('.stats-section');
            if (trustBar) trustBar.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ============================================
    // Particle Background
    // ============================================
    if (document.querySelector('.hero')) {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
        document.body.insertBefore(canvas, document.body.firstChild);
        const ctx = canvas.getContext('2d');
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            sx: (Math.random() - 0.5) * 0.4,
            sy: (Math.random() - 0.5) * 0.4,
            hue: Math.random() * 60 + 250,
            opacity: Math.random() * 0.4 + 0.1
        }));

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.sx; p.y += p.sy;
                if (p.x < 0 || p.x > canvas.width) p.sx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.sy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue},70%,60%,${p.opacity})`;
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    console.log('🧦 MySock Navigation Ready');
});
