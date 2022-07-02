import { validationResult } from "express-validator";

export function checkClient(req, res, next) {
    const { authorization } = req.headers 

    if (authorization !== "CLIENT") return res.status(403).json({ message: error.message });

    return next();
}

export function checkReviewer(req, res, next) {
    const { authorization } = req.headers 
    
    if (authorization !== "REVIEWER") return res.status(403).json({ message: error.message });

    return next();
}

export function checkAdmin(req, res, next) {
    const { authorization } = req.headers 
    
    if (authorization !== "ADMIN") return res.status(403).json({ message: error.message });

    return next();
}

export function badRequestHandler(req, res, next) {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
        console.log(error.array())
        res.status(422).json({ messages: error.array() });
    } else {
        next();
    }
}