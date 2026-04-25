// ============================================
// 🎬 COLE AQUI OS LINKS DOS SEUS VÍDEOS
// ============================================
const MEUS_VIDEOS = [
    {
        link: 'https://www.youtube.com/watch?v=qkIYiP84Sng',
        descricao: 'Análise profunda sobre a relação do brasileiro com instituições financeiras e como superar esse medo.'
    },
    // Cole mais vídeos aqui:
    // {
    //     link: 'https://www.youtube.com/watch?v=ID_DO_VIDEO',
    //     descricao: 'Descrição do vídeo'
    // },
    {
        link:"https://www.youtube.com/watch?v=P-3ofcXvMM4",
        descricao: ""
    },


    {
        link: "https://www.youtube.com/watch?v=rakk5cun-cU",
        descricao:"4 Hábitos que te deixam pobre",
    },

    {

        link: "https://www.youtube.com/shorts/kq1fnrPdWMw",
        descricao: ""   
    }
];
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

document.querySelectorAll('a, button, .menu-toggle, .video-card, .video-modal-close').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#FFFFFF';
    });
});

// Mobile menu
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

// Navbar scroll
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

// Criar o modal do player
function createVideoModal() {
    // Remove modal antigo se existir
    const oldModal = document.getElementById('video-modal');
    if (oldModal) oldModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-backdrop"></div>
        <div class="video-modal-content">
            <button class="video-modal-close">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="video-player-wrapper">
                <div class="video-player-container" id="player-container">
                    <iframe 
                        id="youtube-player"
                        src="" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-player-info">
                    <h3 id="modal-video-title"></h3>
                    <p id="modal-video-description"></p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal
    const closeBtn = modal.querySelector('.video-modal-close');
    const backdrop = modal.querySelector('.video-modal-backdrop');
    
    function closeModal() {
        modal.classList.remove('active');
        const iframe = modal.querySelector('#youtube-player');
        iframe.src = ''; // Para o vídeo
        document.body.style.overflow = '';
        cursor.style.display = 'block';
    }
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    return modal;
}

// Abrir vídeo no modal
function openVideoInModal(videoId, titulo, descricao) {
    let modal = document.getElementById('video-modal');
    if (!modal) {
        modal = createVideoModal();
    }
    
    const iframe = modal.querySelector('#youtube-player');
    const modalTitle = modal.querySelector('#modal-video-title');
    const modalDescription = modal.querySelector('#modal-video-description');
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modalTitle.textContent = titulo;
    modalDescription.textContent = descricao || 'Conteúdo exclusivo do canal S-AMZIN sobre finanças de forma visual e compreensível.';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    cursor.style.display = 'none';
}

// Cria card do vídeo
function createVideoCard(videoId, titulo, descricao, index) {
    const card = document.createElement('article');
    card.className = 'video-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" 
                 alt="${titulo}"
                 loading="lazy"
                 onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
            <div class="play-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" stroke="white" stroke-width="2" fill="white"/>
                </svg>
            </div>
        </div>
        <div class="video-card-info">
            <h3>${titulo}</h3>
            <p class="video-description">${descricao || 'Conteúdo exclusivo do canal S-AMZIN sobre finanças de forma visual e compreensível.'}</p>
        </div>
    `;
    
    // Clique abre o modal com player
    card.addEventListener('click', () => {
        openVideoInModal(videoId, titulo, descricao);
    });
    
    return card;
}

// Carrega todos os vídeos
function loadVideos() {
    const grid = document.getElementById('videos-grid');
    
    if (!grid) {
        console.error('Grid não encontrada');
        return;
    }
    
    grid.innerHTML = '';
    
    if (MEUS_VIDEOS.length === 0) {
        grid.innerHTML = `
            <div class="no-videos">
                <h3>Nenhum vídeo adicionado</h3>
                <p>Adicione os links no arquivo youtube.js</p>
            </div>
        `;
        return;
    }
    
    console.log(`Carregando ${MEUS_VIDEOS.length} vídeos...`);
    
    MEUS_VIDEOS.forEach((video, index) => {
        const videoId = extractVideoId(video.link);
        
        if (!videoId) {
            console.warn(`Link inválido ignorado: ${video.link}`);
            return;
        }
        
        console.log(`✅ Vídeo ${index + 1}: ${video.titulo} (${videoId})`);
        
        const card = createVideoCard(
            videoId, 
            video.titulo || 'Vídeo S-AMZIN', 
            video.descricao, 
            index
        );
        
        grid.appendChild(card);
    });
    
    // Inicializa o modal
    createVideoModal();
    
    // Anima os cards
    requestAnimationFrame(() => {
        document.querySelectorAll('.video-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });
}

// Inicia
document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
    console.log(`S-AMZIN | ${MEUS_VIDEOS.length} vídeos carregados`);
});