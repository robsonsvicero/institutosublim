import emailjs from '@emailjs/browser';

export async function sendEmail({ to, senhaTemp }) {
  // Preencha com seus dados do EmailJS
  const serviceID = 'service_6n63rxp';
  const templateID = 'template_xpp8rnl';
  const userID = 'WAnnFBM2TnTGQQx83';

  const templateParams = {
    to_email: to,
    senha_temp: senhaTemp
  };

  console.log('Enviando EmailJS:', { serviceID, templateID, userID, templateParams });

  try {
    await emailjs.send(serviceID, templateID, templateParams, userID);
    return true;
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    return false;
  }
}
