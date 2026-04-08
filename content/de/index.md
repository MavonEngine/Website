---
seo:
  title: MavonEngine – Three.js-Spieleengine für Single- & Multiplayer-Browserspiele
  description: MavonEngine ist eine Three.js-Spieleengine für Single- und Multiplayer-Browserspiele — mit serverautoritativer Physik, Echtzeit-Netzwerk und einer einheitlichen Server-Client-Architektur.
---
::u-page-hero{class="overflow-hidden"}
---
orientation: horizontal
---
#title
Three.js [Spieleengine]{.text-primary} für Single- & Multiplayer

#description
MavonEngine ist eine Three.js-Spieleengine für Echtzeit-Browserspiele — die einzige mit serverautoritativer Physik von Anfang an. Baue Single- oder Multiplayer-3D-Spiele mit einer einheitlichen Server-Client-Architektur, integrierter Physik und Echtzeit-Netzwerkfunktionen.

#links
  :::u-button
  ---
  to: /de/getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Loslegen
  :::

  :::u-button
  ---
  color: neutral
  variant: outline
  size: xl
  href: /community
  ---
  Community beitreten
  :::

  :::u-button
  ---
  color: neutral
  variant: subtle
  size: xl
  to: /demo
  trailing-icon: i-lucide-gamepad-2
  ---
  Live ausprobieren
  :::

#default
  :::prose-pre
  ---
  code: |
    import { MavonServer, MavonClient, Entity } from '@mavonengine/core'

    // Server-seitige Spielwelt
    const server = new MavonServer()

    server.onPlayerJoin((player) => {
      const entity = new Entity({ position: [0, 1, 0] })
      server.world.add(entity)
      server.sync(player, entity)
    })

    server.start(3000)
  filename: server.ts
  ---

  ```ts [server.ts]
  import { MavonServer, MavonClient, Entity } from '@mavonengine/core'

  // Server-seitige Spielwelt
  const server = new MavonServer()

  server.onPlayerJoin((player) => {
    const entity = new Entity({ position: [0, 1, 0] })
    server.world.add(entity)
    server.sync(player, entity)
  })

  server.start(3000)
  ```
  :::
::

::div{class="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto"}
:::div{class="rounded-xl overflow-hidden shadow-2xl w-full"}
:iframe{src="/demo" class="w-full border-0" style="height:600px;"}
:::
::

::u-page-section{id="features"}
#title
Alles in einem zusammenhängenden Paket

#description
Kein Zusammenstückeln mehr von Bibliotheken. MavonEngine liefert Rendering, Physik, Netzwerk, Animation, Partikel und Debugging als einheitliches Ganzes.

#features
  :::u-page-feature
  ---
  icon: i-lucide-layers
  ---
  #title
  Full-Stack-Multiplayer-Architektur

  #description
  Gemeinsames Entity-System — einmal schreiben, auf Server und Client ausführen. Automatische Zustandssynchronisierung mit Bandbreitenoptimierung, entfernungsbasiertem Culling für Entity-Sichtbarkeit und hash-basierter Änderungserkennung zur Minimierung des Netzwerkverkehrs.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Integrierte 3D-Physik mit Rapier

  #description
  Kinematischer Character-Controller mit Hanganstieg und -abgleitung. Konfigurierbare Parameter — 45° Anstieg, 30° Auto-Abgleitung. Vollständige Körper- & Collider-Verwaltung und Physik-Debug-Visualisierung in Echtzeit.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-monitor
  ---
  #title
  Erweitertes 3D-Rendering mit Three.js

  #description
  MavonEngine ist im Kern eine Three.js-Spieleengine — mit der vollen Leistung von Three.js, Unterstützung für benutzerdefinierte GLSL-Shader und Debug-Rendering-Modi wie Wireframe-, Armatur- und Physik-Overlays.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-wifi
  ---
  #title
  Echtzeit-Multiplayer-Netzwerk

  #description
  WebRTC-basierte Kommunikation für Echtzeit-Datenkanäle. Bandbreitenverfolgung & -überwachung, Befehls-Pufferung & -Verarbeitung über Netzwerklatenz hinweg, und Server-Gesundheitsüberwachung mit integrierten HTTP-Endpunkten.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-play
  ---
  #title
  Skelett-Animationssystem

  #description
  Animationszustandsverwaltung mit logischer Organisation. Sanfte Übergangs-Animationen mit konfigurierbarer Dauer, GLTF-Modellunterstützung mit Draco-Komprimierung und effizientes Skeleton-Klonen für instanziierte Modelle.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sparkles
  ---
  #title
  Partikeleffekte-Framework

  #description
  Eingebaute Effekte — Regen und Rauch sofort einsatzbereit. Unterstützung für benutzerdefinierte Shader für einzigartige Partikelvisualisierungen.
  :::
