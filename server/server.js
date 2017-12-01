const { createServer } = require('http')
const Gun = require('gun')

// Create HTTP Server
const web = createServer((req, res) => res.end("Hello, NationJS!"))
web.listen(process.env.PORT || 9000)

const gun = new Gun({
    web,
    peers: ["http://localhost:9001/gun", "http://localhost:9002/gun"],
    verify: {
        check: () => {
            console.log("Peer connected!")
            return true
        }
    }
})
