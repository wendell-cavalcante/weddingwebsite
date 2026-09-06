// lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

const items = Array.from(galleryItems);
let currentIndex = 0;

function updateLightboxImage() {
    const img = items[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

function openLightbox(item) {
    currentIndex = items.indexOf(item);
    updateLightboxImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

items.forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightboxImage();
    });

    lightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateLightboxImage();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });
}
