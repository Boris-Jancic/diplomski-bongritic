import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import Reviewer from '../models/reviewer.js'

export const getReviewer = async (req, res) => { 
    const { email } = req.query
    console.log('pogod ' + email )
    try {
        const reviewer = await Reviewer
        .findOne({'email': email})
        .select('avatar')
        .select('username')
        .select('firstName')
        .select('lastName')
        .select('createdAt')
        .select('biography')
        .exec()
        res.status(200).json(reviewer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReviewers = async (req, res) => { 
    try {
        const reviewer = await Reviewer.find();
        res.status(200).json(reviewer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAvatar = async (req, res) => { 
    const { email } = req.query
    try {
        const reviewer = await Reviewer.findBy();
        res.status(200).json(reviewer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}