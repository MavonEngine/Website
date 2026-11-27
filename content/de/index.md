---
seo:
  title: MavonEngine – Three.js-Spieleengine für Single- & Multiplayer-Browserspiele
  description: MavonEngine ist eine Three.js-Spieleengine für Single- und Multiplayer-Browserspiele — mit serverautoritativer Physik, Echtzeit-Netzwerk und einer einheitlichen Server-Client-Architektur.
---
::home-hero
---
badge: OPEN SOURCE · KOMPLETT TYPESCRIPT
command: npx @mavonengine/cli create my-game
tags: [TypeScript, Three.js, Rapier-Physik, WebRTC, WebXR, GLTF / Draco]
---
#title
Three.js-[Spieleengine]{.accent} für Single- & Multiplayer

#description
MavonEngine ist eine Three.js-Spieleengine für Echtzeit-Browserspiele — die einzige mit serverautoritativer Physik von Anfang an. Baue Single- oder Multiplayer-3D-Spiele mit einer einheitlichen Server-Client-Architektur, integrierter Physik und Echtzeit-Netzwerkfunktionen.

#links
:home-button[Loslegen]{to="/de/erste-schritte" icon="i-lucide-arrow-right"}
:home-button[Community beitreten]{to="/community" variant="outline"}
:home-button[Live ausprobieren]{to="/demo" variant="outline" icon="i-lucide-gamepad-2"}

#default
  :::home-code-card
  ---
  sample: server
  badge: AUTORITATIV
  glow: true
  comments:
    - "Ein Client hat sich verbunden: Spieler zurückgeben,\nder Server fügt ihn hinzu und synchronisiert ihn"
    - Eingaben kommen geordnet an und laufen im autoritativen Tick
    - Nur Entities im Umkreis von 200 Einheiten jedes Spielers synchronisieren
  stats:
    - label: PHYSIK
      value: Rapier3D
    - label: TRANSPORT
      value: WebRTC · UDP
    - label: SYNC-RADIUS
      value: 200 Einheiten
      accent: true
  ---
  :::
::

::home-demo
---
label: LIVE-DEMO
title: Spiel es im Browser — ohne Installation.
multiplayer: BASE Jump · Multiplayer
single-player: Paper Train · Einzelspieler
alt: BASE Jump, eine Multiplayer-Demo mit MavonEngine im Browser
---
::

::home-section{id="features" index="01" label="ENGINE" large}
#title
Alles in einem zusammenhängenden Paket

#description
Kein Zusammenstückeln mehr von Bibliotheken. MavonEngine liefert Rendering, Physik, Netzwerk, Animation, Partikel und Debugging als einheitliches Ganzes.

