import type { APIRoute } from 'astro'
import { localeCodes, pageKinds, pathFor } from '../content'

export const GET: APIRoute = ({ site }) => {
  const absolute = (path: string) => new URL(path, site).href
  const urls = pageKinds.flatMap((kind) =>
    localeCodes.map((locale) => {
      const alternates = localeCodes
        .map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${absolute(pathFor(code, kind))}"/>`)
        .join('\n')
      return `  <url>\n    <loc>${absolute(pathFor(locale, kind))}</loc>\n${alternates}\n  </url>`
    }),
  )
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
