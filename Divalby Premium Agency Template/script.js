/* =====================================================
   DIVALBY AGENCY PRO
   PREMIUM SCRIPT v2.0
===================================================== */

/* LOADER */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    if(loader){

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 500);

    }

});

/* MOBILE MENU */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("#nav-menu");

if(hamburger && navMenu){

    hamburger.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

/* ACTIVE PAGE */

const currentPage =
window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {

    const href = link.getAttribute("href");

    if(href === currentPage){

        link.classList.add("active");

    }

});

/* SCROLL REVEAL */

const revealElements =
document.querySelectorAll(
".reveal, section, .card, .project"
);

const revealObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:.15
});

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});

/* COUNTERS */

const counters =
document.querySelectorAll(".counter");

const counterObserver =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const target =
            parseInt(
                counter.dataset.target
            );

            let current = 0;

            const increment =
            Math.ceil(target / 60);

            const updateCounter = () => {

                current += increment;

                if(current < target){

                    counter.innerText =
                    current;

                    requestAnimationFrame(
                        updateCounter
                    );

                }else{

                    let suffix = "+";

                    if(target === 98){

                        suffix = "%";

                    }

                    counter.innerText =
                    target + suffix;

                }

            };

            updateCounter();

            counterObserver.unobserve(
                counter
            );

        }

    });

},{
    threshold:.5
});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/* FAQ ACCORDION */

document.querySelectorAll(
".faq-question"
).forEach(button => {

    button.addEventListener("click", () => {

        const item =
        button.parentElement;

        document
        .querySelectorAll(".faq-item")
        .forEach(faq => {

            if(faq !== item){

                faq.classList.remove(
                    "active"
                );

            }

        });

        item.classList.toggle("active");

    });

});

/* BACK TO TOP */

const backToTop =
document.createElement("button");

backToTop.className =
"back-to-top";

backToTop.innerHTML = "↑";

document.body.appendChild(
backToTop
);

window.addEventListener(
"scroll",
() => {

    if(window.scrollY > 500){

        backToTop.classList.add(
            "show"
        );

    }else{

        backToTop.classList.remove(
            "show"
        );

    }

});

backToTop.addEventListener(
"click",
() => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

/* DARK MODE */

const darkButton =
document.createElement("button");

darkButton.innerHTML = "🌙";

darkButton.style.position =
"fixed";

darkButton.style.left =
"25px";

darkButton.style.bottom =
"25px";

darkButton.style.zIndex =
"1000";

darkButton.style.width =
"50px";

darkButton.style.height =
"50px";

darkButton.style.border =
"none";

darkButton.style.borderRadius =
"50%";

darkButton.style.cursor =
"pointer";

darkButton.style.background =
"#111827";

darkButton.style.color =
"white";

document.body.appendChild(
darkButton
);

if(
localStorage.getItem(
"dark-mode"
) === "enabled"
){

    document.body.classList.add(
        "dark-mode"
    );

}

darkButton.addEventListener(
"click",
() => {

    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        localStorage.setItem(
            "dark-mode",
            "enabled"
        );

    }else{

        localStorage.removeItem(
            "dark-mode"
        );

    }

});

/* PORTFOLIO FILTER */

const filterButtons =
document.querySelectorAll(
".filter-btn"
);

const projects =
document.querySelectorAll(
".project"
);

filterButtons.forEach(button => {

    button.addEventListener(
    "click",
    () => {

        filterButtons.forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });

        button.classList.add(
            "active"
        );

        const category =
        button.dataset.filter;

        projects.forEach(project => {

            if(
                category === "all"
            ){

                project.style.display =
                "block";

            }else{

                if(
                    project.dataset.category ===
                    category
                ){

                    project.style.display =
                    "block";

                }else{

                    project.style.display =
                    "none";

                }

            }

        });

    });

});

/* CONTACT FORM */

const contactForm =
document.querySelector(
".contact-form"
);

if(contactForm){

    contactForm.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        alert(
            "Thank you! Your message has been sent."
        );

        contactForm.reset();

    });

}

/* HEADER SHADOW */

const header =
document.querySelector(
".header"
);

window.addEventListener(
"scroll",
() => {

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.08)";

    }else{

        header.style.boxShadow =
        "none";

    }

});

/* YEAR */

const year =
document.getElementById(
"year"
);

if(year){

    year.textContent =
    new Date().getFullYear();

}

console.log(
"Divalby Agency Pro Premium Loaded"
);
