---
seo:
  title: MavonEngine – Three.js Game Engine for Single & Multiplayer Browser Games
  description: MavonEngine is a Three.js game engine built for single and multiplayer browser games — with server-authoritative physics, real-time networking, and a unified server-client architecture built in.
---
::u-page-hero{class="overflow-hidden"}
---
orientation: horizontal
---
#title
Three.js [Game Engine]{.text-primary} for Single & Multiplayer

#description
MavonEngine is a Three.js game engine built for real-time browser games — the only one with server-authoritative physics built in. Build single-player or multiplayer 3D games with a unified server-client architecture, integrated physics, and real-time networking.

#links
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  variant: outline
  size: xl
  href: /community
  ---
  Join the community
  :::

  :::u-button
  ---
  color: neutral
  variant: subtle
  size: xl
  to: /demo
  trailing-icon: i-lucide-gamepad-2
  ---
  Try it live
  :::

#default
  :::prose-pre
  ---
  code: |
    import Server from '@mavonengine/core/Networking/Server/Server'
    import Player from './Base/Player'

    export default class GameServer extends Server<Player> {
      // A client connected: return its player, the server adds and syncs it
      protected onConnection(channel) {
        return new Player(channel.id)
      }

      // Inputs arrive in order and run on the authoritative tick
      protected onCommand(command) {
        const player = this.game.world.entities.items.get(command.playerId)
        player?.applyInput(command)
      }

      // Only sync entities within 200 units of each player
      getStateSyncDistance() {
        return 200
      }
    }
  filename: server.ts
  ---

  ```ts [server.ts]
  import Server from '@mavonengine/core/Networking/Server/Server'
  import Player from './Base/Player'

  export default class GameServer extends Server<Player> {
    // A client connected: return its player, the server adds and syncs it
    protected onConnection(channel) {
      return new Player(channel.id)
    }

    // Inputs arrive in order and run on the authoritative tick
    protected onCommand(command) {
      const player = this.game.world.entities.items.get(command.playerId)
      player?.applyInput(command)
    }

    // Only sync entities within 200 units of each player
    getStateSyncDistance() {
      return 200
    }
  }
  ```
  :::
::

::div{class="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto"}
:::div{class="rounded-xl overflow-hidden shadow-2xl w-full"}
:iframe{src="/demo" id="demo-frame" class="w-full border-0" loading="lazy" sandbox="allow-scripts allow-same-origin" style="height:600px; visibility:hidden"}
:::
::

::u-page-section{id="features"}
#title
Everything in one cohesive package

#description
No more piecing together libraries. MavonEngine ships rendering, physics, networking, animation, particles, and debugging as a unified whole.

#features
  :::u-page-feature
  ---
  icon: i-lucide-layers
  ---
  #title
  Full-Stack Multiplayer Architecture

  #description
  Shared Entity System — write once, run on server and client. Automatic state synchronization with bandwidth optimization, distance-based culling for entity visibility, and hash-based change detection to minimize network traffic.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Integrated 3D Physics with Rapier

  #description
  Kinematic character controller with slope climbing and sliding. Configurable parameters — 45° climb, 30° auto-slide. Full body & collider management and physics debug visualization in real-time.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-monitor
  ---
  #title
  Advanced 3D Rendering with Three.js

  #description
  MavonEngine is a Three.js game engine at its core — giving you the full power of Three.js with custom GLSL shader support and debug rendering modes including wireframe, armature, and physics overlays.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-wifi
  ---
  #title
  Real-Time Multiplayer Networking

  #description
  WebRTC-based communication for real-time data channels. Bandwidth tracking & monitoring, command buffering & processing across network latency, and server health monitoring with built-in HTTP endpoints.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-play
  ---
  #title
  Skeletal Animation System

  #description
  Animation state management with logical organization. Smooth fade transitions with configurable duration, GLTF model support with Draco compression, and efficient skeleton cloning for instanced models.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sparkles
  ---
  #title
  Particle Effects Framework

  #description
  Built-in effects — rain and smoke ready to use. Custom shader support for unique particle visuals.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-map
  ---
  #title
  Scenes Shared by Client & Server

  #description
  One JSON scene file for both sides — the client builds what is rendered, the server builds colliders and game logic. Save in the editor and the server reloads the map for every connected player.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-puzzle
  ---
  #title
  Engine Plugins

  #description
  `mavonengine install` adds plugins with client, server and asset parts. Configure them in `mavonengine.json`; `mavonengine build` ships only the assets your game actually uses.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gamepad-2
  ---
  #title
  Gamepad Support

  #description
  Xbox, PlayStation and generic controllers out of the box — radial deadzones, layout-aware button labels, analog triggers and rumble.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-activity
  ---
  #title
  Live Server Monitoring

  #description
  Tick time against the tick budget, CPU, bandwidth, players, logs and HTTP requests — in the terminal with `mavonengine dashboard`, or in the browser behind a login.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bot
  ---
  #title
  AI Assistant Support (MCP)

  #description
  `mavonengine mcp` lets any AI coding assistant inspect your running game: server metrics, scenes and entities, renderer stats, console, screenshots and frame traces from the browser tab — and read these docs.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-signal
  ---
  #title
  Latency Simulation

  #description
  Test your netcode against artificial latency, jitter and packet loss before your players do.
  :::
