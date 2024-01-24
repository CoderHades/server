const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const ipAddress = '192.168.71.1'; // Update this with your actual IP address

app.use(express.json());

let users = [];

// Route to save users
app.post('/saveUsers', (req, res) => {
  const receivedUsers = req.body;
  users = receivedUsers;
  saveUsersToFile(users)
    .then(() => res.send('Users saved successfully'))
    .catch((error) => {
      console.error('Error saving users:', error);
      res.status(500).send('Internal Server Error');
    });
});

// Route to load users
app.get('/loadUsers', (req, res) => {
  loadUsersFromFile()
    .then((loadedUsers) => {
      users = loadedUsers;
      res.json(users);
    })
    .catch((error) => {
      console.error('Error loading users:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, ipAddress, () => {
  console.log(`Server is running at http://${ipAddress}:${port}`);
});

// Function to save users to a file
function saveUsersToFile(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile('users.json', JSON.stringify(users), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Function to load users from a file
function loadUsersFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const loadedUsers = JSON.parse(data);
        resolve(loadedUsers);
      }
    });
  });
}
