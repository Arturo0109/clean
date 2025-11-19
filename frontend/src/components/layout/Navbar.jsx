'use client';

import React from "react";
import Link from "next/link";
import useAuth from "../../hooks/useAuth.js";

export default function Navbar() {
    const { user, isAuthenticated, logout, loading } = useAuth();

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #e6e6e6'
        }}>
            <div style={{ display: 'flex', gap: 'center', gap: '1rem' }}>
                <Link href="/" style={{ fontWeight: '700', fontSize: 18 }}>Corrector</Link>
                <Link href="/">Inicio</Link>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <span style={{ opacity: 0.8 }}>{user?.email ?? 'Usuario'}</span>
                        <button onClick={logout} style={{ cursor: 'pointer' }}>Cerrar sesión</button>
                    </>
                ) : (<>
                    <Link href="/login">Iniciar sesión</Link>
                    <Link href="/register">Registrarse</Link>
                </>)}

            </div>
        </nav>
    );
}