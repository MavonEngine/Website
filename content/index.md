---
seo:
  title: MavonEngine – Three.js Game Engine for Single & Multiplayer Browser Games
  description: MavonEngine is a Three.js game engine built for single and multiplayer browser games — with server-authoritative physics, real-time networking, and a unified server-client architecture built in.
---
::home-hero
---
badge: OPEN SOURCE · ALL TYPESCRIPT
command: npx @mavonengine/cli create my-game
tags: [TypeScript, Three.js, Rapier Physics, WebRTC, GLTF / Draco]
---
#title
Three.js [Game Engine]{.accent} for Single & Multiplayer

#description
MavonEngine is a Three.js game engine built for real-time browser games — the only one with server-authoritative physics built in. Build single-player or multiplayer 3D games with a unified server-client architecture, integrated physics, and real-time networking.

#links
:home-button[Get started]{to="/getting-started" icon="i-lucide-arrow-right"}
:home-button[Join the community]{to="/community" variant="outline"}
:home-button[Try it live]{to="/demo" variant="outline" icon="i-lucide-gamepad-2"}

#default
  :::home-code-card
  ---
  sample: server
  badge: AUTHORITATIVE
  glow: true
  stats:
    - label: PHYSICS
      value: Rapier3D
    - label: TRANSPORT
      value: WebRTC · UDP
    - label: SYNC RADIUS
      value: 200 units
      accent: true
  ---
  :::
::

::home-demo
::

::home-section{id="features" index="01" label="ENGINE" large}
#title
Everything in one cohesive package

#description
No more piecing together libraries. MavonEngine ships rendering, physics, networking, animation, particles, and debugging as a unified whole.

#default
  :::div{class="g3"}
    ::::home-feature{icon="i-lucide-layers" title="Full-Stack Multiplayer Architecture"}
    Shared Entity System — write once, run on server and client. Automatic state synchronization with bandwidth optimization, distance-based culling for entity visibility, and hash-based change detection to minimize network traffic.
    ::::

    ::::home-feature{icon="i-lucide-zap" title="Integrated 3D Physics with Rapier"}
    Kinematic character controller with slope climbing and sliding. Configurable parameters — 45° climb, 30° auto-slide. Full body & collider management and physics debug visualization in real-time.
    ::::

    ::::home-feature{icon="i-lucide-monitor" title="Advanced 3D Rendering with Three.js"}
    The full power of Three.js with custom GLSL shader support and debug rendering modes including wireframe, armature, and physics overlays.
    ::::

    ::::home-feature{icon="i-lucide-wifi" title="Real-Time Multiplayer Networking"}
    WebRTC-based communication for real-time data channels. Bandwidth tracking & monitoring, command buffering & processing across network latency, and server health monitoring with built-in HTTP endpoints.
    ::::

    ::::home-feature{icon="i-lucide-play" title="Skeletal Animation System"}
    Animation state management with logical organization. Smooth fade transitions with configurable duration, GLTF model support with Draco compression, and efficient skeleton cloning for instanced models.
    ::::

    ::::home-feature{icon="i-lucide-sparkles" title="Particle Effects Framework"}
    Built-in effects — rain and smoke ready to use. Custom shader support for unique particle visuals.
    ::::

    ::::home-feature{icon="i-lucide-map" title="Scenes Shared by Client & Server"}
    One JSON scene file for both sides — the client builds what is rendered, the server builds colliders and game logic. Save in the editor and the server reloads the map for every connected player.
    ::::

    ::::home-feature{icon="i-lucide-puzzle" title="Engine Plugins"}
    Official plugins for chat, accounts, a database, mail, notifications and monitoring, installed with `mavonengine install` or from the dashboard and the editor. `mavonengine build` ships only the assets your game uses.
    ::::

    ::::home-feature{icon="i-lucide-gamepad-2" title="Gamepad Support"}
    Xbox, PlayStation and generic controllers out of the box — radial deadzones, layout-aware button labels, analog triggers and rumble.
    ::::

    ::::home-feature{icon="i-lucide-activity" title="Live Server Monitoring"}
    Tick time against the tick budget, CPU, bandwidth, the job queue, players and their accounts, logs, HTTP requests and the database — in the terminal or in the browser behind a login.
    ::::

    ::::home-feature{icon="i-lucide-bot" title="AI Assistant Support (MCP)"}
    `mavonengine mcp` lets any AI coding assistant inspect your running game: server metrics, scenes and entities, renderer stats, console, screenshots and frame traces — and read these docs.
    ::::

    ::::home-feature{icon="i-lucide-signal" title="Latency Simulation"}
    Test your netcode against artificial latency, jitter and packet loss before your players do.
    ::::

    ::::home-feature{icon="i-lucide-key-round" title="Player Accounts"}
    Logins, sessions and guests who keep their progress when they register. Every connection gets a stable account id. Email confirmation and password resets by mail.
    ::::

    ::::home-feature{icon="i-lucide-database" title="Database & Job Queue"}
    A SQLite database on Node's built-in `node:sqlite`, with migrations per plugin. Background jobs with retries, backoff and delays that survive a restart.
    ::::

    ::::home-feature{icon="i-lucide-bell" title="Mail & Notifications"}
    `player.notify(new LevelUp())` reaches the player in the game, by mail, or kept to read later. Queued mail in a layout you can change, over SMTP or any nodemailer transport.
    ::::
  :::
