import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRoutes from './routes/projects.routes';
import blogRoutes from './routes/blog.routes';
import contactRoutes from './routes/contact.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://jocamassango.vercel.app', 'http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Portfolio backend rodando!');
});

app.use('/projects', projectsRoutes);
app.use('/blog', blogRoutes);
app.use('/contact', contactRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
