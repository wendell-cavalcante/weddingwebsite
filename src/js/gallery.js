/* =========================================================
   GALERIA — carrega fotos e vídeos direto de uma pasta
   pública do Google Drive. Basta subir arquivos na pasta
   configurada abaixo; nada mais precisa ser feito aqui.
   ========================================================= */

const DRIVE_CONFIG = {
    // Cole aqui o ID da pasta do Google Drive (veja o guia enviado no chat)
    folderId: '1Ta0StYBdCQ7OG1n5kiIzBdo3YIa34Obr',
    // Cole aqui a sua chave de API do Google Cloud (Drive API habilitada)
    apiKey: 'AIzaSyC4CFJDzCMZnn1xX7Va5UyLFdP0025ezAY',
};

const galleryGrid = document.getElementById('galleryGrid');
const galleryStatus = document.getElementById('galleryStatus');

const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let mediaItems = [];
let currentIndex = 0;

function driveThumbUrl(id, width) {
    return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

function driveEmbedUrl(id) {
    return `https://drive.google.com/file/d/${id}/preview`;
}

async function loadGallery() {
    const { folderId, apiKey } = DRIVE_CONFIG;

    if (!folderId || !apiKey || folderId.startsWith('COLE_') || apiKey.startsWith('COLE_')) {
        showStatus('A galeria ainda não foi conectada ao Google Drive. Configure o folderId e a apiKey em src/js/gallery.js.');
        return;
    }

    const fields = 'files(id,name,mimeType,createdTime)';
    const query = encodeURIComponent(`'${folderId}' in parents and trashed = false and (mimeType contains 'image/' or mimeType contains 'video/')`);
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=createdTime desc&pageSize=200&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Drive API respondeu ${response.status}`);

        const data = await response.json();
        const files = data.files || [];

        if (!files.length) {
            showStatus('Ainda não há fotos ou vídeos nesta galeria.');
            return;
        }

        mediaItems = files;
        renderGallery(files);
        galleryStatus.style.display = 'none';
    } catch (err) {
        console.error('Erro ao carregar a galeria do Google Drive:', err);
        showStatus('Não foi possível carregar as fotos agora. Tente novamente em instantes.');
    }
}

function showStatus(text) {
    if (!galleryStatus) return;
    galleryStatus.textContent = text;
    galleryStatus.style.display = 'block';
}

function renderGallery(files) {
    galleryGrid.innerHTML = '';

    files.forEach((file, index) => {
        const isVideo = file.mimeType.startsWith('video/');

        const figure = document.createElement('figure');
        figure.className = 'gallery-item' + (isVideo ? ' gallery-item--video' : '');
        figure.dataset.index = index;

        const img = document.createElement('img');
        img.src = driveThumbUrl(file.id, 800);
        img.alt = '';
        img.loading = 'lazy';
        figure.appendChild(img);

        if (isVideo) {
            const play = document.createElement('span');
            play.className = 'play-icon';
            play.innerHTML = '<i class="fa-solid fa-play"></i>';
            figure.appendChild(play);
        }

        figure.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(figure);
    });
}

function openLightbox(index) {
    currentIndex = index;
    renderLightboxMedia();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function renderLightboxMedia() {
    const file = mediaItems[currentIndex];
    if (!file) return;

    lightboxMedia.innerHTML = '';

    if (file.mimeType.startsWith('video/')) {
        const iframe = document.createElement('iframe');
        iframe.src = driveEmbedUrl(file.id);
        iframe.allow = 'autoplay';
        iframe.allowFullscreen = true;
        lightboxMedia.appendChild(iframe);
    } else {
        const img = document.createElement('img');
        img.src = driveThumbUrl(file.id, 1600);
        img.alt = '';
        lightboxMedia.appendChild(img);
    }
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxMedia.innerHTML = '';
    document.body.style.overflow = '';
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        renderLightboxMedia();
    });

    lightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        renderLightboxMedia();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });
}

loadGallery();
