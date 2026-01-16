import express from 'express'
import { sendHomepage, logout, addTask, dailyTasks, fourQuadrantsTasks, deleteTask, getTask } from '../controllers/userController.js'
import { requireAuth } from '../middleware/loginCheck.js'

export const userRouter = express.Router();

userRouter.get('/', requireAuth, sendHomepage);
userRouter.get('/logout', requireAuth, logout)
userRouter.post('/addTask', requireAuth, addTask);
userRouter.get('/dailyTasks', requireAuth, dailyTasks);
userRouter.get('/fourQuadrantsTasks', requireAuth, fourQuadrantsTasks);
userRouter.delete('/:taskId', requireAuth, deleteTask)
userRouter.get('/:taskId', requireAuth, getTask);