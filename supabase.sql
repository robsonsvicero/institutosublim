create extension if not exists pgcrypto;

-- Criação da tabela de depoimentos
create table if not exists depoimentos (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  nome text not null,
  texto text not null,
  avatar_url text,
  -- campos para voluntários
  role text,
  area text,
  -- campos para beneficiados
  idade text,
  localizacao text,
  transformacao_de text,
  transformacao_para text,
  doacao text,
  -- controle
  ativo boolean default true,
  ordem integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

do $$
declare c record;
begin
  for c in
    select conname
    from pg_constraint
    where conrelid = 'depoimentos'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%tipo%'
  loop
    execute format('alter table depoimentos drop constraint %I', c.conname);
  end loop;
end $$;

alter table depoimentos
  add constraint depoimentos_tipo_check
  check (tipo in ('voluntario', 'beneficiado', 'parceiro'));

create unique index if not exists depoimentos_tipo_nome_unique_idx
  on depoimentos (tipo, nome);

-- RLS
alter table depoimentos enable row level security;
drop policy if exists "Leitura pública de depoimentos ativos" on depoimentos;
create policy "Leitura pública de depoimentos ativos" on depoimentos
  for select using (ativo = true);
drop policy if exists "Admin pode tudo em depoimentos" on depoimentos;
create policy "Admin pode tudo em depoimentos" on depoimentos
  for all using (auth.role() = 'authenticated');

-- Seed: depoimentos de voluntários (BeVolunteer)
insert into depoimentos (tipo, nome, texto, avatar_url, role, area, ordem) values
  ('voluntario', 'Cristiane', 'Sou pedagoga e voluntária no Instituto Sublim porque acredito na transformação pela educação. Entrei para ajudar os outros, mas descobri que o voluntariado transforma também a nossa vida: traz compromisso, alegria na alma e muito amor. Se você pensa em ser voluntário, vá atrás, porque isso muda a sua vida.', '/images/volunteer1.jpg', 'Voluntária desde 2022', 'Pedagoga', 1),
  ('voluntario', 'Carol Andrade', 'Sou a Carol Andrade, gestora de projetos sociais. Para mim, ser um agente de mudança na vida das pessoas é ter empatia, responsabilidade e se dedicar para fazer uma transformação no mundo.', '/images/carol_.png', 'Voluntária desde 2018', 'Gestora de Projetos Sociais', 2),
  ('voluntario', 'Diana', 'Ser voluntária me permitiu criar conexões, ter um sentido maior de propósito de vida, além de fazer diferença na comunidade e na vida de muitas pessoas.', '/images/volunteer3.jpg', 'Voluntária desde 2021', 'Consultora Jurídica', 3)
on conflict (tipo, nome) do update set
  texto = excluded.texto,
  avatar_url = excluded.avatar_url,
  role = excluded.role,
  area = excluded.area,
  ordem = excluded.ordem,
  ativo = true;

-- Seed: depoimentos de beneficiados (OurProjects)
insert into depoimentos (tipo, nome, texto, avatar_url, idade, localizacao, ordem) values
  ('beneficiado', 'André', '"Eu sou o André e adoro a aula de música, os professores são muito bons e me sinto feliz quando estou lá. Meu instrumento favorito é o cajon."', '/images/volunteer1.jpg', '10', 'Mandaqui, SP', 1),
  ('beneficiado', 'Maria', '"Eu sou a Maria e amo as aulas; gosto muito da meia lua e sinto que estou aprendendo bastante. Isso tem feito muito bem pra mim."', '/images/volunteer2.jpg', '12', 'Mandaqui, SP', 2),
  ('beneficiado', 'Beatriz', '"Minha filha Beatriz tem TDAH e enfrentou muitas dificuldades na escola. No projeto Inclusão em Foco ela se sente incluída e acolhida, faz música, computação e reforço, e aguarda ansiosa o dia de ir. Eu também fui muito bem recebida. Peço a Deus que esse projeto nunca pare, porque faz muito bem para ela e para muitas outras crianças."', '/images/volunteer1.jpg', '37', 'Mandaqui, SP', 3),
  ('beneficiado', 'Mary Jane', '"Eu gostei muito das aulas de música. Música faz bem pra cabeça, pro coração e pro corpo. Foi uma experiência muito boa e o professor é muito talentoso. Obrigado por tudo."', '/images/volunteer2.jpg', '15', 'ZN, SP', 4)
on conflict (tipo, nome) do update set
  texto = excluded.texto,
  avatar_url = excluded.avatar_url,
  idade = excluded.idade,
  localizacao = excluded.localizacao,
  ordem = excluded.ordem,
  ativo = true;

-- Seed: depoimentos de parceiros (BePartner)
insert into depoimentos (tipo, nome, texto, avatar_url, role, area, ordem) values
  ('parceiro', 'Mary Jane', 'Nossa parceria com o Instituto Sublim transformou nossa abordagem ESG. Em 18 meses, vimos 847 pessoas capacitadas com 95% de taxa de empregabilidade. O ROI social é impressionante.', '/images/avatar1.jpg', 'Diretora de Sustentabilidade', 'Parceiro 01', 1),
  ('parceiro', 'John Doe', 'O Instituto Sublim é um exemplo de eficiência e transparência. Nossa equipe se sente orgulhosa de fazer parte desta transformação real na Zona Norte de São Paulo.', '/images/avatar2.jpg', 'CEO', 'Parceiro 02', 2),
  ('parceiro', 'Selina Kyle', 'Investimos R$ 50mil e acompanhamos cada centavo sendo transformado em oportunidades reais. A transparência e os resultados superaram nossas expectativas.', '/images/avatar3.jpg', 'Head de Responsabilidade Social', 'Parceiro 03', 3)
on conflict (tipo, nome) do update set
  texto = excluded.texto,
  avatar_url = excluded.avatar_url,
  role = excluded.role,
  area = excluded.area,
  ordem = excluded.ordem,
  ativo = true;

-- Criação da tabela para cursos e oficinas
create table if not exists cursos_oficinas (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  frequency text,
  duration text,
  students text,
  next_class text,
  icon text,
  closed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Criação da tabela de usuários (para controle de aprovação e perfis)
create table if not exists usuarios (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  nome text,
  role text default 'voluntario', -- 'admin' ou 'voluntario'
  aprovado boolean default false,
  criado_em timestamp with time zone default timezone('utc'::text, now()),
  aprovado_em timestamp with time zone
);

create index if not exists usuarios_email_idx on usuarios(email);
create index if not exists usuarios_aprovado_idx on usuarios(aprovado);

-- RLS para usuários
alter table usuarios enable row level security;

drop policy if exists "Usuários podem ver seu próprio perfil" on usuarios;
create policy "Usuários podem ver seu próprio perfil" on usuarios
  for select using (auth.uid() = auth_id);

drop policy if exists "Admin pode tudo em usuarios" on usuarios;
create policy "Admin pode tudo em usuarios" on usuarios
  for all using (
    auth.email() = 'hello@svicerostudio.com.br' OR
    auth.email() = 'robsonsvicero@outlook.com' OR
    (select role from usuarios where auth_id = auth.uid()) = 'admin'
  );

drop policy if exists "Usuário pode atualizar seu próprio email/nome" on usuarios;
create policy "Usuário pode atualizar seu próprio email/nome" on usuarios
  for update using (auth.uid() = auth_id) 
  with check (auth.uid() = auth_id);

drop policy if exists "Permitir usuário inserir seu próprio perfil" on usuarios;
create policy "Permitir usuário inserir seu próprio perfil" on usuarios
  for insert with check (auth.uid() = auth_id);

-- Função RPC para administradores deletarem usuários (evita uso da service_role na API Node)
create or replace function delete_user_admin(user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  is_admin boolean;
begin
  -- Verifica se quem está chamando a função é um admin
  select (role = 'admin') into is_admin from public.usuarios where auth_id = auth.uid();
  
  if auth.email() = 'hello@svicerostudio.com.br' or auth.email() = 'robsonsvicero@outlook.com' then
    is_admin := true;
  end if;

  if not is_admin then
    raise exception 'Unauthorized: Only admins can delete users';
  end if;

  -- Deleta o usuário da tabela auth.users. 
  -- Como a tabela public.usuarios tem 'on delete cascade', o registro público também será apagado.
  delete from auth.users where id = user_id;
end;
$$;

-- Criação da tabela para pagamentos PIX
create table if not exists pagamentos_pix (
  id uuid primary key default gen_random_uuid(),
  valor numeric not null,
  status text default 'pendente' check (status in ('pendente', 'pago', 'expirado', 'cancelado')),
  cora_id text, -- ID retornado pela API da Cora
  qr_code_base64 text,
  qr_code_copia_cola text,
  txid text,
  doador_nome text,
  doador_email text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS para pagamentos PIX
alter table pagamentos_pix enable row level security;

-- Usuários não autenticados (visitantes) podem criar um novo pagamento PIX
drop policy if exists "Permitir inserção anônima de PIX" on pagamentos_pix;
create policy "Permitir inserção anônima de PIX" on pagamentos_pix
  for insert with check (true);

-- Visitantes podem ler apenas o PIX que acabaram de criar (baseado no ID)
drop policy if exists "Permitir leitura pública de PIX" on pagamentos_pix;
create policy "Permitir leitura pública de PIX" on pagamentos_pix
  for select using (true);

-- Admins podem gerenciar todos os PIX
drop policy if exists "Admin pode gerenciar PIX" on pagamentos_pix;
create policy "Admin pode gerenciar PIX" on pagamentos_pix
  for all using (
    auth.email() = 'hello@svicerostudio.com.br' OR
    auth.email() = 'robsonsvicero@outlook.com' OR
    (select role from usuarios where auth_id = auth.uid()) = 'admin'
  );

