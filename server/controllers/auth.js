import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/client.js";

const secret = 'test'

export const login = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const oldUser = await Client.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "Client doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: email, role: 'CLIENT' }, secret, { expiresIn: "1h" });

        res.status(200).json(token);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const registerClient = async (req, res) => { 
    try {
        res.status(201).json(clients);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}