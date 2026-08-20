// =========================
// STAR BACKGROUND
// =========================

window.addEventListener("load", function () {

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    let w;
    let h;

    function resize() {

        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;

    }

    resize();


    // =========================
    // CREATE STARS
    // =========================

    const stars = [];

    const count = 200;

    for (let i = 0; i < count; i++) {

        stars.push({

            x: Math.random() * w,

            y: Math.random() * h,

            r: Math.random() * 1.3 + 0.2,

            speed: Math.random() * 0.6 + 0.2

        });

    }


    // =========================
    // STAR ANIMATION
    // =========================

    function draw() {

        ctx.clearRect(0, 0, w, h);


        for (let i = 0; i < stars.length; i++) {

            const s = stars[i];


            // Draw star

            ctx.beginPath();

            ctx.arc(
                s.x,
                s.y,
                s.r,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#00ffcc";

            ctx.fill();


            // Move star

            s.y += s.speed * 0.6;


            // Reset star

            if (s.y > h) {

                s.y = 0;

                s.x = Math.random() * w;

            }

        }


        requestAnimationFrame(draw);

    }


    draw();


    // =========================
    // RESIZE
    // =========================

    window.addEventListener("resize", resize);


    // =========================
    // MOBILE MENU
    // =========================

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const navLinks =
        document.querySelectorAll("#nav-menu a");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

        });

    }


    // Close menu after clicking a link

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });

});