::

::u-page-section
#title
Level Editor

#description
Early WIP — a level editor that boots inside the running game and stays connected to the server. Edit the scene, press `Ctrl+S`, and the server reloads the map for every player. Dock your own tools as custom panels.

#default
  :::div{class="rounded-xl overflow-hidden shadow-2xl"}
  :video{src="/static/levelEditor.mp4" autoplay loop muted playsinline controls class="w-full" title="MavonEngine Three.js Game Engine — Level Editor"}
  :::
::

::u-page-section
#title
Live Server Monitoring

#description
Watch your game server while it runs: tick time against the tick budget, CPU, bandwidth, world and physics stats, connected players, logs and HTTP requests. In the terminal with `mavonengine dashboard`, or in the browser with the `@mavonengine/http-monitoring` plugin.

#default
  :::div{class="text-center mb-6"}
  [Read the monitoring docs.](/tooling/monitoring)
  :::

  :::div{class="rounded-xl overflow-hidden shadow-2xl"}
  ![MavonEngine server monitoring dashboard: CPU, network and tick charts, world stats, players and logs](/images/http-monitoring.png)
  :::
::

::u-page-section
#title
Prefabs

#description
Drop in ready-to-use prefabs built by the community — from environment assets to gameplay elements. Pull any prefab directly into the editor, tweak it, and ship. Anyone can publish prefabs to the community registry.

#default
  :::div{class="text-center mb-6"}
  [Browse the prefab docs.](/prefabs)
  :::

  :::div{class="grid grid-cols-1 lg:grid-cols-2 gap-6"}
    ::::div
    :video{src="/static/grassPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4" title="MavonEngine Three.js Game Engine — Grass Prefab with Wind Simulation"}

    **Grass** — Lush, performant grass fields with wind simulation and LOD support. Drop it into your scene and configure density, sway, and color in seconds.
    ::::

    ::::div
    :video{src="/static/waterPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4" title="MavonEngine Three.js Game Engine — Water Shader Prefab"}

    **Water** — Basic water shader. 3 LOD + Basic customizations — ready to use out of the box.
    ::::
  :::
::

::u-page-section
#title
Built different

#description
Most multiplayer browser games are held together with duct tape. MavonEngine is a Three.js game engine designed from the ground up as a unified system — so everything works together out of the box.

#features
  :::u-page-feature
  ---
  icon: i-lucide-package
  ---
  #title
  Complete Solution

  #description
  Rendering, physics, networking, entity management, asset loading, animation, particles, and debugging tools in one cohesive package.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-server
  ---
  #title
  Server + Client Unity

  #description
  Write game logic once and it works on both server and client. The shared entity system eliminates duplication and drift. The server runs a simplified hitbox scene alongside the client's full Three.js world — enabling authoritative hit detection, raycasting, and spatial queries without trusting the client.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe
  ---
  #title
  Networking Built In

  #description
  Distance-based culling, hash-based change detection, bandwidth monitoring, and automatic state synchronization — all built in, none bolted on.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-code
  ---
  #title
  Developer Experience

  #description
  One command to create and run a project, a live server dashboard, Tweakpane debug panels, physics overlays, MCP support for AI assistants, and comprehensive TypeScript types. Catch bugs fast, ship faster.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-puzzle
  ---
  #title
  Extensible Architecture

  #description
  Abstract base classes let you customize servers, entities, and game logic without fighting the framework. Engine plugins add client, server and editor features as npm packages. Designed to grow with your project.
  :::
