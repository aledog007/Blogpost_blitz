# Framework-Recherche: Remix / React Router, Astro, htmx, Qwik

Zusammenfassung der Recherche zu den Material-Links aus Aufgabe 7 (React-Frameworks vergleichen und bewerten).

## Remix vs. React Router — wichtige Klarstellung

Der GitHub-Link `remix-run/remix` führt **nicht mehr zum "alten" Remix**. Das Repo trägt aktuell den Titel "Welcome to Remix 3!" und ist ein komplett neues, separates Projekt in aktiver Beta-Entwicklung (Installation über `npm install remix@next`).

Das, was früher Remix (v1/v2) war, ist inzwischen in **React Router** aufgegangen: [reactrouter.com/start/modes](https://reactrouter.com/start/modes) beschreibt den *Framework Mode* von React Router (aktuell Version 8.5.1), der genau die alten Remix-Features weiterführt (Loader, Actions, SSR/SPA/SSG-Strategien).

**Für die Framework-Card "Remix / React Router 7" ist darum der Framework Mode von React Router der relevante Teil**, nicht das neue Remix-3-Experiment.

### React Router — die drei Modi

| Modus | Beschreibung | APIs |
|---|---|---|
| Declarative Mode | Einfaches Routing, kein eigenes Datenlayer | `<Link>`, `useNavigate`, `useLocation` |
| Data Mode | Routing + Daten-Loading ausserhalb des Renderns | `createBrowserRouter`, `loader`, `action`, `useFetcher` |
| Framework Mode | Volle Vite-Integration, typsicheres Routing, unterstützt explizit SPA-, SSR- und statische Rendering-Strategien | `routes.ts`, generierte `./+types/...`-Module |

Laut Doku ist der Framework Mode die richtige Wahl, wenn man neu bei React Router ist, ein volles Framework möchte, oder von Next.js migriert.

### Remix-Repo (remix-run/remix) — Kennzahlen

- Stars: 33.3k · Forks: 2.8k
- Offene Issues: 28 · Offene Pull Requests: 39
- Status: "Remix 3" — aktiv in Entwicklung, aber ein **neues, eigenständiges Projekt**, nicht die Fortsetzung des alten Remix-Frameworks

## Astro v4 — Upgrade-Guide-Zusammenfassung

Quelle: [docs.astro.build – Upgrade to v4](https://docs.astro.build/en/guides/upgrade-to/v4/)

**Breaking Changes:** betreffen grösstenteils Adapter-Autor:innen, nicht normale App-Entwickler:innen. Die meisten entfernten Features waren bereits in v3 als *deprecated* markiert (mit Warnhinweis), z. B.:
- `injectRoute`-Property `entryPoint` → `entrypoint`
- `app.render()` nimmt jetzt ein Objekt `{ routeData, locals }` statt Einzelparameter
- Entfernte, vorher deprecated Features (u. a. `build.split`, `markdown.drafts`, `getHeaders()`)

**Abhängigkeits-Updates:** Vite 4 → 5, unified v10 → v11 (kann eigene Markdown/MDX-Plugins betreffen).

**Einordnung:** Die Doku selbst sagt, viele Projekte brauchen gar keine Anpassung. Die Sidebar zeigt im Anschluss noch Upgrade-Guides für v5, v6 und v7 — Astro wird also klar aktiv weiterentwickelt.

## htmx und Qwik — Gegenentwürfe zum React-Ökosystem

**htmx** ([htmx.org](https://htmx.org/)): verzichtet komplett auf ein JavaScript-Framework. HTML-Attribute lösen AJAX-Requests aus, der Server schickt direkt HTML-Fragmente zurück statt JSON. Das ist das Gegenteil von Reacts Client-seitigem Rendering-Modell — man bleibt näher an klassischem Server-Side-Rendering.

**Qwik** ([qwik.dev](https://qwik.dev/)): verfolgt *Resumability* statt Hydration. Statt beim Laden den gesamten Komponentenbaum clientseitig neu aufzubauen (Hydration, wie bei React), serialisiert Qwik den App-Zustand direkt ins HTML und macht einzelne Komponenten erst bei tatsächlicher Interaktion lauffähig — dadurch praktisch keine JavaScript-Ausführung beim initialen Laden.

## Quellen

- [reactrouter.com – Modes](https://reactrouter.com/start/modes)
- [github.com/remix-run/remix](https://github.com/remix-run/remix)
- [docs.astro.build – Upgrade to v4](https://docs.astro.build/en/guides/upgrade-to/v4/)
- [htmx.org](https://htmx.org/)
- [qwik.dev](https://qwik.dev/)
