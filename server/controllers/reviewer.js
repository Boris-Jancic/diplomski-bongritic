import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import Reviewer from '../models/reviewer.js'

export const getReviewers = async (req, res) => { 
    try {
        const Reviewers = await Reviewer.find();
        console.log("Getting Reviewers")
        res.status(200).json(Reviewers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAvatar = async (req, res) => { 
    const { email } = req.query
    console.log(email)
    try {
        const Reviewers = await Reviewer.findBy();
        console.log("Getting Reviewers")
        res.status(200).json(Reviewers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}