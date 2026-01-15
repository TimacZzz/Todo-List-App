import { getDBConnection } from "../db/db.js"
import path from "node:path"

const dirname = process.cwd();

export function sendHomepage(req, res){
    res.sendFile(path.join(dirname, "public/tasks.html"));
}

export async function logout(req, res){
    req.session.destroy( () => {
        res.json({ message: 'Logged Out'});
    });
}

export async function addTask(req, res){
    const userId = req.session.userId;
    const { title, dueDate, quadrant, description } = req.body;

    try{
        const db = await getDBConnection();

        await db.run('INSERT INTO tasks (title, due_date, quadrant, description, user_id) VALUES (?, ?, ?, ?, ?)', [title, dueDate, quadrant, description, userId]);

        res.status(201).json({ message: "Task added" });

    }
    catch (err){

    }
}

export async function dailyTasks(req, res){
    const userId = req.session.userId;

    try{
        const db = await getDBConnection();
        const result = await db.all('SELECT * FROM tasks WHERE user_id = ? and due_date = DATE("now", "localtime")', [userId]);

        res.json({result});
    }
    catch(err){

    }
}

export async function fourQuadrantsTasks(req, res){
    const userId = req.session.userId;

    try{
        const db = await getDBConnection();
        const result = await db.all('SELECT * FROM tasks WHERE user_id = ?', [userId]);

        res.json({result});
    }
    catch(err){

    }
}