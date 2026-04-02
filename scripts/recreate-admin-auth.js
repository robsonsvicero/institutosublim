/**
 * Script para recriar o usuário administrador no Auth
 * Uso: node scripts/recreate-admin-auth.js
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Erro: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const ADMIN_EMAIL = 'hello@svicerostudio.com.br';
const ADMIN_PASSWORD = '123456';

async function recreateAdminAuth() {
  try {
    console.log('🔄 Recriando usuário admin no Auth...');

    // 1. Listar usuários para encontrar o admin
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Erro ao listar usuários:', listError.message);
      process.exit(1);
    }

    const existingAdmin = users?.users?.find(u => u.email === ADMIN_EMAIL);

    if (existingAdmin) {
      console.log('⚠️  Deletando usuário existente...');
      const { error: deleteError } = await supabase.auth.admin.deleteUser(existingAdmin.id);
      
      if (deleteError) {
        console.error('❌ Erro ao deletar usuário:', deleteError.message);
        process.exit(1);
      }
      console.log('✅ Usuário deletado');
    }

    // 2. Criar novo usuário no Auth
    console.log('🔄 Criando novo usuário no Auth...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });

    if (authError) {
      console.error('❌ Erro ao criar usuário:', authError.message);
      process.exit(1);
    }

    console.log('✅ Usuário criado no Auth:', authData.user.id);

    // 3. Atualizar o registro na tabela usuarios com o novo auth_id
    console.log('🔄 Atualizando tabela usuarios...');
    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ 
        auth_id: authData.user.id,
        aprovado: true,
        aprovado_em: new Date().toISOString()
      })
      .eq('email', ADMIN_EMAIL);

    if (updateError) {
      console.error('❌ Erro ao atualizar:', updateError.message);
      process.exit(1);
    }

    console.log('✅ Tabela usuarios atualizada');

    console.log('\n✨ Admin recriado com sucesso!');
    console.log(`📧 Email: ${ADMIN_EMAIL}`);
    console.log(`🔐 Senha: ${ADMIN_PASSWORD}`);
    console.log(`🔑 Auth ID: ${authData.user.id}`);

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

recreateAdminAuth();
