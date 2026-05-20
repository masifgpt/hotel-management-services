/**
 * Aura Stay Operational Frontend Controller Suite
 * Engineered with performant vanilla mechanisms tracking user UI state modifications.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Core Architecture Nodes Selection
    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");
    const backToTopBtn = document.getElementById("back-to-top");
    const themeToggleBtn = document.getElementById("theme-toggle");

    /* ==========================================================================
       1. Preloader Initialization Sequence
       ========================================================================== */
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        });
        // Safety execution checkpoint in case load event already completed processing
        if (document.readyState === "complete") {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.style.display = "none", 500);
        }
    }

    /* ==========================================================================
       2. Sticky Header Lifecycle & Back to Top Monitoring
       ========================================================================== */
    window.addEventListener("scroll", () => {
        const scrollMetric = window.scrollY;

        // Sticky Navbar Toggle Parameters
        if (scrollMetric > 50) {
            header.classList.add("sticky-active");
        } else {
            header.classList.remove("sticky-active");
        }

        // Floating Node Back-To-Top Trigger Line
        if (scrollMetric > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ==========================================================================
       3. Mobile Navigation Hamburger State Transition Engine
       ========================================================================== */
    if (hamburger && navbar) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navbar.classList.toggle("active");
            // Block global page overflow vectors when layout mask is running
            document.body.style.overflow = navbar.classList.contains("active") ? "hidden" : "";
        });

        // Close Mobile Menu Interface upon capturing internal child node navigation executions
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navbar.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

    /* ==========================================================================
       4. Persistent Client System Theme Initialization Toggle
       ========================================================================== */
    if (themeToggleBtn) {
        const storedThemeState = localStorage.getItem("aura-theme-state") || "light";
        document.documentElement.setAttribute("data-theme", storedThemeState);
        updateThemeToggleIconButton(storedThemeState);

        themeToggleBtn.addEventListener("click", () => {
            const systemActiveTheme = document.documentElement.getAttribute("data-theme");
            const targetedThemeState = systemActiveTheme === "light" ? "dark" : "light";
            
            document.documentElement.setAttribute("data-theme", targetedThemeState);
            localStorage.setItem("aura-theme-state", targetedThemeState);
            updateThemeToggleIconButton(targetedThemeState);
        });
    }

    function updateThemeToggleIconButton(activeTheme) {
        const iconNode = themeToggleBtn.querySelector("i");
        if (iconNode) {
            iconNode.className = activeTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
        }
    }

    /* ==========================================================================
       5. Portfolio Grid Categorization Filter Sub-System (Rooms Domain)
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Adjust Active Button Control State Layout indicators
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const targetedCategoryFilter = btn.getAttribute("data-filter");

                portfolioItems.forEach(item => {
                    const itemClassification = item.getAttribute("data-category");
                    if (targetedCategoryFilter === "all" || itemClassification === targetedCategoryFilter) {
                        item.classList.remove("hidden");
                    } else {
                        item.classList.add("hidden");
                    }
                });
            });
        });
    }

    /* ==========================================================================
       6. Testimonials Slider Layout Carousels Core Loop
       ========================================================================== */
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    const nextBtn = document.getElementById("next-testimonial");
    const prevBtn = document.getElementById("prev-testimonial");
    let activeSlideIndex = 0;

    if (testimonialSlides.length > 0) {
        function showTargetedTestimonial(targetIndex) {
            testimonialSlides.forEach(slide => slide.classList.remove("active"));
            
            if (targetIndex >= testimonialSlides.length) activeSlideIndex = 0;
            else if (targetIndex < 0) activeSlideIndex = testimonialSlides.length - 1;
            else activeSlideIndex = targetIndex;

            testimonialSlides[activeSlideIndex].classList.add("active");
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => showTargetedTestimonial(activeSlideIndex + 1));
            prevBtn.addEventListener("click", () => showTargetedTestimonial(activeSlideIndex - 1));
        }

        // Automatic Rotational Framework execution timing signature parameters
        setInterval(() => {
            showTargetedTestimonial(activeSlideIndex + 1);
        }, 8000);
    }

    /* ==========================================================================
       7. Accordion Collapsible Logic (FAQ UI Blocks)
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(headerNode => {
        headerNode.addEventListener("click", () => {
            const activeParentItem = headerNode.parentElement;
            const contentBodyNode = activeParentItem.querySelector(".accordion-body");
            const isActiveState = activeParentItem.classList.contains("active");

            // Mutual Accordion Locking Mechanics
            document.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".accordion-body").style.maxHeight = null;
            });

            if (!isActiveState) {
                activeParentItem.classList.add("active");
                contentBodyNode.style.maxHeight = contentBodyNode.scrollHeight + "px";
            }
        });
    });

    /* ==========================================================================
       8. Automated Statistics Numerical Increment Counters Engine
       ========================================================================== */
    const statisticsCounterNodes = document.querySelectorAll(".counter");
    
    if (statisticsCounterNodes.length > 0) {
        const statsSectionObserver = new IntersectionObserver((observedEntries, internalObserverInstance) => {
            observedEntries.forEach(entry => {
                if (entry.isIntersecting) {
                    executeNumericalCounterSpinSequence();
                    internalObserverInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Target parent wrapper section context element parameters safely
        const triggerWhySection = document.querySelector(".section-why");
        if (triggerWhySection) statsSectionObserver.observe(triggerWhySection);
    }

    function executeNumericalCounterSpinSequence() {
        statisticsCounterNodes.forEach(counterNode => {
            const calculationTargetValue = parseInt(counterNode.getAttribute("data-target"), 10);
            let temporaryCurrentValue = 0;
            const iterationStepValue = Math.ceil(calculationTargetValue / 50); // Scale timing accurately

            const operationIntervalTimer = setInterval(() => {
                temporaryCurrentValue += iterationStepValue;
                if (temporaryCurrentValue >= calculationTargetValue) {
                    counterNode.innerText = calculationTargetValue;
                    clearInterval(operationIntervalTimer);
                } else {
                    counterNode.innerText = temporaryCurrentValue;
                }
            }, 30);
        });
    }

    /* ==========================================================================
       9. Scroll Reveal Interactive Visual Layer Controller
       ========================================================================== */
    const revealTargetNodes = document.querySelectorAll(".scroll-reveal, .reveal-anim");
    
    if (revealTargetNodes.length > 0) {
        const visualRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    visualRevealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargetNodes.forEach(node => visualRevealObserver.observe(node));
    }

    /* ==========================================================================
       10. Form Syntax Validation Matrices (Contact & Booking Ports)
       ========================================================================== */
    
    // Contact Form Checking Setup
    const contactFormNode = document.getElementById("contact-form");
    if (contactFormNode) {
        contactFormNode.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValidationClear = true;

            const nameInput = document.getElementById("contact_name");
            const emailInput = document.getElementById("contact_email");
            const msgInput = document.getElementById("contact_msg");

            if (nameInput.value.trim().length < 2) {
                toggleFieldValidationErrorState(nameInput, true);
                isValidationClear = false;
            } else {
                toggleFieldValidationErrorState(nameInput, false);
            }

            if (!validateEmailSyntaxPattern(emailInput.value)) {
                toggleFieldValidationErrorState(emailInput, true);
                isValidationClear = false;
            } else {
                toggleFieldValidationErrorState(emailInput, false);
            }

            if (msgInput.value.trim().length < 5) {
                toggleFieldValidationErrorState(msgInput, true);
                isValidationClear = false;
            } else {
                toggleFieldValidationErrorState(msgInput, false);
            }

            if (isValidationClear) {
                alert("Secure Direct Data Transmission successful.");
                contactFormNode.reset();
            }
        });
    }

    // Main Suite Booking Validation Framework Setup
    const mainBookingFormNode = document.getElementById("main-booking-form");
    const successModalOverlay = document.getElementById("success-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");

    if (mainBookingFormNode) {
        mainBookingFormNode.addEventListener("submit", (e) => {
            e.preventDefault();
            let isBookingDataValid = true;

            const clientName = document.getElementById("book_name");
            const clientEmail = document.getElementById("book_email");
            const checkinDateStr = document.getElementById("book_checkin");
            const checkoutDateStr = document.getElementById("book_checkout");

            if (clientName.value.trim().length < 2) {
                toggleFieldValidationErrorState(clientName, true);
                isBookingDataValid = false;
            } else {
                toggleFieldValidationErrorState(clientName, false);
            }

            if (!validateEmailSyntaxPattern(clientEmail.value)) {
                toggleFieldValidationErrorState(clientEmail, true);
                isBookingDataValid = false;
            } else {
                toggleFieldValidationErrorState(clientEmail, false);
            }

            // Timeline logical check dependencies
            const checkInDateObj = new Date(checkinDateStr.value);
            const checkOutDateObj = new Date(checkoutDateStr.value);
            const absoluteCurrentDateObj = new Date();
            absoluteCurrentDateObj.setHours(0,0,0,0);

            if (!checkinDateStr.value || checkInDateObj < absoluteCurrentDateObj) {
                toggleFieldValidationErrorState(checkinDateStr, true);
                isBookingDataValid = false;
            } else {
                toggleFieldValidationErrorState(checkinDateStr, false);
            }

            if (!checkoutDateStr.value || checkOutDateObj <= checkInDateObj) {
                toggleFieldValidationErrorState(checkoutDateStr, true);
                isBookingDataValid = false;
            } else {
                toggleFieldValidationErrorState(checkoutDateStr, false);
            }

            if (isBookingDataValid) {
                if (successModalOverlay) {
                    successModalOverlay.classList.add("active");
                } else {
                    alert("Reservation Committed Successfully via Core Engine Terminal.");
                    mainBookingFormNode.reset();
                }
            }
        });
    }

    if (closeModalBtn && successModalOverlay) {
        closeModalBtn.addEventListener("click", () => {
            successModalOverlay.classList.remove("active");
            if (mainBookingFormNode) mainBookingFormNode.reset();
        });
    }

    /* Helper Validation Utilities */
    function toggleFieldValidationErrorState(inputDomElement, shouldErrorBeDisplayed) {
        const structuralParentGroup = inputDomElement.parentElement;
        if (structuralParentGroup) {
            if (shouldErrorBeDisplayed) {
                structuralParentGroup.classList.add("invalid");
            } else {
                structuralParentGroup.classList.remove("invalid");
            }
        }
    }

    function validateEmailSyntaxPattern(emailStringValue) {
        const rigorousRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return rigorousRegexPattern.test(emailStringValue);
    }
});