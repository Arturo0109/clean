// src/app/register/page.jsx
'use client';

import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({ email, password });
      router.push('/');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message ?? 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: '2rem auto' }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          type="email"
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña (mínimo 6 caracteres)"
          type="password"
          minLength={6}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
}
