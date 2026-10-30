# Blogpost_blitz

Minimaler Blog mit [Blitz.js](https://blitzjs.com) (Blitz 3 auf Next.js 15, Prisma, Zero-API-RPC) –
Aufgabe 7: React-Frameworks vergleichen und bewerten.

Funktionen: Liste aller Beiträge, Detailansicht, Formular zum Anlegen (Login erforderlich),
Bearbeiten/Löschen für eingeloggte Personen.

## Lokal starten

Voraussetzung: Node.js 20+, npm und eine PostgreSQL-Datenbank (z. B. ein kostenloser
[Neon](https://neon.tech)-Branch oder lokal per Docker).

```bash
npm install
cp .env.example .env.local     # DATABASE_URL und SESSION_SECRET_KEY eintragen
npx blitz prisma migrate dev
npx blitz dev
```

Danach <http://localhost:3000> öffnen, unter „Registrieren“ ein Konto anlegen und unter „Neuer Beitrag“ schreiben.

## Deployment auf Vercel

1. Repo in Vercel importieren (Framework wird als Next.js erkannt, keine Build-Einstellungen nötig).
2. Postgres-Datenbank anlegen (Vercel → Storage → Neon, oder Supabase).
3. Environment Variables setzen (siehe unten).
4. Deploy. Vercel führt automatisch `npm run build` aus:
   `prisma generate && prisma migrate deploy && blitz build` – die Tabellen werden dabei angelegt.

## Umgebungsvariablen

Vorlage: [`.env.example`](.env.example)

| Variable | Beschreibung |
|---|---|
| `DATABASE_URL` | PostgreSQL-Verbindung (auf Vercel die *pooled* URL) |
| `SESSION_SECRET_KEY` | **Pflicht** in Production, 32 Zeichen (`openssl rand -hex 16`), pro Umgebung neu erzeugen |

## Dokumentation

- [Tutorial-Notizen & Stolpersteine](docs/tutorial-notizen.md)
- [Framework-Recherche (React Router, Astro, htmx, Qwik)](docs/framework-recherche.md)
