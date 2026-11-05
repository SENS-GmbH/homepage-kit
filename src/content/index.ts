import { de } from './de'
import { en } from './en'
import type { SiteContent, Weekday } from './types'

export { business } from './business'

// The languages of the site. To drop one, remove its import and its line here.
// To add one, copy de.ts, translate it and add it here.
export const locales = { de, en } satisfies Record<string, SiteContent>

export type Locale = keyof typeof locales

/** The default language lives at /, every other language under /<code>/. */
export const defaultLocale: Locale = 'de'

export const localeCodes = Object.keys(locales) as Locale[]

export type PageKind = 'home' | 'imprint' | 'privacy'

export const pageKinds: PageKind[] = ['home', 'imprint', 'privacy']

export const weekdays: Weekday[] = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

/** Address of a page, always with leading and trailing slash. */
export function pathFor(locale: Locale, kind: PageKind): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  const slug = kind === 'home' ? '' : `/${locales[locale].legal[kind].slug}`
  return `${prefix}${slug}/`
}

export const routes = localeCodes.flatMap((locale) =>
  pageKinds.map((kind) => ({ locale, kind, path: pathFor(locale, kind) })),
)
