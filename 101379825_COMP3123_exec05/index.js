const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

fs.writeFileSync('home.html', '<h1>Welcome to ExpressJs Tutorial</h1>', 'utf-8');

router.get('/home', (req,res) => {
  res.sendFile(__dirname + '/home.html');
});

router.get('/profile', (req,res) => {
  const details = require('./user.json');
  res.json(details);
});

router.get('/login', (req,res) => {
  const {username, password} = req.query;
  const details = require('./user.json');

if(details.username === username && details.password === password) {
  res.json({
    status: true,
    message: "User Is valid"
  });
} else {
  res.json({
    status: false,
    message: "User Name or Password is invalid"
    });
  }
});

router.get(`/logout/:username`, (req, res) => {
  const {username} = req.params;
  res.send(`<b>${username} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081, () => {
  console.log('Web Server is running at port '+ (process.env.port || 8081));
});