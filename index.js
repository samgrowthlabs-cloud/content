// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Cursor hover effect on links and buttons
document.querySelectorAll('a, button, .menu-toggle').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#FFFFFF';
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Parallax effect on geometric shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shape1 = document.querySelector('.geometric-shape');
    const shape2 = document.querySelector('.geometric-shape-2');
    
    if (shape1 && shape2) {
        shape1.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.1}deg)`;
        shape2.style.transform = `translate(-50%, -50%) rotate(${45 + scrolled * 0.05}deg)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.video-section, .section-header, .video-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Auto-update video info (simulated - replace with real data when you post new videos)
function updateVideoInfo() {
    // Este é o vídeo mais recente do S-AMZIN
    const latestVideo = {
        id: 'qkIYiP84Sng',
        title: 'PORQUE BRASILEIRO TEM MEDO DE DEIXAR DINHEIRO NO BANCO',
        description: 'Conteúdo de alta qualidade sobre finanças de forma visual e compreensível. Entenda os principais conceitos financeiros que impactam sua vida.',
        date: '15 de Abril, 2026',
        views: '56 visualizações'
    };
    
    // Você pode atualizar o título e descrição aqui quando postar um vídeo novo
    document.getElementById('video-title').textContent = latestVideo.title;
    document.getElementById('video-description').textContent = latestVideo.description;
    
    // Update meta info
    const metaDate = document.querySelector('.video-date');
    const metaViews = document.querySelector('.video-views');
    if (metaDate) metaDate.textContent = latestVideo.date;
    if (metaViews) metaViews.textContent = latestVideo.views;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateVideoInfo();
    
    // Show elements with animation
    setTimeout(() => {
        document.querySelectorAll('.video-section, .section-header, .video-wrapper').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);
    
    console.log('S-AMZIN | Site carregado com sucesso');
    console.log('Último vídeo: PORQUE BRASILEIRO TEM MEDO DE DEIXAR DINHEIRO NO BANCO');
});