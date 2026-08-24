window.onload = function () {

    /* =========================
       STAR BACKGROUND
    ========================= */

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    resize();

    const stars = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.3,
            speed: Math.random() * 0.6 + 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        stars.forEach((s) => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = "#00ffcc";
            ctx.fill();

            s.y += s.speed * 0.6;

            if (s.y > h) {
                s.y = 0;
                s.x = Math.random() * w;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", resize);

    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
            });
        });
    }

    /* =========================
       NAVBAR SCROLL ANIMATION
    ========================= */

    const navbar = document.querySelector(".nav");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    sections.forEach((section) => observer.observe(section));

    /* Show hero immediately */
    document.querySelector(".hero").classList.add("show");

    /* =========================
       CONTACT FORM (FORMSPREE)
    ========================= */

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const sendButton = document.getElementById("send-button");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            sendButton.disabled = true;
            sendButton.textContent = "Sending...";

            formStatus.textContent = "";
            formStatus.className = "form-status";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(
                    "https://formspree.io/f/xzepywow",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept: "application/json"
                        }
                    }
                );

                if (response.ok) {
                    contactForm.reset();

                    formStatus.textContent = "✓ Message sent successfully!";
                    formStatus.classList.add("success");
                } else {
                    throw new Error("Submission failed");
                }
            } catch (error) {
                formStatus.textContent =
                    "✕ Something went wrong. Please try again.";
                formStatus.classList.add("error");
            }

            sendButton.disabled = false;
            sendButton.textContent = "Send Message";
        });
    }

};
