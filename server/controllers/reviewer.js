import Reviewer from '../models/reviewer.js'
import mailToClient from '../service/mailer.js'

export const getReviewer = async (req, res) => { 
    const { email } = req.query
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
        return res.status(200).json(reviewer);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getReviewers = async (req, res) => { 
    const { page = 1, limit = 1, createdAt = -1 } = req.query
    try {
        const count = await Reviewer.countDocuments()
        const reviewers = await Reviewer.find({"awaitingApproval": false})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"createdAt": createdAt})

        return res.status(200).json({
            currentPage: Math.ceil(page),
            totalPages: Math.ceil(count / limit),
            reviewers: reviewers
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getNotApprovedReviewers = async (req, res) => {
    const { page = 1, limit = 1, createdAt = -1 } = req.query
    try {
        const count = await Reviewer.countDocuments()
        const reviewers = await Reviewer.find({"awaitingApproval": true})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"createdAt": createdAt})

        return res.status(200).json({
            currentPage: Math.ceil(page),
            totalPages: Math.ceil(count / limit),
            reviewers: reviewers
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const manageReviewerRegistrationRequest = async (req, res) => {
    const { email, approved } = req.query
    try {
        const reviewer = await Reviewer.findOne({'email': email}).exec()
        if (approved === 'true') {
            mailToClient(reviewer.email, 'Regarding your access', 'Hello, we have reviewed your profile and given you access to Bongritic.' )
            reviewer.awaitingApproval = false
            reviewer.activated = true
            await reviewer.save()
        } else {
            mailToClient(reviewer.email, 'Regarding your access', 'Hello, we have reviewed your profile and decided that you do not meet the criteria for a game critic.') 
            await reviewer.remove()
        }
        return res.status(200).json({message: "Successfully updated reviewer"});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const alterReviewerAccess = async (req, res) => {
    const { username } = req.query
    try {
        const reviewer = await Reviewer.findOne({'username': username}).exec()
        
        if (reviewer.activated) {
            reviewer.activated = false
            mailToClient(reviewer.email, 'Regarding your access', 'Hello, we regret to inform you that you have been blocked from using Bongritic.' )
        } else {
            reviewer.activated = true
            mailToClient(reviewer.email, 'Regarding your access', 'Hello, you are no longer blocked from using Bongritic.') 
        }
        
        reviewer.save()
        return res.status(200).json({message: "Successfully updated reviewer"});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getTotalReviewerNumber = async (req, res) => {
    try {
        const total = await Reviewer.countDocuments()
        const awaitingApproval = await Reviewer.countDocuments({"awaitingApproval": true})
        const blocked = await Reviewer.countDocuments({"activated": false})
        const approved = total - awaitingApproval
        return res.status(200).json({total: total, awaitingApproval: awaitingApproval, approved: approved, blocked: blocked})
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ message: error.message });
    }
}

export const getAvatar = async (req, res) => { 
    try {
        const reviewer = await Reviewer.findBy();
        return res.status(200).json(reviewer);
    } catch (error) {
        return  res.status(404).json({ message: error.message });
    }
}