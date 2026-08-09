/* =========================================================
   STUDENT PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. DOM ELEMENTS
   ========================================================= */

const body =
    document.body;


const navMenu =
    document.getElementById("navMenu");


const menuToggle =
    document.getElementById("menuToggle");


const navLinks =
    document.querySelectorAll(".nav-link");


const themeToggle =
    document.getElementById("themeToggle");


const themeIcon =
    document.getElementById("themeIcon");


const searchToggle =
    document.getElementById("searchToggle");


const searchPanel =
    document.getElementById("searchPanel");


const searchClose =
    document.getElementById("searchClose");


const siteSearch =
    document.getElementById("siteSearch");


const searchResults =
    document.getElementById("searchResults");


const backToTop =
    document.getElementById("backToTop");


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

menuToggle.addEventListener(
    "click",
    function () {

        navMenu.classList.toggle("show");

        menuToggle.classList.toggle("active");

        const isOpen =
            navMenu.classList.contains("show");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);


/*
   Close mobile menu when a link is clicked.
*/

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove("show");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);


/* =========================================================
   3. DARK / LIGHT THEME
   ========================================================= */


/*
   Check saved theme.
*/

const savedTheme =
    localStorage.getItem("portfolioTheme");


if (savedTheme === "dark") {

    body.classList.add("dark-theme");

    themeIcon.textContent = "☀️";

}


themeToggle.addEventListener(
    "click",
    function () {

        body.classList.toggle("dark-theme");


        const darkMode =
            body.classList.contains("dark-theme");


        if (darkMode) {

            themeIcon.textContent = "☀️";

            localStorage.setItem(
                "portfolioTheme",
                "dark"
            );

        }

        else {

            themeIcon.textContent = "🌙";

            localStorage.setItem(
                "portfolioTheme",
                "light"
            );

        }

    }
);


/* =========================================================
   4. SEARCH PANEL
   ========================================================= */

searchToggle.addEventListener(
    "click",
    function () {

        searchPanel.classList.toggle("show");

        if (
            searchPanel.classList.contains("show")
        ) {

            siteSearch.focus();

        }

    }
);


searchClose.addEventListener(
    "click",
    function () {

        searchPanel.classList.remove("show");

        siteSearch.value = "";

        searchResults.innerHTML = "";

    }
);


/* =========================================================
   5. PORTFOLIO SEARCH
   ========================================================= */

const searchableSections = [

    {
        title: "Home",
        id: "home",
        keywords:
            "home student portfolio developer programming web"
    },

    {
        title: "About Me",
        id: "about",
        keywords:
            "about student computer science education technology"
    },

    {
        title: "Skills",
        id: "skills",
        keywords:
            "skills HTML CSS JavaScript Python SQL data analysis"
    },

    {
        title: "Projects",
        id: "projects",
        keywords:
            "projects web Python data science portfolio"
    },

    {
        title: "Contact",
        id: "contact",
        keywords:
            "contact email phone location social media"
    }

];


siteSearch.addEventListener(
    "input",
    function () {

        const query =
            siteSearch.value
                .toLowerCase()
                .trim();


        searchResults.innerHTML = "";


        if (query === "") {

            return;

        }


        const matches =
            searchableSections.filter(
                function (section) {

                    return (
                        section.title
                            .toLowerCase()
                            .includes(query)
                        ||
                        section.keywords
                            .toLowerCase()
                            .includes(query)
                    );

                }
            );


        if (matches.length === 0) {

            searchResults.innerHTML =
                "<p>No results found.</p>";

            return;

        }


        matches.forEach(
            function (section) {

                const result =
                    document.createElement("div");

                result.className =
                    "search-result";


                result.innerHTML = `
                    <a href="#${section.id}">
                        ${section.title}
                    </a>
                `;


                result
                    .querySelector("a")
                    .addEventListener(
                        "click",
                        function () {

                            searchPanel.classList.remove("show");

                            siteSearch.value = "";

                            searchResults.innerHTML = "";

                        }
                    );


                searchResults.appendChild(result);

            }
        );

    }
);


/* =========================================================
   6. TYPING ANIMATION
   ========================================================= */

const typingText =
    document.getElementById("typingText");


const typingWords = [

    "Web Developer",

     "Problem Solver",

   

];


let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


/*
   Typing function.
*/

function typeAnimation() {

    const currentWord =
        typingWords[wordIndex];


    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeAnimation,
                1500
            );

            return;

        }

    }

    else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (
            characterIndex === 0
        ) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                typingWords.length;

        }

    }


    const speed =
        deleting ? 60 : 100;


    setTimeout(
        typeAnimation,
        speed
    );

}


