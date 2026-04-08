<script setup lang="ts">
const { locale } = useI18n()

onMounted(() => {
  setTimeout(() => {
    document.getElementById('demo-frame')!.style.visibility = 'visible'
  }, 500)
})

const { data: page } = await useAsyncData(
  () => `index-${locale.value}`,
  () => {
    if (locale.value === 'de') {
      return queryCollection('landing_de').first()
    }
    return queryCollection('landing').path('/').first()
  }
)
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://mavonengine.com/community/assets/site-image-kipwrzwn.png',
  twitterImage: 'https://mavonengine.com/community/assets/site-image-kipwrzwn.png'
})

const faqSchemas: Record<string, object> = {
  en: {
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is a Three.js game engine?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'A Three.js game engine builds on top of Three.js\'s rendering to add the systems every game needs — physics, networking, entity management, animations, and tooling. Instead of wiring together separate libraries yourself, a game engine gives you all of that integrated and working together. MavonEngine is a Three.js game engine built specifically for browser games, with server-authoritative physics and multiplayer networking built in from the start.' }
      },
      {
        '@type': 'Question',
        'name': 'How is a Three.js game engine different from vanilla Three.js?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Three.js is a rendering library — it draws 3D scenes in the browser. A Three.js game engine like MavonEngine adds everything else: an entity system, state machines, physics simulation, real-time multiplayer networking, asset loading, animations, particles, and a level editor. You write less boilerplate and focus on game logic instead.' }
      },
      {
        '@type': 'Question',
        'name': 'Can you build multiplayer games with Three.js?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, but Three.js alone has no networking or physics — you have to integrate them yourself. MavonEngine solves this by running Rapier3D physics on the server alongside the client\'s Three.js scene, with WebRTC-based state synchronization built in. It handles the hard parts of multiplayer so you can focus on gameplay.' }
      },
      {
        '@type': 'Question',
        'name': 'What is the best Three.js game engine for multiplayer?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'MavonEngine is the only Three.js game engine purpose-built for multiplayer browser games. It runs a server-authoritative physics simulation in parallel with the client\'s Three.js world, giving you accurate hit detection, anti-cheat, and real-time state sync without building it from scratch.' }
      },
      {
        '@type': 'Question',
        'name': 'Does a Three.js game engine handle physics?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'MavonEngine includes Rapier3D physics on both the server and client. The server runs the authoritative simulation — collision, hit detection, spatial queries — while the client uses physics for visual feedback. This split prevents cheating and keeps gameplay consistent across all players.' }
      },
      {
        '@type': 'Question',
        'name': 'Is there a free Three.js game engine?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. MavonEngine is free and open source. It includes rendering, physics, multiplayer networking, entity management, animations, particles, and a level editor — all at no cost.' }
      },
      {
        '@type': 'Question',
        'name': 'How do I start building a 3D browser game with Three.js?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'The fastest way is to scaffold a project with npx @mavonengine/create-bootstrap. This sets up a working Three.js game engine project with physics and multiplayer support in under a minute. Follow the Getting Started guide at mavonengine.com/getting-started to go from zero to a running game.' }
      }
    ]
  },
  de: {
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Was ist eine Three.js-Spieleengine?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Eine Three.js-Spieleengine baut auf dem Rendering von Three.js auf und fügt die Systeme hinzu, die jedes Spiel braucht — Physik, Netzwerk, Entity-Verwaltung, Animationen und Tooling. Statt separate Bibliotheken selbst zusammenzuführen, liefert eine Spieleengine all das integriert und funktionierend. MavonEngine ist eine Three.js-Spieleengine für Browserspiele — mit serverautoritativer Physik und Multiplayer-Netzwerk von Anfang an.' }
      },
      {
        '@type': 'Question',
        'name': 'Was ist der Unterschied zwischen einer Three.js-Spieleengine und purem Three.js?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Three.js ist eine Rendering-Bibliothek — sie zeichnet 3D-Szenen im Browser. Eine Three.js-Spieleengine wie MavonEngine ergänzt alles Weitere: ein Entity-System, State Machines, Physiksimulation, Echtzeit-Multiplayer-Netzwerk, Asset-Loading, Animationen, Partikel und einen Level-Editor. Du schreibst weniger Boilerplate und konzentrierst dich auf die Spiellogik.' }
      },
      {
        '@type': 'Question',
        'name': 'Kann man mit Three.js Multiplayer-Spiele bauen?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Ja, aber Three.js allein hat kein Netzwerk und keine Physik — du musst beides selbst integrieren. MavonEngine löst das, indem es Rapier3D-Physik auf dem Server neben der Three.js-Szene des Clients betreibt, mit WebRTC-basierter Zustandssynchronisierung. Es übernimmt die schwierigen Teile von Multiplayer, damit du dich auf das Gameplay konzentrieren kannst.' }
      },
      {
        '@type': 'Question',
        'name': 'Was ist die beste Three.js-Spieleengine für Multiplayer?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'MavonEngine ist die einzige Three.js-Spieleengine, die speziell für Multiplayer-Browserspiele entwickelt wurde. Sie betreibt eine serverautoritäre Physiksimulation parallel zur Three.js-Welt des Clients — für präzise Treffererkennung, Anti-Cheat und Echtzeit-Zustandssynchronisierung, ohne es selbst aufbauen zu müssen.' }
      },
      {
        '@type': 'Question',
        'name': 'Unterstützt eine Three.js-Spieleengine Physik?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'MavonEngine enthält Rapier3D-Physik auf Server und Client. Der Server führt die autoritäre Simulation aus — Kollision, Treffererkennung, räumliche Abfragen — während der Client Physik für visuelles Feedback nutzt. Diese Aufteilung verhindert Cheating und sorgt für konsistentes Gameplay bei allen Spielern.' }
      },
      {
        '@type': 'Question',
        'name': 'Gibt es eine kostenlose Three.js-Spieleengine?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Ja. MavonEngine ist kostenlos und Open Source. Es enthält Rendering, Physik, Multiplayer-Netzwerk, Entity-Verwaltung, Animationen, Partikel und einen Level-Editor — alles kostenlos.' }
      },
      {
        '@type': 'Question',
        'name': 'Wie starte ich mit dem Bau eines 3D-Browserspiels mit Three.js?',
        'acceptedAnswer': { '@type': 'Answer', 'text': 'Der schnellste Weg ist, ein Projekt mit npx @mavonengine/create-bootstrap zu erstellen. Das richtet ein funktionierendes Three.js-Spieleengine-Projekt mit Physik und Multiplayer-Unterstützung in unter einer Minute ein. Folge dem Erste-Schritte-Leitfaden unter mavonengine.com/de/getting-started, um von null zu einem laufenden Spiel zu kommen.' }
      }
    ]
  }
}

const faqSchema = faqSchemas[locale.value] ?? faqSchemas.en

useSchemaOrg([
  faqSchema,
  defineSoftwareApp({
    name: 'MavonEngine',
    operatingSystem: 'Web',
    applicationCategory: 'GameApplication',
    description: 'Full-stack Three.js game engine for single-player and multiplayer browser games — with server-authoritative physics, real-time networking, and a unified server-client architecture.',
    url: 'https://mavonengine.com',
    offers: {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    keywords: 'threejs game engine, three.js, multiplayer browser games, webgl game engine, rapier physics'
  })
])
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="false"
  />
</template>
