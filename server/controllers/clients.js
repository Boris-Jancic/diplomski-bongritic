import mongoose from 'mongoose'
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
    const client = req.body;

    const today = new Date().toISOString().slice(0, 10)
    client.dateOfRegistration = today
    
    const newClient = new Client(client)

    console.log("Creating a client, time: " + today)
    try {
        newClient.save()
        res.status(201).send(newClient)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}