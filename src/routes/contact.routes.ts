import { Router } from 'express';
import { sendContactEmail } from '../utils/mailer';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    await sendContactEmail({ name, email, message });

    return res.status(200).json({ message: 'Mensagem enviada com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Erro ao enviar mensagem.' });
  }
});

export default router;
