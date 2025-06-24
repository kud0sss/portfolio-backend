console.log('Starting server...')

     const express = require('express')
     const cors = require('cors')
     const mongoose = require('mongoose')
     const Contact = require('./Contact')

     const app = express()

     app.use(cors({ origin: 'http://localhost:3000' }))
     app.use(express.json())

     mongoose.connect('mongodb://localhost:27017/portfolio', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     }).then(() => {
       console.log('Connected to MongoDB')
     }).catch(err => {
       console.error('MongoDB connection error:', err)
       process.exit(1)
     })

     app.get('/', (req, res) => {
       res.send('OK')
     })

     app.get('/contacts', async (req, res) => {
       try {
         const contacts = await Contact.find()
         res.json(contacts)
       } catch (err) {
         console.error('GET /contacts error:', err)
         res.status(500).send('Server error')
       }
     })

     app.post('/contacts', async (req, res) => {
       try {
         const contact = new Contact(req.body)
         await contact.save()
         res.json(contact)
       } catch (err) {
         console.error('POST /contacts error:', err)
         res.status(500).send('Server error')
       }
     })

     app.listen(5000, (err) => {
       if (err) {
         console.error('Error starting server:', err)
         return
       }
       console.log('Server is running on http://localhost:5000')
     })