// Migration script: creates tables and seeds existing portfolio data
// Run with: npx tsx scripts/migrate.ts

import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

async function main() {
    console.log("🔧 Creating tables...");

    await sql`
        create table if not exists portfolio_items (
            id           text primary key,
            title_es     text not null default '',
            title_en     text not null default '',
            title_pt     text not null default '',
            title_fr     text not null default '',
            subtitle_es  text not null default '',
            subtitle_en  text not null default '',
            subtitle_pt  text not null default '',
            subtitle_fr  text not null default '',
            category     text not null default 'filme-video',
            image        text not null default '',
            cover_image  text not null default '',
            images       text[] not null default '{}',
            videos       text[] not null default '{}',
            featured     boolean not null default false,
            "order"      integer not null default 99,
            created_at   timestamptz not null default now(),
            updated_at   timestamptz not null default now()
        )
    `;

    await sql`
        create table if not exists contact_messages (
            id         text primary key,
            name       text not null,
            email      text not null,
            project    text not null default '',
            message    text not null,
            read       boolean not null default false,
            created_at timestamptz not null default now()
        )
    `;

    console.log("✅ Tables created.");

    // Seed existing portfolio data
    const portfolioData = [
        {
            id: "ana-rocha",
            title_es: "Ana Rocha & Apolinário",
            title_en: "Ana Rocha & Apolinário",
            title_pt: "Ana Rocha & Apolinário",
            title_fr: "Ana Rocha & Apolinário",
            subtitle_es: "Campaña Marca Jóias",
            subtitle_en: "Jewelry Brand Campaign",
            subtitle_pt: "Campanha Marca de Joias",
            subtitle_fr: "Campagne de la marque de bijoux",
            category: "filme-video",
            image: "/images/gallery/ana-rocha-e-apolinario/DSC05923 (1).jpg",
            cover_image: "/images/gallery/ana-rocha-e-apolinario/DSC05923 (1).jpg",
            images: ["/images/gallery/ana-rocha-e-apolinario/DSC05923 (1).jpg"],
            videos: [] as string[],
            featured: true,
            order: 1,
            created_at: "2024-02-24T00:00:00.000Z",
            updated_at: "2024-02-24T03:38:00.000Z",
        },
        {
            id: "mayron-brum",
            title_es: "Mayron Brum",
            title_en: "Mayron Brum",
            title_pt: "Mayron Brum",
            title_fr: "Mayron Brum",
            subtitle_es: "Shooting",
            subtitle_en: "Shooting",
            subtitle_pt: "Shooting",
            subtitle_fr: "Shooting",
            category: "filme-video",
            image: "/images/gallery/mayron-brum/DSC09567.webp",
            cover_image: "/images/gallery/mayron-brum/DSC09567.webp",
            images: ["/images/gallery/mayron-brum/DSC09567.webp"],
            videos: [] as string[],
            featured: true,
            order: 2,
            created_at: "2024-02-24T00:00:00.000Z",
            updated_at: "2024-02-24T03:38:00.000Z",
        },
    ];

    console.log("🌱 Seeding portfolio items...");
    for (const item of portfolioData) {
        await sql`
            insert into portfolio_items ${sql(item)}
            on conflict (id) do nothing
        `;
        console.log(`  ✓ ${item.title_es}`);
    }

    console.log("✅ Migration complete!");
    await sql.end();
}

main().catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
});
