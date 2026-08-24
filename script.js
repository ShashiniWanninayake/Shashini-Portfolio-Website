/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
   ========================================================= */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

    });

});


/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");


function updateActiveNav() {

    let currentSection = "home";

    const scrollPosition = window.scrollY;

    /*
       Check every section and find the section currently
       occupying the main viewing area.
    */

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop - 200 &&
            scrollPosition < sectionTop + sectionHeight - 200
        ) {

            currentSection = section.id;

        }

    });


    /*
       Make sure Home is selected when the user is
       at the very top of the page.
    */

    if (scrollPosition < 100) {

        currentSection = "home";

    }


    /*
       Remove active class from all navigation links.
    */

    navLinks.forEach(function (link) {

        link.classList.remove("active");

    });


    /*
       Add active class to the matching navigation link.
    */

    navLinks.forEach(function (link) {

        const target = link.getAttribute("href");

        if (target === "#" + currentSection) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   UPDATE ACTIVE NAV WHILE SCROLLING
   ========================================================= */

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


/* =========================================================
   UPDATE ACTIVE NAV WHEN PAGE LOADS
   ========================================================= */

window.addEventListener(
    "load",
    updateActiveNav
);

document.addEventListener(
    "DOMContentLoaded",
    updateActiveNav
);


/* =========================================================
   SECTION SCROLL ANIMATION
   ========================================================= */

const animatedSections =
    document.querySelectorAll(".section");


const sectionObserver =
    new IntersectionObserver(

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


animatedSections.forEach(function (section) {

    sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        /*
           Only handle links that point to sections.
        */

        if (
            targetId &&
            targetId.startsWith("#")
        ) {

            const targetSection =
                document.querySelector(targetId);


            if (targetSection) {

                event.preventDefault();


                /*
                   Fixed navigation height.
                */

                const navHeight = 80;


                /*
                   Calculate the correct position.
                */

                const targetPosition =
                    targetSection.offsetTop - navHeight;


                /*
                   Smooth scroll.
                */

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        }

    });

});


/* =========================================================
   STAR BACKGROUND
   ========================================================= */

const canvas =
    document.getElementById("stars");


if (canvas) {

    const ctx =
        canvas.getContext("2d");


    let stars = [];


    /*
       Set canvas size.
    */

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /*
       Create stars.
    */

    function createStars() {

        stars = [];


        const numberOfStars =
            Math.floor(
                (window.innerWidth *
                 window.innerHeight) / 9000
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
                    Math.random() * 1.5 + 0.3,

                speed:
                    Math.random() * 0.3 + 0.05,

                opacity:
                    Math.random() * 0.7 + 0.2

            });

        }

    }


    createStars();


    /*
       Recreate stars when screen size changes.
    */

    window.addEventListener(
        "resize",
        createStars
    );


    /*
       Draw stars.
    */

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
                star.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(255,255,255," +
                star.opacity +
                ")";


            ctx.fill();


        });

    }


    /*
       Animate stars.
    */

    function animateStars() {

        stars.forEach(function (star) {

            star.y += star.speed;


            /*
               Move star back to the top
               when it reaches the bottom.
            */

            if (
                star.y >
                canvas.height
            ) {

                star.y = 0;

                star.x =
                    Math.random() *
                    canvas.width;

            }

        });


        drawStars();


        requestAnimationFrame(
            animateStars
        );

    }


    animateStars();

}


/* =========================================================
   CONTACT FORM
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


            /*
               Get form values.
            */

            const name =
                contactForm.elements["name"].value.trim();

            const email =
                contactForm.elements["email"].value.trim();

            const message =
                contactForm.elements["message"].value.trim();


            /*
               Basic validation.
            */

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please fill in all fields.";

                }

                return;

            }


            /*
               Show sending message.
            */

            if (formStatus) {

                formStatus.textContent =
                    "Sending message...";

            }


            if (sendButton) {

                sendButton.disabled = true;

                sendButton.textContent =
                    "Sending...";

            }


            /*
               This is a front-end demonstration.
               Connect Formspree, EmailJS, or your backend
               here when you want to receive real messages.
            */

            setTimeout(function () {

                if (formStatus) {

                    formStatus.textContent =
                        "Thank you! Your message has been submitted.";

                }


                contactForm.reset();


                if (sendButton) {

                    sendButton.disabled = false;

                    sendButton.textContent =
                        "Send Message";

                }

            }, 1200);

        }
    );

}


/* =========================================================
   INITIAL PAGE SETUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Set Home as active initially.
        */

        navLinks.forEach(function (link) {

            link.classList.remove("active");

        });


        const homeLink =
            document.querySelector(
                'nav a[href="#home"]'
            );


        if (homeLink) {

            homeLink.classList.add("active");

        }

    }
);
