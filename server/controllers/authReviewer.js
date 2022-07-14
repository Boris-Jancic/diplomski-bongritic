import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Reviewer from "../models/reviewer.js";
import mailToClient from '../service/mailer.js'
import { TOKEN_SECRET } from '../server.js';

export const loginReviewer = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const reviewer = await Reviewer.findOne({ email });

        if (!reviewer) return res.status(404).json({ message: "Reviewer doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, reviewer.password);

        if (!isPasswordCorrect) { mailToClient(email, 'Warning', 'Bad login, was this you?' ) ;return res.status(400).json({ message: "Invalid credentials" });}

        if (!reviewer.activated) return res.status(403).json({ message: "You are now allowed to use Bongritic" });

        const token = jwt.sign({ 
            email: email,
            name: reviewer.username,
            avatar: reviewer.avatar,
            role: 'REVIEWER' }, TOKEN_SECRET, { expiresIn: "120s" });

        res.status(200).json(token);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const registerReviewer = async (req, res) => {
    try {
        const newReviewer = new Reviewer(req.body)
    
        if (newReviewer === null) return res.status(400).json({message: 'Bad request'})
        
        if (!isValidEmail(newReviewer.email)) return res.status(400).json({message: 'Email not valid'})
        
        if (await Reviewer.exists({username: newReviewer.username}).exec() !== null) 
            return res.status(409).json({message: 'A reviewer with that username is already registered'})
        
        if (await Reviewer.exists({email: newReviewer.email}).exec() !== null) 
            return res.status(409).json({message: 'A reviewer with that email is already registered'})

        mailToClient(newReviewer.email, 'Regarding your registration', 'Thank you for wanting to register as a critic to Bongritic! Our admins will see your request shortly, please be patient.' )
        newReviewer.password = await bcrypt.hash(newReviewer.password, await bcrypt.genSalt(10));
        newReviewer.activated = false
        newReviewer.awaitingApproval = true
        newReviewer.save()
        return res.status(201).send({message: 'We have sent you a email regarding your verification'})
    } catch (error) {
        return res.status(409).json({message: error.message})
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}