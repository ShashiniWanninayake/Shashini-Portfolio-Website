/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });


    /* Close menu after clicking a navigation link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", function (event) {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");

        }

    });

}


/* =========================================================
   SECTION SCROLL ANIMATION
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
   STAR BACKGROUND
   ========================================================= */

const canvas = document.getElementById("stars");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let stars = [];

    function resizeCanvas() {

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

        createStars();

    }


    function createStars() {

        stars = [];

        const numberOfStars =
            Math.floor(
                (window.innerWidth * window.innerHeight) / 9000
            );

        for (let i = 0; i < numberOfStars; i++) {

            stars.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,

                size:
                    Math.random() * 1.5 + 0.3,

                speed:
                    Math.random() * 0.3 + 0.05,

                opacity:
                    Math.random() * 0.7 + 0.2

            });

        }

    }


    function drawStars() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        stars.forEach(function (star) {

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,255,255,${star.opacity})`;

            ctx.fill();


            star.y += star.speed;


            if (star.y > canvas.height) {

                star.y = 0;

                star.x =
                    Math.random() *
                    canvas.width;

            }

        });


        requestAnimationFrame(drawStars);

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();

    drawStars();

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                contactForm.elements["name"].value.trim();

            const email =
                contactForm.elements["email"].value.trim();

            const message =
                contactForm.elements["message"].value.trim();


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                formStatus.textContent =
                    "Please fill in all fields.";

                return;

            }


            formStatus.textContent =
                "Thank you! Your message has been received.";

            contactForm.reset();

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const allSections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll("nav a");

function updateActiveNav() {

    let currentSection = "";

    const scrollPosition = window.scrollY + 180;

    allSections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    /* Home at the very top */

    if (window.scrollY < 100) {
        currentSection = "home";
    }


    /* Remove active from all links */

    allNavLinks.forEach(function (link) {

        link.classList.remove("active");

    });


    /* Add active to current section */

    allNavLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


/* Update while scrolling */

window.addEventListener(
    "scroll",
    updateActiveNav
);


/* Update when page loads */

window.addEventListener(
    "load",
    updateActiveNav
);


/* Update when screen size changes */

window.addEventListener(
    "resize",
    updateActiveNav
);

/* =========================================================
   START PAGE
   ========================================================= */

window.addEventListener(
    "load",
    function () {

        const homeSection =
            document.getElementById("home");

        if (homeSection) {

            setTimeout(function () {

                homeSection.classList.add("show");

            }, 100);

        }

    }
);
