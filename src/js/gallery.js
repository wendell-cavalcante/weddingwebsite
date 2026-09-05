// filtro da galeria
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach((item) => {
            const match = filter === 'todas' || item.dataset.category === filter;
            item.classList.toggle('hidden', !match);
        });
    });
});

// lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let visibleItems = [];
let currentIndex = 0;

function getVisibleItems() {
    return Array.from(galleryItems).filter((item) => !item.classList.contains('hidden'));
}

function openLightbox(item) {
    visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    updateLightboxImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
    const img = visibleItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

galleryItems.forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxImage();
    });

    lightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightboxImage();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });
}
