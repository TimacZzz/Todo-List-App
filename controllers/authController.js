import { getDBConnection } from "../db/db.js"
import bcrypt from "bcryptjs"

export async function registerUser(req, res){
    // Parse the req.body to receive the username & password
    let { username, password } = req.body;

    const testResult = verify(username, password);

    if (!testResult[0]){
        return res.status(400).json({error: testResult[1]})
    }

    try{
        const db = await getDBConnection();

        const existing = await db.get('SELECT id FROM users WHERE username = ?', [username]);

        if (existing){
            return res.status(400).json({error: "Username already in use."})
        }

        const hashed = await bcrypt.hash(password, 10);

        const result = await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);

        req.session.userId = result.lastID;

        res.status(201).json({ message: "User registered" });
    }
    catch (err){
        return res.status(500).json({error: "Internal server error."})
    }
}

export async function loginUser(req, res){
    // Parse the req.body to receive the username & password
    let { username, password } = req.body;

    const testResult = verify(username, password);

    if (!testResult[0]){
        return res.status(400).json({error: testResult[1]})
    }

    try{
        const db = await getDBConnection();

        const existing = await db.get('SELECT id FROM users WHERE username = ?', [username]);

        if (!existing){
            return res.status(400).json({error: "Invalid username"})
        }

        const userPassword = await db.get('SELECT password FROM users WHERE username = ?', [username])

        const verifyPassword = await bcrypt.compare(password, userPassword.password);

        if (!verifyPassword || !userPassword){
            return res.status(400).json({error: "Incorrect password"})
        }

        req.session.userId = existing.id;

        res.status(201).json({ message: "Logged In" });

    }
    catch (err){
        return res.status(500).json({error: "Internal server error."})
    }
}

// Refactor the code
function verify(username, password){
    let arr = [];

    // Test if there is a username or password
    if (!username || !password){
        return [false, "All fields are required."]
    }

    username = username.trim();
    password = password.trim();

    const format = /^[a-zA-Z0-9_-]{1,20}$/;

    // Test if the username & password match the desired format
    if (!format.test(username) || !format.test(password)){
        return [false, "Username & Password must be 1-20 characters, using letters, numbers, _ or -."]
    }

    return [true, ""];
}