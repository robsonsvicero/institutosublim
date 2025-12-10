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