#default
  :::div{class="g3"}
    ::::home-feature{icon="i-lucide-layers" title="Full-Stack-Multiplayer-Architektur"}
    Gemeinsames Entity-System — einmal schreiben, auf Server und Client ausführen. Automatische Zustandssynchronisierung mit Bandbreitenoptimierung, entfernungsbasiertem Culling für Entity-Sichtbarkeit und hash-basierter Änderungserkennung zur Minimierung des Netzwerkverkehrs.
    ::::

    ::::home-feature{icon="i-lucide-zap" title="Integrierte 3D-Physik mit Rapier"}
    Kinematischer Character-Controller mit Hanganstieg und -abgleitung. Konfigurierbare Parameter — 45° Anstieg, 30° Auto-Abgleitung. Vollständige Körper- & Collider-Verwaltung und Physik-Debug-Visualisierung in Echtzeit.
    ::::

    ::::home-feature{icon="i-lucide-monitor" title="Erweitertes 3D-Rendering mit Three.js"}
    Die volle Leistung von Three.js mit Unterstützung für eigene GLSL-Shader und Debug-Rendering-Modi wie Wireframe-, Armatur- und Physik-Overlays.
    ::::

    ::::home-feature{icon="i-lucide-wifi" title="Echtzeit-Multiplayer-Netzwerk"}
    WebRTC-basierte Kommunikation für Echtzeit-Datenkanäle. Bandbreitenverfolgung & -überwachung, Befehls-Pufferung & -Verarbeitung über Netzwerklatenz hinweg, und Server-Gesundheitsüberwachung mit integrierten HTTP-Endpunkten.
    ::::

    ::::home-feature{icon="i-lucide-play" title="Skelett-Animationssystem"}
    Animationszustandsverwaltung mit logischer Organisation. Sanfte Übergangs-Animationen mit konfigurierbarer Dauer, GLTF-Modellunterstützung mit Draco-Komprimierung und effizientes Skeleton-Klonen für instanziierte Modelle.
    ::::

    ::::home-feature{icon="i-lucide-sparkles" title="Partikeleffekte-Framework"}
    Eingebaute Effekte — Regen und Rauch sofort einsatzbereit. Unterstützung für eigene Shader für einzigartige Partikelvisualisierungen.
    ::::

    ::::home-feature{icon="i-lucide-map" title="Szenen für Client & Server"}
    Eine JSON-Szenendatei für beide Seiten — der Client baut, was gerendert wird, der Server Collider und Spiellogik. Im Editor speichern und der Server lädt die Karte für alle verbundenen Spieler neu.
    ::::

    ::::home-feature{icon="i-lucide-puzzle" title="Engine-Plugins"}
    Offizielle Plugins für Chat, Accounts, eine Datenbank, Mail, Benachrichtigungen und Monitoring, installiert mit `mavonengine install` oder aus dem Dashboard und dem Editor. `mavonengine build` liefert nur die Assets aus, die dein Spiel nutzt. Plugins können Werkzeuge für den Editor und Tools für KI-Assistenten mitbringen.
    ::::

    ::::home-feature{icon="i-lucide-glasses" title="VR- & Gamepad-Unterstützung"}
    Spiele mit `game.enableXR()` über WebXR in einem VR-Headset — Controller, Fortbewegung mit dem Thumbstick, ein Kamera-Rig für Third Person und Labels und Menüs in VR. Xbox-, PlayStation- und generische Gamepads direkt nutzbar, mit Deadzones, Tastenbeschriftungen und Vibration.
    ::::

    ::::home-feature{icon="i-lucide-activity" title="Live-Server-Monitoring"}
    Tick-Zeit gegen das Tick-Budget, CPU, Bandbreite, die Job-Warteschlange, Spieler und ihre Accounts, Logs, HTTP-Anfragen und die Datenbank — im Terminal oder im Browser hinter einem Login.
    ::::

    ::::home-feature{icon="i-lucide-bot" title="KI-Assistenten-Unterstützung (MCP)"}
    `mavonengine mcp` lässt jeden KI-Coding-Assistenten dein laufendes Spiel untersuchen: Server-Metriken, Szenen und Entities, Renderer-Statistiken, Konsole, Screenshots und Frame-Traces — und diese Doku lesen. Plugins bringen eigene Tools mit, etwa den Dev-Posteingang, sodass ein Assistent eine Registrierung bis zur Bestätigungsmail verfolgen kann.
    ::::

    ::::home-feature{icon="i-lucide-signal" title="Latenzsimulation"}
    Teste deinen Netzwerkcode gegen künstliche Latenz, Jitter und Paketverlust, bevor es deine Spieler tun.
    ::::

    ::::home-feature{icon="i-lucide-key-round" title="Spieler-Accounts"}
    Anmeldungen, Sitzungen und Gäste, die ihren Fortschritt bei der Registrierung behalten. Jede Verbindung bekommt eine stabile Account-ID. E-Mail-Bestätigung und Passwort-Resets per Mail.
    ::::

    ::::home-feature{icon="i-lucide-database" title="Datenbank & Job-Warteschlange"}
    Eine SQLite-Datenbank auf dem in Node eingebauten `node:sqlite`, mit Migrationen pro Plugin. Hintergrund-Jobs mit Wiederholungen, Backoff und Verzögerungen, die einen Neustart überstehen.
    ::::

    ::::home-feature{icon="i-lucide-bell" title="Mail & Benachrichtigungen"}
    `player.notify(new LevelUp())` erreicht den Spieler im Spiel, per Mail oder zum späteren Lesen. Eingereihte Mails in einem anpassbaren Layout, über SMTP oder jeden nodemailer-Transport.
    ::::
  :::
