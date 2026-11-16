/* Ofek Desk public demo. Forms stay in the browser. */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initFormHandling();
    initNeedsForm();
    initFancyCursor();
    initScrollProgress();
    initWordReveal();
    initSystemDemo();
    initLazyVideos();
    initSolutionsLibrary();
    initImpactNumbers();
    initFAQ();
    initTestimonialsCarousel();
    initAnimatedTitles();
    initBeforeAfter();
    initFloatingCta();
    initCompareSliders();
    initShowcaseReveal();
    initImageLightbox();
    initVideoTeasers();
    initWallEffects();
    initStoryIntro();
    initHeroPuzzle();
});

document.addEventListener('contentLoaded', () => {
    initFAQ();
    initImpactNumbers();
    initProcessCarousel();
    initSystemDemoVideo();
    initNeedsForm();
    initSmartMixer();
    initBaSwitch();
    const heroTitle = document.querySelector('.word-reveal');
    if (heroTitle && !heroTitle.classList.contains('revealed')) {
        setTimeout(() => heroTitle.classList.add('revealed'), 400);
    }
});

document.addEventListener('processCarouselReady', () => {
    initProcessCarousel();
});

// ═══════════════════════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════════════════════

function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (!loader) return;
    
    // Hide loader when page is fully loaded (wait for progress bar to finish)
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM after fade-out
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    const scrollThreshold = 80; // Don't hide until scrolled past hero area
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
        
        // Hide on scroll down, show on scroll up
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll && currentScroll - lastScroll > 5) {
                navbar.classList.add('nav-hidden');
            } else if (lastScroll > currentScroll && lastScroll - currentScroll > 5) {
                navbar.classList.remove('nav-hidden');
            }
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════════════════════

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuBtn || !navMenu) return;
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = menuBtn.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = menuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Hero content slides in - image is static (no animation)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(30px)';
        heroContent.classList.add('slide-in-right');
    }
    // Image is static - no animation applied
    
    // Pain cards - scale in
    document.querySelectorAll('.pain-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => observer.observe(card), index * 50);
    });
    
    // Pain conclusion - epic reveal
    const painConclusion = document.querySelector('.pain-conclusion');
    if (painConclusion) {
        const conclusionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    conclusionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        conclusionObserver.observe(painConclusion);
    }
    
    // Solution section - fade in
    document.querySelectorAll('.solution-content, .solution-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Process steps - drawing animation (legacy layout)
    const processSteps = document.querySelectorAll('.process-step-row');
    if (processSteps.length) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const stepNumber = parseInt(entry.target.dataset.step) || 1;
                    const delayMs = Math.max(0, (stepNumber - 1) * 180);
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, delayMs);
                    processObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        processSteps.forEach(step => {
            processObserver.observe(step);
        });

        // Subtle parallax for process drawings (very light)
        initProcessParallax();
    }
    
    // Other elements - fade in
    const otherElements = document.querySelectorAll(
        '.about-content, .about-image, ' +
        '.testimonial-card, .contact-content, .contact-info, .cta-content, ' +
        '.business-needs-section'
    );
    
    otherElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // About stats - scale in with stagger
    const stats = document.querySelectorAll('.stat');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the stat entrance
                entry.target.classList.add('animate');
                // Also animate the counter number inside
                const numberEl = entry.target.querySelector('.stat-number');
                if (numberEl) animateCounter(numberEl);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS CAROUSEL (How it works)
// ═══════════════════════════════════════════════════════════════════════════

