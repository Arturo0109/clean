'use client';

import React from "react";
import './globals.css';
import { AuthProvider } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

export default function RootLayout({children}) {
    return(
        <html lang="es">
            <head>
                <body>
                    <AuthProvider>
                        <Navbar />
                        <main style ={{padding: '1rem', maxWidth:900, margin: '0 auto'}}>
                            {children}
                        </main>
                    </AuthProvider>
                </body>
            </head>
        </html>
    );
}