::

::home-split{index="02" label="LEVEL-EDITOR" note="FRÜHES WIP"}
#title
Bearbeite die Welt, während sie läuft.

#description
Ein Level-Editor, der im laufenden Spiel startet und mit dem Server verbunden bleibt. Bearbeite die Szene, speichere, und der Server lädt die Karte für alle Spieler neu. Eigene Tools lassen sich als Panels andocken.

#extra
:::home-shortcut{modifier="Strg" key-name="S" hint="Karte lädt für alle Spieler neu"}
:::

#default
:::home-video{src="/static/levelEditor.mp4" title="MavonEngine Three.js-Spieleengine — Level-Editor"}
:::
::

::home-section{id="showcase" index="03" label="PLUGINS & SCREENSHOTS" :max-width="620"}
#title
Einstecken. Laufen sehen.

#description
Offizielle Plugins für Chat, Accounts, eine Datenbank, Mail, Benachrichtigungen und Monitoring — je ein Befehl, und die Engine verbindet sie. Plugins können einander nutzen und teilen dieselbe Datenbank.

#aside
  :::install-command
  ---
  commands:
    - id: create
      label: create
      cmd: npx @mavonengine/cli create my-game
      note: Neues Projekt mit Physik und Multiplayer, in unter einer Minute bereit.
    - id: auth
      label: auth
      cmd: npx @mavonengine/cli install @mavonengine/auth
      note: Spieler-Accounts, Sitzungen und Gastzugang.
    - id: chat
      label: chat
      cmd: npx @mavonengine/cli install @mavonengine/chat
      note: Chat im Spiel. Server neu starten, Enter drücken zum Tippen.
    - id: sqlite
      label: sqlite
      cmd: npx @mavonengine/cli install @mavonengine/sqlite
      note: SQLite auf node:sqlite, Migrationen pro Plugin.
    - id: mail
      label: mail
      cmd: npx @mavonengine/cli install @mavonengine/mail
      note: Eingereihte Mails über SMTP oder jeden nodemailer-Transport.
    - id: notifications
      label: notifications
      cmd: npx @mavonengine/cli install @mavonengine/notifications
      note: Im Spiel, per Mail oder im Posteingang.
    - id: monitoring
      label: monitoring
      cmd: npx @mavonengine/cli install @mavonengine/http-monitoring
      note: Das Live-Server-Dashboard im Browser, hinter einem Login.
  ---
  :::
::

::showcase-carousel
---
slides:
  - src: /images/http-monitoring.png
    alt: "MavonEngine-Server-Monitoring-Dashboard: CPU-, Netzwerk- und Tick-Diagramme, Welt-Statistiken, Spieler und Logs"
    title: Live-Server-Monitoring
    tag: "@mavonengine/http-monitoring"
  - title: Chat
    cmd: npx @mavonengine/cli install @mavonengine/chat
    slot: CHAT-SCREENSHOT
    shot: /static/plugin-chat.png
    desc: Text-Chat im Spiel mit Rate-Limit, Stummschaltungen, Umgebungs-Chat, Verlauf und einer Admin-API. Im Spiel Enter drücken zum Tippen.
  - src: /baseScreenshot.jpg
    alt: BASE Jump, eine Multiplayer-Demo mit MavonEngine
    title: BASE Jump — Multiplayer-Demo
    tag: DEMO
    href: airsports
  - title: Spieler-Accounts
    cmd: npx @mavonengine/cli install @mavonengine/auth
    slot: LOGIN-SCREENSHOT
    shot: /static/plugin-auth-login.mp4
    desc: Benutzernamen und Passwörter, Sitzungen, Gastzugang und ein Rate-Limit für Anmeldungen. Jeder Spieler bekommt eine stabile Account-ID.
  - title: Datenbank
    cmd: npx @mavonengine/cli install @mavonengine/sqlite
    slot: DATENBANK-SCREENSHOT
    shot: /static/plugin-database.png
    desc: SQLite auf dem in Node eingebauten node:sqlite, geteilt von allen Plugins, jedes mit eigenen Tabellen und Migrationen.
  - title: Mail
    cmd: npx @mavonengine/cli install @mavonengine/mail
    slot: MAIL-SCREENSHOT
    shot: /static/plugin-mail.png
    desc: Eingereihte Mails in einem anpassbaren Layout, über SMTP oder jeden nodemailer-Transport, erneut versucht, wenn der Mailserver nicht erreichbar ist. Ein Dev-Posteingang zur Vorschau jeder Mail ist eingebaut.
  - title: Benachrichtigungen
    cmd: npx @mavonengine/cli install @mavonengine/notifications
    slot: BENACHRICHTIGUNGS-SCREENSHOT
    shot: /static/plugin-notifications.png
    desc: player.notify(new LevelUp()) erreicht den Spieler im Spiel, per Mail oder in einem Posteingang, den er später liest.
