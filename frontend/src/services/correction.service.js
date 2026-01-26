import api from '../lib/axios';

export const correctAnonymous = async (text, sessionId) => {
    const response = await api.post('/corrections/anonymous', { text }, {
        headers: {
            'x-session-id': sessionId
        }
    });
    return response.data;
};

export const correctRegistered = async (text) => {
    const response = await api.post('/corrections/registered', { text });
    return response.data;
};
