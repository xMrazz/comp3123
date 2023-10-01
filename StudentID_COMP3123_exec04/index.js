var express = require('express')

const SERVER_PORT = 8089
var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/hello', (req, res) => {
  res.send('Hello Express JS');
});

// Query
app.get('/user', (req, res) => {
    const data = req.query
    res.send(data)
  });
  

// Path
app.post('/user/:firstname/:lastname', (req, res) => {
    const data = req.params
    let firstname = req.params.firstname
    let lastname = req.params.lastname
    res.send(data)
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});