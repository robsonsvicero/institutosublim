import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-50 p-4 pt-20">
      <div className="w-full max-w-xs">
        <button onClick={() => navigate('/')} className="text-black hover:opacity-60 transition text-sm flex items-center gap-1">
          <i className="fas fa-arrow-left text-xs"></i> Voltar ao site
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button variant="primary" size="lg" onClick={() => navigate('/admin/cursos-oficinas')}>
          Gerenciar Cursos e Oficinas
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/admin/depoimentos')}>
          Gerenciar Depoimentos
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/alterar-senha')}>
          Alterar Minha Senha
        </Button>
        
        {isAdmin && (
          <>
            <Button variant="outline" size="lg" onClick={() => navigate('/admin/usuarios')}>
              Gerenciar Usuários
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/admin/aprovacao-usuarios')}>
              Aprovar Novos Usuários
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
