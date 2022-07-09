import Reviewer from '../models/reviewer.js'

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
        res.status(404).json({ message: error.message });
    }
}

export const getReviewers = async (req, res) => { 
    const { page = 1, limit = 1, createdAt = -1 } = req.query
    try {
        const count = await Reviewer.countDocuments()
        const reviewers = await Reviewer.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({"createdAt": createdAt})

        return res.status(200).json({
            currentPage: Math.ceil(page),
            totalPages: Math.ceil(count / limit),
            reviewers: reviewers
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const alterReviewerAccess = async (req, res) => {
    const { username } = req.query
    try {
        const reviewer = await Reviewer.findOne({'username': username}).exec()
        
        reviewer.activated ? reviewer.activated = false : reviewer.activated = true
        
        reviewer.save()
        return res.status(200).json({message: "Successfully updated reviewer"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAvatar = async (req, res) => { 
    try {
        const reviewer = await Reviewer.findBy();
        return res.status(200).json(reviewer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}