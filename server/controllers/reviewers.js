import mongoose from 'mongoose'
import Reviewer from '../models/Reviewer.js'

export const getReviewers = async (req, res) => { 
    try {
        const Reviewers = await Client.find();
        console.log("Getting Reviewers")
        res.status(200).json(Reviewers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createReviewer = async (req, res) => {
    const Reviewer = req.body;

    const newReviewer = new Reviewer(Reviewer)

    console.log("Creating a Reviewer, time: " + today)
    try {
        newReviewer.save()
        res.status(201).send(newReviewer)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}