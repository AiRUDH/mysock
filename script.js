/**
 * MySock - Mind-Blowing Interactive Experience
 * Advanced JavaScript with Dashing Animations + Telegram Integration
 */

// ============================================
// TELEGRAM BOT CONFIGURATION
// To set up: 
// 1. Message @BotFather on Telegram, create a new bot
// 2. Copy your bot token below
// 3. Message your new bot first (important!)
// 4. Get your chat_id from https://api.telegram.org/bot<TOKEN>/getUpdates
// ============================================
const TELEGRAM_CONFIG = {
    BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE', // Replace with your bot token from @BotFather
    CHAT_ID: 'YOUR_CHAT_ID_HERE'      // Replace with your chat ID
};

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Particle Background System
    // ============================================
    function createParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.hue = Math.random() * 60 + 250; // Purple to pink range
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        // Connect nearby particles
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            connectParticles();
            requestAnimationFrame(animate);
        }

        animate();
    }

    createParticles();

    // ============================================
    // Enhanced Page Loader with Glitch Effect
    // ============================================
    const loader = document.querySelector('.page-loader');
    const loaderLogo = document.querySelector('.loader-logo');

    // Glitch effect on loader
    if (loaderLogo) {
        setInterval(() => {
            loaderLogo.style.textShadow = `
                ${Math.random() * 10 - 5}px 0 #ff00ff,
                ${Math.random() * 10 - 5}px 0 #00ffff
            `;
            setTimeout(() => {
                loaderLogo.style.textShadow = 'none';
            }, 50);
        }, 200);
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');

            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 2000);
    });

    // ============================================
    // Entrance Animations
    // ============================================
    function triggerEntranceAnimations() {
        // Staggered reveal for hero elements
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title .word, .hero-subtitle, .hero-cta');
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 150);
        });
    }

    // ============================================
    // Custom Cursor with Trail Effect
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let trail = [];
    const trailLength = 8;

    // Create cursor trail
    for (let i = 0; i < trailLength; i++) {
        const trailDot = document.createElement('div');
        trailDot.className = 'cursor-trail';
        trailDot.style.cssText = `
            position: fixed;
            width: ${6 - i * 0.5}px;
            height: ${6 - i * 0.5}px;
            background: rgba(124, 58, 237, ${0.5 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s;
        `;
        document.body.appendChild(trailDot);
        trail.push({ element: trailDot, x: 0, y: 0 });
    }

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

        // Animate trail
        trail.forEach((dot, i) => {
            const targetX = i === 0 ? mouseX : trail[i - 1].x;
            const targetY = i === 0 ? mouseY : trail[i - 1].y;

            dot.x += (targetX - dot.x) * (0.3 - i * 0.02);
            dot.y += (targetY - dot.y) * (0.3 - i * 0.02);

            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
        });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .tilt-card, .faq-question, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.classList.add('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // ============================================
    // Ripple Effect for Buttons
    // ============================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out forwards;
                left: ${x}px;
                top: ${y}px;
                width: 200px;
                height: 200px;
                margin-left: -100px;
                margin-top: -100px;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframe
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes textGlitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-1px, -1px); }
            80% { transform: translate(1px, 1px); }
        }
        
        @keyframes borderGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
            50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.6), 0 0 60px rgba(236, 72, 153, 0.4); }
        }
        
        .glitch-hover:hover {
            animation: textGlitch 0.3s ease;
        }
        
        .glow-border {
            animation: borderGlow 2s ease-in-out infinite;
        }
        
        @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes rotateIn {
            from { transform: rotate(-180deg) scale(0); opacity: 0; }
            to { transform: rotate(0) scale(1); opacity: 1; }
        }
        
        @keyframes slideInLeft {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            70% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ============================================
    // Text Scramble Effect
    // ============================================
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0; i < this.queue.length; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span style="color: #ec4899">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }

    // Apply scramble effect to section tags on hover
    document.querySelectorAll('.section-tag').forEach(tag => {
        const originalText = tag.textContent;
        const scrambler = new TextScramble(tag);

        tag.addEventListener('mouseenter', () => {
            scrambler.setText(originalText);
        });
    });

    // ============================================
    // Magnetic Elements (Enhanced)
    // ============================================
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
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
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // Smooth Scroll
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Enhanced Tilt Card Effect with Glow
    // ============================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const maxTilt = card.dataset.tiltMax || 15;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = (y - centerY) / centerY * maxTilt;
            const tiltY = (centerX - x) / centerX * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.boxShadow = `
                ${-tiltY * 2}px ${tiltX * 2}px 30px rgba(124, 58, 237, 0.3),
                0 0 50px rgba(124, 58, 237, 0.1)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
        });
    });

    // ============================================
    // Stats Counter with Flip Animation
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2500;
            const startTime = performance.now();

            function easeOutExpo(t) {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            }

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutExpo(progress);

                const current = Math.floor(easedProgress * target);
                stat.textContent = current;
                stat.style.transform = `scale(${1 + (1 - progress) * 0.2})`;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                    stat.style.transform = 'scale(1)';
                }
            }

            requestAnimationFrame(updateCounter);
        });

        statsAnimated = true;
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // ============================================
    // FAQ Accordion with Animation
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all with animation
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = '0';
            });

            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ============================================
    // Scroll Reveal Animations (Enhanced)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up, .reveal-fade, .reveal-slide, .reveal-split, .section-header, .service-card, .feature-item, .testimonial-card, .stat-card, .step-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 80;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // ============================================
    // Parallax Effect for Floating Elements
    // ============================================
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        floatingElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.05;
            const moveX = (x - 0.5) * 150 * speed;
            const moveY = (y - 0.5) * 150 * speed;
            const rotate = (x - 0.5) * 20 * speed;

            el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
        });
    });

    // ============================================
    // Parallax Cards (Testimonials)
    // ============================================
    const parallaxCards = document.querySelectorAll('.parallax-card');

    window.addEventListener('scroll', () => {
        parallaxCards.forEach(card => {
            const speed = parseFloat(card.dataset.speed) || 0.02;
            const rect = card.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * speed;
                card.style.transform = `translateY(${offset}px) rotate(${offset * 0.02}deg)`;
            }
        });
    });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');

            if (navLinks.style.display === 'flex') {
                navLinks.style.display = '';
            } else {
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
                    animation: slideInLeft 0.3s ease;
                `;
            }
        });
    }

    // ============================================
    // Form Submission with Telegram Integration
    // ============================================
    window.handleSubmit = async function (e) {
        e.preventDefault();

        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        // Get form data
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const company = form.querySelector('#company')?.value || 'Not provided';
        const message = form.querySelector('#message').value;

        // Show loading state with animation
        button.innerHTML = '<span class="loading-dots">Sending<span>.</span><span>.</span><span>.</span></span>';
        button.disabled = true;
        button.style.opacity = '0.7';

        // Format message for Telegram
        const telegramMessage = `
🔔 *New MySock Lead!*

👤 *Name:* ${name}
📧 *Email:* ${email}
🏢 *Company:* ${company}

💬 *Message:*
${message}

📅 *Submitted:* ${new Date().toLocaleString()}
        `;

        try {
            // Send to Telegram
            if (TELEGRAM_CONFIG.BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CONFIG.CHAT_ID,
                        text: telegramMessage,
                        parse_mode: 'Markdown'
                    })
                });

                if (!response.ok) throw new Error('Telegram API error');
            }

            // Success animation
            button.innerHTML = '<span>✓ Message Sent!</span>';
            button.style.background = 'linear-gradient(135deg, #10b981, #14b8a6)';
            button.style.opacity = '1';
            button.style.transform = 'scale(1.05)';

            // Confetti effect
            createConfetti();

            form.reset();

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.style.transform = '';
                button.disabled = false;
            }, 4000);

        } catch (error) {
            console.error('Submission error:', error);

            button.innerHTML = '<span>⚠️ Error - Try Again</span>';
            button.style.background = 'linear-gradient(135deg, #ef4444, #f97316)';
            button.style.opacity = '1';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }
    };

    // ============================================
    // Confetti Celebration Effect
    // ============================================
    function createConfetti() {
        const colors = ['#7c3aed', '#ec4899', '#06b6d4', '#10b981', '#fbbf24'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 10000;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        .loading-dots span {
            animation: loadingDot 1.4s infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes loadingDot {
            0%, 80%, 100% { opacity: 0; }
            40% { opacity: 1; }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ============================================
    // Card Glow Effect (Enhanced)
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const glow = card.querySelector('.card-glow');

        if (glow) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                glow.style.background = `
                    radial-gradient(circle 200px at ${x}px ${y}px, 
                        rgba(124, 58, 237, 0.4), 
                        rgba(236, 72, 153, 0.2) 50%,
                        transparent 70%)
                `;
                glow.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                glow.style.opacity = '0';
            });
        }
    });

    // ============================================
    // Typing Effect for Hero Subtitle
    // ============================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20);
            }
        }

        // Start typing after loader
        setTimeout(typeWriter, 2500);
    }

    console.log('🧦 MySock - Mind-Blowing Design v2.0 Loaded!');
    console.log('📱 Telegram integration ready - configure your bot token above');
});
