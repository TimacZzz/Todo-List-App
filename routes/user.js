import express from 'express'
import { sendHomepage, logout, addTask, dailyTasks, fourQuadrantsTasks } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.get('/', sendHomepage);
userRouter.get('/logout', logout)
userRouter.post('/addTask', addTask);
userRouter.get('/dailyTasks', dailyTasks);
userRouter.get('/fourQuadrantsTasks', fourQuadrantsTasks);