import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import Client from '../models/client.js'

export const getClients = async (req, res) => { 
    try {
        const clients = await Client.find();
        console.log("Getting clients")
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createClient = async (req, res) => {
    const newClient = new Client(req.body)

    if (newClient === null) return res.status(400).json({message: 'Bad request'})
    
    if (!isValidEmail(newClient.email)) return res.status(400).json({message: 'Email not valid'})

    if (await Client.exists({email: newClient.email}).exec() !== null) {
        return res.status(409).json({message: 'A client with that email is already registered'})
    }

    try {
        newClient.password = await bcrypt.hash(newClient.password, await bcrypt.genSalt(10));
        newClient.save()
        return res.status(201).send({message: 'We have sent you a email regarding your verification'})
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}