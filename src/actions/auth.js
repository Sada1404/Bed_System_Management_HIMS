"use server";

// TEMPORARY HARDCODED AUTH — Supabase credentials unavailable
// Restore the original implementation when credentials are recovered.

import { cookies } from 'next/headers';

const SESSION_COOKIE = 'hims_auth_session';
const SESSION_TOKEN = 'mock_hims_session_abc123xyz';

const MOCK_CREDENTIALS = {
    email: 'admin@goanny.com',
    password: 'Admin@123',
};

export async function signIn(prevState, formData) {
    const { email, password } = Object.fromEntries(formData);

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        return { success: true, message: 'Login successful!' };
    }

    return {
        success: false,
        message: `Invalid credentials. Use: ${MOCK_CREDENTIALS.email} / ${MOCK_CREDENTIALS.password}`,
    };
}

export async function signUp(prevState, formData) {
    return {
        success: false,
        message: 'Registration is disabled in offline mode. Use the hardcoded credentials to log in.',
    };
}
