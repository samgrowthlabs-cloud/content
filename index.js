// ============================================
// 🎬 CONFIGURE AQUI SEU ÚLTIMO VÍDEO
// ============================================
const ULTIMO_VIDEO = {
    link: 'https://youtu.be/s_0k9bDAXxw',
    titulo: 'O DINHEIRO NÃO É O QUE VOCÊ PENSA',
    descricao: 'Conteúdo de alta qualidade sobre finanças de forma visual e compreensível. Entenda os principais conceitos financeiros que impactam sua vida.',
    data: '30 de Abril, 2026'
};
// ============================================

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

// Extrai ID do vídeo do link
function extractVideoId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

// Carrega o último vídeo na página
function carregarUltimoVideo() {
    const videoId = extractVideoId(ULTIMO_VIDEO.link);
    
    if (!videoId) {
        console.error('Link do vídeo inválido:', ULTIMO_VIDEO.link);
        return;
    }
    
    const wrapper = document.getElementById('video-wrapper');
    
    wrapper.innerHTML = `
        <iframe 
            id="youtube-frame"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        <div class="video-info">
            <h3 id="video-title">${ULTIMO_VIDEO.titulo}</h3>
            <p id="video-description">${ULTIMO_VIDEO.descricao}</p>
            <div class="video-meta">
                <span class="video-date">${ULTIMO_VIDEO.data}</span>
                <span class="video-views">Assista agora</span>
            </div>
        </div>
    `;
    
    console.log(`✅ Último vídeo carregado: ${ULTIMO_VIDEO.titulo}`);
}

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    carregarUltimoVideo();
    
    document.querySelectorAll('.video-section, .section-header, .video-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    setTimeout(() => {
        document.querySelectorAll('.video-section, .section-header, .video-wrapper').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);
    
    console.log('S-AMZIN | Site carregado com sucesso');
    console.log(`Último vídeo: ${ULTIMO_VIDEO.titulo}`);
});