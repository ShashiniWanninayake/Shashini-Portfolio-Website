/* =========================================================
   PORTFOLIO WEBSITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. ALWAYS START FROM HOME AFTER REFRESH
   ========================================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {

    // Always start at the top of the website
    window.scrollTo(0, 0);

});


/* =========================================================
   2. MOBILE NAVIGATION MENU
   ========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });


    // Close mobile menu when clicking a navigation link
    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });

}


/* =========================================================
   3. SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        /* 
           Special handling for Home.
           This makes SW always return completely to the top.
        */

        if (targetId === "#home") {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });

            return;
        }


        /* Other sections */

        const navHeight = document.querySelector(".nav")
            ? document.querySelector(".nav").offsetHeight
            : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            navHeight;

        window.scrollTo({

            top: targetPosition,

            left: 0,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   4. SECTION SCROLL ANIMATION
   ========================================================= */

const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.12
    }

);


sections.forEach(function (section) {

    sectionObserver.observe(section);

});


/* =========================================================
   5. ACTIVE NAVIGATION LINK
   ========================================================= */

const pageSections = document.querySelectorAll(
    "section[id]"
);

const navigationLinks = document.querySelectorAll(
    "#nav-menu a"
);

function updateActiveNavigation() {

    let currentSection = "";

    pageSections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================================
   6. NAVIGATION BAR SCROLL EFFECT
   ========================================================= */

const navigationBar =
    document.querySelector(".nav");

window.addEventListener("scroll", function () {

    if (!navigationBar) {
        return;
    }


    if (window.scrollY > 50) {

        navigationBar.style.background =
            "rgba(5, 8, 22, 0.90)";

        navigationBar.style.boxShadow =
            "0 5px 30px rgba(0, 0, 0, 0.25)";

    } else {

        navigationBar.style.background =
            "rgba(5, 8, 22, 0.67)";

        navigationBar.style.boxShadow =
            "none";

    }

});


/* =========================================================
   7. ANIMATED STAR BACKGROUND
   ========================================================= */

const canvas =
    document.getElementById("stars");

const ctx =
    canvas ? canvas.getContext("2d") : null;


let stars = [];

let mouse = {
    x: null,
    y: null
};


function resizeCanvas() {

    if (!canvas) {
        return;
    }

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createStars();

}


function createStars() {

    if (!canvas) {
        return;
    }

    stars = [];

    const numberOfStars =
        Math.min(
            180,
            Math.floor(
                (window.innerWidth *
                window.innerHeight) / 9000
            )
        );


    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        stars.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radius:
                Math.random() * 1.7 + 0.3,

            speed:
                Math.random() * 0.4 + 0.1,

            opacity:
                Math.random() * 0.8 + 0.2,

            twinkle:
                Math.random() * 0.03 + 0.01

        });

    }

}


function drawStars() {

    if (!canvas || !ctx) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(function (star) {

        /* Twinkle effect */

        star.opacity +=
            star.twinkle *
            (Math.random() > 0.5 ? 1 : -1);


        if (star.opacity > 1) {
            star.opacity = 1;
        }

        if (star.opacity < 0.15) {
            star.opacity = 0.15;
        }


        /* Move star */

        star.y -= star.speed;


        /* Reset star */

        if (star.y < 0) {

            star.y =
                canvas.height;

            star.x =
                Math.random() *
                canvas.width;

        }


        /* Mouse interaction */

        let distance = 999;

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            const dx =
                star.x - mouse.x;

            const dy =
                star.y - mouse.y;

            distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

        }


        /* Draw */

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0, 255, 213, " +
            star.opacity +
            ")";

        ctx.fill();


        /* Mouse glow */

        if (distance < 120) {

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius + 3,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(79, 172, 254, 0.25)";

            ctx.fill();

        }

    });


    requestAnimationFrame(drawStars);

}


/* Canvas resize */

window.addEventListener(
    "resize",
    resizeCanvas
);


/* Mouse movement */

