# Blogpost_blitz

Minimaler Blog mit [Blitz.js](https://blitzjs.com) (Blitz 3 auf Next.js 15, Prisma, Zero-API-RPC) –
Aufgabe 7: React-Frameworks vergleichen und bewerten.

Funktionen: Liste aller Beiträge, Detailansicht, Formular zum Anlegen (Login erforderlich),
Bearbeiten/Löschen für eingeloggte Personen.

## Lokal starten

Voraussetzung: Node.js 20+ und npm.

```bash
npm install
npx blitz prisma migrate dev
npx blitz dev
```

Danach <http://localhost:3000> öffnen, unter „Registrieren“ ein Konto anlegen und unter „Neuer Beitrag“ schreiben.

## Umgebungsvariablen

| Variable | Lokal | Production |
|---|---|---|
| `DATABASE_URL` | `file:./db.sqlite` (aus `.env.local`) | Postgres-URL (z. B. Neon/Supabase) |
| `SESSION_SECRET_KEY` | nur für `blitz start` nötig | **Pflicht**, 32 Zeichen (`openssl rand -hex 16`) |

## Dokumentation

- [Tutorial-Notizen & Stolpersteine](docs/tutorial-notizen.md)
- [Framework-Recherche (React Router, Astro, htmx, Qwik)](docs/framework-recherche.md)
