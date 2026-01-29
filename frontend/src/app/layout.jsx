'use client';

import React from "react";
import './globals.css';
import { AuthProvider } from "../context/AuthContext.jsx";
import Navbar from "../components/layout/Navbar.jsx";

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <AuthProvider>
                    <Navbar />
                    <main style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}