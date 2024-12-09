import type { Request, Response } from 'express'
import xss from 'xss'
import { Post, postZodSchema, type PostBase } from '../models/Post'

/** Creates a post in MongoDB.
 * 
 * Validates the request body with the postZodSchema.
 * If the request body is invalid, sends a 400 response with the validation errors.
 * If the request body is valid, creates a new post in MongoDB and emits the new post to all connected clients.
 * 
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 201 response with the created post if successful, or a 400 response with an error message if unsuccessful.
 */
export const createPost = async (req: Request, res: Response) => {
  // validate the request body with the zod schema
  const result = postZodSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).send(result.error.errors);
    return
  }

  try {
    const sanitized: PostBase = {
      ...result.data,
      message: xss(result.data.message),
      name: xss(result.data.name),
    }
    const createResult = await Post.create(sanitized)
    res.status(201).send(createResult)
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}

/** Retrieves all posts from MongoDB.
 * 
 * Retrieves all posts from MongoDB and sorts them by the createdAt field in descending order.
 * 
 * @param _ - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 200 response with all the posts if successful, or a 500 response with an error message if unsuccessful.
 */
export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.send(posts)
    return
  } catch (error) {
    res.status(500).send(error)
    return
  }
}

/** Retrieves a post by ID from MongoDB.
 * 
 * Retrieves a post by ID from MongoDB.
 * If the post is not found, sends a 404 response with an error message.
 * 
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 200 response with the post if successful, or a 404 response with an error message if unsuccessful.
 */
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = postZodSchema.safeParse(req.body)

  if (!result.success) {
    res.status(400).send(result.error.errors)
    return
  }

  try {
    const sanitized: PostBase = {
      ...result.data,
      message: xss(result.data.message),
      name: xss(result.data.name),
    }

    const updateResult = await Post.findByIdAndUpdate(id, sanitized, { new: true })
    if (!updateResult) {
      res.status(404).send({ message: 'Post not found' })
      return
    }
    res.send(updateResult)
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}

/** Deletes a post by ID from MongoDB.
 * 
 * Deletes a post by ID from MongoDB.
 * If the post is not found, sends a 404 response with an error message.
 * 
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns A 200 response with a success message if successful, or a 404 response with an error message if unsuccessful.
 */
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deleteResult = await Post.findByIdAndDelete(id)
    if (!deleteResult) {
      res.status(404).send({ message: 'Post not found' })
      return
    }
    res.send({ message: 'Post deleted successfully' })
    return
  } catch (error) {
    res.status(400).send(error)
    return
  }
}
