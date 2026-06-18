document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SMOOTH SCROLL
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const targetId = link.getAttribute("href");

            if (targetId && targetId !== "#") {
                e.preventDefault();
                document.querySelector(targetId)?.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================
       CONTACT FORM
    ========================= */
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            alert("Message sent successfully!");
            form.reset();
        });
    }

    /* =========================
       REVEAL ANIMATION
    ========================= */
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(40px)";
        el.style.transition = "0.8s ease";
        observer.observe(el);
    });

    /* =========================
       MOBILE NAV MENU (FIXED)
    ========================= */
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        // auto close when clicking link
        document.querySelectorAll("#nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    /* =========================
       UPGRADED STAR + PARTICLE BACKGROUND
    ========================= */
   <script>
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const STAR_COUNT = 150;

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.2,
            alpha: Math.random()
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(0, 255, 204, ${star.alpha})`;
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
});

createStars();
drawStars();
</script>

        /* STARS */
        for (let i = 0; i < 120; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5,
                speed: Math.random() * 0.6
            });
        }

        /* GLOW PARTICLES */
        for (let i = 0; i < 35; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /* STARS */
            ctx.fillStyle = "white";
            stars.forEach(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();

                s.y += s.speed;

                if (s.y > canvas.height) {
                    s.y = 0;
                    s.x = Math.random() * canvas.width;
                }
            });

            /* PARTICLES (BLUE + GREEN GLOW) */
            particles.forEach(p => {
                ctx.beginPath();

                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.r * 6
                );

                gradient.addColorStop(0, "rgba(0,255,204,0.8)");
                gradient.addColorStop(0.5, "rgba(0,170,255,0.3)");
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

});
