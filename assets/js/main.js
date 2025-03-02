/**
 * StartP - Template Clone
 * Main JavaScript File
 */

(function($) {
    'use strict';

    // Theme Toggle Function
    function initThemeToggle() {
        const themeSwitch = document.getElementById('theme-switch');
        const htmlElement = document.documentElement;
        
        // Check for saved theme preference or use the OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Function to update hero image based on theme
        function updateHeroImage(isDark) {
            const heroImage = document.querySelector('.hero-image img');
            if (heroImage) {
                heroImage.src = isDark 
                    ? 'assets/images/darker-main-pic.png' 
                    : 'assets/images/main-pic.png';
            }
        }
        
        // Set initial state based on preference or OS
        if (savedTheme === 'light') {
            htmlElement.classList.remove('dark-mode');
            themeSwitch.checked = false;
            updateHeroImage(false);
        } else if (savedTheme === 'dark') {
            htmlElement.classList.add('dark-mode');
            themeSwitch.checked = true;
            updateHeroImage(true);
        } else {
            // If no saved preference, use OS preference
            if (prefersDarkMode) {
                htmlElement.classList.add('dark-mode');
                themeSwitch.checked = true;
                updateHeroImage(true);
            } else {
                htmlElement.classList.remove('dark-mode');
                themeSwitch.checked = false;
                updateHeroImage(false);
            }
        }
        
        // Initialize particles based on current theme
        initParticles();
        
        // Add event listener for toggle changes
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                htmlElement.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                updateHeroImage(true);
            } else {
                htmlElement.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                updateHeroImage(false);
            }
            
            // Update particles when theme changes
            initParticles();
        });
        
        // Listen for OS theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    htmlElement.classList.add('dark-mode');
                    themeSwitch.checked = true;
                    updateHeroImage(true);
                } else {
                    htmlElement.classList.remove('dark-mode');
                    themeSwitch.checked = false;
                    updateHeroImage(false);
                }
                
                // Update particles when OS theme changes
                initParticles();
            }
        });
    }

    // Preloader
    $(window).on('load', function() {
        $('.preloader').fadeOut(500, function() {
            // Initialize theme toggle after preloader is done
            initThemeToggle();
        });
    });

    // Sticky Header
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
        }
    });

    // Smooth Scrolling
    $('a.nav-link').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // Mobile Nav Toggle
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // Testimonials Slider
    $('.testimonials-slides').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    // Partners Slider
    $('.partner-slides').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            1200: {
                items: 6
            }
        }
    });

    // Popup Video
    $('.popup-youtube').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // WOW JS
    new WOW().init();

    // Back to top button
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn(200);
        } else {
            $('.back-to-top').fadeOut(200);
        }
    });

    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
    });

    // Particles.js for hero section with theme awareness
    function initParticles() {
        if ($('#particles-js').length) {
            // Check if dark mode is active
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            
            // Set colors based on theme
            const particleColor = isDarkMode ? '#3d84fb' : '#0e314c';
            const lineColor = isDarkMode ? '#3d84fb' : '#0e314c';
            
            // Clear existing particles if any
            if (window.pJSDom && window.pJSDom.length > 0) {
                window.pJSDom[0].pJS.fn.vendors.destroypJS();
                window['pJSDom'] = [];
            }
            
            // Initialize particles with theme-appropriate colors
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 120,
                        density: {
                            enable: true,
                            value_area: 1000
                        }
                    },
                    color: {
                        value: particleColor
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 4,
                            size_min: 0.3,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: lineColor,
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'window',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 0.8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 8
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

})(jQuery); 