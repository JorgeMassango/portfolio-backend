import { Router } from 'express';
import { supabase } from '../config/supabase';

const router = Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: 'Erro ao buscar projetos.' });
  }

  return res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Projeto não encontrado.' });
  }

  return res.json(data);
});

router.post('/', async (req, res) => {
  const { title, description, url, image } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Título e descrição são obrigatórios.' });
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([{ title, description, url, image }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: 'Erro ao criar projeto.' });
  }

  return res.status(201).json(data);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, url, image } = req.body;

  const { data, error } = await supabase
    .from('projects')
    .update({ title, description, url, image })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: 'Erro ao atualizar projeto.' });
  }

  return res.json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: 'Erro ao deletar projeto.' });
  }

  return res.status(204).send();
});

export default router;