---
::

::div{class="wrap mt-7 flex flex-wrap gap-3 justify-center"}
:home-button[Alle Plugins]{to="/de/werkzeuge/plugins" variant="outline" icon="i-lucide-arrow-right"}
:home-button[Monitoring-Doku]{to="/de/werkzeuge/monitoring" variant="outline"}
::

::home-split{index="04" label="LIVE OPS" top}
#title
Alles, was ein Live-Spiel braucht

#description
Accounts, eine Datenbank, Hintergrund-Jobs, Mail und Benachrichtigungen — die Serverseite eines Spiels, zu dem Spieler zurückkommen. Installiere die Plugins, die du brauchst, und die Engine verbindet sie.

#extra
  :::home-link-pills
  ---
  label: Tooling für Live-Spiele
  links:
    - label: Spieler-Accounts
      to: /de/werkzeuge/auth
    - label: Datenbank
      to: /de/werkzeuge/datenbank
    - label: Job-Warteschlange
      to: /de/werkzeuge/warteschlange
    - label: Mail
      to: /de/werkzeuge/mail
    - label: Benachrichtigungen
      to: /de/werkzeuge/benachrichtigungen
  ---
  :::

#default
  :::home-code-card
  ---
  sample: liveops
  comments:
    - Jede Verbindung hat einen Account, bei jedem erneuten Verbinden denselben
    - Im Spiel, per Mail und im Posteingang des Spielers
    - Langsame Arbeit kommt auf die Warteschlange und wird bei Fehlern erneut versucht
    - Plugins teilen eine Datenbank, jedes mit eigenen Tabellen
  ---
  :::
::

::home-section{index="05" label="PREFABS" :max-width="680"}
#title
Einfügen. Anpassen. Ausliefern.

#description
Sofort einsatzbereite Prefabs aus der Community — von Umgebungs-Assets bis zu Gameplay-Elementen. Lade beliebige Prefabs direkt in den Editor, und jeder kann im Community-Registry veröffentlichen.

#aside
:home-button[Prefab-Dokumentation ansehen]{to="/de/prefabs" variant="outline" icon="i-lucide-arrow-right"}

#default
  :::div{class="g2"}
    ::::home-prefab{title="Gras" tag="WIND · LOD" tone="green" video="/static/grassPrefab.mp4" video-title="MavonEngine Three.js-Spieleengine — Gras-Prefab mit Windsimulation"}
    Üppige, performante Grasfelder mit Windsimulation und LOD-Unterstützung. Dichte, Schwingung und Farbe in Sekunden konfigurieren.
    ::::

    ::::home-prefab{title="Wasser" tag="3 LOD · SHADER" tone="sapphire" video="/static/waterPrefab.mp4" video-title="MavonEngine Three.js-Spieleengine — Wasser-Shader-Prefab"}
    Einfacher Wasser-Shader mit 3 LOD-Stufen und Grundanpassungen — sofort einsatzbereit.
    ::::
  :::
::

