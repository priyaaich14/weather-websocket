const express = require('express')
const cors = require('cors')
const WebSocket = require('ws')
const http = require('http')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const port = 8000

app.use(express.json())
app.use(cors())

// WebSocket connection handler
wss.on('connection', function connection(ws) {
    console.log('A new client connected')

    // Send data every 3 seconds
    const interval = setInterval(() => {
        sendRandomData(ws)
    }, 10000)

    ws.on('close', () => {
        console.log('Client has disconnected')
        clearInterval(interval)
    })
})

function sendRandomData(ws) {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true
    })

    const data = {
        temperature: (Math.random() * 35 + 10).toFixed(1),  // Random temperature between 10 and 45 degrees Celsius
        humidity: (Math.random() * 50 + 30).toFixed(1),     // Random humidity between 30 and 80%
        timestamp: formattedDateTime  // Formatted as MM/DD/YYYY, HH:MM:SS AM/PM
    }

    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data))
    }
}

app.get('/api/status', (req, res) => {
    res.json({ message: "Server is up and running!" })
})


server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
