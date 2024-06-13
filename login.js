import mysql from 'mysql';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ashish',
  database: 'library',
  insecureAuth : true
});



connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  );
`;

connection.query(createTableQuery, (err, results) => {
   if (err) throw err;
   console.log('Table created successfully.');
 });

export function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (error, results) => {
      if (error) reject(error);
      resolve(results.length > 0);
    });
  });
}
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});