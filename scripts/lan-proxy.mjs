// Forwards a LAN port to the dev server on loopback.
// The dev server itself cannot listen on all interfaces: `tailscale serve`
// already holds the preview port on the tailnet interface.
import net from 'node:net'

const [listenPort, targetPort] = process.argv.slice(2).map(Number)
if (!listenPort || !targetPort) {
  console.error('Usage: lan-proxy.mjs <listenPort> <targetPort>')
  process.exit(1)
}

net
  .createServer((client) => {
    const upstream = net.connect(targetPort, '127.0.0.1')
    client.pipe(upstream).pipe(client)
    const close = () => {
      client.destroy()
      upstream.destroy()
    }
    client.on('error', close)
    upstream.on('error', close)
  })
  .listen(listenPort, '0.0.0.0', () => {
    console.log(`LAN proxy :${listenPort} -> 127.0.0.1:${targetPort}`)
  })
