'use client';

import React, {createContext, useEffect, useState} from "react";
import * as AuthService from "../services/auth.service";
import { getToken, removeToken } from "../lib/tokens";
import api from "../lib/axios";

export const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    loading:true,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});

/**
 * AuthProvider: mantiene el estado del usuario básico (puede extenderse para fetch user).
 * Hecho para integrarse fácilmente con tu backend: si quieres obtener el perfil, implementa /auth/me.
 */

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState (true);

 // intenta recuperar token al iniciar y (opcional) pedir perfil
    useEffect (() => {
        async function init (){
            const token = getToken();
            if (token){
                 // Opcional: pedir /auth/me para obtener datos del usuario real
                 try {
                    const resp = await api.get('/auth/me');
                    setUser(resp.data ?? {tokenPresent: true});
                 } catch (error) {
                    removeToken();
                    setUser (null);
                    }
                } else {
                    setUser (null);
                }
                setLoading (false);
            }
        init();
    },[]);

    const login = async ({email, password}) => {
        const res = await AuthService.login({email, password});

        try {
            const profile = await api.get('/auth/me');
            setUser(profile.data);
        } catch (error) {
            setUser({email});
            
        }return res;
    };

    const register = async ({email, password}) => {
        const res = await AuthService.register({email, password});

        try {
            const profile = await api.get('/auth/me');
            setUser(profile.data);
        } catch (error) {
            setUser({email});
        }
        return res;
        };

        const logout = async () => {
            await AuthService.logout();
            setUser (null);
        };

        return(
            <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        register,
        logout,
      }}>{children}</AuthContext.Provider>
        );


    }