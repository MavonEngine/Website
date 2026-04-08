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
    import { MavonServer, MavonClient, Entity } from '@mavonengine/core'

    // Server-side game world
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

  // Server-side game world
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
::

::u-page-section
#title
Level Editor

#description
Very early WIP — a level editor that loads directly from the running game instance on the page.

#default
  :::div{class="rounded-xl overflow-hidden shadow-2xl"}
  :video{src="/static/levelEditor.mp4" autoplay loop muted playsinline controls class="w-full" title="MavonEngine Three.js Game Engine — Level Editor"}
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
  Tweakpane integration, debug visualization, performance monitoring, and comprehensive TypeScript types. Catch bugs fast, ship faster.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-puzzle
  ---
  #title
  Extensible Architecture

  #description
  Abstract base classes let you customize servers, entities, and game logic without fighting the framework. Designed to grow with your project.
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
    The fastest way is to scaffold a project with `npx @mavonengine/create-bootstrap`. This sets up a working Three.js game engine project with physics and multiplayer support in under a minute. Follow the [Getting Started guide](/getting-started) to go from zero to a running game.
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
  description: Server + Client + Physics + Networking + Rendering + Animation + Particles + Debugging. All in one package. All working together. All TypeScript.
  ---
  :::
::
