# Blitz.js – Tutorial-Notizen (Person 2, Fullstack Dev)

Stand: 30.10.2026 · Blitz 3.0.2 · Next.js 15.0.1 · React 19 · Prisma 6.1 · Node 24

## Was gebaut wurde

| Anforderung | Umsetzung | Datei(en) |
|---|---|---|
| Liste aller Beiträge | Neueste zuerst, Datum + Auszug, Pagination (10 pro Seite), auch auf der Startseite | `src/pages/posts/index.tsx`, `src/pages/index.tsx` |
| Detailansicht | Titel, Datum, Inhalt (Zeilenumbrüche bleiben erhalten) | `src/pages/posts/[postId].tsx` |
| Formular zum Anlegen | Titel + mehrzeiliger Inhalt, Zod-Validierung mit deutschen Fehlermeldungen | `src/pages/posts/new.tsx`, `src/posts/components/PostForm.tsx`, `src/posts/schemas.ts` |
| Zugriffsregeln | Lesen öffentlich, Schreiben/Bearbeiten/Löschen nur eingeloggt | `src/posts/queries/*`, `src/posts/mutations/*` |
| Login-Hinweis | Geschützte Seite ohne Login zeigt direkt das Login-Formular | `src/pages/_app.tsx` |

Zero-API in der Praxis: Die Seiten importieren `getPosts`, `getPost` und `createPost` direkt als Funktion
(`useQuery(getPost, { id })`, `useMutation(createPost)`). Blitz macht daraus beim Build automatisch
RPC-Endpunkte unter `/api/rpc/*`. Es gibt keinen REST-Controller, kein Fetch und keine eigenen API-Typen.
Die Typen von Prisma fliessen bis in die Komponente.

## Vorgehen (Befehle)

```bash
npx blitz@3.0.2 new blogtmp --template=pages --language=typescript --form=formik --npm
npx blitz generate all post title:string content:string
npx blitz prisma migrate dev --name add_post
npx blitz generate pages post      # nötig, siehe Lücke 1
npm i -D @types/react@19.0.2 @types/react-dom@19.0.2   # nötig, siehe Lücke 3
npx blitz dev
```

## Wo das Tutorial / der Generator gut war (+)

- **`blitz new`** erzeugt in ca. 2–3 Minuten eine lauffähige App inklusive Prisma, Signup/Login,
  Passwort-Reset, Session-Handling und CSRF-Schutz. Das spart enorm Zeit.
- **`blitz generate all`** erzeugt Prisma-Modell, Migration, Queries, Mutations, Zod-Schemas und Formular
  in Sekunden.
- **Zero-API / RPC** ist das stärkste Argument für Blitz: Serverfunktion schreiben, im Client importieren,
  fertig. Volle Typsicherheit von der Datenbank bis zur UI.
- **Sicherheit standardmässig:** Mutations sind mit `resolver.authorize()` geschützt, CSRF-Tokens werden
  automatisch geprüft. Ein Aufruf von `createPost` ohne Login wird mit 401 abgelehnt.
- **Zod-Validierung** wird gleichzeitig im Formular (Client) und im Resolver (Server) verwendet.

## Lücken und Stolpersteine (−)

1. **`generate all` hat keine Pages erzeugt.** Im Pages-Router-Template von Blitz 3.0.2 entstanden nur
   Queries, Mutations, Schema und Formular. Die Seiten unter `src/pages/posts/` fehlten.
   Lösung: `blitz generate pages post` separat ausführen.
2. **Bug im generierten Code:** `src/pages/posts/index.tsx` zeigte `post.name` an, obwohl das Modell
   `title` hat. Die Liste bestand deshalb nur aus leeren Links.
3. **Das frische Scaffold besteht den TypeScript-Check nicht.** `@types/react@18` passt nicht zu React 19
   (`React.JSX` fehlt), und `useQuery` / `usePaginatedQuery` sind in Blitz 3 als `T | undefined`
   typisiert, obwohl Suspense die Daten garantiert. Weil `next build` den Typcheck ausführt, **schlägt
   auch der Production-Build fehl**. Lösung: Typen aktualisieren und `if (!data) return null`-Guards
   einbauen.
4. **`resolver.authorize()` überall:** Auch die Lese-Queries verlangen standardmässig einen Login. Für
   einen öffentlichen Blog muss man das selbst entfernen. Das Tutorial erklärt das kaum, ohne Login
   bleibt die Liste ohne klare Fehlermeldung leer.
5. **`SESSION_SECRET_KEY` fehlt im Production-Modus:** Mit `blitz start` liefert jeder RPC-Call 400,
   bis die Variable gesetzt ist (32 Zeichen). Die Fehlermeldung steht nur im Server-Log, im Browser sieht
   man nur eine leere Seite. **Wichtig für Person 3 (Deployment).**
6. **`.env.local` endet ohne Zeilenumbruch.** Wer eine Variable mit `echo >>` anhängt, hängt sie an die
   letzte Kommentarzeile, und sie wird ignoriert.
7. **Einzeiliges Inhaltsfeld:** Der Generator kennt nur `<input>`. Eine Textarea-Komponente musste
   selbst geschrieben werden (`LabeledTextArea.tsx`).
8. **Doku-Durcheinander v1 / v2 / v3:** Viele Blogposts und Antworten auf Stack Overflow beziehen sich auf
   Blitz v1 (eigener Monolith, `app/`-Ordner). Seit v2 ist Blitz ein Toolkit auf Next.js. Das Default-
   Template ist mittlerweile der App Router, `generate` und die meisten Doku-Beispiele zielen aber auf
   den Pages Router.
9. **Veraltete Abhängigkeiten im Template:** u. a. `@next/bundle-analyzer@12`, `eslint-config-next@12`,
   `vitest@0.25`, `typescript@4.8`, dazu viele npm-Deprecation-Warnungen beim Install. Das ist ein
   Hinweis auf wenig Pflegeaufwand im Projekt.
10. **SSR „nur auf dem Papier“:** Die generierten Seiten werden als statische Hülle vorgerendert, die
    Daten lädt der Client danach per RPC nach (faktisch SPA-Verhalten). Für echtes SSR/SEO muss man
    selbst `getServerSideProps` / `gSSP` von Blitz verwenden. Relevant für Lighthouse (SEO, LCP).

## Messwerte lokal

| Messpunkt | Wert |
|---|---|
| `blitz new` inkl. `npm install` | ca. 2–3 min |
| `blitz build` (lokal, Windows) | 2 min 11 s |
| First Load JS pro Seite | ca. 150 kB (davon 149 kB geteilt) |
| Typcheck / Build nach Fixes | erfolgreich |

## Hinweise für das Team

- **Person 3 (Deployment):** Env-Variablen `DATABASE_URL` und `SESSION_SECRET_KEY` setzen (z. B.
  `openssl rand -hex 16`). SQLite funktioniert serverless nicht, deshalb in `db/schema.prisma`
  `provider = "postgresql"` setzen und Migrationen neu erzeugen.
- **Person 4 (Matrizen):** Die Punkte 1–3, 8 und 9 gehören in die Spalten Documentation / Issue & Bug
  Fixes / Migration der Ecosystem-Matrix, Punkt 10 in die Performance-Matrix.
