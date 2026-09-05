const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const button = contactForm.querySelector('button[type="submit"]');
        const originalLabel = button.textContent;

        button.disabled = true;
        button.textContent = 'Enviando...';

        // Simulated confirmation — connect this to your form backend of choice.
        setTimeout(() => {
            formStatus.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
            contactForm.reset();
            button.disabled = false;
            button.textContent = originalLabel;
        }, 900);
    });
}
