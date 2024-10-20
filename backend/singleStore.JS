// singlestoreBackend.js
const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let connection;

// Initialize SingleStore connection
const initializeDB = async () => {
    try {
        connection = await mysql.createConnection({
            host: 'YOUR_SINGLESTORE_HOST',
            user: 'YOUR_DB_USER',
            password: 'YOUR_DB_PASSWORD',
            database: 'YOUR_DB_NAME',
            ssl: {
                ca: '/development/neilteje/singlestore_bundle.pem',
            },
        });
        console.log('Connected to SingleStore database!');
    } catch (error) {
        console.error('Failed to connect to SingleStore:', error);
    }
};

// Function to insert a new entry into the database
const insertData = async (entry) => {
    try {
        const query = `INSERT INTO jolo_entries (prompt, response, created_at) VALUES (?, ?, NOW())`;
        const [result] = await connection.execute(query, [entry.prompt, entry.response]);
        console.log('Inserted entry:', result);
        return result;
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

const updateData = async (id, newResponse) => {
    try {
        const query = `UPDATE jolo_entries SET response = ? WHERE id = ?`;
        const [result] = await connection.execute(query, [newResponse, id]);
        console.log('Updated entry:', result);
        return result;
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

// Function to retrieve all entries
const getAllEntries = async () => {
    try {
        const query = `SELECT * FROM jolo_entries ORDER BY created_at DESC`;
        const [rows] = await connection.execute(query);
        return rows;
    } catch (error) {
        console.error('Error retrieving entries:', error);
    }
};

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected for real-time updates');
    ws.on('message', async (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'NEW_ENTRY') {
            const result = await insertData(parsedMessage.entry);
            ws.send(JSON.stringify({ type: 'CONFIRMATION', result }));
        }
        if (parsedMessage.type === 'UPDATE_ENTRY') {
            const result = await updateData(parsedMessage.id, parsedMessage.newResponse);
            ws.send(JSON.stringify({ type: 'UPDATE_CONFIRMATION', result }));
        }
    });
    ws.on('close', () => console.log('Client disconnected'));
});

// REST API endpoints
app.get('/api/entries', async (req, res) => {
    const entries = await getAllEntries();
    res.json(entries);
});

app.post('/api/entry', async (req, res) => {
    const entry = req.body;
    const result = await insertData(entry);
    res.json({ status: 'Entry created', result });
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await initializeDB();
});
