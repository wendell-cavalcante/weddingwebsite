const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const WHATSAPP_NUMBER = '5511983184820';

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = contactForm.nome.value.trim();
    const email = contactForm.email.value.trim();
    const telefone = contactForm.telefone.value.trim();
    const dataEvento = contactForm.data_evento.value;
    const mensagem = contactForm.mensagem.value.trim();

    let dataFormatada = 'Não informada';
    if (dataEvento) {
        const [ano, mes, dia] = dataEvento.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
    }

    const texto =
`Olá! Vim pelo site da Essence Eventos e gostaria de conversar sobre o meu casamento.

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
});