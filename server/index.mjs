import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { WebSocketServer } from 'ws'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Basic API example
app.get('/api/health', (_, res) => res.json({ ok: true, time: Date.now() }))

// Serve static frontend from /dist (after build)
const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))
app.get('*', (_, res) => res.sendFile(path.join(distPath, 'index.html')))

const PORT = process.env.PORT || 5050
const server = http.createServer(app)

// WebSocket server for live events
const wss = new WebSocketServer({ server, path: '/ws' })

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'hello', payload: { message: 'connected' } }))
})

function randomReport(){
  const regions = ['Greater Accra','Central Region','Ashanti','Northern']
  const sev = ['low','medium','high']
  const id = 'r' + Math.floor(Math.random()*100000)
  const region = regions[Math.floor(Math.random()*regions.length)]
  return {
    type: 'report',
    payload: {
      id,
      region,
      coords: { lat: 5 + Math.random()*2, lng: -2 + Math.random()*2 },
      severity: sev[Math.floor(Math.random()*sev.length)],
      timestamp: Date.now()
    }
  }
}

setInterval(()=>{
  const msg = JSON.stringify(randomReport())
  wss.clients.forEach(c => { try { c.send(msg) } catch {} })
}, 4000)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
