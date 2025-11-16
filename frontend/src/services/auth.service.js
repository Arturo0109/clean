import api from '../lib/axios';

import {saveToken, removeToken} from '../lib/tokens';

export async function register ({email, password}){
    const res = await api.post ('/auth/register', {email, password});
    const token = res.data?.access_token ?? res.data?.token ?? null;
    if (token) saveToken(token);
    return res.data;
}

export async function login ({email, password}){
    const res = await api.post ('/auth/login', {email, password});
    const token = res.data?.access_token ?? res.data?.token ?? null;
    if (token) saveToken(token);
    return res.data;
}

export function logout (){
    removeToken();
}
