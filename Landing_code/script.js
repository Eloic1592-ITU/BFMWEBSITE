// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navLinks) navLinks.classList.toggle('active');
    });
}

if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// ===== HERO ENTRANCE ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    // Staggered entrance
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s cubic-bezier(.4,0,.2,1)';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateY(40px)';
        heroVisual.style.transition = 'all 0.8s cubic-bezier(.4,0,.2,1) 0.3s';

        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 200);
    }

    // Floating badges staggered entrance
    document.querySelectorAll('.floating-badge').forEach((badge, i) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px) scale(0.95)';
        badge.style.transition = `all 0.6s cubic-bezier(.4,0,.2,1) ${0.8 + i * 0.2}s`;

        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0) scale(1)';
        }, 200);
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== USE CASES TABS =====
document.querySelectorAll('.use-cases-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        // Switch active tab
        document.querySelectorAll('.use-cases-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Switch active panel
        document.querySelectorAll('.use-cases-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(`panel-${target}`).classList.add('active');

        // Re-trigger fade-in animations for new panel cards
        document.querySelectorAll(`#panel-${target} .fade-in-up`).forEach(el => {
            el.classList.remove('visible');
            observer.observe(el);
        });
    });
});

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            const answer = btn.nextElementSibling;

            // Close all others
            document.querySelectorAll('.faq-question').forEach(other => {
                other.setAttribute('aria-expanded', 'false');
                other.nextElementSibling.classList.remove('open');
            });

            // Toggle current
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });
});

// ===== SIDE NAV ACTIVE SECTION =====
const sideNavItems = document.querySelectorAll('.side-nav-item');
const pageSections  = document.querySelectorAll('section[id]');

if (sideNavItems.length && pageSections.length) {
    const updateSideNav = () => {
        let currentIndex = 0;
        pageSections.forEach((section, i) => {
            if (window.scrollY >= section.offsetTop - 260) {
                currentIndex = i;
            }
        });
        sideNavItems.forEach((item, i) => {
            const isActive = i === currentIndex;
            item.classList.toggle('active', isActive);
            item.style.opacity = 1;
            const label = item.querySelector('.side-nav-label');
            if (label) {
                label.style.color      = isActive ? '#004B4C' : '#9CA3AF';
                label.style.fontWeight = isActive ? '700' : '400';
            }
        });
    };
    window.addEventListener('scroll', updateSideNav, { passive: true });
    updateSideNav();
}

// ===== FORM LANGUAGE TABS =====
document.addEventListener('DOMContentLoaded', () => {
    const langTabs = document.querySelectorAll('.form-lang-tab');

    function switchFormLang(lang) {
        // Mettre à jour les onglets actifs
        langTabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.form-lang-tab[data-lang="${lang}"]`).classList.add('active');

        // Mettre à jour tous les éléments avec data-fr / data-mg
        document.querySelectorAll('[data-fr]').forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
            if (el.tagName === 'H2') {
                el.innerHTML = el.getAttribute(`data-${lang}`);
            } else {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
        });

        // Mettre à jour les placeholders
        document.querySelectorAll('[data-placeholder-fr]').forEach(input => {
            input.placeholder = input.getAttribute(`data-placeholder-${lang}`);
        });

        // Mettre à jour le label du bouton submit
        const btnLabel = document.querySelector('.signup-submit .btn-label');
        const submitBtn = document.querySelector('.signup-submit');
        if (btnLabel && submitBtn) {
            btnLabel.textContent = submitBtn.getAttribute(`data-${lang}`);
        }
    }

    langTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchFormLang(tab.getAttribute('data-lang'));
        });
    });
});

// ===== HERO TITLE LANGUAGE TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');

    if (heroTitle) {
        const frenchText = 'Le compte <span class="hero-highlight">le moins cher</span>, et <span class="hero-secure">le plus sécurisé</span>';
        const malagasyText = 'Kaonty <span class="hero-highlight">mora indrindra</span>, ary <span class="hero-secure">azo antoka indrindra</span>';

        let isFrench = true;

        setInterval(() => {
            if (isFrench) {
                heroTitle.innerHTML = malagasyText;
            } else {
                heroTitle.innerHTML = frenchText;
            }
            isFrench = !isFrench;
        }, 10000);
    }
});
