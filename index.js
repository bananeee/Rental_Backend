import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// Config express and port
const app = express()
const PORT = process.env.PORT || 5000

// Config dotenv
dotenv.config()
Gg
// Config bodyParser
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

// Config cors
app.use(cors())

// Config mongoose
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MongoDB database connection established successfully"))
const connection = mongoose.connection


// routes
// app.use("/renter", renterRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})