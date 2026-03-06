/**
 * Segment-level translation map for localized content paths.
 * Keeps EN→DE mappings; DE→EN is derived automatically.
 */
const EN_TO_DE: Record<string, string> = {
  'getting-started': 'erste-schritte',
  'quick-start': 'schnellstart',
  'installation': 'installation',
  'contributing': 'mitwirken',
  'ai-useage-policy': 'ki-nutzungsrichtlinien',
  'core-concepts': 'kernkonzepte',
  'game-loop': 'spielschleife',
  'entity-system': 'entity-system',
  'state-machine': 'zustandsmaschine',
  'world-management': 'weltverwaltung',
  'event-system': 'ereignissystem',
  'level-editor': 'level-editor',
  'networking': 'netzwerk',
  'server': 'server',
  'client': 'client',
  'networked-actors': 'vernetzte-akteure',
  'state-sync': 'zustandssync',
  'input': 'eingabe',
  'resources': 'ressourcen',
  'asset-types': 'asset-typen',
  'utilities': 'dienstprogramme',
  'prefabs': 'prefabs',
  'grass': 'gras',
  'water': 'wasser',
  'creating-a-prefab': 'prefab-erstellen'
}

const DE_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_DE).map(([en, de]) => [de, en])
)

function translateSegments(path: string, map: Record<string, string>): string {
  return path
    .split('/')
    .map(segment => map[segment] ?? segment)
    .join('/')
}

/**
 * Returns the alternate locale href for the current content page,
 * correctly translating localized path segments.
 */
export function useContentI18n() {
  const route = useRoute()
  const { locale } = useI18n()

  const alternatePath = computed(() => {
    const path = route.path
    if (locale.value === 'de') {
      // Strip /de prefix, translate DE segments to EN
      const withoutPrefix = path.replace(/^\/de/, '') || '/'
      return translateSegments(withoutPrefix, DE_TO_EN)
    } else {
      // Translate EN segments to DE, add /de prefix
      return '/de' + translateSegments(path, EN_TO_DE)
    }
  })

  const currentPath = computed(() => route.path)

  const hreflangLinks = computed(() => {
    const enPath = locale.value === 'en' ? currentPath.value : alternatePath.value
    const dePath = locale.value === 'de' ? currentPath.value : alternatePath.value
    return [
      { rel: 'alternate', hreflang: 'en', href: enPath },
      { rel: 'alternate', hreflang: 'de', href: dePath },
      { rel: 'alternate', hreflang: 'x-default', href: enPath }
    ]
  })

  return { alternatePath, hreflangLinks }
}
