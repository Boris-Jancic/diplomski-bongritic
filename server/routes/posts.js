import express from "express"
import { check, validationResult } from "express-validator";
import { createPost, getPosts } from "../controllers/posts.js"

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

    check("game")
      .isNumeric(),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();
    if (hasError) {
      res.status(422).json({ messages: error.array() });
    } else {
      next();
    }
  }, createPost)

router.get('/', getPosts)

export default router