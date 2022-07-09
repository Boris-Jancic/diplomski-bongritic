import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mailToClient from '../service/mailer.js'
import { TOKEN_SECRET } from '../server.js';
import Admin from "../models/admin.js";

export const loginAdmin = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });

        if (!admin) return res.status(404).json({ message: "Admin doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);

        if (!isPasswordCorrect) { mailToClient(email, 'Warning', 'Bad login, was this you?' ) ;return res.status(400).json({ message: "Invalid credentials" });}

        const token = jwt.sign({ 
            email: admin.email,
            username: admin.username,
            role: 'ADMIN' }, TOKEN_SECRET, { expiresIn: "120s" });

        return res.status(200).json(token);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}