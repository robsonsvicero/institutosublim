import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button variant="primary" size="lg" onClick={() => navigate('/admin/cursos-oficinas')}>
          Gerenciar Cursos e Oficinas
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/admin/usuarios')}>
          Gerenciar Usuários
        </Button>
      </div>
    </div>
  );
}
