/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(a.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
});

/* FORM */
document.querySelector(".contact-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent successfully!");
});

/* REVEAL ANIMATION */
const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.8s ease";
    observer.observe(el);
});

/* STAR BACKGROUND */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 120; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        s: Math.random() * 0.5
    });
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "white";

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.s;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animate);
}

animate();