::

::u-page-section{id="usecases"}
#title
What can you build?

#description
MavonEngine is a Three.js game engine purpose-built for browser games — single-player or multiplayer. Anything that needs players, physics, and a world in the browser.

#features
  :::u-page-feature
  ---
  icon: i-lucide-star
  ---
  #title
  Action RPGs
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gamepad-2
  ---
  #title
  PvP Combat Games
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe-2
  ---
  #title
  Open World Multiplayer
  :::

  :::u-page-feature
  ---
  icon: i-lucide-box
  ---
  #title
  Physics-Based Games
  :::

  :::u-page-feature
  ---
  icon: i-lucide-user
  ---
  #title
  Single-Player 3D Games
  :::
::


::u-page-section
#title
Frequently Asked Questions

#default
  ::accordion
    :::accordion-item{label="What is a Three.js game engine?"}
    A Three.js game engine builds on top of Three.js's rendering to add the systems every game needs — physics, networking, entity management, animations, and tooling. Instead of wiring together separate libraries yourself, a game engine gives you all of that integrated and working together. MavonEngine is a Three.js game engine built specifically for browser games, with server-authoritative physics and multiplayer networking built in from the start.
    :::

    :::accordion-item{label="How is a Three.js game engine different from vanilla Three.js?"}
    Three.js is a rendering library — it draws 3D scenes in the browser. A Three.js game engine like MavonEngine adds everything else: an entity system, state machines, physics simulation, real-time multiplayer networking, asset loading, animations, particles, and a level editor. You write less boilerplate and focus on game logic instead.
    :::

    :::accordion-item{label="Can you build multiplayer games with Three.js?"}
    Yes, but Three.js alone has no networking or physics — you have to integrate them yourself. MavonEngine solves this by running Rapier3D physics on the server alongside the client's Three.js scene, with WebRTC-based state synchronization built in. It handles the hard parts of multiplayer so you can focus on gameplay.
    :::

    :::accordion-item{label="What is the best Three.js game engine for multiplayer?"}
    MavonEngine is the only Three.js game engine purpose-built for multiplayer browser games. It runs a server-authoritative physics simulation in parallel with the client's Three.js world, giving you accurate hit detection, anti-cheat, and real-time state sync without building it from scratch.
    :::

    :::accordion-item{label="Does a Three.js game engine handle physics?"}
    MavonEngine includes Rapier3D physics on both the server and client. The server runs the authoritative simulation — collision, hit detection, spatial queries — while the client uses physics for visual feedback. This split prevents cheating and keeps gameplay consistent across all players.
    :::

    :::accordion-item{label="Is there a free Three.js game engine?"}
    Yes. MavonEngine is free and open source. It includes rendering, physics, multiplayer networking, entity management, animations, particles, and a level editor — all at no cost.
    :::

    :::accordion-item{label="How do I start building a 3D browser game with Three.js?"}
    The fastest way is to scaffold a project with `npx @mavonengine/cli create my-game`. This sets up a working Three.js game engine project with physics and multiplayer support in under a minute. Follow the [Getting Started guide](/getting-started) to go from zero to a running game.
    :::
  ::
::

::u-page-section
  :::u-page-c-t-a
  ---
  links:
    - label: Join the community
      href: /community
      trailingIcon: i-lucide-arrow-right
    - label: View on GitHub
      to: https://github.com/mavonengine
      target: _blank
      variant: subtle
      icon: i-simple-icons-github
  title: Build Multiplayer 3D Games Faster
  description: Server + Client + Physics + Networking + Rendering + Scenes + Animation + Particles + Plugins + Tooling. All in one package. All working together. All TypeScript.
  ---
  :::
::
