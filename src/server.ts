import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import projectsRoutes from './routes/projects.routes';
import blogRoutes from './routes/blog.routes';
import contactRoutes from './routes/contact.routes';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://jocamassango.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors());

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
