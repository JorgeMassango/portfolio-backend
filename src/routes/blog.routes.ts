import { Router } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Erro ao buscar blogs.' });
  }

  return res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Blog não encontrado.' });
  }

  return res.json(data);
});

router.post('/', async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
  }

  const { data, error } = await supabase
    .from('blogs')
    .insert([{ title, content, image }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: 'Erro ao criar blog.' });
  }

  return res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  const { data, error } = await supabase
    .from('blogs')
    .update({ title, content, image })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: 'Erro ao atualizar blog.' });
  }

  return res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: 'Erro ao deletar blog.' });
  }

  return res.status(204).send();
});

export default router;
