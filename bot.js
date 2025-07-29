const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('✅ Bot is alive'))
app.listen(3000, () => console.log('🌐 Web server online'))

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST,
    port: parseInt(process.env.MC_PORT) || 25565,
    username: process.env.MC_USERNAME,
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined the server')
    setInterval(() => {
      bot.setControlState('forward', true)
      setTimeout(() => {
        bot.setControlState('forward', false)
        bot.setControlState('back', true)
        setTimeout(() => {
          bot.setControlState('back', false)
        }, 1000)
      }, 1000)
    }, 5 * 60 * 1000)
  })

  bot.on('end', () => {
    console.log('🔁 Bot disconnected, reconnecting...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', err => {
    console.log('❌ Bot error:', err)
  })
}

createBot()
