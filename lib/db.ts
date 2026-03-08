// Supabase REST API client — uses fetch directly to avoid TypeScript issues
// with generated types while still providing full typed responses.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY!;

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface QueryOptions {
    select?: string;
    filters?: string[]; // e.g. ["id=eq.abc", "featured=eq.true"]
    order?: string;     // e.g. "order=asc"
    single?: boolean;
}

async function supabaseRequest<T>(
    table: string,
    method: HttpMethod,
    body?: object,
    opts: QueryOptions = {}
): Promise<T> {
    const params = new URLSearchParams();
    if (opts.select) params.set("select", opts.select);
    if (opts.order) params.set("order", opts.order);
    if (opts.filters) opts.filters.forEach((f) => {
        const [key, val] = f.split("=");
        params.set(key, val);
    });

    const url = `${SUPABASE_URL}/rest/v1/${table}${params.size ? "?" + params.toString() : ""}`;

    const headers: Record<string, string> = {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": opts.single ? "return=representation,resolution=merge-duplicates" : "return=representation",
    };
    if (opts.single) headers["Accept"] = "application/vnd.pgrst.object+json";

    const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Supabase ${method} ${table}: ${res.status} ${err}`);
    }
    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
}

export const db = {
    from: (table: string) => ({
        select: (cols = "*") => ({
            order: (col: string, opts?: { ascending?: boolean }) => ({
                async execute<T>(): Promise<T[]> {
                    const order = `${col}.${opts?.ascending !== false ? "asc" : "desc"}`;
                    return supabaseRequest<T[]>(table, "GET", undefined, { select: cols, order });
                },
            }),
            eq: (col: string, val: unknown) => ({
                order: (orderCol: string, opts?: { ascending?: boolean }) => ({
                    async execute<T>(): Promise<T[]> {
                        const order = `${orderCol}.${opts?.ascending !== false ? "asc" : "desc"}`;
                        return supabaseRequest<T[]>(table, "GET", undefined, {
                            select: cols, order,
                            filters: [`${col}=eq.${val}`],
                        });
                    },
                }),
                async execute<T>(): Promise<T | null> {
                    try {
                        return await supabaseRequest<T>(table, "GET", undefined, {
                            select: cols, single: true, filters: [`${col}=eq.${val}`],
                        });
                    } catch { return null; }
                },
            }),
        }),
        insert: (row: object) => ({
            async execute<T>(): Promise<T> {
                return supabaseRequest<T>(table, "POST", row, { single: true });
            },
        }),
        update: (patch: object) => ({
            eq: (col: string, val: unknown) => ({
                async execute<T>(): Promise<T | null> {
                    try {
                        return await supabaseRequest<T>(table, "PATCH", patch, {
                            single: true, filters: [`${col}=eq.${val}`],
                        });
                    } catch { return null; }
                },
            }),
        }),
        delete: () => ({
            eq: (col: string, val: unknown) => ({
                async execute(): Promise<void> {
                    const params = new URLSearchParams();
                    params.set(col, `eq.${val}`);
                    const url = `${SUPABASE_URL}/rest/v1/${table}?${params}`;
                    await fetch(url, {
                        method: "DELETE",
                        headers: {
                            "apikey": SUPABASE_KEY,
                            "Authorization": `Bearer ${SUPABASE_KEY}`,
                        },
                        cache: "no-store",
                    });
                },
            }),
        }),
    }),
};
