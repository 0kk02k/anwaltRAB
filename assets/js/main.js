(function () {
    'use strict';

    // ── Partial Loader ──────────────────────────────────────────
    async function loadPartial(url, selector) {
        var placeholder = document.querySelector(selector);
        if (!placeholder) return;
        try {
            var response = await fetch(url);
            if (!response.ok) throw new Error(url + ': ' + response.status);
            var html = await response.text();
            placeholder.insertAdjacentHTML('afterend', html);
            placeholder.remove();
        } catch (err) {
            console.error('Partial load failed:', err);
        }
    }

    function basePath() {
        var path = window.location.pathname;
        if (path.endsWith('/') || path.endsWith('index.html')) return './';
        return '../';
    }

    // ── Interactions ────────────────────────────────────────────
    function initInteractions() {
        var mobileMenuButton = document.getElementById('mobileMenuButton');
        var mobileNavOverlay = document.getElementById('mobileNavOverlay');
        var mobileMenu = document.getElementById('mobileMenu');
        var mobileMenuClose = document.getElementById('mobileMenuClose');
        var mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-link') : [];
        var header = document.getElementById('header');
        var googleMapsLink = document.getElementById('googleMapsLink');

        function toggleMobileMenu() {
            if (!mobileMenu) return;
            var isActive = mobileMenu.classList.contains('active');
            if (mobileNavOverlay) {
                mobileNavOverlay.classList.toggle('active');
                mobileNavOverlay.setAttribute('aria-hidden', String(isActive));
            }
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = !isActive ? 'hidden' : '';
            if (!isActive) { if (mobileMenuClose) mobileMenuClose.focus(); }
            else { if (mobileMenuButton) mobileMenuButton.focus(); }
        }

        if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleMobileMenu);
        if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', toggleMobileMenu);
        if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMobileMenu);

        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                if (mobileMenu && mobileMenu.classList.contains('active')) toggleMobileMenu();
                var targetId = link.getAttribute('href');
                var path = window.location.pathname;
                if (targetId && targetId.includes('index.html')) {
                    if (!path.endsWith('index.html') && !path.endsWith('/')) {
                        window.location.href = targetId;
                        return;
                    }
                    var anchor = targetId.split('#')[1];
                    if (anchor) setTimeout(function () { scrollToTarget('#' + anchor); }, 300);
                } else if (targetId) {
                    setTimeout(function () { scrollToTarget(targetId); }, 300);
                }
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) toggleMobileMenu();
        });

        if (header) {
            window.addEventListener('scroll', function () {
                header.classList.toggle('scrolled', window.pageYOffset > 50);
            }, { passive: true });
        }

        function scrollToTarget(targetId) {
            var el = document.querySelector(targetId);
            if (el) {
                var offset = header ? header.offsetHeight : 0;
                window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
            }
        }

        document.querySelectorAll('a[href^="#"]:not(.mobile-link)').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (href && href !== '#') { e.preventDefault(); scrollToTarget(href); }
            });
        });

        if (googleMapsLink) {
            googleMapsLink.addEventListener('click', function (e) {
                e.preventDefault();
                var url = this.getAttribute('data-url');
                if (url && confirm('Möchten Sie zu Google Maps weitergeleitet werden?')) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });
        }

        try {
            var today = new Date().getDay();
            var item = document.querySelector('.business-hours-list li[data-day="' + today + '"]');
            if (item) item.classList.add('current-day');
        } catch (e) { /* ignored */ }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
        } else {
            document.querySelectorAll('.reveal').forEach(function (el) { el.style.opacity = '1'; });
        }
    }

    // ── Init ────────────────────────────────────────────────────
    async function init() {
        var base = basePath();
        await Promise.all([
            loadPartial(base + 'partials/header.html', '[data-partial="header"]'),
            loadPartial(base + 'partials/footer.html', '[data-partial="footer"]'),
            loadPartial(base + 'partials/mobile-menu.html', '[data-partial="mobile-menu"]')
        ]);
        initInteractions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
