---
title: Visual Scripting That Isn't Going Anywhere
description: Unreal Engine 6 drops Blueprints. MavonEngine's logic graphs give you node-based visual scripting for browser games, on the client and the server, saved as plain JSON in your repo.
seo:
  title: Unreal Blueprints Alternative – Visual Scripting for Browser Games | MavonEngine
  description: Epic says Unreal Engine 6 won't ship Blueprints. MavonEngine logic graphs give you node-based visual scripting for multiplayer browser games, with events, flow control, variables and your own nodes in TypeScript.
---
::home-hero
---
badge: UE6 IS DROPPING BLUEPRINTS
command: npx @mavonengine/cli create my-game
tags: [Visual Scripting, Server + Client, TypeScript Nodes, Open Source]
---
#title
Your graphs [don't have to go]{.accent}

#description
Epic has [announced](https://www.gamedeveloper.com/programming/unreal-engine-6-to-remove-blueprints-and-actor-gameplay-framework-from-the-beginning) that Unreal Engine 6 won't ship Blueprints and will move gameplay to Verse. MavonEngine is going the other way. Its logic graphs are node-based game logic that runs in the browser and on the server, and you can extend them with your own nodes in TypeScript.

#links
:home-button[Read the logic graph docs]{to="/core-concepts/logic-graphs" icon="i-lucide-arrow-right"}
:home-button[Try it live]{to="/demo" variant="outline" icon="i-lucide-gamepad-2"}

#default
  :::div{class="campaign-shot"}
  ![The MavonEngine level editor's Graphs view with the multiplayer template's NPC logic graph](/static/logic-graph-editor.png)
  :::
::

::home-section{id="live" index="01" label="LIVE" :max-width="760" large}
#title
This graph is running right now

#description
This is the multiplayer template's `server-npc` graph, unchanged, running on the engine's own `GraphRuntime` in your browser. In the game it runs on the server. Watch the steps light up, click the NPC, or change its parameters.

#default
  :::logic-graph-demo{demo="npc"}
  :::
::

::home-section{index="02" label="FAMILIAR" large}
#title
If you know Blueprints, you know this

#description
Events start a run, white exec wires put the steps in order, and value nodes work out what each step needs. The node set and the way you wire it will feel familiar.

#default
  :::div{class="g3"}
    ::::home-feature{icon="i-lucide-zap" title="Events"}
    **On Start**, **On Tick** with delta, **Every**, **On Key** and **On Message**: the usual places for a graph to start.
    ::::

    ::::home-feature{icon="i-lucide-git-branch" title="Flow control"}
    **Branch**, **Sequence**, **Do Once**, **Cooldown** and **Delay**, plus comparisons and And / Or / Not.
    ::::

    ::::home-feature{icon="i-lucide-variable" title="Variables & parameters"}
    Graph parameters that every placed instance can override, with **Get / Set Variable** for state that changes while the game runs.
    ::::

    ::::home-feature{icon="i-lucide-move-3d" title="Entity nodes"}
    Read and set position, rotation and scale on **Self** or any scene object, or move it with **Move By** / **Rotate By**.
    ::::

    ::::home-feature{icon="i-lucide-radio" title="Messages"}
    **Send Message** reaches every graph on the same side. Code can call into graphs with `sendGraphMessage()`, either to all of them or to one object's.
    ::::

    ::::home-feature{icon="i-lucide-sigma" title="Math & vectors"}
    The full set of math and vector nodes, component by component, so a float times a vec3 gives a vec3.
    ::::
  :::
::

::home-split{index="03" label="SERVER + CLIENT"}
#title
One graph, either side of the wire.

#description
Set a graph to run on the client, the server or both. A server graph drives a networked entity, and every player sees the result through the engine's state sync. You don't need a separate replication graph or RPC wiring.

#extra
  :::home-link-pills
  ---
  label: Related
  links:
    - label: Networked actors
      to: /networking/networked-actors
    - label: State sync
      to: /networking/state-sync
    - label: Scenes
      to: /core-concepts/scenes
  ---
  :::

#default
  :::div{class="campaign-shot"}
  ![The server NPC graph: On Tick runs Move By and Set Rotation, then a Branch flips direction once the NPC has walked far enough](/static/logic-graph-walk.png)
  :::
::

::home-section{index="04" label="MESSAGES" :max-width="760"}
#title
Graphs that talk to each other

#description
Two graphs, two files. The switch sends `toggle` when you press Space, and the lamp's **On Message** picks it up. Click the demo and press Space, or use the button. Switch tabs to watch each graph run.

#default
  :::logic-graph-demo{demo="messages" :height="360"}
  :::
::

::home-section{index="05" label="MATH & VECTORS" :max-width="760"}
#title
Values flow where steps can't

#description
Value nodes have no exec wires. They're worked out when a step reads them, so a float times a vec3 just works. Change the parameters and the graph restarts with the new values.

#default
  :::logic-graph-demo{demo="spinner" :height="380"}
  :::
::

::home-split{index="06" label="YOUR OWN NODES" top}
#title
When a graph isn't enough, write a node.

#description
A custom node is a small TypeScript object with typed ports and a `run` function. The NPC demo above uses one: **Say in Chat** comes from the template, not the engine. Register it and it shows up in the editor's node list next to the built-in nodes.

#default
```typescript
export const sayInChatNode: NodeDefinition = {
  type: 'chat.say',
  label: 'Say in Chat',
  category: 'Actions',
  kinds: ['logic'],
  inputs: {
    run: { type: 'exec', label: '' },
    message: { type: 'any', label: 'Message', default: 'Hello!' },
  },
  outputs: { then: { type: 'exec', label: '' } },
  run: ({ message }, { self }) => post?.(self?.id ?? '', String(message)),
}

registerNode(sayInChatNode)
```
::

::home-section{index="07" label="WHY IT LASTS" :max-width="760" large}
#title
Built so you don't have to migrate again

#description
Your graphs are files in your project. They aren't locked into a closed asset format or tied to one engine generation.

#default
  :::div{class="g3"}
    ::::home-feature{number="01" title="Plain JSON in your repo"}
    Each graph is a `.graph.json` file under `graphs/`. You can diff it, review it in a pull request and merge it like any other source file.
    ::::

    ::::home-feature{number="02" title="Open source, MIT"}
    The graph runtime and the editor are open source. Nobody can remove visual scripting from under you.
    ::::

    ::::home-feature{number="03" title="Hot reload on save"}
    Save in the editor and every object running that graph on the server restarts with the new version. On the client, each step lights up in the Graphs view as it runs.
    ::::

    ::::home-feature{number="04" title="Works with AI assistants"}
    Graphs are readable JSON, and `mavonengine mcp` lets AI coding assistants inspect the running game. Visual scripting and AI-assisted code can work side by side.
    ::::

    ::::home-feature{number="05" title="Material graphs too" wide}
    The same editor builds [material graphs](/core-concepts/material-graphs) that compile to three.js TSL node materials on the WebGPU renderer. They fill the same role as a material editor.
    ::::
  :::
::

::home-section{index="08" label="HONEST FIT" narrow}
#title
Is MavonEngine right for your project?

#default
  :::home-faq
    ::::home-faq-item{label="Is MavonEngine a replacement for Unreal Engine?"}
    For some games, but not all of them. MavonEngine is a TypeScript engine for 3D games that run in the browser, built on Three.js, Rapier physics and WebRTC networking. If you're building a multiplayer or single-player web game and want visual scripting, it's a good fit. If you need console builds, Nanite-scale rendering or a AAA content pipeline, it isn't.
    ::::

    ::::home-faq-item{label="Can I import my Blueprints?"}
    No. There's no Blueprint importer, and the node sets differ. Most gameplay patterns (events, branches, sequences, cooldowns, variables, messages) have direct equivalents, so rebuilding a graph is usually quick.
    ::::

    ::::home-faq-item{label="Do I need to know TypeScript?"}
    No, not for graphs. You can place objects and wire logic in the level editor. When you want a node the engine doesn't have, a custom node takes a few lines of TypeScript.
    ::::

    ::::home-faq-item{label="Does visual scripting work in multiplayer?"}
    Yes. A graph can run on the server and drive networked entities. The multiplayer template ships an NPC that's run entirely by a server-side logic graph.
    ::::

    ::::home-faq-item{label="Is it free?"}
    Yes. MavonEngine is free and open source, including the editor, logic graphs, material graphs, physics and networking.
    ::::
  :::
::

::home-cta{eyebrow="// KEEP YOUR GRAPHS"}
#title
Start a project with [visual scripting]{.accent} built in

#description
`npx @mavonengine/cli create my-game` scaffolds a multiplayer project with a working server-side NPC graph, so you have something to open and edit right away.

#links
:home-button[Get started]{to="/getting-started" icon="i-lucide-arrow-right"}
:home-button[Join the community]{to="/community" variant="outline"}
::

::div{class="wrap pb-16 text-center text-xs text-[#7f849c]"}
Unreal Engine and Blueprints are trademarks of Epic Games, Inc. MavonEngine is not affiliated with or endorsed by Epic Games.
::
