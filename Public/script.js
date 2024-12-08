document.addEventListener("DOMContentLoaded", function () {
   
    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".mobile-menu-icon");
    const navLinks = document.querySelector("nav ul");
    const menuIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuIcon.setAttribute("class", isOpen ? "fas fa-times" : "fas fa-bars");
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.tagName === "A" && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            menuIcon.setAttribute("class", "fas fa-bars");
        }
    });

    // "Read More" Toggle
    const readMoreBtn = document.querySelector(".read-more-button");
    const moreText = document.getElementById("more-text");

    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener("click", function () {
            if (moreText.style.display === "none" || !moreText.style.display) {
                moreText.style.display = "block";
                readMoreBtn.textContent = "Show Less";
            } else {
                moreText.style.display = "none";
                readMoreBtn.textContent = "Read More";
            }
        });
    }

    // Smooth Scroll for Anchor Links
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Scroll Reveal Animation
    const scrollRevealOptions = {
        distance: "50px",
        origin: "bottom",
        duration: 800,
        interval: 200,
    };

    if (typeof ScrollReveal !== "undefined") {
        const sr = ScrollReveal();

        sr.reveal(".hero-heading", { ...scrollRevealOptions, delay: 200 });
        sr.reveal(".hero-subtext", { ...scrollRevealOptions, delay: 400 });
        sr.reveal(".hero-buttons a", { ...scrollRevealOptions, interval: 200 });

        sr.reveal(".features-section .features-grid > div", { ...scrollRevealOptions, interval: 300 });
        sr.reveal(".about-image img", { ...scrollRevealOptions, origin: "left" });
        sr.reveal(".about-content h2", { ...scrollRevealOptions, origin: "right", delay: 300 });
        sr.reveal(".about-content p", { ...scrollRevealOptions, origin: "right", delay: 500 });
        sr.reveal(".about-content button", { ...scrollRevealOptions, origin: "right", delay: 700 });

        sr.reveal(".contact-section div", { ...scrollRevealOptions, interval: 200 });
    }

    // Dynamic Date Display
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    const footerDateElement = document.querySelector("footer .date");
    if (footerDateElement) {
        footerDateElement.textContent = formattedDate;
    }
});
