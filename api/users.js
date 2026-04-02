// Backend Express para Railway com MongoDB
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
app.use(express.json());

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido pelo CORS'));
    }
  }
}));

// Supabase client (service role para operações admin)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar MongoDB:', err.message));

// Schema de espelho de usuários gerenciados
const usuarioSchema = new mongoose.Schema({
  supabaseId: { type: String, required: true, unique: true },
  email:      { type: String, required: true },
  criadoEm:  { type: Date, default: Date.now }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Listar usuários gerenciados (salvo no Mongo)
app.get('/api/users', async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ criadoEm: -1 });
    res.json({ users: usuarios });
  } catch (err) {
    console.error('Erro ao listar usuários:', err.message);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
});

// Criar usuário no Supabase Auth e persistir no Mongo
app.post('/api/users', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false
  });

  if (error) {
    console.error('Erro ao criar usuário no Supabase:', error.message);
    return res.status(400).json({ error: error.message });
  }

  try {
    await Usuario.create({ supabaseId: data.user.id, email });
  } catch (err) {
    console.warn('Criado no Supabase, erro ao salvar no Mongo:', err.message);
  }

  res.json({ user: data.user });
});

// Excluir usuário no Supabase Auth e remover do Mongo
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    console.error('Erro ao excluir usuário no Supabase:', error.message);
    return res.status(400).json({ error: error.message });
  }

  await Usuario.deleteOne({ supabaseId: id }).catch(() => {});

  res.json({ success: true });
});

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
