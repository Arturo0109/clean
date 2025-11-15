const ACCESS_TOKEN_KEY = 'access_token';

export function saveToken(token){
    if (typeof window !== 'undefined'){

        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
}

export function getToken (){
    if (typeof window !== 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function removeToken (){
    if (typeof window !== 'undefined'){

        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
}

