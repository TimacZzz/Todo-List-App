import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { getDBConnection } from './db/db.js'

export async function viewAllProducts() {
    const db = await getDBConnection();

    try {
        const abductions = await db.all('SELECT * FROM users');
        console.table(abductions) 
    } catch (err) {
        console.error('Error fetching products:', err.message)
    } finally {
        await db.close()
    }
}

viewAllProducts()