::home-section{index="06" label="ARCHITEKTUR" :max-width="760" large}
#title
Anders gebaut

#description
Die meisten Multiplayer-Browserspiele werden mit Klebeband zusammengehalten. MavonEngine wurde von Grund auf als einheitliches System konzipiert — damit alles von Anfang an zusammenarbeitet.

#default
  :::div{class="g3"}
    ::::home-feature{number="01" title="Komplettlösung"}
    Rendering, Physik, Netzwerk, Entity-Verwaltung, Asset-Laden, Animation, Partikel und Debugging-Tools in einem zusammenhängenden Paket.
    ::::

    ::::home-feature{number="02" title="Server + Client-Einheit" wide}
    Schreibe Spiellogik einmal und sie funktioniert auf Server und Client. Das gemeinsame Entity-System eliminiert Duplikation und Drift. Der Server betreibt eine vereinfachte Hitbox-Szene neben der vollständigen Three.js-Welt des Clients — für autoritative Treffererkennung, Raycasting und räumliche Abfragen, ohne dem Client zu vertrauen.
    ::::

    ::::home-feature{number="03" title="Netzwerk integriert"}
    Entfernungsbasiertes Culling, hash-basierte Änderungserkennung, Bandbreitenüberwachung und automatische Zustandssynchronisierung — alles integriert, nichts angeschraubt.
    ::::

    ::::home-feature{number="04" title="Entwicklererfahrung"}
    Ein Befehl zum Erstellen und Starten eines Projekts, ein Live-Server-Dashboard, Tweakpane-Debug-Panels, Physik-Overlays, MCP-Unterstützung für KI-Assistenten und umfassende TypeScript-Typen.
    ::::

    ::::home-feature{number="05" title="Erweiterbare Architektur"}
    Abstrakte Basisklassen ermöglichen die Anpassung von Servern, Entities und Spiellogik, ohne gegen das Framework ankämpfen zu müssen. Engine-Plugins fügen Client-, Server- und Editor-Funktionen als npm-Pakete hinzu.
    ::::
  :::
::

::home-section{id="usecases" index="07" label="ANWENDUNGSFÄLLE" center large}
#title
Was kannst du bauen?

#description
Alles, was Spieler, Physik und eine Welt im Browser braucht.

#default
  :::div{class="g5"}
  ::::home-use-case{icon="i-lucide-star" title="Action-RPGs"}
  ::::
  ::::home-use-case{icon="i-lucide-gamepad-2" title="PvP-Kampfspiele"}
  ::::
  ::::home-use-case{icon="i-lucide-globe" title="Open-World-Multiplayer"}
  ::::
  ::::home-use-case{icon="i-lucide-box" title="Physikbasierte Spiele"}
  ::::
  ::::home-use-case{icon="i-lucide-user-round" title="Single-Player-3D-Spiele"}
  ::::
  :::
::

::home-section{index="08" label="FAQ" narrow}
#title
Häufig gestellte Fragen

