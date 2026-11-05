import type { APIRoute } from 'astro'
import { business } from '../content'

// While the example content is active, search engines are kept out.
export const GET: APIRoute = ({ site }) => {
  const rules = business.demo ? 'Disallow: /' : 'Allow: /'
  const body = `User-agent: *\n${rules}\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
