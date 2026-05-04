import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verifica se a rota exige admin e o usuário não é admin
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // Opcional: Se o usuário não for aprovado, podemos bloquear acesso ao painel inteiro
  // if (!user.aprovado && user.role !== 'admin') {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 p-4">
  //       <div className="bg-yellow-50 text-yellow-800 p-6 rounded shadow-md max-w-md text-center">
  //         Sua conta está aguardando aprovação do administrador. Volte mais tarde.
  //       </div>
  //     </div>
  //   );
  // }

  return children;
}
