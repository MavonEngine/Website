---
seo:
  title: MavonEngine — Multiplayer-3D-Spieleengine
  description: Baue Multiplayer-3D-Spiele für den Browser mit einer einheitlichen Server-Client-Architektur, integrierter Physik und Echtzeit-Netzwerkfunktionen.
---
::u-page-hero{class="overflow-hidden"}
---
orientation: horizontal
---
#title
Multiplayer-3D [Spieleengine]{.text-primary}

#description
Baue Multiplayer-3D-Spiele für den Browser mit einer einheitlichen Server-Client-Architektur, integrierter Physik und Echtzeit-Netzwerkfunktionen.

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

#default
  :::prose-pre
  ---
  code: |
    import { MavonServer, MavonClient, Entity } from 'mavonengine'

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
  import { MavonServer, MavonClient, Entity } from 'mavonengine'

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
  Unterstützung für benutzerdefinierte GLSL-Shader mit Debug-Rendering-Modi — Wireframe-, Armatur- und Physik-Overlays.
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
  :video{src="/static/levelEditor.mp4" autoplay loop muted playsinline controls class="w-full"}
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
    :video{src="/static/grassPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4"}

    **Gras** — Üppige, performante Grasfelder mit Windsimulation und LOD-Unterstützung. Füge es in deine Szene ein und konfiguriere Dichte, Schwingung und Farbe in Sekunden.
    ::::

    ::::div
    :video{src="/static/waterPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4"}

    **Wasser** — Einfacher Wasser-Shader. 3 LODs + Grundanpassungen — sofort einsatzbereit.
    ::::
  :::
::

::u-page-section
#title
Anders gebaut

#description
Die meisten Multiplayer-Browserspiele werden mit Klebeband zusammengehalten. MavonEngine ist von Grund auf als einheitliches System konzipiert.

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
  Schreibe Spiellogik einmal und sie funktioniert auf Server und Client. Das gemeinsame Entity-System eliminiert Duplikation und Drift.
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
MavonEngine ist speziell für Echtzeit-Multiplayer entwickelt. Alles, was Spieler, Physik und eine Welt im Browser benötigt.

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
