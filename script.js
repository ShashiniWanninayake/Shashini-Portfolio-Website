window.onload = function () {

    /* =========================
       STAR BACKGROUND
    ========================= */

    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    let w;
    let h;

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

        for (let i = 0; i < stars.length; i++) {

            let s = stars[i];

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


            s.y += s.speed * 0.6;


            if (s.y > h) {

                s.y = 0;

                s.x = Math.random() * w;

            }

        }

        requestAnimationFrame(draw);

    }

    draw();


    window.addEventListener(
        "resize",
        resize
    );


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const navLinks =
        document.querySelectorAll(
            "#nav-menu a"
        );


    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle(
                    "active"
                );

            }
        );


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

    }

};