typeAnimation();


/* =========================================================
   7. IMAGE / CONTENT SLIDER
   ========================================================= */

const slides =
    document.querySelectorAll(".slide");


const dots =
    document.querySelectorAll(".dot");


const previousSlide =
    document.getElementById("prevSlide");


const nextSlide =
    document.getElementById("nextSlide");


let currentSlide =
    0;


/*
   Display selected slide.
*/

function showSlide(index) {

    currentSlide =
        (index + slides.length) %
        slides.length;


    slides.forEach(
        function (slide, index) {

            slide.classList.toggle(
                "active",
                index === currentSlide
            );

        }
    );


    dots.forEach(
        function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        }
    );

}


/*
   Previous slide.
*/

previousSlide.addEventListener(
    "click",
    function () {

        showSlide(
            currentSlide - 1
        );

    }
);


/*
   Next slide.
*/

nextSlide.addEventListener(
    "click",
    function () {

        showSlide(
            currentSlide + 1
        );

    }
);


/*
   Slider dots.
*/

dots.forEach(
    function (dot) {

        dot.addEventListener(
            "click",
            function () {

                showSlide(
                    Number(dot.dataset.slide)
                );

            }
        );

    }
);


/*
   Automatic slider.
*/

setInterval(
    function () {

        showSlide(
            currentSlide + 1
        );

    },
    5000
);


/* =========================================================
   8. DIGITAL CLOCK
   ========================================================= */

const digitalClock =
    document.getElementById("digitalClock");


const currentDate =
    document.getElementById("currentDate");