window.addEventListener(
    "mousemove",
    function (event) {

        mouse.x = event.clientX;

        mouse.y = event.clientY;

    }
);


/* Remove mouse effect when leaving */

window.addEventListener(
    "mouseout",
    function () {

        mouse.x = null;

        mouse.y = null;

    }
);


/* Start stars */

resizeCanvas();

drawStars();


/* =========================================================
   8. CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");

const sendButton =
    document.getElementById("send-button");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                contactForm
                .querySelector(
                    'input[name="name"]'
                ).value.trim();


            const email =
                contactForm
                .querySelector(
                    'input[name="email"]'
                ).value.trim();


            const message =
                contactForm
                .querySelector(
                    'textarea[name="message"]'
                ).value.trim();


            /* Basic validation */

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please fill in all fields.";

                    formStatus.style.color =
                        "#ff6b6b";

                }

                return;

            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please enter a valid email address.";

                    formStatus.style.color =
                        "#ff6b6b";

                }

                return;

            }


            /* Button loading */

            if (sendButton) {

                sendButton.disabled = true;

                sendButton.textContent =
                    "Sending...";

            }


            /*
               This is a front-end demo.

               To actually send messages to your email,
               connect this form to Formspree, EmailJS,
               Web3Forms, or your own backend.
            */

            setTimeout(function () {

                if (formStatus) {

                    formStatus.textContent =
                        "Thank you! Your message has been received.";

                    formStatus.style.color =
                        "#00ffd5";

                }


                contactForm.reset();


                if (sendButton) {

                    sendButton.disabled =
                        false;

                    sendButton.textContent =
                        "Send Message";

                }

            }, 1000);

        }
    );

}


/* =========================================================
   9. BUTTON RIPPLE EFFECT
   ========================================================= */

document
    .querySelectorAll(".btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                const x =
                    event.clientX -
                    rect.left -
                    size / 2;


                const y =
                    event.clientY -
                    rect.top -
                    size / 2;


                ripple.style.width =
                    size + "px";

                ripple.style.height =
                    size + "px";

                ripple.style.left =
                    x + "px";

                ripple.style.top =
                    y + "px";

                ripple.classList.add(
                    "button-ripple"
                );


                button.appendChild(ripple);


                setTimeout(
                    function () {

                        ripple.remove();

                    },
                    600
                );

            }
        );

    });


/* =========================================================
   10. CARD MOUSE TILT EFFECT
   ========================================================= */

const cards =
    document.querySelectorAll(
        ".project"
    );


cards.forEach(function (card) {

    card.addEventListener(
        "mousemove",
        function (event) {

            /* Disable strong tilt on small screens */

            if (window.innerWidth <= 768) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) /
                20;


            const rotateY =
                (centerX - x) /
                20;


            card.style.transform =
                "perspective(800px) " +
                "rotateX(" +
                rotateX +
                "deg) " +
                "rotateY(" +
                rotateY +
                "deg) " +
                "translateY(-10px)";

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   11. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !menuToggle ||
            !navMenu
        ) {
            return;
        }


        const clickedInsideMenu =
            navMenu.contains(event.target);


        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            navMenu.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   12. ESCAPE KEY CLOSES MOBILE MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            if (navMenu) {

                navMenu.classList.remove(
                    "active"
                );

            }

        }

    }
);


/* =========================================================
   13. UPDATE HOME POSITION
   ========================================================= */

window.addEventListener(
    "pageshow",
    function () {

        /*
           pageshow also handles browser
           back/forward cache restoration.
        */

        if (
            window.performance &&
            window.performance
                .getEntriesByType
        ) {

            const navigation =
                window.performance
                    .getEntriesByType(
                        "navigation"
                    )[0];


            if (
                navigation &&
                navigation.type ===
                "reload"
            ) {

                window.scrollTo(
                    0,
                    0
                );

            }

        }

    }
);


/* =========================================================
   END OF JAVASCRIPT
   ========================================================= */
