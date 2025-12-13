// Exemplo de API Node.js/Express para cadastro e exclusão de usuários Supabase (ES Modules)
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const supabaseUrl = 'https://wqlkizjmnhcotaosmvkd.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbGtpemptbmhjb3Rhb3NtdmtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTM1NTQyNCwiZXhwIjoyMDgwOTMxNDI0fQ.1GbZCF8JYQLUhO9zcjRXC5AkN81N6Xq6Ri-5UBp2j_Q';
const supabase = createClient(supabaseUrl, serviceRoleKey);

// Criar usuário
app.post('/api/users', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
});

// Excluir usuário
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.auth.admin.deleteUser(id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

// Iniciar servidor local
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('API backend rodando na porta', PORT);
});