function updateDateTime() {

    const now =
        new Date();


    /*
       Time
    */

    const time =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    digitalClock.textContent =
        time;


    /*
       Date
    */

    const date =
        now.toLocaleDateString(
            [],
            {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );


    currentDate.textContent =
        date;

}


updateDateTime();


setInterval(
    updateDateTime,
    1000
);


/* =========================================================
   9. VISITOR COUNTER
   ========================================================= */

const visitorCount =
    document.getElementById("visitorCount");


let visitors =
    Number(
        localStorage.getItem(
            "portfolioVisitors"
        )
    );


if (
    Number.isNaN(visitors)
) {

    visitors = 0;

}


/*
   Increase visitor count for this browser.
*/

const hasVisited =
    sessionStorage.getItem(
        "portfolioCurrentSession"
    );


if (!hasVisited) {

    visitors++;

    localStorage.setItem(
        "portfolioVisitors",
        visitors
    );

    sessionStorage.setItem(
        "portfolioCurrentSession",
        "true"
    );

}


visitorCount.textContent =
    visitors;


/* =========================================================
   10. DOWNLOAD CV
   ========================================================= */

const downloadCV =
    document.getElementById("downloadCV");


downloadCV.addEventListener(
    "click",
    function () {

       
        const cvContent = `
Kalkidan Gebremedhin
Model School Student

========================================

CONTACT
Email: kalkidangsy@gmail.com
Phone: +251 988381999
Location: Ethiopia

========================================

PROFILE

Motivated Model school student interested in
web development, Python programming, data science
and emerging technologies.

========================================

EDUCATION

Grade 11 in Model school 
Haramaya University
Expected grade 12 Graduation: 2028

========================================

TECHNICAL SKILLS

HTML
CSS
JavaScript
Python

========================================

PROJECTS

1. Student Management System
2. Python Calculator
3. Student Performance Analysis
4. Personal Portfolio
5. Data Visualization Dashboard
6. Library Management System

========================================

INTERESTS

Web Development
Programming
Data Science
Artificial Intelligence
Technology

========================================

REFERENCES

Available upon request.
        `;


        const blob =
            new Blob(
                [cvContent],
                {
                    type: "text/plain"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href =
            url;


        link.download =
            "Kalkidan-Student-CV.txt";


        document.body.appendChild(link);


        link.click();


        link.remove();


        URL.revokeObjectURL(url);

    }
);


/* =========================================================
   11. PROJECT FILTER
   ========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


const filterButtons =
    document.querySelectorAll(".filter-btn");


const projectSearch =
    document.getElementById("projectSearch");


const noProjects =
    document.getElementById("noProjects");


let currentFilter =
    "all";


function filterProjects() {

    const query =
        projectSearch.value
            .toLowerCase()
            .trim();


    let visible =
        0;


    projectCards.forEach(
        function (card) {

            const category =
                card.dataset.category;


            const title =
                card.dataset.title
                    .toLowerCase();


            const description =
                card.querySelector("p")
                    .textContent
                    .toLowerCase();


            const matchesCategory =
                currentFilter === "all" ||
                category === currentFilter;


            const matchesSearch =
                query === "" ||
                title.includes(query) ||
                description.includes(query);


            if (
                matchesCategory &&
                matchesSearch
            ) {

                card.style.display =
                    "block";

                visible++;

            }

            else {

                card.style.display =
                    "none";

            }

        }
    );


    noProjects.classList.toggle(
        "show",
        visible === 0
    );

}


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                filterProjects();

            }
        );

    }
);


projectSearch.addEventListener(
    "input",
    filterProjects
);


/* =========================================================
   12. PROJECT DATA
   ========================================================= */

const projectData = [

    {
        title:
            "Student Management System",

        category:
            "Web Development",

        icon:
            "🎓",

        description:
            "A responsive student management application for managing student registration, academic records and related information.",

        technologies:
            [
                "HTML",
                "CSS",
                "JavaScript"
            ],

        github:
            "#",

        demo:
            "#"

    },


    {
        title:
            "Python Calculator",

        category:
            "Python",

        icon:
            "🐍",

        description:
            "A simple calculator application demonstrating Python programming concepts including functions, variables, operators and user input.",

        technologies:
            [
                "Python",
                "Functions",
                "GUI"
            ],

        github:
            "#",

        demo:
            "#"

    },


    {
        title:
            "Student Performance Analysis",

        category:
            "Data Science",

        icon:
            "📊",

        description:
            "A data analysis project for exploring student academic performance and presenting findings through charts and visualizations.",

        technologies:
            [
                "Python",
                "Pandas",
                "Data Visualization"
            ],

        github:
            "#",

        demo:
            "#"

    },


    {
        title:
            "Personal Portfolio",

        category:
            "Web Development",

        icon:
            "💻",

        description:
            "A responsive personal portfolio created using only HTML, CSS and JavaScript with theme switching, animation, filtering and interactive components.",

        technologies:
            [
                "HTML",
                "CSS",
                "JavaScript"
            ],

        github:
            "#",

        demo:
            "#"

    },


    {
        title:
            "Data Visualization Dashboard",

        category:
            "Data Science",

        icon:
            "📈",

        description:
            "An interactive dashboard concept for exploring datasets and communicating insights using visual analytics.",

        technologies:
            [
                "Python",
                "Pandas",
                "Charts"
            ],

        github:
            "#",

        demo:
            "#"

    },


    {
        title:
            "Library Management System",

        category:
            "Other",

        icon:
            "📚",

        description:
            "A library management system concept for managing books, users, borrowing activities and returns.",

        technologies:
            [
                "SQL",
                "Database",
                "Programming"
            ],

        github:
            "#",

        demo:
            "#"

    }

];


/* =========================================================
   13. PROJECT MODAL
   ========================================================= */

const projectModal =
    document.getElementById("projectModal");


const modalClose =
    document.getElementById("modalClose");


const modalImage =
    document.getElementById("modalImage");


const modalTitle =
    document.getElementById("modalTitle");


const modalCategory =
    document.getElementById("modalCategory");


const modalDescription =
    document.getElementById("modalDescription");


const modalTechnologies =
    document.getElementById("modalTechnologies");


const modalGithub =
    document.getElementById("modalGithub");


const modalDemo =
    document.getElementById("modalDemo");


function openProjectModal(index) {

    const project =
        projectData[index];


    modalImage.textContent =
        project.icon;


    modalCategory.textContent =
        project.category;


    modalTitle.textContent =
        project.title;


    modalDescription.textContent =
        project.description;


    modalTechnologies.innerHTML =
        "";


    project.technologies.forEach(
        function (technology) {

            const tag =
                document.createElement("span");

            tag.textContent =
                technology;

            modalTechnologies.appendChild(
                tag
            );

        }
    );


    modalGithub.href =
        project.github;


    modalDemo.href =
        project.demo;


    projectModal.classList.add(
        "show"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    body.classList.add(
        "modal-open"
    );

}


/*
   Details buttons.

   Because there are two buttons per project,
   querySelectorAll is used.
*/

document.querySelectorAll(
    ".details-btn"
).forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                openProjectModal(
                    Number(
                        button.dataset.project
                    )
                );

            }
        );

    }
);


/*
   Close modal.
*/

function closeProjectModal() {

    projectModal.classList.remove(
        "show"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    body.classList.remove(
        "modal-open"
    );

}


modalClose.addEventListener(
    "click",
    closeProjectModal
);


/*
   Close by clicking outside.
*/

projectModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === projectModal
        ) {

            closeProjectModal();

        }

    }
);


/*
   Close using ESC.
*/

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeProjectModal();

            searchPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   14. CONTACT FORM VALIDATION
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");