::

::u-page-section
#title
Level-Editor

#description
Sehr frühes WIP — ein Level-Editor, der direkt aus der laufenden Spielinstanz auf der Seite lädt.

#default
  :::div{class="rounded-xl overflow-hidden shadow-2xl"}
  :video{src="/static/levelEditor.mp4" autoplay loop muted playsinline controls class="w-full" title="MavonEngine Three.js-Spieleengine — Level-Editor"}
  :::
::

::u-page-section
#title
Prefabs

#description
Sofort einsatzbereite Prefabs, die von der Community erstellt wurden — von Umgebungs-Assets bis hin zu Gameplay-Elementen. Lade beliebige Prefabs direkt in den Editor, passe sie an und veröffentliche. Jeder kann Prefabs im Community-Registry veröffentlichen.

#default
  :::div{class="text-center mb-6"}
  [Prefab-Dokumentation ansehen.](/de/prefabs)
  :::

  :::div{class="grid grid-cols-1 lg:grid-cols-2 gap-6"}
    ::::div
    :video{src="/static/grassPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4" title="MavonEngine Three.js-Spieleengine — Gras-Prefab mit Windsimulation"}

    **Gras** — Üppige, performante Grasfelder mit Windsimulation und LOD-Unterstützung. Füge es in deine Szene ein und konfiguriere Dichte, Schwingung und Farbe in Sekunden.
    ::::

    ::::div
    :video{src="/static/waterPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4" title="MavonEngine Three.js-Spieleengine — Wasser-Shader-Prefab"}

    **Wasser** — Einfacher Wasser-Shader. 3 LODs + Grundanpassungen — sofort einsatzbereit.
    ::::
  :::
::

::u-page-section
#title
Anders gebaut

#description
Die meisten Multiplayer-Browserspiele werden mit Klebeband zusammengehalten. MavonEngine ist eine Three.js-Spieleengine, die von Grund auf als einheitliches System konzipiert wurde — damit alles von Anfang an zusammenarbeitet.

#features
  :::u-page-feature
  ---
  icon: i-lucide-package
  ---
  #title
  Komplettlösung

  #description
  Rendering, Physik, Netzwerk, Entity-Verwaltung, Asset-Laden, Animation, Partikel und Debugging-Tools in einem zusammenhängenden Paket.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-server
  ---
  #title
  Server + Client-Einheit

  #description
  Schreibe Spiellogik einmal und sie funktioniert auf Server und Client. Das gemeinsame Entity-System eliminiert Duplikation und Drift. Der Server betreibt eine vereinfachte Hitbox-Szene neben der vollständigen Three.js-Welt des Clients — für autoritativen Treffernachweis, Raycasting und räumliche Abfragen, ohne dem Client zu vertrauen.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe
  ---
  #title
  Netzwerk integriert

  #description
  Entfernungsbasiertes Culling, hash-basierte Änderungserkennung, Bandbreitenüberwachung und automatische Zustandssynchronisierung — alles integriert, nichts angeschraubt.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code
  ---
  #title
  Entwicklererfahrung

  #description
  Tweakpane-Integration, Debug-Visualisierung, Performance-Überwachung und umfassende TypeScript-Typen. Fehler schnell finden, schneller ausliefern.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-puzzle
  ---
  #title
  Erweiterbare Architektur

  #description
  Abstrakte Basisklassen ermöglichen die Anpassung von Servern, Entities und Spiellogik, ohne gegen das Framework ankämpfen zu müssen. Entwickelt, um mit deinem Projekt zu wachsen.
  :::
::

::u-page-section{id="usecases"}
#title
Was kannst du bauen?

#description
MavonEngine ist eine Three.js-Spieleengine für Browserspiele — Single-Player oder Multiplayer. Alles, was Spieler, Physik und eine Welt im Browser benötigt.

#features
  :::u-page-feature
  ---
  icon: i-lucide-star
  ---
  #title
  Action-RPGs
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gamepad-2
  ---
  #title
  PvP-Kampfspiele
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe-2
  ---
  #title
  Open-World-Multiplayer
  :::

  :::u-page-feature
  ---
  icon: i-lucide-box
  ---
  #title
  Physikbasierte Spiele
  :::

  :::u-page-feature
  ---
  icon: i-lucide-user
  ---
  #title
  Single-Player-3D-Spiele
  :::
