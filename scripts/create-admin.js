/**
 * Script para criar o usuário administrador
 * Uso: node scripts/create-admin.js
 * 
 * Variáveis de ambiente necessárias:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
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
const ADMIN_NAME = 'Administrador';

async function createAdmin() {
  try {
    console.log('🔄 Configurando usuário administrador...');

    // 1. Tentar criar usuário no Supabase Auth (ou usar existente)
    let adminAuthId = null;
    
    // Primeiro, verificar se o usuário já existe
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Erro ao listar usuários:', listError.message);
      process.exit(1);
    }

    const existingAdmin = existingUsers?.users?.find(u => u.email === ADMIN_EMAIL);
    
    if (existingAdmin) {
      console.log('⚠️  Usuário admin já existe no Auth');
      adminAuthId = existingAdmin.id;
    } else {
      // Criar novo usuário
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true, // Confirmar e-mail automaticamente
      });

      if (authError) {
        console.error('❌ Erro ao criar usuário:', authError.message);
        process.exit(1);
      }

      console.log('✅ Usuário admin criado no Auth:', authData.user.id);
      adminAuthId = authData.user.id;
    }

    // 2. Verificar se já existe na tabela usuarios
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', ADMIN_EMAIL)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      console.error('❌ Erro ao verificar usuário:', userError.message);
      process.exit(1);
    }

    if (!userData) {
      // Usuário não existe na tabela, inserir
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([
          {
            auth_id: adminAuthId,
            email: ADMIN_EMAIL,
            nome: ADMIN_NAME,
            aprovado: true,
            aprovado_em: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        console.error('❌ Erro ao criar registro:', insertError.message);
        process.exit(1);
      }
      console.log('✅ Registro admin criado na tabela usuarios');
    } else {
      // Já existe, apenas garantir que está aprovado
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ 
          aprovado: true, 
          aprovado_em: new Date().toISOString(),
          auth_id: adminAuthId // Atualizar auth_id se necessário
        })
        .eq('email', ADMIN_EMAIL);

      if (updateError) {
        console.error('❌ Erro ao atualizar registro:', updateError.message);
        process.exit(1);
      }
      console.log('✅ Registro admin atualizado (aprovado)');
    }

    console.log('\n✨ Administrador configurado com sucesso!');
    console.log(`📧 Email: ${ADMIN_EMAIL}`);
    console.log(`🔐 Senha: ${ADMIN_PASSWORD}`);
    console.log('\n⚠️  IMPORTANTE: Altere a senha no primeiro login em /alterar-senha');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

createAdmin();
