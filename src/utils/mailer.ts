import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail({ name, email, message }: ContactPayload) {
  const mailToOwner = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: `📨 Nova mensagem de contato de ${name}`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9;">
      <h2 style="color: #2a2a2a;">📬 Nova mensagem recebida</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <div style="padding: 10px; background-color: #fff; border-left: 4px solid #0ea6a9ff; margin: 10px 0;">
        <p style="white-space: pre-line; margin: 0;">${message}</p>
      </div>

      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ccc;" />
      <footer style="font-size: 12px; color: #888;">
        <p>Este e-mail foi enviado automaticamente através do formulário de contato do portfólio.</p>
        <p><em>Machine Sales &copy; ${new Date().getFullYear()}</em></p>
      </footer>
    </div>
  `,
  };


  const mailToSender = {
    from: `"Jorge Massango" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✅ Recebi sua mensagem, ${name}!`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
      <h2 style="color: #20cccf;">Obrigado pelo contato, ${name}!</h2>
      <p>Recebi sua mensagem e quero agradecer por entrar em contato. 😊</p>
      <p>Em breve retornarei — normalmente respondo dentro de <strong>48 horas úteis</strong>.</p>
      
      <p>Enquanto isso, fique à vontade para explorar meus projetos ou me seguir nas redes sociais.</p>

      <br />
      <p>Com os melhores cumprimentos,</p>
      <p><strong>Jorge Massango</strong><br />
      <a href="mailto:${process.env.EMAIL_USER}" style="color: #0ea6a9ff; text-decoration: none;">${process.env.EMAIL_USER}</a></p>

      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ccc;" />
      <footer style="font-size: 12px; color: #888;">
        <p>Esta é uma mensagem automática. Não é necessário respondê-la.</p>
        <p>Portfólio: <a href="https://jocamassango.com" target="_blank" style="color: #0ea6a9ff;">jocamassango.com</a> |
        Instagram: <a href="https://instagram.com/mr_joca" target="_blank" style="color: #0ea6a9ff;">@mr_joca</a></p>
        <p><em>Jorge Massango &copy; ${new Date().getFullYear()}</em></p>
      </footer>
    </div>
  `,
  };


  await Promise.all([
    transporter.sendMail(mailToOwner),
    transporter.sendMail(mailToSender),
  ]);
}