::


::u-page-section
#title
Häufig gestellte Fragen

#default
  ::accordion
    :::accordion-item{label="Was ist eine Three.js-Spieleengine?"}
    Eine Three.js-Spieleengine baut auf dem Rendering von Three.js auf und fügt die Systeme hinzu, die jedes Spiel braucht — Physik, Netzwerk, Entity-Verwaltung, Animationen und Tooling. Statt separate Bibliotheken selbst zusammenzuführen, liefert eine Spieleengine all das integriert und funktionierend. MavonEngine ist eine Three.js-Spieleengine für Browserspiele — mit serverautoritativer Physik und Multiplayer-Netzwerk von Anfang an.
    :::

    :::accordion-item{label="Was ist der Unterschied zwischen einer Three.js-Spieleengine und purem Three.js?"}
    Three.js ist eine Rendering-Bibliothek — sie zeichnet 3D-Szenen im Browser. Eine Three.js-Spieleengine wie MavonEngine ergänzt alles Weitere: ein Entity-System, State Machines, Physiksimulation, Echtzeit-Multiplayer-Netzwerk, Asset-Loading, Animationen, Partikel und einen Level-Editor. Du schreibst weniger Boilerplate und konzentrierst dich auf die Spiellogik.
    :::

    :::accordion-item{label="Kann man mit Three.js Multiplayer-Spiele bauen?"}
    Ja, aber Three.js allein hat kein Netzwerk und keine Physik — du musst beides selbst integrieren. MavonEngine löst das, indem es Rapier3D-Physik auf dem Server neben der Three.js-Szene des Clients betreibt, mit WebRTC-basierter Zustandssynchronisierung. Es übernimmt die schwierigen Teile von Multiplayer, damit du dich auf das Gameplay konzentrieren kannst.
    :::

    :::accordion-item{label="Was ist die beste Three.js-Spieleengine für Multiplayer?"}
    MavonEngine ist die einzige Three.js-Spieleengine, die speziell für Multiplayer-Browserspiele entwickelt wurde. Sie betreibt eine serverautoritäre Physiksimulation parallel zur Three.js-Welt des Clients — für präzise Treffererkennung, Anti-Cheat und Echtzeit-Zustandssynchronisierung, ohne es selbst aufbauen zu müssen.
    :::

    :::accordion-item{label="Unterstützt eine Three.js-Spieleengine Physik?"}
    MavonEngine enthält Rapier3D-Physik auf Server und Client. Der Server führt die autoritäre Simulation aus — Kollision, Treffererkennung, räumliche Abfragen — während der Client Physik für visuelles Feedback nutzt. Diese Aufteilung verhindert Cheating und sorgt für konsistentes Gameplay bei allen Spielern.
    :::

    :::accordion-item{label="Gibt es eine kostenlose Three.js-Spieleengine?"}
    Ja. MavonEngine ist kostenlos und Open Source. Es enthält Rendering, Physik, Multiplayer-Netzwerk, Entity-Verwaltung, Animationen, Partikel und einen Level-Editor — alles kostenlos.
    :::

    :::accordion-item{label="Wie starte ich mit dem Bau eines 3D-Browserspiels mit Three.js?"}
    Der schnellste Weg ist, ein Projekt mit `npx @mavonengine/create-bootstrap` zu erstellen. Das richtet ein funktionierendes Three.js-Spieleengine-Projekt mit Physik und Multiplayer-Unterstützung in unter einer Minute ein. Folge dem [Erste-Schritte-Leitfaden](/de/getting-started), um von null zu einem laufenden Spiel zu kommen.
    :::
  ::
::

::u-page-section
  :::u-page-c-t-a
  ---
  links:
    - label: Community beitreten
      href: /community
      trailingIcon: i-lucide-arrow-right
    - label: Auf GitHub ansehen
      to: https://github.com/mavonengine
      target: _blank
      variant: subtle
      icon: i-simple-icons-github
  title: Multiplayer-3D-Spiele schneller bauen
  description: Server + Client + Physik + Netzwerk + Rendering + Animation + Partikel + Debugging. Alles in einem Paket. Alles zusammenarbeitend. Alles TypeScript.
  ---
  :::
::
