'use client';

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as CorrectionService from '../services/correction.service';

export default function Home() {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [correctedText, setCorrectedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        // Generate or retrieve anonymous session ID
        let sid = localStorage.getItem('anonymous_session_id');
        if (!sid) {
            sid = crypto.randomUUID();
            localStorage.setItem('anonymous_session_id', sid);
        }
        setSessionId(sid);
    }, []);

    const handleCorrection = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setError(null);
        setCorrectedText('');

        try {
            let result;
            if (isAuthenticated) {
                result = await CorrectionService.correctRegistered(text);
            } else {
                result = await CorrectionService.correctAnonymous(text, sessionId);
            }
            setCorrectedText(result.corrected || result.text); // Adjust based on actual API response structure
        } catch (err) {
            console.error("Correction error:", err);
            setError(err.response?.data?.message || 'Ocurrió un error al corregir el texto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold mb-2 text-slate-800">Corrector de Estilo</h1>
                <p className="text-slate-600">Mejora tu redacción con inteligencia artificial.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Area */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="inputText" className="font-medium text-slate-700">Tu texto original</label>
                    <textarea
                        id="inputText"
                        className="w-full h-64 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm transition-all"
                        placeholder="Escribe o pega aquí tu texto..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="text-right text-sm text-slate-500">
                        {text.length} caracteres
                    </div>
                </div>

                {/* Output Area */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-slate-700">Texto corregido</label>
                    <div className={`w-full h-64 p-4 rounded-xl border ${correctedText ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-slate-50'} overflow-auto whitespace-pre-wrap transition-all`}>
                        {loading ? (
                            <div className="flex items-center justify-center h-full text-slate-400 animate-pulse">
                                Corrigiendo...
                            </div>
                        ) : correctedText ? (
                            <span className="text-slate-800">{correctedText}</span>
                        ) : (
                            <span className="text-slate-400 italic">El resultado aparecerá aquí</span>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="flex justify-center mt-4">
                <button
                    onClick={handleCorrection}
                    disabled={loading || !text.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? 'Procesando...' : 'Corregir Texto'}
                </button>
            </div>

            {!isAuthenticated && (
                <p className="text-center text-sm text-slate-500 mt-4">
                    Tienes un límite de correcciones gratuitas. <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a> para más.
                </p>
            )}
        </div>
    );
}
