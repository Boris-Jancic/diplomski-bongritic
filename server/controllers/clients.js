import Client from "../models/client.js"
import mailToClient from "../service/mailer.js"

export const getClients = async (req, res) => {
    const { page = 1, limit = 1, createdAt = -1 } = req.query
    try {
        const count = await Client.countDocuments()
        const clients = await Client.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"createdAt": createdAt})

        return res.status(200).json({
            currentPage: Math.ceil(page),
            totalPages: Math.ceil(count / limit),
            clients: clients
        });
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}

export const updateClientAccess = async (req, res) => {
    const { username } = req.query
    try {
        const client = await Client.findOne({'username': username}).exec()
        
        if (client.activated) {
            client.activated = false
            mailToClient(client.email, `Regarding your access`, `Hello ${client.username}, we regret to inform you that you have been blocked from using Bongritic.` )
        } else {
            client.activated = true
            mailToClient(client.email, `Regarding your access`, `Hello ${client.username}, you are no longer blocked from using Bongritic.`) 
        }
        
        client.save()
        return res.status(200).json({message: "Successfully updated reviewer"});
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}

export const getTotalUsers = async (req, res) => {
    try {
        const total = await Client.countDocuments()
        const blocked = await Client.countDocuments({"activated": false})
        return res.status(200).json({total: total, blocked: blocked})
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ message: error.message });
    }
}