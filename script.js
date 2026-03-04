<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header & Navigation Control
    const stickyHeader = document.getElementById('sticky-cta');
    const mainHeader = document.querySelector('.main-header');
    const scrollThreshold = 700;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            stickyHeader.classList.add('visible');
            mainHeader.classList.add('pushed-down');
        } else {
            stickyHeader.classList.remove('visible');
            mainHeader.classList.remove('pushed-down');
        }
    });

    // 2. Interactive Image Carousel
    const mainImage = document.getElementById('main-carousel-image');
    const thumbnails = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    const images = [
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Production',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Installation',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Stockpile',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Joint',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Application',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Texture'
    ];

    function updateCarousel(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;

        // Change image with a slight fade effect
        mainImage.style.opacity = 0;
        setTimeout(() => {
            mainImage.src = images[currentIndex];
            mainImage.style.opacity = 1;

            // Sync with zoom result background
            const res = document.getElementById("zoom-result");
            if (res) res.style.backgroundImage = "url('" + mainImage.src + "')";
        }, 150);

        // Update active thumbnail state
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateCarousel(index));
    });

    prevBtn?.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateCarousel(currentIndex + 1));

    // 3. Precision Zoom Hover Implementation
    const container = document.getElementById('zoom-container');
    const lens = document.getElementById('zoom-lens');
    const result = document.getElementById('zoom-result');

    container?.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 1150) return; // Disable zoom on tablets/mobile

        e.preventDefault();
        const pos = getCursorPos(e);
        let x = pos.x - (lens.offsetWidth / 2);
        let y = pos.y - (lens.offsetHeight / 2);

        // Prevent lens from going outside the image
        if (x > mainImage.width - lens.offsetWidth) x = mainImage.width - lens.offsetWidth;
        if (x < 0) x = 0;
        if (y > mainImage.height - lens.offsetHeight) y = mainImage.height - lens.offsetHeight;
        if (y < 0) y = 0;

        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;

        // Calculate magnification ratio
        const cx = result.offsetWidth / lens.offsetWidth;
        const cy = result.offsetHeight / lens.offsetHeight;

        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
        result.style.backgroundSize = `${mainImage.width * cx}px ${mainImage.height * cy}px`;
    });

    container?.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1150) {
            lens.style.display = 'block';
            result.style.display = 'block';
            result.style.backgroundImage = `url('${mainImage.src}')`;
        }
    });

    container?.addEventListener('mouseleave', () => {
        lens.style.display = 'none';
        result.style.display = 'none';
    });

    function getCursorPos(e) {
        const a = mainImage.getBoundingClientRect();
        const x = e.clientX - a.left;
        const y = e.clientY - a.top;
        return { x: x, y: y };
    }

    // 4. Mobile Menu Navigation Logic
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-links');

    mobileToggle?.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 5. Manufacturing Process Toggle Logic
    const processSteps = document.querySelectorAll('.process-step');
    const processTitle = document.getElementById('process-title');
    const processDesc = document.getElementById('process-desc');

    const processData = [
        { title: "High-Grade Raw Material Selection", desc: "We source only the finest PE 100 materials to ensure maximum durability and long-term performance." },
        { title: "Precision Extrusion", desc: "Advanced extrusion lines melt and shape the material into uniform pipe walls with high dimensional accuracy." },
        { title: "Controlled Cooling", desc: "Multi-stage vacuum sizing and cooling tanks stabilize the pipe structure and prevent deformation." },
        { title: "Automated Sizing", desc: "Continuous monitoring ensures every millimeter of the pipe meets specified SDR and diameter standards." },
        { title: "Rigorous Quality Control", desc: "Each batch undergoes hydrostatic pressure tests and material analysis in our state-of-the-art lab." },
        { title: "Clear Marking", desc: "Pipes are laser-marked with BIS/ISO certifications, dimensions, and batch numbers for traceability." },
        { title: "Precision Cutting", desc: "Computerized planetary saw units cut pipes to exact lengths with clean, burr-free edges." },
        { title: "Secure Packaging", desc: "Finished coils and pipes are bundled and protected for safe transport to installation sites." }
    ];

    processSteps.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            processSteps.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content with animation
            const parent = document.getElementById('process-content');
            parent.style.opacity = 0;
            setTimeout(() => {
                processTitle.innerText = processData[index].title;
                processDesc.innerText = processData[index].desc;
                parent.style.opacity = 1;
            }, 200);
        });
    });

    // 6. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all other items
            faqItems.forEach(i => i.classList.remove('open'));
            // Toggle current item
            if (!isOpen) item.classList.add('open');
        });
    });

    // 7. Versatile Applications Carousel Logic
    const appsTrack = document.getElementById('appsTrack');
    const appPrev = document.getElementById('appPrev');
    const appNext = document.getElementById('appNext');
    let appScrollPos = 0;

    function getCardWidth() {
        if (!appsTrack || appsTrack.children.length === 0) return 0;
        const card = appsTrack.children[0];
        const style = window.getComputedStyle(card);
        const margin = parseFloat(style.marginRight) || 0;
        return card.offsetWidth + 24; // Including the 24px gap defined in CSS
    }

    appNext?.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        const maxScroll = (appsTrack.children.length - 1) * cardWidth;
        if (appScrollPos < maxScroll) {
            appScrollPos += cardWidth;
        } else {
            appScrollPos = 0;
        }
        appsTrack.style.transform = `translateX(-${appScrollPos}px)`;
    });

    appPrev?.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        if (appScrollPos > 0) {
            appScrollPos -= cardWidth;
        } else {
            appScrollPos = (appsTrack.children.length - 1) * cardWidth;
        }
        appsTrack.style.transform = `translateX(-${appScrollPos}px)`;
    });

    // 8. Quote Form Submission (Prevent Default)
    const quoteForm = document.getElementById('quoteForm');
    quoteForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your quote request has been received.');
        quoteForm.reset();
    });
});
=======
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header & Navigation Control
    const stickyHeader = document.getElementById('sticky-cta');
    const mainHeader = document.querySelector('.main-header');
    const scrollThreshold = 700;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            stickyHeader.classList.add('visible');
            mainHeader.classList.add('pushed-down');
        } else {
            stickyHeader.classList.remove('visible');
            mainHeader.classList.remove('pushed-down');
        }
    });

    // 2. Interactive Image Carousel
    const mainImage = document.getElementById('main-carousel-image');
    const thumbnails = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    const images = [
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Production',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Installation',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Stockpile',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Joint',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Application',
        'https://via.placeholder.com/600x600?text=HDPE+Pipe+Texture'
    ];

    function updateCarousel(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = images.length - 1;
        if (currentIndex >= images.length) currentIndex = 0;

        // Change image with a slight fade effect
        mainImage.style.opacity = 0;
        setTimeout(() => {
            mainImage.src = images[currentIndex];
            mainImage.style.opacity = 1;

            // Sync with zoom result background
            const res = document.getElementById("zoom-result");
            if (res) res.style.backgroundImage = "url('" + mainImage.src + "')";
        }, 150);

        // Update active thumbnail state
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateCarousel(index));
    });

    prevBtn?.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateCarousel(currentIndex + 1));

    // 3. Precision Zoom Hover Implementation
    const container = document.getElementById('zoom-container');
    const lens = document.getElementById('zoom-lens');
    const result = document.getElementById('zoom-result');

    container?.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 1150) return; // Disable zoom on tablets/mobile

        e.preventDefault();
        const pos = getCursorPos(e);
        let x = pos.x - (lens.offsetWidth / 2);
        let y = pos.y - (lens.offsetHeight / 2);

        // Prevent lens from going outside the image
        if (x > mainImage.width - lens.offsetWidth) x = mainImage.width - lens.offsetWidth;
        if (x < 0) x = 0;
        if (y > mainImage.height - lens.offsetHeight) y = mainImage.height - lens.offsetHeight;
        if (y < 0) y = 0;

        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;

        // Calculate magnification ratio
        const cx = result.offsetWidth / lens.offsetWidth;
        const cy = result.offsetHeight / lens.offsetHeight;

        result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
        result.style.backgroundSize = `${mainImage.width * cx}px ${mainImage.height * cy}px`;
    });

    container?.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1150) {
            lens.style.display = 'block';
            result.style.display = 'block';
            result.style.backgroundImage = `url('${mainImage.src}')`;
        }
    });

    container?.addEventListener('mouseleave', () => {
        lens.style.display = 'none';
        result.style.display = 'none';
    });

    function getCursorPos(e) {
        const a = mainImage.getBoundingClientRect();
        const x = e.clientX - a.left;
        const y = e.clientY - a.top;
        return { x: x, y: y };
    }

    // 4. Mobile Menu Navigation Logic
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-links');

    mobileToggle?.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 5. Manufacturing Process Toggle Logic
    const processSteps = document.querySelectorAll('.process-step');
    const processTitle = document.getElementById('process-title');
    const processDesc = document.getElementById('process-desc');

    const processData = [
        { title: "High-Grade Raw Material Selection", desc: "We source only the finest PE 100 materials to ensure maximum durability and long-term performance." },
        { title: "Precision Extrusion", desc: "Advanced extrusion lines melt and shape the material into uniform pipe walls with high dimensional accuracy." },
        { title: "Controlled Cooling", desc: "Multi-stage vacuum sizing and cooling tanks stabilize the pipe structure and prevent deformation." },
        { title: "Automated Sizing", desc: "Continuous monitoring ensures every millimeter of the pipe meets specified SDR and diameter standards." },
        { title: "Rigorous Quality Control", desc: "Each batch undergoes hydrostatic pressure tests and material analysis in our state-of-the-art lab." },
        { title: "Clear Marking", desc: "Pipes are laser-marked with BIS/ISO certifications, dimensions, and batch numbers for traceability." },
        { title: "Precision Cutting", desc: "Computerized planetary saw units cut pipes to exact lengths with clean, burr-free edges." },
        { title: "Secure Packaging", desc: "Finished coils and pipes are bundled and protected for safe transport to installation sites." }
    ];

    processSteps.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            processSteps.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content with animation
            const parent = document.getElementById('process-content');
            parent.style.opacity = 0;
            setTimeout(() => {
                processTitle.innerText = processData[index].title;
                processDesc.innerText = processData[index].desc;
                parent.style.opacity = 1;
            }, 200);
        });
    });

    // 6. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all other items
            faqItems.forEach(i => i.classList.remove('open'));
            // Toggle current item
            if (!isOpen) item.classList.add('open');
        });
    });

    // 7. Versatile Applications Carousel Logic
    const appsTrack = document.getElementById('appsTrack');
    const appPrev = document.getElementById('appPrev');
    const appNext = document.getElementById('appNext');
    let appScrollPos = 0;

    function getCardWidth() {
        if (!appsTrack || appsTrack.children.length === 0) return 0;
        const card = appsTrack.children[0];
        const style = window.getComputedStyle(card);
        const margin = parseFloat(style.marginRight) || 0;
        return card.offsetWidth + 24; // Including the 24px gap defined in CSS
    }

    appNext?.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        const maxScroll = (appsTrack.children.length - 1) * cardWidth;
        if (appScrollPos < maxScroll) {
            appScrollPos += cardWidth;
        } else {
            appScrollPos = 0;
        }
        appsTrack.style.transform = `translateX(-${appScrollPos}px)`;
    });

    appPrev?.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        if (appScrollPos > 0) {
            appScrollPos -= cardWidth;
        } else {
            appScrollPos = (appsTrack.children.length - 1) * cardWidth;
        }
        appsTrack.style.transform = `translateX(-${appScrollPos}px)`;
    });

    // 8. Quote Form Submission (Prevent Default)
    const quoteForm = document.getElementById('quoteForm');
    quoteForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your quote request has been received.');
        quoteForm.reset();
    });
});
>>>>>>> 91789e0dc9a7100a94ef3ca1252b13b160b53e22
