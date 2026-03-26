---
seo:
  title: MavonEngine — Multiplayer 3D Game Engine
  description: Build multiplayer 3D games for the browser with a unified server-client architecture, integrated physics and real-time networking.
---
::u-page-hero{class="overflow-hidden"}
---
orientation: horizontal
---
#title
Multiplayer 3D [Game Engine]{.text-primary}

#description
Build multiplayer 3D games for the browser with a unified server-client architecture, integrated physics and real-time networking.

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
    import { MavonServer, MavonClient, Entity } from 'mavonengine'

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
  import { MavonServer, MavonClient, Entity } from 'mavonengine'

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
:iframe{src="/demo" class="w-full border-0" style="height:600px;"}
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
  Custom GLSL shader support with debug rendering modes — wireframe, armature, and physics overlays.
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
  :video{src="/static/levelEditor.mp4" autoplay loop muted playsinline controls class="w-full"}
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
    :video{src="/static/grassPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4"}

    **Grass** — Lush, performant grass fields with wind simulation and LOD support. Drop it into your scene and configure density, sway, and color in seconds.
    ::::

    ::::div
    :video{src="/static/waterPrefab.mp4" autoplay loop muted playsinline controls class="w-full rounded-xl mb-4"}

    **Water** — Basic water shader. 3 LOD + Basic customizations — ready to use out of the box.
    ::::
  :::
::

::u-page-section
#title
Built different

#description
Most multiplayer browser games are held together with duct tape. MavonEngine is designed from the ground up as a unified system.

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
  Write game logic once and it works on both server and client. The shared entity system eliminates duplication and drift.
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
MavonEngine is purpose-built for real-time multiplayer. Anything that needs players, physics, and a world in the browser.

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
