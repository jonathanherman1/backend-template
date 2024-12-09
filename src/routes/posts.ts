import { Router } from 'express'
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/posts'

const router = Router()

router.get('/', getPosts)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

export default router
