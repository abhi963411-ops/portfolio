// ==========================================================================
// Abhishek Parmar Portfolio - Interactive JavaScript Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Theme Toggle (Dark / Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const icon = themeToggle.querySelector('i');
            
            if (currentTheme === 'light') {
                document.body.removeAttribute('data-theme');
                icon.className = 'fa-solid fa-moon';
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
                icon.className = 'fa-solid fa-sun';
                localStorage.setItem('theme', 'light');
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            const icon = themeToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-sun';
        }
    }

    // 3. Skills Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 4. Interactive MS Excel & Google Sheets Sandbox Calculator
    const valInputs = document.querySelectorAll('.val-input');
    const calcSumEl = document.getElementById('calc-sum');
    const calcAvgEl = document.getElementById('calc-avg');
    const btnRecalc = document.getElementById('btn-recalc');

    function recalculateSpreadsheet() {
        let sum = 0;
        let count = 0;

        valInputs.forEach(input => {
            const val = parseFloat(input.value) || 0;
            sum += val;
            count++;
        });

        const avg = count > 0 ? (sum / count) : 0;

        if (calcSumEl) {
            calcSumEl.innerText = sum.toLocaleString();
        }
        if (calcAvgEl) {
            calcAvgEl.innerText = avg.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
        }
    }

    valInputs.forEach(input => {
        input.addEventListener('input', recalculateSpreadsheet);
    });

    if (btnRecalc) {
        btnRecalc.addEventListener('click', () => {
            recalculateSpreadsheet();
            btnRecalc.style.transform = 'scale(0.95)';
            setTimeout(() => btnRecalc.style.transform = 'scale(1)', 150);
        });
    }

    // Initial calc on load
    recalculateSpreadsheet();

    // 5. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (formStatus) {
                formStatus.style.color = '#34d399';
                formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your message has been prepared. Redirecting to mail app...`;
            }

            // Open mailto link
            const subject = encodeURIComponent(document.getElementById('subject').value || 'Portfolio Contact');
            const message = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${document.getElementById('message').value}`);
            
            setTimeout(() => {
                window.location.href = `mailto:9634abhi@gmail.com?subject=${subject}&body=${message}`;
            }, 1000);
        });
    }

    // 6. Active Scroll Indicator
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});
