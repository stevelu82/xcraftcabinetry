document.addEventListener('DOMContentLoaded', function() {
    // Lightbox for all images
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-content"><span class="lightbox-close">&times;</span><img id="lightbox-img"></div>';
    lightbox.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.95);display:none;justify-content:center;align-items:center;z-index:999999;cursor:pointer;';
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxContent = lightbox.querySelector('.lightbox-content');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Add lightbox to all clickable images
    function attachLightbox() {
        const selectors = ['.product-image img', '.showcase-item img', '.portfolio-card img', '.blog-image img', '.gallery-item img', '.granite-card img', '.marble-showcase .granite-card img', '.quartzite-showcase .granite-card img', '.porcelain-showcase .granite-card img', '.backsplash-showcase .granite-card img', '.vinyl-showcase .granite-card img', '.ceramic-showcase .granite-card img', '.pavers-showcase .granite-card img'];
        document.querySelectorAll(selectors.join(', ')).forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(this.src);
            });
        });
    }

    attachLightbox();

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === lightboxContent || e.target === lightboxImg) {
            closeLightbox();
        }
    });

    lightboxClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            if (!navMenu.classList.contains('active')) {
                document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
                    item.classList.remove('dropdown-open');
                    const itemLink = item.querySelector('.nav-link');
                    if (itemLink) itemLink.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    document.querySelectorAll('.nav-item.dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!window.matchMedia('(max-width: 992px)').matches) {
                return;
            }

            e.preventDefault();
            const currentItem = this.closest('.nav-item');
            const isOpen = currentItem.classList.contains('dropdown-open');

            document.querySelectorAll('.nav-item.dropdown-open').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('dropdown-open');
                    const itemLink = item.querySelector('.nav-link');
                    if (itemLink) itemLink.setAttribute('aria-expanded', 'false');
                }
            });

            currentItem.classList.toggle('dropdown-open', !isOpen);
            this.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    // Handle footer product links on products page
    document.querySelectorAll('.footer-col a[href^="products.html#"], a[href^="products.html#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href').split('#')[1];
            const targetTab = document.querySelector('.filter-tab[data-filter="' + hash + '"]');
            if (targetTab) {
                e.preventDefault();
                filterTabs.forEach(t => t.classList.remove('active'));
                targetTab.classList.add('active');
                applyFilter(hash);
                const targetId = 'tab-' + hash;
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    function applyFilter(filter) {
        const euroStyleHeaders = document.querySelectorAll('.euro-style-header');
        euroStyleHeaders.forEach(header => {
            header.style.display = filter === 'flatpanel' ? 'block' : 'none';
        });

        const closetsHeaders = document.querySelectorAll('.closets-header');
        closetsHeaders.forEach(header => {
            header.style.display = filter === 'closets' ? 'block' : 'none';
        });

        productCards.forEach(card => {
            if (filter === 'all') {
                card.classList.toggle('hidden', card.dataset.category === 'accessories');
            } else if (card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        const brandsSection = document.querySelector('.brands-section');
        const graniteSection = document.querySelector('.granite-showcase');
        const quartzSection = document.querySelector('.quartz-showcase');
        const marbleSection = document.querySelector('.marble-showcase');
        const quartziteSection = document.querySelector('.quartzite-showcase');
        const porcelainSection = document.querySelector('.porcelain-showcase');
        const backsplashSection = document.querySelector('.backsplash-showcase');
        const vinylSection = document.querySelector('.vinyl-showcase');
        const ceramicSection = document.querySelector('.ceramic-showcase');
        const paversSection = document.querySelector('.pavers-showcase');
        const flooringBrandsSection = document.querySelector('.flooring-brands');
        
        if (filter === 'countertops') {
            if (brandsSection) brandsSection.style.display = 'block';
            if (graniteSection) graniteSection.style.display = 'block';
            if (quartzSection) quartzSection.style.display = 'block';
            if (marbleSection) marbleSection.style.display = 'block';
            if (quartziteSection) quartziteSection.style.display = 'block';
            if (porcelainSection) porcelainSection.style.display = 'none';
            if (backsplashSection) backsplashSection.style.display = 'none';
            if (vinylSection) vinylSection.style.display = 'none';
            if (ceramicSection) ceramicSection.style.display = 'none';
            if (paversSection) paversSection.style.display = 'none';
            if (flooringBrandsSection) flooringBrandsSection.style.display = 'none';
        } else if (filter === 'flooring') {
            if (brandsSection) brandsSection.style.display = 'none';
            if (graniteSection) graniteSection.style.display = 'none';
            if (quartzSection) quartzSection.style.display = 'none';
            if (marbleSection) marbleSection.style.display = 'none';
            if (quartziteSection) quartziteSection.style.display = 'none';
            if (porcelainSection) porcelainSection.style.display = 'block';
            if (backsplashSection) backsplashSection.style.display = 'none';
            if (vinylSection) vinylSection.style.display = 'block';
            if (ceramicSection) ceramicSection.style.display = 'block';
            if (paversSection) paversSection.style.display = 'block';
            if (flooringBrandsSection) flooringBrandsSection.style.display = 'block';
        } else if (filter === 'backsplash') {
            if (brandsSection) brandsSection.style.display = 'none';
            if (graniteSection) graniteSection.style.display = 'none';
            if (quartzSection) quartzSection.style.display = 'none';
            if (marbleSection) marbleSection.style.display = 'none';
            if (quartziteSection) quartziteSection.style.display = 'none';
            if (porcelainSection) porcelainSection.style.display = 'none';
            if (backsplashSection) backsplashSection.style.display = 'block';
            if (vinylSection) vinylSection.style.display = 'none';
            if (ceramicSection) ceramicSection.style.display = 'none';
            if (paversSection) paversSection.style.display = 'none';
            if (flooringBrandsSection) flooringBrandsSection.style.display = 'none';
        } else {
            if (brandsSection) brandsSection.style.display = 'none';
            if (graniteSection) graniteSection.style.display = 'none';
            if (quartzSection) quartzSection.style.display = 'none';
            if (marbleSection) marbleSection.style.display = 'none';
            if (quartziteSection) quartziteSection.style.display = 'none';
            if (porcelainSection) porcelainSection.style.display = 'none';
            if (backsplashSection) backsplashSection.style.display = 'none';
            if (vinylSection) vinylSection.style.display = 'none';
            if (ceramicSection) ceramicSection.style.display = 'none';
            if (paversSection) paversSection.style.display = 'none';
            if (flooringBrandsSection) flooringBrandsSection.style.display = 'none';
        }
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            applyFilter(this.dataset.filter);
        });
    });

    // Navigation dropdown filter links - handle clicks to scroll to section
    const filterLinks = document.querySelectorAll('.filter-link');
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const filter = this.dataset.filter;
            
            // Check if we're on products page or will navigate to products page
            if (href && href.includes('products.html')) {
                // If already on products page, handle the filter directly
                if (window.location.pathname.includes('products.html') || window.location.pathname.endsWith('/')) {
                    e.preventDefault();
                    window.location.hash = filter;
                    
                    // Apply the filter
                    const targetTab = document.querySelector('.filter-tab[data-filter="' + filter + '"]');
                    if (targetTab) {
                        filterTabs.forEach(t => t.classList.remove('active'));
                        targetTab.classList.add('active');
                        applyFilter(filter);
                        setTimeout(() => {
                            targetTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 50);
                    }
                }
            }
        });
    });

    // Handle hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.replace('#', '');
        if (hash && hash.length > 0) {
            const targetTab = document.querySelector('.filter-tab[data-filter="' + hash + '"]');
            if (targetTab) {
                filterTabs.forEach(t => t.classList.remove('active'));
                targetTab.classList.add('active');
                applyFilter(hash);
                targetTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Show all products on page load (check for hash filter)
    function initFilter() {
        const hash = window.location.hash.replace('#', '');
        const allTab = document.querySelector('.filter-tab[data-filter="all"]');
        const brandsSection = document.querySelector('.brands-section');
        const graniteSection = document.querySelector('.granite-showcase');
        const quartzSection = document.querySelector('.quartz-showcase');
        const marbleSection = document.querySelector('.marble-showcase');
        const quartziteSection = document.querySelector('.quartzite-showcase');
        const porcelainSection = document.querySelector('.porcelain-showcase');
        const backsplashSection = document.querySelector('.backsplash-showcase');
        const vinylSection = document.querySelector('.vinyl-showcase');
        const ceramicSection = document.querySelector('.ceramic-showcase');
        const paversSection = document.querySelector('.pavers-showcase');
        const flooringBrandsSection = document.querySelector('.flooring-brands');
        
        // Only run filter logic if we're on products page and have filter tabs
        if (!allTab) {
            return;
        }
        
        if (hash && hash.length > 0) {
            // Clear hash from URL after using it (optional - keeps URL clean)
            // window.history.replaceState(null, null, ' ');
            const targetTab = document.querySelector('.filter-tab[data-filter="' + hash + '"]');
            console.log('Processing hash:', hash, 'Target tab found:', !!targetTab);
            if (targetTab) {
                filterTabs.forEach(t => t.classList.remove('active'));
                targetTab.classList.add('active');
                applyFilter(hash);
                // Scroll to the filter tab
                setTimeout(() => {
                    targetTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                return;
            }
        }
        
        if (allTab) {
            allTab.click();
        }

        // Hide brands, granite, quartz, marble, and quartzite by default when page loads
        if (brandsSection) {
            brandsSection.style.display = 'none';
        }
        if (graniteSection) {
            graniteSection.style.display = 'none';
        }
        if (quartzSection) {
            quartzSection.style.display = 'none';
        }
        if (marbleSection) {
            marbleSection.style.display = 'none';
        }
        if (quartziteSection) {
            quartziteSection.style.display = 'none';
        }
        if (porcelainSection) {
            porcelainSection.style.display = 'none';
        }
        if (backsplashSection) {
            backsplashSection.style.display = 'none';
        }
        if (vinylSection) {
            vinylSection.style.display = 'none';
        }
        if (ceramicSection) {
            ceramicSection.style.display = 'none';
        }
        if (paversSection) {
            paversSection.style.display = 'none';
        }
        if (flooringBrandsSection) {
            flooringBrandsSection.style.display = 'none';
        }
    }
    initFilter();

    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('https://formspree.io/f/xojynajl', {
                    method: 'POST',
                    body: new FormData(quoteForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Thank you for your quote request! We will contact you within 24 hours.');
                    quoteForm.reset();
                } else {
                    alert('Something went wrong. Please try again or email us directly.');
                }
            } catch (error) {
                alert('Something went wrong. Please try again or email us directly.');
            }
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('https://formspree.io/f/xojynajl', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    alert('Thank you for your message! We will respond within 24 hours.');
                    contactForm.reset();
                } else {
                    alert('Something went wrong. Please try again or email us directly.');
                }
            } catch (error) {
                alert('Something went wrong. Please try again or email us directly.');
            }
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 1);
        dateInput.min = minDate.toISOString().split('T')[0];
    }

    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
            }
        }
    });

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .category-card, .showcase-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.feature-card, .testimonial-card, .category-card, .showcase-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });


    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let heroSlideIndex = 0;
        setInterval(function() {
            heroSlides[heroSlideIndex].classList.remove('active');
            heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
            heroSlides[heroSlideIndex].classList.add('active');
        }, 4200);
    }

    const introImage = document.querySelector('.intro-image img');
    if (introImage && window.matchMedia('(pointer: fine)').matches) {
        const introFrame = introImage.closest('.intro-image');

        introFrame.addEventListener('mousemove', function(e) {
            const rect = introFrame.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const moveX = x * 16;
            const moveY = y * 16;
            const rotateX = y * -4;
            const rotateY = x * 4;

            introImage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        });

        introFrame.addEventListener('mouseleave', function() {
            introImage.style.transform = 'translate3d(0, 0, 0) scale(1.01)';
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});