::

::home-split{index="02" label="LEVEL EDITOR" note="EARLY WIP"}
#title
Edit the world while it runs.

#description
A level editor that boots inside the running game and stays connected to the server. Edit the scene, press save, and the server reloads the map for every player. Dock your own tools as custom panels.

#extra
:::home-shortcut{modifier="Ctrl" key-name="S" hint="map reloads for all players"}
:::

#default
:::home-video{src="/static/levelEditor.mp4" title="MavonEngine Three.js Game Engine — Level Editor"}
:::
::

::home-section{id="showcase" index="03" label="PLUGINS & SCREENSHOTS" :max-width="620"}
#title
Plug it in. Watch it run.

#description
Official plugins for chat, accounts, a database, mail, notifications and monitoring — one command each, and the engine wires them together. Plugins can use each other and share the same database.

#aside
:::install-command
:::
::

::showcase-carousel
::

::div{class="wrap mt-7 flex flex-wrap gap-3 justify-center"}
:home-button[All plugins]{to="/tooling/plugins" variant="outline" icon="i-lucide-arrow-right"}
:home-button[Monitoring docs]{to="/tooling/monitoring" variant="outline"}
::

::home-split{index="04" label="LIVE OPS" top}
#title
Everything a Live Game Needs

#description
Accounts, a database, background jobs, mail and notifications — the server side of a game that players keep coming back to. Install the plugins you need, and the engine wires them together.

#extra
  :::home-link-pills
  ---
  label: Live game tooling
  links:
    - label: Player accounts
      to: /tooling/auth
    - label: Database
      to: /tooling/database
    - label: Job queue
      to: /tooling/queue
    - label: Mail
      to: /tooling/mail
    - label: Notifications
      to: /tooling/notifications
  ---
  :::

#default
:::home-code-card{sample="liveops"}
:::
::

::home-section{index="05" label="PREFABS" :max-width="680"}
#title
Drop in. Tweak. Ship.

#description
Ready-to-use prefabs built by the community — from environment assets to gameplay elements. Pull any prefab directly into the editor, and anyone can publish to the community registry.

#aside
:home-button[Browse the prefab docs]{to="/prefabs" variant="outline" icon="i-lucide-arrow-right"}

#default
  :::div{class="g2"}
    ::::home-prefab{title="Grass" tag="WIND · LOD" tone="green" video="/static/grassPrefab.mp4" video-title="MavonEngine Three.js Game Engine — Grass Prefab with Wind Simulation"}
    Lush, performant grass fields with wind simulation and LOD support. Configure density, sway, and color in seconds.
    ::::

    ::::home-prefab{title="Water" tag="3 LOD · SHADER" tone="sapphire" video="/static/waterPrefab.mp4" video-title="MavonEngine Three.js Game Engine — Water Shader Prefab"}
    Basic water shader with 3 LOD levels and basic customizations — ready to use out of the box.
    ::::
  :::
::

::home-section{index="06" label="ARCHITECTURE" :max-width="760" large}
#title
Built different

#description
Most multiplayer browser games are held together with duct tape. MavonEngine is designed from the ground up as a unified system — so everything works together out of the box.

#default
  :::div{class="g3"}
    ::::home-feature{number="01" title="Complete Solution"}
    Rendering, physics, networking, entity management, asset loading, animation, particles, and debugging tools in one cohesive package.
    ::::

    ::::home-feature{number="02" title="Server + Client Unity" wide}
    Write game logic once and it works on both server and client. The shared entity system eliminates duplication and drift. The server runs a simplified hitbox scene alongside the client's full Three.js world — enabling authoritative hit detection, raycasting, and spatial queries without trusting the client.
    ::::

    ::::home-feature{number="03" title="Networking Built In"}
    Distance-based culling, hash-based change detection, bandwidth monitoring, and automatic state synchronization — all built in, none bolted on.
    ::::

    ::::home-feature{number="04" title="Developer Experience"}
    One command to create and run a project, a live server dashboard, Tweakpane debug panels, physics overlays, MCP support for AI assistants, and comprehensive TypeScript types.
    ::::

    ::::home-feature{number="05" title="Extensible Architecture"}
    Abstract base classes let you customize servers, entities, and game logic without fighting the framework. Engine plugins add client, server and editor features as npm packages.
    ::::
  :::
