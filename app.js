'use strict';

// This function runs once the DOM is fully loaded
function main() {

    // 1. INIT SMOOTH SCROLL (LENIS)
    //-----------------------------------------------
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    
    
    // 2. INIT CUSTOM CURSOR
    //-----------------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('.nav-link');

    // Move cursor
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            duration: 0.2,
            x: e.clientX,
            y: e.clientY
        });
    });

    // Add hover effect for links
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { 
                duration: 0.3,
                scale: 3, // Enlarge cursor
                backgroundColor: '#ffffff',
                mixBlendMode: 'difference'
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { 
                duration: 0.3,
                scale: 1, // Return to normal
                backgroundColor: '#1a1a1a',
                mixBlendMode: 'normal'
            });
        });
    });


    // 3. INIT INTRO ANIMATION (Hero Title)
    //-----------------------------------------------
    // Animate the hero title spans on page load
    gsap.from(".hero-title span", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        delay: 0.5
    });

    
    // 4. INIT SCROLL-TRIGGERED ANIMATIONS
    //-----------------------------------------------
    
    // Use GSAP's responsive tool
    ScrollTrigger.matchMedia({

        // --- DESKTOP ANIMATIONS ---
        "(min-width: 769px)": function() {
            
            // a) Parallax Background
            gsap.to(".parallax-bg", {
                yPercent: 30, // Move background down by 30% of its height
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax-section",
                    start: "top bottom", // when top of section hits bottom of viewport
                    end: "bottom top",   // when bottom of section hits top of viewport
                    scrub: true          // Links animation to scroll position
                }
            });

            // b) Image Reveal
            gsap.to(".image-reveal-container img", {
                clipPath: "inset(0% 0% 0% 0%)", // Animates to full reveal
                ease: "power3.out",
                duration: 1.5,
                scrollTrigger: {
                    trigger: ".image-reveal-container",
                    start: "top 70%", // Starts when 70% of the viewport is hit
                    toggleActions: "play none none none"
                }
            });

        },

        // --- ALL SIZES (Desktop + Mobile) ---
        "all": function() {
            
            // c) Fade-in-Up Animations
            // Target all elements with the class '.fade-in-up'
            gsap.utils.toArray('.fade-in-up').forEach(elem => {
                gsap.to(elem, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });

        }
    });

}

// Run the main function after the page is loaded
window.addEventListener('DOMContentLoaded', main);