function initProcessCarousel() {
    const carousel = document.querySelector('.process-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (!track || !dotsContainer) return;

    const slides = Array.from(carousel.querySelectorAll('.process-slide'));
    if (slides.length < 1) return;

    if (carousel._processCarousel && carousel._processCarousel.stopAutoPlay) {
        carousel._processCarousel.stopAutoPlay();
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    function setActive(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(${currentIndex * 100}%)`;

        slides.forEach((s, i) => {
            s.classList.toggle('is-active', i === currentIndex);
        });

        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => setActive(i));
        dotsContainer.appendChild(dot);
    }

    let autoPlay = null;
    function startAutoPlay() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        stopAutoPlay();
        autoPlay = setInterval(() => setActive(currentIndex + 1), 4500);
    }
    function stopAutoPlay() {
        if (autoPlay) {
            clearInterval(autoPlay);
            autoPlay = null;
        }
    }

    if (!carousel._processCarousel) {
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        if (prevBtn) prevBtn.addEventListener('click', () => carousel._processCarousel.setActive(carousel._processCarousel.currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => carousel._processCarousel.setActive(carousel._processCarousel.currentIndex + 1));
        carousel.addEventListener('mouseenter', () => carousel._processCarousel.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => carousel._processCarousel.startAutoPlay());
    }

    carousel._processCarousel = {
        currentIndex,
        setActive: (index) => {
            setActive(index);
            carousel._processCarousel.currentIndex = currentIndex;
        },
        startAutoPlay,
        stopAutoPlay
    };

    setActive(0);
    carousel._processCarousel.currentIndex = 0;
    startAutoPlay();
}

function initProcessParallax() {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const containers = Array.from(document.querySelectorAll('.process-step-row .drawing-container'));
    if (containers.length === 0) return;

    containers.forEach(c => {
        c.style.willChange = 'transform';
    });

    let ticking = false;

    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    function update() {
        ticking = false;
        const vh = window.innerHeight || 800;
        const centerY = vh * 0.5;

        containers.forEach((container, idx) => {
            const rect = container.getBoundingClientRect();
            // normalized distance from viewport center
            const dy = (rect.top + rect.height * 0.5) - centerY;
            const n = clamp(dy / centerY, -1, 1);
            const maxShift = 12; // px - keep subtle
            const base = (idx % 2 === 0 ? 1 : -1) * 3; // tiny variation
            const shift = clamp((-n * maxShift) + base, -maxShift, maxShift);

            container.style.transform = `translateY(${shift.toFixed(2)}px) translateZ(0)`;
        });
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    // Initial paint + bind
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', debounce(() => {
        update();
    }, 100));
}

// ═══════════════════════════════════════════════════════════════════════════
// SOLUTIONS LIBRARY (Filters)
// ═══════════════════════════════════════════════════════════════════════════

function initSolutionsLibrary() {
    const controls = document.getElementById('solutionsLibraryControls');
    const grid = document.getElementById('solutionsLibraryGrid');
    if (!controls || !grid) return;

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function setActiveCategory(category) {
        const pills = Array.from(controls.querySelectorAll('.solutions-pill'));
        pills.forEach(p => p.classList.toggle('active', p.dataset.category === category));

        const cards = Array.from(grid.querySelectorAll('.solutions-card'));
        const showAll = category === 'הכל' || category === 'all';

        if (prefersReducedMotion()) {
            cards.forEach(card => {
                const match = showAll || card.dataset.category === category;
                card.hidden = !match;
            });
            return;
        }

        // animate out → toggle hidden → animate in
        cards.forEach(card => {
            card.classList.add('is-fading');
        });

        setTimeout(() => {
            cards.forEach(card => {
                const match = showAll || card.dataset.category === category;
                card.hidden = !match;
            });

            // force reflow for animation restart
            void grid.offsetHeight;
            cards.forEach(card => {
                if (!card.hidden) card.classList.add('is-enter');
            });
            setTimeout(() => {
                cards.forEach(card => {
                    card.classList.remove('is-fading');
                    card.classList.remove('is-enter');
                });
            }, 260);
        }, 160);
    }

    // Attach handlers (content is rendered after content.json load)
    function wire() {
        const pills = Array.from(controls.querySelectorAll('.solutions-pill'));
        if (!pills.length) return;

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const cat = pill.dataset.category || 'הכל';
                setActiveCategory(cat);
            });
        });

        // Default category = first pill
        const first = pills[0].dataset.category || 'הכל';
        setActiveCategory(first);
    }

    wire();
    document.addEventListener('contentLoaded', wire, { once: true });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const target = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(target)) return;
    
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let display = Math.floor(current);
        if (hasPlus) display += '+';
        if (hasPercent) display += '%';
        element.textContent = display;
    }, 16);
}

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════════════════

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// FORM HANDLING
// ═══════════════════════════════════════════════════════════════════════════

function initFormHandling() {
    document.querySelectorAll('.contact-form').forEach((form) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const payload = {
                formType: 'contact',
                website: (formData.get('website') || '').toString(), // honeypot: humans leave empty
                name: (formData.get('name') || '').toString().trim(),
                business: (formData.get('business') || '').toString().trim(),
                phone: (formData.get('phone') || '').toString().trim(),
                email: (formData.get('email') || '').toString().trim(),
                message: (formData.get('message') || '').toString().trim(),
            };

            await submitFormPayload(form, payload);
        });
    });

    const needsForm = document.getElementById('needsForm');
    if (!needsForm) return;

    const validationMsg = document.getElementById('needsValidationMsg');

    needsForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const checked = needsForm.querySelectorAll('input[name="needs[]"]:checked');
        if (checked.length === 0) {
            if (validationMsg) validationMsg.hidden = false;
            needsForm.querySelector('#needsChecklist')?.focus();
            return;
        }

        if (validationMsg) validationMsg.hidden = true;

        const formData = new FormData(needsForm);
        const needs = formData.getAll('needs[]').map((n) => n.toString());
        const businessType = (formData.get('businessType') || '').toString();
        const cfg = window.DemoNeeds || {};
        const itemsMap = cfg.itemsLabelMap || {};
        const businessTypeLabels = cfg.businessTypeLabels || {};
        const businessTypeOther = businessType === 'other'
            ? (formData.get('businessTypeOther') || '').toString().trim()
            : '';

        const needsEnriched = needs.map((id) => {
            const isCustom = id.indexOf('custom:') === 0;
            return {
                id,
                label: isCustom ? id.slice('custom:'.length) : (itemsMap[id] || id),
                custom: isCustom,
            };
        });

        const payload = {
            formType: 'needs',
            website: (formData.get('website') || '').toString(), // honeypot: humans leave empty
            name: (formData.get('name') || '').toString().trim(),
            phone: (formData.get('phone') || '').toString().trim(),
            email: (formData.get('email') || '').toString().trim(),
            mainProduct: (formData.get('mainProduct') || '').toString().trim(),
            businessType,
            businessTypeOther,
            employeeCount: (formData.get('employeeCount') || '').toString().trim(),
            needs,
        };

        // Richer payload mirrors the structure documented for the AI flow,
        // Local demo payload. Nothing is sent.
        const aiPayload = {
            submittedAt: new Date().toISOString(),
            source: 'ofek-desk-demo',
            contact: {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
            },
            business: {
                mainProduct: payload.mainProduct,
                type: businessType,
                typeLabel: businessTypeLabels[businessType] || businessType,
                typeOther: businessTypeOther,
                employeeCount: payload.employeeCount,
            },
            needs: needsEnriched,
        };

                const fullPayload = Object.assign({}, payload, aiPayload);

        await submitFormPayload(needsForm, fullPayload, () => {
            if (window.DemoNeeds && window.DemoNeeds.resetCollapsed) {
                window.DemoNeeds.resetCollapsed();
            }
            const customList = document.getElementById('needsCustomList');
            if (customList) customList.innerHTML = '';
        }, {
            useAiBanner: true,
        });
    });

    needsForm.addEventListener('change', (e) => {
        if (e.target.name !== 'needs[]' || !validationMsg) return;
        const anyChecked = needsForm.querySelector('input[name="needs[]"]:checked');
        if (anyChecked) validationMsg.hidden = true;
    });
}

// Sends a form payload to a Vercel Serverless Function and updates the submit button UX.
// options:
//   apiUrl        — unused in this demo. Forms stay in the browser.
//   useAiBanner   — when true, shows the two-line "your AI summary is on the way" banner.
async function submitFormPayload(form, payload, onSuccessReset, options) {
    options = options || {};
    const btn = form.querySelector('button[type="submit"]');
    if (payload && String(payload.website || '').trim()) {
        if (btn) btn.disabled = true;
        return;
    }
    clearFormError(form);
    clearFormSuccessBanner(form);
    setSubmitLoading(btn, true, 'מכינים תצוגה...');
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitLoading(btn, false);
    showLocalDemoResult(form, payload, Boolean(options.useAiBanner));
    if (typeof onSuccessReset === 'function') onSuccessReset();
}

function showLocalDemoResult(form, payload, withSpec) {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
        btn.textContent = 'מוכן על המסך';
        setTimeout(() => {
            if (btn.dataset.originalText) btn.textContent = btn.dataset.originalText;
        }, 2200);
    }
    clearFormSuccessBanner(form);
    const wrap = document.createElement('div');
    wrap.className = 'form-submit-success demo-result';
    wrap.setAttribute('role', 'status');
    const title = document.createElement('strong');
    title.textContent = withSpec ? 'אפיון לדוגמה — נשאר על המסך' : 'הטופס נשאר בדפדפן';
    const body = document.createElement('p');
    body.textContent = 'לא נשלח מייל, לא נשמר פרט, ואין סליקה.';
    wrap.appendChild(title);
    wrap.appendChild(body);
    if (withSpec) {
        const list = document.createElement('ul');
        const needs = Array.isArray(payload.needs) ? payload.needs : [];
        const labels = needs.map((item) => (item && item.label) ? item.label : '').filter(Boolean);
        ['מטרה לדוגמה: לרכז פניות ומשימות במסך אחד.',
         labels.length ? ('סומן בהדגמה: ' + labels.join(' · ')) : 'לא סומן צורך.',
         'סיכום לדוגמה: מתחילים ממסך לקוחות ומסך משימות.'
        ].forEach((line) => {
            const li = document.createElement('li');
            li.textContent = line;
            list.appendChild(li);
        });
        wrap.appendChild(list);
    }
    form.appendChild(wrap);
}

async function safeJson(resp) {
    try { return await resp.json(); } catch { return null; }
}

function setSubmitLoading(btn, loading, loadingText) {
    if (!btn) return;
    if (loading) {
        if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = loadingText || 'שולח...';
        btn.style.background = ''; // clear any previous error color
    } else {
        btn.disabled = false;
        if (btn.dataset.originalText) {
            btn.textContent = btn.dataset.originalText;
        }
    }
}

function clearFormError(form) {
    const existing = form.querySelector('.form-submit-error');
    if (existing) existing.remove();
}

function initNeedsForm() {
    const form = document.getElementById('needsForm');
    if (!form || form.dataset.needsExpandInit === '1') return;
    form.dataset.needsExpandInit = '1';

    const expandBtn = document.getElementById('needsExpandBtn');
    const extended = document.getElementById('needsFormExtended');
    const customWrap = document.getElementById('needsCustomWrap');
    const customInput = document.getElementById('needsCustomInput');
    const customAddBtn = document.getElementById('needsCustomAddBtn');
    const customList = document.getElementById('needsCustomList');
    const otherWrap = document.getElementById('needsBusinessTypeOtherWrap');
    const otherInput = document.getElementById('needs-business-type-other');

    function toggleBusinessTypeOther() {
        const selected = form.querySelector('input[name="businessType"]:checked');
        const isOther = selected && selected.value === 'other';
        if (otherWrap) otherWrap.hidden = !isOther;
        if (otherInput) {
            otherInput.required = isOther;
            if (!isOther) otherInput.value = '';
        }
    }

    function expandNeedsForm() {
        const checklist = document.getElementById('needsChecklist');
        if (checklist) checklist.classList.add('needs-checklist--expanded');
        if (expandBtn) expandBtn.hidden = true;
        if (customWrap) customWrap.hidden = false;
        if (extended) {
            extended.hidden = false;
            const firstField = extended.querySelector('input');
            if (firstField) firstField.focus();
        }
    }

    function addCustomNeed(text) {
        const value = String(text || '').trim();
        if (!value || !customList) return;

        const slug = 'custom-' + Date.now();
        const label = document.createElement('label');
        label.className = 'needs-check-item needs-check-item--custom';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'needs[]';
        input.value = 'custom:' + value;
        input.id = slug;
        input.checked = true;

        const span = document.createElement('span');
        span.className = 'needs-check-label';
        span.textContent = value;

        label.appendChild(input);
        label.appendChild(span);
        customList.appendChild(label);
    }

    if (expandBtn) {
        expandBtn.addEventListener('click', expandNeedsForm);
    }

    if (customAddBtn && customInput) {
        customAddBtn.addEventListener('click', () => {
            addCustomNeed(customInput.value);
            customInput.value = '';
            customInput.focus();
        });

        customInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCustomNeed(customInput.value);
                customInput.value = '';
            }
        });
    }

    form.querySelectorAll('input[name="businessType"]').forEach((radio) => {
        radio.addEventListener('change', toggleBusinessTypeOther);
    });
    toggleBusinessTypeOther();
}

function showFormSuccess(form, onReset, banner) {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalText = btn.dataset.originalText || btn.textContent;
    btn.disabled = false;
    btn.textContent = 'נשלח בהצלחה! ✓';
    btn.style.background = '#25D366';

    const bannerEl = banner && (banner.title || banner.body)
        ? renderFormSuccessBanner(form, banner)
        : null;
    // Banner stays longer than the button flash so the customer has time to read
    // "your AI summary will arrive within ~3 minutes" before it auto-dismisses.
    const dismissMs = bannerEl ? 12000 : 3000;

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        delete btn.dataset.originalText;
        form.reset();
        if (typeof onReset === 'function') onReset();
    }, 3000);

    if (bannerEl) {
        setTimeout(() => {
            if (bannerEl.parentElement) bannerEl.remove();
        }, dismissMs);
    }
}

function renderFormSuccessBanner(form, banner) {
    clearFormSuccessBanner(form);

    const wrap = document.createElement('div');
    wrap.className = 'form-submit-success';
    wrap.setAttribute('role', 'status');
    wrap.setAttribute('aria-live', 'polite');

    if (banner.title) {
        const title = document.createElement('strong');
        title.className = 'form-submit-success__title';
        title.textContent = banner.title;
        wrap.appendChild(title);
    }
    if (banner.body) {
        const body = document.createElement('p');
        body.className = 'form-submit-success__body';
        body.textContent = banner.body;
        wrap.appendChild(body);
    }

    const btn = form.querySelector('button[type="submit"]');
    if (btn && btn.parentElement) {
        btn.parentElement.insertBefore(wrap, btn.nextSibling);
    } else {
        form.appendChild(wrap);
    }
    return wrap;
}

function clearFormSuccessBanner(form) {
    const existing = form.querySelector('.form-submit-success');
    if (existing) existing.remove();
}

function showFormError(form, message) {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = false;
        btn.style.background = '#AA2319';
    }

    let errorEl = form.querySelector('.form-submit-error');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'form-submit-error';
        errorEl.setAttribute('role', 'alert');
        errorEl.style.cssText = 'color:#AA2319;font-weight:600;margin-top:12px;text-align:center;';
        if (btn && btn.parentElement) {
            btn.parentElement.insertBefore(errorEl, btn.nextSibling);
        } else {
            form.appendChild(errorEl);
        }
    }
    errorEl.textContent = message;

    // Reset the timer if a new error replaces an old one mid-display.
    if (errorEl.dataset.hideTimer) {
        clearTimeout(Number(errorEl.dataset.hideTimer));
    }
    const timerId = setTimeout(() => {
        if (btn) btn.style.background = '';
        if (errorEl && errorEl.parentElement) errorEl.remove();
    }, 6000);
    errorEl.dataset.hideTimer = String(timerId);
}

// ═══════════════════════════════════════════════════════════════════════════
// SYSTEM DEMO (Carousel + Optional Video)
// ═══════════════════════════════════════════════════════════════════════════

function initSystemDemo() {
    initSystemDemoVideo();
    initSystemDemoCarousel();
}

function initSystemDemoVideo() {
    const wrap = document.getElementById('system-demo-video-wrap');
    if (!wrap || wrap.hidden) return;

    const placeholder = wrap.querySelector('.system-demo-video-placeholder');
    if (!placeholder) return;

    const rawUrl = placeholder.getAttribute('data-video-url') || '';
    const url = window.ContentSanitize && window.ContentSanitize.sanitizeEmbedUrl
        ? window.ContentSanitize.sanitizeEmbedUrl(rawUrl.trim())
        : rawUrl.trim();
    if (!url) return;

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = 'סרטון הדגמה';

    placeholder.replaceWith(iframe);
}

function initSystemDemoCarousel() {
    const carousel = document.querySelector('.system-demo-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.demo-slide-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || cards.length < 1 || !dotsContainer) return;

    let currentIndex = 0;
    let cardsPerView = window.innerWidth <= 768 ? 1 : 3;
    let totalSlides = Math.max(1, Math.ceil(cards.length / cardsPerView));

    function rebuildDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        let offset = currentIndex * cardsPerView * (cardWidth + gap);
        // בשקופית האחרונה לא משאירים חצי מסך ריק - נצמדים לסוף הרצועה
        const maxOffset = Math.max(0, track.scrollWidth - carousel.clientWidth);
        offset = Math.min(offset, maxOffset);

        // RTL: positive translateX moves content right (showing next cards)
        track.style.transform = `translateX(${offset}px)`;

        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }

    rebuildDots();
    updateCarousel();

    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

    // Auto-play (only when there is more than one slide)
    let autoPlay = null;
    function startAutoPlay() {
        if (totalSlides <= 1) return;
        stopAutoPlay();
        autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }
    function stopAutoPlay() {
        if (autoPlay) {
            clearInterval(autoPlay);
            autoPlay = null;
        }
    }

    startAutoPlay();
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    window.addEventListener('resize', debounce(() => {
        const nextCardsPerView = window.innerWidth <= 768 ? 1 : 3;
        if (nextCardsPerView === cardsPerView) {
            updateCarousel();
            return;
        }

        cardsPerView = nextCardsPerView;
        totalSlides = Math.max(1, Math.ceil(cards.length / cardsPerView));
        currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - 1));
        rebuildDots();
        updateCarousel();
        startAutoPlay();
    }, 120));
}

// ═══════════════════════════════════════════════════════════════════════════
// LAZY VIDEO LOADING
// ═══════════════════════════════════════════════════════════════════════════

function initLazyVideos() {
    const videos = document.querySelectorAll('video[data-src]');
    if (!videos.length) return;

    // Fallback for ancient browsers: load immediately.
    if (!('IntersectionObserver' in window)) {
        videos.forEach((video) => {
            video.src = video.dataset.src;
            video.removeAttribute('data-src');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const video = entry.target;
            if (video.dataset.src) {
                video.src = video.dataset.src;
                video.removeAttribute('data-src');
            }
            obs.unobserve(video);
        });
    }, { rootMargin: '200px 0px', threshold: 0.01 });

    videos.forEach((video) => observer.observe(video));
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// Debounce function for performance
function debounce(func, wait = 10) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// PENCIL TRAIL EFFECT
// ═══════════════════════════════════════════════════════════════════════════

function initFancyCursor() {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add('fancy-cursor');

    let mx = -100, my = -100;   // מיקום העכבר
    let rx = -100, ry = -100;   // מיקום הטבעת (נגררת)

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    }, { passive: true });

    const HOVER_SELECTOR = 'a, button, input, textarea, select, label, ' +
        '.wall-tile, [data-compare], .video-teaser, .faq-question, .carousel-btn, .ba-switch';
    document.addEventListener('mouseover', (e) => {
        ring.classList.toggle('is-hover', !!e.target.closest(HOVER_SELECTOR));
    }, { passive: true });
    document.addEventListener('mousedown', () => ring.classList.add('is-down'));
    document.addEventListener('mouseup', () => ring.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = ''; ring.style.opacity = ''; });

    const follow = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);
}
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// WORD-BY-WORD REVEAL FOR HERO
// ═══════════════════════════════════════════════════════════════════════════

function initWordReveal() {
    const heroTitle = document.querySelector('.word-reveal');
    if (!heroTitle) return;
    
    // Trigger reveal after loader finishes
    setTimeout(() => {
        heroTitle.classList.add('revealed');
    }, 1200);
}

// ═══════════════════════════════════════════════════════════════════════════
// IMPACT NUMBERS COUNTER
// ═══════════════════════════════════════════════════════════════════════════

function initImpactNumbers() {
    const impactItems = document.querySelectorAll('.impact-item');
    if (!impactItems.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                const numberEl = entry.target.querySelector('.impact-number');
                if (numberEl) animateImpactNumber(numberEl);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    impactItems.forEach(item => observer.observe(item));
}

function animateImpactNumber(element) {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    
    if (isNaN(target)) return;
    
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        
        current = Math.floor(easedProgress * target);
        
        // Format number with commas for large numbers
        let display = current.toLocaleString();
        element.textContent = display + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ ACCORDION
// ═══════════════════════════════════════════════════════════════════════════

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(other => other.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════

function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const cards = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || cards.length < 1) return;
    
    let currentIndex = 0;
    let cardsPerView = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        let offset = currentIndex * cardsPerView * (cardWidth + gap);
        // בשקופית האחרונה לא משאירים חצי מסך ריק - נצמדים לסוף הרצועה
        const maxOffset = Math.max(0, track.scrollWidth - carousel.clientWidth);
        offset = Math.min(offset, maxOffset);
        // RTL: positive translateX moves content right (showing next cards)
        track.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Auto-play
    let autoPlay = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });
    
    // Update on resize
    window.addEventListener('resize', () => {
        cardsPerView = window.innerWidth <= 768 ? 1 : 2;
        updateCarousel();
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED SECTION TITLES (Underline Reveal)
// ═══════════════════════════════════════════════════════════════════════════

function initAnimatedTitles() {
    const titles = document.querySelectorAll('.animated-title');
    if (!titles.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    titles.forEach(title => observer.observe(title));
}

// ═══════════════════════════════════════════════════════════════════════════
// BEFORE & AFTER SECTION ANIMATION
// ═══════════════════════════════════════════════════════════════════════════

function initBeforeAfter() {
    const baCards = document.querySelectorAll('.ba-card');
    if (!baCards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    baCards.forEach(card => observer.observe(card));
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING CTA (Persistent side widget)
// ═══════════════════════════════════════════════════════════════════════════

function initFloatingCta() {
    const card = document.getElementById('floatingCtaCard');
    const tab = document.getElementById('floatingCtaTab');
    const closeBtn = document.getElementById('floatingCtaClose');

    if (!card || !tab || !closeBtn) return;

    const STORAGE_KEY = 'floatingCtaDismissed';

    function showCard() {
        card.hidden = false;
        tab.hidden = true;
        sessionStorage.removeItem(STORAGE_KEY);
    }

    function hideCard() {
        card.hidden = true;
        tab.hidden = false;
        sessionStorage.setItem(STORAGE_KEY, '1');
    }

    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        hideCard();
    } else {
        showCard();
    }

    closeBtn.addEventListener('click', hideCard);
    tab.addEventListener('click', showCard);

    const action = document.getElementById('floatingCtaAction');
    if (action) {
        action.addEventListener('click', () => {
            hideCard();
        });
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// COMPARE SLIDERS (מסודר ⇄ מבולגן)
// ═══════════════════════════════════════════════════════════════════════════

function initCompareSliders() {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('[data-compare]').forEach(slider => {
        const handle = slider.querySelector('.compare-handle');
        if (!handle) return;

        let pos = 50;
        let dragging = false;

        const setPos = (p) => {
            pos = Math.max(2, Math.min(98, p));
            slider.style.setProperty('--pos', pos + '%');
            handle.setAttribute('aria-valuenow', String(Math.round(pos)));
        };
        setPos(50);

        const posFromEvent = (e) => {
            const rect = slider.getBoundingClientRect();
            return ((e.clientX - rect.left) / rect.width) * 100;
        };

        slider.addEventListener('pointerdown', (e) => {
            dragging = true;
            slider.classList.add('dragging');
            try { slider.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
            setPos(posFromEvent(e));
        });

        slider.addEventListener('pointermove', (e) => {
            if (dragging) setPos(posFromEvent(e));
        });

        const stopDrag = () => {
            dragging = false;
            slider.classList.remove('dragging');
        };
        slider.addEventListener('pointerup', stopDrag);
        slider.addEventListener('pointercancel', stopDrag);

        handle.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { setPos(pos - 4); e.preventDefault(); }
            if (e.key === 'ArrowRight') { setPos(pos + 4); e.preventDefault(); }
        });

        // נדנוד עדין בכניסה לתצוגה - רמז שאפשר לגרור
        if (!reduceMotion && 'IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    io.unobserve(slider);
                    const start = performance.now();
                    const duration = 1800;
                    const tick = (now) => {
                        if (dragging) return;
                        const t = Math.min(1, (now - start) / duration);
                        setPos(50 + Math.sin(t * Math.PI * 2) * 14 * (1 - t));
                        if (t < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                });
            }, { threshold: 0.5 });
            io.observe(slider);
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// SHOWCASE REVEAL (בנטו צבעוני)
// ═══════════════════════════════════════════════════════════════════════════

function initShowcaseReveal() {
    const cards = document.querySelectorAll('.showcase-card, .wall-tile');
    if (!cards.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // ה-delay נועד רק לכניסה המדורגת - מנקים כדי שריחוף יגיב מיד
                setTimeout(() => { entry.target.style.transitionDelay = ''; }, 800);
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach((card, index) => {
        card.classList.add('will-reveal');
        card.style.transitionDelay = (index % 6) * 70 + 'ms';
        io.observe(card);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE LIGHTBOX (קליק על תמונה פותח פופ-אפ מוגדל)
// ═══════════════════════════════════════════════════════════════════════════

function initImageLightbox() {
    const SELECTOR = '.showcase-media img, .demo-slide-media img, .process-slide-image img, .wall-tile img, .love-card img';
    let overlay = null;

    function ensureOverlay() {
        if (overlay) return overlay;
        overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML =
            '<button type="button" class="lightbox-close" aria-label="סגירה">&times;</button>' +
            '<img class="lightbox-img" alt="">';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
        return overlay;
    }

    function openLightbox(src, alt) {
        const o = ensureOverlay();
        const img = o.querySelector('.lightbox-img');
        img.src = src;
        img.alt = alt || '';
        o.classList.add('open');
        document.body.style.overflow = 'hidden';
        o.querySelector('.lightbox-close').focus();
    }

    function closeLightbox() {
        if (!overlay) return;
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.addEventListener('click', (e) => {
        const img = e.target.closest(SELECTOR);
        if (!img || img.closest('a') || img.closest('[data-compare]')) return;
        openLightbox(img.currentSrc || img.src, img.alt);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS VIDEO TEASERS (איך זה עובד — נגינה בריחוף)
// ═══════════════════════════════════════════════════════════════════════════

function initVideoTeasers() {
    document.querySelectorAll('.video-teaser').forEach(teaser => {
        const video = teaser.querySelector('video');
        if (!video) return;
        teaser.addEventListener('mouseenter', () => {
            video.play().catch(() => { /* autoplay blocked - poster frame stays */ });
        });
        teaser.addEventListener('mouseleave', () => {
            video.pause();
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// SYSTEMS WALL EFFECTS (קיר המערכות — פרספקטיבה בגלילה + הבזקי אור)
// ═══════════════════════════════════════════════════════════════════════════

function initWallEffects() {
    const wall = document.querySelector('.systems-wall');
    if (!wall) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // מזונרי: כל תמונה בגובה הטבעי שלה, צמודות בלי חורים.
    // span השורות מחושב מיחס התמונה (width/height שב-HTML) ורוחב העמודה בפועל.
    const layoutMasonry = () => {
        const cs = getComputedStyle(wall);
        const rowH = parseFloat(cs.getPropertyValue('grid-auto-rows')) || 10;
        const gap = parseFloat(cs.getPropertyValue('row-gap')) || 12;
        wall.querySelectorAll('.wall-tile').forEach(tile => {
            const img = tile.querySelector('img');
            if (!img) return;
            const w = parseFloat(img.getAttribute('width'));
            const h = parseFloat(img.getAttribute('height'));
            if (!w || !h) return;
            const tileH = tile.clientWidth * (h / w) + 2; // +2 על הגבול
            tile.style.gridRowEnd = 'span ' + Math.max(1, Math.round((tileH + gap) / (rowH + gap)));
        });
    };
    layoutMasonry();
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(layoutMasonry, 150);
    });

    // הקיר מתחיל מוטה לאחור ומתיישר תוך כדי גלילה
    if (!reduceMotion) {
        const MAX_TILT = 16;
        let ticking = false;

        const updateTilt = () => {
            ticking = false;
            const rect = wall.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            // 0 כשהקיר רק נכנס מלמטה, 1 כשמרכזו מגיע לשני שליש מסך
            const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.85)));
            wall.style.setProperty('--tilt', (MAX_TILT * (1 - progress)).toFixed(2) + 'deg');
            wall.style.setProperty('--wscale', (0.96 + 0.04 * progress).toFixed(3));
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateTilt);
            }
        }, { passive: true });
        updateTilt();
    }

    // הבזק אור על תמונה אקראית כל כמה שניות
    if (!reduceMotion) {
        const tiles = Array.from(wall.querySelectorAll('.wall-tile'));
        if (tiles.length) {
            setInterval(() => {
                const tile = tiles[Math.floor(Math.random() * tiles.length)];
                tile.classList.add('shine');
                setTimeout(() => tile.classList.remove('shine'), 1200);
            }, 2600);
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// STORY INTRO (פתיח כאוס → סדר)
// ═══════════════════════════════════════════════════════════════════════════

function initStoryIntro() {
    if (!('IntersectionObserver' in window)) return;

    const targets = [
        document.getElementById('puzzleBullets'),
        document.querySelector('.puzzle-simultaneous'),
        document.getElementById('visionTraits')
    ].filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('story-in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    targets.forEach(el => {
        el.classList.add('story-ready');
        io.observe(el);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// SMART MIXER (חדר הבקרה של העסק — פיידרים של פחות/יותר)
// ═══════════════════════════════════════════════════════════════════════════

function initSmartMixer() {
    const box = document.getElementById('smartClosingLines');
    if (!box) return;

    // מפרקים את השורות "פחות X. יותר Y." לזוגות
    const rawLines = Array.from(box.querySelectorAll('.smart-closing-line')).map(el => el.textContent.trim());
    const pairs = [];
    rawLines.forEach(t => {
        const m = t.match(/^פחות\s+(.+?)[.!?]?\s+יותר\s+(.+?)[.!?]?$/);
        if (m) pairs.push([m[1], m[2]]);
    });
    if (pairs.length < 2) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    box.innerHTML = '';
    const mixer = document.createElement('div');
    mixer.className = 'smart-mixer';
    mixer.innerHTML =
        '<div class="mixer-group mixer-less"><p class="mixer-group-title">פחות</p><div class="mixer-channels"></div></div>' +
        '<div class="mixer-divider" aria-hidden="true"></div>' +
        '<div class="mixer-group mixer-more"><p class="mixer-group-title">יותר</p><div class="mixer-channels"></div></div>';

    const lessWrap = mixer.querySelector('.mixer-less .mixer-channels');
    const moreWrap = mixer.querySelector('.mixer-more .mixer-channels');

    const makeChannel = (label, isMore, index) => {
        const ch = document.createElement('div');
        ch.className = 'mixer-channel ' + (isMore ? 'ch-more' : 'ch-less');
        ch.style.setProperty('--delay', (index * 0.25) + 's');
        ch.innerHTML =
            '<span class="ch-value">' + (isMore ? '10%' : '82%') + '</span>' +
            '<div class="ch-track"><div class="ch-fill"></div><div class="ch-knob"><i></i><i></i></div></div>' +
            '<span class="ch-label">' + label + '</span>';
        return ch;
    };

    pairs.forEach((pair, i) => {
        lessWrap.appendChild(makeChannel(pair[0], false, i));
        moreWrap.appendChild(makeChannel(pair[1], true, i));
    });
    box.appendChild(mixer);

    const finishValues = () => {
        mixer.querySelectorAll('.ch-less .ch-value').forEach(el => { el.textContent = '6%'; });
        mixer.querySelectorAll('.ch-more .ch-value').forEach(el => { el.textContent = '92%'; });
    };

    const play = () => {
        mixer.classList.add('play');
        if (reduceMotion) { finishValues(); return; }
        // מוני אחוזים שרצים יחד עם הפיידרים
        mixer.querySelectorAll('.mixer-channel').forEach(ch => {
            const isMore = ch.classList.contains('ch-more');
            const out = ch.querySelector('.ch-value');
            const from = isMore ? 10 : 82;
            const to = isMore ? 92 : 6;
            const delay = parseFloat(getComputedStyle(ch).getPropertyValue('--delay')) * 1000 || 0;
            const duration = 1500;
            const t0 = performance.now() + delay;
            const step = (now) => {
                const t = Math.max(0, Math.min(1, (now - t0) / duration));
                const eased = 1 - Math.pow(1 - t, 3);
                out.textContent = Math.round(from + (to - from) * eased) + '%';
                if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        });
    };

    if ('IntersectionObserver' in window && !reduceMotion) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(play, 250);
                    io.disconnect();
                }
            });
        }, { threshold: 0.35 });
        io.observe(mixer);
    } else {
        play();
    }
}
// ═══════════════════════════════════════════════════════════════════════════
// HERO PUZZLE ASSEMBLY (חלקי פאזל אמיתיים שעפים מכל הדף ומתחברים לתמונה)
// ═══════════════════════════════════════════════════════════════════════════

function initHeroPuzzle() {
    const img = document.querySelector('.hero-main-image');
    const wrapper = document.querySelector('.hero-animation-wrapper');
    if (!img || !wrapper) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // clip-path: path() לא נתמך בדפדפנים ישנים - ואז מדלגים על האנימציה
    if (!(window.CSS && CSS.supports && CSS.supports('clip-path', 'path("M 0 0 L 1 1 Z")'))) return;

    const COLS = 4;
    const ROWS = 3;
    // פיזור התחלתי: מכל קצוות הדף [x, y, סיבוב]
    const scatter = [
        [-640, -400, -30], [260, -540, 18], [-190, -580, -12], [580, -440, 26],
        [-700, 130, 16], [660, 70, -22], [-580, 330, 12], [640, 400, -16],
        [-270, 560, 24], [310, 580, -14], [-660, -150, 20], [680, -250, -24]
    ];

    const num = n => n.toFixed(1);
    // קשת של "כפתור" פאזל לאורך צלע: (ax,ay)->(bx,by), נורמל (nx,ny), tab: 1 בולט / -1 שקוע / 0 ישר
    const edgeSeg = (ax, ay, bx, by, nx, ny, tab, t) => {
        if (!tab) return 'L ' + num(bx) + ' ' + num(by) + ' ';
        const k = tab * t;
        const P = u => [ax + (bx - ax) * u, ay + (by - ay) * u];
        const O = pt => [pt[0] + nx * k, pt[1] + ny * k];
        const f = pt => num(pt[0]) + ' ' + num(pt[1]);
        const p1 = P(0.36), c1a = P(0.46), c1b = O(P(0.38)), p2 = O(P(0.5));
        const c2a = O(P(0.62)), c2b = P(0.54), p3 = P(0.64);
        return 'L ' + f(p1) +
            ' C ' + f(c1a) + ', ' + f(c1b) + ', ' + f(p2) +
            ' C ' + f(c2a) + ', ' + f(c2b) + ', ' + f(p3) +
            ' L ' + num(bx) + ' ' + num(by) + ' ';
    };

    const jigsawPath = (cw, ch, B, tabs) => {
        const t = Math.min(cw, ch) * 0.22;
        const x0 = B, y0 = B, x1 = B + cw, y1 = B + ch;
        return 'M ' + num(x0) + ' ' + num(y0) + ' ' +
            edgeSeg(x0, y0, x1, y0, 0, -1, tabs.top, t) +
            edgeSeg(x1, y0, x1, y1, 1, 0, tabs.right, t) +
            edgeSeg(x1, y1, x0, y1, 0, 1, tabs.bottom, t) +
            edgeSeg(x0, y1, x0, y0, -1, 0, tabs.left, t) + 'Z';
    };

    const build = () => {
        const W = img.clientWidth;
        const H = img.clientHeight;
        if (!W || !H) return;
        wrapper.style.position = 'relative';

        const overlay = document.createElement('div');
        overlay.className = 'hero-puzzle';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.style.left = img.offsetLeft + 'px';
        overlay.style.top = img.offsetTop + 'px';
        overlay.style.width = W + 'px';
        overlay.style.height = H + 'px';

        const url = img.currentSrc || img.src;
        const cw = W / COLS;
        const ch = H / ROWS;
        const B = Math.min(cw, ch) * 0.3; // שוליים לבליטות

        // כיווני החיבורים - צלעות משותפות משלימות זו את זו
        const vSign = (r, c) => ((r + c) % 2 ? 1 : -1);
        const hSign = (r, c) => ((r + c) % 2 ? -1 : 1);

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const i = r * COLS + c;
                const piece = document.createElement('div');
                piece.className = 'hero-puzzle-piece';
                const left = c * cw - B;
                const top = r * ch - B;
                piece.style.left = left + 'px';
                piece.style.top = top + 'px';
                piece.style.width = (cw + 2 * B) + 'px';
                piece.style.height = (ch + 2 * B) + 'px';
                piece.style.backgroundImage = 'url("' + url + '")';
                piece.style.backgroundSize = W + 'px ' + H + 'px';
                piece.style.backgroundPosition = (-left) + 'px ' + (-top) + 'px';
                piece.style.clipPath = 'path("' + jigsawPath(cw, ch, B, {
                    top: r === 0 ? 0 : -hSign(r - 1, c),
                    right: c === COLS - 1 ? 0 : vSign(r, c),
                    bottom: r === ROWS - 1 ? 0 : hSign(r, c),
                    left: c === 0 ? 0 : -vSign(r, c - 1)
                }) + '")';
                const s = scatter[i % scatter.length];
                piece.style.setProperty('--from',
                    'translate(' + s[0] + 'px, ' + s[1] + 'px) rotate(' + s[2] + 'deg) scale(0.5)');
                piece.style.transitionDelay = (i * 260) + 'ms, ' + (i * 260) + 'ms';
                overlay.appendChild(piece);
            }
        }

        img.style.visibility = 'hidden';
        wrapper.appendChild(overlay);
        requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('assembled')));
        // אחרי שהפאזל הושלם - חוזרים לתמונה המקורית (ממשיכה לרחף)
        setTimeout(() => {
            img.style.visibility = '';
            overlay.remove();
        }, COLS * ROWS * 260 + 2300);
    };

    // מתחילים אחרי שמסך הטעינה נעלם
    const start = () => setTimeout(build, 950);
    if (document.readyState === 'complete') {
        start();
    } else {
        window.addEventListener('load', start, { once: true });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// BA POWER SWITCH (לפני/אחרי — מדליקים את המערכת)
// ═══════════════════════════════════════════════════════════════════════════

function initBaSwitch() {
    const grid = document.querySelector('.ba-grid');
    if (!grid) return;

    // קוראים את הפריטים מהכרטיסים שה-loader רינדר
    const before = Array.from(grid.querySelectorAll('#baBeforeList li')).map(li => li.textContent.replace(/^[✓✗x×\s]+/, '').trim());
    const after = Array.from(grid.querySelectorAll('#baAfterList li')).map(li => li.textContent.replace(/^[✓✗x×\s]+/, '').trim());
    if (before.length < 2 || after.length < 2) return;

    const rows = Math.max(before.length, after.length);
    const machine = document.createElement('div');
    machine.className = 'ba-machine';
    machine.innerHTML =
        '<div class="ba-switch-wrap">' +
        '<button type="button" class="ba-switch" role="switch" aria-checked="false" aria-label="הדלקת המערכת">' +
        '<span class="ba-thumb">&#x23FB;</span></button>' +
        '<p class="ba-switch-label">הדליקו את המערכת</p>' +
        '</div><div class="ba-rows"></div>';

    const rowsWrap = machine.querySelector('.ba-rows');
    for (let i = 0; i < rows; i++) {
        const flip = document.createElement('div');
        flip.className = 'ba-flip';
        flip.style.setProperty('--d', (i * 0.14) + 's');
        const offText = before[i] || before[before.length - 1];
        const onText = after[i] || after[after.length - 1];
        flip.innerHTML =
            '<div class="ba-flip-inner">' +
            '<div class="ba-face ba-face-off"><span class="ba-face-icon">✗</span><span>' + offText + '</span></div>' +
            '<div class="ba-face ba-face-on"><span class="ba-face-icon">✓</span><span>' + onText + '</span></div>' +
            '</div>';
        rowsWrap.appendChild(flip);
    }

    grid.innerHTML = '';
    grid.classList.add('ba-grid-machine');
    grid.appendChild(machine);

    const switchBtn = machine.querySelector('.ba-switch');
    const label = machine.querySelector('.ba-switch-label');
    const setState = (on) => {
        machine.classList.toggle('on', on);
        switchBtn.setAttribute('aria-checked', String(on));
        label.textContent = on ? 'המערכת פועלת ✨' : 'הדליקו את המערכת';
    };
    switchBtn.addEventListener('click', () => setState(!machine.classList.contains('on')));

    // הדלקה אוטומטית בפעם הראשונה שרואים את הסקשן
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => setState(true), 900);
                    io.disconnect();
                }
            });
        }, { threshold: 0.35 });
        io.observe(machine);
    } else {
        setState(true);
    }
}