const contactName =
    document.getElementById("contactName");


const contactEmail =
    document.getElementById("contactEmail");


const contactSubject =
    document.getElementById("contactSubject");


const contactMessage =
    document.getElementById("contactMessage");


const nameError =
    document.getElementById("nameError");


const emailError =
    document.getElementById("emailError");


const subjectError =
    document.getElementById("subjectError");


const messageError =
    document.getElementById("messageError");


const characterCount =
    document.getElementById("characterCount");


const formStatus =
    document.getElementById("formStatus");


const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/*
   Name validation.
*/

function validateName() {

    const value =
        contactName.value.trim();


    if (value.length < 2) {

        nameError.textContent =
            "Please enter at least 2 characters.";

        contactName.classList.add("invalid");

        contactName.classList.remove("valid");

        return false;

    }


    nameError.textContent =
        "";

    contactName.classList.remove("invalid");

    contactName.classList.add("valid");

    return true;

}


/*
   Email validation.
*/

function validateEmail() {

    const value =
        contactEmail.value.trim();


    if (!emailPattern.test(value)) {

        emailError.textContent =
            "Please enter a valid email address.";

        contactEmail.classList.add("invalid");

        contactEmail.classList.remove("valid");

        return false;

    }


    emailError.textContent =
        "";

    contactEmail.classList.remove("invalid");

    contactEmail.classList.add("valid");

    return true;

}


/*
   Subject validation.
*/

function validateSubject() {

    const value =
        contactSubject.value.trim();


    if (value.length < 3) {

        subjectError.textContent =
            "Please enter a subject.";

        contactSubject.classList.add("invalid");

        contactSubject.classList.remove("valid");

        return false;

    }


    subjectError.textContent =
        "";

    contactSubject.classList.remove("invalid");

    contactSubject.classList.add("valid");

    return true;

}


/*
   Message validation.
*/

function validateMessage() {

    const value =
        contactMessage.value.trim();


    if (value.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        contactMessage.classList.add("invalid");

        contactMessage.classList.remove("valid");

        return false;

    }


    messageError.textContent =
        "";

    contactMessage.classList.remove("invalid");

    contactMessage.classList.add("valid");

    return true;

}


/*
   Real-time validation.
*/

contactName.addEventListener(
    "blur",
    validateName
);


contactEmail.addEventListener(
    "blur",
    validateEmail
);


contactSubject.addEventListener(
    "blur",
    validateSubject
);


contactMessage.addEventListener(
    "blur",
    validateMessage
);


/*
   Character counter.
*/

contactMessage.addEventListener(
    "input",
    function () {

        characterCount.textContent =
            `${contactMessage.value.length} / 500`;

    }
);


/*
   Submit form.
*/

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const validName =
            validateName();


        const validEmail =
            validateEmail();


        const validSubject =
            validateSubject();


        const validMessage =
            validateMessage();


        if (
            validName &&
            validEmail &&
            validSubject &&
            validMessage
        ) {

            formStatus.textContent =
                "Thank you! Your message is ready to be sent.";

            formStatus.className =
                "form-status success";


            /*
               Since this is a frontend-only project,
               the form is not actually emailed.
            */

            contactForm.reset();


            characterCount.textContent =
                "0 / 500";


            contactName.classList.remove("valid");

            contactEmail.classList.remove("valid");

            contactSubject.classList.remove("valid");

            contactMessage.classList.remove("valid");


            setTimeout(
                function () {

                    formStatus.textContent =
                        "";

                    formStatus.className =
                        "form-status";

                },
                5000
            );

        }

        else {

            formStatus.textContent =
                "Please correct the errors above.";

            formStatus.className =
                "form-status error";

        }

    }
);


/* =========================================================
   15. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   16. ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            function (link) {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute("href") ===
                                    `#${id}`
                                );

                            }
                        );

                    }

                }
            );

        },
        {
            rootMargin:
                "-30% 0px -60% 0px"
        }
    );


sections.forEach(
    function (section) {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   17. BACK TO TOP
   ========================================================= */

window.addEventListener(
    "scroll",
    function () {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        }

        else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    function () {

        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }
);


/* =========================================================
   18. FOOTER YEAR
   ========================================================= */

document.getElementById(
    "footerYear"
).textContent =
    new Date().getFullYear();


/* =========================================================
   19. CLOSE SEARCH WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const clickedInsideSearch =
            searchPanel.contains(event.target);


        const clickedSearchButton =
            searchToggle.contains(event.target);


        if (
            !clickedInsideSearch &&
            !clickedSearchButton
        ) {

            searchPanel.classList.remove(
                "show"
            );

        }

    }
);