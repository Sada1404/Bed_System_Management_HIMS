// TEMPORARY MOCK SERVER CLIENT — Supabase credentials unavailable
// Remove this file and restore the original when credentials are recovered.

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

export async function createClient() {
    return {
        auth: {
            getUser: async () => ({
                data: {
                    user: {
                        id: 'mock-user-id-123',
                        email: 'admin@goanny.com',
                        user_metadata: { full_name: 'Admin User' },
                    },
                },
                error: null,
            }),
            signInWithPassword: async () => ({ data: {}, error: null }),
            signOut: async () => ({ error: null }),
        },
        from: () => createMockQuery(),
    };
}
