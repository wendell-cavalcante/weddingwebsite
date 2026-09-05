const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const WHATSAPP_NUMBER = '5511983184820';

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalLabel = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Redirecionando...';
    }

    const nome = contactForm.nome ? contactForm.nome.value.trim() : '';
    const email = contactForm.email ? contactForm.email.value.trim() : '';
    const telefone = contactForm.telefone ? contactForm.telefone.value.trim() : '';
    const dataEvento = contactForm.data_evento ? contactForm.data_evento.value : '';
    const mensagem = contactForm.mensagem ? contactForm.mensagem.value.trim() : '';

    let dataFormatada = 'Não informada';
    if (dataEvento) {
      const [ano, mes, dia] = dataEvento.split('-');
      dataFormatada = `${dia}/${mes}/${ano}`;
    }

    const texto = `Olá! Vim pelo site da Essence Eventos e gostaria de conversar sobre o meu casamento.

*Nome:* ${nome}
*E-mail:* ${email}
*Telefone:* ${telefone}
*Data prevista do evento:* ${dataFormatada}

*Mensagem:*
${mensagem}`;

    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

    formStatus.textContent = 'Redirecionando para o WhatsApp...';

    window.open(link, '_blank');

    contactForm.reset();

    if (submitButton) {
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
        formStatus.textContent = '';
      }, 1500);
    }
  });
}