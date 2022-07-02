import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/client.js";
import mailToClient from '../service/mailer.js'
import { TOKEN_SECRET } from '../server.js';

export const loginClient = async (req, res) => { 
    const { email, password } = req.body;
    
    try {
        const client = await Client.findOne({ email });

        if (!client) return res.status(404).json({ message: "Client doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, client.password);

        if (!isPasswordCorrect) { mailToClient(email, 'Warning', 'Bad login, was this you?' ) ;return res.status(400).json({ message: "Invalid credentials" });}

        if (!client.activated) return res.status(403).json({ message: "You are now allowed to use Bongritic" });

        const token = jwt.sign({ 
            email: client.email,
            username: client.username,
            role: 'CLIENT' }, TOKEN_SECRET, { expiresIn: "120s" });
        

        res.status(200).json(token);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const registerClient = async (req, res) => {
    const newClient = new Client(req.body)
    console.log(newClient)
    try {
        if (newClient === null) return res.status(400).json({message: 'Bad request'})
        
        if (!isValidEmail(newClient.email)) return res.status(400).json({message: 'Email not valid'})
        
        if (await Client.exists({username: newClient.username}).exec() !== null) 
            return res.status(409).json({message: 'A client with that username is already registered'})
        
        if (await Client.exists({email: newClient.email}).exec() !== null) 
            return res.status(409).json({message: 'A client with that email is already registered'})

        mailToClient(newClient.email, 'Regarding your registration', 'Thank you for registering to Bongritic! ' )
        newClient.password = await bcrypt.hash(newClient.password, await bcrypt.genSalt(10));
        newClient.activated = true
        newClient.save()
        return res.status(201).send({message: 'We have sent you a email regarding your registration'})
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}