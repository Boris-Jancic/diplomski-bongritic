import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import clientRoutes from './routes/clients.js';
import reviewerRoutes from './routes/reviewers.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

const app = express() 

dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: "true"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"}))
app.use(cors())

app.use('/clients', clientRoutes);
app.use('/reviewers', reviewerRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log("Server running on port: " + PORT)))
    .catch((error) => console.log(error.message))