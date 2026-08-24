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
   CLOSE MOBILE MENU AFTER CLICKING NAV LINK
   ========================================================= */

const navLinks = document.querySelectorAll("#nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

    });

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = Array.from(
    document.querySelectorAll("section[id]")
);


/*
   Get the navigation link belonging to a section.
*/

function getNavLink(sectionId) {

    return document.querySelector(
        '#nav-menu a[href="#' + sectionId + '"]'
    );

}


/*
   Highlight one navigation item.
*/

function setActiveNav(sectionId) {

    navLinks.forEach(function (link) {

        link.classList.remove("active");

    });


    const activeLink =
        getNavLink(sectionId);


    if (activeLink) {

        activeLink.classList.add("active");

    }

}


/*
   Find the section currently being viewed.

   The section whose top is closest to the fixed
   navigation bar is considered the active section.
*/

function updateActiveNavigation() {

    const navOffset = 100;

    let activeSection = null;

    let bestDistance = Infinity;


    /*
       If user is at the very top,
       Home must always be active.
    */

    if (window.scrollY < 100) {

        setActiveNav("home");

        return;

    }


    sections.forEach(function (section) {

        const rect =
            section.getBoundingClientRect();


        /*
           Section must be visible below/around
           the navigation bar.
        */

        if (
            rect.top <= navOffset &&
            rect.bottom > navOffset
        ) {

            const distance =
                Math.abs(rect.top - navOffset);


            if (distance < bestDistance) {

                bestDistance = distance;

                activeSection = section;

            }

        }

    });


    /*
       If a section was found, highlight it.
    */

    if (activeSection) {

        setActiveNav(
            activeSection.id
        );

    }

}


/*
   Update while scrolling.
*/

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/*
   Update when page loads.
*/

window.addEventListener(
    "load",
    function () {

        updateActiveNavigation();

    }
);


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            /*
               Only process internal section links.
            */

            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

                return;

            }


            const targetSection =
                document.querySelector(targetId);


            if (!targetSection) {

                return;

            }


            event.preventDefault();


            /*
               Height of fixed navigation.
            */

            const navHeight = 80;


            /*
               Calculate target position.
            */

            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                navHeight;


            /*
               Highlight clicked section immediately.
            */

            setActiveNav(
                targetSection.id
            );


            /*
               Smooth scroll.
            */

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =========================================================
   SECTION REVEAL ANIMATION
   ========================================================= */

const animatedSections =
    document.querySelectorAll(".section");


const sectionObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                }
            );

        },

        {
            threshold: 0.10
        }

    );


animatedSections.forEach(
    function (section) {

        sectionObserver.observe(section);

    }
);


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
       Resize canvas.
    */

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    /*
       Create stars.
    */

    function createStars() {

        stars = [];


        const numberOfStars =
            Math.floor(
                (
                    window.innerWidth *
                    window.innerHeight
                ) / 9000
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


    /*
       Initial setup.
    */

    resizeCanvas();

    createStars();


    /*
       Recreate stars when window size changes.
    */

    window.addEventListener(
        "resize",
        function () {

            resizeCanvas();

            createStars();

        }
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


        stars.forEach(
            function (star) {

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

            }
        );

    }


    /*
       Animate stars.
    */

    function animateStars() {

        stars.forEach(
            function (star) {

                star.y += star.speed;


                /*
                   Move star back to the top
                   after reaching the bottom.
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

            }
        );


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
                contactForm.elements["name"]
                    .value
                    .trim();


            const email =
                contactForm.elements["email"]
                    .value
                    .trim();


            const message =
                contactForm.elements["message"]
                    .value
                    .trim();


            /*
               Validate form.
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
               Show sending status.
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
               Temporary front-end submission.
            */

            setTimeout(
                function () {

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

                },
                1200
            );

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
           Remove active from all links.
        */

        navLinks.forEach(
            function (link) {

                link.classList.remove("active");

            }
        );


        /*
           Home is active initially.
        */

        const homeLink =
            document.querySelector(
                '#nav-menu a[href="#home"]'
            );


        if (homeLink) {

            homeLink.classList.add("active");

        }


        /*
           Run navigation check.
        */

        updateActiveNavigation();

    }
);
