import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import reviewerRoutes from './routes/reviewer.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js'

const app = express() 
dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: "true"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"}))
app.use(cors())

app.use('/reviewers', reviewerRoutes);
app.use('/clients', clientRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log("Server running on port: " + PORT)))
    .catch((error) => console.log(error.message))

export const AUTH_MAILER_EMAIL = process.env.AUTH_MAILER_EMAIL
export const AUTH_MAILER_PASS = process.env.AUTH_MAILER_PASS
export const TOKEN_SECRET = process.env.TOKEN_SECRET