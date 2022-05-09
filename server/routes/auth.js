import express from "express"
import { check, validationResult } from "express-validator";
import { loginReviewer, registerReviewer } from "../controllers/authReviewer.js"

const router = express.Router()

router.post('/reviewer/login', loginReviewer)
router.post('/reviewer/register',
  [
    check("firstName")
        .isString()
        .trim()
        .withMessage("Bad firstname"),

    check("lastName")
        .isString()
        .trim()
        .withMessage("Bad lastname"),
    
    check("username")
        .isString()
        .trim()
        .withMessage("Bad username"),
    
    check("password")
        .isString()
        .trim()
        .withMessage("Bad password"),
    
    check("email")
        .isString()
        .isEmail()
        .trim()
        .withMessage("Bad email"),

    check("avatar")
        .isString()
        .trim()
        .withMessage("Bad avatar"),

    check("jmbg")
        .trim()
        .isLength(13)
        .withMessage("The jmbg must have minimum length of 13")
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();
    console.log(error.array())
    if (hasError) {
      res.status(422).json({ messages: error.array() });
    } else {
      next();
    }
  }, registerReviewer)

export default router