#default
  :::home-faq
    ::::home-faq-item{label="Was ist eine Three.js-Spieleengine?"}
    Eine Three.js-Spieleengine baut auf dem Rendering von Three.js auf und fügt die Systeme hinzu, die jedes Spiel braucht — Physik, Netzwerk, Entity-Verwaltung, Animationen und Tooling. MavonEngine ist eine Three.js-Spieleengine für Browserspiele — mit serverautoritativer Physik und Multiplayer-Netzwerk von Anfang an.
    ::::

    ::::home-faq-item{label="Was ist der Unterschied zwischen einer Three.js-Spieleengine und purem Three.js?"}
    Three.js ist eine Rendering-Bibliothek — sie zeichnet 3D-Szenen im Browser. MavonEngine ergänzt alles Weitere: ein Entity-System, State Machines, Physiksimulation, Echtzeit-Multiplayer-Netzwerk, Asset-Loading, Animationen, Partikel und einen Level-Editor.
    ::::

    ::::home-faq-item{label="Kann man mit Three.js Multiplayer-Spiele bauen?"}
    Ja, aber Three.js allein hat kein Netzwerk und keine Physik. MavonEngine betreibt Rapier3D-Physik auf dem Server neben der Three.js-Szene des Clients, mit eingebauter WebRTC-basierter Zustandssynchronisierung.
    ::::

    ::::home-faq-item{label="Was ist die beste Three.js-Spieleengine für Multiplayer?"}
    MavonEngine ist speziell für Multiplayer-Browserspiele gebaut. Sie betreibt eine serverautoritative Physiksimulation parallel zur Three.js-Welt des Clients — für präzise Treffererkennung, Anti-Cheat und Echtzeit-Zustandssynchronisierung, ohne es selbst aufbauen zu müssen.
    ::::

    ::::home-faq-item{label="Unterstützt eine Three.js-Spieleengine Physik?"}
    MavonEngine enthält Rapier3D-Physik auf Server und Client. Der Server führt die autoritative Simulation aus — Kollision, Treffererkennung, räumliche Abfragen — während der Client Physik für visuelles Feedback nutzt.
    ::::

    ::::home-faq-item{label="Gibt es eine kostenlose Three.js-Spieleengine?"}
    Ja. MavonEngine ist kostenlos und Open Source — Rendering, Physik, Multiplayer-Netzwerk, Entity-Verwaltung, Animationen, Partikel und ein Level-Editor, alles kostenlos.
    ::::

    ::::home-faq-item{label="Unterstützt MavonEngine Spieler-Accounts und Anmeldungen?"}
    Ja. Das Plugin `@mavonengine/auth` fügt Accounts, Sitzungen, Gastzugang und ein Rate-Limit für Anmeldungen hinzu; mit `@mavonengine/mail` bestätigt es E-Mails und setzt Passwörter zurück. [Dokumentation zu Spieler-Accounts](/de/werkzeuge/auth).
    ::::

    ::::home-faq-item{label="Kann ein Three.js-Spiel Spielern E-Mails und Benachrichtigungen senden?"}
    Mit MavonEngine ja. `player.notify(new LevelUp())` erreicht den Spieler im Spiel, per Mail und in einem Posteingang. Mails kommen auf die Job-Warteschlange des Servers und werden erneut versucht, wenn der Mailserver nicht erreichbar ist.
    ::::

    ::::home-faq-item{label="Kann ich mit Three.js VR-Spiele bauen?"}
    Ja. MavonEngine spielt dein Spiel über WebXR in einem VR-Headset, im Browser einer Quest oder in Desktop-Chrome mit einem PC-Headset. Dasselbe Spiel läuft auf dem Desktop und in VR, und das Multiplayer-Template schaltet es überall ein, wo der Browser es kann. [VR-Doku](/de/kernkonzepte/vr).
    ::::

    ::::home-faq-item{label="Wie starte ich mit dem Bau eines 3D-Browserspiels mit Three.js?"}
    Erstelle ein Projekt mit `npx @mavonengine/cli create my-game` — ein funktionierendes Projekt mit Physik und Multiplayer in unter einer Minute. Folge dann dem [Erste-Schritte-Leitfaden](/de/erste-schritte).
    ::::
  :::
::

::home-section{id="community" index="09" label="COMMUNITY"}
#title
Neu im Forum

#description
Fragen, Showcases und Ankündigungen von Leuten, die mit MavonEngine bauen.

#aside
:home-button[Zum Forum]{to="/community" variant="outline" icon="i-lucide-arrow-right"}

#default
  :::home-community-posts
  :::
::

::home-cta{eyebrow="// READY PLAYER ONE"}
#title
Multiplayer-3D-Spiele [schneller]{.accent} bauen

#description
Server + Client + Physik + Netzwerk + Rendering + VR + Szenen + Animation + Partikel + Accounts + Datenbank + Warteschlange + Mail + Plugins + Tooling. **Alles in einem Paket. Alles zusammenarbeitend. Alles TypeScript.**

#links
:home-button[Community beitreten]{to="/community" icon="i-lucide-arrow-right"}
:home-button[Auf GitHub ansehen]{to="https://github.com/mavonengine" variant="outline" target="_blank"}
::
