// TEMPORARY MOCK CLIENT — Supabase credentials unavailable
// Remove this file and restore the original when credentials are recovered.

const SESSION_COOKIE = 'hims_auth_session';
const SESSION_TOKEN = 'mock_hims_session_abc123xyz';

const MOCK_USER = {
    id: 'mock-user-id-123',
    email: 'admin@goanny.com',
    user_metadata: { full_name: 'Admin User' },
};

function getCookie(name) {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function deleteCookie(name) {
    if (typeof document !== 'undefined') {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

function createMockQuery() {
    const q = {
        select: () => q,
        insert: () => q,
        update: () => q,
        delete: () => q,
        upsert: () => q,
        eq: () => q,
        neq: () => q,
        gt: () => q,
        gte: () => q,
        lt: () => q,
        lte: () => q,
        like: () => q,
        ilike: () => q,
        in: () => q,
        is: () => q,
        filter: () => q,
        match: () => q,
        not: () => q,
        or: () => q,
        order: () => q,
        limit: () => q,
        range: () => q,
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        then: (res, rej) => Promise.resolve({ data: [], error: null }).then(res, rej),
    };
    return q;
}

export function createClient() {
    return {
        auth: {
            getUser: async () => {
                const token = getCookie(SESSION_COOKIE);
                if (token === SESSION_TOKEN) {
                    return { data: { user: MOCK_USER }, error: null };
                }
                return { data: { user: null }, error: null };
            },
            signOut: async () => {
                deleteCookie(SESSION_COOKIE);
                return { error: null };
            },
        },
        from: () => createMockQuery(),
    };
}
