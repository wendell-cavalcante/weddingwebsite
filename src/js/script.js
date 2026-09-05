// mobile navigation
const mobileBtn = document.querySelector('.btn-mobile');
const navLinks = document.getElementById('nav-links');
const icon = document.querySelector('.btn-mobile i');

if (mobileBtn && navLinks && icon) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// header shadow on scroll
const header = document.querySelector('header');

if (header) {
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

// gentle scroll reveal for sections
const revealTargets = document.querySelectorAll('.reveal');

if (revealTargets.length) {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach((el) => observer.observe(el));
    } else {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
    }
}
