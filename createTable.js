import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { getDBConnection } from './db/db.js'

async function createTable(){
    const db = await getDBConnection();

    await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        due_date TEXT NOT NULL,
        quadrant TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id INT NOT NULL
    )
    `)

    await db.close();

    console.log("Table is created")
}

async function deleteTable(){
    const db = await getDBConnection();

    await db.exec(`
    DROP TABLE IF EXISTS users
    `)

    await db.close();

    console.log("Table is deleted")
}

createTable();