::

::home-section{id="usecases" index="07" label="USE CASES" center large}
#title
What can you build?

#description
Anything that needs players, physics, and a world in the browser.

#default
  :::div{class="g5"}
  ::::home-use-case{icon="i-lucide-star" title="Action RPGs"}
  ::::
  ::::home-use-case{icon="i-lucide-gamepad-2" title="PvP Combat Games"}
  ::::
  ::::home-use-case{icon="i-lucide-globe" title="Open World Multiplayer"}
  ::::
  ::::home-use-case{icon="i-lucide-box" title="Physics-Based Games"}
  ::::
  ::::home-use-case{icon="i-lucide-user-round" title="Single-Player 3D Games"}
  ::::
  :::
::

::home-section{index="08" label="FAQ" narrow}
#title
Frequently Asked Questions

#default
  :::home-faq
    ::::home-faq-item{label="What is a Three.js game engine?"}
    A Three.js game engine builds on top of Three.js's rendering to add the systems every game needs — physics, networking, entity management, animations, and tooling. MavonEngine is a Three.js game engine built specifically for browser games, with server-authoritative physics and multiplayer networking built in from the start.
    ::::

    ::::home-faq-item{label="How is a Three.js game engine different from vanilla Three.js?"}
    Three.js is a rendering library — it draws 3D scenes in the browser. MavonEngine adds everything else: an entity system, state machines, physics simulation, real-time multiplayer networking, asset loading, animations, particles, and a level editor.
    ::::

    ::::home-faq-item{label="Can you build multiplayer games with Three.js?"}
    Yes, but Three.js alone has no networking or physics. MavonEngine runs Rapier3D physics on the server alongside the client's Three.js scene, with WebRTC-based state synchronization built in.
    ::::

    ::::home-faq-item{label="What is the best Three.js game engine for multiplayer?"}
    MavonEngine is purpose-built for multiplayer browser games. It runs a server-authoritative physics simulation in parallel with the client's Three.js world, giving you accurate hit detection, anti-cheat, and real-time state sync without building it from scratch.
    ::::

    ::::home-faq-item{label="Does a Three.js game engine handle physics?"}
    MavonEngine includes Rapier3D physics on both the server and client. The server runs the authoritative simulation — collision, hit detection, spatial queries — while the client uses physics for visual feedback.
    ::::

    ::::home-faq-item{label="Is there a free Three.js game engine?"}
    Yes. MavonEngine is free and open source — rendering, physics, multiplayer networking, entity management, animations, particles, and a level editor, all at no cost.
    ::::

    ::::home-faq-item{label="Does MavonEngine handle player accounts and logins?"}
    Yes. The `@mavonengine/auth` plugin adds accounts, sessions, guest play and login rate limiting; with `@mavonengine/mail` it confirms emails and resets passwords. [Player accounts docs](/tooling/auth).
    ::::

    ::::home-faq-item{label="Can a Three.js game send emails and notifications to players?"}
    With MavonEngine, yes. `player.notify(new LevelUp())` reaches the player in the game, by mail and in an inbox. Mail goes on the server's job queue and is retried when the mail server is down.
    ::::

    ::::home-faq-item{label="How do I start building a 3D browser game with Three.js?"}
    Scaffold a project with `npx @mavonengine/cli create my-game` — a working project with physics and multiplayer in under a minute. Then follow the [Getting Started guide](/getting-started).
    ::::
  :::
::

::home-section{id="community" index="09" label="COMMUNITY"}
#title
Latest from the forum

#description
Questions, showcases and announcements from people building with MavonEngine.

#aside
:home-button[Visit the forum]{to="/community" variant="outline" icon="i-lucide-arrow-right"}

#default
  :::home-community-posts
  :::
::

::home-cta{eyebrow="// READY PLAYER ONE"}
#title
Build Multiplayer 3D Games [Faster]{.accent}

#description
Server + Client + Physics + Networking + Rendering + Scenes + Animation + Particles + Accounts + Database + Queue + Mail + Plugins + Tooling. **All in one package. All working together. All TypeScript.**

#links
:home-button[Join the community]{to="/community" icon="i-lucide-arrow-right"}
:home-button[View on GitHub]{to="https://github.com/mavonengine" variant="outline" target="_blank"}
::
