import express from "express"
import { check, validationResult } from "express-validator";
import { createPost, getLatestPost, getPosts } from "../controllers/posts.js"

const router = express.Router()

router.post('/',
  [
    check("title")
      .isLength(4)
      .withMessage("The name must have minimum length of 4")
      .trim(),

    check("text")
      .isLength({ min: 30 })
      .withMessage("The text must have minimum length of 30"),

    check("grade")
      .isNumeric()
      .isInt({ min:1, max: 5}),
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
  }, createPost)

router.get('/', getPosts)
router.get('/latest', getLatestPost)

export default router