const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '50.6.194.240',
    user: 'root',
    password: 'Gfive@123a',
    database: 'NOVA'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});



app.get('/events', (req, res) => {
    const { year, month } = req.query;
    const query = `
      SELECT event_name AS title, event_date AS date 
      FROM management_event_calender
      WHERE YEAR(event_date) = ? AND MONTH(event_date) = ?
    `;
    connection.query(query, [year, month], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://192.168.0.108:${PORT}`);
});